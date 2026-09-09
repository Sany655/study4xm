import React, { useState, useEffect } from 'react';
import ExcelSimulator from './interactive/ExcelSimulator';
import SupplyDemandCanvas from './interactive/SupplyDemandCanvas';

export default function HorizontalDeck({ onNavigate, onChime, onSpeak }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const slides = [
    {
      badge: "Exam Deck Orientation",
      title: "🎯 100/100 Exam Mission Deck",
      render: () => (
        <div style={{ textAlign: 'center', padding: '30px 20px' }}>
          <h3 style={{ fontSize: '1.7rem', fontWeight: 900, color: 'var(--rose-900)', marginBottom: '14px' }}>
            “Understand deeply. Recall quickly. Write perfectly.”
          </h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            Welcome to the tactile horizontal study deck. Swipe left/right or use your keyboard arrow keys 
            (<span className="kbd-badge">←</span> <span className="kbd-badge">→</span>) to flip between syllabus topics, 
            interactive tools, writing rubrics, and high-yield exam answers.
          </p>
          <div style={{ display: 'inline-flex', gap: '16px', background: 'var(--rose-100)', padding: '10px 24px', borderRadius: 'var(--radius-full)', fontWeight: 700, color: 'var(--rose-800)', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span>💻 9 ICT Units</span> • <span>📊 10 Economics Topics</span> • <span>⏱ Exam Simulator</span>
          </div>
        </div>
      )
    },
    {
      badge: "ICT • Unit 7",
      title: "OSI 7-Layer Reference Model",
      render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--rose-800)', display: 'block', marginBottom: '4px' }}>
              🇧🇩 BANGLA EXPLANATION
            </span>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontFamily: "'Hind Siliguri', sans-serif", lineHeight: 1.6, marginBottom: '14px' }}>
              কম্পিউটার নেটওয়ার্কে এক ডিভাইস থেকে অন্য ডিভাইসে ডেটা প্রেরণের ধাপগুলোকে ৭টি স্তরে ভাগ করা হয়েছে:
              Application, Presentation, Session, Transport, Network, Data Link, এবং Physical।
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
              <span className="keyword-chip">Layer 7: Application (HTTP/DNS)</span>
              <span className="keyword-chip">Layer 4: Transport (TCP/UDP)</span>
              <span className="keyword-chip">Layer 3: Network (IP/Routing)</span>
              <span className="keyword-chip">Layer 2: Data Link (MAC/Frames)</span>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('learn', 'ict-u7-t1')}>
              Deep Dive Topic ❯
            </button>
          </div>
          <div style={{ background: 'var(--bg-main)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-warm)' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--rose-900)', marginBottom: '8px' }}>
              📝 5-Mark Exam Answer Template:
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              1. Application: User interface protocols (HTTP, SMTP)<br/>
              2. Transport: End-to-end segmentation and flow control (TCP port numbers)<br/>
              3. Network: Logical packet routing across subnets using IP addresses<br/>
              4. Data Link: Local framing and physical MAC delivery on switches<br/>
              5. Physical: Raw binary bit transmission over cables/radio.
            </p>
          </div>
        </div>
      )
    },
    {
      badge: "Economics • Topic 2",
      title: "Law of Demand & Supply Equilibrium",
      render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--rose-800)', display: 'block', marginBottom: '4px' }}>
              🇧🇩 BANGLA EXPLANATION
            </span>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontFamily: "'Hind Siliguri', sans-serif", lineHeight: 1.6, marginBottom: '14px' }}>
              দাম বাড়লে চাহিদা কমে (বিপরীতমুখী), আর দাম বাড়লে যোগান বাড়ে (সমমুখী)। যে বিন্দুতে ক্রেতার চাহিদা ও বিক্রেতার যোগান সমান হয় (Qd = Qs), সেখানে ভারসাম্য দাম নির্ধারিত হয়।
            </p>
            <div style={{ background: 'var(--rose-50)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-warm)', marginBottom: '12px' }}>
              <strong style={{ color: 'var(--rose-900)' }}>Formula:</strong> Price Elasticity of Demand (PED) = (%ΔQd / %ΔP)
            </div>
          </div>
          <div style={{ background: 'var(--bg-main)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-warm)' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--rose-900)', marginBottom: '8px' }}>
              ⚖️ Movement Along vs Shift:
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              • <strong>Movement Along Curve:</strong> Solely caused by a change in own price (Expansion / Contraction).<br/>
              • <strong>Shift of Curve:</strong> Caused by non-price factors (Consumer income, tastes, substitutes).
            </p>
          </div>
        </div>
      )
    },
    {
      badge: "ICT Interactive Tool",
      title: "Unit 4 Spreadsheet Formula Runner",
      render: () => <ExcelSimulator onChime={onChime} />
    },
    {
      badge: "Economics Interactive Tool",
      title: "Supply & Demand Interactive Curve Simulator",
      render: () => <SupplyDemandCanvas />
    },
    {
      badge: "Exam Differences",
      title: "IPv4 vs. IPv6 & RAM vs. ROM Comparisons",
      render: () => (
        <div className="diff-table-container">
          <table className="diff-table" style={{ fontSize: '0.88rem' }}>
            <thead>
              <tr><th>Feature</th><th>IPv4</th><th>IPv6</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Address Length</strong></td><td>32 bits (4 bytes)</td><td>128 bits (16 bytes)</td></tr>
              <tr><td><strong>Format</strong></td><td>Dotted-decimal (192.168.1.1)</td><td>Hexadecimal (2001:0db8::)</td></tr>
              <tr><td><strong>Address Space</strong></td><td>~4.3 Billion</td><td>~3.4 x 10^38 (Virtually Infinite)</td></tr>
              <tr><td><strong>Security</strong></td><td>Optional IPSec</td><td>Natively Integrated IPSec</td></tr>
            </tbody>
          </table>
        </div>
      )
    },
    {
      badge: "Exam Readiness",
      title: "👑 Target 100/100: Are You Exam Ready?",
      render: () => (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🏆</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--rose-900)', marginBottom: '8px' }}>
            Calculate Your Readiness Score
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '550px', margin: '0 auto 20px' }}>
            Complete full timed exams and active recall sessions to unlock the official 100/100 Master Badge.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button className="btn btn-primary" onClick={() => onNavigate('exam')}>⏱ Start Mock Exam</button>
            <button className="btn btn-secondary" onClick={() => onNavigate('writing')}>✍️ Writing Trainer</button>
          </div>
        </div>
      )
    }
  ];

  const goToSlide = (index) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlideIndex(index);
      if (onChime) onChime('click');
    }
  };

  const nextSlide = () => {
    goToSlide((currentSlideIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  const handleTouchStart = (e) => {
    setTouchStart(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].screenX - touchStart;
    if (Math.abs(diff) > 50) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <div className="horizontal-deck-container">
      {/* Top Deck Bar */}
      <div className="deck-top-bar">
        <div className="deck-info">
          <span>↔️ Horizontal Deck Experience</span>
          <span className="deck-counter">
            {currentSlideIndex + 1} / {slides.length}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          <span>Navigate:</span>
          <span className="kbd-badge">←</span>
          <span className="kbd-badge">→</span>
          <span>or Swipe</span>
        </div>
      </div>

      {/* 3D Slide Stage */}
      <div 
        className="deck-stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, idx) => {
          const isActive = idx === currentSlideIndex;
          const isPrev = idx < currentSlideIndex;
          let slideClass = "deck-slide";
          if (isActive) slideClass += " active";
          else if (isPrev) slideClass += " prev-slide";

          return (
            <div key={idx} className={slideClass}>
              <div className="deck-card">
                <div className="deck-card-header">
                  <div>
                    <span className="deck-slide-subject-tag">{slide.badge}</span>
                    <h2 className="deck-slide-title">{slide.title}</h2>
                  </div>
                  <div className="deck-counter">Slide {idx + 1}</div>
                </div>
                <div className="deck-card-body">
                  {slide.render()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrow Buttons */}
      <button 
        className="deck-nav-btn deck-nav-prev" 
        onClick={prevSlide}
        title="Previous Slide (Arrow Left)"
        disabled={currentSlideIndex === 0}
        style={{ opacity: currentSlideIndex === 0 ? 0.4 : 1 }}
      >
        ❮
      </button>
      <button 
        className="deck-nav-btn deck-nav-next" 
        onClick={nextSlide}
        title="Next Slide (Arrow Right)"
      >
        ❯
      </button>

      {/* Bottom Pagination Dots */}
      <div className="deck-bottom-bar">
        <div className="deck-dots-container">
          {slides.map((_, idx) => (
            <div 
              key={idx}
              className={`deck-dot ${idx === currentSlideIndex ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
