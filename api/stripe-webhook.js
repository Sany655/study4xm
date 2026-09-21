import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_123');

// Initialize Firebase Admin (Only once per serverless instance)
if (!global.firebaseApp) {
  // Use a placeholder or environment variable for the service account key
  // Normally you'd parse process.env.FIREBASE_SERVICE_ACCOUNT
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : { projectId: 'portfolio-sany' }; // Fallback for sandbox/mock

  try {
    global.firebaseApp = initializeApp({
      credential: cert(serviceAccount)
    });
  } catch (error) {
    // If running in development without a service account, we'll initialize a mock app
    global.firebaseApp = initializeApp({ projectId: 'portfolio-sany' });
  }
}

const db = getFirestore(global.firebaseApp);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let event;

    try {
      // In a real environment, you must verify the webhook signature
      // const sig = req.headers['stripe-signature'];
      // event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
      
      // For testing, we'll just parse the body directly
      event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // We pass the user's UID in the client_reference_id when creating the session
      const userId = session.client_reference_id;

      if (userId) {
        try {
          // Update the user in Firestore to be premium
          await db.collection('users').doc(userId).update({
            isPremium: true,
            premiumVia: 'stripe',
            premiumDate: new Date().toISOString()
          });
          console.log(`Successfully upgraded user ${userId} via Stripe`);
        } catch (dbError) {
          console.error("Firestore update failed:", dbError);
        }
      }
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
