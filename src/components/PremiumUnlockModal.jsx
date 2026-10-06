import React, { useState } from 'react';
import { Crown, Check, X, Shield, CreditCard, Smartphone } from 'lucide-react';

export default function PremiumUnlockModal({ isOpen, onClose, userData, onPaymentSuccess }) {
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = (provider) => {
    setProcessing(true);
    // Simulate a payment flow
    setTimeout(() => {
      setProcessing(false);
      if (onPaymentSuccess) onPaymentSuccess(provider);
      onClose();
    }, 2000);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px'
    }}>
      <div style={{
        background: 'var(--page-bg)', border: '2px solid #fbbf24',
        borderRadius: 'var(--radius-lg)', maxWidth: '450px', width: '100%',
        padding: '32px 24px', boxShadow: '0 20px 40px rgba(251, 191, 36, 0.15)', position: 'relative',
        textAlign: 'center'
      }}>
        {/* Close button */}
        <button onClick={onClose} disabled={processing} style={{
          position: 'absolute', top: '16px', right: '16px', background: 'transparent',
          border: 'none', cursor: processing ? 'not-allowed' : 'pointer', color: 'var(--text-muted)'
        }}>
          <X size={24} />
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{ background: '#fef3c7', padding: '16px', borderRadius: '50%' }}>
            <Crown size={48} color="#d97706" />
          </div>
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-ink)', margin: '0 0 12px 0' }}>
          Unlock Study4XM Premium
        </h2>
        
        <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '24px' }}>
          Get unlimited access to the <strong>Offline AI-Guided Exam Simulator</strong> and advanced spaced-repetition tools.
        </p>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: '0 0 12px 0', color: '#334155' }}>Premium Benefits:</h4>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#475569' }}>
              <Check size={16} color="#10b981" /> <span>Unlimited AI Exam Simulations</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#475569' }}>
              <Check size={16} color="#10b981" /> <span>Custom Prompt Modifiers</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#475569' }}>
              <Check size={16} color="#10b981" /> <span>Offline Smart-Engine Access</span>
            </li>
          </ul>
        </div>

        {processing ? (
          <div style={{ padding: '20px', color: '#d97706', fontWeight: 600 }}>
            Processing Payment... Please wait.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              onClick={() => handlePayment('Stripe')}
              style={{ width: '100%', padding: '14px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <CreditCard size={18} /> Pay with Stripe (Card)
            </button>
            <button 
              onClick={() => handlePayment('bKash')}
              style={{ width: '100%', padding: '14px', background: '#e2136e', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Smartphone size={18} /> Pay with bKash
            </button>
            <button 
              onClick={() => handlePayment('GooglePlay')}
              style={{ width: '100%', padding: '14px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Shield size={18} /> Pay with Google Play Billing
            </button>
          </div>
        )}

        <div style={{ marginTop: '20px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Don't want to pay? <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--rose-600)', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>Refer 3 friends instead!</button>
        </div>
      </div>
    </div>
  );
}
