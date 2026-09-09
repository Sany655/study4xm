import React from 'react';
import { BOOK_PAGES } from '../data/bookPages';
import { BookOpen, Check, X, Home } from 'lucide-react';

export default function TableOfContents({
  currentPage,
  onSelectPage,
  onClose,
  completedTopics,
  metrics
}) {
  const ictPages = BOOK_PAGES.filter(p => p.subject === 'ICT');
  const econPages = BOOK_PAGES.filter(p => p.subject === 'Economics');
  const specialPages = BOOK_PAGES.filter(p => p.type !== 'chapter');

  const ictFirstPage = ictPages[0]?.pageNumber || 3;
  const econFirstPage = econPages[0]?.pageNumber || 12;

  return (
    <div className="toc-drawer-overlay" onClick={onClose}>
      <div className="toc-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="toc-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} color="var(--rose-700)" />
            <h3 className="toc-title">সূচিপত্র (Table of Contents)</h3>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            title="বন্ধ করুন"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Course / Cover Selector Bar */}
        <div style={{ display: 'flex', gap: '6px', padding: '10px 14px', background: 'var(--rose-100)', borderBottom: '1px solid var(--page-border)' }}>
          <button 
            className="btn btn-secondary btn-sm" 
            style={{ flex: 1, justifyContent: 'center', fontSize: '0.78rem', background: 'var(--page-bg)', color: 'var(--text-ink)', borderColor: 'var(--page-border)' }}
            onClick={() => { onSelectPage(1); onClose(); }}
            title="বইয়ের মূল প্রচ্ছদে ফিরে যান"
          >
            <Home size={13} color="var(--rose-700)" />
            <span>প্রচ্ছদ</span>
          </button>
          <button 
            className="btn btn-secondary btn-sm" 
            style={{ flex: 1.2, justifyContent: 'center', fontSize: '0.78rem', background: 'var(--page-bg)', color: 'var(--text-ink)', borderColor: 'var(--page-border)' }}
            onClick={() => { onSelectPage(ictFirstPage); onClose(); }}
            title="১ম খণ্ড: তথ্য ও যোগাযোগ প্রযুক্তিতে যান"
          >
            <span>💻 আইসিটি</span>
          </button>
          <button 
            className="btn btn-secondary btn-sm" 
            style={{ flex: 1.2, justifyContent: 'center', fontSize: '0.78rem', background: 'var(--page-bg)', color: 'var(--text-ink)', borderColor: 'var(--page-border)' }}
            onClick={() => { onSelectPage(econFirstPage); onClose(); }}
            title="২য় খণ্ড: অর্থনীতিতে যান"
          >
            <span>📈 অর্থনীতি</span>
          </button>
        </div>

        {/* Real Progress Banner inside TOC */}
        <div style={{ padding: '12px 16px', background: 'var(--rose-50)', borderBottom: '1px solid var(--page-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
            <span>পড়ার সার্বিক অগ্রগতি:</span>
            <span style={{ color: 'var(--rose-700)' }}>
              {metrics.completedTotalCount} / {metrics.totalTopics} টি অধ্যায় ({metrics.overallProgressPct}%)
            </span>
          </div>
          <div style={{ height: '6px', background: 'var(--page-border)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ width: `${metrics.overallProgressPct}%`, height: '100%', background: 'var(--rose-600)', transition: 'width 0.4s ease' }} />
          </div>
        </div>

        <div className="toc-list">
          {/* Volume I: ICT */}
          <div className="toc-volume-divider">১ম খণ্ড: তথ্য ও যোগাযোগ প্রযুক্তি (৯টি ইউনিট) • {metrics.ictProgressPct}% সম্পন্ন</div>
          {ictPages.map(page => {
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
                    {page.topic.title}
                  </span>
                </div>
                <span className="toc-page-badge">পৃষ্ঠা {page.pageNumber}</span>
              </button>
            );
          })}

          {/* Volume II: Economics */}
          <div className="toc-volume-divider" style={{ marginTop: '12px' }}>২য় খণ্ড: অর্থনীতি ১ম ও ২য় পত্র (১০টি অধ্যায়) • {metrics.econProgressPct}% সম্পন্ন</div>
          {econPages.map(page => {
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
                    {page.topic.title}
                  </span>
                </div>
                <span className="toc-page-badge">পৃষ্ঠা {page.pageNumber}</span>
              </button>
            );
          })}

          {/* Appendices & Special Pages */}
          <div className="toc-volume-divider" style={{ marginTop: '12px' }}>পরিশিষ্ট ও ইন্টারেক্টিভ সুবিধাসমূহ</div>
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
