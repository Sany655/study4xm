import React from 'react';
import { BOOK_PAGES as DEFAULT_PAGES } from '../data/bookPages';
import { BookOpen, Check, X, Home, GraduationCap, ChevronRight } from 'lucide-react';

export default function TableOfContents({
  currentPage,
  onSelectPage,
  onClose,
  completedTopics = [],
  metrics,
  bookPages = DEFAULT_PAGES,
  courseMeta,
  yearMeta,
  onOpenCourseSelector
}) {
  const chapterPages = bookPages.filter(p => p.type === 'chapter');
  const specialPages = bookPages.filter(p => p.type !== 'chapter' && p.pageNumber > 2);

  return (
    <div className="toc-drawer-overlay" onClick={onClose}>
      <div className="toc-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="toc-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} color="var(--rose-700)" />
            <div>
              <h3 className="toc-title">সূচিপত্র (Table of Contents)</h3>
              {courseMeta && (
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {courseMeta.titleBn} (কোড: {courseMeta.paperCode})
                </span>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            title="বন্ধ করুন"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Course Switcher Button */}
        <div style={{ display: 'flex', gap: '8px', padding: '10px 14px', background: 'var(--rose-100)', borderBottom: '1px solid var(--page-border)' }}>
          <button 
            className="btn btn-secondary btn-sm" 
            style={{ flex: 1, justifyContent: 'center', fontSize: '0.78rem', background: 'var(--page-bg)', color: 'var(--text-ink)', borderColor: 'var(--page-border)' }}
            onClick={() => { onSelectPage(1); onClose(); }}
            title="বইয়ের মূল প্রচ্ছদে ফিরে যান"
          >
            <Home size={13} color="var(--rose-700)" />
            <span>প্রচ্ছদ</span>
          </button>
          {onOpenCourseSelector && (
            <button 
              className="btn btn-primary btn-sm" 
              style={{ flex: 2, justifyContent: 'center', fontSize: '0.78rem', gap: '5px' }}
              onClick={() => {
                onClose();
                onOpenCourseSelector();
              }}
              title="৪ বর্ষের যেকোনো কোর্স নির্বাচন করুন"
            >
              <GraduationCap size={14} />
              <span>কোর্স লাইব্রেরি শেলফ</span>
              <ChevronRight size={13} />
            </button>
          )}
        </div>

        {/* Real Progress Banner inside TOC */}
        <div style={{ padding: '12px 16px', background: 'var(--rose-50)', borderBottom: '1px solid var(--page-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
            <span>কোর্সের পাঠ অগ্রগতি:</span>
            <span style={{ color: 'var(--rose-700)' }}>
              {chapterPages.filter(p => p.topic && completedTopics.includes(p.topic.id)).length} / {chapterPages.length} টি পাঠ সম্পন্ন
            </span>
          </div>
          <div style={{ height: '6px', background: 'var(--page-border)', borderRadius: '999px', overflow: 'hidden' }}>
            <div 
              style={{ 
                width: `${chapterPages.length > 0 ? Math.round((chapterPages.filter(p => p.topic && completedTopics.includes(p.topic.id)).length / chapterPages.length) * 100) : 0}%`, 
                height: '100%', 
                background: 'var(--rose-600)', 
                transition: 'width 0.4s ease' 
              }} 
            />
          </div>
        </div>

        <div className="toc-list">
          {/* Chapter & Lesson Pages */}
          <div className="toc-volume-divider">
            {courseMeta?.titleBn || 'মূল পাঠ্যক্রম'} ({chapterPages.length}টি পাঠ)
          </div>

          {chapterPages.map(page => {
            const isRead = page.topic && completedTopics.includes(page.topic.id);
            const isActive = page.pageNumber === currentPage;
            return (
              <button
                key={page.pageNumber}
                className={`toc-item-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onSelectPage(page.pageNumber);
                  onClose();
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                  <span style={{ 
                    width: '16px', 
                    height: '16px', 
                    borderRadius: '50%', 
                    border: '1px solid var(--rose-400)', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: isRead ? 'var(--rose-600)' : 'transparent',
                    color: '#fff',
                    fontSize: '10px'
                  }}>
                    {isRead && <Check size={10} />}
                  </span>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {page.topic?.title || page.title}
                  </span>
                </div>
                <span className="toc-page-badge">পৃষ্ঠা {page.pageNumber}</span>
              </button>
            );
          })}

          {/* Appendices & Special Pages */}
          <div className="toc-volume-divider" style={{ marginTop: '12px' }}>
            পরিশিষ্ট ও ইন্টারঅ্যাক্টিভ সুবিধাসমূহ
          </div>
          {specialPages.map(page => {
            const isActive = page.pageNumber === currentPage;
            return (
              <button
                key={page.pageNumber}
                className={`toc-item-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onSelectPage(page.pageNumber);
                  onClose();
                }}
              >
                <span>{page.title}</span>
                <span className="toc-page-badge">পৃষ্ঠা {page.pageNumber}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
