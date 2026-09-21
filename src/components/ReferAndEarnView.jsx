import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Share2, Users, Crown, Gift, AlertCircle } from 'lucide-react';

export default function ReferAndEarnView() {
  const { currentUser, userData, signup, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referredByCode, setReferredByCode] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, referredByCode);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share && userData?.referralCode) {
      try {
        await navigator.share({
          title: 'Study4XM Premium Unlock',
          text: `Use my referral code ${userData.referralCode} to join Study4XM!`,
          url: window.location.origin
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    }
  };

  if (!currentUser || !userData) {
    return (
      <div className="book-page-shell" style={{ padding: '24px', maxWidth: '500px', margin: '40px auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--rose-800)' }}>
          {isLogin ? 'Login to Study4XM' : 'Join Study4XM'}
        </h2>
        
        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px', borderRadius: '4px', marginBottom: '16px' }}>
            <AlertCircle size={16} style={{ display: 'inline', marginRight: '6px' }} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>Email</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--page-border)' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--page-border)' }}
            />
          </div>
          {!isLogin && (
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>Referral Code (Optional)</label>
              <input 
                type="text" 
                value={referredByCode} 
                onChange={e => setReferredByCode(e.target.value)} 
                placeholder="e.g. A1B2C3"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--page-border)' }}
              />
            </div>
          )}
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '12px', fontSize: '1rem' }}>
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: 'var(--rose-700)', textDecoration: 'underline', cursor: 'pointer' }}>
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    );
  }

  const { isPremium, referralCode, successfulReferrals } = userData;
  const progressPct = Math.min((successfulReferrals / 3) * 100, 100);

  return (
    <div className="book-page-shell" style={{ padding: '24px' }}>
      <div className="page-running-head">
        <span className="page-chapter-badge">Refer & Earn</span>
        <span>Unlock Premium Features</span>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '30px' }}>
        <h1 style={{ color: 'var(--text-ink)', fontSize: '2rem', marginBottom: '10px' }}>
          Invite Friends. Unlock Premium.
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Invite 3 friends to join Study4XM and unlock the Offline AI-Guided Exam Simulator permanently for free!
        </p>
      </div>

      <div style={{ 
        background: 'var(--page-bg)', 
        border: '1px solid var(--page-border)', 
        borderRadius: 'var(--radius-lg)', 
        padding: '24px', 
        marginBottom: '24px',
        boxShadow: '0 4px 20px rgba(136, 19, 55, 0.05)',
        textAlign: 'center'
      }}>
        {isPremium ? (
          <div style={{ padding: '20px 0' }}>
            <Crown size={64} color="#fbbf24" style={{ margin: '0 auto 16px' }} />
            <h2 style={{ color: 'var(--text-ink)' }}>You are Premium!</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
              Congratulations! You have unlocked all premium features including the AI Exam Simulator.
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontWeight: 600 }}>Your Progress</span>
              <span style={{ fontWeight: 800, color: 'var(--rose-700)' }}>{successfulReferrals} / 3 Referrals</span>
            </div>
            <div style={{ height: '12px', background: 'var(--rose-100)', borderRadius: '999px', overflow: 'hidden', marginBottom: '24px' }}>
              <div style={{ 
                width: `${progressPct}%`, 
                height: '100%', 
                background: 'var(--rose-600)', 
                transition: 'width 0.5s ease' 
              }} />
            </div>

            <div style={{ background: 'var(--rose-50)', padding: '20px', borderRadius: '8px', border: '1px dashed var(--rose-300)' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 600 }}>
                Your Unique Referral Code
              </p>
              <div style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '4px', color: 'var(--rose-900)', marginBottom: '16px' }}>
                {referralCode}
              </div>
              <button 
                className="btn btn-primary"
                onClick={handleShare}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px' }}
              >
                <Share2 size={18} />
                <span>Share Code</span>
              </button>
            </div>
          </>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ padding: '16px', background: 'var(--rose-50)', borderRadius: '8px', border: '1px solid var(--page-border)' }}>
          <Users size={24} color="var(--rose-700)" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>1. Invite Friends</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Share your unique referral code with classmates.</p>
        </div>
        <div style={{ padding: '16px', background: 'var(--rose-50)', borderRadius: '8px', border: '1px solid var(--page-border)' }}>
          <Gift size={24} color="var(--rose-700)" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>2. They Sign Up</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>They create an account using your referral code.</p>
        </div>
        <div style={{ padding: '16px', background: 'var(--rose-50)', borderRadius: '8px', border: '1px solid var(--page-border)' }}>
          <Crown size={24} color="#fbbf24" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>3. Unlock Premium</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>After 3 successful signups, your account is upgraded to Premium!</p>
        </div>
      </div>
    </div>
  );
}
