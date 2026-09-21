import React, { useState, useEffect } from 'react';
import { paymentService } from '../services/paymentService';
import { X, CreditCard, Smartphone, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function CheckoutModal({ isOpen, onClose }) {
  const { currentUser } = useAuth();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProviders(paymentService.getAvailableProviders());
      setError('');
      setSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePayment = async (providerId) => {
    if (!currentUser) {
      setError('Please log in first to purchase Premium.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Hardcoded amount for this example (500 BDT or equivalent)
      const result = await paymentService.processPayment(providerId, currentUser.uid, 500);
      
      if (result.status === 'success') {
        setSuccess(true);
        setTimeout(() => onClose(), 2000);
      }
      // If status is redirecting (like AamarPay), the page will unload
    } catch (err) {
      setError(err.message || 'Payment processing failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="toc-drawer-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div 
        className="glass-panel" 
        style={{ 
          maxWidth: '400px', 
          width: '90%', 
          margin: 'auto', 
          background: 'var(--page-bg)',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ background: 'var(--rose-800)', padding: '20px', color: '#fff', position: 'relative' }}>
          <button 
            onClick={onClose}
            style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>Unlock Premium</h2>
          <p style={{ margin: '8px 0 0', opacity: 0.9, fontSize: '0.9rem' }}>Lifetime access to AI Exam Simulator</p>
        </div>

        <div style={{ padding: '24px' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <ShieldCheck size={48} color="#059669" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ color: '#059669', marginBottom: '8px' }}>Payment Successful!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Your premium features are now unlocked.</p>
            </div>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-ink)' }}>৳500</span>
                <span style={{ color: 'var(--text-muted)' }}> / one-time</span>
              </div>

              {error && (
                <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem' }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {providers.map(provider => (
                  <button
                    key={provider.id}
                    className="btn btn-secondary"
                    onClick={() => handlePayment(provider.id)}
                    disabled={loading}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'flex-start', 
                      gap: '12px', 
                      padding: '16px',
                      border: '2px solid var(--page-border)',
                      background: 'var(--page-bg)',
                      width: '100%'
                    }}
                  >
                    {provider.id === 'google_play' ? <Smartphone size={24} color="#059669" /> : 
                     provider.id === 'aamarpay' ? <Smartphone size={24} color="#d97706" /> : 
                     <CreditCard size={24} color="#6366f1" />}
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-ink)' }}>{provider.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Secure payment checkout</div>
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <ShieldCheck size={14} /> Secured by SSL & Official APIs
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
