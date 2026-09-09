import React, { useState, useEffect } from 'react';
import { ICT_SYLLABUS } from '../data/ictData';
import { ECONOMICS_SYLLABUS } from '../data/economicsData';

export default function ExamSimulatorView({
  is100Mode = false,
  onAddXP,
  onLogMistake,
  onChime,
  onNavigate,
  stats
}) {
  const [examStarted, setExamStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [secondsRemaining, setSecondsRemaining] = useState(600);
  const [examFinished, setExamFinished] = useState(false);
  const [scoreReport, setScoreReport] = useState(null);

  const startNewExam = () => {
    const qList = [];
    ICT_SYLLABUS.forEach(u => {
      u.topics.forEach(t => {
        if (t.mcqs && t.mcqs[0]) {
          qList.push({
            subject: "আইসিটি",
            unit: u.unitTitle,
            question: t.mcqs[0].question,
            options: t.mcqs[0].options,
            correct: t.mcqs[0].correct,
            explanation: t.mcqs[0].explanation,
            difficulty: t.mcqs[0].difficulty
          });
        }
      });
    });

    ECONOMICS_SYLLABUS.forEach(t => {
      t.concepts.forEach(c => {
        if (c.mcqs && c.mcqs[0]) {
          qList.push({
            subject: "অর্থনীতি",
            unit: t.title,
            question: c.mcqs[0].question,
            options: c.mcqs[0].options,
            correct: c.mcqs[0].correct,
            explanation: c.mcqs[0].explanation,
            difficulty: c.mcqs[0].difficulty
          });
        }
      });
    });

    const shuffled = [...qList].sort(() => 0.5 - Math.random());
    const count = is100Mode ? 12 : 8;
    setQuestions(shuffled.slice(0, count));
    setUserAnswers({});
    setCurrentIdx(0);
    setSecondsRemaining(is100Mode ? 900 : 600);
    setExamStarted(true);
    setExamFinished(false);
    setScoreReport(null);
  };

  useEffect(() => {
    let timer = null;
    if (examStarted && !examFinished) {
      timer = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            submitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, examFinished]);

  const handleSelectOption = (optIdx) => {
    setUserAnswers({ ...userAnswers, [currentIdx]: optIdx });
    if (onChime) onChime('click');
  };

  const submitExam = () => {
    setExamFinished(true);
    let correctCount = 0;
    const strong = new Set();
    const weak = new Set();
    const recommendations = [];

    questions.forEach((q, i) => {
      const choice = userAnswers[i];
      if (choice === q.correct) {
        correctCount++;
        strong.add(q.unit);
      } else {
        weak.add(q.unit);
        recommendations.push({ unit: q.unit, subject: q.subject, question: q.question });
        onLogMistake({
          subject: q.subject,
          unit: q.unit,
          topicTitle: q.question,
          question: q.question,
          studentAnswer: choice !== undefined ? q.options[choice] : "উত্তর দেওয়া হয়নি",
          correctAnswer: q.options[q.correct],
          whyWrong: "বোর্ড মডেল টেস্টে ভুল অপশন নির্বাচন।",
          correctConcept: q.explanation
        });
      }
    });

    const scorePct = Math.round((correctCount / questions.length) * 100);
    let grade = "F";
    if (scorePct >= 90) grade = "A+";
    else if (scorePct >= 80) grade = "A";
    else if (scorePct >= 70) grade = "B+";
    else if (scorePct >= 60) grade = "B";
    else if (scorePct >= 50) grade = "C";

    const readinessPct = Math.min(100, Math.round(
      (stats.overallMastery * 0.35) +
      (scorePct * 0.45) +
      (secondsRemaining > 60 ? 10 : 5) + 10
    ));

    if (onAddXP) onAddXP(scorePct * 2, "মডেল টেস্ট সম্পন্ন");
    if (onChime) onChime('success');

    setScoreReport({
      scorePct,
      grade,
      readinessPct,
      strongAreas: Array.from(strong),
      weakAreas: Array.from(weak),
      recommendations
    });
  };

  const q = questions[currentIdx];

  if (!examStarted) {
    return (
      <div className="glass-panel" style={{ padding: '36px', textAlign: 'center', maxWidth: '680px', margin: '30px auto' }}>
        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
          {is100Mode ? '👑' : '⏱'}
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-ink)', marginBottom: '8px' }}>
          {is100Mode ? '১০০/১০০ মাস্টার বোর্ড পরীক্ষা চ্যালেঞ্জ' : 'টাইমারযুক্ত পূর্ণাঙ্গ বোর্ড মডেল টেস্ট'}
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
          {is100Mode 
            ? "আইসিটি ও অর্থনীতির ১২টি মিশ্রিত বোর্ড প্রশ্ন, কঠোর ১৫ মিনিটের কাউন্টডাউন এবং পূর্ণাঙ্গ প্রস্তুতি সূচক।"
            : "বাস্তব পরীক্ষার সময়সীমা মেনে আইসিটি ও অর্থনীতি বিষয়ের সমন্বয়ে ৮টি গুরুত্বপূর্ণ বহুনির্বাচনী প্রশ্ন অনুশীলন করুন।"}
        </p>
        <button className="btn btn-primary" onClick={startNewExam}>
          🚀 এখনই সময়ভিত্তিক পরীক্ষা শুরু করুন
        </button>
      </div>
    );
  }

  if (examFinished && scoreReport) {
    return (
      <div className="glass-panel" style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '6px' }}>
            {scoreReport.scorePct >= 80 ? '🏆' : '📚'}
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-ink)' }}>বোর্ড পরীক্ষা মূল্যায়ন রিপোর্ট</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>১০০/১০০ অর্জনের জন্য ফলাফল ও রিভিশন নির্দেশিকা</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          <div style={{ background: 'var(--book-bg)', padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--page-border)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>প্রাপ্ত নম্বর</span>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--rose-700)' }}>{scoreReport.scorePct} / ১০০</div>
          </div>
          <div style={{ background: 'var(--book-bg)', padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--page-border)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>লেটার গ্রেড</span>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#059669' }}>{scoreReport.grade}</div>
          </div>
          <div style={{ background: 'var(--book-bg)', padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--page-border)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>১০০/১০০ প্রস্তুতি সূচক</span>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--rose-900)' }}>{scoreReport.readinessPct}%</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#065f46', marginBottom: '10px' }}>💪 যেসব বিষয়ে প্রস্তুতি দারুণ</h4>
            <ul style={{ paddingLeft: '18px', fontSize: '0.88rem', color: '#065f46' }}>
              {scoreReport.strongAreas.length > 0 ? (
                scoreReport.strongAreas.map((a, i) => <li key={i}>{a}</li>)
              ) : <li>আরও বেশি পরীক্ষা দিয়ে প্রস্তুতি যাচাই করুন।</li>}
            </ul>
          </div>

          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#991b1b', marginBottom: '10px' }}>⚠️ যেসব বিষয়ে রিভিশন প্রয়োজন</h4>
            <ul style={{ paddingLeft: '18px', fontSize: '0.88rem', color: '#991b1b' }}>
              {scoreReport.weakAreas.length > 0 ? (
                scoreReport.weakAreas.map((a, i) => <li key={i}>{a}</li>)
              ) : <li>কোনো ভুল হয়নি! দুর্দান্ত নির্ভুলতা।</li>}
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button className="btn btn-primary" onClick={startNewExam}>🔄 পুনরায় পরীক্ষা দিন</button>
        </div>
      </div>
    );
  }

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  return (
    <div className="glass-panel" style={{ padding: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--page-border)', paddingBottom: '14px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, background: is100Mode ? 'var(--grad-rose-button)' : 'var(--rose-100)', color: is100Mode ? '#fff' : 'var(--rose-900)', padding: '4px 12px', borderRadius: 'var(--radius-full)', textTransform: 'uppercase' }}>
            {is100Mode ? '👑 ১০০/১০০ মাস্টার পরীক্ষা চ্যালেঞ্জ' : '⏱ টাইমারযুক্ত বোর্ড মডেল টেস্ট'}
          </span>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-ink)', marginTop: '6px' }}>
            প্রশ্ন নং {currentIdx + 1} / {questions.length}
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: secondsRemaining < 120 ? '#dc2626' : 'var(--rose-700)', background: 'var(--rose-100)', padding: '6px 16px', borderRadius: 'var(--radius-full)', border: '1px solid var(--rose-300)' }}>
            ⏳ {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
          </div>
          <button className="btn btn-outline-rose btn-sm" onClick={() => setExamStarted(false)}>
            পরীক্ষা থেকে প্রস্থান
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-track" style={{ marginBottom: '24px' }}>
        <div className="progress-bar-fill" style={{ width: `${Math.round(((currentIdx + 1) / questions.length) * 100)}%` }} />
      </div>

      <div style={{ background: 'var(--book-bg)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--page-border)', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--rose-700)' }}>{q.subject} • {q.unit}</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>কাঠিন্য: {q.difficulty}</span>
        </div>
        <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-ink)', lineHeight: 1.6 }}>
          {q.question}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
        {q.options.map((opt, i) => {
          const isSelected = userAnswers[currentIdx] === i;
          return (
            <button
              key={i}
              className="mcq-option-btn"
              onClick={() => handleSelectOption(i)}
              style={isSelected ? { background: 'var(--rose-100)', borderColor: 'var(--rose-500)', fontWeight: 700 } : {}}
            >
              <span style={{ fontWeight: 800, color: 'var(--rose-700)', width: '24px' }}>
                {['ক', 'খ', 'গ', 'ঘ'][i] || String.fromCharCode(65 + i)}.
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary" disabled={currentIdx === 0} onClick={() => setCurrentIdx(currentIdx - 1)}>
          ◀ পূর্ববর্তী প্রশ্ন
        </button>
        {currentIdx === questions.length - 1 ? (
          <button className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }} onClick={submitExam}>
            ✅ পরীক্ষা সম্পন্ন ও জমা দিন
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => setCurrentIdx(currentIdx + 1)}>
            পরবর্তী প্রশ্ন ▶
          </button>
        )}
      </div>
    </div>
  );
}
