import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Copy, Check, Award, BookOpen, AlertCircle } from 'lucide-react';

/**
 * QuestionBankSection - National University Bangladesh Curriculum Question Bank
 * Renders Part A (ক-বিভাগ: ১ নম্বর), Part B (খ-বিভাগ: ৪ নম্বর), and Part C (গ-বিভাগ: ১০ নম্বর)
 */
export default function QuestionBankSection({ questionBank, subject, topicTitle, onChime }) {
  const [activeTab, setActiveTab] = useState('partA');
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [copiedId, setCopiedId] = useState(null);

  if (!questionBank) return null;

  const currentQuestions = questionBank[activeTab] || [];

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (onChime) onChime('click');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getTabLabel = (key) => {
    switch (key) {
      case 'partA':
        return {
          title: 'ক-বিভাগ (১ নম্বর)',
          sub: 'অতিসংক্ষিপ্ত প্রশ্নাবলী',
          badge: 'বোর্ড স্ট্যান্ডার্ড সংজ্ঞা ও ১ লাইনের উত্তর'
        };
      case 'partB':
        return {
          title: 'খ-বিভাগ (৪ নম্বর)',
          sub: 'সংক্ষিপ্ত বিশ্লেষণধর্মী প্রশ্ন',
          badge: '৪টি পয়েন্ট, পার্থক্য ও গাণিতিক সমীকরণ'
        };
      case 'partC':
        return {
          title: 'গ-বিভাগ (১০ নম্বর)',
          sub: 'রচনামূলক পূর্ণাঙ্গ প্রশ্ন',
          badge: 'ভূমিকা, চিত্র/সূচি, প্রমাণ ও উপসংহার'
        };
      default:
        return { title: key, sub: '', badge: '' };
    }
  };

  return (
    <div className="nu-question-bank-card">
      <div className="nu-qb-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="nu-badge">
            <Award size={14} /> জাতীয় বিশ্ববিদ্যালয় প্রশ্নব্যাংক ও ফাইনাল সাজেশন
          </span>
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '6px 0 2px' }}>
          {topicTitle} — বিগত বছরের প্রশ্ন ও ১০০/১০০ মডেল উত্তর
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
          বিগত ১০ বছরের জাতীয় বিশ্ববিদ্যালয় (NU Honours) পরীক্ষার প্রশ্ন বিশ্লেষণ করে রচিত শতভাগ নম্বর প্রাপ্তির মডেল উত্তর:
        </p>
      </div>

      {/* Tabs for Part A, Part B, Part C */}
      <div className="nu-qb-tabs">
        {['partA', 'partB', 'partC'].map((tabKey) => {
          const info = getTabLabel(tabKey);
          const count = (questionBank[tabKey] || []).length;
          const isActive = activeTab === tabKey;
          return (
            <button
              key={tabKey}
              className={`nu-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tabKey);
                setExpandedIndex(0);
                if (onChime) onChime('click');
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{info.title}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>
                {info.sub} ({count}টি প্রশ্ন)
              </div>
            </button>
          );
        })}
      </div>

      <div className="nu-tab-banner">
        <AlertCircle size={14} />
        <span>{getTabLabel(activeTab).badge}</span>
      </div>

      {/* Questions Accordion */}
      <div className="nu-questions-list">
        {currentQuestions.length === 0 ? (
          <p style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            এই বিভাগের প্রশ্ন সংকলন হালনাগাদ করা হচ্ছে।
          </p>
        ) : (
          currentQuestions.map((qItem, idx) => {
            const isExpanded = expandedIndex === idx;
            const qId = `${activeTab}-${idx}`;
            const isCopied = copiedId === qId;

            return (
              <div key={idx} className={`nu-question-item ${isExpanded ? 'expanded' : ''}`}>
                <div 
                  className="nu-q-header"
                  onClick={() => setExpandedIndex(isExpanded ? -1 : idx)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span className="nu-q-number">প্রশ্ন {idx + 1}</span>
                    <div>
                      <h4 className="nu-q-title">{qItem.question}</h4>
                      {qItem.marks && (
                        <span className="nu-q-meta">পূর্ণমান: {qItem.marks} নম্বর {qItem.examYear ? `• [NU ${qItem.examYear}]` : ''}</span>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button 
                      className="btn-icon" 
                      title="উত্তর কপি করুন"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(qId, `${qItem.question}\n\nউত্তর:\n${qItem.answer}`);
                      }}
                    >
                      {isCopied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                    </button>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="nu-q-body">
                    <div className="nu-answer-content">
                      <div className="nu-answer-label">
                        <span>✍️ শতভাগ নম্বর প্রাপ্তির মডেল উত্তর:</span>
                      </div>
                      <div className="nu-answer-text">
                        {qItem.answer}
                      </div>

                      {qItem.keyPoints && qItem.keyPoints.length > 0 && (
                        <div className="nu-keypoints-box">
                          <strong>পরীক্ষকের দৃষ্টি আকর্ষক ৪টি আবশ্যিক পয়েন্ট:</strong>
                          <ul>
                            {qItem.keyPoints.map((kp, kIdx) => (
                              <li key={kIdx}>{kp}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {qItem.tips && (
                        <div className="nu-tip-box">
                          💡 <strong>পরীক্ষকের টিপস:</strong> {qItem.tips}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
