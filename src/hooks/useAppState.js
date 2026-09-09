import { useState, useEffect, useCallback } from 'react';
import { ICT_SYLLABUS } from '../data/ictData';
import { ECONOMICS_SYLLABUS } from '../data/economicsData';

const STORAGE_KEY = "TISHA_BOOK_EXAM_MASTERY_STATE_V2";

// Total counts
const TOTAL_ICT_TOPICS = ICT_SYLLABUS.reduce((acc, u) => acc + u.topics.length, 0);
const TOTAL_ECON_TOPICS = ECONOMICS_SYLLABUS.reduce((acc, t) => acc + t.concepts.length, 0);
const TOTAL_TOPICS = TOTAL_ICT_TOPICS + TOTAL_ECON_TOPICS;

// Clean initial state with ZERO fake progress
const INITIAL_CLEAN_STATE = {
  xp: 0,
  streak: 1,
  theme: 'light',
  currentPage: 1, // Start on Cover / Page 1
  completedTopics: [], // Empty initially - zero fake progress!
  bookmarkedTopics: [],
  quizHistory: {}, // { [qId]: { attempted: true, correct: boolean, choice: number } }
  recallHistory: {}, // { [topicId]: { rating: 'Correct' | 'Partially Correct' | 'Needs Revision', text: string } }
  essayHistory: {}, // { [essayId]: { score: number, text: string, date: string } }
  mistakes: [], // Empty initially - only logs real student errors
  flashcardsSRS: {},
  notes: {}, // User personal margin notes per topic
  lastStudyDate: new Date().toISOString().split('T')[0]
};

