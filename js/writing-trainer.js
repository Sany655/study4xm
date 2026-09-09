/* ==========================================================================
   WRITING-TRAINER.JS - Technical Writing Evaluation Engine
   Evaluates student typed exam answers on accuracy, keywords, completeness,
   structure, and generates missing keyword tags with scoring breakdown.
   ========================================================================== */

class TechnicalWritingTrainer {
  constructor() {
    this.prompts = [
      {
        id: "wt-os",
        subject: "ICT",
        title: "Operating System Architecture",
        question: "What is an Operating System and what are its primary functions in managing hardware and software resources?",
        requiredKeywords: [
          "hardware", "software", "resource management", "user interface", 
          "kernel", "process", "memory", "device drivers"
        ],
        idealAnswer: "An Operating System (OS) is essential system software that acts as an intermediary between computer hardware and the user. Its primary functions include resource management (allocating CPU time, memory paging, and process scheduling), providing a user interface (CLI or GUI), executing device drivers for hardware communication, and ensuring data security and file system integrity.",
        marks: 10
      },
      {
        id: "wt-osi",
        subject: "ICT",
        title: "OSI Reference Model Architecture",
        question: "Explain the architecture of the 7-Layer OSI Reference Model and describe how data encapsulation works from Application to Physical layer.",
        requiredKeywords: [
          "seven layers", "application", "transport", "network", "data link", 
          "physical", "encapsulation", "packets", "frames", "bits"
        ],
        idealAnswer: "The Open Systems Interconnection (OSI) model is a conceptual 7-layer framework standardizing network communications: Application, Presentation, Session, Transport, Network, Data Link, and Physical layers. Data encapsulation travels downwards: data from upper layers is segmented at the Transport layer, addressed into packets with IP headers at the Network layer, converted into frames with MAC addresses at the Data Link layer, and finally transmitted as binary electrical bits at the Physical layer.",
        marks: 10
      },
      {
        id: "wt-opp-cost",
        subject: "Economics",
        title: "Opportunity Cost & Scarcity",
        question: "Define the concept of Opportunity Cost and explain how the fundamental economic problem of Scarcity necessitates choice.",
        requiredKeywords: [
          "scarcity", "unlimited wants", "limited resources", "next best alternative", 
          "forgone", "production possibility curve", "trade-off"
        ],
        idealAnswer: "Opportunity cost is defined as the value of the next best alternative forgone when an economic decision is made. It directly arises from the fundamental economic problem of scarcity: human wants are virtually unlimited, while productive factors (land, labor, capital, enterprise) are finite. Because resources cannot satisfy all desires simultaneously, individuals and societies must make choices, resulting in inevitable trade-offs formally illustrated along the Production Possibility Curve (PPC).",
        marks: 10
      },
      {
        id: "wt-firm-equil",
        subject: "Economics",
        title: "Conditions for Firm Equilibrium",
        question: "State and explain the two essential mathematical conditions for a firm to achieve profit-maximizing equilibrium in any market structure.",
        requiredKeywords: [
          "marginal revenue", "marginal cost", "mr = mc", "cut from below", 
          "profit maximization", "equilibrium", "slope"
        ],
        idealAnswer: "To achieve profit-maximizing equilibrium in any market structure, a firm must satisfy two strict conditions: 1) The first-order (necessary) condition is that Marginal Revenue equals Marginal Cost (MR = MC). 2) The second-order (sufficient) condition is that the Marginal Cost (MC) curve must intersect the Marginal Revenue (MR) curve from below, meaning the slope of MC must be greater than the slope of MR at the point of intersection.",
        marks: 5
      }
    ];

    this.activePromptIndex = 0;
  }

  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const current = this.prompts[this.activePromptIndex];

