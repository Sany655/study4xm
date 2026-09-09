import React from 'react';
import { ECONOMICS_SYLLABUS } from '../data/economicsData';
import SupplyDemandCanvas from './interactive/SupplyDemandCanvas';

export default function EconomicsView({ onNavigate }) {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--rose-700)', background: 'var(--rose-100)', padding: '3px 12px', borderRadius: 'var(--radius-full)' }}>
          📊 Complete Economics Syllabus (tisha study.pdf)
        </span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)', margin: '8px 0 4px' }}>
          Economics Exam Mastery (Topics 1–10)
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Master definitions, curves, formulas, difference tables, and 2/5/10-mark exam templates.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        {ECONOMICS_SYLLABUS.map((t) => (
          <div key={t.topicId} className="glass-panel" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <span className="priority-stars">{"★".repeat(t.priority)}</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {t.title}
                </h3>
              </div>
              <span style={{ fontSize: '0.75rem', background: 'var(--bg-main)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontWeight: 600, border: '1px solid var(--border-subtle)' }}>
                {t.concepts.length} Concept Section
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              {t.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {t.concepts.map((c) => (
                <button 
                  key={c.id} 
                  className="btn btn-secondary btn-sm"
                  onClick={() => onNavigate('learn', c.id)}
                >
                  📈 {c.title}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SupplyDemandCanvas />
    </div>
  );
}
