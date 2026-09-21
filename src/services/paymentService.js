import { Capacitor } from '@capacitor/core';
import { Stripe } from '@capacitor-community/stripe';
// Note: cordova-plugin-purchase provides the global `store` object on window

export const paymentService = {
  /**
   * Determine available payment providers based on the current platform
   */
  getAvailableProviders: () => {
    const platform = Capacitor.getPlatform();
    
    if (platform === 'android') {
      return [
        { id: 'google_play', name: 'Google Play Billing', type: 'native' }
      ];
    }
    
    // For web platform
    return [
      { id: 'aamarpay', name: 'bKash / Nagad / Cards (AamarPay)', type: 'web' },
      { id: 'stripe', name: 'Credit Card (Stripe)', type: 'web' }
    ];
  },

  /**
   * Process payment based on the selected provider
   */
  processPayment: async (providerId, userId, amount = 500) => {
    switch (providerId) {
      case 'google_play':
        return await processGooglePlayPayment(userId);
      case 'stripe':
        return await processStripePayment(userId, amount);
      case 'aamarpay':
        return await processAamarPayPayment(userId, amount);
      default:
        throw new Error('Unsupported payment provider');
    }
  }
};

// --- Google Play Billing (In-App Purchases) ---
const processGooglePlayPayment = (userId) => {
  return new Promise((resolve, reject) => {
    if (!window.store) {
      return reject(new Error('Store plugin not available. Ensure cordova-plugin-purchase is installed.'));
    }

    const { store } = window;
    
    // Define your product (ensure this matches what you set in Google Play Console)
    const PRODUCT_ID = 'study4xm_premium_unlock';
    
    store.register({
      id: PRODUCT_ID,
      type: store.NON_CONSUMABLE
    });
    
    store.when(PRODUCT_ID)
      .approved(p => {
        p.verify();
      })
      .verified(p => {
        p.finish();
        // Here you would typically notify your backend or update local state
        resolve({ status: 'success', message: 'Premium unlocked via Google Play' });
      })
      .error(err => {
        reject(err);
      });
      
    store.refresh();
    
    store.order(PRODUCT_ID).then(() => {
      console.log("Purchase order started");
    }).catch(err => reject(err));
  });
};

// --- Stripe Checkout ---
const processStripePayment = async (userId, amount) => {
  try {
    // In a real app, you would make an API call to your backend to generate a PaymentIntent
    // For this test mode implementation, we'll simulate a successful payment initiation
    console.log(`Initiating Stripe payment for user ${userId}, amount ${amount}`);
    
    // If we are using Capacitor Stripe plugin
    Stripe.initialize({
      publishableKey: 'pk_test_123',
    });
    
    // Mocking the backend call to create a payment sheet
    const mockPaymentIntent = 'pi_test_123_secret_456';
    
    await Stripe.createPaymentSheet({
      paymentIntentClientSecret: mockPaymentIntent,
      merchantDisplayName: 'Study4XM Premium'
    });
    
    // Present the sheet
    const result = await Stripe.presentPaymentSheet();
    return { status: 'success', result };
    
  } catch (error) {
    console.error("Stripe error:", error);
    throw error;
  }
};

// --- AamarPay Redirect ---
const processAamarPayPayment = (userId, amount) => {
  // AamarPay uses a standard form POST redirect for web checkout
  return new Promise((resolve) => {
    const storeId = 'aamarpaytest';
    const signatureKey = 'dbb74894e82415a2f7ff0ec3a97e4183';
    const transactionId = `TRX_${Date.now()}`;
    const successUrl = `${window.location.origin}/api/aamarpay-success`;
    
    // Create a hidden form and submit it
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://sandbox.aamarpay.com/request.php';
    
    const params = {
      store_id: storeId,
      signature_key: signatureKey,
      tran_id: transactionId,
      success_url: successUrl,
      fail_url: `${window.location.origin}/checkout-failed`,
      cancel_url: `${window.location.origin}/checkout-cancelled`,
      amount: amount,
      currency: 'BDT',
      desc: 'Study4XM Premium Unlock',
      cus_name: 'Test User',
      cus_email: 'test@example.com',
      cus_phone: '01700000000',
      opt_a: userId // Pass the userId so the webhook knows who paid
    };
    
    for (const key in params) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = params[key];
      form.appendChild(input);
    }
    
    document.body.appendChild(form);
    form.submit();
    
    // Since we redirect, we won't resolve this promise in this session
    resolve({ status: 'redirecting' });
  });
};
