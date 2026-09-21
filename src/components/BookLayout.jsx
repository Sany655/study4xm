import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { buildBookPagesForCourse } from '../data/bookPages';
import { getCourseConfig, getYearConfig } from '../data/curriculumRegistry';
import YearCourseSelector from './YearCourseSelector';
import { useDeviceSensors } from '../hooks/useDeviceSensors';
import BookPage from './BookPage';
import TableOfContents from './TableOfContents';
import DifferenceTablesView from './DifferenceTablesView';
import FlashcardsView from './FlashcardsView';
import WritingTrainerView from './WritingTrainerView';
import ExamSimulatorView from './ExamSimulatorView';
import PremiumExamSimulatorView from './PremiumExamSimulatorView';
import MistakeNotebookView from './MistakeNotebookView';
import SpacedRevisionView from './SpacedRevisionView';
import ReferAndEarnView from './ReferAndEarnView';

import GuidedTour from './GuidedTour';
import AiSettingsModal from './AiSettingsModal';

import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  RotateCcw, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Award, 
  CheckCircle,
  Clock,
  Sparkles, 
  List, 
  AlertCircle, 
  Home, 
  Compass, 
  HelpCircle, 
  GraduationCap,
  X 
} from 'lucide-react';

export default function BookLayout({ appState, audio }) {
  const {
    state,
    metrics,
    toggleTopicComplete,
    toggleBookmark,
    recordQuizAttempt,
    recordActiveRecall,
    logMistake,
    resolveMistake,
    updateFlashcardSRS,
    toggleTheme,
    resetAllProgress,
    addXP,
    selectCourse
  } = appState;

  const { playChime, speak, stopSpeaking } = audio;

  const currentCourseId = state.currentCourse || 'intro-sociology';
  const currentYearId = state.currentYear || 1;
  const currentCourseMeta = getCourseConfig(currentYearId, currentCourseId);
  const currentYearMeta = getYearConfig(currentYearId);

  const bookPages = useMemo(() => {
    return buildBookPagesForCourse(currentCourseId, currentYearId);
  }, [currentCourseId, currentYearId]);

  const [isYearModalOpen, setIsYearModalOpen] = useState(false);

  // Persist current page in localStorage
  const [currentPage, setCurrentPage] = useState(() => {
    try {
      const saved = localStorage.getItem('TISHA_BOOK_CURRENT_PAGE');
      const num = parseInt(saved, 10);
      return !isNaN(num) && num >= 1 && num <= bookPages.length ? num : 1;
    } catch {
      return 1;
    }
  });

  const handleSelectCourse = (yearId, courseId) => {
    selectCourse(yearId, courseId);
    setCurrentPage(1);
    setIsYearModalOpen(false);
  };

  const [isTocDrawerOpen, setIsTocDrawerOpen] = useState(false);
  const [showBookmarksModal, setShowBookmarksModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [showWelcomePrompt, setShowWelcomePrompt] = useState(false);
  const [isAiSettingsOpen, setIsAiSettingsOpen] = useState(false);

  // Check if first-time visitor for onboarding tour
  useEffect(() => {
    try {
      const hasSeenTour = localStorage.getItem('study4xm_tour_completed');
      if (!hasSeenTour) {
        const timer = setTimeout(() => {
          setShowWelcomePrompt(true);
        }, 1400);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  // Drag & Swipe gesture state
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPageAnimating, setIsPageAnimating] = useState(false);

  const touchStartRef = useRef({ x: 0, y: 0, time: 0, isHorizontal: null });
  const mouseStartRef = useRef({ x: 0, isDown: false, time: 0 });

  // Keep page index synced to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('TISHA_BOOK_CURRENT_PAGE', currentPage.toString());
    } catch (e) {
      console.error(e);
    }
  }, [currentPage]);

  // Auto-hide bottom dock on scroll down, reveal on scroll up
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollYRef.current + 20 && currentScrollY > 80) {
        setIsNavVisible(false);
      } else if (currentScrollY < lastScrollYRef.current - 12 || currentScrollY < 80) {
        setIsNavVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Creative Android Hardware Sensors & Haptics Hook
  const handleShake = useCallback(() => {
    // Jump to high-yield flashcards / active recall when phone is shaken!
    const flashcardPage = bookPages.find(p => p.type === 'flashcards');
    if (flashcardPage) {
      goToPage(flashcardPage.pageNumber);
    }
  }, [bookPages, goToPage]);

  const { isSensorAvailable, isHapticAvailable, isOnline, tilt, shakeToast, triggerHaptic } = useDeviceSensors({
    onShakeDetected: handleShake
  });

  // Page turn function
  const goToPage = useCallback((pageNum) => {
    if (pageNum < 1 || pageNum > bookPages.length) return;
    setCurrentPage(pageNum);
    triggerHaptic('pageTurn');
    if (!isAudioMuted && playChime) {
      playChime('click');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isAudioMuted, playChime, bookPages.length, triggerHaptic]);

  const nextPage = useCallback(() => {
    if (currentPage < bookPages.length) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, goToPage, bookPages.length]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  // Keyboard navigation (Left/Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't flip page if user is currently typing in an input, textarea, or notes
      const activeTag = document.activeElement ? document.activeElement.tagName : '';
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevPage();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToPage(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToPage(bookPages.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage, goToPage, bookPages.length]);

  // =========================================================================
  // TOUCH GESTURES (Mobile / Tablet Swipe)
  // =========================================================================
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
      isHorizontal: null // undetermined yet
    };
    setIsDragging(true);
    setIsPageAnimating(false);
  };

  const handleTouchMove = (e) => {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    const diffX = touch.clientX - touchStartRef.current.x;
    const diffY = touch.clientY - touchStartRef.current.y;

    // Detect gesture direction on first significant movement
    if (touchStartRef.current.isHorizontal === null) {
      if (Math.abs(diffX) > 10 || Math.abs(diffY) > 10) {
        touchStartRef.current.isHorizontal = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    if (!touchStartRef.current.isHorizontal) {
      return; // allow natural vertical scrolling
    }

    // Apply boundary resistance
    let clampedDiffX = diffX;
    if ((currentPage === 1 && diffX > 0) || (currentPage === bookPages.length && diffX < 0)) {
      clampedDiffX = diffX * 0.25;
    }

    setDragOffset(clampedDiffX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (touchStartRef.current.isHorizontal) {
      const elapsed = Math.max(1, Date.now() - touchStartRef.current.time);
      const velocity = dragOffset / elapsed;
      const threshold = 55;

      if (dragOffset < -threshold || velocity < -0.35) {
        if (currentPage < bookPages.length) {
          setIsPageAnimating(true);
          setDragOffset(-window.innerWidth * 0.4);
          setTimeout(() => {
            nextPage();
            setDragOffset(0);
            setIsPageAnimating(false);
          }, 180);
          return;
        }
      } else if (dragOffset > threshold || velocity > 0.35) {
        if (currentPage > 1) {
          setIsPageAnimating(true);
          setDragOffset(window.innerWidth * 0.4);
          setTimeout(() => {
            prevPage();
            setDragOffset(0);
            setIsPageAnimating(false);
          }, 180);
          return;
        }
      }
    }

    // Snap back
    setIsPageAnimating(true);
    setDragOffset(0);
    setTimeout(() => setIsPageAnimating(false), 240);
  };

  // =========================================================================
  // MOUSE GESTURES (Desktop / Laptop Drag)
  // =========================================================================
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    const target = e.target;
    // Allow text selection and normal interaction inside book content
    if (
      ['INPUT', 'TEXTAREA', 'BUTTON', 'A', 'SELECT', 'P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'STRONG', 'EM', 'LABEL', 'TD', 'TH'].includes(target.tagName) ||
      target.closest('button') ||
      target.closest('a') ||
      target.closest('canvas') ||
      target.closest('.book-page-shell') ||
      target.closest('.book-content-wrapper') ||
      target.closest('.glass-panel') ||
      target.closest('.diff-table-container') ||
      target.closest('.writing-trainer-box') ||
      target.closest('.book-top-bar') ||
      target.closest('.book-bottom-nav') ||
      target.closest('.book-callout-bangla') ||
      target.closest('.book-quiz-box') ||
      target.closest('.book-simpler-box')
    ) {
      return;
    }

    mouseStartRef.current = { x: e.clientX, isDown: true, time: Date.now() };
    setIsDragging(true);
    setIsPageAnimating(false);
  };

  const handleMouseMove = (e) => {
    if (!mouseStartRef.current.isDown) return;
    const diffX = e.clientX - mouseStartRef.current.x;

    let clampedDiffX = diffX;
    if ((currentPage === 1 && diffX > 0) || (currentPage === bookPages.length && diffX < 0)) {
      clampedDiffX = diffX * 0.25;
    }

    setDragOffset(clampedDiffX);
  };

  const handleMouseUp = () => {
    if (!mouseStartRef.current.isDown) return;
    mouseStartRef.current.isDown = false;
    setIsDragging(false);

    const threshold = 65;
    if (dragOffset < -threshold && currentPage < bookPages.length) {
      setIsPageAnimating(true);
      setDragOffset(-280);
      setTimeout(() => {
        nextPage();
        setDragOffset(0);
        setIsPageAnimating(false);
      }, 180);
      return;
    } else if (dragOffset > threshold && currentPage > 1) {
      setIsPageAnimating(true);
      setDragOffset(280);
      setTimeout(() => {
        prevPage();
        setDragOffset(0);
        setIsPageAnimating(false);
      }, 180);
      return;
    }

    setIsPageAnimating(true);
    setDragOffset(0);
    setTimeout(() => setIsPageAnimating(false), 200);
  };

  // Current page object
  const activePageObj = bookPages.find(p => p.pageNumber === currentPage) || bookPages[0];

  // First pages for courses
  const ictFirstPage = bookPages.find(p => p.subject === 'ICT')?.pageNumber || 3;
  const econFirstPage = bookPages.find(p => p.subject === 'Economics')?.pageNumber || 12;

  // Bookmarked pages resolution
  const bookmarkedPagesList = bookPages.filter(p => 
    p.topic && state.bookmarkedTopics.includes(p.topic.id)
  );

  return (
    <div className="book-container">
      {/* Creative Android Motion & Sensor Toast */}
      {shakeToast && (
        <div style={{
          position: 'fixed',
          top: '64px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, var(--rose-900), var(--rose-800))',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 8px 24px rgba(136, 19, 55, 0.35)',
          fontSize: '0.88rem',
          fontWeight: 700,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          border: '1px solid var(--rose-400)'
        }}>
          <span>{shakeToast}</span>
        </div>
      )}

      {/* Top Book Running Navigation Bar */}
      <header className="book-top-bar">
        <div className="book-header-left">
          {/* Back to Book Cover / Course Selector */}
          <button 
            id="tour-cover-btn"
            className="btn btn-secondary btn-sm"
            onClick={() => goToPage(1)}
            title="Return to Book Cover & Course Selection"
            style={{ fontWeight: 700 }}
          >
            <Home size={15} color="var(--rose-700)" />
            <span>Cover</span>
          </button>

          {/* Contents Drawer toggle */}
          <button 
            id="tour-toc-btn"
            className="toc-toggle-btn" 
            onClick={() => {
              setIsTocDrawerOpen(true);
              if (!isAudioMuted && playChime) playChime('click');
            }}
            title="সূচিপত্র খুলুন (Table of Contents)"
          >
            <List size={16} />
            <span>সূচিপত্র</span>
          </button>

          {/* Quick Course Switcher Button */}
          <div id="tour-course-switcher" style={{ display: 'flex', gap: '4px', marginLeft: '4px' }}>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => setIsYearModalOpen(true)}
              title="৪ বর্ষের পাঠ্যক্রম ও কোর্স লাইব্রেরি খুলুন"
              style={{ padding: '4px 10px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <GraduationCap size={14} />
              <span>{currentYearMeta?.yearNumberBn || '১ম বর্ষ'}: {currentCourseMeta?.titleBn || 'সমাজবিজ্ঞান'}</span>
            </button>
          </div>

          <span className="book-running-volume hide-on-mobile" style={{ marginLeft: '4px' }}>
            {activePageObj.volume}
          </span>
        </div>

        {/* Center/Right Dynamic Interaction Metrics from LocalStorage */}
        <div id="tour-header-controls" className="book-header-right">
          {/* Guided Tour Launcher */}
          <button 
            id="tour-help-btn"
            className="btn btn-secondary btn-sm"
            onClick={() => setIsTourOpen(true)}
            title="ব্যবহার নির্দেশিকা ও ইন্টারঅ্যাক্টিভ গাইড ট্যুর"
            style={{ fontWeight: 600, color: 'var(--rose-800)' }}
          >
            <Compass size={14} color="var(--rose-700)" />
            <span className="hide-on-mobile">গাইড</span>
          </button>

          {/* AI Settings Launcher */}
          <button 
            id="tour-ai-btn"
            className="btn btn-secondary btn-sm"
            onClick={() => setIsAiSettingsOpen(true)}
            title="এআই টিউটর সেটিংস (Gemini API Key)"
            style={{ fontWeight: 600, color: 'var(--rose-800)', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Sparkles size={14} color="var(--rose-700)" />
            <span className="hide-on-mobile">এআই সেটিংস</span>
          </button>

          {/* Real chapters read */}
          <div className="book-stat-tag hide-on-mobile" title="পড়া সম্পন্ন করা অধ্যায়ের সংখ্যা">
            <CheckCircle size={14} color="var(--rose-700)" />
            <span>{metrics.completedTotalCount}/{metrics.totalTopics} পড়া সম্পন্ন ({metrics.overallProgressPct}%)</span>
          </div>

          {/* Real quiz pass accuracy */}
          <div className="book-stat-tag hide-on-mobile" title="যাচাই কুইজে অংশ নেওয়ার রেকর্ড">
            <Award size={14} color="var(--rose-700)" />
            <span>কুইজ: {metrics.quizzesPassed}/{metrics.quizzesAttempted}</span>
          </div>

          {/* Bookmarks */}
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setShowBookmarksModal(true)}
            title={`বুকমার্কসমূহ (${state.bookmarkedTopics.length})`}
            style={{ position: 'relative' }}
          >
            <Bookmark size={14} color={state.bookmarkedTopics.length > 0 ? "var(--rose-600)" : "currentColor"} />
            <span>{state.bookmarkedTopics.length}</span>
          </button>

          {/* Mute Audio / TTS */}
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => {
              if (!isAudioMuted) stopSpeaking();
              setIsAudioMuted(!isAudioMuted);
            }}
            title={isAudioMuted ? "শব্দ চালু করুন" : "শব্দ বন্ধ করুন"}
          >
            {isAudioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>

          {/* Theme switcher */}
          <button 
            id="tour-theme-btn"
            className="btn btn-secondary btn-sm"
            onClick={toggleTheme}
            title="থিম পরিবর্তন করুন (লাইট / ডার্ক)"
          >
            {state.theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Reset progress */}
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setShowResetConfirm(true)}
            title="সকল অগ্রগতি মুছে ফেলুন (০%)"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </header>

      {/* Floating Tablet & Desktop Side Edge Turn Buttons */}
      <button
        className="book-side-nav-btn left"
        disabled={currentPage <= 1}
        onClick={prevPage}
        title="পূর্ববর্তী পৃষ্ঠা (←)"
        aria-label="Previous Page"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        className="book-side-nav-btn right"
        disabled={currentPage >= bookPages.length}
        onClick={nextPage}
        title="পরবর্তী পৃষ্ঠা (→)"
        aria-label="Next Page"
      >
        <ChevronRight size={28} />
      </button>

      {/* Main Drag-Interactive Viewport */}
      <div 
        className={`book-page-viewport ${isDragging ? 'is-dragging' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Dynamic Edge Peek Badges during Drag */}
        {dragOffset < -28 && currentPage < bookPages.length && (
          <div 
            className="book-edge-peek book-edge-peek-right"
            style={{ opacity: Math.min(1, Math.abs(dragOffset) / 55) }}
          >
            <span>পরবর্তী পৃষ্ঠা</span>
            <ChevronRight size={16} />
          </div>
        )}

        {dragOffset > 28 && currentPage > 1 && (
          <div 
            className="book-edge-peek book-edge-peek-left"
            style={{ opacity: Math.min(1, Math.abs(dragOffset) / 55) }}
          >
            <ChevronLeft size={16} />
            <span>পূর্ববর্তী পৃষ্ঠা</span>
          </div>
        )}

        {/* Draggable Page Surface with 3D Rotate and Dynamic Shadow */}
        <div 
          id="tour-page-shell"
          className={`book-draggable-page ${isPageAnimating ? 'is-animating' : ''}`}
          style={{
            transform: dragOffset !== 0 
              ? `translateX(${dragOffset}px) rotate(${dragOffset * 0.015}deg)` 
              : 'none',
            boxShadow: dragOffset !== 0 
              ? `${-dragOffset * 0.12}px 14px 32px rgba(136, 19, 55, 0.18)` 
              : undefined
          }}
        >
          {/* Main Page Content */}
          <main className="book-content-wrapper">
            {/* PAGE 1: LUXURIOUS TEXTBOOK COVER */}
            {currentPage === 1 && (
              <div className="book-page-shell" style={{ 
                textAlign: 'center', 
                padding: '44px 24px', 
                background: 'linear-gradient(145deg, var(--page-bg) 0%, var(--rose-50) 100%)',
                border: '2px solid var(--rose-200)'
              }}>
                <div style={{ maxWidth: '640px', margin: '0 auto' }}>
                  <div style={{ 
                    display: 'inline-block', 
                    border: '1px solid var(--rose-300)', 
                    background: 'var(--rose-100)', 
                    padding: '4px 18px', 
                    borderRadius: 'var(--radius-full)', 
                    fontSize: '0.82rem', 
                    fontWeight: 800, 
                    color: 'var(--rose-900)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '18px'
                  }}>
                    জাতীয় বিশ্ববিদ্যালয় • সমাজবিজ্ঞান বিভাগ (বিএসএস সম্মান)
                  </div>

                  <h1 style={{ 
                    fontFamily: 'Crimson Pro, Outfit, serif', 
                    fontSize: 'clamp(2.1rem, 5.5vw, 3.1rem)', 
                    fontWeight: 800, 
                    color: 'var(--text-ink)', 
                    lineHeight: 1.15, 
                    marginBottom: '10px' 
                  }}>
                    মাস্টারবুক ও পূর্ণাঙ্গ প্রশ্নব্যাংক
                  </h1>

                  <div style={{ 
                    height: '3px', 
                    width: '90px', 
                    background: 'var(--rose-600)', 
                    margin: '14px auto 18px', 
                    borderRadius: 'var(--radius-full)' 
                  }} />

                  <h2 style={{ 
                    fontSize: 'clamp(1.1rem, 3.5vw, 1.4rem)', 
                    fontWeight: 700, 
                    color: 'var(--rose-800)', 
                    marginBottom: '6px' 
                  }}>
                    {currentYearMeta?.yearNameBn} • {currentCourseMeta?.titleBn}
                  </h2>

                  <p style={{ 
                    fontSize: '0.9rem', 
                    color: 'var(--text-muted)', 
                    marginBottom: '26px',
                    fontStyle: 'italic'
                  }}>
                    {currentCourseMeta?.paperCode ? `Paper Code: ${currentCourseMeta.paperCode} • ` : ''}{currentCourseMeta?.titleEn}
                  </p>

                  {/* Dynamic Learning Progress Card */}
                  <div style={{ 
                    background: 'var(--page-bg)', 
                    border: '1px solid var(--page-border)', 
                    borderRadius: 'var(--radius-md)', 
                    padding: '20px 16px', 
                    marginBottom: '24px',
                    boxShadow: '0 4px 20px rgba(136, 19, 55, 0.05)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-ink)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        কোর্স শিখন অগ্রগতি রেকর্ড
                      </span>
                      <span style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--rose-700)' }}>
                        {metrics.overallProgressPct}% সম্পন্ন
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div style={{ height: '8px', background: 'var(--rose-100)', borderRadius: '999px', overflow: 'hidden', marginBottom: '16px' }}>
                      <div style={{ 
                        width: `${metrics.overallProgressPct}%`, 
                        height: '100%', 
                        background: 'var(--rose-600)', 
                        transition: 'width 0.4s ease' 
                      }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px', textAlign: 'left' }}>
                      <div style={{ background: 'var(--rose-50)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--page-border)' }}>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>অধ্যায় পাঠ</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--rose-900)' }}>
                          {state.completedTopics.length} / {bookPages.filter(p => p.type === 'chapter').length}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--rose-700)' }}>সম্পূর্ণ হয়েছে</div>
                      </div>

                      <div style={{ background: 'var(--rose-50)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--page-border)' }}>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>যাচাই কুইজ</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--rose-900)' }}>
                          {metrics.quizzesPassed} / {metrics.quizzesAttempted}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--rose-700)' }}>{metrics.quizAccuracyPct}% নির্ভুলতা</div>
                      </div>

                      <div style={{ background: 'var(--rose-50)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--page-border)' }}>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>সংরক্ষিত ভুল</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--rose-900)' }}>
                          {metrics.unresolvedMistakes}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--rose-700)' }}>রিভিশন দরকার</div>
                      </div>
                    </div>
                  </div>

                  {/* Active Course & 4-Year Shelf Launcher Card */}
                  <div style={{ 
                    background: 'linear-gradient(135deg, var(--rose-50), var(--page-bg))', 
                    border: '2px solid var(--rose-300)', 
                    borderRadius: 'var(--radius-md)', 
                    padding: '20px', 
                    marginBottom: '22px',
                    textAlign: 'left',
                    boxShadow: '0 4px 14px rgba(136, 19, 55, 0.08)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--rose-700)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        সক্রিয় কোর্স • {bookPages.filter(p => p.type === 'chapter').length}টি পূর্ণাঙ্গ অধ্যায়
                      </span>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => setIsYearModalOpen(true)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <GraduationCap size={15} />
                        <span>সকল বর্ষ ও বিষয় লাইব্রেরি 📚</span>
                      </button>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-ink)', margin: '4px 0 6px' }}>
                      {currentCourseMeta?.titleBn}
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.5 }}>
                      {currentCourseMeta?.description || 'জাতীয় বিশ্ববিদ্যালয়ের সিলেবাস অনুযায়ী বোর্ড প্রশ্নোত্তর, মূল ধারণা, পার্থক্য ছক ও অ্যাক্টিভ রিকল সমৃদ্ধ।'}
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button 
                        className="btn btn-primary" 
                        onClick={() => goToPage(3)}
                        style={{ flex: 1, minWidth: '160px' }}
                      >
                        ১ম অধ্যায় পড়া শুরু করুন →
                      </button>
                      <button 
                        className="btn btn-secondary" 
                        onClick={() => goToPage(2)}
                        style={{ flex: 1, minWidth: '140px' }}
                      >
                        <BookOpen size={16} />
                        <span>সূচিপত্র দেখুন</span>
                      </button>
                    </div>
                  </div>

                  {/* Quick Jump Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => setIsYearModalOpen(true)}
                    >
                      <GraduationCap size={15} />
                      <span>৪-বর্ষের পাঠ্যক্রম শেলফ</span>
                    </button>

                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => goToPage(bookPages.length - 1)}
                    >
                      <span>বোর্ড পরীক্ষা হল</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 2: TABLE OF CONTENTS AS PARCHMENT PAGE */}
            {currentPage === 2 && (
              <div className="book-page-shell">
                <div className="page-running-head">
                  <span className="page-chapter-badge">সূচিপত্র</span>
                  <span>বিষয়ভিত্তিক অধ্যায় ও পরিশিষ্টের রূপরেখা</span>
                </div>

                <h1 className="book-chapter-title" style={{ textAlign: 'center', marginBottom: '8px' }}>
                  সূচিপত্র (Table of Contents)
                </h1>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
                  যেকোনো অধ্যায় বা পরিশিষ্টের পাতায় যেতে নিচে ক্লিক করুন।
                </p>

                <div style={{ background: 'var(--rose-50)', border: '1px solid var(--page-border)', borderRadius: 'var(--radius-md)', padding: '18px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '2px solid var(--rose-300)', paddingBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--rose-700)', textTransform: 'uppercase' }}>
                        {currentYearMeta?.yearNameBn} • {currentCourseMeta?.paperCode ? `Paper Code: ${currentCourseMeta.paperCode}` : 'অনার্স পাঠ্যক্রম'}
                      </span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--rose-900)', margin: '2px 0 0' }}>
                        {currentCourseMeta?.titleBn} ({bookPages.filter(p => p.type === 'chapter').length}টি পূর্ণাঙ্গ অধ্যায়)
                      </h3>
                    </div>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setIsYearModalOpen(true)}
                      style={{ fontSize: '0.78rem', padding: '5px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <GraduationCap size={14} />
                      <span>কোর্স লাইব্রেরি পরিবর্তন 📚</span>
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px' }}>
                    {bookPages.filter(p => p.type === 'chapter').map(page => {
                      const isRead = page.topic && state.completedTopics.includes(page.topic.id);
                      const isQuizDone = state.quizHistory[`quiz-${page.topic.id}`];

                      return (
                        <button
                          key={page.pageNumber}
                          className="toc-item-btn"
                          onClick={() => goToPage(page.pageNumber)}
                          style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                            <span style={{ 
                              width: '18px', 
                              height: '18px', 
                              borderRadius: '50%', 
                              border: '1px solid var(--rose-400)', 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              background: isRead ? 'var(--rose-600)' : 'transparent',
                              color: '#fff',
                              fontSize: '10px',
                              flexShrink: 0
                            }}>
                              {isRead && "✓"}
                            </span>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {page.topic.title}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                            {isQuizDone && (
                              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: isQuizDone.correct ? '#059669' : '#dc2626' }}>
                                {isQuizDone.correct ? '★' : '•'}
                              </span>
                            )}
                            <span className="toc-page-badge">পৃষ্ঠা {page.pageNumber}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Appendices Row */}
                <div style={{ background: 'var(--book-bg)', border: '1px solid var(--page-border)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--rose-900)', marginBottom: '10px' }}>
                    পরিশিষ্ট ও বিশেষ ইন্টারেক্টিভ শাখাসমূহ
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
                    {bookPages.filter(p => p.type !== 'chapter' && p.pageNumber > 2).map(page => (
                      <button
                        key={page.pageNumber}
                        className="btn btn-secondary"
                        onClick={() => goToPage(page.pageNumber)}
                        style={{ justifyContent: 'space-between', padding: '8px 12px', fontSize: '0.82rem' }}
                      >
                        <span>{page.title}</span>
                        <span className="toc-page-badge">পৃষ্ঠা {page.pageNumber}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

        {/* PAGES 3 to 20: CHAPTER PAGES */}
        {activePageObj.type === 'chapter' && (
          <BookPage
            key={activePageObj.topic.id}
            page={activePageObj}
            isCompleted={state.completedTopics.includes(activePageObj.topic.id)}
            isBookmarked={state.bookmarkedTopics.includes(activePageObj.topic.id)}
            onToggleComplete={toggleTopicComplete}
            onToggleBookmark={toggleBookmark}
            onRecordQuiz={recordQuizAttempt}
            onRecordRecall={recordActiveRecall}
            quizRecord={state.quizHistory[`quiz-${activePageObj.topic.id}`]}
            recallRecord={state.recallHistory[activePageObj.topic.id]}
            onSpeak={speak}
            onChime={playChime}
            onOpenAiSettings={() => setIsAiSettingsOpen(true)}
          />
        )}

        {/* APPENDIX A: DIFFERENCE TABLES */}
        {activePageObj.type === 'differences' && (
          <div className="book-page-shell">
            <div className="page-running-head">
              <span className="page-chapter-badge">পরিশিষ্ট ক</span>
              <span>বোর্ড পরীক্ষার ১৭টি গুরুত্বপূর্ণ পার্থক্য ছক (17 High-Yield Matrices)</span>
            </div>
            <DifferenceTablesView onChime={playChime} />
          </div>
        )}

        {/* APPENDIX B: FLASHCARDS */}
        {activePageObj.type === 'flashcards' && (
          <div className="book-page-shell">
            <div className="page-running-head">
              <span className="page-chapter-badge">পরিশিষ্ট খ</span>
              <span>স্পেসড রেপিটিশন ফ্ল্যাশকার্ড বক্স • তাৎক্ষণিক স্মৃতিচর্চা</span>
            </div>
            <FlashcardsView onUpdateSRS={updateFlashcardSRS} onChime={playChime} />
          </div>
        )}

        {/* APPENDIX C: WRITING DESK */}
        {activePageObj.type === 'writing' && (
          <div className="book-page-shell">
            <div className="page-running-head">
              <span className="page-chapter-badge">পরিশিষ্ট গ</span>
              <span>সৃজনশীল ও টেকনিক্যাল রাইটিং ডেস্ক • স্বয়ংক্রিয় মূল্যায়ন</span>
            </div>
            <WritingTrainerView onAddXP={addXP} onChime={playChime} />
          </div>
        )}

        {/* APPENDIX D: TIMED EXAM BOOKLET (PREMIUM FEATURE) */}
        {activePageObj.type === 'exam' && (
          <div className="book-page-shell">
            <div className="page-running-head">
              <span className="page-chapter-badge">পরিশिष्ट ঘ (Premium)</span>
              <span>টাইমারযুক্ত বোর্ড পরীক্ষা হল • ১০০/১০০ প্রস্তুতি মূল্যায়ন</span>
            </div>
            <PremiumExamSimulatorView appState={appState} />
          </div>
        )}

        {/* APPENDIX E: MISTAKE NOTEBOOK & SPACED REVISION */}
        {activePageObj.type === 'notebook' && (
          <div className="book-page-shell">
            <div className="page-running-head">
              <span className="page-chapter-badge">পরিশিষ্ট ঙ</span>
              <span>ভুল সংশোধনী খাতা ও স্পেসড রিভিশন ট্র্যাকার</span>
            </div>
            <MistakeNotebookView
              mistakes={state.mistakes}
              onResolveMistake={resolveMistake}
              onChime={playChime}
            />
            <div style={{ marginTop: '36px', borderTop: '1px solid var(--page-border)', paddingTop: '28px' }}>
              <SpacedRevisionView />
            </div>
          </div>
        )}

        {/* APPENDIX F: REFER & EARN */}
        {activePageObj.type === 'refer' && (
          <ReferAndEarnView />
        )}
          </main>
        </div>
      </div>

      {/* Floating Bottom Book Navigation Dock */}
      <nav id="tour-bottom-nav" className={`book-bottom-nav ${!isNavVisible ? 'nav-hidden' : ''}`}>
        {/* Quick Home / Cover button */}
        {currentPage > 1 && (
          <button
            className="book-nav-btn prev-btn"
            style={{ width: '36px', padding: 0, minWidth: '36px' }}
            onClick={() => goToPage(1)}
            title="মূল প্রচ্ছদে ফিরে যান"
            aria-label="মূল প্রচ্ছদে ফিরে যান"
          >
            <Home size={15} color="var(--rose-700)" />
          </button>
        )}

        <button 
          className="book-nav-btn prev-btn"
          disabled={currentPage <= 1}
          onClick={prevPage}
          title="পূর্ববর্তী পৃষ্ঠা (বাম তীর ← বা ডান সোয়াইপ)"
          aria-label="পূর্ববর্তী পৃষ্ঠা"
        >
          <ChevronLeft size={16} />
          <span>পূর্ববর্তী</span>
        </button>

        <div 
          className="book-page-indicator"
          onClick={() => setIsTocDrawerOpen(true)}
          title="সূচিপত্র খুলতে এখানে ক্লিক করুন"
        >
          <div className="book-page-num-badge">
            {currentPage} / {bookPages.length}
          </div>
          <span className="book-page-name-tag hide-on-mobile">
            {activePageObj.type === 'chapter' ? activePageObj.topic.title : activePageObj.title}
          </span>
          <span className="book-drag-hint">
            ‹ সোয়াইপ করুন ›
          </span>
        </div>

        <button 
          className="book-nav-btn next-btn"
          disabled={currentPage >= bookPages.length}
          onClick={nextPage}
          title="পরবর্তী পৃষ্ঠা (ডান তীর → বা বাম সোয়াইপ)"
          aria-label="পরবর্তী পৃষ্ঠা"
        >
          <span>পরবর্তী</span>
          <ChevronRight size={16} />
        </button>
      </nav>

      {/* Slide-out Table of Contents Drawer */}
      {isTocDrawerOpen && (
        <TableOfContents
          currentPage={currentPage}
          onSelectPage={goToPage}
          onClose={() => setIsTocDrawerOpen(false)}
          completedTopics={state.completedTopics}
          metrics={metrics}
          bookPages={bookPages}
          courseMeta={currentCourseMeta}
          yearMeta={currentYearMeta}
          onOpenCourseSelector={() => {
            setIsTocDrawerOpen(false);
            setIsYearModalOpen(true);
          }}
        />
      )}

      {/* Bookmarks Modal */}
      {showBookmarksModal && (
        <div className="toc-drawer-overlay" onClick={() => setShowBookmarksModal(false)}>
          <div 
            className="glass-panel" 
            style={{ 
              maxWidth: '480px', 
              width: '90%', 
              margin: 'auto', 
              padding: '24px', 
              background: 'var(--page-bg)',
              border: '1px solid var(--page-border)',
              borderRadius: 'var(--radius-md)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bookmark size={18} color="var(--rose-700)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-ink)' }}>সংরক্ষিত বুকমার্কসমূহ</h3>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowBookmarksModal(false)}>✕</button>
            </div>

            {bookmarkedPagesList.length === 0 ? (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'center', padding: '24px 0' }}>
                এখনো কোনো বুকমার্ক নেই! যেকোনো অধ্যায়ের ডানদিকের বুকমার্ক বোতামে ক্লিক করে তা এখানে দ্রুত পড়ার জন্য সংরক্ষণ করুন।
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '360px', overflowY: 'auto' }}>
                {bookmarkedPagesList.map(p => (
                  <button
                    key={p.pageNumber}
                    className="toc-item-btn"
                    onClick={() => {
                      goToPage(p.pageNumber);
                      setShowBookmarksModal(false);
                    }}
                    style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', padding: '10px 14px' }}
                  >
                    <span>{p.topic.title}</span>
                    <span className="toc-page-badge">পৃষ্ঠা {p.pageNumber}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Clear/Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="toc-drawer-overlay" onClick={() => setShowResetConfirm(false)}>
          <div 
            className="glass-panel" 
            style={{ 
              maxWidth: '440px', 
              width: '90%', 
              margin: 'auto', 
              padding: '28px', 
              background: 'var(--page-bg)',
              border: '2px solid var(--rose-300)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <AlertCircle size={36} color="var(--rose-600)" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-ink)', marginBottom: '8px' }}>
              সকল অগ্রগতি রিসেট করবেন?
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '22px' }}>
              এটি আপনার সমস্ত পড়া অধ্যায়, কুইজের ইতিহাস, অ্যাক্টিভ রিকল স্কোর ও সংরক্ষিত ভুল মুছে ফেলে প্রগ্রেস ০% এ ফিরিয়ে আনবে।
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowResetConfirm(false)}
              >
                বাতিল
              </button>
              <button 
                className="btn btn-primary"
                style={{ background: 'var(--rose-700)' }}
                onClick={() => {
                  resetAllProgress();
                  goToPage(1);
                  setShowResetConfirm(false);
                  if (playChime) playChime('click');
                }}
              >
                হ্যাঁ, ০% এ রিসেট করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* First-time Visitor Welcome Prompt Toast */}
      {showWelcomePrompt && !isTourOpen && (
        <aside className="tour-welcome-prompt" aria-label="গাইড ট্যুর স্বাগতম বার্তা">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <div className="welcome-prompt-icon">
              <Sparkles size={18} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-ink)', marginBottom: '3px' }}>
                👋 ডিজিটাল বইয়ে স্বাগতম!
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '10px' }}>
                অ্যাপটির আধুনিক ফিচার ও দ্রুত নেভিগেশন বুঝতে ১-মিনিটের একটি সংক্ষিপ্ত গাইড ট্যুর নিবেন কি?
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="btn btn-primary btn-sm"
                  style={{ padding: '4px 12px', fontSize: '0.78rem' }}
                  onClick={() => {
                    setShowWelcomePrompt(false);
                    setIsTourOpen(true);
                  }}
                >
                  ট্যুর শুরু করুন
                </button>
                <button 
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                  onClick={() => {
                    setShowWelcomePrompt(false);
                    localStorage.setItem('study4xm_tour_completed', 'true');
                  }}
                >
                  পরে দেখব
                </button>
              </div>
            </div>
            <button 
              onClick={() => {
                setShowWelcomePrompt(false);
                localStorage.setItem('study4xm_tour_completed', 'true');
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}
              title="বন্ধ করুন"
            >
              <X size={15} />
            </button>
          </div>
        </aside>
      )}

      {/* Interactive Guided Tour Modal */}
      <GuidedTour
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onNavigateToPage={goToPage}
        currentPage={currentPage}
      />

      {/* AI LLM Settings Modal */}
      <AiSettingsModal
        isOpen={isAiSettingsOpen}
        onClose={() => setIsAiSettingsOpen(false)}
        onChime={playChime}
      />

      {/* 4-Year Curriculum & Course Selector Shelf Modal */}
      {isYearModalOpen && (
        <YearCourseSelector
          isOpen={isYearModalOpen}
          onClose={() => setIsYearModalOpen(false)}
          currentYear={currentYearId}
          currentCourse={currentCourseId}
          onSelectCourse={handleSelectCourse}
        />
      )}
    </div>
  );
}

