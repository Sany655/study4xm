import React, { useState } from 'react';
import { getGeminiApiKey, setGeminiApiKey } from '../services/aiService';
import { Sparkles, Key, Check, AlertCircle, X, ExternalLink } from 'lucide-react';

export default function AiSettingsModal({ isOpen, onClose, onChime }) {
  const [apiKeyInput, setApiKeyInput] = useState(getGeminiApiKey());
  const [saveStatus, setSaveStatus] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  if (!isOpen) return null;

  const handleSave = () => {
    setGeminiApiKey(apiKeyInput);
    setSaveStatus('সংরক্ষিত হয়েছে!');
    if (onChime) onChime('success');
    setTimeout(() => setSaveStatus(null), 2500);
  };

  const handleClear = () => {
    setApiKeyInput('');
    setGeminiApiKey('');
    setTestResult(null);
    setSaveStatus('কী মুছে ফেলা হয়েছে। এখন অফলাইন মোড চলবে।');
    if (onChime) onChime('click');
    setTimeout(() => setSaveStatus(null), 2500);
  };

  const handleTestConnection = async () => {
    if (!apiKeyInput.trim()) {
      setTestResult({ success: false, message: 'অনুগ্রহ করে প্রথমে এপিআই কী টাইপ করুন।' });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKeyInput.trim()}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Hello, reply with 1 word: 'Connected'" }] }]
        })
      });

      if (res.ok) {
        setTestResult({ success: true, message: 'অভিনন্দন! Google Gemini API সফলভাবে সংযুক্ত হয়েছে।' });
        if (onChime) onChime('success');
      } else {
        const data = await res.json().catch(() => ({}));
        setTestResult({ success: false, message: `ত্রুটি: ${data.error?.message || res.statusText}` });
        if (onChime) onChime('warn');
      }
    } catch (err) {
      setTestResult({ success: false, message: `সংযোগ স্থাপন সম্ভব হয়নি: ${err.message}` });
      if (onChime) onChime('warn');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px'
    }}>
      <div style={{
        background: 'var(--page-bg)',
        border: '2px solid var(--rose-300)',
        borderRadius: 'var(--radius-lg)',
        maxWidth: '520px',
        width: '100%',
        padding: '28px 24px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
        position: 'relative'
      }}>
        {/* Close button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <div style={{ 
            background: 'var(--rose-100)', 
            color: 'var(--rose-700)', 
            padding: '8px', 
            borderRadius: 'var(--radius-md)' 
          }}>
            <Sparkles size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-ink)', margin: 0 }}>
              এআই টিউটর সেটিংস (Gemini API)
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              রিয়েল-টাইম কাস্টম সিলেবাস ব্যাখ্যা ও প্রম্পট মডিফায়ার
            </span>
          </div>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '16px' }}>
          আপনার নিজস্ব <strong>Google Gemini API Key</strong> যুক্ত করে সীমাহীন ও তাৎক্ষণিক রিয়েল-টাইম এআই ব্যাখ্যা উপভোগ করুন।
        </p>

        <div style={{ marginBottom: '14px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-ink)', display: 'block', marginBottom: '6px' }}>
            Gemini API Key:
          </label>
          <input 
            type="password"
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            placeholder="AIzaSy..."
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--rose-300)',
              background: 'var(--rose-50)',
              color: 'var(--text-ink)',
              fontSize: '0.9rem',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <button 
            onClick={handleSave}
            className="btn btn-primary btn-sm"
            style={{ padding: '8px 18px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Check size={14} />
            <span>সংরক্ষণ করুন</span>
          </button>

          <button 
            onClick={handleTestConnection}
            disabled={isTesting}
            className="btn btn-secondary btn-sm"
            style={{ padding: '8px 14px' }}
          >
            <span>{isTesting ? "যাচাই করা হচ্ছে..." : "সংযোগ টেস্ট করুন"}</span>
          </button>

          {apiKeyInput && (
            <button 
              onClick={handleClear}
              className="btn btn-secondary btn-sm"
              style={{ padding: '8px 14px', color: '#dc2626' }}
            >
              <span>মুছে ফেলুন</span>
            </button>
          )}
        </div>

        {/* Status / Message Alert */}
        {saveStatus && (
          <div style={{ 
            background: '#d1fae5', 
            color: '#065f46', 
            padding: '8px 12px', 
            borderRadius: 'var(--radius-sm)', 
            fontSize: '0.82rem',
            marginBottom: '12px'
          }}>
            ✓ {saveStatus}
          </div>
        )}

        {testResult && (
          <div style={{ 
            background: testResult.success ? '#d1fae5' : '#fee2e2', 
            color: testResult.success ? '#065f46' : '#991b1b', 
            padding: '8px 12px', 
            borderRadius: 'var(--radius-sm)', 
            fontSize: '0.82rem',
            marginBottom: '12px'
          }}>
            {testResult.message}
          </div>
        )}

        {/* Informational Help Note */}
        <div style={{ 
          background: 'var(--page-bg)', 
          border: '1px dashed var(--page-border)', 
          padding: '12px', 
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.78rem',
          color: 'var(--text-muted)'
        }}>
          <strong>💡 বিনামূল্যে এপিআই কী পাওয়ার উপায়:</strong>
          <p style={{ margin: '4px 0 8px' }}>
            গুগল এআই স্টুডিও থেকে সম্পূর্ণ বিনামূল্যে ব্যক্তিগত এপিআই কী তৈরি করতে পারেন:
          </p>
          <a 
            href="https://aistudio.google.com/app/apikey" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--rose-700)', 
              fontWeight: 700, 
              textDecoration: 'none', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '4px' 
            }}
          >
            <span>Google AI Studio - Get API Key</span>
            <ExternalLink size={12} />
          </a>
          <div style={{ marginTop: '8px', color: 'var(--text-body)' }}>
            <em>* নোট: এপিআই কী প্রদান না করলেও অন্তর্নির্মিত অফলাইন স্মার্ট অ্যাকাডেমিক ইঞ্জিন স্বয়ংক্রিয়ভাবে কাজ চালিয়ে যাবে।</em>
          </div>
        </div>
      </div>
    </div>
  );
}
