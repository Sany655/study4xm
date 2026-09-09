import React, { useState } from 'react';

const PROMPTS = [
  {
    id: "wt-os",
    subject: "আইসিটি",
    title: "অপারেটিং সিস্টেমের স্থাপত্য ও মূল কার্যাবলি",
    question: "অপারেটিং সিস্টেম (OS) বলতে কী বোঝায়? কম্পিউটারের হার্ডওয়্যার নিয়ন্ত্রণ ও মেমোরি ব্যবস্থাপনায় এর প্রধান কাজগুলো কী কী?",
    requiredKeywords: [
      "অপারেটিং সিস্টেম", "হার্ডওয়্যার", "সফটওয়্যার", "মেমোরি", "রিসোর্স", "প্রসেস", "ইউজার ইন্টারফেস"
    ],
    keywordSynonyms: {
      "অপারেটিং সিস্টেম": ["os", "operating system", "অপারেটিং"],
      "হার্ডওয়্যার": ["hardware", "যন্ত্রাংশ"],
      "সফটওয়্যার": ["software", "প্রোগ্রাম"],
      "মেমোরি": ["memory", "র‍্যাম", "ram"],
      "রিসোর্স": ["resource", "সম্পদ"],
      "প্রসেস": ["process", "প্রক্রিয়া"],
      "ইউজার ইন্টারফেস": ["interface", "gui", "ইন্টারফেস"]
    },
    idealAnswer: "অপারেটিং সিস্টেম (OS) হলো এমন একটি মূল সিস্টেম সফটওয়্যার যা ব্যবহারকারী এবং কম্পিউটার হার্ডওয়্যারের মধ্যে সেতুবন্ধন হিসেবে কাজ করে। এর প্রধান কাজের মধ্যে রয়েছে: ১. প্রসেসর ও মেমোরি রিসোর্স ব্যবস্থাপনা, ২. ইনপুট ও আউটপুট ডিভাইসের সাথে সংযোগ স্থাপন ও ড্রাইভার নিয়ন্ত্রণ, ৩. ব্যবহারকারীর জন্য গ্রাফিক্যাল ইউজার ইন্টারফেস (GUI) প্রদান, এবং ৪. ফাইল সিস্টেম ও ডেটার নিরাপত্তা নিশ্চিত করা।",
    marks: 10
  },
  {
    id: "wt-osi",
    subject: "আইসিটি",
    title: "ওএসআই (OSI) ৭-লেয়ার মডেলের কার্যপ্রণালী",
    question: "ওএসআই ৭-লেয়ার রেফারেন্স মডেলের স্তরগুলোর ভূমিকা সংক্ষেপে লেখো এবং এনক্যাপসুলেশন প্রক্রিয়া ব্যাখ্যা করো।",
    requiredKeywords: [
      "৭টি স্তর", "অ্যাপ্লিকেশন", "ট্রান্সপোর্ট", "নেটওয়ার্ক", "ডেটা লিঙ্ক", "ফিজিক্যাল", "প্যাকেট"
    ],
    keywordSynonyms: {
      "৭টি স্তর": ["7 layer", "layer", "স্তর"],
      "অ্যাপ্লিকেশন": ["application", "সফটওয়্যার"],
      "ট্রান্সপোর্ট": ["transport", "টিসিপি", "tcp"],
      "নেটওয়ার্ক": ["network", "আইপি", "ip"],
      "ডেটা লিঙ্ক": ["data link", "ম্যাক", "mac"],
      "ফিজিক্যাল": ["physical", "তার", "সিগন্যাল"],
      "প্যাকেট": ["packet", "ফ্রেম", "frame"]
    },
    idealAnswer: "ওএসআই (Open Systems Interconnection) হলো নেটওয়ার্ক যোগাযোগের ৭টি স্তরের আন্তর্জাতিক ফ্রেমওয়ার্ক: অ্যাপ্লিকেশন, প্রেজেন্টেশন, সেশন, ট্রান্সপোর্ট, নেটওয়ার্ক, ডেটা লিঙ্ক এবং ফিজিক্যাল লেয়ার। এনক্যাপসুলেশন প্রক্রিয়ায় ডেটা উপরের লেয়ার থেকে নিচের দিকে প্রবাহিত হয়: ট্রান্সপোর্ট লেয়ারে সেগমেন্ট, নেটওয়ার্ক লেয়ারে আইপি প্যাকেট, ডেটা লিঙ্ক লেয়ারে ফ্রেম এবং ফিজিক্যাল লেয়ারে বাইনারি বৈদ্যুতিক বা অপটিক্যাল বিটে রূপান্তরিত হয়ে প্রেরিত হয়।",
    marks: 10
  },
  {
    id: "wt-opp-cost",
    subject: "অর্থনীতি",
    title: "সুযোগ ব্যয় ও সম্পদের দুষ্প্রাপ্যতা",
    question: "সুযোগ ব্যয় (Opportunity Cost) কাকে বলে? অসীম অভাব ও সীমিত সম্পদের কারণে সমাজে কেন পছন্দের প্রয়োজন হয় ব্যাখ্যা করো।",
    requiredKeywords: [
      "সুযোগ ব্যয়", "দুষ্প্রাপ্যতা", "অসীম অভাব", "সীমিত সম্পদ", "বিকল্প", "উৎপাদন সম্ভাবনা"
    ],
    keywordSynonyms: {
      "সুযোগ ব্যয়": ["opportunity cost", "ত্যাগ"],
      "দুষ্প্রাপ্যতা": ["scarcity", "স্বল্পতা", "ঘাটতি"],
      "অসীম অভাব": ["unlimited wants", "চাহিদা"],
      "সীমিত সম্পদ": ["limited resources", "সম্পদ"],
      "বিকল্প": ["alternative", "পছন্দ"],
      "উৎপাদন সম্ভাবনা": ["ppc", "রেখাচিত্র"]
    },
    idealAnswer: "একটি দ্রব্যের অতিরিক্ত উৎপাদন পাওয়ার জন্য অন্য একটি বিকল্প দ্রব্যের যে পরিমাণ উৎপাদন ছেড়ে দিতে হয়, তাকে প্রথম দ্রব্যের সুযোগ ব্যয় (Opportunity Cost) বলে। মানুষের জীবনে অভাব অসীম কিন্তু সেই তুলনায় উৎপাদনশীল সম্পদ সীমিত। সম্পদের এই দুষ্প্রাপ্যতার কারণেই মানুষকে অগ্রাধিকারের ভিত্তিতে বাছাই করতে হয়। এই অর্থনৈতিক পছন্দ ও সুযোগ ব্যয়ের সম্পর্ক উৎপাদন সম্ভাবনা রেখার (PPC) মাধ্যমে নিখুঁতভাবে নির্দেশ করা হয়।",
    marks: 10
  },
  {
    id: "wt-firm-equil",
    subject: "অর্থনীতি",
    title: "ফার্মের ভারসাম্য অর্জনের দুটি শর্ত",
    question: "যেকোনো বাজারে একটি ফার্মের মুনাফা সর্বোচ্চকরণ ও ভারসাম্য অর্জনের দুটি আবশ্যকীয় শর্ত ব্যাখ্যা করো।",
    requiredKeywords: [
      "প্রান্তিক আয়", "প্রান্তিক ব্যয়", "MR = MC", "নিচ থেকে ছেদ", "ভারসাম্য"
    ],
    keywordSynonyms: {
      "প্রান্তিক আয়": ["marginal revenue", "mr"],
      "প্রান্তিক ব্যয়": ["marginal cost", "mc"],
      "MR = MC": ["সমান", "mr=mc"],
      "নিচ থেকে ছেদ": ["cut from below", "ছেদ"],
      "ভারসাম্য": ["equilibrium", "মুনাফা"]
    },
    idealAnswer: "ফার্মের ভারসাম্য ও মুনাফা সর্বোচ্চকরণের দুটি আবশ্যকীয় শর্ত হলো: ১. প্রয়োজনীয় শর্ত: ফার্মের প্রান্তিক আয় ও প্রান্তিক ব্যয় পরস্পর সমান হতে হবে (MR = MC)। ২. পর্যাপ্ত শর্ত: ভারসাম্য বিন্দুতে প্রান্তিক ব্যয় (MC) রেখাটি প্রান্তিক আয় (MR) রেখাকে নিচ থেকে ছেদ করে উপরের দিকে উঠবে, অর্থাৎ MC রেখার ঢাল MR রেখার ঢালের চেয়ে বড় হবে।",
    marks: 5
  }
];

