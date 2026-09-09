import React from 'react';
import { 
  Home, 
  Monitor, 
  TrendingUp, 
  BookOpen, 
  Layers, 
  HelpCircle, 
  Edit3, 
  Scale, 
  Clock, 
  Award, 
  BookMarked, 
  Repeat, 
  Settings 
} from 'lucide-react';

export default function Sidebar({
  activeView,
  onNavigate,
  stats,
  isMobileOpen,
  onCloseMobile
}) {
  const handleNav = (view, topicId = null) => {
    onNavigate(view, topicId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="brand-title">
          <span>🎯</span>
          <span>EXAM 100/100</span>
        </div>
        <span className="brand-badge">Mastery System</span>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-title">Core Navigation</div>
        <button 
          className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleNav('dashboard')}
        >
          <Home size={18} className="nav-icon" />
          <span>Dashboard</span>
        </button>

        <div className="nav-section-title">Subjects Syllabus</div>
        <button 
          className={`nav-item ${activeView === 'ict' ? 'active' : ''}`}
          onClick={() => handleNav('ict')}
        >
          <Monitor size={18} className="nav-icon" />
          <span>ICT (9 Units)</span>
        </button>
        <div className="nav-sub-list">
          <button className="nav-sub-item" onClick={() => handleNav('learn', 'ict-u1-t1')}>Unit 1: Intro to ICT</button>
          <button className="nav-sub-item" onClick={() => handleNav('learn', 'ict-u2-t1')}>Unit 2: Hardware & OS</button>
          <button className="nav-sub-item" onClick={() => handleNav('learn', 'ict-u4-t1')}>Unit 4: Spreadsheets</button>
          <button className="nav-sub-item" onClick={() => handleNav('learn', 'ict-u7-t1')}>Unit 7: Networking & OSI</button>
          <button className="nav-sub-item" onClick={() => handleNav('learn', 'ict-u8-t1')}>Unit 8: AI & Data</button>
        </div>

        <button 
          className={`nav-item ${activeView === 'economics' ? 'active' : ''}`}
          onClick={() => handleNav('economics')}
        >
          <TrendingUp size={18} className="nav-icon" />
          <span>Economics (10 Topics)</span>
        </button>
        <div className="nav-sub-list">
          <button className="nav-sub-item" onClick={() => handleNav('learn', 'econ-t1-c1')}>Topic 1: Scarcity & Choice</button>
          <button className="nav-sub-item" onClick={() => handleNav('learn', 'econ-t2-c1')}>Topic 2: Supply & Demand</button>
          <button className="nav-sub-item" onClick={() => handleNav('learn', 'econ-t4-c1')}>Topic 4: Production & Cost</button>
          <button className="nav-sub-item" onClick={() => handleNav('learn', 'econ-t5-c1')}>Topic 5: Market Analysis</button>
          <button className="nav-sub-item" onClick={() => handleNav('learn', 'econ-t6-c1')}>Topic 6: Macro & GDP</button>
        </div>

        <div className="nav-section-title">Active Learning</div>
        <button 
          className={`nav-item ${activeView === 'learn' ? 'active' : ''}`}
          onClick={() => handleNav('learn')}
        >
          <BookOpen size={18} className="nav-icon" />
          <span>5-Level Learn</span>
        </button>
        <button 
          className={`nav-item ${activeView === 'flashcards' ? 'active' : ''}`}
          onClick={() => handleNav('flashcards')}
        >
          <Layers size={18} className="nav-icon" />
          <span>Flashcards (SRS)</span>
        </button>
        <button 
          className={`nav-item ${activeView === 'mcq' ? 'active' : ''}`}
          onClick={() => handleNav('mcq')}
        >
          <HelpCircle size={18} className="nav-icon" />
          <span>MCQ Practice</span>
        </button>
        <button 
          className={`nav-item ${activeView === 'writing' ? 'active' : ''}`}
          onClick={() => handleNav('writing')}
        >
          <Edit3 size={18} className="nav-icon" />
          <span>Writing Trainer</span>
        </button>
        <button 
          className={`nav-item ${activeView === 'differences' ? 'active' : ''}`}
          onClick={() => handleNav('differences')}
        >
          <Scale size={18} className="nav-icon" />
          <span>Difference Tables</span>
        </button>

        <div className="nav-section-title">Exam Testing</div>
        <button 
          className={`nav-item ${activeView === 'exam' ? 'active' : ''}`}
          onClick={() => handleNav('exam')}
        >
          <Clock size={18} className="nav-icon" />
          <span>Exam Simulator</span>
        </button>
        <button 
          className={`nav-item ${activeView === 'hundred' ? 'active' : ''}`}
          onClick={() => handleNav('hundred')}
        >
          <Award size={18} className="nav-icon" />
          <span>100/100 Mode</span>
        </button>
        <button 
          className={`nav-item ${activeView === 'mistakes' ? 'active' : ''}`}
          onClick={() => handleNav('mistakes')}
        >
          <BookMarked size={18} className="nav-icon" />
          <span>Mistake Notebook</span>
        </button>
        <button 
          className={`nav-item ${activeView === 'revision' ? 'active' : ''}`}
          onClick={() => handleNav('revision')}
        >
          <Repeat size={18} className="nav-icon" />
          <span>Spaced Revision</span>
        </button>
        <button 
          className={`nav-item ${activeView === 'settings' ? 'active' : ''}`}
          onClick={() => handleNav('settings')}
        >
          <Settings size={18} className="nav-icon" />
          <span>Settings</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="user-progress-snippet">
          <div className="level-avatar">100</div>
          <div className="user-meta">
            <div className="user-rank">{stats.rankTitle}</div>
            <div className="user-xp">Level {stats.level} • {stats.progressXP} / 300 XP</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
