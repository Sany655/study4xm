import React from 'react';
import { Target, Moon, Sun, ArrowLeftRight, Menu } from 'lucide-react';

export default function Header({
  stats,
  isHorizontalMode,
  onToggleHorizontalMode,
  theme,
  onToggleTheme,
  onToggleMobileMenu
}) {
  return (
    <header className="top-header">
      <div className="header-left">
        <button className="mobile-menu-btn" onClick={onToggleMobileMenu}>
          <Menu size={20} />
        </button>
        <div className="header-title-group">
          <h1>
            <Target size={22} color="var(--rose-600)" />
            100/100 Exam Mission
          </h1>
          <span className="header-subtitle">Understand deeply. Recall quickly. Write perfectly.</span>
        </div>
      </div>

      <div className="header-stats-bar">
        <div className="stat-pill countdown-pill">
          <span className="label">Exam Countdown:</span>
          <span className="value">6d 14h</span>
        </div>
        <div className="stat-pill">
          <span className="label">Overall:</span>
          <span className="value">{stats.overallMastery}%</span>
        </div>
        <div className="stat-pill">
          <span className="label">ICT:</span>
          <span className="value">{stats.ictMastery}%</span>
        </div>
        <div className="stat-pill">
          <span className="label">Economics:</span>
          <span className="value">{stats.econMastery}%</span>
        </div>
      </div>

      <div className="header-actions">
        {/* Horizontal Page Changing Mode Switcher */}
        <button 
          className={`mode-toggle-btn ${isHorizontalMode ? 'active' : ''}`}
          onClick={onToggleHorizontalMode}
          title="Toggle Horizontal Page Changing Deck"
        >
          <ArrowLeftRight size={16} />
          <span>{isHorizontalMode ? 'Standard View' : 'Horizontal Deck Mode'}</span>
        </button>

        {/* Light Warm Rose / Dark Mode Toggle */}
        <button 
          className="icon-button"
          onClick={onToggleTheme}
          title="Toggle Light Warm Rose / Dark Rose Theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
