/* ==========================================================================
   EXAM-ENGINE.JS - Realistic Timed Exam Simulator & 100/100 Readiness Evaluator
   Supports mixed MCQs, short definitions, difference questions, scenarios,
   and calculates multi-factor Exam Readiness %.
   ========================================================================== */

class ExamEngine {
  constructor() {
    this.timerInterval = null;
    this.secondsRemaining = 600; // 10 minutes default
    this.currentQuestionIndex = 0;
    this.isExamActive = false;
    this.userAnswers = {};
    this.questions = [];
    this.mode = "standard"; // 'standard' or '100_100'
  }

  generateExamQuestions(is100Mode = false) {
    this.mode = is100Mode ? "100_100" : "standard";
    const qList = [];

    // ICT questions
    window.ICT_SYLLABUS.forEach(unit => {
      unit.topics.forEach(t => {
        if (t.mcqs && t.mcqs[0]) {
          qList.push({
            id: `q-${t.id}`,
            subject: "ICT",
            unit: unit.unitTitle,
            type: "MCQ",
            question: t.mcqs[0].question,
            options: t.mcqs[0].options,
            correct: t.mcqs[0].correct,
            explanation: t.mcqs[0].explanation,
            difficulty: t.mcqs[0].difficulty
          });
        }
      });
    });

    // Economics questions
    window.ECONOMICS_SYLLABUS.forEach(topic => {
      topic.concepts.forEach(c => {
        if (c.mcqs && c.mcqs[0]) {
          qList.push({
            id: `q-${c.id}`,
            subject: "Economics",
            unit: topic.title,
            type: "MCQ",
            question: c.mcqs[0].question,
            options: c.mcqs[0].options,
            correct: c.mcqs[0].correct,
            explanation: c.mcqs[0].explanation,
            difficulty: c.mcqs[0].difficulty
          });
        }
      });
    });

    // Shuffle and pick 10 questions for rapid simulation
    const shuffled = [...qList].sort(() => 0.5 - Math.random());
    this.questions = shuffled.slice(0, is100Mode ? 12 : 8);
    this.secondsRemaining = is100Mode ? 900 : 600; // 15 mins for 100/100 mode, 10 mins for standard
    this.currentQuestionIndex = 0;
    this.userAnswers = {};
    this.isExamActive = true;
  }