    el.innerHTML = `
      <div class="writing-trainer-box">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
          <div>
            <span style="display:inline-block; font-size:0.75rem; font-weight:700; background:var(--rose-100); color:var(--rose-800); padding:3px 10px; border-radius:var(--radius-full); margin-bottom:4px;">
              ${current.subject} Exam Essay
            </span>
            <h3 style="font-size:1.2rem; font-weight:800; color:var(--text-primary);">${current.title}</h3>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-secondary btn-sm" id="btn-prev-prompt">◀ Previous Question</button>
            <button class="btn btn-secondary btn-sm" id="btn-next-prompt">Next Question ▶</button>
          </div>
        </div>

        <div style="background:var(--bg-main); padding:16px; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); margin-bottom:16px;">
          <p style="font-size:1rem; font-weight:600; color:var(--text-primary); line-height:1.5;">
            ❓ <strong>Question:</strong> ${current.question}
          </p>
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">Standard: ${current.marks}-Mark Structured Exam Answer</span>
        </div>

        <div>
          <label style="font-size:0.85rem; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">
            ✍️ Type Your Exam-Ready Answer Below:
          </label>
          <textarea id="wt-answer-input" class="writing-textarea" placeholder="Write your complete technical answer here... Remember to include formal definitions, mechanisms, and key terminology."></textarea>
        </div>

        <div style="display:flex; gap:10px; align-items:center; justify-content:space-between; flex-wrap:wrap;">
          <div style="display:flex; gap:10px;">
            <button class="btn btn-primary" id="btn-evaluate-answer">🔍 Evaluate My Answer</button>
            <button class="btn btn-secondary" id="btn-load-sample">Load Exemplar Answer</button>
          </div>
          <span style="font-size:0.8rem; color:var(--text-muted);" id="wt-word-count">0 words typed</span>
        </div>

        <div id="wt-evaluation-panel" class="evaluation-panel">
          <!-- Dynamic Score & Rubric Breakdown -->
        </div>
      </div>
    `;

    // Event Binders
    const textarea = el.querySelector("#wt-answer-input");
    const wordCount = el.querySelector("#wt-word-count");
    const evalBtn = el.querySelector("#btn-evaluate-answer");
    const sampleBtn = el.querySelector("#btn-load-sample");
    const prevBtn = el.querySelector("#btn-prev-prompt");
    const nextBtn = el.querySelector("#btn-next-prompt");

    textarea.addEventListener("input", () => {
      const words = textarea.value.trim().split(/\s+/).filter(w => w.length > 0).length;
      wordCount.textContent = `${words} words typed`;
    });

    evalBtn.addEventListener("click", () => {
      this.evaluate(textarea.value);
    });

    sampleBtn.addEventListener("click", () => {
      textarea.value = current.idealAnswer;
      textarea.dispatchEvent(new Event("input"));
      this.evaluate(current.idealAnswer);
    });

    prevBtn.addEventListener("click", () => {
      this.activePromptIndex = (this.activePromptIndex - 1 + this.prompts.length) % this.prompts.length;
      this.render(containerId);
    });

