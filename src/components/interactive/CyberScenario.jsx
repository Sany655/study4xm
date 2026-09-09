import React, { useState } from 'react';
import { SCENARIOS } from '../../data/interactiveData';

export default function CyberScenario({ onAddXP, onChime }) {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const scenario = SCENARIOS[activeScenarioIdx];

  const handleSelectChoice = (choice) => {
    setSelectedChoice(choice);
    if (choice.correct) {
      if (onChime) onChime('success');
      if (onAddXP) onAddXP(30, 'Cyber scenario mitigated');
    } else {
      if (onChime) onChime('warn');
    }
  };

  const handleTabChange = (idx) => {
    setActiveScenarioIdx(idx);
    setSelectedChoice(null);
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', margin: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            🛡️ Interactive Cyber Attack & Defense Simulator
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Make tactical security decisions against phishing threats and distributed DDoS sieges.
          </p>
        </div>
        <span style={{ fontSize: '0.75rem', background: 'var(--rose-100)', color: 'var(--rose-800)', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
          Unit 6 Defense
        </span>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {SCENARIOS.map((sc, i) => (
          <button
            key={sc.id}
            className={`btn btn-sm ${i === activeScenarioIdx ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleTabChange(i)}
          >
            Scenario {i + 1}: {sc.title}
          </button>
        ))}
      </div>

      <div style={{ background: 'var(--bg-main)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-warm)', marginBottom: '18px' }}>
        <span style={{ display: 'inline-block', background: '#fee2e2', color: '#991b1b', fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: 'var(--radius-full)', marginBottom: '10px' }}>
          🚨 THREAT INCIDENT: {scenario.title}
        </span>
        <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5 }}>
          {scenario.scenarioText}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
        {scenario.choices.map((choice, i) => {
          let btnClass = 'mcq-option-btn';
          if (selectedChoice) {
            if (choice === selectedChoice) {
              btnClass += choice.correct ? ' correct' : ' incorrect';
            } else if (choice.correct) {
              btnClass += ' correct';
            }
          }

          return (
            <button
              key={i}
              className={btnClass}
              disabled={selectedChoice !== null}
              onClick={() => handleSelectChoice(choice)}
            >
              <span style={{ fontWeight: 800, color: 'var(--rose-700)', width: '20px' }}>
                {String.fromCharCode(65 + i)}.
              </span>
              <span>{choice.text}</span>
            </button>
          );
        })}
      </div>

      {selectedChoice && (
        <div style={{
          padding: '14px 18px',
          borderRadius: 'var(--radius-sm)',
          background: selectedChoice.correct ? '#ecfdf5' : '#fef2f2',
          border: selectedChoice.correct ? '1px solid #10b981' : '1px solid #ef4444',
          color: selectedChoice.correct ? '#065f46' : '#991b1b',
          fontSize: '0.9rem'
        }}>
          <strong>{selectedChoice.correct ? '✅ THREAT DEFUSED!' : '❌ SYSTEM COMPROMISED!'}</strong> {selectedChoice.feedback}
        </div>
      )}
    </div>
  );
}
