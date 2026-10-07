const { getFirebaseServices } = require('./firebase');
const { requireUser } = require('./http');

const PREMIUM_AMOUNT = 500;
const TRANSACTION_ID_PATTERN = /^S4XM_[a-f0-9]{32}$/;

function getAamarPayConfig() {
  const storeId = process.env.AAMARPAY_STORE_ID;
  const signatureKey = process.env.AAMARPAY_SIGNATURE_KEY;
  const mode = process.env.AAMARPAY_MODE || 'sandbox';
  const appUrl = process.env.PUBLIC_APP_URL;
  const serviceUrl = process.env.PAYMENT_SERVICE_URL;

  if (!storeId || !signatureKey || !appUrl || !serviceUrl) {
    throw new Error('AamarPay or public URL environment variables are not configured.');
  }
  if (!['sandbox', 'live'].includes(mode)) {
    throw new Error('AAMARPAY_MODE must be either sandbox or live.');
  }

  const parsedAppUrl = new URL(appUrl);
  const parsedServiceUrl = new URL(serviceUrl);
  if (parsedAppUrl.protocol !== 'https:' || parsedServiceUrl.protocol !== 'https:') {
    throw new Error('The public app and payment service URLs must use HTTPS.');
  }

  return { storeId, signatureKey, mode, appUrl: parsedAppUrl, serviceUrl: parsedServiceUrl };
}

function getGatewayBaseUrl(mode) {
  return mode === 'live' ? 'https://secure.aamarpay.com' : 'https://sandbox.aamarpay.com';
}

async function createCheckout(req, res) {
  const { auth, db, FieldValue } = getFirebaseServices();
  const user = await requireUser(req, res, auth);
  if (!user) return;

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

  const userRef = db.collection('users').doc(user.uid);
  const userSnap = await userRef.get();
  if (!userSnap.exists) return res.status(404).json({ message: 'Create your Study4XM account first.' });
  if (userSnap.get('isPremium') === true) {
    return res.json({ status: 'success', message: 'This account already has Premium.' });
  }
  if (!user.email) return res.status(400).json({ message: 'Add an email to your account before checkout.' });

  const config = getAamarPayConfig();
  const transactionId = `S4XM_${require('node:crypto').randomUUID().replaceAll('-', '')}`;
  const transactionRef = db.collection('premiumPayments').doc(transactionId);
  const callbackUrl = new URL('/api/aamarpay/callback', config.serviceUrl);

  await transactionRef.set({
    uid: user.uid,
    provider: 'aamarpay',
    amount: PREMIUM_AMOUNT,
    currency: 'BDT',
    status: 'pending',
    createdAt: FieldValue.serverTimestamp()
  });

  const gatewayUrl = new URL('/jsonpost.php', getGatewayBaseUrl(config.mode));
  try {
    const gatewayResponse = await fetch(gatewayUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        store_id: config.storeId,
        signature_key: config.signatureKey,
        tran_id: transactionId,
        amount: PREMIUM_AMOUNT.toFixed(2),
        currency: 'BDT',
        desc: 'Study4XM Lifetime Premium',
        cus_name: customerName.trim().slice(0, 80),
        cus_email: user.email,
        cus_phone: normalizedPhone,
        cus_add1: 'Not provided',
        cus_city: 'Not provided',
        cus_country: 'Bangladesh',
        success_url: callbackUrl.toString(),
        fail_url: new URL('/?checkout=failed', config.appUrl).toString(),
        cancel_url: new URL('/?checkout=cancelled', config.appUrl).toString(),
        type: 'json'
      })
    });

    const gatewayResult = await gatewayResponse.json().catch(() => ({}));
    const checkoutUrl = gatewayResult.GatewayPageURL || gatewayResult.payment_url;
    if (!gatewayResponse.ok || !isTrustedGatewayUrl(checkoutUrl, config.mode)) {
      await transactionRef.update({ status: 'start_failed', updatedAt: FieldValue.serverTimestamp() });
      console.error('AamarPay did not return a valid checkout URL:', gatewayResult);
      return res.status(502).json({ message: 'The payment provider could not start checkout.' });
    }

    await transactionRef.update({ updatedAt: FieldValue.serverTimestamp() });
    return res.json({ status: 'redirecting', checkoutUrl, transactionId });
  } catch (error) {
    await transactionRef.update({ status: 'start_failed', updatedAt: FieldValue.serverTimestamp() });
    console.error('AamarPay checkout initialization failed:', error);
    return res.status(502).json({ message: 'The payment provider could not start checkout.' });
  }
}

function isTrustedGatewayUrl(value, mode) {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    const expectedHost = mode === 'live' ? 'secure.aamarpay.com' : 'sandbox.aamarpay.com';
    return url.protocol === 'https:' && url.hostname === expectedHost;
  } catch {
    return false;
  }
}

function redirectWithStatus(res, appUrl, status) {
  const destination = new URL('/', appUrl);
  destination.searchParams.set('checkout', status);
  res.redirect(303, destination.toString());
}