export default function WritingTrainerView({ onAddXP, onChime }) {
  const [promptIdx, setPromptIdx] = useState(0);
  const [answerText, setAnswerText] = useState('');
  const [evaluation, setEvaluation] = useState(null);

  const current = PROMPTS[promptIdx];

  const evaluateAnswer = () => {
    const textLower = answerText.toLowerCase().trim();
    if (textLower.length < 20) {
      alert("অনুগ্রহ করে মূল্যায়নের জন্য আপনার উত্তরটি বিস্তারিতভাবে লিখুন।");
      return;
    }

    const foundKeywords = [];
    const missingKeywords = [];

    current.requiredKeywords.forEach(kw => {
      const synonyms = (current.keywordSynonyms && current.keywordSynonyms[kw]) || [];
      const allMatches = [kw.toLowerCase(), ...synonyms.map(s => s.toLowerCase())];
      const isPresent = allMatches.some(m => textLower.includes(m));

      if (isPresent) {
        foundKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });

    const keywordPct = Math.round((foundKeywords.length / current.requiredKeywords.length) * 100);
    const lengthScore = Math.min(100, Math.round((answerText.split(/\s+/).length / 35) * 100));
    const conceptAccuracy = Math.round((keywordPct * 0.7) + (lengthScore * 0.3));
    const structureScore = answerText.length > 80 ? 90 : 60;
    const overallScore = Math.round((conceptAccuracy * 0.4) + (keywordPct * 0.3) + (lengthScore * 0.15) + (structureScore * 0.15));

    if (overallScore >= 70) {
      if (onChime) onChime('success');
      if (onAddXP) onAddXP(50, 'সৃজনশীল লেখার মূল্যায়নে উত্তীর্ণ');
    } else {
      if (onChime) onChime('warn');
    }

    setEvaluation({
      overallScore,
      conceptAccuracy,
      keywordPct,
      lengthScore,
      structureScore,
      foundKeywords,
      missingKeywords
    });
  };

  const loadSample = () => {
    setAnswerText(current.idealAnswer);
  };

  return (
    <div className="writing-trainer-box">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <span style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, background: 'var(--rose-100)', color: 'var(--rose-800)', padding: '3px 10px', borderRadius: 'var(--radius-full)', marginBottom: '4px' }}>
            {current.subject} বোর্ড পরীক্ষার সৃজনশীল প্রশ্ন
          </span>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-ink)' }}>{current.title}</h3>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setPromptIdx((prev) => (prev - 1 + PROMPTS.length) % PROMPTS.length);
              setEvaluation(null);
            }}
          >
            ◀ পূর্ববর্তী
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setPromptIdx((prev) => (prev + 1) % PROMPTS.length);
              setEvaluation(null);
            }}
          >
            পরবর্তী ▶
          </button>
        </div>
      </div>

      <div style={{ background: 'var(--book-bg)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--page-border)', marginBottom: '16px' }}>
        <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-ink)', lineHeight: 1.6 }}>
          ❓ <strong>প্রশ্ন:</strong> {current.question}
        </p>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          মান বণ্টন: {current.marks} নম্বরের কাঠামোগত বোর্ড উত্তর
        </span>
      </div>

      <div>
        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-ink)', display: 'block', marginBottom: '4px' }}>
          ✍️ আপনার বোর্ড পরীক্ষার উত্তরটি নিচে বাংলায় টাইপ করুন:
        </label>
        <textarea 
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          className="writing-textarea"
          placeholder="এখানে আপনার সম্পূর্ণ উত্তরটি লিখুন... সঠিক পারিভাষিক শব্দ, সংজ্ঞা ও ধারাবাহিক কার্যপ্রণালী উল্লেখ করুন।"
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-primary" onClick={evaluateAnswer}>
            🔍 উত্তরের স্বয়ংক্রিয় মূল্যায়ন করুন
          </button>
          <button className="btn btn-secondary" onClick={loadSample}>
            আদর্শ উত্তরের নমুনা লোড করুন
          </button>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {answerText.trim() ? answerText.trim().split(/\s+/).length : 0} টি শব্দ টাইপ করা হয়েছে
        </span>
      </div>

      {evaluation && (
        <div className="evaluation-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', borderBottom: '1px solid var(--page-border)', paddingBottom: '12px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--rose-700)', textTransform: 'uppercase' }}>মূল্যায়ন ফলাফল (AI Scoring)</span>
              <h4 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-ink)', margin: '2px 0' }}>
                প্রাপ্ত নম্বর: {evaluation.overallScore} <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>/ ১০০</span>
              </h4>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: evaluation.overallScore >= 75 ? '#059669' : 'var(--rose-600)' }}>
                {evaluation.overallScore >= 80 ? '🌟 বোর্ড পরীক্ষার জন্য প্রস্তুত (A+ গ্রেড)' : evaluation.overallScore >= 65 ? '👍 ভালো প্রস্তুতি (B+ গ্রেড)' : '⚠️ আরও রিভিশন প্রয়োজন'}
              </span>
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <div className="score-progress-row">
              <span style={{ width: '130px', fontWeight: 600 }}>ধারণার নির্ভুলতা:</span>
              <div className="score-bar-mini"><div className="score-bar-mini-fill" style={{ width: `${evaluation.conceptAccuracy}%` }}></div></div>
              <span style={{ fontWeight: 700, width: '40px', textAlign: 'right' }}>{evaluation.conceptAccuracy}%</span>
            </div>
            <div className="score-progress-row">
              <span style={{ width: '130px', fontWeight: 600 }}>মূল শব্দকোষ:</span>
              <div className="score-bar-mini"><div className="score-bar-mini-fill" style={{ width: `${evaluation.keywordPct}%` }}></div></div>
              <span style={{ fontWeight: 700, width: '40px', textAlign: 'right' }}>{evaluation.keywordPct}%</span>
            </div>
            <div className="score-progress-row">
              <span style={{ width: '130px', fontWeight: 600 }}>পর্যাপ্ততা ও দৈর্ঘ্য:</span>
              <div className="score-bar-mini"><div className="score-bar-mini-fill" style={{ width: `${evaluation.lengthScore}%` }}></div></div>
              <span style={{ fontWeight: 700, width: '40px', textAlign: 'right' }}>{evaluation.lengthScore}%</span>
            </div>
            <div className="score-progress-row">
              <span style={{ width: '130px', fontWeight: 600 }}>বাক্য গঠন ও মান:</span>
              <div className="score-bar-mini"><div className="score-bar-mini-fill" style={{ width: `${evaluation.structureScore}%` }}></div></div>
              <span style={{ fontWeight: 700, width: '40px', textAlign: 'right' }}>{evaluation.structureScore}%</span>
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              {evaluation.missingKeywords.length === 0 ? '✅ বোর্ড পরীক্ষার সকল আবশ্যকীয় কী-ওয়ার্ড উপস্থিত!' : '⚠️ ১০০/১০০ নম্বরের জন্য যেসব কী-ওয়ার্ড যুক্ত করা উচিত:'}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {evaluation.missingKeywords.map((kw, i) => (
                <span key={i} style={{ background: '#fee2e2', color: '#991b1b', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700, border: '1px solid #fca5a5' }}>
                  + {kw}
                </span>
              ))}
              {evaluation.foundKeywords.map((kw, i) => (
                <span key={i} style={{ background: '#ecfdf5', color: '#065f46', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600, border: '1px solid #a7f3d0' }}>
                  ✓ {kw}
                </span>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--book-bg)', border: '1px solid var(--page-border)', padding: '14px', borderRadius: 'var(--radius-sm)', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--rose-800)', display: 'block', marginBottom: '4px' }}>
              📖 আদর্শ মডেল উত্তর:
            </span>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-ink)', lineHeight: 1.6 }}>
              {current.idealAnswer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
