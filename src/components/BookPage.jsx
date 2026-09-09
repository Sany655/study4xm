import React, { useState } from 'react';
import { Volume2, Bookmark, CheckCircle, Lightbulb, PenTool, HelpCircle, Sparkles } from 'lucide-react';
import ExcelSimulator from './interactive/ExcelSimulator';
import OSIVisualizer from './interactive/OSIVisualizer';
import PowerPointBuilder from './interactive/PowerPointBuilder';
import CyberScenario from './interactive/CyberScenario';
import SupplyDemandCanvas from './interactive/SupplyDemandCanvas';
import { GRANULAR_ICT_SYLLABUS, GRANULAR_ECONOMICS_SYLLABUS } from '../data/granularSyllabusData';
import GranularSyllabusCard from './GranularSyllabusCard';

export default function BookPage({
  page,
  isCompleted,
  isBookmarked,
  onToggleComplete,
  onToggleBookmark,
  onRecordQuiz,
  onRecordRecall,
  quizRecord,
  recallRecord,
  onSpeak,
  onChime
}) {
  const [simplerMode, setSimplerMode] = useState(false);
  const [activeMarkTab, setActiveMarkTab] = useState('two');
  const [recallText, setRecallText] = useState(recallRecord?.text || '');
  const [showRecallSolution, setShowRecallSolution] = useState(false);

  const topic = page.topic;
  if (!topic) return null;

  // Resolve matching granular subtopics for this unit/chapter
  let granularSubtopics = [];
  if (page.subject === 'ICT' && page.unitId) {
    const unitObj = GRANULAR_ICT_SYLLABUS.find(u => u.unitId === page.unitId);
    if (unitObj) granularSubtopics = unitObj.subtopics;
  } else if (page.subject === 'Economics' && page.topicId) {
    const topicObj = GRANULAR_ECONOMICS_SYLLABUS.find(t => t.topicId === page.topicId);
    if (topicObj) granularSubtopics = topicObj.subtopics;
  }

  const handleReadAloud = () => {
    if (onSpeak) {
      onSpeak(`${topic.title}. ${topic.simpleIdea}. ${topic.banglaExplanation}`);
    }
  };

  const handleSelectQuizOption = (optIdx) => {
    if (!topic.mcqs || !topic.mcqs[0]) return;
    const qObj = topic.mcqs[0];
    const isCorrect = optIdx === qObj.correct;
    onRecordQuiz(
      `quiz-${topic.id}`,
      optIdx,
      isCorrect,
      { ...qObj, subject: page.subject, unit: page.chapterTitle }
    );
    if (onChime) onChime(isCorrect ? 'success' : 'warn');
  };

  const handleRecallRating = (rating) => {
    onRecordRecall(
      topic.id,
      rating,
      recallText,
      topic.examAnswers ? topic.examAnswers.twoMark : "",
      page.subject,
      page.chapterTitle,
      topic.title
    );
    setShowRecallSolution(false);
    if (onChime) onChime('success');
  };

  const currentQuiz = topic.mcqs && topic.mcqs[0];
  const subjectNameBangla = page.subject === 'ICT' ? 'তথ্য ও যোগাযোগ প্রযুক্তি' : 'অর্থনীতি';

  return (
    <div className="book-page-shell">
      {/* Running Head with Integrated Bookmark */}
      <div className="page-running-head">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span className="page-chapter-badge">{subjectNameBangla}</span>
          <span>• {page.section}</span>
          <span className="hide-on-mobile">• {page.chapterTitle}</span>
        </div>

        <button 
          className={`running-head-bookmark ${isBookmarked ? 'active' : ''}`}
          onClick={() => {
            onToggleBookmark(topic.id);
            if (onChime) onChime('click');
          }}
          title={isBookmarked ? "বুকমার্ক বাতিল করুন" : "পৃষ্ঠাটি বুকমার্ক করে রাখুন"}
        >
          <Bookmark size={13} fill={isBookmarked ? 'currentColor' : 'none'} />
          <span>{isBookmarked ? "বুকমার্ক করা হয়েছে" : "বুকমার্ক"}</span>
        </button>
      </div>

      {/* Title & Priority Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
        <div>
          <h1 className="book-chapter-title">{topic.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#f59e0b', fontSize: '1.1rem', letterSpacing: '2px' }}>
              {"★".repeat(topic.priority || 5)}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              বোর্ড পরীক্ষায় সর্বাধিক গুরুত্বপূর্ণ (High-Yield Priority)
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className={`btn btn-sm ${simplerMode ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => {
              setSimplerMode(!simplerMode);
              if (onChime) onChime('click');
            }}
          >
            <Lightbulb size={14} />
            <span>{simplerMode ? "মূল পাঠে ফিরুন" : "সহজ ভাষায় বুঝুন"}</span>
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleReadAloud}>
            <Volume2 size={14} />
            <span>পড়ে শোনান</span>
          </button>
        </div>
      </div>

      {/* Chapter Content */}
      {simplerMode ? (
        <div className="book-simpler-box" style={{ borderRadius: 'var(--radius-md)', padding: '22px', marginBottom: '24px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'var(--rose-200)', color: 'var(--rose-900)', padding: '3px 10px', borderRadius: 'var(--radius-full)', display: 'inline-block', marginBottom: '10px' }}>
            👶 অতি সহজ কথোপকথনমূলক ব্যাখ্যা
          </span>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-ink)', lineHeight: 1.7, marginBottom: '14px' }}>
            {topic.simplerVersion || topic.simpleIdea}
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-body)' }}>
            {topic.simpleIdea}
          </p>
        </div>
      ) : (
        <>
          {/* Level 1: Understand It */}
          <div className="book-section">
            <span className="book-section-label">লেভেল ১: প্রাথমিক ধারণা ও মূল উপলব্ধি</span>
            <p className="book-body-text">{topic.simpleIdea}</p>
            
            <div className="book-callout-bangla">
              <span className="callout-header">🇧🇩 জাতীয় শিক্ষাক্রম অনুযায়ী পাঠ্যবইয়ের বিশদ রূপরেখা</span>
              <p>{topic.banglaExplanation}</p>
            </div>
          </div>

          {/* Level 2: Know the Keyword */}
          <div className="book-section">
            <span className="book-section-label">লেভেল ২: পরীক্ষার জন্য আবশ্যকীয় মূল শব্দকোষ</span>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              বোর্ড পরীক্ষায় পূর্ণ নম্বর অর্জনের জন্য প্রয়োজনীয় সঠিক পারিভাষিক সংজ্ঞা:
            </p>
            <div className="book-keywords-grid">
              {topic.keywords && topic.keywords.map((kw, i) => (
                <div key={i} className="book-keyword-pill" title={kw.def}>
                  <strong>{kw.term}:</strong> {kw.def}
                </div>
              ))}
            </div>
          </div>

          {/* Level 3: Understand Technically */}
          <div className="book-section">
            <span className="book-section-label">লেভেল ৩: প্রযুক্তিগত কার্যপদ্ধতি ও প্রক্রিয়া</span>
            <p className="book-body-text">{topic.technicalExplanation}</p>
            
            <div style={{ background: 'var(--rose-50)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--page-border)' }}>
              <strong style={{ fontSize: '0.8rem', color: 'var(--rose-800)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                বাস্তব জীবনের প্রাসঙ্গিক উদাহরণ
              </strong>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', fontStyle: 'italic' }}>
                💡 {topic.realLifeExample}
              </p>
            </div>
          </div>

          {/* In-Book Interactive Laboratories (Specific to Units/Topics) */}
          {topic.id === 'ict-u4-t1' && (
            <div className="book-lab-container">
              <div className="lab-title-row">
                <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>ইন্টারেক্টিভ ল্যাবচিত্র ৪.১: লাইভ স্প্রেডশিট ফর্মুলা রানার</h4>
                <span className="lab-tag">হাতে-কলমে ল্যাব</span>
              </div>
              <ExcelSimulator onChime={onChime} />
            </div>
          )}

          {topic.id === 'ict-u7-t1' && (
            <div className="book-lab-container">
              <div className="lab-title-row">
                <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>ইন্টারেক্টিভ ল্যাবচিত্র ৭.১: ওএসআই ৭-লেয়ার ভিজ্যুয়ালাইজার</h4>
                <span className="lab-tag">হাতে-কলমে ল্যাব</span>
              </div>
              <OSIVisualizer onSpeak={onSpeak} onChime={onChime} />
            </div>
          )}

          {topic.id === 'ict-u5-t1' && (
            <div className="book-lab-container">
              <div className="lab-title-row">
                <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>ইন্টারেক্টিভ ল্যাবচিত্র ৫.১: স্লাইড ট্রানজিশন ও অ্যানিমেশন বিল্ডার</h4>
                <span className="lab-tag">হাতে-কলমে ল্যাব</span>
              </div>
              <PowerPointBuilder onChime={onChime} />
            </div>
          )}

          {topic.id === 'ict-u6-t1' && (
            <div className="book-lab-container">
              <div className="lab-title-row">
                <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>ইন্টারেক্টিভ ল্যাবচিত্র ৬.১: সাইবার নিরাপত্তা সিদ্ধান্ত সিমুলেটর</h4>
                <span className="lab-tag">হাতে-কলমে ল্যাব</span>
              </div>
              <CyberScenario onChime={onChime} />
            </div>
          )}

          {topic.id === 'econ-t2-c1' && (
            <div className="book-lab-container">
              <div className="lab-title-row">
                <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>ইন্টারেক্টিভ ল্যাবচিত্র ২.১: চাহিদা ও যোগান ভারসাম্য ক্যানভাস</h4>
                <span className="lab-tag">হাতে-কলমে ল্যাব</span>
              </div>
              <SupplyDemandCanvas />
            </div>
          )}

          {/* Level 4: Write It (Exam Templates) */}
          <div className="book-section">
            <span className="book-section-label">লেভেল ৪: বোর্ড পরীক্ষার লিখিত উত্তরের কাঠামো</span>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <button 
                className={`btn btn-sm ${activeMarkTab === 'two' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setActiveMarkTab('two')}
              >
                ২ নম্বরের অনুধাবনমূলক উত্তর
              </button>
              <button 
                className={`btn btn-sm ${activeMarkTab === 'five' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setActiveMarkTab('five')}
              >
                ৫/৩ নম্বরের প্রয়োগমূলক উত্তর
              </button>
              <button 
                className={`btn btn-sm ${activeMarkTab === 'ten' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setActiveMarkTab('ten')}
              >
                ১০/৪ নম্বরের সৃজনশীল পূর্ণাঙ্গ উত্তর
              </button>
            </div>

            <div style={{ background: 'var(--book-bg)', borderLeft: '4px solid var(--rose-600)', padding: '16px 20px', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', whiteSpace: 'pre-line', fontSize: '0.95rem', lineHeight: 1.8 }}>
              {topic.examAnswers ? (
                activeMarkTab === 'two' ? topic.examAnswers.twoMark :
                activeMarkTab === 'five' ? topic.examAnswers.fiveMark :
                topic.examAnswers.tenMark
              ) : "আদর্শ উত্তর লোড করা হচ্ছে..."}
            </div>
          </div>
        </>
      )}


      {/* GRANULAR SYLLABUS BREAKDOWN CARDS WITH REAL-TIME AI & PROMPT MODIFIER */}
      {granularSubtopics && granularSubtopics.length > 0 && (
        <div className="book-section" style={{ marginTop: '36px', marginBottom: '30px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: '14px', 
            flexWrap: 'wrap', 
            gap: '8px',
            borderBottom: '2px solid var(--rose-200)',
            paddingBottom: '10px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="book-section-label" style={{ margin: 0 }}>
                  🎯 সম্পূর্ণ সিলেবাসের সকল টপিক কার্ড (AI রিয়েল-টাইম ব্যাখ্যা)
                </span>
                <span style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: 800, 
                  color: 'var(--rose-700)', 
                  background: 'var(--rose-100)', 
                  padding: '2px 10px', 
                  borderRadius: 'var(--radius-full)' 
                }}>
                  {granularSubtopics.length}টি বিস্তারিত বিষয়
                </span>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
                যেকোনো কার্ডে ক্লিক করে রিয়েল-টাইম এআই ব্যাখ্যা দেখুন এবং কার্ডের নিচে প্রম্পট লিখে নিজের ইচ্ছামতো উত্তর পরিবর্তন করুন:
              </p>
            </div>
          </div>

          <div className="granular-cards-list">
            {granularSubtopics.map(sub => (
              <GranularSyllabusCard
                key={sub.id}
                subtopic={sub}
                subject={page.subject}
                unitTitle={page.chapterTitle}
                onSpeak={onSpeak}
                onChime={onChime}
              />
            ))}
          </div>
        </div>
      )}

      {/* Level 5: In-Book Interactive Checkpoint Quiz */}

      {currentQuiz && (
        <div className="book-quiz-box">
          <span className="quiz-badge">লেভেল ৫: তাৎক্ষণিক যাচাই কুইজ (Checkpoint Quiz)</span>
          <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-ink)', marginBottom: '14px' }}>
            ❓ {currentQuiz.question}
          </p>

          <div>
            {currentQuiz.options.map((opt, i) => {
              let optClass = "quiz-option-btn";
              if (quizRecord && quizRecord.attempted) {
                if (i === currentQuiz.correct) optClass += " correct";
                else if (i === quizRecord.choice) optClass += " incorrect";
              }

              return (
                <button
                  key={i}
                  className={optClass}
                  disabled={quizRecord && quizRecord.attempted}
                  onClick={() => handleSelectQuizOption(i)}
                >
                  <strong style={{ color: 'var(--rose-700)', width: '20px' }}>
                    {['ক', 'খ', 'গ', 'ঘ'][i] || String.fromCharCode(65 + i)}.
                  </strong>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {quizRecord && quizRecord.attempted && (
            <div className={`quiz-explanation-text ${quizRecord.correct ? 'correct' : 'incorrect'}`} style={{
              background: quizRecord.correct ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
              color: quizRecord.correct ? '#10b981' : '#f87171',
              border: quizRecord.correct ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid rgba(239, 68, 68, 0.35)'
            }}>
              <strong>{quizRecord.correct ? '✅ অভিনন্দন! সঠিক উত্তর।' : '❌ ভুল উত্তর (ভুলটি রিভিশন নোটবুকে যোগ করা হয়েছে)'}</strong>
              <p style={{ marginTop: '4px', color: 'var(--text-body)' }}>{currentQuiz.explanation}</p>
            </div>
          )}
        </div>
      )}

      {/* Level 5b: Active Recall Notepad */}
      <div className="book-recall-notepad">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <PenTool size={18} color="var(--rose-700)" />
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-ink)' }}>
            অ্যাক্টিভ রিকল: বই বন্ধ করে নিজে লেখার পরীক্ষা
          </h4>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          উপরের পাঠ না দেখে স্মৃতি থেকে মূল বিষয়টি নিজের ভাষায় সংক্ষেপে লিখুন:
        </p>
        <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--rose-800)', marginTop: '8px' }}>
          ❓ {topic.recallQuestion || `${topic.title}-এর মূল বিষয়বস্তু ব্যাখ্যা করুন:`}
        </p>
        <textarea
          value={recallText}
          onChange={(e) => setRecallText(e.target.value)}
          className="notepad-textarea"
          placeholder="স্মৃতি থেকে নিজের ভাষায় এখানে উত্তরটি লিখুন..."
        />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setShowRecallSolution(!showRecallSolution)}
          >
            {showRecallSolution ? "আদর্শ উত্তর লুকান" : "আদর্শ উত্তরের সাথে মিলিয়ে দেখুন"}
          </button>

          {recallRecord && (
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--rose-800)' }}>
              সর্বশেষ মূল্যায়ন: <strong>{recallRecord.rating}</strong> ({recallRecord.date})
            </span>
          )}
        </div>

        {showRecallSolution && (
          <div style={{ marginTop: '16px', padding: '16px', background: 'var(--book-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--page-border)' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--rose-800)', display: 'block', marginBottom: '4px' }}>
              আদর্শ বোর্ড উত্তরের নমুনা:
            </span>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '12px' }}>
              {topic.examAnswers ? topic.examAnswers.twoMark : ""}
            </p>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
              আপনার স্মৃতিশক্তির নির্ভুলতা মূল্যায়ন করুন:
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button className="btn btn-sm btn-srs-easy" onClick={() => handleRecallRating("সঠিক")}>
                🟢 সঠিক (+৩০ এক্সপি)
              </button>
              <button className="btn btn-sm btn-srs-hard" onClick={() => handleRecallRating("আংশিক সঠিক")}>
                🟡 আংশিক সঠিক (+১৫ এক্সপি)
              </button>
              <button className="btn btn-sm btn-srs-again" onClick={() => handleRecallRating("রিভিশন দরকার")}>
                🔴 পুনরায় রিভিশন দরকার
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chapter Completion Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--page-border)', paddingTop: '20px', marginTop: '30px' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          অবস্থা: <strong>{isCompleted ? "✅ অধ্যায় পড়া সম্পন্ন" : "📖 বর্তমানে পড়া চলছে"}</strong>
        </div>
        <button 
          className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => {
            onToggleComplete(topic.id);
            if (onChime) onChime('success');
          }}
        >
          <CheckCircle size={16} />
          <span>{isCompleted ? "পড়া সম্পন্ন (বাতিল করতে ক্লিক)" : "✓ অধ্যায় সম্পন্ন হিসেবে চিহ্নিত করুন"}</span>
        </button>
      </div>
    </div>
  );
}
