/* ==========================================================================
   APP.JS - Master Application Coordinator & View Controller
   Binds all views, interactive tools, horizontal deck transitions,
   gamification, and subject syllabi (ICT & Economics).
   ========================================================================== */

class AppCoordinator {
  constructor() {
    this.currentView = "dashboard";
    this.activeConcept = null;
    this.simplerModeActive = false;
  }

  init() {
    this.bindGlobalNavigation();
    this.bindHeaderActions();
    this.bindMotivationalBanner();
    this.updateHeaderStats();

    // Listen to state changes
    window.appState.onStateChange(() => {
      this.updateHeaderStats();
    });

    // Initialize horizontal deck controller
    window.deckController.init();

    // Default view
    this.switchView("dashboard");
  }

  // -------------------------------------------------------------
  // HEADER STATS & BANNER
  // -------------------------------------------------------------
  updateHeaderStats() {
    const mastery = window.appState.calculateMastery();
    const lvlInfo = window.appState.getLevelInfo();

    const overallEl = document.getElementById("header-overall-mastery");
    if (overallEl) overallEl.textContent = `${mastery.overallMastery}%`;

    const ictEl = document.getElementById("header-ict-mastery");
    if (ictEl) ictEl.textContent = `${mastery.ictMastery}%`;

    const econEl = document.getElementById("header-econ-mastery");
    if (econEl) econEl.textContent = `${mastery.econMastery}%`;

    const xpEl = document.getElementById("header-user-xp");
    if (xpEl) xpEl.textContent = `${window.appState.state.xp} XP`;

    const streakEl = document.getElementById("header-streak-count");
    if (streakEl) streakEl.textContent = `${window.appState.state.streak} Days`;

    const rankEl = document.getElementById("user-rank-display");
    if (rankEl) rankEl.textContent = lvlInfo.rankTitle;

    const userXpSub = document.getElementById("user-xp-sub");
    if (userXpSub) userXpSub.textContent = `Level ${lvlInfo.level} • ${lvlInfo.progressXP} / 300 XP`;
  }

  bindMotivationalBanner() {
    const quoteText = document.getElementById("motivation-quote-text");
    const refreshBtn = document.getElementById("btn-refresh-quote");
    const quotes = window.INTERACTIVE_DATA.motivationalQuotes;

    const cycleQuote = () => {
      const q = quotes[Math.floor(Math.random() * quotes.length)];
      if (quoteText) {
        quoteText.style.opacity = "0";
        setTimeout(() => {
          quoteText.textContent = `“${q.text}” — ${q.author}`;
          quoteText.style.opacity = "1";
        }, 200);
      }
    };

    if (refreshBtn) refreshBtn.addEventListener("click", cycleQuote);
    cycleQuote();
  }

