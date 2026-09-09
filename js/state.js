/* ==========================================================================
   STATE.JS - User Progress, Gamification, and LocalStorage State Manager
   ========================================================================== */

class AppStateManager {
  constructor() {
    this.STORAGE_KEY = "TISHA_EXAM_MASTERY_STATE_V1";
    this.state = this.loadState();
  }

  getDefaultState() {
    return {
      xp: 420,
      streak: 3,
      targetDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000).toISOString(),
      activeSubject: "ICT",
      horizontalMode: false,
      theme: "light",
      completedTopics: ["ict-u1-t1", "econ-t1-c1"],
      bookmarkedTopics: ["ict-u7-t1", "econ-t2-c1"],
      activeRecallScores: {},
      dailyMissions: [
        { id: "m1", text: "Learn 3 new concepts", completed: true, xp: 100 },
        { id: "m2", text: "Revise 5 weak concepts", completed: false, xp: 100 },
        { id: "m3", text: "Complete 20 MCQs", completed: true, xp: 120 },
        { id: "m4", text: "Write 2 exam answers in Writing Trainer", completed: true, xp: 100 },
        { id: "m5", text: "Complete 1 timed mini-test in Exam Simulator", completed: false, xp: 150 }
      ],
      mistakes: [
        {
          id: "mst-1",
          subject: "ICT",
          unit: "Unit 7",
          topicTitle: "OSI Reference Model",
          question: "Which layer of the OSI model handles logical addressing?",
          studentAnswer: "Data Link Layer",
          correctAnswer: "Network Layer",
          whyWrong: "Confused Layer 2 physical MAC framing with Layer 3 logical IP routing.",
          correctConcept: "Layer 3 (Network) manages IP addresses and routers; Layer 2 (Data Link) manages MAC addresses and switches.",
          date: new Date().toLocaleDateString(),
          resolved: false
        },
        {
          id: "mst-2",
          subject: "Economics",
          unit: "Topic 6",
          topicTitle: "Macroeconomics & GDP",
          question: "How is Double Counting resolved in National Income calculation?",
          studentAnswer: "By adding intermediate goods together with final goods.",
          correctAnswer: "By counting only final goods or summing the Value Added at each stage.",
          whyWrong: "Adding intermediate goods is the definition of double counting, not the solution.",
          correctConcept: "Double counting is prevented by either taking the final retail price or summing (Value of Output - Intermediate Consumption).",
          date: new Date().toLocaleDateString(),
          resolved: false
        }
      ],
      flashcardsSRS: {},
      badges: [
        { id: "b_first", name: "First Concept", icon: "🌱", unlocked: true, desc: "Began your journey to 100/100" },
        { id: "b_10", name: "10 Concepts", icon: "🥉", unlocked: true, desc: "Mastered 10 exam syllabus concepts" },
        { id: "b_50", name: "50 Concepts", icon: "🥈", unlocked: false, desc: "Completed 50 concepts in depth" },
        { id: "b_streak7", name: "7-Day Streak", icon: "🔥", unlocked: false, desc: "Maintained a 7-day study consistency" },
        { id: "b_master", name: "Concept Master", icon: "🧠", unlocked: false, desc: "Scored 100% in 5 Active Recalls" },
        { id: "b_recall", name: "Fast Recall", icon: "⚡", unlocked: true, desc: "Passed rapid recall without books" },
        { id: "b_mock90", name: "90+ Mock Score", icon: "🏆", unlocked: false, desc: "Scored 90%+ in a simulated mock exam" },
        { id: "b_perfect", name: "100/100 Master", icon: "👑", unlocked: false, desc: "Full exam readiness achieved" }
      ]
    };
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        return { ...this.getDefaultState(), ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Could not load state from localStorage:", e);
    }
    return this.getDefaultState();
  }

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Could not save state to localStorage:", e);
    }
    this.triggerListeners();
  }

  addXP(amount, reason = "") {
    this.state.xp += amount;
    this.checkBadges();
    this.save();
    return this.state.xp;
  }

  getLevelInfo() {
    const xp = this.state.xp;
    const level = Math.floor(xp / 300) + 1;
    const nextLevelXP = level * 300;
    const progressXP = xp % 300;
    const ranks = [
      "Novice Learner",
      "Diligent Scholar",
      "Concept Explorer",
      "Exam Candidate",
      "Subject Specialist",
      "High Achiever",
      "Honors Master",
      "Academic Elite",
      "100/100 Grandmaster"
    ];
    const rankTitle = ranks[Math.min(level - 1, ranks.length - 1)];
    return { level, xp, nextLevelXP, progressXP, rankTitle };
  }

  toggleTopicComplete(topicId) {
    const idx = this.state.completedTopics.indexOf(topicId);
    if (idx > -1) {
      this.state.completedTopics.splice(idx, 1);
    } else {
      this.state.completedTopics.push(topicId);
      this.addXP(40, "Concept completed");
    }
    this.save();
    return this.state.completedTopics.includes(topicId);
  }

  isTopicCompleted(topicId) {
    return this.state.completedTopics.includes(topicId);
  }

  toggleBookmark(topicId) {
    const idx = this.state.bookmarkedTopics.indexOf(topicId);
    if (idx > -1) {
      this.state.bookmarkedTopics.splice(idx, 1);
    } else {
      this.state.bookmarkedTopics.push(topicId);
    }
    this.save();
    return this.state.bookmarkedTopics.includes(topicId);
  }

  isTopicBookmarked(topicId) {
    return this.state.bookmarkedTopics.includes(topicId);
  }

  logMistake(mistakeObj) {
    const entry = {
      id: "mst-" + Date.now(),
      date: new Date().toLocaleDateString(),
      resolved: false,
      ...mistakeObj
    };
    this.state.mistakes.unshift(entry);
    this.save();
    return entry;
  }

  resolveMistake(mistakeId) {
    const mst = this.state.mistakes.find(m => m.id === mistakeId);
    if (mst) {
      mst.resolved = true;
      this.addXP(25, "Mistake revised & resolved");
      this.save();
    }
  }

  updateFlashcardSRS(cardId, rating) {
    // rating: 'again', 'hard', 'good', 'easy'
    const current = this.state.flashcardsSRS[cardId] || { interval: 1, ease: 2.5, reviews: 0 };
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

    this.state.flashcardsSRS[cardId] = { interval, ease, reviews, lastReviewed: Date.now() };
    this.addXP(15, "Flashcard recalled");
    this.save();
  }

  checkBadges() {
    if (this.state.completedTopics.length >= 1) {
      this.unlockBadge("b_first");
    }
    if (this.state.completedTopics.length >= 10) {
      this.unlockBadge("b_10");
    }
    if (this.state.completedTopics.length >= 50) {
      this.unlockBadge("b_50");
    }
    if (this.state.streak >= 7) {
      this.unlockBadge("b_streak7");
    }
  }

  unlockBadge(badgeId) {
    const badge = this.state.badges.find(b => b.id === badgeId);
    if (badge && !badge.unlocked) {
      badge.unlocked = true;
      this.addXP(100, `Badge Unlocked: ${badge.name}`);
    }
  }

  calculateMastery() {
    // ICT has 8 main topics, Economics has 10
    const totalICT = 8;
    const totalEcon = 10;
    const completedICT = this.state.completedTopics.filter(id => id.startsWith("ict-")).length;
    const completedEcon = this.state.completedTopics.filter(id => id.startsWith("econ-")).length;

    const ictMastery = Math.min(100, Math.round((completedICT / totalICT) * 100)) || 72;
    const econMastery = Math.min(100, Math.round((completedEcon / totalEcon) * 100)) || 61;
    const overallMastery = Math.round((ictMastery + econMastery) / 2);

    return { ictMastery, econMastery, overallMastery, completedICT, completedEcon, totalICT, totalEcon };
  }

  onStateChange(callback) {
    if (!this.listeners) this.listeners = [];
    this.listeners.push(callback);
  }

  triggerListeners() {
    if (this.listeners) {
      this.listeners.forEach(cb => cb(this.state));
    }
  }
}

window.appState = new AppStateManager();
