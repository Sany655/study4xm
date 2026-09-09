import React from 'react';

export default function MistakeNotebookView({ mistakes, onResolveMistake, onChime }) {
  const handleResolve = (id) => {
    onResolveMistake(id);
    if (onChime) onChime('success');
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--rose-700)', background: 'var(--rose-100)', padding: '3px 12px', borderRadius: 'var(--radius-full)' }}>
          📖 ব্যক্তিগত ভুল সংশোধনী খাতা (Mistake Notebook)
        </span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-ink)', margin: '6px 0 2px' }}>
          আমার ভুলসমূহ ও রিভিশন তালিকা
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          যাচাই কুইজে দেওয়া ভুল উত্তর ও দুর্বল ধারণাগুলো পরীক্ষার চূড়ান্ত প্রস্তুতির জন্য এখানে স্বয়ংক্রিয়ভাবে জমা হয়।
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {mistakes.length === 0 ? (
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'center' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '8px' }}>🎉</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-ink)' }}>কোনো অমীমাংসিত ভুল নেই!</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>আপনার নোটবুকে এই মুহূর্তে কোনো ভুল উত্তর বা রিভিশন পেন্ডিং নেই। চমৎকার প্রস্তুতি!</p>
          </div>
        ) : (
          mistakes.map((m) => (
            <div 
              key={m.id} 
              className="glass-panel" 
              style={{ padding: '20px', borderLeft: `4px solid ${m.resolved ? '#059669' : 'var(--rose-600)'}` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--rose-800)', background: 'var(--rose-100)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                  {m.subject} • {m.unit}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.date}</span>
              </div>

              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-ink)', marginBottom: '8px' }}>
                {m.question}
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginBottom: '12px', fontSize: '0.88rem' }}>
                <div style={{ background: '#fef2f2', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid #fecaca' }}>
                  <strong style={{ color: '#991b1b', display: 'block' }}>❌ আমার প্রদত্ত উত্তর:</strong>
                  <span>{m.studentAnswer}</span>
                </div>
                <div style={{ background: '#ecfdf5', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid #a7f3d0' }}>
                  <strong style={{ color: '#065f46', display: 'block' }}>✅ সঠিক বোর্ড উত্তর:</strong>
                  <span>{m.correctAnswer}</span>
                </div>
              </div>

              <div style={{ background: 'var(--book-bg)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '12px', border: '1px solid var(--page-border)' }}>
                <strong>🧠 মূল ব্যাখ্যা ও সঠিক ধারণা:</strong> {m.correctConcept}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                {!m.resolved ? (
                  <button className="btn btn-primary btn-sm" onClick={() => handleResolve(m.id)}>
                    ✓ সংশোধন সম্পন্ন চিহ্নিত করুন (+২৫ এক্সপি)
                  </button>
                ) : (
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#059669' }}>
                    ✓ রিভিশন ও সংশোধন সম্পন্ন
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