  renderExam(containerId, is100Mode = false) {
    const el = document.getElementById(containerId);
    if (!el) return;

    if (!this.isExamActive) {
      this.generateExamQuestions(is100Mode);
      this.startTimer();
    }

    const q = this.questions[this.currentQuestionIndex];
    const total = this.questions.length;
    const progressPct = Math.round(((this.currentQuestionIndex + 1) / total) * 100);

    el.innerHTML = `
      <div class="glass-panel" style="padding:28px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px; border-bottom:1px solid var(--border-subtle); padding-bottom:14px;">
          <div>
            <span style="font-size:0.75rem; font-weight:700; background:${is100Mode ? 'var(--grad-rose-button)' : 'var(--rose-100)'}; color:${is100Mode ? '#fff' : 'var(--rose-900)'}; padding:4px 12px; border-radius:var(--radius-full); text-transform:uppercase;">
              ${is100Mode ? '👑 100/100 Master Exam Challenge' : '⏱ Standard Timed Mock Exam'}
            </span>
            <h3 style="font-size:1.3rem; font-weight:800; color:var(--text-primary); margin-top:6px;">
              Question ${this.currentQuestionIndex + 1} of ${total}
            </h3>
          </div>

          <div style="display:flex; align-items:center; gap:16px;">
            <div style="font-size:1.15rem; font-weight:800; color:var(--rose-700); background:var(--rose-100); padding:6px 16px; border-radius:var(--radius-full); border:1px solid var(--border-warm);" id="exam-timer-display">
              ⏳ 10:00
            </div>
            <button class="btn btn-outline-rose btn-sm" id="btn-abandon-exam">Exit Exam</button>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="progress-bar-track" style="margin-bottom:24px;">
          <div class="progress-bar-fill" style="width:${progressPct}%;"></div>
        </div>

        <div style="background:var(--bg-main); padding:20px; border-radius:var(--radius-md); border:1px solid var(--border-subtle); margin-bottom:24px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--rose-700);">${q.subject} • ${q.unit}</span>
            <span style="font-size:0.75rem; font-weight:600; color:var(--text-muted);">Difficulty: ${q.difficulty}</span>
          </div>
          <p style="font-size:1.1rem; font-weight:700; color:var(--text-primary); line-height:1.5;">
            ${q.question}
          </p>
        </div>

        <!-- Options -->
        <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:28px;" id="exam-options-container">
          ${q.options.map((opt, i) => {
            const isSelected = this.userAnswers[this.currentQuestionIndex] === i;
            return `
              <button class="mcq-option-btn exam-opt-btn ${isSelected ? 'selected' : ''}" data-opt-index="${i}" style="${isSelected ? 'background:var(--rose-100); border-color:var(--rose-500); font-weight:700;' : ''}">
                <span style="font-weight:800; color:var(--rose-700); width:24px;">${String.fromCharCode(65 + i)}.</span>
                <span>${opt}</span>
              </button>
            `;
          }).join("")}
        </div>

        <!-- Exam Controls -->
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <button class="btn btn-secondary" id="btn-exam-prev" ${this.currentQuestionIndex === 0 ? 'disabled' : ''}>
            ◀ Previous
          </button>
          ${this.currentQuestionIndex === total - 1 ? `
            <button class="btn btn-primary" id="btn-submit-exam" style="background:linear-gradient(135deg, #059669, #10b981);">
              ✅ Finish & Submit Exam
            </button>
          ` : `
            <button class="btn btn-primary" id="btn-exam-next">
              Next Question ▶
            </button>
          `}
        </div>
      </div>
    `;

    this.updateTimerDisplay();

    // Event Binders
    const optBtns = el.querySelectorAll(".exam-opt-btn");
    optBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.optIndex);
        this.userAnswers[this.currentQuestionIndex] = idx;
        window.soundApp.playChime("click");
        this.renderExam(containerId, is100Mode);
      });
    });

    const prevBtn = el.querySelector("#btn-exam-prev");
    const nextBtn = el.querySelector("#btn-exam-next");
    const submitBtn = el.querySelector("#btn-submit-exam");
    const exitBtn = el.querySelector("#btn-abandon-exam");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (this.currentQuestionIndex > 0) {
          this.currentQuestionIndex--;
          this.renderExam(containerId, is100Mode);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (this.currentQuestionIndex < total - 1) {
          this.currentQuestionIndex++;
          this.renderExam(containerId, is100Mode);
        }
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        this.finishExam(containerId);
      });
    }

    if (exitBtn) {
      exitBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to exit the exam? Your progress will be discarded.")) {
          this.stopTimer();
          this.isExamActive = false;
          window.appCoordinator.switchView("dashboard");
        }
      });
    }
  }

  startTimer() {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      this.secondsRemaining--;
      this.updateTimerDisplay();
      if (this.secondsRemaining <= 0) {
        this.stopTimer();
        alert("Time is up! Your exam will now be automatically submitted.");
        const container = this.mode === "100_100" ? "hundred-mode-view" : "exam-simulator-view";
        this.finishExam(container);
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  updateTimerDisplay() {
    const timerEl = document.getElementById("exam-timer-display");
    if (!timerEl) return;
    const mins = Math.floor(this.secondsRemaining / 60);
    const secs = this.secondsRemaining % 60;
    timerEl.textContent = `⏳ ${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    if (this.secondsRemaining < 120) {
      timerEl.style.color = "#dc2626";
      timerEl.style.borderColor = "#f87171";
    }
  }

  finishExam(containerId) {
    this.stopTimer();
    this.isExamActive = false;

    let correctCount = 0;
    const strongAreas = new Set();
    const weakAreas = new Set();
    const revisionRecommendations = [];

    this.questions.forEach((q, i) => {
      const userChoice = this.userAnswers[i];
      if (userChoice === q.correct) {
        correctCount++;
        strongAreas.add(q.unit);
      } else {
        weakAreas.add(q.unit);
        revisionRecommendations.push({
          unit: q.unit,
          subject: q.subject,
          concept: q.question
        });

        // Automatically log to Mistake Notebook
        window.appState.logMistake({
          subject: q.subject,
          unit: q.unit,
          topicTitle: q.question,
          question: q.question,
          studentAnswer: userChoice !== undefined ? q.options[userChoice] : "No answer submitted",
          correctAnswer: q.options[q.correct],
          whyWrong: "Selected incorrect distractor under exam timing.",
          correctConcept: q.explanation
        });
      }
    });

    const scorePct = Math.round((correctCount / this.questions.length) * 100);
    let grade = "F";
    if (scorePct >= 90) grade = "A+";
    else if (scorePct >= 80) grade = "A";
    else if (scorePct >= 70) grade = "B+";
    else if (scorePct >= 60) grade = "B";
    else if (scorePct >= 50) grade = "C";

    // Readiness formula for 100/100 Mode
    const masteryData = window.appState.calculateMastery();
    const readinessPct = Math.min(100, Math.round(
      (masteryData.overallMastery * 0.35) +
      (scorePct * 0.45) +
      (window.appState.state.streak >= 3 ? 10 : 5) +
      (this.secondsRemaining > 60 ? 10 : 5)
    ));

    window.appState.addXP(scorePct * 2, "Mock exam completed");
    if (scorePct >= 90) {
      window.appState.unlockBadge("b_mock90");
      window.soundApp.playChime("success");
    }

    const el = document.getElementById(containerId);
    if (!el) return;

    el.innerHTML = `
      <div class="glass-panel" style="padding:32px; max-width:800px; margin:0 auto;">
        <div style="text-align:center; margin-bottom:24px;">
          <span style="font-size:3rem; display:block; margin-bottom:6px;">${scorePct >= 80 ? '🏆' : '📚'}</span>
          <h2 style="font-size:1.8rem; font-weight:900; color:var(--text-primary);">Exam Evaluation Report</h2>
          <p style="font-size:0.9rem; color:var(--text-muted);">Comprehensive scorecard and recommended revision path for 100/100</p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:16px; margin-bottom:28px;">
          <div style="background:var(--bg-main); padding:16px; border-radius:var(--radius-md); text-align:center; border:1px solid var(--border-warm);">
            <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Score</span>
            <div style="font-size:2rem; font-weight:900; color:var(--rose-700);">${scorePct} / 100</div>
          </div>
          <div style="background:var(--bg-main); padding:16px; border-radius:var(--radius-md); text-align:center; border:1px solid var(--border-warm);">
            <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Letter Grade</span>
            <div style="font-size:2rem; font-weight:900; color:var(--warm-emerald);">${grade}</div>
          </div>
          <div style="background:var(--bg-main); padding:16px; border-radius:var(--radius-md); text-align:center; border:1px solid var(--border-warm);">
            <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">100/100 Readiness</span>
            <div style="font-size:2rem; font-weight:900; color:var(--rose-900);">${readinessPct}%</div>
          </div>
        </div>

        <!-- Strong & Weak Areas -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px;">
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:var(--radius-md); padding:16px;">
            <h4 style="font-size:0.95rem; font-weight:800; color:#065f46; margin-bottom:10px;">💪 STRONG AREAS</h4>
            <ul style="padding-left:18px; font-size:0.88rem; color:#065f46;">
              ${Array.from(strongAreas).map(a => `<li>${a}</li>`).join("") || "<li>Complete more questions to build strong areas.</li>"}
            </ul>
          </div>

          <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:var(--radius-md); padding:16px;">
            <h4 style="font-size:0.95rem; font-weight:800; color:#991b1b; margin-bottom:10px;">⚠️ WEAK AREAS (LOGGED TO MISTAKES)</h4>
            <ul style="padding-left:18px; font-size:0.88rem; color:#991b1b;">
              ${Array.from(weakAreas).map(a => `<li>${a}</li>`).join("") || "<li>No weak areas detected! Excellent precision.</li>"}
            </ul>
          </div>
        </div>

        <!-- Actionable Revision Checklist -->
        <div style="background:var(--bg-main); border:1px solid var(--border-warm); border-radius:var(--radius-md); padding:20px; margin-bottom:24px;">
          <h4 style="font-size:0.95rem; font-weight:800; color:var(--rose-900); margin-bottom:12px;">
            📌 HIGH-PRIORITY REVISION TARGETS BEFORE NEXT EXAM:
          </h4>
          <div style="display:flex; flex-direction:column; gap:8px;">
            ${revisionRecommendations.slice(0, 4).map(r => `
              <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; background:var(--bg-surface); border-radius:var(--radius-sm); border:1px solid var(--border-subtle); font-size:0.85rem;">
                <span><strong>${r.subject} (${r.unit}):</strong> Review concept nuances</span>
                <span style="color:var(--rose-700); font-weight:700;">Needs Revision</span>
              </div>
            `).join("") || '<p style="font-size:0.88rem; color:var(--warm-emerald);">You have achieved mastery across all tested units!</p>'}
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:12px;">
          <button class="btn btn-primary" id="btn-retake-exam">🔄 Retake Another Exam</button>
          <button class="btn btn-secondary" id="btn-view-mistakes-now">📖 View Mistake Notebook</button>
        </div>
      </div>
    `;

    el.querySelector("#btn-retake-exam").addEventListener("click", () => {
      this.generateExamQuestions(this.mode === "100_100");
      this.renderExam(containerId, this.mode === "100_100");
    });

    el.querySelector("#btn-view-mistakes-now").addEventListener("click", () => {
      window.appCoordinator.switchView("mistakes");
    });
  }
}

window.examSimulator = new ExamEngine();
