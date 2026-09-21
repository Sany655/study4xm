import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import axios from 'axios';

// Initialize Firebase Admin (Only once per serverless instance)
if (!global.firebaseApp) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : { projectId: 'portfolio-sany' };

  try {
    global.firebaseApp = initializeApp({
      credential: cert(serviceAccount)
    });
  } catch (error) {
    global.firebaseApp = initializeApp({ projectId: 'portfolio-sany' });
  }
}

const db = getFirestore(global.firebaseApp);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // AamarPay sends POST data to the success URL
    const { pay_status, amount, opt_a, mer_txnid } = req.body;
    
    // opt_a is typically used to pass custom parameters, like the userId
    const userId = opt_a;

    if (pay_status === 'Successful' && userId) {
      try {
        // First verify the transaction directly with AamarPay API (best practice)
        // For sandbox, the verify URL is different than production
        const storeId = process.env.AAMARPAY_STORE_ID || 'aamarpaytest';
        const signatureKey = process.env.AAMARPAY_SIGNATURE_KEY || 'dbb74894e82415a2f7ff0ec3a97e4183';
        
        const verifyUrl = `https://sandbox.aamarpay.com/api/v1/trxcheck/request.php?request_id=${mer_txnid}&store_id=${storeId}&signature_key=${signatureKey}&type=json`;
        
        const verifyResponse = await axios.get(verifyUrl);
        const verifyData = verifyResponse.data;

        if (verifyData.pay_status === 'Successful') {
          // Update the user in Firestore to be premium
          await db.collection('users').doc(userId).update({
            isPremium: true,
            premiumVia: 'aamarpay',
            premiumDate: new Date().toISOString()
          });
          
          console.log(`Successfully upgraded user ${userId} via AamarPay`);
        }
      } catch (error) {
        console.error("AamarPay verification or Firestore update failed:", error);
      }
    }

    // Redirect the user back to the application after successful payment
    // Ensure the URL matches your production URL when deployed
    res.redirect(302, '/');
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