async function verifyAamarPayCallback(req, res) {
  const config = getAamarPayConfig();
  const transactionId = req.body?.mer_txnid || req.body?.tran_id || req.body?.request_id;
  if (typeof transactionId !== 'string' || !TRANSACTION_ID_PATTERN.test(transactionId)) {
    return redirectWithStatus(res, config.appUrl, 'failed');
  }

  const { db } = getFirebaseServices();
  const transactionRef = db.collection('premiumPayments').doc(transactionId);
  const transactionSnap = await transactionRef.get();
  if (!transactionSnap.exists) return redirectWithStatus(res, config.appUrl, 'failed');

  const result = await verifyPendingPayment(transactionId, transactionSnap.data());
  return redirectWithStatus(res, config.appUrl, result);
}

async function verifyPendingPayment(transactionId, transaction) {
  if (transaction.status === 'verified') return 'confirmed';
  if (transaction.status !== 'pending') return 'failed';

  const config = getAamarPayConfig();
  const verifyUrl = new URL('/api/v1/trxcheck/request.php', getGatewayBaseUrl(config.mode));
  verifyUrl.searchParams.set('request_id', transactionId);
  verifyUrl.searchParams.set('store_id', config.storeId);
  verifyUrl.searchParams.set('signature_key', config.signatureKey);
  verifyUrl.searchParams.set('type', 'json');

  try {
    const verifyResponse = await fetch(verifyUrl);
    const verifiedPayment = await verifyResponse.json();
    if (!verifyResponse.ok) return 'pending';

    if (['Failed', 'Cancelled'].includes(verifiedPayment.pay_status)) {
      const { db, FieldValue } = getFirebaseServices();
      await db.collection('premiumPayments').doc(transactionId).update({
        status: 'failed',
        updatedAt: FieldValue.serverTimestamp()
      });
      return 'failed';
    }

    const validPayment = verifiedPayment.pay_status === 'Successful'
      && Number(verifiedPayment.amount) === transaction.amount
      && verifiedPayment.currency === transaction.currency
      && (!verifiedPayment.status_code || String(verifiedPayment.status_code) === '2');
    if (!validPayment) return 'pending';

    const { db, FieldValue } = getFirebaseServices();
    const paymentRef = db.collection('premiumPayments').doc(transactionId);
    const userRef = db.collection('users').doc(transaction.uid);
    await db.runTransaction(async (firestoreTransaction) => {
      const latestPayment = await firestoreTransaction.get(paymentRef);
      if (latestPayment.get('status') === 'verified') return;
      if (latestPayment.get('status') !== 'pending') throw new Error('Payment is no longer pending.');

      firestoreTransaction.set(userRef, {
        isPremium: true,
        premiumVia: 'aamarpay',
        premiumDate: new Date().toISOString()
      }, { merge: true });
      firestoreTransaction.update(paymentRef, {
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
  const { auth, db } = getFirebaseServices();
  const user = await requireUser(req, res, auth);
  if (!user) return;

  const transactionId = req.query.transactionId;
  if (typeof transactionId !== 'string' || !TRANSACTION_ID_PATTERN.test(transactionId)) {
    return res.status(400).json({ message: 'The payment reference is invalid.' });
  }

  const transactionSnap = await db.collection('premiumPayments').doc(transactionId).get();
  if (!transactionSnap.exists || transactionSnap.get('uid') !== user.uid) {
    return res.status(404).json({ message: 'No payment was found for this account.' });
  }

  const status = await verifyPendingPayment(transactionId, transactionSnap.data());
  return res.json({ status });
}

async function processReferral(req, res) {
  const { auth, db, FieldValue } = getFirebaseServices();
  const user = await requireUser(req, res, auth);
  if (!user) return;

  const referralCode = String(req.body?.referralCode || '').trim().toUpperCase();
  if (!/^[A-Z0-9]{6}$/.test(referralCode)) {
    return res.status(400).json({ message: 'The referral code is invalid.' });
  }

  const referredUserRef = db.collection('users').doc(user.uid);
  const referredUserSnap = await referredUserRef.get();
  if (!referredUserSnap.exists
    || referredUserSnap.get('referredBy') !== referralCode
    || referredUserSnap.get('referralProcessed') === true) {
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
  const processed = await db.runTransaction(async (firestoreTransaction) => {
    const latestReferredUser = await firestoreTransaction.get(referredUserRef);
    const latestReferrer = await firestoreTransaction.get(referrerRef);
    if (!latestReferredUser.exists || !latestReferrer.exists
      || latestReferredUser.get('referredBy') !== referralCode
      || latestReferredUser.get('referralProcessed') === true) return false;

    firestoreTransaction.update(referrerRef, { successfulReferrals: FieldValue.increment(1) });
    firestoreTransaction.update(referredUserRef, { referralProcessed: true });
    return true;
  });

  return res.json({ processed });
}

module.exports = {
  checkPaymentStatus,
  createCheckout,
  processReferral,
  verifyAamarPayCallback
};
