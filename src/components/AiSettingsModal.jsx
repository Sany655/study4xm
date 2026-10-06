import React, { useState } from 'react';
import { getGeminiApiKey, getOpenAIApiKey, getAnthropicApiKey, setApiKeys } from '../services/aiService';
import { Sparkles, Key, Check, AlertCircle, X, ExternalLink, Shield } from 'lucide-react';

export default function AiSettingsModal({ isOpen, onClose, onChime }) {
  const [geminiKey, setGeminiKey] = useState(getGeminiApiKey());
  const [openaiKey, setOpenaiKey] = useState(getOpenAIApiKey());
  const [anthropicKey, setAnthropicKey] = useState(getAnthropicApiKey());
  const [saveStatus, setSaveStatus] = useState(null);

  React.useEffect(() => {
    if (isOpen) {
      setGeminiKey(getGeminiApiKey());
      setOpenaiKey(getOpenAIApiKey());
      setAnthropicKey(getAnthropicApiKey());
      setSaveStatus(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiKeys({ gemini: geminiKey, openai: openaiKey, anthropic: anthropicKey });
    setSaveStatus('কীসমূহ সংরক্ষিত হয়েছে! লাইভ AI সফলভাবে সক্রিয় করা হয়েছে।');
    if (onChime) onChime('success');
    setTimeout(() => {
      setSaveStatus(null);
      onClose();
    }, 1100);
  };

  const handleClear = () => {
    setGeminiKey('');
    setOpenaiKey('');
    setAnthropicKey('');
    setApiKeys({ gemini: '', openai: '', anthropic: '' });
    setSaveStatus('কী মুছে ফেলা হয়েছে। এখন অফলাইন মোড চলবে।');
    if (onChime) onChime('click');
    setTimeout(() => setSaveStatus(null), 2000);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(5px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px'
    }}>
      <div style={{
        background: 'var(--page-bg)', border: '2px solid var(--rose-300)',
        borderRadius: 'var(--radius-lg)', maxWidth: '520px', width: '100%',
        padding: '28px 24px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)', position: 'relative'
      }}>
        {/* Close button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px', background: 'transparent',
          border: 'none', cursor: 'pointer', color: 'var(--text-muted)'
        }}>
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <div style={{ background: 'var(--rose-100)', color: 'var(--rose-700)', padding: '8px', borderRadius: 'var(--radius-md)' }}>
            <Sparkles size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-ink)', margin: 0 }}>
              এআই টিউটর কনফিগারেশন (Client-Side)
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              আপনার নিজস্ব API কী ব্যবহার করুন (সুরক্ষিত, ব্রাউজারেই সংরক্ষিত)
            </span>
          </div>
        </div>

        <div style={{ 
          background: '#eff6ff', border: '1px solid #bfdbfe', padding: '10px', 
          borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: '#1e3a8a', 
          display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'flex-start' 
        }}>
          <Shield size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>কোনো API Key সার্ভারে সেভ হয় না। এটি শুধুমাত্র আপনার ব্রাউজারের Local Storage-এ সেভ থাকে।</span>
        </div>

        {/* Gemini Input */}
        <div style={{ marginBottom: '14px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-ink)', display: 'block', marginBottom: '6px' }}>
            Google Gemini API Key (ডিফল্ট):
          </label>
          <input 
            type="password" value={geminiKey} onChange={(e) => setGeminiKey(e.target.value)}
            placeholder="AIzaSy..." className="api-input"
            style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--rose-300)', background: 'var(--rose-50)', color: 'var(--text-ink)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
          />
          <div style={{ marginTop: '6px', fontSize: '0.75rem' }}>
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--rose-600)', textDecoration: 'underline' }}>Get a FREE Gemini API Key here</a>
          </div>
        </div>

        {/* OpenAI Input */}
        <div style={{ marginBottom: '14px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-ink)', display: 'block', marginBottom: '6px' }}>
            OpenAI API Key (ঐচ্ছিক):
          </label>
          <input 
            type="password" value={openaiKey} onChange={(e) => setOpenaiKey(e.target.value)}
            placeholder="sk-..." className="api-input"
            style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', background: '#f8fafc', color: 'var(--text-ink)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
          />
          <div style={{ marginTop: '6px', fontSize: '0.75rem' }}>
            <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" style={{ color: '#0f172a', textDecoration: 'underline' }}>Get OpenAI API Key here</a>
          </div>
        </div>

        {/* Anthropic Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-ink)', display: 'block', marginBottom: '6px' }}>
            Anthropic API Key (ঐচ্ছিক):
          </label>
          <input 
            type="password" value={anthropicKey} onChange={(e) => setAnthropicKey(e.target.value)}
            placeholder="sk-ant-..." className="api-input"
            style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', background: '#f8fafc', color: 'var(--text-ink)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
          />
          <div style={{ marginTop: '6px', fontSize: '0.75rem' }}>
            <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" style={{ color: '#0f172a', textDecoration: 'underline' }}>Get Anthropic API Key here</a>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <button onClick={handleSave} className="btn btn-primary btn-sm" style={{ padding: '8px 18px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Check size={14} /> <span>সংরক্ষণ করুন</span>
          </button>

          {(geminiKey || openaiKey || anthropicKey) && (
            <button onClick={handleClear} className="btn btn-secondary btn-sm" style={{ padding: '8px 14px', color: '#dc2626' }}>
              <span>সব মুছে ফেলুন</span>
            </button>
          )}
        </div>

        {/* Status / Message Alert */}
        {saveStatus && (
          <div style={{ background: '#d1fae5', color: '#065f46', padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', marginBottom: '12px' }}>
            ✓ {saveStatus}
          </div>
        )}
      </div>
    </div>
  );
}
