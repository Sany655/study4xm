import React from 'react';
import { ICT_SYLLABUS } from '../data/ictData';
import ExcelSimulator from './interactive/ExcelSimulator';
import OSIVisualizer from './interactive/OSIVisualizer';
import PowerPointBuilder from './interactive/PowerPointBuilder';
import CyberScenario from './interactive/CyberScenario';

export default function ICTView({ onNavigate, onSpeak, onChime, onAddXP }) {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--rose-700)', background: 'var(--rose-100)', padding: '3px 12px', borderRadius: 'var(--radius-full)' }}>
          💻 Complete ICT Syllabus
        </span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)', margin: '8px 0 4px' }}>
          Information and Communication Technology (9 Units)
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Select any unit to learn concepts, test active recall, or launch interactive visualizers.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        {ICT_SYLLABUS.map((u) => (
          <div key={u.unitId} className="glass-panel" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <span className="priority-stars">{"★".repeat(u.priority)}</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {u.unitTitle}
                </h3>
              </div>
              <span style={{ fontSize: '0.75rem', background: 'var(--bg-main)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontWeight: 600, border: '1px solid var(--border-subtle)' }}>
                {u.topics.length} Key Concept{u.topics.length > 1 ? 's' : ''}
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              {u.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {u.topics.map((t) => (
                <button 
                  key={t.id} 
                  className="btn btn-secondary btn-sm"
                  onClick={() => onNavigate('learn', t.id)}
                >
                  📖 {t.title}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Embedded Interactive Tools */}
      <ExcelSimulator onChime={onChime} />
      <OSIVisualizer onSpeak={onSpeak} onChime={onChime} />
      <PowerPointBuilder onChime={onChime} />
      <CyberScenario onAddXP={onAddXP} onChime={onChime} />
    </div>
  );
}
