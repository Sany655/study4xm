import React, { useState } from 'react';
import { fetchTopicAiExplanation } from '../services/aiService';
import { 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  RotateCcw, 
  Volume2, 
  Copy, 
  Check, 
  Lightbulb, 
  BookOpen, 
  Cpu, 
  MessageSquare,
  KeyRound,
  FileCheck,
  ListOrdered,
  Globe,
  AlertTriangle,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

export default function GranularSyllabusCard({
  subtopic,
  subject,
  unitTitle,
  onSpeak,
  onChime
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [apiSource, setApiSource] = useState(null);
  const [promptInput, setPromptInput] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [promptHistory, setPromptHistory] = useState([]);

  // Expand and automatically trigger AI explanation if not yet fetched
  const handleToggleExpand = async () => {
    const nextState = !isExpanded;
    setIsExpanded(nextState);

    if (nextState && !explanation && !isLoading) {
      loadExplanation();
    }

    if (onChime) onChime('click');
  };

  const loadExplanation = async (customPrompt = "") => {
    setIsLoading(true);
    try {
      const res = await fetchTopicAiExplanation({
        subtopic,
        subject,
        unitTitle,
        customPrompt,
        conversationHistory: promptHistory
      });

      setExplanation(res.text);
      setApiSource(res.source);

      if (customPrompt) {
        setPromptHistory(prev => [...prev, customPrompt]);
      }

      if (onChime) onChime('success');
    } catch (err) {
      console.error("Failed to load AI explanation:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomPromptSubmit = (e) => {
    if (e) e.preventDefault();
    if (!promptInput.trim() || isLoading) return;

    const userPrompt = promptInput.trim();
    setPromptInput('');
    loadExplanation(userPrompt);
  };

  const handleQuickPromptClick = (quickText) => {
    if (isLoading) return;
    loadExplanation(quickText);
  };

  const handleCopyText = () => {
    if (!explanation) return;
    navigator.clipboard.writeText(explanation);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    if (onChime) onChime('click');
  };

  const handleReadAloud = () => {
    if (onSpeak && explanation) {
      // Strip markdown hashes and asterisks for cleaner speech
      const cleanText = explanation.replace(/[#*`>_]/g, ' ').slice(0, 400);
      onSpeak(cleanText);
    }
  };

  // Robust parser for academic AI sections with strict structural boundaries
  const parseAcademicSections = (rawText) => {
    if (!rawText) return [];

    // Preprocessing to normalize and decouple run-on headings, inline bullets, and questions
    let text = rawText
      .replace(/\r\n/g, '\n')
      // Decouple inline emoji section headers (only if NOT preceded by # or space after #)
      .replace(/([^\n#\s])\s*([💡🔑📝📊🌍⚠️💬📌🎯]\s*[0-9০-৯]?\.?\s*)/g, '$1\n\n$2')
      // Decouple markdown ### headers
      .replace(/([^\n])\s*(#{2,4}\s+)/g, '$1\n\n$2')
      // Decouple header titles ending with parenthesis from subsequent body text on the same line
      .replace(/([💡🔑📝📊🌍⚠️💬📌🎯#].*?\))\s*([^\n\s])/g, '$1\n\n$2')
      // Decouple inline bullets
      .replace(/([^\n])\s+[-*]\s+\*\*/g, '$1\n\n- **')
      // Decouple inline numbered steps
      .replace(/([^\n])\s+(\d+\.\s+\*\*)/g, '$1\n\n$2')
      // Decouple inline blockquotes / answers
      .replace(/([^\n])\s+>\s*\*\*/g, '$1\n\n> **')
      .replace(/([।!?])\s*(>\s*)/g, '$1\n\n$2');

    // Regex to detect start of any section (markdown hash with optional emoji, or bare emoji, or numbered header)
    const sectionSplitter = /(?=^(?:#{2,4}\s*(?:[💡🔑📝📊🌍⚠️💬📌🎯]\s*)?|[💡🔑📝📊🌍⚠️💬📌🎯]\s*[0-9০-৯]?\.?\s*|[0-9০-৯]\.\s*(?:মূল ধারণা|আবশ্যিক|পারিভাষিক|বোর্ড|সৃজনশীল|বাস্তব|সাধারণ ভুল|সতর্কতা|অনুরোধ)))/m;

    // If no distinct section pattern matched, treat as single general block
    if (!text.match(sectionSplitter)) {
      return [{
        type: 'general',
        title: 'একাডেমিক বিশ্লেষণ',
        body: text.trim()
      }];
    }

    const rawBlocks = text.split(sectionSplitter);
    const sections = [];

    rawBlocks.forEach((block) => {
      const trimmed = block.trim();
      if (!trimmed) return;

      const lines = trimmed.split('\n');
      let firstLine = lines[0].trim();
      let body = lines.slice(1).join('\n').trim();

      // Defensive decoupling if firstLine is abnormally long with title ending in ')' or ':'
      if (firstLine.length > 75 && (firstLine.includes(')') || firstLine.includes(':'))) {
        const splitIdx = firstLine.indexOf(')') !== -1 ? firstLine.indexOf(')') + 1 : firstLine.indexOf(':') + 1;
        const extraBody = firstLine.slice(splitIdx).trim();
        firstLine = firstLine.slice(0, splitIdx).trim();
        body = extraBody ? (extraBody + '\n\n' + body).trim() : body;
      }

      // Skip empty or accidental orphan heading markers, or blocks with no meaningful body
      if (!body || body.trim().length < 5) return;
      if (!firstLine || firstLine.replace(/[#\s]/g, '') === '') return;

      // Clean leading hashes and duplicate emoji/symbols for clean Lucide header display
      let title = firstLine
        .replace(/^#{2,4}\s*/, '')
        .replace(/^[💡🔑📝📊🌍⚠️💬📌🎯\uFFFD\?]\s*/, '')
        .trim();

      if (!title) return;

      // Determine semantic type for themed styling
      let type = 'general';
      const lowerCheck = (firstLine + ' ' + title).toLowerCase();

      if (firstLine.includes('💡') || title.includes('১.') || lowerCheck.includes('মূল ধারণা') || lowerCheck.includes('সারমর্ম') || lowerCheck.includes('core')) {
        type = 'core';
      } else if (firstLine.includes('🔑') || title.includes('২.') || lowerCheck.includes('ইংরেজি') || lowerCheck.includes('পারিভাষিক') || lowerCheck.includes('terminology') || lowerCheck.includes('keyword')) {
        type = 'terms';
      } else if (firstLine.includes('📝') || title.includes('৩.') || lowerCheck.includes('বোর্ড পরীক্ষা') || lowerCheck.includes('২ নম্বর') || lowerCheck.includes('অনুধাবন') || lowerCheck.includes('আদর্শ উত্তর') || lowerCheck.includes('exam')) {
        type = 'model_answer';
      } else if (firstLine.includes('📊') || (title.includes('৪.') && (lowerCheck.includes('সৃজনশীল') || lowerCheck.includes('কাঠামো'))) || lowerCheck.includes('broad')) {
        type = 'broad_answer';
      } else if (firstLine.includes('🌍') || title.includes('৫.') || lowerCheck.includes('বাস্তব') || lowerCheck.includes('কেস') || lowerCheck.includes('উদাহরণ') || lowerCheck.includes('case')) {
        type = 'case_study';
      } else if (firstLine.includes('⚠️') || title.includes('৬.') || title.includes('৪.') || lowerCheck.includes('ভুল') || lowerCheck.includes('সতর্কতা') || lowerCheck.includes('pitfall') || lowerCheck.includes('mistake')) {
        type = 'pitfall';
      } else if (firstLine.includes('💬') || title.includes('৭.') || lowerCheck.includes('অনুরোধ') || lowerCheck.includes('বিশেষ বিশ্লেষণ') || lowerCheck.includes('custom')) {
        type = 'custom_prompt';
      }

      sections.push({ type, title, body });
    });

    return sections;
  };

  // Render a single section box with specialized, pristine UI components
  const renderSectionBox = (sec, idx) => {
    let icon = <BookOpen size={16} color="var(--rose-600)" />;
    let badge = "সিলেবাস গাইড";

    switch (sec.type) {
      case 'core':
        icon = <Lightbulb size={16} color="#e11d48" />;
        badge = "মৌলিক সারসংক্ষেপ";
        break;
      case 'terms':
        icon = <KeyRound size={16} color="#0284c7" />;
        badge = "আবশ্যকীয় ইংরেজি শব্দ";
        break;
      case 'model_answer':
        icon = <FileCheck size={16} color="#059669" />;
        badge = "১০০/১০০ আদর্শ উত্তর";
        break;
      case 'broad_answer':
        icon = <ListOrdered size={16} color="#4f46e5" />;
        badge = "সৃজনশীল প্রশ্নের কাঠামো";
        break;
      case 'case_study':
        icon = <Globe size={16} color="#0d9488" />;
        badge = "বাস্তব জীবনের প্রয়োগ";
        break;
      case 'pitfall':
        icon = <AlertTriangle size={16} color="#d97706" />;
        badge = "পরীক্ষকের সতর্কবার্তা";
        break;
      case 'custom_prompt':
        icon = <MessageSquare size={16} color="#7c3aed" />;
        badge = "কাস্টম বিশ্লেষণ";
        break;
      default:
        icon = <BookOpen size={16} color="var(--rose-600)" />;
        badge = "একাডেমিক তথ্য";
    }

    const renderBodyContent = () => {
      if (!sec.body) return null;

      // Special rendering for 'terms' (Key Technical Terminology)
      if (sec.type === 'terms') {
        const lines = sec.body.split('\n').map(l => l.trim()).filter(Boolean);
        const introLines = [];
        const termItems = [];

        lines.forEach(l => {
          if (l.startsWith('- ') || l.startsWith('* ')) {
            const rawItem = l.replace(/^[-*]\s+/, '');
            const match = rawItem.match(/^\*\*(.*?)\*\*(?::|\s*[-–—:]\s*)(.*)$/);
            if (match) {
              termItems.push({ term: match[1].trim(), desc: match[2].trim() });
            } else {
              const termOnlyMatch = rawItem.match(/^\*\*(.*?)\*\*$/);
              if (termOnlyMatch) {
                termItems.push({ term: termOnlyMatch[1].trim(), desc: "বোর্ড পরীক্ষায় সম্পূর্ণ নম্বরের জন্য আবশ্যকীয় কারিগরি শব্দ।" });
              } else {
                termItems.push({ term: null, desc: rawItem });
              }
            }
          } else {
            introLines.push(l);
          }
        });

        return (
          <div>
            {introLines.length > 0 && (
              <p style={{ margin: '0 0 10px', fontSize: '0.86rem', color: 'var(--text-body)' }}>
                {introLines.join(' ')}
              </p>
            )}
            {termItems.length > 0 && (
              <div className="ai-term-grid">
                {termItems.map((item, tIdx) => (
                  <div key={tIdx} className="ai-term-item">
                    {item.term && (
                      <span className="ai-term-badge">
                        {item.term}
                      </span>
                    )}
                    <span className="ai-term-desc" dangerouslySetInnerHTML={{ 
                      __html: (item.desc || item.term)
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }

      // Special rendering for 'model_answer' (2-Mark Question & Answer + 5/10 mark structure)
      if (sec.type === 'model_answer') {
        const blocks = sec.body.split('\n\n').map(b => b.trim()).filter(Boolean);
        return (
          <div>
            {blocks.map((block, bIdx) => {
              if (block.includes('প্রশ্ন:')) {
                return (
                  <div key={bIdx} className="ai-question-card">
                    <HelpCircle size={15} style={{ color: '#0284c7', flexShrink: 0, marginTop: '2px' }} />
                    <div dangerouslySetInnerHTML={{ 
                      __html: block
                        .replace(/^[-*]\s+/, '')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    }} />
                  </div>
                );
              }
              if (block.startsWith('> ') || block.includes('উত্তর:')) {
                return (
                  <div key={bIdx} className="ai-model-answer-quote">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 800, color: '#059669', fontSize: '0.8rem', marginBottom: '4px' }}>
                      <CheckCircle2 size={13} />
                      <span>১০০% পূর্ণ নম্বর পাওয়ার আদর্শ উত্তর:</span>
                    </div>
                    <div dangerouslySetInnerHTML={{ 
                      __html: block.replace(/^>\s*/gm, '')
                        .replace(/^[-*]\s+/, '')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    }} />
                  </div>
                );
              }
              if (block.includes('৫/১০ নম্বর') || block.includes('প্রয়োগ ও উচ্চতর')) {
                return (
                  <div key={bIdx} style={{ 
                    margin: '14px 0 8px', 
                    padding: '6px 10px', 
                    background: 'rgba(99, 102, 241, 0.08)', 
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 800,
                    fontSize: '0.86rem',
                    color: '#4338ca',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <ListOrdered size={15} />
                    <span>{block.replace(/^[-*]\s+/, '').replace(/\*\*/g, '')}</span>
                  </div>
                );
              }
              if (block.match(/^\d+\.\s+\*\*/)) {
                return (
                  <div key={bIdx} className="ai-stepper-item" style={{ margin: '6px 0' }}>
                    <span className="ai-stepper-num">{block.match(/^\d+/)?.[0] || '•'}</span>
                    <div style={{ flex: 1, fontSize: '0.88rem' }} dangerouslySetInnerHTML={{ 
                      __html: block.replace(/^\d+\.\s+/, '')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    }} />
                  </div>
                );
              }
              return (
                <p key={bIdx} style={{ margin: '6px 0', fontSize: '0.88rem' }} dangerouslySetInnerHTML={{ 
                  __html: block
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                }} />
              );
            })}
          </div>
        );
      }

      // Special rendering for 'broad_answer' (Numbered Stepper Points)
      if (sec.type === 'broad_answer') {
        const lines = sec.body.split('\n').map(l => l.trim()).filter(Boolean);
        const stepItems = [];
        const nonSteps = [];

        lines.forEach(l => {
          const match = l.match(/^(\d+)[\.\)]\s*(.*)$/);
          if (match) {
            stepItems.push({ num: match[1], text: match[2] });
          } else {
            nonSteps.push(l);
          }
        });

        if (stepItems.length > 0) {
          return (
            <div>
              {nonSteps.length > 0 && (
                <p style={{ margin: '0 0 10px', fontSize: '0.86rem' }}>{nonSteps.join(' ')}</p>
              )}
              <div className="ai-stepper-list">
                {stepItems.map((st, sIdx) => (
                  <div key={sIdx} className="ai-stepper-item">
                    <span className="ai-stepper-num">{st.num}</span>
                    <div style={{ flex: 1, fontSize: '0.88rem' }} dangerouslySetInnerHTML={{ 
                      __html: st.text
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    }} />
                  </div>
                ))}
              </div>
            </div>
          );
        }
      }

      // General rich markdown formatting for core summary, case study, pitfalls, custom prompt
      const blocks = sec.body.split('\n\n').map(b => b.trim()).filter(Boolean);
      return (
        <div>
          {blocks.map((block, bIdx) => {
            if (block.startsWith('> ')) {
              return (
                <blockquote key={bIdx} style={{ 
                  borderLeft: '3px solid var(--rose-500)', 
                  padding: '8px 12px', 
                  background: 'rgba(225, 29, 72, 0.05)', 
                  borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                  margin: '8px 0',
                  fontSize: '0.88rem'
                }}>
                  {block.replace(/^>\s*/gm, '')}
                </blockquote>
              );
            }

            if (block.startsWith('- ') || block.startsWith('* ')) {
              const listLines = block.split('\n').map(l => l.trim()).filter(Boolean);
              return (
                <ul key={bIdx} style={{ paddingLeft: '20px', margin: '6px 0' }}>
                  {listLines.map((li, liIdx) => (
                    <li key={liIdx} style={{ marginBottom: '4px', fontSize: '0.88rem' }}>
                      <span dangerouslySetInnerHTML={{ 
                        __html: li.replace(/^[-*]\s+/, '')
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      }} />
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={bIdx} style={{ margin: '6px 0', fontSize: '0.88rem', lineHeight: 1.65 }} dangerouslySetInnerHTML={{ 
                __html: block
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
              }} />
            );
          })}
        </div>
      );
    };

    return (
      <div key={idx} className={`ai-section-box type-${sec.type}`}>
        <div className="ai-section-header">
          <h4 className="ai-section-header-title">
            {icon}
            <span>{sec.title}</span>
          </h4>
          <span className="ai-section-badge">{badge}</span>
        </div>
        <div className="ai-section-body">
          {renderBodyContent()}
        </div>
      </div>
    );
  };

  const renderFormattedExplanation = (content) => {
    if (!content) return null;
    const sections = parseAcademicSections(content);
    return sections.map((sec, idx) => renderSectionBox(sec, idx));
  };

  return (
    <div 
      className={`granular-card ${isExpanded ? 'expanded' : ''}`}
      style={{
        background: 'var(--page-bg)',
        border: isExpanded ? '2px solid var(--rose-400)' : '1px solid var(--page-border)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '14px',
        transition: 'all 0.25s ease',
        boxShadow: isExpanded 
          ? '0 8px 24px rgba(136, 19, 55, 0.1)' 
          : '0 2px 6px rgba(0, 0, 0, 0.02)'
      }}
    >
      {/* CARD HEADER (CLICK TO EXPAND) */}
      <div 
        onClick={handleToggleExpand}
        style={{
          padding: '14px 18px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          background: isExpanded ? 'var(--rose-50)' : 'transparent',
          borderTopLeftRadius: 'var(--radius-md)',
          borderTopRightRadius: 'var(--radius-md)',
          borderBottom: isExpanded ? '1px solid var(--page-border)' : 'none'
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
            <span style={{ 
              fontSize: '0.7rem', 
              fontWeight: 800, 
              color: 'var(--rose-700)', 
              background: 'var(--rose-100)', 
              padding: '2px 8px', 
              borderRadius: 'var(--radius-full)' 
            }}>
              সিলেবাস উপ-টপিক
            </span>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              {subtopic.titleEn}
            </span>
          </div>

          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: 800, 
            color: 'var(--text-ink)', 
            margin: 0, 
            lineHeight: 1.3 
          }}>
            {subtopic.title}
          </h3>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
            {subtopic.keywords?.slice(0, 3).map((kw, i) => (
              <span key={i} style={{ 
                fontSize: '0.72rem', 
                color: 'var(--text-muted)', 
                background: 'rgba(0,0,0,0.03)', 
                border: '1px solid var(--page-border)',
                padding: '1px 6px', 
                borderRadius: '4px' 
              }}>
                {kw}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            className={`btn btn-sm ${isExpanded ? 'btn-primary' : 'btn-secondary'}`}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              fontSize: '0.8rem', 
              padding: '6px 12px', 
              borderRadius: 'var(--radius-full)',
              pointerEvents: 'none' // parent div handles click
            }}
          >
            <Sparkles size={14} color={isExpanded ? '#fff' : 'var(--rose-600)'} />
            <span>{isExpanded ? "সংকুচিত করুন" : "AI ব্যাখ্যা দেখুন"}</span>
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* EXPANDED CONTENT AREA */}
      {isExpanded && (
        <div style={{ padding: '18px 20px' }}>
          {/* LOADING STATE */}
          {isLoading && (
            <div style={{ 
              textAlign: 'center', 
              padding: '30px 10px', 
              background: 'var(--rose-50)', 
              borderRadius: 'var(--radius-sm)',
              border: '1px dashed var(--rose-300)'
            }}>
              <div style={{ display: 'inline-block', animation: 'spin 1.5s linear infinite', marginBottom: '10px' }}>
                <Cpu size={28} color="var(--rose-600)" />
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--rose-900)', margin: '0 0 4px' }}>
                এনসিটিবি সিলেবাস অনুযায়ী রিয়েল-টাইম এআই ব্যাখ্যা তৈরি হচ্ছে...
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                পরীক্ষার জন্য আবশ্যকীয় পয়েন্ট ও কী-ওয়ার্ডসমূহ প্রস্তুত করা হচ্ছে
              </p>
            </div>
          )}

          {/* EXPLANATION CONTENT */}
          {!isLoading && explanation && (
            <div>
              {/* Toolbar */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                borderBottom: '1px solid var(--page-border)', 
                paddingBottom: '10px', 
                marginBottom: '14px',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ 
                    fontSize: '0.72rem', 
                    fontWeight: 700, 
                    color: apiSource === 'gemini-live-api' ? '#059669' : 'var(--rose-700)',
                    background: apiSource === 'gemini-live-api' ? '#d1fae5' : 'var(--rose-100)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Sparkles size={11} />
                    {apiSource === 'gemini-live-api' ? "Google Gemini Live AI" : "স্মার্ট একাডেমিক ইঞ্জিন"}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button 
                    onClick={handleReadAloud} 
                    className="btn btn-secondary btn-sm"
                    title="পড়ে শোনান"
                    style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                  >
                    <Volume2 size={13} />
                    <span>শুনুন</span>
                  </button>
                  <button 
                    onClick={handleCopyText} 
                    className="btn btn-secondary btn-sm"
                    title="কপি করুন"
                    style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                  >
                    {isCopied ? <Check size={13} color="#059669" /> : <Copy size={13} />}
                    <span>{isCopied ? "কপি হয়েছে" : "কপি"}</span>
                  </button>
                  <button 
                    onClick={() => loadExplanation()} 
                    className="btn btn-secondary btn-sm"
                    title="পুনরায় জেনারেট করুন"
                    style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                  >
                    <RotateCcw size={13} />
                  </button>
                </div>
              </div>

              {/* Formatted body */}
              <div className="ai-explanation-body" style={{ color: 'var(--text-ink)' }}>
                {renderFormattedExplanation(explanation)}
              </div>

              {/* QUICK PROMPT SUGGESTION PILLS */}
              <div style={{ marginTop: '22px', borderTop: '1px solid var(--page-border)', paddingTop: '16px' }}>
                <span style={{ 
                  fontSize: '0.78rem', 
                  fontWeight: 800, 
                  color: 'var(--rose-800)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '5px',
                  marginBottom: '8px'
                }}>
                  <MessageSquare size={13} />
                  এই উত্তরের ওপর দ্রুত পরিবর্তন বা বাড়তি তথ্য চান?
                </span>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  <button 
                    onClick={() => handleQuickPromptClick("আরও সহজ ভাষায় একটি সাধারণ উদাহরণ দিয়ে বোঝাও")}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}
                  >
                    ⚡ আরও সহজ ভাষায় বোঝাও
                  </button>
                  <button 
                    onClick={() => handleQuickPromptClick("বোর্ড পরীক্ষায় ৫ নম্বরের উত্তরের প্রধান ৪টি বুলেট পয়েন্ট দাও")}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}
                  >
                    📝 ৫ নম্বরের বুলেট পয়েন্ট
                  </button>
                  <button 
                    onClick={() => handleQuickPromptClick("এই টপিকের ওপর ২টি কঠিন বোর্ড স্ট্যান্ডার্ড MCQ প্রশ্ন ও সঠিক উত্তর ব্যাখ্যাসহ তৈরি করো")}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}
                  >
                    ❓ ২টি কঠিন MCQ প্রশ্ন
                  </button>
                  <button 
                    onClick={() => handleQuickPromptClick("বাংলাদেশের বর্তমান প্রেক্ষাপটে বাস্তব জীবনের একটি আকর্ষণীয় উদাহরণ দাও")}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}
                  >
                    💡 বাস্তব উদাহরণ
                  </button>
                </div>

                {/* CUSTOM PROMPT INPUT BAR */}
                <form 
                  onSubmit={handleCustomPromptSubmit}
                  style={{ 
                    display: 'flex', 
                    gap: '8px', 
                    alignItems: 'center', 
                    background: 'var(--rose-50)', 
                    border: '1px solid var(--rose-300)',
                    padding: '6px 8px',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <input
                    type="text"
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    placeholder="এই টপিকে আপনার মতো করে উত্তর পরিবর্তন করতে প্রম্পট লিখুন (যেমন: 'আরেকটি উদাহরণ দিন')..."
                    disabled={isLoading}
                    style={{
                      flex: 1,
                      border: 'none',
                      background: 'transparent',
                      padding: '8px 12px',
                      fontSize: '0.85rem',
                      color: 'var(--text-ink)',
                      outline: 'none'
                    }}
                  />
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-sm"
                    disabled={!promptInput.trim() || isLoading}
                    style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <span>পাঠান</span>
                    <Send size={13} />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
