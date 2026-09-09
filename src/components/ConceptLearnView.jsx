import React, { useState } from 'react';
import { ICT_SYLLABUS } from '../data/ictData';
import { ECONOMICS_SYLLABUS } from '../data/economicsData';
import { Volume2, Star, CheckCircle, BookOpen, Lightbulb, ArrowLeft } from 'lucide-react';

export default function ConceptLearnView({
  selectedTopicId,
  completedTopics,
  bookmarkedTopics,
  onToggleComplete,
  onToggleBookmark,
  onLogMistake,
  onAddXP,
  onSpeak,
  onChime,
  onNavigate
}) {
  const [simplerMode, setSimplerMode] = useState(false);
  const [markTab, setMarkTab] = useState('two');
  const [showRecallDrawer, setShowRecallDrawer] = useState(false);
  const [recallInput, setRecallInput] = useState('');
  const [showRecallResult, setShowRecallResult] = useState(false);

  // Find concept
  let concept = null;
  let subject = "ICT";
  let unitTitle = "";

  ICT_SYLLABUS.forEach(u => {
    const found = u.topics.find(t => t.id === selectedTopicId);
    if (found) {
      concept = found;
      subject = "ICT";
      unitTitle = u.unitTitle;
    }
  });

  if (!concept) {
    ECONOMICS_SYLLABUS.forEach(t => {
      const found = t.concepts.find(c => c.id === selectedTopicId);
      if (found) {
        concept = found;
        subject = "Economics";
        unitTitle = t.title;
      }
    });
  }

  if (!concept) {
    concept = ICT_SYLLABUS[0].topics[0];
    unitTitle = ICT_SYLLABUS[0].unitTitle;
  }

  const isCompleted = completedTopics.includes(concept.id);
  const isBookmarked = bookmarkedTopics.includes(concept.id);

  const handleReadAloud = () => {
    if (onSpeak) {
      onSpeak(`${concept.title}. ${concept.simpleIdea}. ${concept.technicalExplanation}`);
    }
  };

  const handleRecallRating = (rating) => {
    if (onAddXP) onAddXP(25, `Recall self-rated: ${rating}`);
    if (rating === "Needs Revision") {
      onLogMistake({
        subject,
        unit: unitTitle,
        topicTitle: concept.title,
        question: concept.recallQuestion || concept.title,
        studentAnswer: recallInput || "Needs revision",
        correctAnswer: concept.examAnswers ? concept.examAnswers.twoMark : "",
        whyWrong: "Active recall required review.",
        correctConcept: concept.simpleIdea
      });
    }
    if (onChime) onChime('success');
    setShowRecallDrawer(false);
    setShowRecallResult(false);
    setRecallInput('');
    alert(`Recall recorded as '${rating}'!`);
  };

  return (
    <div>
      {/* Header Bar */}
      <div className="concept-header-bar">
        <div>
          <span className="unit-breadcrumb">{subject} ❯ {unitTitle}</span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>
            {concept.title}
          </h2>
          <div className="priority-stars">
            {"★".repeat(concept.priority || 5)} 
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal', marginLeft: '6px' }}>
              Priority for 100/100
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            className={`simpler-mode-btn ${simplerMode ? 'active' : ''}`}
            onClick={() => {
              setSimplerMode(!simplerMode);
              if (onChime) onChime('click');
            }}
          >
            <Lightbulb size={16} />
            <span>{simplerMode ? "Back to Technical Depth" : "Explain Like I'm Stupid / Make It Simpler"}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      {simplerMode ? (
        <div className="concept-block" style={{ background: '#fffbeb', borderColor: '#fcd34d' }}>
          <span className="block-tag" style={{ background: '#fef3c7', color: '#92400e' }}>
            👶 ULTRA-SIMPLE EVERYDAY EXPLANATION
          </span>
          <p style={{ fontSize: '1.15rem', fontWeight: 600, color: '#78350f', lineHeight: 1.6, marginBottom: '14px' }}>
            {concept.simplerVersion || concept.simpleIdea}
          </p>
          <p style={{ fontSize: '0.95rem', color: '#92400e' }}>
            {concept.simpleIdea}
          </p>
        </div>
      ) : (
        <>
          {/* LEVEL 1: Understand It */}
          <div className="concept-block">
            <span className="block-tag tag-simple">🌱 LEVEL 1: UNDERSTAND IT (INTUITIVE ANALOGY)</span>
            <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '12px' }}>
              {concept.simpleIdea}
            </p>
            <div style={{ background: 'var(--bg-main)', padding: '12px 16px', borderLeft: '3px solid var(--rose-600)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--rose-800)', display: 'block', marginBottom: '4px' }}>
                🇧🇩 BANGLA EXPLANATION
              </span>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontFamily: "'Hind Siliguri', sans-serif" }}>
                {concept.banglaExplanation}
              </p>
            </div>
          </div>

          {/* LEVEL 2: Know the Keyword */}
          <div className="concept-block">
            <span className="block-tag tag-keywords">🔑 LEVEL 2: KNOW THE KEYWORDS (EXAM TERMINOLOGY)</span>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              These precise English keywords award maximum marks in exam scoring:
            </p>
            <div className="keyword-chips-container">
              {concept.keywords && concept.keywords.map((k, i) => (
                <div key={i} className="keyword-chip" title={k.def}>
                  <strong>{k.term}:</strong> <span style={{ fontWeight: 'normal' }}>{k.def}</span>
                </div>
              ))}
            </div>
          </div>

          {/* LEVEL 3: Understand Technically */}
          <div className="concept-block">
            <span className="block-tag tag-tech">⚙️ LEVEL 3: UNDERSTAND TECHNICALLY (DEEP MECHANISM)</span>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '12px' }}>
              {concept.technicalExplanation}
            </p>
            <div style={{ background: 'var(--rose-50)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-warm)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--rose-800)', display: 'block', marginBottom: '2px' }}>
                REAL-LIFE APPLICATION
              </span>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                💡 {concept.realLifeExample}
              </p>
            </div>
          </div>

          {/* LEVEL 4: Write It */}
          <div className="concept-block">
            <span className="block-tag tag-exam">📝 LEVEL 4: WRITE IT (EXAM-READY ANSWER TEMPLATES)</span>
            <div className="exam-marks-tabs">
              <button 
                className={`mark-tab-btn ${markTab === 'two' ? 'active' : ''}`}
                onClick={() => setMarkTab('two')}
              >
                2-Mark Answer
              </button>
              <button 
                className={`mark-tab-btn ${markTab === 'five' ? 'active' : ''}`}
                onClick={() => setMarkTab('five')}
              >
                5-Mark Answer
              </button>
              <button 
                className={`mark-tab-btn ${markTab === 'ten' ? 'active' : ''}`}
                onClick={() => setMarkTab('ten')}
              >
                10-Mark Answer
              </button>
            </div>

            <div className="mark-tab-content" style={{ whiteSpace: 'pre-line' }}>
              {concept.examAnswers ? (
                markTab === 'two' ? concept.examAnswers.twoMark :
                markTab === 'five' ? concept.examAnswers.fiveMark :
                concept.examAnswers.tenMark
              ) : "Exemplar model answer loaded."}
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="concept-block" style={{ background: '#fff7ed', borderColor: '#fed7aa' }}>
            <span className="block-tag tag-mistakes">⚠️ COMMON EXAM MISTAKES & TRAPS</span>
            <p style={{ fontSize: '0.92rem', color: '#9a3412', lineHeight: 1.5 }}>
              {concept.commonMistakes || "Students frequently confuse technical terminology without providing formal definitions."}
            </p>
          </div>
        </>
      )}

      {/* Action Bar */}
      <div className="concept-action-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn btn-secondary btn-sm" onClick={handleReadAloud}>
            <Volume2 size={16} />
            <span>Read Aloud</span>
          </button>
          <button 
            className={`btn btn-secondary btn-sm ${isBookmarked ? 'btn-outline-rose' : ''}`}
            onClick={() => {
              onToggleBookmark(concept.id);
              if (onChime) onChime('click');
            }}
          >
            <Star size={16} />
            <span>{isBookmarked ? "⭐ Marked Important" : "☆ Mark Important"}</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setShowRecallDrawer(true)}
          >
            <BookOpen size={16} />
            <span>Close the Book (Active Recall)</span>
          </button>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => {
              onToggleComplete(concept.id);
              if (onChime) onChime('success');
            }}
          >
            <CheckCircle size={16} />
            <span>{isCompleted ? "✅ Mastered (+40 XP)" : "✓ I Understand This Concept"}</span>
          </button>
        </div>
      </div>

      {/* Active Recall Modal / Drawer */}
      {showRecallDrawer && (
        <div style={{ marginTop: '24px', padding: '24px', background: 'var(--bg-surface)', border: '2px solid var(--border-warm)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            🧠 LEVEL 5: PROVE IT — CLOSE THE BOOK ACTIVE RECALL
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Without looking at the notes above, recall and write the answer from your own memory:
          </p>
          <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--rose-700)', marginBottom: '12px' }}>
            ❓ {concept.recallQuestion || "Explain this concept and list its primary components in your own words:"}
          </p>
          <textarea 
            value={recallInput}
            onChange={(e) => setRecallInput(e.target.value)}
            className="writing-textarea"
            placeholder="Type your answer here from memory..."
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => {
                setShowRecallResult(true);
                if (onChime) onChime('click');
              }}
            >
              Reveal Ideal Answer & Compare
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setShowRecallDrawer(false)}
            >
              Close
            </button>
          </div>

          {showRecallResult && (
            <div style={{ marginTop: '20px', padding: '16px', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--rose-800)', display: 'block', marginBottom: '6px' }}>
                📖 IDEAL ANSWER:
              </span>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '14px' }}>
                {concept.examAnswers ? concept.examAnswers.twoMark : ""}
              </p>

              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                How did your recall perform?
              </span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-sm btn-srs-easy" onClick={() => handleRecallRating("Correct")}>
                  🟢 Correct
                </button>
                <button className="btn btn-sm btn-srs-hard" onClick={() => handleRecallRating("Partially Correct")}>
                  🟡 Partially Correct
                </button>
                <button className="btn btn-sm btn-srs-again" onClick={() => handleRecallRating("Needs Revision")}>
                  🔴 Needs Revision
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
