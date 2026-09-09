import React from 'react';
import { DIFFERENCE_TABLES } from '../data/differenceData';

export default function DashboardView({
  stats,
  dailyMissions,
  onToggleMission,
  onNavigate
}) {
  return (
    <div>
      {/* 100/100 Mission Hero Card */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '28px', background: 'var(--grad-hero)', border: '1px solid var(--border-warm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--rose-700)', background: 'var(--rose-100)', padding: '3px 12px', borderRadius: 'var(--radius-full)' }}>
              🎯 100/100 Exam Mission
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)', margin: '8px 0 4px' }}>
              Understand deeply. Recall quickly. Write perfectly.
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
              Targeting 100/100 across both ICT & Economics. Active recall over passive reading.
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Final Exam Countdown</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--rose-700)' }}>
              6 DAYS 14 HOURS
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-grid">
        <div className="glass-panel stat-card">
          <div className="stat-header">
            <span className="stat-title">Overall Mastery</span>
            <div className="stat-icon">🎯</div>
          </div>
          <div className="stat-value">{stats.overallMastery}%</div>
          <div className="stat-footer">
            <span>Target: 100% Exam Grade</span>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-header">
            <span className="stat-title">ICT Progress</span>
            <div className="stat-icon">💻</div>
          </div>
          <div className="stat-value">{stats.ictMastery}%</div>
          <div className="stat-footer">
            <span>9 Syllabus Units</span>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-header">
            <span className="stat-title">Economics Progress</span>
            <div className="stat-icon">📊</div>
          </div>
          <div className="stat-value">{stats.econMastery}%</div>
          <div className="stat-footer">
            <span>10 Extracted Topics</span>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-header">
            <span className="stat-title">Mistakes Logged</span>
            <div className="stat-icon">📖</div>
          </div>
          <div className="stat-value">{stats.unresolvedMistakesCount}</div>
          <div className="stat-footer">
            <span>Requires active revision</span>
          </div>
        </div>
      </div>

      {/* Daily Mission System */}
      <div className="daily-mission-card">
        <div className="mission-header">
          <div className="mission-title">
            <span>📋</span> Today's Study Mission & Daily Goals
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--rose-700)', background: 'var(--rose-100)', padding: '3px 12px', borderRadius: 'var(--radius-full)' }}>
            Goal: Complete missions to earn bonus XP
          </span>
        </div>

        <ul className="mission-list">
          {dailyMissions.map((m) => (
            <li key={m.id} className={`mission-item ${m.completed ? 'completed' : ''}`}>
              <input 
                type="checkbox" 
                className="mission-checkbox" 
                checked={m.completed} 
                onChange={() => onToggleMission(m.id)}
              />
              <span style={{ flex: 1, fontWeight: 600 }}>{m.text}</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--rose-700)' }}>+{m.xp} XP</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Two Subject Cards */}
      <div className="subjects-section-grid">
        <div className="subject-card">
          <span className="subject-card-badge">💻 Subject 1</span>
          <h3 className="subject-title">ICT — Information & Communication Technology</h3>
          <p className="subject-desc">
            Computer hardware, operating systems, MS Word, Excel formulas, PowerPoint, cybersecurity, OSI 7-layer model, and AI/ML concepts.
          </p>
          <div className="subject-meta-row">
            <span>Mastery: {stats.ictMastery}%</span>
            <span>9 Core Units</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${stats.ictMastery}%` }} />
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => onNavigate('ict')}>
            Continue ICT Syllabus ❯
          </button>
        </div>

        <div className="subject-card">
          <span className="subject-card-badge">📊 Subject 2</span>
          <h3 className="subject-title">Economics — Core Foundations & Macroeconomics</h3>
          <p className="subject-desc">
            Supply & demand curves, elasticity, consumer utility, production cost curves, perfect competition vs monopoly, GDP, trade, and public finance.
          </p>
          <div className="subject-meta-row">
            <span>Mastery: {stats.econMastery}%</span>
            <span>10 Extracted Topics</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${stats.econMastery}%` }} />
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => onNavigate('economics')}>
            Continue Economics Syllabus ❯
          </button>
        </div>
      </div>

      {/* Quick Difference Tables Teaser */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            ⚖️ High-Yield Exam Difference Tables
          </h3>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('differences')}>
            View All Comparisons ❯
          </button>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Master critical distinctions that examiners test in 5-mark and 10-mark questions:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {DIFFERENCE_TABLES.slice(0, 6).map((d) => (
            <button key={d.id} className="btn btn-secondary btn-sm" onClick={() => onNavigate('differences', d.id)}>
              {d.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
