import React, { useState } from 'react';
import { ICT_SYLLABUS } from '../data/ictData';
import { ECONOMICS_SYLLABUS } from '../data/economicsData';

export default function MCQPracticeView({ onAddXP, onLogMistake, onChime }) {
  const mcqs = [];
  ICT_SYLLABUS.forEach(u => {
    u.topics.forEach(t => {
      if (t.mcqs) t.mcqs.forEach(m => mcqs.push({ ...m, subject: "ICT", unit: u.unitTitle }));
    });
  });
  ECONOMICS_SYLLABUS.forEach(t => {
    t.concepts.forEach(c => {
      if (c.mcqs) c.mcqs.forEach(m => mcqs.push({ ...m, subject: "Economics", unit: t.title }));
    });
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const q = mcqs[currentIndex] || mcqs[0];

  const handleSelectOption = (idx) => {
    setSelectedOption(idx);
    const isCorrect = idx === q.correct;
    if (isCorrect) {
      if (onChime) onChime('success');
      if (onAddXP) onAddXP(20, 'MCQ practice correct');
    } else {
      if (onChime) onChime('warn');
      onLogMistake({
        subject: q.subject,
        unit: q.unit,
        topicTitle: q.question,
        question: q.question,
        studentAnswer: q.options[idx],
        correctAnswer: q.options[q.correct],
        whyWrong: "Selected incorrect option under practice.",
        correctConcept: q.explanation
      });
    }
  };

  const nextMCQ = () => {
    setSelectedOption(null);
    setCurrentIndex((prev) => (prev + 1) % mcqs.length);
  };

  const prevMCQ = () => {
    setSelectedOption(null);
    setCurrentIndex((prev) => (prev - 1 + mcqs.length) % mcqs.length);
  };

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--rose-700)', background: 'var(--rose-100)', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
            {q.subject} • {q.unit}
          </span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>
            Question {currentIndex + 1} of {mcqs.length}
          </h2>
        </div>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          Difficulty: {q.difficulty}
        </span>
      </div>

      <div className="glass-panel" style={{ padding: '24px', marginBottom: '20px' }}>
        <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px', lineHeight: 1.5 }}>
          {q.question}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {q.options.map((opt, i) => {
            let optClass = 'mcq-option-btn';
            if (selectedOption !== null) {
              if (i === q.correct) optClass += ' correct';
              else if (i === selectedOption) optClass += ' incorrect';
            }

            return (
              <button
                key={i}
                className={optClass}
                disabled={selectedOption !== null}
                onClick={() => handleSelectOption(i)}
              >
                <span style={{ fontWeight: 800, color: 'var(--rose-700)', width: '24px' }}>
                  {String.fromCharCode(65 + i)}.
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {selectedOption !== null && (
          <div style={{
            marginTop: '16px',
            padding: '14px 18px',
            borderRadius: 'var(--radius-sm)',
            background: selectedOption === q.correct ? '#ecfdf5' : '#fef2f2',
            border: selectedOption === q.correct ? '1px solid #10b981' : '1px solid #ef4444',
            color: selectedOption === q.correct ? '#065f46' : '#991b1b',
            fontSize: '0.9rem'
          }}>
            <strong style={{ display: 'block', marginBottom: '4px' }}>💡 EXPLANATION:</strong>
            <p>{q.explanation}</p>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn btn-secondary btn-sm" disabled={currentIndex === 0} onClick={prevMCQ}>
          ◀ Previous
        </button>
        <button className="btn btn-primary btn-sm" onClick={nextMCQ}>
          Next Question ▶
        </button>
      </div>
    </div>
  );
}
