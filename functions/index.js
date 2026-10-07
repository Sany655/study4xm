const { randomUUID } = require('node:crypto');
const { initializeApp, getApps } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { FieldValue, getFirestore } = require('firebase-admin/firestore');
const { defineSecret, defineString } = require('firebase-functions/params');
const { onRequest } = require('firebase-functions/v2/https');

if (!getApps().length) initializeApp();

const db = getFirestore();
const aamarpayStoreId = defineSecret('AAMARPAY_STORE_ID');
const aamarpaySignatureKey = defineSecret('AAMARPAY_SIGNATURE_KEY');
const aamarpayMode = defineString('AAMARPAY_MODE', { default: 'sandbox' });
const publicAppUrl = defineString('PUBLIC_APP_URL', { default: 'https://study4xm.web.app' });
const functionRegion = 'asia-south1';
const premiumAmount = 500;

function redirectWithStatus(res, status) {
  const destination = new URL('/', publicAppUrl.value());
  destination.searchParams.set('checkout', status);
  res.redirect(303, destination.toString());
}

async function startAamarPayCheckout(req, res) {
  const authorization = req.get('authorization') || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!token) return res.status(401).json({ message: 'Sign in to start checkout.' });

  let decodedToken;
  try {
    decodedToken = await getAuth().verifyIdToken(token);
  } catch {
    return res.status(401).json({ message: 'Your session has expired. Sign in again.' });
  }

  const { providerId, customerName, phone } = req.body || {};
  if (providerId !== 'aamarpay') {
    return res.status(400).json({ message: 'This payment provider is not enabled.' });
  }
  if (typeof customerName !== 'string' || customerName.trim().length < 2 || typeof phone !== 'string') {
    return res.status(400).json({ message: 'Enter your name and phone number to continue.' });
  }

  const normalizedPhone = phone.replace(/[\s()-]/g, '');
  if (!/^\+?[0-9]{8,15}$/.test(normalizedPhone)) {
    return res.status(400).json({ message: 'Enter a valid phone number.' });
  }

  const userRef = db.collection('users').doc(decodedToken.uid);
  const userSnap = await userRef.get();
  if (!userSnap.exists) return res.status(404).json({ message: 'Create your Study4XM account first.' });
  if (userSnap.get('isPremium') === true) {
    return res.json({ status: 'success', message: 'This account already has Premium.' });
  }
  if (!decodedToken.email) return res.status(400).json({ message: 'Add an email to your account before checkout.' });

  const transactionId = `S4XM_${randomUUID().replaceAll('-', '')}`;
  const transactionRef = db.collection('premiumPayments').doc(transactionId);
  const projectId = process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT;
  if (!projectId) throw new Error('Firebase project ID is not available in the Functions runtime.');
  const functionBaseUrl = `https://${functionRegion}-${projectId}.cloudfunctions.net/premiumPayments`;
  const callbackUrl = `${functionBaseUrl}/aamarpay/callback`;
  const sandbox = aamarpayMode.value() !== 'live';
  const gatewayUrl = sandbox ? 'https://sandbox.aamarpay.com/jsonpost.php' : 'https://secure.aamarpay.com/jsonpost.php';

  await transactionRef.set({
    uid: decodedToken.uid,
    provider: 'aamarpay',
    amount: premiumAmount,
    currency: 'BDT',
    status: 'pending',
    createdAt: FieldValue.serverTimestamp()
  });

  try {
    const gatewayResponse = await fetch(gatewayUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        store_id: aamarpayStoreId.value(),
        signature_key: aamarpaySignatureKey.value(),
        tran_id: transactionId,
        amount: premiumAmount.toFixed(2),
        currency: 'BDT',
        desc: 'Study4XM Lifetime Premium',
        cus_name: customerName.trim().slice(0, 80),
        cus_email: decodedToken.email,
        cus_phone: normalizedPhone,
        cus_add1: 'Not provided',
        cus_city: 'Not provided',
        cus_country: 'Bangladesh',
        success_url: callbackUrl,
        fail_url: `${publicAppUrl.value()}/?checkout=failed`,
        cancel_url: `${publicAppUrl.value()}/?checkout=cancelled`,
        type: 'json'
      })
    });

    const gatewayResult = await gatewayResponse.json();
    const checkoutUrl = gatewayResult.GatewayPageURL || gatewayResult.payment_url;
    if (!gatewayResponse.ok || !checkoutUrl) {
      await transactionRef.update({ status: 'start_failed', updatedAt: FieldValue.serverTimestamp() });
      console.error('AamarPay did not return a checkout URL:', gatewayResult);
      return res.status(502).json({ message: 'The payment provider could not start checkout.' });
    }

    await transactionRef.update({ gatewayUrl: checkoutUrl, updatedAt: FieldValue.serverTimestamp() });
    return res.json({ status: 'redirecting', checkoutUrl, transactionId });
  } catch (error) {
    await transactionRef.update({ status: 'start_failed', updatedAt: FieldValue.serverTimestamp() });
    console.error('AamarPay checkout initialization failed:', error);
    return res.status(502).json({ message: 'The payment provider could not start checkout.' });
  }
}