    nextBtn.addEventListener("click", () => {
      this.activePromptIndex = (this.activePromptIndex + 1) % this.prompts.length;
      this.render(containerId);
    });
  }

  evaluate(studentText) {
    const panel = document.getElementById("wt-evaluation-panel");
    if (!panel) return;

    const current = this.prompts[this.activePromptIndex];
    const textLower = studentText.toLowerCase().trim();

    if (textLower.length < 20) {
      alert("Please type a more comprehensive answer before requesting evaluation.");
      return;
    }

    // Keyword detection
    const foundKeywords = [];
    const missingKeywords = [];

    current.requiredKeywords.forEach(kw => {
      if (textLower.includes(kw.toLowerCase())) {
        foundKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });

    // Score calculations
    const keywordPct = Math.round((foundKeywords.length / current.requiredKeywords.length) * 100);
    const lengthScore = Math.min(100, Math.round((studentText.split(/\s+/).length / 45) * 100));
    const conceptAccuracy = Math.round((keywordPct * 0.7) + (lengthScore * 0.3));
    const structureScore = studentText.includes(".") && studentText.length > 100 ? 90 : 60;
    const overallScore = Math.round((conceptAccuracy * 0.4) + (keywordPct * 0.3) + (lengthScore * 0.15) + (structureScore * 0.15));

    if (overallScore >= 75) {
      window.soundApp.playChime("success");
      window.appState.addXP(50, "Technical writing answer passed");
    } else {
      window.soundApp.playChime("warn");
    }

    panel.style.display = "block";
    panel.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; border-bottom:1px solid var(--border-warm); padding-bottom:12px;">
        <div>
          <span style="font-size:0.8rem; font-weight:700; color:var(--rose-700); text-transform:uppercase;">AI Evaluation Rubric</span>
          <h4 style="font-size:1.6rem; font-weight:900; color:var(--text-primary); margin:2px 0;">
            Score: ${overallScore} <span style="font-size:1rem; font-weight:600; color:var(--text-muted);">/ 100</span>
          </h4>
        </div>
        <div style="text-align:right;">
          <span style="font-size:0.85rem; font-weight:700; color:${overallScore >= 75 ? 'var(--warm-emerald)' : 'var(--rose-600)'};">
            ${overallScore >= 85 ? '🌟 Exam Ready (A+ Grade)' : overallScore >= 70 ? '👍 Solid Effort (B+ Grade)' : '⚠️ Needs Revision'}
          </span>
        </div>
      </div>

      <!-- Breakdown Bars -->
      <div style="margin-bottom:18px;">
        <div class="score-progress-row">
          <span style="width:110px; font-weight:600;">Concept:</span>
          <div class="score-bar-mini"><div class="score-bar-mini-fill" style="width:${conceptAccuracy}%;"></div></div>
          <span style="font-weight:700; width:40px; text-align:right;">${conceptAccuracy}%</span>
        </div>
        <div class="score-progress-row">
          <span style="width:110px; font-weight:600;">Keywords:</span>
          <div class="score-bar-mini"><div class="score-bar-mini-fill" style="width:${keywordPct}%;"></div></div>
          <span style="font-weight:700; width:40px; text-align:right;">${keywordPct}%</span>
        </div>
        <div class="score-progress-row">
          <span style="width:110px; font-weight:600;">Completeness:</span>
          <div class="score-bar-mini"><div class="score-bar-mini-fill" style="width:${lengthScore}%;"></div></div>
          <span style="font-weight:700; width:40px; text-align:right;">${lengthScore}%</span>
        </div>
        <div class="score-progress-row">
          <span style="width:110px; font-weight:600;">Structure:</span>
          <div class="score-bar-mini"><div class="score-bar-mini-fill" style="width:${structureScore}%;"></div></div>
          <span style="font-weight:700; width:40px; text-align:right;">${structureScore}%</span>
        </div>
      </div>

      <!-- Missing Keywords -->
      <div style="margin-bottom:18px;">
        <span style="font-size:0.82rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:6px;">
          ${missingKeywords.length === 0 ? '✅ ALL ESSENTIAL KEYWORDS DETECTED!' : '⚠️ MISSING TECHNICAL KEYWORDS FOR 100/100:'}
        </span>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">
          ${missingKeywords.map(kw => `
            <span style="background:#fee2e2; color:#991b1b; padding:4px 10px; border-radius:var(--radius-full); font-size:0.8rem; font-weight:700; border:1px solid #fca5a5;">
              + ${kw}
            </span>
          `).join("")}
          ${foundKeywords.map(kw => `
            <span style="background:#ecfdf5; color:#065f46; padding:4px 10px; border-radius:var(--radius-full); font-size:0.8rem; font-weight:600; border:1px solid #a7f3d0;">
              ✓ ${kw}
            </span>
          `).join("")}
        </div>
      </div>

      <!-- Model Revision Recommendation -->
      <div style="background:var(--bg-surface); border:1px solid var(--border-warm); padding:14px; border-radius:var(--radius-sm); margin-bottom:14px;">
        <span style="font-size:0.8rem; font-weight:700; color:var(--rose-800); display:block; margin-bottom:4px;">
          📖 IDEAL MODEL REWRITE:
        </span>
        <p style="font-size:0.9rem; color:var(--text-primary); line-height:1.5;">${current.idealAnswer}</p>
      </div>

      <div style="display:flex; justify-content:flex-end;">
        <button class="btn btn-primary btn-sm" id="btn-rewrite-action">🔄 Revise and Rewrite Answer</button>
      </div>
    `;

    panel.querySelector("#btn-rewrite-action").addEventListener("click", () => {
      document.getElementById("wt-answer-input").focus();
      panel.scrollIntoView({ behavior: "smooth" });
    });
  }
}

window.writingTrainer = new TechnicalWritingTrainer();
