import React, { useState } from 'react';
import { MOTIVATIONAL_QUOTES } from '../data/interactiveData';
import { RefreshCw, Sparkles } from 'lucide-react';

export default function MotivationBanner() {
  const [index, setIndex] = useState(0);

  const cycleQuote = () => {
    setIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
  };

  const current = MOTIVATIONAL_QUOTES[index];

  return (
    <div className="motivation-banner">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Sparkles size={16} color="var(--rose-700)" />
        <span>“{current.text}” — <span style={{ opacity: 0.85 }}>{current.author}</span></span>
      </div>
      <button className="refresh-quote-btn" onClick={cycleQuote} title="Next Quote">
        <RefreshCw size={13} />
        <span>New Quote</span>
      </button>
    </div>
  );
}