async function verifyAamarPayCallback(req, res) {
  const transactionId = req.body?.mer_txnid || req.body?.tran_id || req.body?.request_id;
  if (typeof transactionId !== 'string' || !/^S4XM_[a-f0-9]{32}$/.test(transactionId)) {
    return redirectWithStatus(res, 'failed');
  }

  const transactionRef = db.collection('premiumPayments').doc(transactionId);
  const transactionSnap = await transactionRef.get();
  if (!transactionSnap.exists) return redirectWithStatus(res, 'failed');
  const result = await verifyPendingPayment(transactionId, transactionSnap.data());
  return redirectWithStatus(res, result);
}

async function verifyPendingPayment(transactionId, transaction) {
  if (transaction.status === 'verified') return 'confirmed';
  if (transaction.status !== 'pending') return 'failed';

  const sandbox = aamarpayMode.value() !== 'live';
  const verifyBaseUrl = sandbox ? 'https://sandbox.aamarpay.com' : 'https://secure.aamarpay.com';
  const verifyUrl = new URL('/api/v1/trxcheck/request.php', verifyBaseUrl);
  verifyUrl.searchParams.set('request_id', transactionId);
  verifyUrl.searchParams.set('store_id', aamarpayStoreId.value());
  verifyUrl.searchParams.set('signature_key', aamarpaySignatureKey.value());
  verifyUrl.searchParams.set('type', 'json');

  try {
    const verifyResponse = await fetch(verifyUrl);
    const verifiedPayment = await verifyResponse.json();
    if (!verifyResponse.ok) return 'pending';

    if (['Failed', 'Cancelled'].includes(verifiedPayment.pay_status)) {
      await db.collection('premiumPayments').doc(transactionId).update({
        status: 'failed',
        updatedAt: FieldValue.serverTimestamp()
      });
      return 'failed';
    }

    const paidAmount = Number(verifiedPayment.amount);
    const callbackCurrency = String(verifiedPayment.currency || '').toUpperCase();
    const validPayment = verifiedPayment.pay_status === 'Successful'
      && paidAmount === transaction.amount
      && (!callbackCurrency || callbackCurrency === transaction.currency);

    if (!validPayment) return 'pending';

    const userRef = db.collection('users').doc(transaction.uid);
    await db.runTransaction(async (firestoreTransaction) => {
      const latestPayment = await firestoreTransaction.get(db.collection('premiumPayments').doc(transactionId));
      if (latestPayment.get('status') === 'verified') return;
      if (latestPayment.get('status') !== 'pending') throw new Error('Payment is no longer pending.');
      firestoreTransaction.set(userRef, {
        isPremium: true,
        premiumVia: 'aamarpay',
        premiumDate: new Date().toISOString()
      }, { merge: true });
      firestoreTransaction.update(db.collection('premiumPayments').doc(transactionId), {
        status: 'verified',
        verifiedAt: FieldValue.serverTimestamp()
      });
    });

    return 'confirmed';
  } catch (error) {
    console.error('AamarPay verification failed:', error);
    return 'pending';
  }
}

