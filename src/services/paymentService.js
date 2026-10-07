import { Capacitor } from '@capacitor/core';
import { auth } from '../firebase';

const checkoutApiUrl = import.meta.env.VITE_PAYMENT_CHECKOUT_API;

export const paymentService = {
  /**
   * Determine available payment providers based on the current platform
   */
  getAvailableProviders: () => {
    const platform = Capacitor.getPlatform();
    return [
      { id: 'aamarpay', name: 'bKash / Nagad / Cards (AamarPay)', type: 'web', available: platform !== 'android' && Boolean(checkoutApiUrl) },
      { id: 'stripe', name: 'Credit Card (Stripe)', type: 'web', available: false },
      { id: 'google_play', name: 'Google Play Billing', type: 'native', available: false }
    ];
  },

  /**
   * Process payment based on the selected provider
   */
  processPayment: async (providerId, customer, amount = 500) => {
    if (providerId !== 'aamarpay') {
      throw new Error('Unsupported payment provider');
    }

    if (!checkoutApiUrl) {
      throw new Error('Checkout is not active yet. The payment API and provider verification must be configured before a purchase can be made.');
    }

    const user = auth.currentUser;
    if (!user) throw new Error('Sign in before starting checkout.');

    const response = await fetch(checkoutApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await user.getIdToken()}`
      },
      body: JSON.stringify({
        providerId,
        customerName: customer.name,
        phone: customer.phone,
        amount,
        platform: Capacitor.getPlatform(),
        returnUrl: `${window.location.origin}/?checkout=return`
      })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.message || 'The payment service could not start checkout.');

    if (result.status === 'redirecting' && result.checkoutUrl) {
      if (result.transactionId) {
        try {
          sessionStorage.setItem('study4xm_pending_transaction', `${user.uid}:${result.transactionId}`);
        } catch {}
      }
      window.location.assign(result.checkoutUrl);
      return { status: 'redirecting' };
    }

    return result;
  },

  checkPaymentStatus: async (transactionId) => {
    if (!checkoutApiUrl) throw new Error('Payment status service is not configured.');
    const user = auth.currentUser;
    if (!user) throw new Error('Sign in before checking payment status.');

    const statusUrl = new URL(checkoutApiUrl);
    statusUrl.pathname = statusUrl.pathname.replace(/\/create\/?$/, '/status');
    statusUrl.searchParams.set('transactionId', transactionId);
    const response = await fetch(statusUrl, {
      headers: { Authorization: `Bearer ${await user.getIdToken()}` }
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.message || 'Could not verify payment status.');
    return result;
  },

  processReferral: async (referralCode) => {
    if (!checkoutApiUrl) return { processed: false };
    const user = auth.currentUser;
    if (!user) throw new Error('Sign in before processing a referral.');

    const referralUrl = new URL(checkoutApiUrl);
    referralUrl.pathname = referralUrl.pathname.replace(/\/create\/?$/, '/referrals');
    const response = await fetch(referralUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await user.getIdToken()}`
      },
      body: JSON.stringify({ referralCode })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.message || 'Could not process referral.');
    return result;
  }
};