  bindHeaderActions() {
    // Theme toggle (Light Warm Rose <-> Dark Warm Rose)
    const themeBtn = document.getElementById("btn-theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        themeBtn.textContent = next === "dark" ? "☀️" : "🌙";
        window.soundApp.playChime("click");
      });
    }

    // Horizontal Page Changing Mode Toggle Button
    const horizontalToggle = document.getElementById("btn-toggle-horizontal-mode");
    if (horizontalToggle) {
      horizontalToggle.addEventListener("click", () => {
        const isCurrentlyActive = document.body.classList.contains("horizontal-mode-active");
        if (isCurrentlyActive) {
          document.body.classList.remove("horizontal-mode-active");
          horizontalToggle.classList.remove("active");
          horizontalToggle.innerHTML = "↔️ Horizontal Deck Mode";
          this.switchView(this.currentView);
        } else {
          document.body.classList.add("horizontal-mode-active");
          horizontalToggle.classList.add("active");
          horizontalToggle.innerHTML = "📋 Standard Vertical View";
          this.launchHorizontalDeckMode();
        }
        window.soundApp.playChime("click");
      });
    }

    // Mobile menu drawer
    const menuBtn = document.getElementById("btn-mobile-menu");
    const sidebar = document.querySelector(".sidebar");
    if (menuBtn && sidebar) {
      menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
      });
    }
  }

  bindGlobalNavigation() {
    const navItems = document.querySelectorAll(".nav-item, .nav-sub-item");
    navItems.forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const view = item.dataset.view;
        if (view) {
          // If in horizontal mode, return to vertical view when navigating
          if (document.body.classList.contains("horizontal-mode-active")) {
            document.body.classList.remove("horizontal-mode-active");
            const btn = document.getElementById("btn-toggle-horizontal-mode");
            if (btn) {
              btn.classList.remove("active");
              btn.innerHTML = "↔️ Horizontal Deck Mode";
            }
          }

          navItems.forEach(n => n.classList.remove("active"));
          item.classList.add("active");

          const sidebar = document.querySelector(".sidebar");
          if (sidebar && window.innerWidth <= 1024) {
            sidebar.classList.remove("open");
          }

          this.switchView(view);
          window.soundApp.playChime("click");
        }
      });
    });
  }

  // -------------------------------------------------------------
  // VIEW SWITCHING LOGIC
  // -------------------------------------------------------------
  switchView(viewName, params = {}) {
    this.currentView = viewName;
    const views = document.querySelectorAll(".view-section");
    views.forEach(v => v.classList.remove("active"));

    const target = document.getElementById(`view-${viewName}`);
    if (target) {
      target.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    switch (viewName) {
      case "dashboard":
        this.renderDashboard();
        break;
      case "ict":
        this.renderICTOverview();
        break;
      case "economics":
        this.renderEconomicsOverview();
        break;
      case "learn":
        this.renderConceptLearning(params.topicId || "ict-u7-t1");
        break;
      case "revision":
        this.renderSpacedRevision();
        break;
      case "flashcards":
        this.renderFlashcards();
        break;
      case "mcq":
        this.renderMCQPractice();
        break;
      case "writing":
        window.writingTrainer.render("writing-trainer-container");
        break;
      case "exam":
        window.examSimulator.renderExam("exam-simulator-view", false);
        break;
      case "hundred":
        window.examSimulator.renderExam("hundred-mode-view", true);
        break;
      case "mistakes":
        this.renderMistakeNotebook();
        break;
      case "differences":
        this.renderDifferenceTables();
        break;
      case "settings":
        this.renderSettings();
        break;
    }
  }

  // -------------------------------------------------------------
  // 1. DASHBOARD VIEW
  // -------------------------------------------------------------
  renderDashboard() {
    const container = document.getElementById("view-dashboard");
    if (!container) return;

    const mastery = window.appState.calculateMastery();
    const missions = window.appState.state.dailyMissions;

    container.innerHTML = `
      <!-- Mission & Countdown Banner -->
      <div class="glass-panel" style="padding:28px; margin-bottom:28px; background:var(--grad-hero); border:1px solid var(--border-warm);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <span style="font-size:0.8rem; font-weight:800; text-transform:uppercase; letter-spacing:0.08em; color:var(--rose-700); background:var(--rose-100); padding:3px 12px; border-radius:var(--radius-full);">
              🎯 100/100 Exam Mission
            </span>
            <h2 style="font-size:1.8rem; font-weight:900; color:var(--text-primary); margin:8px 0 4px;">
              Understand deeply. Recall quickly. Write perfectly.
            </h2>
            <p style="font-size:0.92rem; color:var(--text-secondary);">
              Targeting 100/100 across both ICT & Economics. Active recall over passive reading.
            </p>
          </div>

          <div style="text-align:right;">
            <div style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Final Exam Countdown</div>
            <div style="font-size:1.6rem; font-weight:900; color:var(--rose-700);" id="dash-countdown-clock">
              6 DAYS 14 HOURS
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="dashboard-grid">
        <div class="glass-panel stat-card">
          <div class="stat-header">
            <span class="stat-title">Overall Mastery</span>
            <div class="stat-icon">🎯</div>
          </div>
          <div class="stat-value">${mastery.overallMastery}%</div>
          <div class="stat-footer">
            <span>Target: 100% Exam Grade</span>
          </div>
        </div>

        <div class="glass-panel stat-card">
          <div class="stat-header">
            <span class="stat-title">ICT Progress</span>
            <div class="stat-icon">💻</div>
          </div>
          <div class="stat-value">${mastery.ictMastery}%</div>
          <div class="stat-footer">
            <span>9 Syllabus Units</span>
          </div>
        </div>

        <div class="glass-panel stat-card">
          <div class="stat-header">
            <span class="stat-title">Economics Progress</span>
            <div class="stat-icon">📊</div>
          </div>
          <div class="stat-value">${mastery.econMastery}%</div>
          <div class="stat-footer">
            <span>10 Syllabus Topics</span>
          </div>
        </div>

        <div class="glass-panel stat-card">
          <div class="stat-header">
            <span class="stat-title">Mistakes Logged</span>
            <div class="stat-icon">📖</div>
          </div>
          <div class="stat-value">${window.appState.state.mistakes.filter(m => !m.resolved).length}</div>
          <div class="stat-footer">
            <span>Requires active revision</span>
          </div>
        </div>
      </div>

      <!-- Daily Mission System Box -->
      <div class="daily-mission-card">
        <div class="mission-header">
          <div class="mission-title">
            <span>📋</span> Today's Study Mission & Daily Goals
          </div>
          <span style="font-size:0.85rem; font-weight:700; color:var(--rose-700); background:var(--rose-100); padding:3px 12px; border-radius:var(--radius-full);">
            Today's XP: ${window.appState.state.xp} / 500 XP
          </span>
        </div>

        <ul class="mission-list" id="dash-mission-list">
          ${missions.map(m => `
            <li class="mission-item ${m.completed ? 'completed' : ''}">
              <input type="checkbox" class="mission-checkbox" data-mission-id="${m.id}" ${m.completed ? 'checked' : ''} />
              <span style="flex:1; font-weight:600;">${m.text}</span>
              <span style="font-size:0.8rem; font-weight:700; color:var(--rose-700);">+${m.xp} XP</span>
            </li>
          `).join("")}
        </ul>
      </div>

      <!-- Two Large Subject Selection Cards -->
      <div class="subjects-section-grid">
        <!-- ICT Card -->
        <div class="subject-card">
          <span class="subject-card-badge">💻 Subject 1</span>
          <h3 class="subject-title">ICT — Information & Communication Technology</h3>
          <p class="subject-desc">
            Computer hardware, operating systems, MS Word, Excel formulas, PowerPoint, cybersecurity, OSI 7-layer model, and AI/ML concepts.
          </p>
          <div class="subject-meta-row">
            <span>Mastery: ${mastery.ictMastery}%</span>
            <span>9 Core Units</span>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill" style="width:${mastery.ictMastery}%;"></div>
          </div>
          <button class="btn btn-primary" style="width:100%;" id="btn-goto-ict">
            Continue ICT Syllabus ❯
          </button>
        </div>

        <!-- Economics Card -->
        <div class="subject-card">
          <span class="subject-card-badge">📊 Subject 2</span>
          <h3 class="subject-title">Economics — Core Foundations & Macroeconomics</h3>
          <p class="subject-desc">
            Supply & demand curves, elasticity, consumer utility, production cost curves, perfect competition vs monopoly, GDP, trade, and public finance.
          </p>
          <div class="subject-meta-row">
            <span>Mastery: ${mastery.econMastery}%</span>
            <span>10 Extracted Topics</span>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill" style="width:${mastery.econMastery}%;"></div>
          </div>
          <button class="btn btn-primary" style="width:100%;" id="btn-goto-econ">
            Continue Economics Syllabus ❯
          </button>
        </div>
      </div>

      <!-- Quick Difference Tables Teaser -->
      <div class="glass-panel" style="padding:24px; margin-bottom:28px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-primary);">
            ⚖️ High-Yield Exam Difference Tables
          </h3>
          <button class="btn btn-secondary btn-sm" id="btn-view-all-diffs">View All Comparisons ❯</button>
        </div>
        <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:16px;">
          Master critical distinctions that examiners test in 5-mark and 10-mark questions:
        </p>
        <div style="display:flex; flex-wrap:wrap; gap:10px;" id="dash-diff-chips">
          ${window.DIFFERENCE_TABLES.slice(0, 6).map(d => `
            <button class="btn btn-secondary btn-sm quick-diff-btn" data-diff-id="${d.id}">
              ${d.title}
            </button>
          `).join("")}
        </div>
      </div>
    `;

    // Mission Checkbox Handlers
    container.querySelectorAll(".mission-checkbox").forEach(chk => {
      chk.addEventListener("change", (e) => {
        const id = e.target.dataset.missionId;
        const m = window.appState.state.dailyMissions.find(x => x.id === id);
        if (m) {
          m.completed = e.target.checked;
          if (m.completed) {
            window.appState.addXP(m.xp, `Completed mission: ${m.text}`);
            window.soundApp.playChime("success");
          }
          window.appState.save();
          this.renderDashboard();
        }
      });
    });

    // Subject continue buttons
    container.querySelector("#btn-goto-ict").addEventListener("click", () => this.switchView("ict"));
    container.querySelector("#btn-goto-econ").addEventListener("click", () => this.switchView("economics"));
    container.querySelector("#btn-view-all-diffs").addEventListener("click", () => this.switchView("differences"));

    container.querySelectorAll(".quick-diff-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.switchView("differences");
      });
    });
  }

  // -------------------------------------------------------------
  // 2. ICT OVERVIEW VIEW
  // -------------------------------------------------------------
  renderICTOverview() {
    const container = document.getElementById("view-ict");
    if (!container) return;

    const syllabus = window.ICT_SYLLABUS;

    container.innerHTML = `
      <div style="margin-bottom:24px;">
        <span style="font-size:0.8rem; font-weight:700; color:var(--rose-700); background:var(--rose-100); padding:3px 12px; border-radius:var(--radius-full);">
          💻 Complete ICT Syllabus
        </span>
        <h2 style="font-size:1.8rem; font-weight:900; color:var(--text-primary); margin:8px 0 4px;">
          Information and Communication Technology (9 Units)
        </h2>
        <p style="font-size:0.9rem; color:var(--text-muted);">
          Select any unit to learn concepts, test active recall, or launch interactive visualizers.
        </p>
      </div>

      <!-- Units Accordion / Card Grid -->
      <div style="display:flex; flex-direction:column; gap:16px; margin-bottom:32px;">
        ${syllabus.map(u => `
          <div class="glass-panel" style="padding:22px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
              <div>
                <span class="priority-stars">${"★".repeat(u.priority)}</span>
                <h3 style="font-size:1.2rem; font-weight:800; color:var(--text-primary); margin-top:2px;">
                  ${u.unitTitle}
                </h3>
              </div>
              <span style="font-size:0.75rem; background:var(--bg-main); padding:4px 10px; border-radius:var(--radius-full); font-weight:600; border:1px solid var(--border-subtle);">
                ${u.topics.length} Key Concept${u.topics.length > 1 ? 's' : ''}
              </span>
            </div>
            <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:14px;">
              ${u.description}
            </p>

            <div style="display:flex; flex-wrap:wrap; gap:8px;">
              ${u.topics.map(t => `
                <button class="btn btn-secondary btn-sm select-topic-btn" data-topic-id="${t.id}">
                  📖 ${t.title}
                </button>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>

      <!-- Unit 4 & Unit 7 Interactive Visualizer Demos Embedded -->
      <div id="ict-tools-injection-point">
        <!-- Excel Simulator injected here -->
        <div id="ict-excel-sim-container" style="margin-bottom:24px;"></div>
        <!-- OSI Model Visualizer injected here -->
        <div id="ict-osi-sim-container" style="margin-bottom:24px;"></div>
        <!-- PowerPoint Builder injected here -->
        <div id="ict-ppt-sim-container" style="margin-bottom:24px;"></div>
        <!-- Cyber Attack/Defense injected here -->
        <div id="ict-cyber-sim-container" style="margin-bottom:24px;"></div>
      </div>
    `;

    // Bind topic selection
    container.querySelectorAll(".select-topic-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const topicId = btn.dataset.topicId;
        this.switchView("learn", { topicId });
      });
    });

    // Render interactive widgets
    window.interactiveTools.renderExcelSimulator("ict-excel-sim-container");
    window.interactiveTools.renderOSIVisualizer("ict-osi-sim-container");
    window.interactiveTools.renderPowerPointBuilder("ict-ppt-sim-container");
    window.interactiveTools.renderScenarioGame("ict-cyber-sim-container");
  }

  // -------------------------------------------------------------
  // 3. ECONOMICS OVERVIEW VIEW
  // -------------------------------------------------------------
  renderEconomicsOverview() {
    const container = document.getElementById("view-economics");
    if (!container) return;

    const syllabus = window.ECONOMICS_SYLLABUS;

    container.innerHTML = `
      <div style="margin-bottom:24px;">
        <span style="font-size:0.8rem; font-weight:700; color:var(--rose-700); background:var(--rose-100); padding:3px 12px; border-radius:var(--radius-full);">
          📊 Complete Economics Syllabus (tisha study.pdf)
        </span>
        <h2 style="font-size:1.8rem; font-weight:900; color:var(--text-primary); margin:8px 0 4px;">
          Economics Exam Mastery (Topics 1–10)
        </h2>
        <p style="font-size:0.9rem; color:var(--text-muted);">
          Master definitions, curves, formulas, difference tables, and 2/5/10-mark exam templates.
        </p>
      </div>

      <!-- Topics Grid -->
      <div style="display:flex; flex-direction:column; gap:16px; margin-bottom:32px;">
        ${syllabus.map(t => `
          <div class="glass-panel" style="padding:22px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
              <div>
                <span class="priority-stars">${"★".repeat(t.priority)}</span>
                <h3 style="font-size:1.2rem; font-weight:800; color:var(--text-primary); margin-top:2px;">
                  ${t.title}
                </h3>
              </div>
              <span style="font-size:0.75rem; background:var(--bg-main); padding:4px 10px; border-radius:var(--radius-full); font-weight:600; border:1px solid var(--border-subtle);">
                ${t.concepts.length} Concept Section
              </span>
            </div>
            <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:14px;">
              ${t.description}
            </p>

            <div style="display:flex; flex-wrap:wrap; gap:8px;">
              ${t.concepts.map(c => `
                <button class="btn btn-secondary btn-sm select-econ-concept-btn" data-concept-id="${c.id}">
                  📈 ${c.title}
                </button>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>

      <!-- Interactive Supply & Demand Canvas Curve Simulator Injection -->
      <div id="econ-curve-sim-container" style="margin-bottom:28px;"></div>
    `;

    container.querySelectorAll(".select-econ-concept-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const conceptId = btn.dataset.conceptId;
        this.switchView("learn", { topicId: conceptId });
      });
    });

    window.interactiveTools.renderSupplyDemandSimulator("econ-curve-sim-container");
  }

  // -------------------------------------------------------------
  // 4. CONCEPT LEARNING VIEW (5-LEVEL PEDAGOGY)
  // -------------------------------------------------------------
  renderConceptLearning(topicId) {
    const container = document.getElementById("view-learn");
    if (!container) return;

    // Search topic in ICT or Economics
    let concept = null;
    let subject = "ICT";
    let unitTitle = "";

    window.ICT_SYLLABUS.forEach(u => {
      const found = u.topics.find(t => t.id === topicId);
      if (found) {
        concept = found;
        subject = "ICT";
        unitTitle = u.unitTitle;
      }
    });

    if (!concept) {
      window.ECONOMICS_SYLLABUS.forEach(t => {
        const found = t.concepts.find(c => c.id === topicId);
        if (found) {
          concept = found;
          subject = "Economics";
          unitTitle = t.title;
        }
      });
    }

    if (!concept) {
      concept = window.ICT_SYLLABUS[0].topics[0];
      unitTitle = window.ICT_SYLLABUS[0].unitTitle;
    }

    this.activeConcept = concept;
    const isCompleted = window.appState.isTopicCompleted(concept.id);
    const isBookmarked = window.appState.isTopicBookmarked(concept.id);

    container.innerHTML = `
      <!-- Header Bar -->
      <div class="concept-header-bar">
        <div>
          <span class="unit-breadcrumb">${subject} ❯ ${unitTitle}</span>
          <h2 style="font-size:1.6rem; font-weight:900; color:var(--text-primary); margin-top:4px;">
            ${concept.title}
          </h2>
          <div class="priority-stars">${"★".repeat(concept.priority || 5)} <span style="font-size:0.75rem; color:var(--text-muted); font-weight:normal;">Priority for 100/100</span></div>
        </div>

        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
          <!-- Explain Like I'm Stupid Mode Button -->
          <button class="simpler-mode-btn ${this.simplerModeActive ? 'active' : ''}" id="btn-toggle-simpler">
            <span>💡</span> ${this.simplerModeActive ? "Back to Technical Depth" : "Explain Like I'm Stupid / Make It Simpler"}
          </button>
        </div>
      </div>

      <!-- Progressive Content Area -->
      <div id="concept-main-content">
        ${this.simplerModeActive ? `
          <!-- ULTRA-SIMPLE MODE -->
          <div class="concept-block" style="background:#fffbeb; border-color:#fcd34d;">
            <span class="block-tag" style="background:#fef3c7; color:#92400e;">👶 ULTRA-SIMPLE EVERYDAY EXPLANATION</span>
            <p style="font-size:1.1rem; font-weight:600; color:#78350f; line-height:1.6; margin-bottom:14px;">
              ${concept.simplerVersion || concept.simpleIdea}
            </p>
            <p style="font-size:0.95rem; color:#92400e;">
              ${concept.simpleIdea}
            </p>
          </div>
        ` : `
          <!-- LEVEL 1: Understand It -->
          <div class="concept-block">
            <span class="block-tag tag-simple">🌱 LEVEL 1: UNDERSTAND IT (INTUITIVE ANALOGY)</span>
            <p style="font-size:1rem; color:var(--text-primary); line-height:1.6; margin-bottom:12px;">
              ${concept.simpleIdea}
            </p>
            <div style="background:var(--bg-main); padding:12px 16px; border-left:3px solid var(--rose-600); border-radius:0 var(--radius-sm) var(--radius-sm) 0;">
              <span style="font-size:0.75rem; font-weight:700; color:var(--rose-800); display:block; margin-bottom:4px;">🇧🇩 BANGLA EXPLANATION</span>
              <p style="font-size:0.95rem; color:var(--text-primary); font-family:'Hind Siliguri', sans-serif;">
                ${concept.banglaExplanation}
              </p>
            </div>
          </div>

          <!-- LEVEL 2: Know The Keyword -->
          <div class="concept-block">
            <span class="block-tag tag-keywords">🔑 LEVEL 2: KNOW THE KEYWORDS (EXAM TERMINOLOGY)</span>
            <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:10px;">
              These precise English keywords award maximum marks in exam scoring:
            </p>
            <div class="keyword-chips-container">
              ${concept.keywords ? concept.keywords.map(k => `
                <div class="keyword-chip" title="${k.def}">
                  <strong>${k.term}:</strong> <span style="font-weight:normal;">${k.def}</span>
                </div>
              `).join("") : ""}
            </div>
          </div>

          <!-- LEVEL 3: Understand Technically -->
          <div class="concept-block">
            <span class="block-tag tag-tech">⚙️ LEVEL 3: UNDERSTAND TECHNICALLY (DEEP MECHANISM)</span>
            <p style="font-size:0.95rem; color:var(--text-primary); line-height:1.6; margin-bottom:12px;">
              ${concept.technicalExplanation}
            </p>
            <div style="background:var(--rose-50); padding:10px 14px; border-radius:var(--radius-sm); border:1px solid var(--border-warm);">
              <span style="font-size:0.75rem; font-weight:700; color:var(--rose-800); display:block; margin-bottom:2px;">REAL-LIFE APPLICATION</span>
              <p style="font-size:0.9rem; color:var(--text-secondary); font-style:italic;">💡 ${concept.realLifeExample}</p>
            </div>
          </div>

          <!-- LEVEL 4: Write It (Exam Answer Templates) -->
          <div class="concept-block">
            <span class="block-tag tag-exam">📝 LEVEL 4: WRITE IT (EXAM-READY ANSWER TEMPLATES)</span>
            <div class="exam-marks-tabs">
              <button class="mark-tab-btn active" data-mark="two">2-Mark Answer</button>
              <button class="mark-tab-btn" data-mark="five">5-Mark Answer</button>
              <button class="mark-tab-btn" data-mark="ten">10-Mark Answer</button>
            </div>

            <div class="mark-tab-content" id="exam-template-display" style="white-space:pre-line;">
              ${concept.examAnswers ? concept.examAnswers.twoMark : "Exemplar answer loaded."}
            </div>
          </div>

          <!-- COMMON MISTAKES WARNING -->
          <div class="concept-block" style="background:#fff7ed; border-color:#fed7aa;">
            <span class="block-tag tag-mistakes">⚠️ COMMON EXAM MISTAKES & TRAPS</span>
            <p style="font-size:0.92rem; color:#9a3412; line-height:1.5;">
              ${concept.commonMistakes || "Students frequently confuse technical terminology without providing formal definitions."}
            </p>
          </div>
        `}
      </div>

      <!-- Concept Action Bar -->
      <div class="concept-action-bar">
        <div class="action-buttons-group">
          <button class="btn btn-secondary btn-sm" id="btn-read-aloud">🔊 Read Aloud</button>
          <button class="btn btn-secondary btn-sm ${isBookmarked ? 'btn-outline-rose' : ''}" id="btn-mark-important">
            ${isBookmarked ? "⭐ Marked Important" : "☆ Mark Important"}
          </button>
        </div>

        <div class="action-buttons-group">
          <button class="btn btn-secondary btn-sm" id="btn-close-the-book">
            🔒 Close the Book (Active Recall)
          </button>
          <button class="btn btn-primary btn-sm" id="btn-i-understand">
            ${isCompleted ? "✅ Mastered (+40 XP)" : "✓ I Understand This Concept"}
          </button>
        </div>
      </div>

      <!-- Active Recall Modal / Drawer Container -->
      <div id="active-recall-drawer" style="display:none; margin-top:24px; padding:24px; background:var(--bg-surface); border:2px solid var(--border-warm); border-radius:var(--radius-md); box-shadow:var(--shadow-md);">
        <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-primary); margin-bottom:8px;">
          🧠 LEVEL 5: PROVE IT — CLOSE THE BOOK ACTIVE RECALL
        </h3>
        <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:14px;">
          Without looking at the notes above, recall and write the answer from your own memory:
        </p>
        <p style="font-size:1rem; font-weight:700; color:var(--rose-700); margin-bottom:12px;">
          ❓ ${concept.recallQuestion || "Explain this concept and list its primary components in your own words:"}
        </p>
        <textarea id="recall-input-text" class="writing-textarea" placeholder="Type your answer here from memory..."></textarea>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <button class="btn btn-primary btn-sm" id="btn-submit-recall">Reveal Ideal Answer & Compare</button>
          <button class="btn btn-secondary btn-sm" id="btn-cancel-recall">Close</button>
        </div>

        <div id="recall-result-box" style="display:none; margin-top:20px; padding:16px; background:var(--bg-main); border-radius:var(--radius-sm);">
          <span style="font-size:0.8rem; font-weight:700; color:var(--rose-800); display:block; margin-bottom:6px;">📖 IDEAL ANSWER:</span>
          <p style="font-size:0.9rem; color:var(--text-primary); line-height:1.5; margin-bottom:14px;" id="recall-ideal-text">
            ${concept.examAnswers ? concept.examAnswers.twoMark : ""}
          </p>

          <span style="font-size:0.82rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:8px;">
            How did your recall perform?
          </span>
          <div style="display:flex; gap:10px;">
            <button class="btn btn-sm btn-srs-easy" id="btn-recall-correct">🟢 Correct</button>
            <button class="btn btn-sm btn-srs-hard" id="btn-recall-partial">🟡 Partially Correct</button>
            <button class="btn btn-sm btn-srs-again" id="btn-recall-revision">🔴 Needs Revision</button>
          </div>
        </div>
      </div>
    `;

    // Bind mark tabs
    container.querySelectorAll(".mark-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".mark-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const mark = btn.dataset.mark;
        const display = container.querySelector("#exam-template-display");
        if (display && concept.examAnswers) {
          if (mark === "two") display.textContent = concept.examAnswers.twoMark;
          else if (mark === "five") display.textContent = concept.examAnswers.fiveMark;
          else if (mark === "ten") display.textContent = concept.examAnswers.tenMark;
        }
      });
    });

    // Simpler mode toggle
    const simplerBtn = container.querySelector("#btn-toggle-simpler");
    if (simplerBtn) {
      simplerBtn.addEventListener("click", () => {
        this.simplerModeActive = !this.simplerModeActive;
        this.renderConceptLearning(topicId);
        window.soundApp.playChime("click");
      });
    }

    // TTS Read aloud
    const readBtn = container.querySelector("#btn-read-aloud");
    if (readBtn) {
      readBtn.addEventListener("click", () => {
        const textToRead = `${concept.title}. ${concept.simpleIdea}. ${concept.technicalExplanation}`;
        window.soundApp.speak(textToRead);
      });
    }

    // Bookmark toggle
    const bookmarkBtn = container.querySelector("#btn-mark-important");
    if (bookmarkBtn) {
      bookmarkBtn.addEventListener("click", () => {
        const marked = window.appState.toggleBookmark(concept.id);
        bookmarkBtn.textContent = marked ? "⭐ Marked Important" : "☆ Mark Important";
        window.soundApp.playChime("click");
      });
    }

    // I Understand button
    const masterBtn = container.querySelector("#btn-i-understand");
    if (masterBtn) {
      masterBtn.addEventListener("click", () => {
        window.appState.toggleTopicComplete(concept.id);
        masterBtn.textContent = "✅ Mastered (+40 XP)";
        window.soundApp.playChime("success");
      });
    }

    // Active Recall "Close the Book"
    const recallBtn = container.querySelector("#btn-close-the-book");
    const drawer = container.querySelector("#active-recall-drawer");
    const cancelRecall = container.querySelector("#btn-cancel-recall");
    const submitRecall = container.querySelector("#btn-submit-recall");
    const recallResBox = container.querySelector("#recall-result-box");

    if (recallBtn && drawer) {
      recallBtn.addEventListener("click", () => {
        drawer.style.display = "block";
        drawer.scrollIntoView({ behavior: "smooth" });
      });
    }

    if (cancelRecall && drawer) {
      cancelRecall.addEventListener("click", () => {
        drawer.style.display = "none";
      });
    }

    if (submitRecall && recallResBox) {
      submitRecall.addEventListener("click", () => {
        recallResBox.style.display = "block";
        window.soundApp.playChime("click");
      });
    }

    // Rating buttons in recall
    const handleRecallRating = (rating) => {
      window.appState.addXP(25, `Recall self-rated: ${rating}`);
      if (rating === "Needs Revision") {
        window.appState.logMistake({
          subject: subject,
          unit: unitTitle,
          topicTitle: concept.title,
          question: concept.recallQuestion || concept.title,
          studentAnswer: container.querySelector("#recall-input-text").value || "Needs revision",
          correctAnswer: concept.examAnswers ? concept.examAnswers.twoMark : "",
          whyWrong: "Active recall required review.",
          correctConcept: concept.simpleIdea
        });
      }
      alert(`Recall rated as ${rating}! Recorded to your progress tracker.`);
      drawer.style.display = "none";
    };

    const rateCorrect = container.querySelector("#btn-recall-correct");
    const ratePartial = container.querySelector("#btn-recall-partial");
    const rateRevision = container.querySelector("#btn-recall-revision");
    if (rateCorrect) rateCorrect.addEventListener("click", () => handleRecallRating("Correct"));
    if (ratePartial) ratePartial.addEventListener("click", () => handleRecallRating("Partially Correct"));
    if (rateRevision) rateRevision.addEventListener("click", () => handleRecallRating("Needs Revision"));
  }

  // -------------------------------------------------------------
  // 5. FLASHCARDS VIEW
  // -------------------------------------------------------------
  renderFlashcards() {
    const container = document.getElementById("view-flashcards");
    if (!container) return;

    // Collect all flashcards from both syllabi
    const cards = [];
    window.ICT_SYLLABUS.forEach(u => {
      u.topics.forEach(t => {
        if (t.flashcards) {
          t.flashcards.forEach(fc => cards.push({ ...fc, subject: "ICT", unit: u.unitTitle }));
        }
      });
    });
    window.ECONOMICS_SYLLABUS.forEach(topic => {
      topic.concepts.forEach(c => {
        if (c.flashcards) {
          c.flashcards.forEach(fc => cards.push({ ...fc, subject: "Economics", unit: topic.title }));
        }
      });
    });

    let currentCardIndex = 0;

    const renderCard = () => {
      const card = cards[currentCardIndex];
      if (!card) return;

      container.innerHTML = `
        <div style="margin-bottom:20px; text-align:center;">
          <span style="font-size:0.8rem; font-weight:700; color:var(--rose-700); background:var(--rose-100); padding:3px 12px; border-radius:var(--radius-full);">
            🃏 Interactive Spaced Repetition Flashcards
          </span>
          <h2 style="font-size:1.8rem; font-weight:900; color:var(--text-primary); margin:6px 0 2px;">
            Card ${currentCardIndex + 1} of ${cards.length}
          </h2>
          <p style="font-size:0.85rem; color:var(--text-muted);">${card.subject} • ${card.unit}</p>
        </div>

        <div class="flashcard-wrapper">
          <div class="flashcard-inner" id="active-flashcard-box">
            <div class="flashcard-face flashcard-front">
              <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:12px;">Front (Prompt)</span>
              <h3 style="font-size:1.4rem; font-weight:800; color:var(--text-primary); line-height:1.4;">
                ${card.front}
              </h3>
              <span style="font-size:0.8rem; color:var(--rose-600); font-weight:600; margin-top:20px;">
                👆 Click card to flip and reveal answer
              </span>
            </div>
            <div class="flashcard-face flashcard-back">
              <span style="font-size:0.75rem; font-weight:700; color:var(--rose-900); text-transform:uppercase; margin-bottom:12px;">Back (Definition & Key Concepts)</span>
              <p style="font-size:1.15rem; font-weight:700; color:var(--text-primary); line-height:1.5;">
                ${card.back}
              </p>
            </div>
          </div>

          <div class="srs-buttons-row">
            <button class="btn btn-sm btn-srs-again" data-srs="again">Again (1d)</button>
            <button class="btn btn-sm btn-srs-hard" data-srs="hard">Hard (2d)</button>
            <button class="btn btn-sm btn-srs-good" data-srs="good">Good (4d)</button>
            <button class="btn btn-sm btn-srs-easy" data-srs="easy">Easy (7d)</button>
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:12px; margin-top:24px;">
          <button class="btn btn-secondary btn-sm" id="btn-prev-card">◀ Previous</button>
          <button class="btn btn-secondary btn-sm" id="btn-next-card">Next Card ▶</button>
        </div>
      `;

      const cardBox = container.querySelector("#active-flashcard-box");
      cardBox.addEventListener("click", () => {
        cardBox.classList.toggle("flipped");
        window.soundApp.playChime("click");
      });

      container.querySelectorAll(".srs-buttons-row button").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const rating = btn.dataset.srs;
          window.appState.updateFlashcardSRS(`fc-${currentCardIndex}`, rating);
          currentCardIndex = (currentCardIndex + 1) % cards.length;
          renderCard();
        });
      });

      container.querySelector("#btn-prev-card").addEventListener("click", () => {
        currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
        renderCard();
      });

      container.querySelector("#btn-next-card").addEventListener("click", () => {
        currentCardIndex = (currentCardIndex + 1) % cards.length;
        renderCard();
      });
    };

    renderCard();
  }

  // -------------------------------------------------------------
  // 6. MCQ PRACTICE ENGINE
  // -------------------------------------------------------------
  renderMCQPractice() {
    const container = document.getElementById("view-mcq");
    if (!container) return;

    // Collect all MCQs
    const mcqs = [];
    window.ICT_SYLLABUS.forEach(u => {
      u.topics.forEach(t => {
        if (t.mcqs) t.mcqs.forEach(m => mcqs.push({ ...m, subject: "ICT", unit: u.unitTitle }));
      });
    });
    window.ECONOMICS_SYLLABUS.forEach(topic => {
      topic.concepts.forEach(c => {
        if (c.mcqs) c.mcqs.forEach(m => mcqs.push({ ...m, subject: "Economics", unit: topic.title }));
      });
    });

    let currentIdx = 0;

    const renderSingleMCQ = () => {
      const q = mcqs[currentIdx];
      if (!q) return;

      container.innerHTML = `
        <div style="max-width:760px; margin:0 auto;">
          <div style="margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span style="font-size:0.75rem; font-weight:700; color:var(--rose-700); background:var(--rose-100); padding:3px 10px; border-radius:var(--radius-full);">
                ${q.subject} • ${q.unit}
              </span>
              <h2 style="font-size:1.5rem; font-weight:900; color:var(--text-primary); margin-top:4px;">
                Question ${currentIdx + 1} of ${mcqs.length}
              </h2>
            </div>
            <span style="font-size:0.8rem; font-weight:600; color:var(--text-muted);">
              Difficulty: ${q.difficulty}
            </span>
          </div>

          <div class="glass-panel" style="padding:24px; margin-bottom:20px;">
            <p style="font-size:1.1rem; font-weight:700; color:var(--text-primary); margin-bottom:20px; line-height:1.5;">
              ${q.question}
            </p>

            <div style="display:flex; flex-direction:column; gap:10px;" id="mcq-options-list">
              ${q.options.map((opt, i) => `
                <button class="mcq-option-btn practice-opt-btn" data-opt-index="${i}">
                  <span style="font-weight:700; color:var(--rose-700);">${String.fromCharCode(65 + i)}.</span>
                  <span>${opt}</span>
                </button>
              `).join("")}
            </div>

            <div id="mcq-explanation-box" class="mcq-feedback-box">
              <span style="font-weight:700; display:block; margin-bottom:4px;">💡 EXPLANATION & WHY:</span>
              <p>${q.explanation}</p>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between;">
            <button class="btn btn-secondary btn-sm" id="btn-prev-mcq" ${currentIdx === 0 ? 'disabled' : ''}>◀ Previous</button>
            <button class="btn btn-primary btn-sm" id="btn-next-mcq">Next Question ▶</button>
          </div>
        </div>
      `;

      const optBtns = container.querySelectorAll(".practice-opt-btn");
      const expBox = container.querySelector("#mcq-explanation-box");

      optBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          const chosen = parseInt(btn.dataset.optIndex);
          const isCorrect = chosen === q.correct;

          optBtns.forEach((b, i) => {
            b.disabled = true;
            if (i === q.correct) b.classList.add("correct");
          });

          if (isCorrect) {
            btn.classList.add("correct");
            expBox.style.display = "block";
            expBox.style.background = "#ecfdf5";
            expBox.style.color = "#065f46";
            expBox.style.border = "1px solid #10b981";
            window.soundApp.playChime("success");
            window.appState.addXP(20, "MCQ correct");
          } else {
            btn.classList.add("incorrect");
            expBox.style.display = "block";
            expBox.style.background = "#fef2f2";
            expBox.style.color = "#991b1b";
            expBox.style.border = "1px solid #ef4444";
            window.soundApp.playChime("warn");

            // Log to mistake notebook
            window.appState.logMistake({
              subject: q.subject,
              unit: q.unit,
              topicTitle: q.question,
              question: q.question,
              studentAnswer: q.options[chosen],
              correctAnswer: q.options[q.correct],
              whyWrong: "Selected incorrect distractor.",
              correctConcept: q.explanation
            });
          }
        });
      });

      container.querySelector("#btn-prev-mcq").addEventListener("click", () => {
        if (currentIdx > 0) { currentIdx--; renderSingleMCQ(); }
      });
      container.querySelector("#btn-next-mcq").addEventListener("click", () => {
        currentIdx = (currentIdx + 1) % mcqs.length;
        renderSingleMCQ();
      });
    };

    renderSingleMCQ();
  }

  // -------------------------------------------------------------
  // 7. DIFFERENCE TABLE GENERATOR VIEW
  // -------------------------------------------------------------
  renderDifferenceTables() {
    const container = document.getElementById("view-differences");
    if (!container) return;

    const tables = window.DIFFERENCE_TABLES;
    let selectedTable = tables[0];

    const renderTableUI = () => {
      container.innerHTML = `
        <div style="margin-bottom:20px;">
          <span style="font-size:0.8rem; font-weight:700; color:var(--rose-700); background:var(--rose-100); padding:3px 12px; border-radius:var(--radius-full);">
            ⚖️ Difference Table Generator
          </span>
          <h2 style="font-size:1.8rem; font-weight:900; color:var(--text-primary); margin:6px 0 2px;">
            High-Yield Exam Comparisons
          </h2>
          <p style="font-size:0.9rem; color:var(--text-muted);">
            Pick any comparison across ICT and Economics to view structured distinction tables.
          </p>
        </div>

        <!-- Filter Chips -->
        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px;">
          ${tables.map(t => `
            <button class="btn btn-sm ${t.id === selectedTable.id ? 'btn-primary' : 'btn-secondary'} diff-select-chip" data-id="${t.id}">
              ${t.title}
            </button>
          `).join("")}
        </div>

        <!-- Rendered Table -->
        <div class="diff-table-container">
          <table class="diff-table">
            <thead>
              <tr>
                <th style="width:25%;">Feature / Basis</th>
                <th style="width:37.5%; color:var(--rose-900);">${selectedTable.itemA}</th>
                <th style="width:37.5%; color:var(--warm-indigo);">${selectedTable.itemB}</th>
              </tr>
            </thead>
            <tbody>
              ${selectedTable.rows.map(r => `
                <tr>
                  <td style="font-weight:700; color:var(--text-primary); background:var(--bg-main);">${r.feature}</td>
                  <td>${r.a}</td>
                  <td>${r.b}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;

      container.querySelectorAll(".diff-select-chip").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          selectedTable = tables.find(t => t.id === id) || tables[0];
          window.soundApp.playChime("click");
          renderTableUI();
        });
      });
    };

    renderTableUI();
  }

  // -------------------------------------------------------------
  // 8. MISTAKE NOTEBOOK VIEW
  // -------------------------------------------------------------
  renderMistakeNotebook() {
    const container = document.getElementById("view-mistakes");
    if (!container) return;

    const mistakes = window.appState.state.mistakes;

    container.innerHTML = `
      <div style="margin-bottom:20px;">
        <span style="font-size:0.8rem; font-weight:700; color:var(--rose-700); background:var(--rose-100); padding:3px 12px; border-radius:var(--radius-full);">
          📖 Personalized Mistake Notebook
        </span>
        <h2 style="font-size:1.8rem; font-weight:900; color:var(--text-primary); margin:6px 0 2px;">
          My Mistakes & Revision Queue
        </h2>
        <p style="font-size:0.9rem; color:var(--text-muted);">
          Every incorrect quiz answer and recall gap is automatically cataloged here for re-testing.
        </p>
      </div>

      <div style="display:flex; flex-direction:column; gap:16px;">
        ${mistakes.length === 0 ? `
          <div class="glass-panel" style="padding:32px; text-align:center;">
            <span style="font-size:2.5rem; display:block; margin-bottom:8px;">🎉</span>
            <h3 style="font-size:1.2rem; font-weight:800; color:var(--text-primary);">No Unresolved Mistakes!</h3>
            <p style="font-size:0.9rem; color:var(--text-muted);">You have zero pending errors recorded in your notebook.</p>
          </div>
        ` : mistakes.map(m => `
          <div class="glass-panel" style="padding:20px; border-left:4px solid ${m.resolved ? 'var(--warm-emerald)' : 'var(--rose-600)'};">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
              <span style="font-size:0.75rem; font-weight:700; color:var(--rose-800); background:var(--rose-100); padding:2px 8px; border-radius:var(--radius-full);">
                ${m.subject} • ${m.unit}
              </span>
              <span style="font-size:0.75rem; color:var(--text-muted);">${m.date}</span>
            </div>

            <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-primary); margin-bottom:8px;">
              ${m.question}
            </h4>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px; font-size:0.88rem;">
              <div style="background:#fef2f2; padding:10px; border-radius:var(--radius-sm); border:1px solid #fecaca;">
                <strong style="color:#991b1b; display:block;">❌ My Answer:</strong>
                <span>${m.studentAnswer}</span>
              </div>
              <div style="background:#ecfdf5; padding:10px; border-radius:var(--radius-sm); border:1px solid #a7f3d0;">
                <strong style="color:#065f46; display:block;">✅ Correct Answer:</strong>
                <span>${m.correctAnswer}</span>
              </div>
            </div>

            <div style="background:var(--bg-main); padding:10px 14px; border-radius:var(--radius-sm); font-size:0.85rem; margin-bottom:12px;">
              <strong>🧠 Core Concept:</strong> ${m.correctConcept}
            </div>

            <div style="display:flex; justify-content:flex-end; gap:8px;">
              ${!m.resolved ? `
                <button class="btn btn-primary btn-sm resolve-mistake-btn" data-id="${m.id}">
                  ✓ Mark Revised & Mastered (+25 XP)
                </button>
              ` : `
                <span style="font-size:0.85rem; font-weight:700; color:var(--warm-emerald);">✓ Mastered</span>
              `}
            </div>
          </div>
        `).join("")}
      </div>
    `;

    container.querySelectorAll(".resolve-mistake-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        window.appState.resolveMistake(id);
        window.soundApp.playChime("success");
        this.renderMistakeNotebook();
      });
    });
  }

  // -------------------------------------------------------------
  // 9. SPACED REVISION QUEUE VIEW
  // -------------------------------------------------------------
  renderSpacedRevision() {
    const container = document.getElementById("view-revision");
    if (!container) return;

    const bookmarked = window.appState.state.bookmarkedTopics;

    container.innerHTML = `
      <div style="margin-bottom:20px;">
        <span style="font-size:0.8rem; font-weight:700; color:var(--rose-700); background:var(--rose-100); padding:3px 12px; border-radius:var(--radius-full);">
          🔁 Smart Spaced Revision
        </span>
        <h2 style="font-size:1.8rem; font-weight:900; color:var(--text-primary); margin:6px 0 2px;">
          Scheduled Revision Queue
        </h2>
        <p style="font-size:0.9rem; color:var(--text-muted);">
          Concepts systematically reappear based on retention decay curves to guarantee 100/100 recall on exam day.
        </p>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:16px;">
        <div class="glass-panel" style="padding:20px; border-top:4px solid #ef4444;">
          <h4 style="font-size:1rem; font-weight:800; color:#b91c1c; margin-bottom:8px;">🔴 REVISE TODAY</h4>
          <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:12px;">High priority weak topics</p>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; font-size:0.88rem;">
            <li style="padding:6px 10px; background:var(--bg-main); border-radius:var(--radius-sm);">Unit 7: OSI Model & IP Addressing</li>
            <li style="padding:6px 10px; background:var(--bg-main); border-radius:var(--radius-sm);">Topic 4: LAC & SMC Cost Curves</li>
          </ul>
        </div>

        <div class="glass-panel" style="padding:20px; border-top:4px solid #f59e0b;">
          <h4 style="font-size:1rem; font-weight:800; color:#b45309; margin-bottom:8px;">🟡 REVISE TOMORROW</h4>
          <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:12px;">Medium interval checks</p>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; font-size:0.88rem;">
            <li style="padding:6px 10px; background:var(--bg-main); border-radius:var(--radius-sm);">Topic 2: Elasticity of Demand</li>
            <li style="padding:6px 10px; background:var(--bg-main); border-radius:var(--radius-sm);">Unit 6: DoS vs DDoS Defense</li>
          </ul>
        </div>

        <div class="glass-panel" style="padding:20px; border-top:4px solid #3b82f6;">
          <h4 style="font-size:1rem; font-weight:800; color:#1d4ed8; margin-bottom:8px;">🔵 REVISE IN 3 DAYS</h4>
          <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:12px;">Reinforcement checks</p>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; font-size:0.88rem;">
            <li style="padding:6px 10px; background:var(--bg-main); border-radius:var(--radius-sm);">Unit 4: Excel =SUM, =AVERAGE</li>
            <li style="padding:6px 10px; background:var(--bg-main); border-radius:var(--radius-sm);">Topic 6: GDP & Double Counting</li>
          </ul>
        </div>

        <div class="glass-panel" style="padding:20px; border-top:4px solid #10b981;">
          <h4 style="font-size:1rem; font-weight:800; color:#047857; margin-bottom:8px;">🟢 MASTERED</h4>
          <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:12px;">Permanent recall locked</p>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; font-size:0.88rem;">
            <li style="padding:6px 10px; background:var(--bg-main); border-radius:var(--radius-sm);">Unit 1: Data vs Information</li>
            <li style="padding:6px 10px; background:var(--bg-main); border-radius:var(--radius-sm);">Topic 1: Scarcity & Positive Econ</li>
          </ul>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // 10. HORIZONTAL PAGE CHANGING MODE (TACTILE DECK CONTROLLER)
  // -------------------------------------------------------------
  launchHorizontalDeckMode() {
    const slideDeck = [];

    // Slide 1: Welcome & Mission Deck
    slideDeck.push({
      badge: "Exam Deck Orientation",
      title: "🎯 100/100 Exam Mission Deck",
      contentHtml: `
        <div style="text-align:center; padding:20px 0;">
          <h3 style="font-size:1.6rem; font-weight:900; color:var(--rose-900); margin-bottom:12px;">
            “Understand deeply. Recall quickly. Write perfectly.”
          </h3>
          <p style="font-size:1rem; color:var(--text-secondary); max-width:600px; margin:0 auto 24px; line-height:1.6;">
            Welcome to the tactile horizontal study deck. Swipe left/right or use your keyboard arrow keys 
            (<span class="kbd-badge">←</span> <span class="kbd-badge">→</span>) to flip between syllabus topics, 
            interactive tools, writing rubrics, and high-yield exam answers.
          </p>
          <div style="display:inline-flex; gap:16px; background:var(--rose-100); padding:10px 24px; border-radius:var(--radius-full); font-weight:700; color:var(--rose-800);">
            <span>💻 9 ICT Units</span> • <span>📊 10 Economics Topics</span> • <span>⏱ Exam Simulator</span>
          </div>
        </div>
      `
    });

    // Slide 2: ICT Core Unit 7 - OSI Model & Visualizer
    slideDeck.push({
      badge: "ICT • Unit 7",
      title: "OSI 7-Layer Reference Model",
      contentHtml: `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
          <div>
            <span style="font-size:0.75rem; font-weight:700; color:var(--rose-800); display:block; margin-bottom:4px;">🇧🇩 BANGLA EXPLANATION</span>
            <p style="font-size:0.95rem; color:var(--text-primary); font-family:'Hind Siliguri', sans-serif; line-height:1.6; margin-bottom:14px;">
              কম্পিউটার নেটওয়ার্কে এক ডিভাইস থেকে অন্য ডিভাইসে ডেটা প্রেরণের ধাপগুলোকে ৭টি স্তরে ভাগ করা হয়েছে:
              Application, Presentation, Session, Transport, Network, Data Link, এবং Physical।
            </p>
            <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;">CORE KEYWORDS</span>
            <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:16px;">
              <span class="keyword-chip">Layer 7: Application (HTTP/DNS)</span>
              <span class="keyword-chip">Layer 4: Transport (TCP/UDP)</span>
              <span class="keyword-chip">Layer 3: Network (IP/Routing)</span>
              <span class="keyword-chip">Layer 2: Data Link (MAC/Frames)</span>
            </div>
          </div>
          <div style="background:var(--bg-main); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-warm);">
            <h4 style="font-size:0.9rem; font-weight:800; color:var(--rose-900); margin-bottom:8px;">📝 5-Mark Exam Answer Template:</h4>
            <p style="font-size:0.85rem; color:var(--text-primary); line-height:1.5;">
              1. Application: End-user protocols (HTTP, SMTP)<br/>
              2. Transport: End-to-end segmentation and flow control (TCP port numbers)<br/>
              3. Network: Logical packet routing across subnets using IP addresses<br/>
              4. Data Link: Local framing and physical MAC delivery on switches<br/>
              5. Physical: Raw binary bit transmission over cables/radio.
            </p>
          </div>
        </div>
      `
    });

    // Slide 3: Economics Core Topic 2 - Supply & Demand Equilibrium
    slideDeck.push({
      badge: "Economics • Topic 2",
      title: "Law of Demand & Supply Equilibrium",
      contentHtml: `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
          <div>
            <span style="font-size:0.75rem; font-weight:700; color:var(--rose-800); display:block; margin-bottom:4px;">🇧🇩 BANGLA EXPLANATION</span>
            <p style="font-size:0.95rem; color:var(--text-primary); font-family:'Hind Siliguri', sans-serif; line-height:1.6; margin-bottom:14px;">
              দাম বাড়লে চাহিদা কমে (বিপরীতমুখী), আর দাম বাড়লে যোগান বাড়ে (সমমুখী)। যে বিন্দুতে ক্রেতার চাহিদা ও বিক্রেতার যোগান সমান হয় (Qd = Qs), সেখানে ভারসাম্য দাম নির্ধারিত হয়।
            </p>
            <div style="background:var(--rose-50); padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border-warm); margin-bottom:12px;">
              <strong style="color:var(--rose-900);">Formula:</strong> Price Elasticity of Demand (PED) = (%ΔQd / %ΔP)
            </div>
          </div>
          <div style="background:var(--bg-main); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-warm);">
            <h4 style="font-size:0.9rem; font-weight:800; color:var(--rose-900); margin-bottom:8px;">⚖️ Movement Along vs Shift:</h4>
            <p style="font-size:0.85rem; color:var(--text-primary); line-height:1.5;">
              • <strong>Movement Along Curve:</strong> Solely caused by a change in own price (Expansion / Contraction).<br/>
              • <strong>Shift of Curve:</strong> Caused by non-price factors (Consumer income, tastes, substitutes).
            </p>
          </div>
        </div>
      `
    });

    // Slide 4: Interactive Tool Slide - Excel Formula Runner
    slideDeck.push({
      badge: "ICT Interactive Tool",
      title: "Unit 4 Spreadsheet Formula Runner",
      contentHtml: `
        <div id="deck-excel-runner-container"></div>
      `
    });

    // Slide 5: Interactive Tool Slide - Economics Canvas Simulator
    slideDeck.push({
      badge: "Economics Interactive Tool",
      title: "Supply & Demand Interactive Curve Simulator",
      contentHtml: `
        <div id="deck-curve-runner-container"></div>
      `
    });

    // Slide 6: High-Yield Difference Table
    slideDeck.push({
      badge: "Exam Differences",
      title: "IPv4 vs. IPv6 & RAM vs. ROM Comparisons",
      contentHtml: `
        <table class="diff-table" style="font-size:0.85rem;">
          <thead>
            <tr><th>Feature</th><th>IPv4</th><th>IPv6</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Address Length</strong></td><td>32 bits (4 bytes)</td><td>128 bits (16 bytes)</td></tr>
            <tr><td><strong>Format</strong></td><td>Dotted-decimal (192.168.1.1)</td><td>Hexadecimal (2001:0db8::)</td></tr>
            <tr><td><strong>Address Space</strong></td><td>~4.3 Billion</td><td>~3.4 x 10^38 (Virtually Infinite)</td></tr>
            <tr><td><strong>Security</strong></td><td>Optional IPSec</td><td>Natively Integrated IPSec</td></tr>
          </tbody>
        </table>
      `
    });

    // Slide 7: 100/100 Mode & Daily Mission Wrap
    slideDeck.push({
      badge: "Exam Readiness",
      title: "👑 Target 100/100: Are You Exam Ready?",
      contentHtml: `
        <div style="text-align:center; padding:20px 0;">
          <div style="font-size:3rem; margin-bottom:8px;">🏆</div>
          <h3 style="font-size:1.5rem; font-weight:900; color:var(--rose-900); margin-bottom:8px;">
            Calculate Your Readiness Score
          </h3>
          <p style="font-size:0.95rem; color:var(--text-secondary); max-width:550px; margin:0 auto 20px;">
            Complete full timed exams and active recall sessions to unlock the official 100/100 Master Badge.
          </p>
          <div style="display:flex; justify-content:center; gap:12px;">
            <button class="btn btn-primary" onclick="window.appCoordinator.switchView('exam')">⏱ Start Mock Exam</button>
            <button class="btn btn-secondary" onclick="window.appCoordinator.switchView('writing')">✍️ Writing Trainer</button>
          </div>
        </div>
      `
    });

    // Load into Horizontal Deck Controller
    window.deckController.loadSlides(slideDeck);

    // After slide rendering, inject interactive tools on slides 4 & 5
    setTimeout(() => {
      window.interactiveTools.renderExcelSimulator("deck-excel-runner-container");
      window.interactiveTools.renderSupplyDemandSimulator("deck-curve-runner-container");
    }, 100);
  }

  // -------------------------------------------------------------
  // 11. SETTINGS VIEW
  // -------------------------------------------------------------
  renderSettings() {
    const container = document.getElementById("view-settings");
    if (!container) return;

    container.innerHTML = `
      <div style="max-width:600px; margin:0 auto;">
        <div style="margin-bottom:20px;">
          <h2 style="font-size:1.6rem; font-weight:900; color:var(--text-primary);">Settings & Exam Target</h2>
          <p style="font-size:0.9rem; color:var(--text-muted);">Configure exam countdown dates and audio feedback preferences.</p>
        </div>

        <div class="glass-panel" style="padding:24px; display:flex; flex-direction:column; gap:18px;">
          <div>
            <label style="font-size:0.85rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">
              Target Exam Date:
            </label>
            <input type="datetime-local" class="writing-textarea" style="min-height:auto; padding:8px 12px;" value="2026-09-15T09:00" />
          </div>

          <div style="display:flex; align-items:center; justify-content:space-between;">
            <div>
              <strong style="display:block; font-size:0.95rem;">Synthesized Audio Chimes</strong>
              <span style="font-size:0.8rem; color:var(--text-muted);">Play ambient soft tones on XP gain and correct answers</span>
            </div>
            <input type="checkbox" checked class="mission-checkbox" />
          </div>

          <div style="display:flex; align-items:center; justify-content:space-between;">
            <div>
              <strong style="display:block; font-size:0.95rem;">High-Contrast Rose Mode</strong>
              <span style="font-size:0.8rem; color:var(--text-muted);">Enhance text contrast for night reading</span>
            </div>
            <input type="checkbox" class="mission-checkbox" />
          </div>

          <div style="margin-top:10px;">
            <button class="btn btn-primary" onclick="alert('Settings saved!'); window.appCoordinator.switchView('dashboard');">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

window.appCoordinator = new AppCoordinator();
document.addEventListener("DOMContentLoaded", () => {
  window.appCoordinator.init();
});
