/* ==========================================================================
   INTERACTIVE-TOOLS.JS - Excel Runner, OSI Visualizer, PowerPoint Builder,
   and Economics Supply/Demand Canvas Simulation
   ========================================================================== */

class InteractiveToolsManager {
  constructor() {
    this.excelData = {
      A1: 45, B1: 80,
      A2: 60, B2: 95,
      A3: 35, B3: 70,
      A4: 90, B4: 85
    };
    this.demandShift = 0;
    this.supplyShift = 0;
    this.price = 50;
  }

  // -------------------------------------------------------------
  // 1. EXCEL FORMULA RUNNER
  // -------------------------------------------------------------
  renderExcelSimulator(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    el.innerHTML = `
      <div class="spreadsheet-simulator-box">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
          <h3 style="font-size:1rem; font-weight:800; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
            📊 Live Spreadsheet Formula Runner
          </h3>
          <span style="font-size:0.75rem; background:var(--rose-100); color:var(--rose-800); padding:2px 8px; border-radius:var(--radius-full); font-weight:700;">Unit 4 Tool</span>
        </div>

        <div class="spreadsheet-formula-bar">
          <span class="fx-label">fx</span>
          <input type="text" id="excel-formula-input" class="formula-input" value="=SUM(A1:B4)" placeholder="e.g. =SUM(A1:B4), =AVERAGE(A1:B2), =MAX(A1:B4)" />
          <button class="btn btn-primary btn-sm" id="btn-run-formula">Calculate</button>
        </div>

        <table class="excel-grid-table">
          <thead>
            <tr>
              <th style="width: 50px;">#</th>
              <th>A</th>
              <th>B</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td><input type="number" class="excel-cell-input" data-cell="A1" value="${this.excelData.A1}" /></td>
              <td><input type="number" class="excel-cell-input" data-cell="B1" value="${this.excelData.B1}" /></td>
            </tr>
            <tr>
              <th>2</th>
              <td><input type="number" class="excel-cell-input" data-cell="A2" value="${this.excelData.A2}" /></td>
              <td><input type="number" class="excel-cell-input" data-cell="B2" value="${this.excelData.B2}" /></td>
            </tr>
            <tr>
              <th>3</th>
              <td><input type="number" class="excel-cell-input" data-cell="A3" value="${this.excelData.A3}" /></td>
              <td><input type="number" class="excel-cell-input" data-cell="B3" value="${this.excelData.B3}" /></td>
            </tr>
            <tr>
              <th>4</th>
              <td><input type="number" class="excel-cell-input" data-cell="A4" value="${this.excelData.A4}" /></td>
              <td><input type="number" class="excel-cell-input" data-cell="B4" value="${this.excelData.B4}" /></td>
            </tr>
          </tbody>
        </table>

        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
          <div class="formula-quick-buttons">
            <button class="btn btn-secondary btn-sm quick-fx-btn" data-fx="=SUM(A1:B4)">=SUM()</button>
            <button class="btn btn-secondary btn-sm quick-fx-btn" data-fx="=AVERAGE(A1:B4)">=AVERAGE()</button>
            <button class="btn btn-secondary btn-sm quick-fx-btn" data-fx="=MAX(A1:B4)">=MAX()</button>
            <button class="btn btn-secondary btn-sm quick-fx-btn" data-fx="=MIN(A1:B4)">=MIN()</button>
            <button class="btn btn-secondary btn-sm quick-fx-btn" data-fx="=COUNT(A1:B4)">=COUNT()</button>
          </div>
          <div style="font-size:0.95rem; font-weight:800; color:var(--rose-700); background:var(--rose-100); padding:6px 14px; border-radius:var(--radius-sm);" id="excel-calc-result">
            Result: 560
          </div>
        </div>
      </div>
    `;

    // Bind events
    const formulaInput = el.querySelector("#excel-formula-input");
    const runBtn = el.querySelector("#btn-run-formula");
    const cellInputs = el.querySelectorAll(".excel-cell-input");
    const quickBtns = el.querySelectorAll(".quick-fx-btn");

    cellInputs.forEach(inp => {
      inp.addEventListener("input", (e) => {
        const cell = e.target.dataset.cell;
        this.excelData[cell] = parseFloat(e.target.value) || 0;
        this.evaluateExcelFormula(formulaInput.value);
      });
    });

    runBtn.addEventListener("click", () => {
      this.evaluateExcelFormula(formulaInput.value);
    });

    formulaInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.evaluateExcelFormula(formulaInput.value);
    });

    quickBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        formulaInput.value = btn.dataset.fx;
        this.evaluateExcelFormula(btn.dataset.fx);
      });
    });
  }

  evaluateExcelFormula(formula) {
    const resultEl = document.getElementById("excel-calc-result");
    if (!resultEl) return;

    const clean = formula.trim().toUpperCase();
    if (!clean.startsWith("=")) {
      resultEl.textContent = `Text: "${formula}" (Requires = to compute)`;
      return;
    }

    const match = clean.match(/^=(SUM|AVERAGE|MAX|MIN|COUNT)\((A[1-4]|B[1-4]):(A[1-4]|B[1-4])\)$/);
    if (!match) {
      resultEl.textContent = "Error: Invalid Syntax. Use =SUM(A1:B4)";
      window.soundApp.playChime("warn");
      return;
    }

    const [, func, startCell, endCell] = match;
    const values = this.getValuesInRange(startCell, endCell);

    let res = 0;
    switch (func) {
      case "SUM":
        res = values.reduce((a, b) => a + b, 0);
        break;
      case "AVERAGE":
        res = values.length ? Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 100) / 100 : 0;
        break;
      case "MAX":
        res = Math.max(...values);
        break;
      case "MIN":
        res = Math.min(...values);
        break;
      case "COUNT":
        res = values.length;
        break;
    }

    window.soundApp.playChime("success");
    resultEl.innerHTML = `Result: <strong>${res}</strong> <span style="font-size:0.75rem; color:var(--text-muted); font-weight:normal;">(${values.length} cells processed)</span>`;
  }

  getValuesInRange(start, end) {
    const col1 = start[0], row1 = parseInt(start[1]);
    const col2 = end[0], row2 = parseInt(end[1]);
    const cols = (col1 === col2) ? [col1] : ["A", "B"];
    const minRow = Math.min(row1, row2);
    const maxRow = Math.max(row1, row2);

    const vals = [];
    cols.forEach(c => {
      for (let r = minRow; r <= maxRow; r++) {
        const key = `${c}${r}`;
        if (this.excelData[key] !== undefined) {
          vals.push(this.excelData[key]);
        }
      }
    });
    return vals;
  }

  // -------------------------------------------------------------
  // 2. OSI 7-LAYER VISUALIZER
  // -------------------------------------------------------------
  renderOSIVisualizer(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const layers = window.INTERACTIVE_DATA.osiLayers;

    el.innerHTML = `
      <div class="glass-panel" style="padding:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div>
            <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-primary);">
              🌐 Interactive OSI 7-Layer Visualizer
            </h3>
            <p style="font-size:0.85rem; color:var(--text-muted);">Click each layer to explore its purpose, Bangla explanation, protocols, and exam questions.</p>
          </div>
          <span style="font-size:0.75rem; background:var(--rose-100); color:var(--rose-800); padding:3px 10px; border-radius:var(--radius-full); font-weight:700;">Unit 7 Protocol Stack</span>
        </div>

        <div class="osi-container">
          <div class="osi-layers-stack" id="osi-stack-list">
            ${layers.map((l, i) => `
              <div class="osi-layer-pill ${i === 0 ? 'active' : ''}" data-layer="${l.layerNum}">
                <span>${l.name}</span>
                <span class="osi-layer-num">L${l.layerNum}</span>
              </div>
            `).join("")}
          </div>

          <div class="osi-detail-card" id="osi-details-box">
            <!-- Will be populated dynamically -->
          </div>
        </div>
      </div>
    `;

    const stackItems = el.querySelectorAll(".osi-layer-pill");
    stackItems.forEach(item => {
      item.addEventListener("click", () => {
        stackItems.forEach(s => s.classList.remove("active"));
        item.classList.add("active");
        const layerNum = parseInt(item.dataset.layer);
        this.displayOSILayerDetails(layerNum);
        window.soundApp.playChime("click");
      });
    });

    this.displayOSILayerDetails(7);
  }

  displayOSILayerDetails(layerNum) {
    const box = document.getElementById("osi-details-box");
    if (!box) return;

    const data = window.INTERACTIVE_DATA.osiLayers.find(l => l.layerNum === layerNum);
    if (!data) return;

    box.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
        <h4 style="font-size:1.2rem; font-weight:800; color:var(--rose-700);">
          Layer ${data.layerNum}: ${data.name}
        </h4>
        <button class="btn btn-outline-rose btn-sm" id="btn-listen-osi" title="Read Aloud">🔊 Listen</button>
      </div>

      <div style="margin-bottom:12px; padding:10px 14px; background:var(--bg-main); border-left:3px solid var(--rose-600); border-radius:0 var(--radius-sm) var(--radius-sm) 0;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--rose-800); display:block; margin-bottom:4px;">🇧🇩 BANGLA EXPLANATION</span>
        <p style="font-size:0.92rem; color:var(--text-primary); font-family:'Hind Siliguri', sans-serif;">${data.bangla}</p>
      </div>

      <div style="margin-bottom:12px;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;">ENGLISH DEFINITION & ROLE</span>
        <p style="font-size:0.9rem; color:var(--text-primary);">${data.english}</p>
      </div>

      <div style="margin-bottom:12px;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;">KEY PROTOCOLS & HARDWARE</span>
        <code style="display:inline-block; background:var(--rose-100); color:var(--rose-900); padding:4px 10px; border-radius:var(--radius-sm); font-size:0.85rem; font-weight:600;">${data.protocols}</code>
      </div>

      <div style="margin-bottom:14px;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;">REAL-WORLD SCENARIO</span>
        <p style="font-size:0.88rem; color:var(--text-secondary); font-style:italic;">💡 ${data.example}</p>
      </div>

      <div style="background:var(--rose-50); border:1px dashed var(--border-warm); padding:12px; border-radius:var(--radius-sm);">
        <span style="font-size:0.75rem; font-weight:700; color:var(--rose-800); display:block; margin-bottom:4px;">🎯 EXPECTED EXAM QUESTION</span>
        <p style="font-size:0.88rem; font-weight:600; color:var(--text-primary);">${data.examQuestion}</p>
      </div>
    `;

    const listenBtn = box.querySelector("#btn-listen-osi");
    if (listenBtn) {
      listenBtn.addEventListener("click", () => {
        window.soundApp.speak(`Layer ${data.layerNum}: ${data.name}. ${data.english}. Protocols include ${data.protocols}`);
      });
    }
  }

  // -------------------------------------------------------------
  // 3. POWERPOINT SLIDE BUILDER SIMULATOR
  // -------------------------------------------------------------
  renderPowerPointBuilder(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    el.innerHTML = `
      <div class="ppt-builder-box">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h3 style="font-size:1.05rem; font-weight:800; color:var(--text-primary);">
            📽️ Interactive Presentation & Slide Transition Builder
          </h3>
          <span style="font-size:0.75rem; background:var(--rose-100); color:var(--rose-800); padding:3px 10px; border-radius:var(--radius-full); font-weight:700;">Unit 5 Tool</span>
        </div>

        <div class="ppt-stage" id="ppt-screen">
          <div class="ppt-slide-text" id="ppt-slide-content">
            Title: Mastering ICT & Economics 100/100
          </div>
        </div>

        <div class="ppt-controls-row">
          <div style="display:flex; align-items:center; gap:8px;">
            <label style="font-size:0.85rem; font-weight:600;">Transition Effect:</label>
            <select id="ppt-transition-select" class="btn btn-secondary btn-sm" style="background:var(--bg-surface); padding:6px 12px;">
              <option value="fade">Smooth Fade</option>
              <option value="zoom">Dynamic Zoom</option>
              <option value="slide">Slide Push</option>
              <option value="flip">3D Flip</option>
            </select>
          </div>

          <button class="btn btn-primary btn-sm" id="btn-trigger-ppt">▶ Play Slide Show</button>
          <button class="btn btn-secondary btn-sm" id="btn-next-ppt-slide">Next Slide ❯</button>
        </div>
      </div>
    `;

    const screen = el.querySelector("#ppt-screen");
    const content = el.querySelector("#ppt-slide-content");
    const select = el.querySelector("#ppt-transition-select");
    const playBtn = el.querySelector("#btn-trigger-ppt");
    const nextBtn = el.querySelector("#btn-next-ppt-slide");

    const sampleSlides = [
      "Title: Mastering ICT & Economics 100/100",
      "Point 1: Understand Concept in Bangla & English",
      "Point 2: Technical Keywords & Precision Writing",
      "Result: 100/100 Exam Readiness Achieved!"
    ];
    let slideIdx = 0;

    const playTransition = () => {
      const mode = select.value;
      content.style.opacity = "0";

      if (mode === "fade") {
        content.style.transform = "scale(1)";
      } else if (mode === "zoom") {
        content.style.transform = "scale(0.4)";
      } else if (mode === "slide") {
        content.style.transform = "translateX(100px)";
      } else if (mode === "flip") {
        content.style.transform = "rotateX(90deg)";
      }

      setTimeout(() => {
        content.style.transition = "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)";
        content.style.opacity = "1";
        content.style.transform = "none";
        window.soundApp.playChime("click");
      }, 150);
    };

    playBtn.addEventListener("click", playTransition);
    nextBtn.addEventListener("click", () => {
      slideIdx = (slideIdx + 1) % sampleSlides.length;
      content.textContent = sampleSlides[slideIdx];
      playTransition();
    });
  }

  // -------------------------------------------------------------
  // 4. ECONOMICS SUPPLY & DEMAND INTERACTIVE CURVE SIMULATOR
  // -------------------------------------------------------------
  renderSupplyDemandSimulator(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    el.innerHTML = `
      <div class="curve-simulator-box">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div>
            <h3 style="font-size:1.1rem; font-weight:800; color:var(--text-primary);">
              📈 Interactive Supply & Demand Equilibrium Simulator
            </h3>
            <p style="font-size:0.85rem; color:var(--text-muted);">Adjust demand & supply shift factors to see market equilibrium price (P*) and quantity (Q*) dynamically adjust.</p>
          </div>
          <span style="font-size:0.75rem; background:var(--rose-100); color:var(--rose-800); padding:3px 10px; border-radius:var(--radius-full); font-weight:700;">Topic 2 Simulator</span>
        </div>

        <div class="curve-canvas-wrapper">
          <canvas id="econ-curve-canvas" width="560" height="300" style="width:100%; height:100%; display:block;"></canvas>
        </div>

        <div class="curve-controls-grid">
          <div class="slider-control-group">
            <div style="display:flex; justify-content:space-between;">
              <label>Demand Curve Shift (D)</label>
              <span id="demand-val-lbl" style="font-weight:700; color:var(--rose-600);">0</span>
            </div>
            <input type="range" id="slider-demand" min="-40" max="40" value="0" />
            <span style="font-size:0.75rem; color:var(--text-muted);">Left (-): Tastes drop | Right (+): Consumer Income rises</span>
          </div>

          <div class="slider-control-group">
            <div style="display:flex; justify-content:space-between;">
              <label>Supply Curve Shift (S)</label>
              <span id="supply-val-lbl" style="font-weight:700; color:var(--rose-600);">0</span>
            </div>
            <input type="range" id="slider-supply" min="-40" max="40" value="0" />
            <span style="font-size:0.75rem; color:var(--text-muted);">Left (-): Input costs spike | Right (+): Technology breakthrough</span>
          </div>
        </div>

        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap; margin-top:16px;">
          <div class="equilibrium-display-pill" id="equilibrium-readout">
            Equilibrium Price (P*): $50.00 | Quantity (Q*): 50 Units
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-reset-econ">Reset Sliders</button>
        </div>
      </div>
    `;

    const canvas = el.querySelector("#econ-curve-canvas");
    const dSlider = el.querySelector("#slider-demand");
    const sSlider = el.querySelector("#slider-supply");
    const dLbl = el.querySelector("#demand-val-lbl");
    const sLbl = el.querySelector("#supply-val-lbl");
    const readout = el.querySelector("#equilibrium-readout");
    const resetBtn = el.querySelector("#btn-reset-econ");

    const drawCurve = () => {
      const ctx = canvas.getContext("2d");
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Draw Grid / Axes
      ctx.strokeStyle = "rgba(225, 29, 72, 0.15)";
      ctx.lineWidth = 1;

      // X and Y Axes
      ctx.beginPath();
      ctx.moveTo(50, 20);
      ctx.lineTo(50, h - 40);
      ctx.lineTo(w - 20, h - 40);
      ctx.stroke();

      // Axis Labels
      ctx.fillStyle = "#6b434e";
      ctx.font = "bold 12px Outfit, sans-serif";
      ctx.fillText("Price (P)", 10, 30);
      ctx.fillText("Quantity (Q)", w - 75, h - 15);

      const dShift = parseInt(dSlider.value);
      const sShift = parseInt(sSlider.value);
      dLbl.textContent = (dShift > 0 ? "+" : "") + dShift;
      sLbl.textContent = (sShift > 0 ? "+" : "") + sShift;

      // Demand curve: Downward sloping
      // Baseline: (70, 40) to (w - 70, h - 60)
      const dX1 = 70 + dShift * 1.5;
      const dY1 = 40;
      const dX2 = w - 70 + dShift * 1.5;
      const dY2 = h - 60;

      ctx.strokeStyle = "#e11d48"; // Rose Primary for Demand
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(dX1, dY1);
      ctx.lineTo(dX2, dY2);
      ctx.stroke();

      ctx.fillStyle = "#e11d48";
      ctx.fillText("Demand (D)", dX2 - 40, dY2 - 8);

      // Supply curve: Upward sloping
      // Baseline: (70, h - 60) to (w - 70, 40)
      const sX1 = 70 + sShift * 1.5;
      const sY1 = h - 60;
      const sX2 = w - 70 + sShift * 1.5;
      const sY2 = 40;

      ctx.strokeStyle = "#059669"; // Emerald for Supply
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(sX1, sY1);
      ctx.lineTo(sX2, sY2);
      ctx.stroke();

      ctx.fillStyle = "#059669";
      ctx.fillText("Supply (S)", sX2 - 30, sY2 - 8);

      // Calculate approximate equilibrium intersection
      // D line: y - dY1 = ((dY2 - dY1) / (dX2 - dX1)) * (x - dX1)
      // S line: y - sY1 = ((sY2 - sY1) / (sX2 - sX1)) * (x - sX1)
      const mD = (dY2 - dY1) / (dX2 - dX1);
      const mS = (sY2 - sY1) / (sX2 - sX1);

      // Equil X
      const eqX = (sY1 - dY1 + mD * dX1 - mS * sX1) / (mD - mS);
      const eqY = dY1 + mD * (eqX - dX1);

      if (eqX >= 50 && eqX <= w - 20 && eqY >= 20 && eqY <= h - 40) {
        // Dashed lines to axes
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = "#9c737d";
        ctx.lineWidth = 1.5;

        // Line to P axis
        ctx.beginPath();
        ctx.moveTo(eqX, eqY);
        ctx.lineTo(50, eqY);
        ctx.stroke();

        // Line to Q axis
        ctx.beginPath();
        ctx.moveTo(eqX, eqY);
        ctx.lineTo(eqX, h - 40);
        ctx.stroke();

        ctx.setLineDash([]); // Reset dash

        // Equilibrium point marker
        ctx.fillStyle = "#be123c";
        ctx.beginPath();
        ctx.arc(eqX, eqY, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#3b111e";
        ctx.font = "bold 13px Outfit, sans-serif";
        ctx.fillText("E*", eqX + 8, eqY - 8);

        // Convert coordinates to realistic economic values
        const calcP = Math.round((((h - 40) - eqY) / (h - 60)) * 100);
        const calcQ = Math.round(((eqX - 50) / (w - 70)) * 100);

        readout.innerHTML = `Equilibrium Price (P*): <strong>$${calcP}.00</strong> &nbsp;|&nbsp; Quantity (Q*): <strong>${calcQ} Units</strong>`;
      }
    };

    dSlider.addEventListener("input", drawCurve);
    sSlider.addEventListener("input", drawCurve);

    resetBtn.addEventListener("click", () => {
      dSlider.value = 0;
      sSlider.value = 0;
      drawCurve();
    });

    drawCurve();
  }

  // -------------------------------------------------------------
  // 5. CYBER ATTACK / DEFENSE SCENARIOS
  // -------------------------------------------------------------
  renderScenarioGame(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const scenarios = window.INTERACTIVE_DATA.scenarios;

    el.innerHTML = `
      <div class="glass-panel" style="padding:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <div>
            <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-primary);">
              🛡️ Interactive Cyber Attack & Defense Simulator
            </h3>
            <p style="font-size:0.85rem; color:var(--text-muted);">Test your real-time response to phishing attacks and distributed DDoS sieges.</p>
          </div>
          <span style="font-size:0.75rem; background:var(--rose-100); color:var(--rose-800); padding:3px 10px; border-radius:var(--radius-full); font-weight:700;">Unit 6 Simulation</span>
        </div>

        <div style="display:flex; gap:10px; margin-bottom:16px;">
          ${scenarios.map((sc, i) => `
            <button class="btn btn-sm ${i === 0 ? 'btn-primary' : 'btn-secondary'} sc-tab-btn" data-index="${i}">
              Scenario ${i + 1}: ${sc.title}
            </button>
          `).join("")}
        </div>

        <div id="scenario-content-stage"></div>
      </div>
    `;

    const tabs = el.querySelectorAll(".sc-tab-btn");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => {
          t.classList.remove("btn-primary");
          t.classList.add("btn-secondary");
        });
        tab.classList.remove("btn-secondary");
        tab.classList.add("btn-primary");
        const idx = parseInt(tab.dataset.index);
        this.displayScenario(idx);
      });
    });

    this.displayScenario(0);
  }

  displayScenario(idx) {
    const stage = document.getElementById("scenario-content-stage");
    if (!stage) return;

    const sc = window.INTERACTIVE_DATA.scenarios[idx];
    if (!sc) return;

    stage.innerHTML = `
      <div class="scenario-box">
        <span class="scenario-badge">🚨 THREAT INCIDENT: ${sc.title}</span>
        <p style="font-size:1rem; font-weight:600; color:var(--text-primary); margin-bottom:18px; line-height:1.5;">
          ${sc.scenarioText}
        </p>

        <div style="display:flex; flex-direction:column; gap:10px;" id="sc-options-group">
          ${sc.choices.map((c, i) => `
            <button class="mcq-option-btn sc-choice-btn" data-correct="${c.correct}" data-feedback="${encodeURIComponent(c.feedback)}">
              <span style="font-weight:700; color:var(--rose-700);">${String.fromCharCode(65 + i)}.</span>
              <span>${c.text}</span>
            </button>
          `).join("")}
        </div>

        <div id="sc-feedback-box" class="mcq-feedback-box" style="margin-top:16px;"></div>
      </div>
    `;

    const choiceBtns = stage.querySelectorAll(".sc-choice-btn");
    const fbBox = stage.querySelector("#sc-feedback-box");

    choiceBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const isCorrect = btn.dataset.correct === "true";
        const feedback = decodeURIComponent(btn.dataset.feedback);

        choiceBtns.forEach(b => {
          b.disabled = true;
          if (b.dataset.correct === "true") b.classList.add("correct");
        });

        if (isCorrect) {
          btn.classList.add("correct");
          fbBox.style.display = "block";
          fbBox.style.background = "#ecfdf5";
          fbBox.style.border = "1px solid #10b981";
          fbBox.style.color = "#065f46";
          fbBox.innerHTML = `<strong>✅ THREAT MITIGATED!</strong> ${feedback}`;
          window.soundApp.playChime("success");
          window.appState.addXP(30, "Scenario solved");
        } else {
          btn.classList.add("incorrect");
          fbBox.style.display = "block";
          fbBox.style.background = "#fef2f2";
          fbBox.style.border = "1px solid #ef4444";
          fbBox.style.color = "#991b1b";
          fbBox.innerHTML = `<strong>❌ SYSTEM COMPROMISED!</strong> ${feedback}`;
          window.soundApp.playChime("warn");
        }
      });
    });
  }
}

window.interactiveTools = new InteractiveToolsManager();
