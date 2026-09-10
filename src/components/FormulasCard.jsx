import React from 'react';
import { Calculator, Sparkles } from 'lucide-react';

/**
 * FormulasCard - Displays mathematical formulas, parameter breakdowns, and worked numerical examples.
 */
export default function FormulasCard({ formulas, title }) {
  if (!formulas || formulas.length === 0) return null;

  return (
    <div className="formulas-card-container">
      <div className="formulas-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="formula-badge">
            <Calculator size={14} /> গাণিতিক সূত্র ও সমাধান (Mathematical Models)
          </span>
        </div>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 2px' }}>
          {title || "প্রয়োজনীয় সূত্রাবলি ও হিসাবপ্রণালী"}
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
          বোর্ড পরীক্ষায় গাণিতিক অংশে পূর্ণ নম্বর নিশ্চিত করার জন্য সূত্র ও চলকসমূহের স্পষ্ট ব্যাখ্যা:
        </p>
      </div>

      <div className="formulas-grid">
        {formulas.map((item, idx) => (
          <div key={idx} className="formula-item-card">
            <div className="formula-item-title-row">
              <span className="formula-item-title">{item.name}</span>
              {item.source && <span className="formula-source-tag">{item.source}</span>}
            </div>

            {/* Formula display box */}
            <div className="formula-math-box">
              <code>{item.formula}</code>
            </div>

            {/* Parameters explanation */}
            {item.parameters && item.parameters.length > 0 && (
              <div className="formula-params-list">
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  চলকসমূহের পরিচিতি (Legend):
                </span>
                <ul>
                  {item.parameters.map((p, pIdx) => (
                    <li key={pIdx}>
                      <strong>{p.symbol}</strong> = {p.meaning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Worked calculation example */}
            {item.example && (
              <div className="formula-example-box">
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--rose-700)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                  <Sparkles size={13} /> বাস্তব গাণিতিক উদাহরণ ও সমাধান:
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {item.example}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
