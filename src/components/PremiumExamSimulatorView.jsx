import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Lock, Crown, Play, CheckCircle, BrainCircuit, CreditCard } from 'lucide-react';
import ExamSimulatorView from './ExamSimulatorView';
import CheckoutModal from './CheckoutModal';

export default function PremiumExamSimulatorView({ appState }) {
  const { currentUser, userData } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);
  
  // If not logged in or not premium, show the paywall
  const isPremium = userData?.isPremium === true;

  if (!currentUser || !isPremium) {
    return (
      <div className="book-page-shell" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{
          background: 'linear-gradient(145deg, #fef3c7, #fffbeb)',
          border: '2px solid #fbbf24',
          borderRadius: '16px',
          padding: '40px 30px',
          maxWidth: '500px',
          textAlign: 'center',
          boxShadow: '0 10px 25px rgba(251, 191, 36, 0.2)'
        }}>
          <Lock size={48} color="#b45309" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '1.8rem', color: '#92400e', marginBottom: '16px' }}>Premium Feature Locked</h2>
          <p style={{ color: '#b45309', marginBottom: '24px', lineHeight: 1.6 }}>
            The <strong>Offline AI-Guided Exam Simulator</strong> uses your Gemini AI key to generate timed, exam-like conditions and automatically grades your answers.
          </p>
          
          <ul style={{ textAlign: 'left', margin: '0 auto 24px', display: 'inline-block', color: '#92400e', listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={16} color="#059669" /> Smart Exam Generation
            </li>
            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={16} color="#059669" /> Automatic AI Grading
            </li>
            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={16} color="#059669" /> Detailed Feedback & Model Answers
            </li>
          </ul>

          <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              className="btn btn-primary"
              onClick={() => appState.navigate('refer-earn')} 
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 24px', fontSize: '1rem', background: '#d97706', borderColor: '#d97706' }}
            >
              <Crown size={20} />
              <span>Unlock for FREE (Invite 3 Friends)</span>
            </button>
            
            <div style={{ position: 'relative', margin: '10px 0' }}>
              <hr style={{ borderTop: '1px solid #fcd34d' }} />
              <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#fef3c7', padding: '0 10px', color: '#b45309', fontSize: '0.8rem', fontWeight: 600 }}>OR</span>
            </div>

            <button 
              className="btn btn-secondary"
              onClick={() => setShowCheckout(true)} 
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 24px', fontSize: '1rem', color: '#92400e', borderColor: '#f59e0b' }}
            >
              <CreditCard size={20} />
              <span>Buy Premium Now (৳500)</span>
            </button>
          </div>
        </div>

        <CheckoutModal isOpen={showCheckout} onClose={() => setShowCheckout(false)} />
      </div>
    );
  }

  // If premium, render the actual ExamSimulatorView but with a Premium Badge!
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 10, right: 10, background: '#fbbf24', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', zIndex: 10 }}>
        <Crown size={14} /> Premium User
      </div>
      <ExamSimulatorView appState={appState} />
    </div>
  );
}

