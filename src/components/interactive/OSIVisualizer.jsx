import React, { useState } from 'react';
import { OSI_LAYERS } from '../../data/interactiveData';

export default function OSIVisualizer({ onSpeak, onChime }) {
  const [selectedLayerNum, setSelectedLayerNum] = useState(7);
  const currentLayer = OSI_LAYERS.find(l => l.layerNum === selectedLayerNum) || OSI_LAYERS[0];

  const handleSelect = (num) => {
    setSelectedLayerNum(num);
    if (onChime) onChime('click');
  };

  const handleListen = () => {
    if (onSpeak) {
      onSpeak(`Layer ${currentLayer.layerNum}: ${currentLayer.name}. ${currentLayer.english}. Protocols include ${currentLayer.protocols}`);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', margin: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            🌐 Interactive OSI 7-Layer Visualizer
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Click each layer to explore its purpose, Bangla explanation, protocols, and exam questions.
          </p>
        </div>
        <span style={{ fontSize: '0.75rem', background: 'var(--rose-100)', color: 'var(--rose-800)', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
          Unit 7 Stack
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {/* Layer Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {OSI_LAYERS.map(layer => {
            const isActive = layer.layerNum === selectedLayerNum;
            return (
              <button
                key={layer.layerNum}
                onClick={() => handleSelect(layer.layerNum)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: isActive ? '1px solid transparent' : '1px solid var(--border-subtle)',
                  background: isActive ? 'var(--grad-rose-button)' : 'var(--bg-surface)',
                  color: isActive ? '#fff' : 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: isActive ? '0 4px 14px var(--rose-gold-glow)' : 'none',
                  transition: 'all 0.18s ease'
                }}
              >
                <span>{layer.name}</span>
                <span style={{ opacity: 0.8, fontSize: '0.8rem' }}>L{layer.layerNum}</span>
              </button>
            );
          })}
        </div>

        {/* Layer Details Box */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-warm)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--rose-700)' }}>
              Layer {currentLayer.layerNum}: {currentLayer.name}
            </h4>
            <button className="btn btn-outline-rose btn-sm" onClick={handleListen}>
              🔊 Listen
            </button>
          </div>

          <div style={{ marginBottom: '14px', padding: '10px 14px', background: 'var(--bg-main)', borderLeft: '3px solid var(--rose-600)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--rose-800)', display: 'block', marginBottom: '4px' }}>
              🇧🇩 BANGLA EXPLANATION
            </span>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontFamily: "'Hind Siliguri', sans-serif" }}>
              {currentLayer.bangla}
            </p>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              ROLE & FUNCTION
            </span>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{currentLayer.english}</p>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              PROTOCOLS & STANDARDS
            </span>
            <code style={{ background: 'var(--rose-100)', color: 'var(--rose-900)', padding: '4px 10px', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: 600 }}>
              {currentLayer.protocols}
            </code>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              REAL-WORLD SCENARIO
            </span>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              💡 {currentLayer.example}
            </p>
          </div>

          <div style={{ background: 'var(--rose-50)', border: '1px dashed var(--border-warm)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--rose-800)', display: 'block', marginBottom: '4px' }}>
              🎯 EXPECTED EXAM QUESTION
            </span>
            <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {currentLayer.examQuestion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