async function checkPaymentStatus(req, res) {
  const authorization = req.get('authorization') || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!token) return res.status(401).json({ message: 'Sign in to check payment status.' });

  try {
    const user = await getAuth().verifyIdToken(token);
    const transactionId = req.query.transactionId;
    if (typeof transactionId !== 'string' || !/^S4XM_[a-f0-9]{32}$/.test(transactionId)) {
      return res.status(400).json({ message: 'The payment reference is invalid.' });
    }

    const transactionSnap = await db.collection('premiumPayments').doc(transactionId).get();
    if (!transactionSnap.exists || transactionSnap.get('uid') !== user.uid) {
      return res.status(404).json({ message: 'No payment was found for this account.' });
    }

    const status = await verifyPendingPayment(transactionId, transactionSnap.data());
    return res.json({ status });
  } catch (error) {
    console.error('Could not check payment status:', error);
    return res.status(401).json({ message: 'Could not verify your account or payment status.' });
  }
}

async function processReferral(req, res) {
  const authorization = req.get('authorization') || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!token) return res.status(401).json({ message: 'Sign in to process a referral.' });

  try {
    const user = await getAuth().verifyIdToken(token);
    const referralCode = String(req.body?.referralCode || '').trim().toUpperCase();
    if (!/^[A-Z0-9]{6}$/.test(referralCode)) {
      return res.status(400).json({ message: 'The referral code is invalid.' });
    }

    const referredUserRef = db.collection('users').doc(user.uid);
    const referredUserSnap = await referredUserRef.get();
    if (!referredUserSnap.exists || referredUserSnap.get('referredBy') !== referralCode || referredUserSnap.get('referralProcessed') === true) {
      return res.json({ processed: false });
    }

    const referrerQuery = await db.collection('users')
      .where('referralCode', '==', referralCode)
      .limit(1)
      .get();
    if (referrerQuery.empty || referrerQuery.docs[0].id === user.uid) {
      await referredUserRef.update({ referralProcessed: true });
      return res.json({ processed: false });
    }

    const referrerRef = referrerQuery.docs[0].ref;
    const processed = await db.runTransaction(async (transaction) => {
      const latestReferredUser = await transaction.get(referredUserRef);
      const latestReferrer = await transaction.get(referrerRef);
      if (!latestReferredUser.exists || !latestReferrer.exists
        || latestReferredUser.get('referredBy') !== referralCode
        || latestReferredUser.get('referralProcessed') === true) return false;

      transaction.update(referrerRef, { successfulReferrals: FieldValue.increment(1) });
      transaction.update(referredUserRef, { referralProcessed: true });
      return true;
    });

    return res.json({ processed });
  } catch (error) {
    console.error('Could not process referral:', error);
    return res.status(500).json({ message: 'Could not process the referral code.' });
  }
}

exports.premiumPayments = onRequest({
  region: functionRegion,
  cors: ['https://study4xm.web.app', 'https://study4xm.firebaseapp.com', 'http://localhost:5173', 'https://localhost', 'capacitor://localhost'],
  secrets: [aamarpayStoreId, aamarpaySignatureKey],
  maxInstances: 10
}, async (req, res) => {
  if (req.path.endsWith('/create')) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed.' });
    try {
      return await startAamarPayCheckout(req, res);
    } catch (error) {
      console.error('Could not create payment checkout:', error);
      return res.status(500).json({ message: 'Could not start checkout.' });
    }
  }

  if (req.path.endsWith('/status')) {
    if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed.' });
    return checkPaymentStatus(req, res);
  }

  if (req.path.endsWith('/referrals')) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed.' });
    return processReferral(req, res);
  }

  if (req.path.endsWith('/aamarpay/callback')) {
    if (req.method !== 'POST') return res.status(405).send('Method not allowed.');
    return verifyAamarPayCallback(req, res);
  }

  return res.status(404).json({ message: 'Not found.' });
});