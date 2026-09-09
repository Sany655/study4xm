import React, { useState } from 'react';

export default function PowerPointBuilder({ onChime }) {
  const slides = [
    "Title: Mastering ICT & Economics 100/100",
    "Point 1: Understand Concept in Bangla & English",
    "Point 2: Technical Keywords & Precision Writing",
    "Result: 100/100 Exam Readiness Achieved!"
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [transitionEffect, setTransitionEffect] = useState('fade');
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerTransition = () => {
    setIsAnimating(true);
    if (onChime) onChime('click');
    setTimeout(() => {
      setIsAnimating(false);
    }, 450);
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    triggerTransition();
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', margin: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            📽️ Interactive Presentation & Slide Transition Builder
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Preview transition mechanisms and slide layouts for Unit 5
          </p>
        </div>
        <span style={{ fontSize: '0.75rem', background: 'var(--rose-100)', color: 'var(--rose-800)', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
          Unit 5 Tool
        </span>
      </div>

      <div style={{
        width: '100%',
        height: '220px',
        background: 'linear-gradient(135deg, #fff1f3, #ffe4e9)',
        border: '1px solid var(--border-warm)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          fontSize: '1.35rem',
          fontWeight: 800,
          color: 'var(--rose-900)',
          textAlign: 'center',
          padding: '0 24px',
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating 
            ? (transitionEffect === 'zoom' ? 'scale(0.3)' : transitionEffect === 'slide' ? 'translateX(80px)' : 'none')
            : 'none',
          transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}>
          {slides[currentSlideIndex]}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Transition:</label>
          <select 
            value={transitionEffect}
            onChange={(e) => setTransitionEffect(e.target.value)}
            className="btn btn-secondary btn-sm"
            style={{ padding: '6px 12px' }}
          >
            <option value="fade">Smooth Fade</option>
            <option value="zoom">Dynamic Zoom</option>
            <option value="slide">Slide Push</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-primary btn-sm" onClick={triggerTransition}>
            ▶ Play Effect
          </button>
          <button className="btn btn-secondary btn-sm" onClick={nextSlide}>
            Next Slide ❯
          </button>
        </div>
      </div>
    </div>
  );
}
