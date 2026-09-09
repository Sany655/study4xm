import React, { useState } from 'react';
import { ICT_SYLLABUS } from '../data/ictData';
import { ECONOMICS_SYLLABUS } from '../data/economicsData';

export default function FlashcardsView({ onUpdateSRS, onChime }) {
  // Collect flashcards
  const cards = [];
  ICT_SYLLABUS.forEach(u => {
    u.topics.forEach(t => {
      if (t.flashcards) {
        t.flashcards.forEach(fc => cards.push({ ...fc, subject: "আইসিটি", unit: u.unitTitle }));
      }
    });
  });
  ECONOMICS_SYLLABUS.forEach(t => {
    t.concepts.forEach(c => {
      if (c.flashcards) {
        c.flashcards.forEach(fc => cards.push({ ...fc, subject: "অর্থনীতি", unit: t.title }));
      }
    });
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const card = cards[currentIndex] || cards[0];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (onChime) onChime('click');
  };

  const handleSRSRating = (rating) => {
    onUpdateSRS(`fc-${currentIndex}`, rating);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--rose-700)', background: 'var(--rose-100)', padding: '3px 12px', borderRadius: 'var(--radius-full)' }}>
          🃏 স্পেসড রেপিটিশন ডিজিটাল ফ্ল্যাশকার্ড (SRS Flashcards)
        </span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-ink)', margin: '6px 0 2px' }}>
          কার্ড নং {currentIndex + 1} / {cards.length}
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{card.subject} • {card.unit}</p>
      </div>

      <div className="flashcard-wrapper">
        <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
          <div className="flashcard-face flashcard-front">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>
              সামনের পিঠ (প্রশ্ন ও ধারণা)
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-ink)', lineHeight: 1.4 }}>
              {card.front}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--rose-600)', fontWeight: 600, marginTop: '20px' }}>
              👆 উত্তর দেখতে কার্ডে ক্লিক করে উল্টান
            </span>
          </div>

          <div className="flashcard-face flashcard-back">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--rose-900)', textTransform: 'uppercase', marginBottom: '12px' }}>
              পেছনের পিঠ (সংজ্ঞা ও মূল বিষয়বস্তু)
            </span>
            <p style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-ink)', lineHeight: 1.5 }}>
              {card.back}
            </p>
          </div>
        </div>

        <div className="srs-buttons-row">
          <button className="btn btn-sm btn-srs-again" onClick={() => handleSRSRating('again')}>আবার পড়ুন (১ দিন)</button>
          <button className="btn btn-sm btn-srs-hard" onClick={() => handleSRSRating('hard')}>কঠিন (২ দিন)</button>
          <button className="btn btn-sm btn-srs-good" onClick={() => handleSRSRating('good')}>মোটামুটি (৪ দিন)</button>
          <button className="btn btn-sm btn-srs-easy" onClick={() => handleSRSRating('easy')}>সহজ (৭ দিন)</button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '24px' }}>
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => {
            setIsFlipped(false);
            setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
          }}
        >
          ◀ পূর্ববর্তী কার্ড
        </button>
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => {
            setIsFlipped(false);
            setCurrentIndex((prev) => (prev + 1) % cards.length);
          }}
        >
          পরবর্তী কার্ড ▶
        </button>
      </div>
    </div>
  );
}
