import React from 'react';

export default function SpacedRevisionView() {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--rose-700)', background: 'var(--rose-100)', padding: '3px 12px', borderRadius: 'var(--radius-full)' }}>
          🔁 স্পেসড রিভিশন ট্র্যাকার (Spaced Revision)
        </span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-ink)', margin: '6px 0 2px' }}>
          পরিকল্পিত রিভিশন শিডিউল
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          স্মৃতি ধরে রাখার বৈজ্ঞানিক নীতি (Ebbinghaus Forgetting Curve) অনুযায়ী বিষয়গুলো নির্দিষ্ট বিরতিতে পুনরাবৃত্তি হয় যাতে পরীক্ষার দিন ১০০/১০০ মনে থাকে।
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '20px', borderTop: '4px solid #ef4444' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#b91c1c', marginBottom: '8px' }}>🔴 আজই রিভিশন করুন</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>সর্বাধিক অগ্রাধিকার ও দুর্বল বিষয়</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
            <li style={{ padding: '6px 10px', background: 'var(--book-bg)', borderRadius: 'var(--radius-sm)' }}>ইউনিট ৭: ওএসআই মডেল ও আইপি অ্যাড্রেসিং</li>
            <li style={{ padding: '6px 10px', background: 'var(--book-bg)', borderRadius: 'var(--radius-sm)' }}>টপিক ৪: গড় ব্যয় (AC) ও প্রান্তিক ব্যয় (MC) রেখা</li>
          </ul>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderTop: '4px solid #f59e0b' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#b45309', marginBottom: '8px' }}>🟡 আগামীকাল রিভিশন</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>মাঝারি ব্যবধানের পুনরাবৃত্তি</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
            <li style={{ padding: '6px 10px', background: 'var(--book-bg)', borderRadius: 'var(--radius-sm)' }}>টপিক ২: চাহিদার দাম স্থিতিস্থাপকতা</li>
            <li style={{ padding: '6px 10px', background: 'var(--book-bg)', borderRadius: 'var(--radius-sm)' }}>ইউনিট ৬: সাইবার নিরাপত্তা ও 2FA প্রযুক্তি</li>
          </ul>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderTop: '4px solid #3b82f6' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#1d4ed8', marginBottom: '8px' }}>🔵 ৩ দিন পর রিভিশন</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>ধারণা সুদৃঢ় করার ধাপ</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
            <li style={{ padding: '6px 10px', background: 'var(--book-bg)', borderRadius: 'var(--radius-sm)' }}>ইউনিট ৪: স্প্রেডশিট =SUM, =IF ফাংশন</li>
            <li style={{ padding: '6px 10px', background: 'var(--book-bg)', borderRadius: 'var(--radius-sm)' }}>টপিক ৬: জিডিপি এবং দ্বৈত গণনার সমস্যা</li>
          </ul>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderTop: '4px solid #10b981' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#047857', marginBottom: '8px' }}>🟢 আয়ত্তে এসেছে (Mastered)</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>স্থায়ী স্মৃতিতে সংরক্ষিত</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
            <li style={{ padding: '6px 10px', background: 'var(--book-bg)', borderRadius: 'var(--radius-sm)' }}>ইউনিট ১: উপাত্ত বনাম তথ্য ও IPOS চক্র</li>
            <li style={{ padding: '6px 10px', background: 'var(--book-bg)', borderRadius: 'var(--radius-sm)' }}>টপিক ১: দুষ্প্রাপ্যতা ও ইতিবাচক অর্থনীতি</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