export function useAppState() {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_CLEAN_STATE, ...parsed };
      }
    } catch (e) {
      console.warn("Could not load state from localStorage:", e);
    }
    return INITIAL_CLEAN_STATE;
  });

  // Persist state to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Could not save state to localStorage:", e);
    }
  }, [state]);

  const addXP = useCallback((amount) => {
    setState(prev => ({ ...prev, xp: prev.xp + amount }));
  }, []);

  const setCurrentPage = useCallback((pageNum) => {
    setState(prev => ({ ...prev, currentPage: pageNum }));
  }, []);

  const toggleTopicComplete = useCallback((topicId) => {
    setState(prev => {
      const exists = prev.completedTopics.includes(topicId);
      const updated = exists
        ? prev.completedTopics.filter(id => id !== topicId)
        : [...prev.completedTopics, topicId];
      const xpDelta = exists ? -40 : 40;
      return {
        ...prev,
        completedTopics: updated,
        xp: Math.max(0, prev.xp + xpDelta)
      };
    });
  }, []);

  const toggleBookmark = useCallback((topicId) => {
    setState(prev => {
      const exists = prev.bookmarkedTopics.includes(topicId);
      const updated = exists
        ? prev.bookmarkedTopics.filter(id => id !== topicId)
        : [...prev.bookmarkedTopics, topicId];
      return { ...prev, bookmarkedTopics: updated };
    });
  }, []);

  const recordQuizAttempt = useCallback((qId, choiceIdx, isCorrect, questionObj) => {
    setState(prev => {
      const newHistory = {
        ...prev.quizHistory,
        [qId]: { attempted: true, correct: isCorrect, choice: choiceIdx }
      };

      const xpAdd = isCorrect ? 20 : 5;
      let newMistakes = [...prev.mistakes];

      if (!isCorrect) {
        // Log to mistake notebook if not already logged
        const existingIdx = newMistakes.findIndex(m => m.id === qId);
        const mistakeEntry = {
          id: qId,
          subject: questionObj.subject || "Syllabus",
          unit: questionObj.unit || "Chapter",
          question: questionObj.question,
          studentAnswer: questionObj.options ? questionObj.options[choiceIdx] : "Incorrect selection",
          correctAnswer: questionObj.options ? questionObj.options[questionObj.correct] : "See explanation",
          whyWrong: "Selected incorrect option in checkpoint quiz.",
          correctConcept: questionObj.explanation || "Review chapter notes.",
          date: new Date().toLocaleDateString(),
          resolved: false
        };

        if (existingIdx > -1) {
          newMistakes[existingIdx] = mistakeEntry;
        } else {
          newMistakes.unshift(mistakeEntry);
        }
      }

      return {
        ...prev,
        xp: prev.xp + xpAdd,
        quizHistory: newHistory,
        mistakes: newMistakes
      };
    });
  }, []);

  const recordRecallAttempt = useCallback((topicId, rating, studentText, idealAnswer, subject, unit, title) => {
    setState(prev => {
      const newRecall = {
        ...prev.recallHistory,
        [topicId]: { rating, text: studentText, date: new Date().toLocaleDateString() }
      };

      let newMistakes = [...prev.mistakes];
      if (rating === "Needs Revision") {
        newMistakes.unshift({
          id: `recall-${topicId}-${Date.now()}`,
          subject,
          unit,
          topicTitle: title,
          question: `Recall: ${title}`,
          studentAnswer: studentText || "Struggled with recall",
          correctAnswer: idealAnswer || "See chapter text",
          whyWrong: "Active recall required review.",
          correctConcept: "Review core definitions and key formulas.",
          date: new Date().toLocaleDateString(),
          resolved: false
        });
      }

      return {
        ...prev,
        xp: prev.xp + (rating === "Correct" ? 30 : 15),
        recallHistory: newRecall,
        mistakes: newMistakes
      };
    });
  }, []);

  const recordEssayAttempt = useCallback((promptId, score, text) => {
    setState(prev => ({
      ...prev,
      xp: prev.xp + Math.round(score * 0.5),
      essayHistory: {
        ...prev.essayHistory,
        [promptId]: { score, text, date: new Date().toLocaleDateString() }
      }
    }));
  }, []);

  const resolveMistake = useCallback((mistakeId) => {
    setState(prev => ({
      ...prev,
      xp: prev.xp + 25,
      mistakes: prev.mistakes.map(m => m.id === mistakeId ? { ...m, resolved: true } : m)
    }));
  }, []);

  const updateFlashcardSRS = useCallback((cardId, rating) => {
    setState(prev => {
      const current = prev.flashcardsSRS[cardId] || { interval: 1, ease: 2.5, reviews: 0 };
      let { interval, ease, reviews } = current;
      reviews += 1;

      if (rating === 'again') {
        interval = 1;
        ease = Math.max(1.3, ease - 0.2);
      } else if (rating === 'hard') {
        interval = Math.max(1, Math.round(interval * 1.2));
        ease = Math.max(1.3, ease - 0.15);
      } else if (rating === 'good') {
        interval = Math.round(interval * ease);
      } else if (rating === 'easy') {
        interval = Math.round(interval * ease * 1.3);
        ease += 0.15;
      }

      return {
        ...prev,
        xp: prev.xp + 15,
        flashcardsSRS: {
          ...prev.flashcardsSRS,
          [cardId]: { interval, ease, reviews, lastReviewed: Date.now() }
        }
      };
    });
  }, []);

  const saveMarginNote = useCallback((topicId, noteText) => {
    setState(prev => ({
      ...prev,
      notes: { ...prev.notes, [topicId]: noteText }
    }));
  }, []);

  const toggleTheme = useCallback(() => {
    setState(prev => {
      const next = prev.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      return { ...prev, theme: next };
    });
  }, []);

  const resetAllProgress = useCallback(() => {
    if (confirm("Are you sure you want to reset all your reading progress and quiz history to 0%?")) {
      setState(INITIAL_CLEAN_STATE);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // -------------------------------------------------------------
  // DYNAMIC METRICS CALCULATION (100% genuine from user interactions)
  // -------------------------------------------------------------
  const completedICTCount = state.completedTopics.filter(id => id.startsWith("ict-")).length;
  const completedEconCount = state.completedTopics.filter(id => id.startsWith("econ-")).length;
  const completedTotalCount = state.completedTopics.length;

  const ictProgressPct = TOTAL_ICT_TOPICS > 0 ? Math.round((completedICTCount / TOTAL_ICT_TOPICS) * 100) : 0;
  const econProgressPct = TOTAL_ECON_TOPICS > 0 ? Math.round((completedEconCount / TOTAL_ECON_TOPICS) * 100) : 0;
  const overallProgressPct = TOTAL_TOPICS > 0 ? Math.round((completedTotalCount / TOTAL_TOPICS) * 100) : 0;

  const quizAttempts = Object.values(state.quizHistory);
  const totalQuizzesAttempted = quizAttempts.length;
  const totalQuizzesCorrect = quizAttempts.filter(q => q.correct).length;
  const quizAccuracyPct = totalQuizzesAttempted > 0 ? Math.round((totalQuizzesCorrect / totalQuizzesAttempted) * 100) : 0;

  const level = Math.floor(state.xp / 250) + 1;
  const nextLevelXP = level * 250;
  const progressXP = state.xp % 250;

  return {
    state,
    addXP,
    setCurrentPage,
    toggleTopicComplete,
    toggleBookmark,
    recordQuizAttempt,
    recordRecallAttempt,
    recordEssayAttempt,
    resolveMistake,
    updateFlashcardSRS,
    saveMarginNote,
    toggleTheme,
    resetAllProgress,
    metrics: {
      completedICTCount,
      totalICTTopics: TOTAL_ICT_TOPICS,
      ictProgressPct,

      completedEconCount,
      totalEconTopics: TOTAL_ECON_TOPICS,
      econProgressPct,

      completedTotalCount,
      totalTopics: TOTAL_TOPICS,
      overallProgressPct,

      totalQuizzesAttempted,
      totalQuizzesCorrect,
      quizAccuracyPct,

      unresolvedMistakesCount: state.mistakes.filter(m => !m.resolved).length,
      level,
      nextLevelXP,
      progressXP
    }
  };
}
