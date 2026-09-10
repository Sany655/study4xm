import React from 'react';

/**
 * VisualDiagramViewer - High-fidelity responsive SVG diagram & curve visualizer
 * Adapts seamlessly across light and dark modes using CSS variables.
 */
export default function VisualDiagramViewer({ type, title, subtitle }) {
  const renderDiagram = () => {
    switch (type) {
      // -------------------------------------------------------------
      // ECONOMICS: Production Possibility Curve (PPC / PPF)
      // -------------------------------------------------------------
      case 'ppc':
        return (
          <svg viewBox="0 0 500 320" className="visual-svg-canvas">
            <defs>
              <linearGradient id="ppcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--rose-500)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--rose-500)" stopOpacity="0.03" />
              </linearGradient>
            </defs>

            {/* Axes */}
            <line x1="60" y1="260" x2="450" y2="260" stroke="var(--border-strong)" strokeWidth="2.5" />
            <line x1="60" y1="260" x2="60" y2="40" stroke="var(--border-strong)" strokeWidth="2.5" />

            {/* Axis Labels */}
            <text x="440" y="290" fill="var(--text-primary)" fontSize="13" fontWeight="bold" textAnchor="end">কৃষি পণ্য / পণ্য X (Units of X)</text>
            <text x="70" y="35" fill="var(--text-primary)" fontSize="13" fontWeight="bold" textAnchor="start">শিল্প পণ্য / পণ্য Y (Units of Y)</text>
            <text x="45" y="275" fill="var(--text-muted)" fontSize="12">O</text>

            {/* PPC Shaded Area under curve */}
            <path d="M 60 70 Q 230 110 410 260 L 60 260 Z" fill="url(#ppcGradient)" />

            {/* PPC Curve */}
            <path d="M 60 70 Q 230 110 410 260" fill="none" stroke="var(--rose-600)" strokeWidth="3.5" />
            <text x="415" y="250" fill="var(--rose-700)" fontSize="13" fontWeight="bold">PPC</text>

            {/* Key Points */}
            {/* Point A (Top) */}
            <circle cx="120" cy="98" r="5" fill="#10b981" />
            <text x="130" y="95" fill="var(--text-primary)" fontSize="12" fontWeight="bold">A (দক্ষ নিয়োগ)</text>

            {/* Point B (Middle) */}
            <circle cx="260" cy="145" r="5" fill="#10b981" />
            <text x="270" y="142" fill="var(--text-primary)" fontSize="12" fontWeight="bold">B (পূর্ণ নিয়োগ ও দক্ষতা)</text>

            {/* Point C (Inside - Inefficient) */}
            <circle cx="160" cy="200" r="5" fill="#f59e0b" />
            <text x="170" y="205" fill="#d97706" fontSize="12" fontWeight="bold">C (অদক্ষতা / বেকারত্ব)</text>

            {/* Point D (Outside - Unattainable) */}
            <circle cx="370" cy="85" r="5" fill="#ef4444" />
            <text x="310" y="75" fill="#dc2626" fontSize="12" fontWeight="bold">D (অপ্রাপ্য অঞ্চল - Scarcity)</text>

            {/* Explanatory Annotations */}
            <rect x="75" y="215" width="220" height="35" rx="5" fill="var(--bg-card)" stroke="var(--border-subtle)" strokeWidth="1" />
            <text x="85" y="235" fill="var(--text-secondary)" fontSize="10">MRT = ΔY / ΔX (ক্রমবর্ধমান সুযোগ ব্যয়)</text>
          </svg>
        );

      // -------------------------------------------------------------
      // ECONOMICS: Supply and Demand Market Equilibrium
      // -------------------------------------------------------------
      case 'demand_supply':
        return (
          <svg viewBox="0 0 500 320" className="visual-svg-canvas">
            {/* Axes */}
            <line x1="60" y1="260" x2="450" y2="260" stroke="var(--border-strong)" strokeWidth="2.5" />
            <line x1="60" y1="260" x2="60" y2="40" stroke="var(--border-strong)" strokeWidth="2.5" />

            {/* Labels */}
            <text x="440" y="290" fill="var(--text-primary)" fontSize="13" fontWeight="bold" textAnchor="end">পরিমাণ (Quantity - Q)</text>
            <text x="70" y="35" fill="var(--text-primary)" fontSize="13" fontWeight="bold">দাম (Price - P)</text>

            {/* Surplus Region (Above Equilibrium) */}
            <polygon points="120,95 240,150 360,95" fill="rgba(239, 68, 68, 0.15)" />
            <text x="240" y="115" fill="#dc2626" fontSize="11" fontWeight="bold" textAnchor="middle">উদ্বৃত্ত (Surplus / Excess Supply: P &gt; Pe)</text>

            {/* Shortage Region (Below Equilibrium) */}
            <polygon points="175,185 240,150 305,185" fill="rgba(245, 158, 11, 0.15)" />
            <text x="240" y="180" fill="#d97706" fontSize="11" fontWeight="bold" textAnchor="middle">ঘাটতি (Shortage / Excess Demand: P &lt; Pe)</text>

            {/* Demand Curve (Downward Sloping) */}
            <line x1="100" y1="80" x2="380" y2="240" stroke="#ef4444" strokeWidth="3.5" />
            <text x="390" y="245" fill="#dc2626" fontSize="13" fontWeight="bold">D (চাহিদা রেখা)</text>

            {/* Supply Curve (Upward Sloping) */}
            <line x1="100" y1="240" x2="380" y2="80" stroke="#10b981" strokeWidth="3.5" />
            <text x="390" y="85" fill="#059669" fontSize="13" fontWeight="bold">S (যোগান রেখা)</text>

            {/* Equilibrium Point E */}
            <circle cx="240" cy="160" r="6" fill="var(--rose-600)" />
            <text x="252" y="155" fill="var(--rose-700)" fontSize="13" fontWeight="900">E (ভারসাম্য বিন্দু: Qd = Qs)</text>

            {/* Dashed lines to axes */}
            <line x1="60" y1="160" x2="240" y2="160" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="4,4" />
            <text x="35" y="165" fill="var(--rose-700)" fontSize="12" fontWeight="bold">Pe</text>

            <line x1="240" y1="160" x2="240" y2="260" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="4,4" />
            <text x="235" y="280" fill="var(--rose-700)" fontSize="12" fontWeight="bold">Qe</text>
          </svg>
        );

      // -------------------------------------------------------------
      // ECONOMICS: Law of Diminishing Marginal Utility (TU & MU)
      // -------------------------------------------------------------
      case 'utility':
        return (
          <svg viewBox="0 0 500 320" className="visual-svg-canvas">
            {/* Horizontal Axis & Zero Line */}
            <line x1="60" y1="210" x2="450" y2="210" stroke="var(--border-strong)" strokeWidth="2" />
            <line x1="60" y1="290" x2="60" y2="30" stroke="var(--border-strong)" strokeWidth="2" />

            {/* Labels */}
            <text x="440" y="240" fill="var(--text-primary)" fontSize="12" fontWeight="bold" textAnchor="end">ভোগের একক (Quantity Consumed - Q)</text>
            <text x="70" y="28" fill="var(--text-primary)" fontSize="12" fontWeight="bold">উপযোগ (Utility - Utils)</text>

            {/* TU Curve (Rises, peaks, declines) */}
            <path d="M 60 190 Q 200 50 320 60 Q 380 75 420 130" fill="none" stroke="#2563eb" strokeWidth="3.5" />
            <text x="425" y="130" fill="#2563eb" fontSize="12" fontWeight="bold">TU (মোট উপযোগ)</text>

            {/* TU Peak point (Satiety Point) */}
            <circle cx="320" cy="60" r="5" fill="#2563eb" />
            <text x="260" y="45" fill="#1d4ed8" fontSize="11" fontWeight="bold">TU সর্বোচ্চ (Maximum Point)</text>

            {/* MU Curve (Declines, crosses zero at peak TU, becomes negative) */}
            <path d="M 70 80 L 320 210 L 420 270" fill="none" stroke="#dc2626" strokeWidth="3.5" />
            <text x="425" y="275" fill="#dc2626" fontSize="12" fontWeight="bold">MU (প্রান্তিক উপযোগ)</text>

            {/* Zero MU Point */}
            <circle cx="320" cy="210" r="5" fill="#dc2626" />
            <text x="330" y="200" fill="#dc2626" fontSize="11" fontWeight="bold">তৃপ্তির পূর্ণ বিন্দু (MU = 0)</text>

            {/* Vertical guide line between TU max and MU = 0 */}
            <line x1="320" y1="60" x2="320" y2="210" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="4,4" />

            {/* Negative region label */}
            <rect x="335" y="230" width="105" height="26" rx="4" fill="rgba(239, 68, 68, 0.15)" />
            <text x="340" y="247" fill="#b91c1c" fontSize="10" fontWeight="bold">ঋণাত্মক উপযোগ (MU &lt; 0)</text>
          </svg>
        );

      // -------------------------------------------------------------
      // ECONOMICS: Short-run Cost Curves (AC, AVC, AFC, MC)
      // -------------------------------------------------------------
      case 'cost_curves':
        return (
          <svg viewBox="0 0 500 320" className="visual-svg-canvas">
            {/* Axes */}
            <line x1="60" y1="270" x2="450" y2="270" stroke="var(--border-strong)" strokeWidth="2.5" />
            <line x1="60" y1="270" x2="60" y2="35" stroke="var(--border-strong)" strokeWidth="2.5" />

            <text x="440" y="295" fill="var(--text-primary)" fontSize="12" fontWeight="bold" textAnchor="end">উৎপাদনের পরিমাণ (Output - Q)</text>
            <text x="70" y="30" fill="var(--text-primary)" fontSize="12" fontWeight="bold">ব্যয় (Cost in ৳)</text>

            {/* AFC (Rectangular hyperbola) */}
            <path d="M 80 120 Q 140 220 400 255" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeDasharray="5,3" />
            <text x="405" y="260" fill="#6b7280" fontSize="11" fontWeight="bold">AFC (অবিরাম হ্রাস)</text>

            {/* AVC (U-shaped) */}
            <path d="M 80 180 Q 210 230 400 130" fill="none" stroke="#f59e0b" strokeWidth="3" />
            <text x="405" y="130" fill="#d97706" fontSize="11" fontWeight="bold">AVC</text>

            {/* AC / ATC (U-shaped, above AVC) */}
            <path d="M 80 100 Q 240 180 400 70" fill="none" stroke="#2563eb" strokeWidth="3.5" />
            <text x="405" y="70" fill="#2563eb" fontSize="12" fontWeight="bold">AC / ATC (গড় ব্যয়)</text>

            {/* MC (Cuts AVC and AC at minimum points) */}
            <path d="M 90 230 Q 180 235 240 180 Q 300 110 380 40" fill="none" stroke="#dc2626" strokeWidth="3.5" />
            <text x="385" y="45" fill="#dc2626" fontSize="12" fontWeight="bold">MC (প্রান্তিক ব্যয়)</text>

            {/* Intersections at minimum AC */}
            <circle cx="240" cy="180" r="5" fill="#dc2626" />
            <text x="210" y="165" fill="var(--text-primary)" fontSize="10" fontWeight="bold">MC = AC সর্বনিম্ন</text>
          </svg>
        );

      // -------------------------------------------------------------
      // ECONOMICS: Perfect Competition vs Monopoly Market Structure
      // -------------------------------------------------------------
      case 'market_structure':
        return (
          <svg viewBox="0 0 500 320" className="visual-svg-canvas">
            {/* Panel 1: Perfect Competition (Left) */}
            <g transform="translate(0, 0)">
              <text x="140" y="30" fill="var(--rose-700)" fontSize="13" fontWeight="bold" textAnchor="middle">১. পূর্ণ প্রতিযোগিতা (Price Taker)</text>
              <line x1="40" y1="240" x2="230" y2="240" stroke="var(--border-strong)" strokeWidth="2" />
              <line x1="40" y1="240" x2="40" y2="50" stroke="var(--border-strong)" strokeWidth="2" />
              <text x="220" y="260" fill="var(--text-muted)" fontSize="10">Q</text>
              <text x="45" y="45" fill="var(--text-muted)" fontSize="10">P</text>

              {/* Perfectly horizontal demand curve P = AR = MR */}
              <line x1="40" y1="120" x2="220" y2="120" stroke="#10b981" strokeWidth="3" />
              <text x="120" y="110" fill="#059669" fontSize="11" fontWeight="bold">P = AR = MR (স্থির দাম)</text>

              {/* U-shaped AC */}
              <path d="M 55 90 Q 130 150 205 90" fill="none" stroke="#2563eb" strokeWidth="2.5" />
              <text x="208" y="90" fill="#2563eb" fontSize="10">AC</text>

              {/* MC intersecting AC min */}
              <path d="M 70 170 Q 110 160 170 65" fill="none" stroke="#dc2626" strokeWidth="2.5" />
              <text x="175" y="65" fill="#dc2626" fontSize="10">MC</text>
              <circle cx="130" cy="120" r="4" fill="var(--rose-600)" />
              <text x="80" y="140" fill="var(--rose-700)" fontSize="10" fontWeight="bold">E (MR = MC = P)</text>
            </g>

            {/* Panel 2: Monopoly (Right) */}
            <g transform="translate(250, 0)">
              <text x="130" y="30" fill="var(--rose-700)" fontSize="13" fontWeight="bold" textAnchor="middle">২. একচেটিয়া বাজার (Price Maker)</text>
              <line x1="30" y1="240" x2="220" y2="240" stroke="var(--border-strong)" strokeWidth="2" />
              <line x1="30" y1="240" x2="30" y2="50" stroke="var(--border-strong)" strokeWidth="2" />
              <text x="210" y="260" fill="var(--text-muted)" fontSize="10">Q</text>
              <text x="35" y="45" fill="var(--text-muted)" fontSize="10">P</text>

              {/* Downward sloping AR and MR */}
              <line x1="40" y1="70" x2="200" y2="190" stroke="#2563eb" strokeWidth="3" />
              <text x="205" y="195" fill="#2563eb" fontSize="11" fontWeight="bold">AR = P</text>

              <line x1="40" y1="70" x2="140" y2="230" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="145" y="235" fill="#d97706" fontSize="11" fontWeight="bold">MR</text>

              {/* MC curve */}
              <path d="M 45 190 Q 75 160 120 75" fill="none" stroke="#dc2626" strokeWidth="2.5" />
              <text x="125" y="75" fill="#dc2626" fontSize="10">MC</text>

              {/* Equilibrium MR = MC */}
              <circle cx="85" cy="140" r="4" fill="#dc2626" />
              <line x1="85" y1="140" x2="85" y2="105" stroke="var(--text-muted)" strokeDasharray="3,3" />
              <circle cx="85" cy="105" r="4" fill="#10b981" />
              <text x="92" y="105" fill="#059669" fontSize="10" fontWeight="bold">Monopoly Price (Pm &gt; MC)</text>
            </g>
          </svg>
        );

      // -------------------------------------------------------------
      // ECONOMICS: Ragnar Nurkse's Vicious Circle of Poverty
      // -------------------------------------------------------------
      case 'nurkse_poverty':
        return (
          <svg viewBox="0 0 500 320" className="visual-svg-canvas">
            <text x="250" y="28" fill="var(--rose-700)" fontSize="13" fontWeight="bold" textAnchor="middle">অধ্যাপক রাগনার নার্কসের দারিদ্র্যের দুষ্টচক্র (Vicious Circle of Poverty)</text>

            {/* Left Circle: Supply Side */}
            <g transform="translate(40, 40)">
              <rect x="0" y="0" width="190" height="240" rx="10" fill="var(--bg-card)" stroke="var(--rose-400)" strokeWidth="1.5" />
              <text x="95" y="25" fill="#b91c1c" fontSize="12" fontWeight="bold" textAnchor="middle">যোগান দিক (Supply Side)</text>

              <rect x="25" y="45" width="140" height="30" rx="5" fill="#fee2e2" />
              <text x="95" y="65" fill="#991b1b" fontSize="11" fontWeight="bold" textAnchor="middle">১. স্বল্প উৎপাদনশীলতা</text>
              <text x="95" y="88" fill="var(--text-muted)" fontSize="12" textAnchor="middle">⬇</text>

              <rect x="25" y="95" width="140" height="30" rx="5" fill="#fef3c7" />
              <text x="95" y="115" fill="#92400e" fontSize="11" fontWeight="bold" textAnchor="middle">২. মাথাপিছু স্বল্প আয়</text>
              <text x="95" y="138" fill="var(--text-muted)" fontSize="12" textAnchor="middle">⬇</text>

              <rect x="25" y="145" width="140" height="30" rx="5" fill="#e0e7ff" />
              <text x="95" y="165" fill="#3730a3" fontSize="11" fontWeight="bold" textAnchor="middle">৩. স্বল্প সঞ্চয় ক্ষমতা</text>
              <text x="95" y="188" fill="var(--text-muted)" fontSize="12" textAnchor="middle">⬇</text>

              <rect x="25" y="195" width="140" height="30" rx="5" fill="#d1fae5" />
              <text x="95" y="215" fill="#065f46" fontSize="11" fontWeight="bold" textAnchor="middle">৪. স্বল্প মূলধন গঠন</text>
            </g>

            {/* Right Circle: Demand Side */}
            <g transform="translate(270, 40)">
              <rect x="0" y="0" width="190" height="240" rx="10" fill="var(--bg-card)" stroke="var(--blue-400, #60a5fa)" strokeWidth="1.5" />
              <text x="95" y="25" fill="#1d4ed8" fontSize="12" fontWeight="bold" textAnchor="middle">চাহিদা দিক (Demand Side)</text>

              <rect x="25" y="45" width="140" height="30" rx="5" fill="#fef3c7" />
              <text x="95" y="65" fill="#92400e" fontSize="11" fontWeight="bold" textAnchor="middle">১. মাথাপিছু স্বল্প আয়</text>
              <text x="95" y="88" fill="var(--text-muted)" fontSize="12" textAnchor="middle">⬇</text>

              <rect x="25" y="95" width="140" height="30" rx="5" fill="#fce7f3" />
              <text x="95" y="115" fill="#831843" fontSize="11" fontWeight="bold" textAnchor="middle">২. ক্রয়ক্ষমতা ও বাজারের ক্ষুদ্রতা</text>
              <text x="95" y="138" fill="var(--text-muted)" fontSize="12" textAnchor="middle">⬇</text>

              <rect x="25" y="145" width="140" height="30" rx="5" fill="#fee2e2" />
              <text x="95" y="165" fill="#991b1b" fontSize="11" fontWeight="bold" textAnchor="middle">৩. স্বল্প বিনিয়োগ আগ্রহ</text>
              <text x="95" y="188" fill="var(--text-muted)" fontSize="12" textAnchor="middle">⬇</text>

              <rect x="25" y="195" width="140" height="30" rx="5" fill="#d1fae5" />
              <text x="95" y="215" fill="#065f46" fontSize="11" fontWeight="bold" textAnchor="middle">৪. মূলধনের অপ্রতুলতা</text>
            </g>

            {/* Bottom Quote */}
            <text x="250" y="305" fill="var(--text-secondary)" fontSize="11" fontStyle="italic" textAnchor="middle">
              "একটি দেশ দরিদ্র কারণ সে দরিদ্র (A country is poor because it is poor)" — Ragnar Nurkse
            </text>
          </svg>
        );

      // -------------------------------------------------------------
      // ICT: IPOS Information Processing Cycle
      // -------------------------------------------------------------
      case 'ipos_cycle':
        return (
          <svg viewBox="0 0 500 280" className="visual-svg-canvas">
            <text x="250" y="25" fill="var(--rose-700)" fontSize="13" fontWeight="bold" textAnchor="middle">কম্পিউটার তথ্য প্রক্রিয়াকরণ চক্র (IPOS Cycle)</text>

            {/* Input Box */}
            <rect x="20" y="60" width="110" height="70" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
            <text x="75" y="90" fill="#1e40af" fontSize="13" fontWeight="bold" textAnchor="middle">ইনপুট (Input)</text>
            <text x="75" y="110" fill="#1e3a8a" fontSize="10" textAnchor="middle">কীবোর্ড, মাউস, স্ক্যানার</text>

            <line x1="130" y1="95" x2="175" y2="95" stroke="var(--border-strong)" strokeWidth="3" />

            {/* Processing (CPU) Box */}
            <rect x="180" y="45" width="140" height="100" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5" />
            <text x="250" y="70" fill="#b45309" fontSize="13" fontWeight="bold" textAnchor="middle">সিপিইউ (Processing)</text>
            <rect x="195" y="80" width="110" height="25" rx="4" fill="#ffffff" stroke="#fcd34d" />
            <text x="250" y="97" fill="#78350f" fontSize="10" fontWeight="bold" textAnchor="middle">কন্ট্রোল ইউনিট (CU)</text>
            <rect x="195" y="110" width="110" height="25" rx="4" fill="#ffffff" stroke="#fcd34d" />
            <text x="250" y="127" fill="#78350f" fontSize="10" fontWeight="bold" textAnchor="middle">অ্যারিথমেটিক ইউনিট (ALU)</text>

            <line x1="320" y1="95" x2="365" y2="95" stroke="var(--border-strong)" strokeWidth="3" />

            {/* Output Box */}
            <rect x="370" y="60" width="110" height="70" rx="8" fill="#dcfce7" stroke="#10b981" strokeWidth="2" />
            <text x="425" y="90" fill="#065f46" fontSize="13" fontWeight="bold" textAnchor="middle">আউটপুট (Output)</text>
            <text x="425" y="110" fill="#064e3b" fontSize="10" textAnchor="middle">মনিটর, প্রিন্টার, স্পিকার</text>

            {/* Bi-directional Storage connection */}
            <line x1="250" y1="145" x2="250" y2="185" stroke="var(--border-strong)" strokeWidth="3" />
            <rect x="180" y="190" width="140" height="65" rx="8" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" />
            <text x="250" y="218" fill="#6b21a8" fontSize="13" fontWeight="bold" textAnchor="middle">স্টোরেজ (Storage)</text>
            <text x="250" y="238" fill="#581c87" fontSize="10" textAnchor="middle">SSD, HDD, RAM, Cloud</text>
          </svg>
        );

      // -------------------------------------------------------------
      // ICT: OSI 7-Layer vs TCP/IP Protocol Stack
      // -------------------------------------------------------------
      case 'osi_stack':
        return (
          <svg viewBox="0 0 500 320" className="visual-svg-canvas">
            <text x="140" y="25" fill="var(--rose-700)" fontSize="13" fontWeight="bold" textAnchor="middle">OSI ৭-লেয়ার মডেল</text>
            <text x="370" y="25" fill="var(--rose-700)" fontSize="13" fontWeight="bold" textAnchor="middle">TCP/IP ৪-লেয়ার মডেল</text>

            {/* OSI Layers (Left) */}
            <g transform="translate(30, 40)">
              <rect x="0" y="0" width="220" height="30" rx="4" fill="#fee2e2" stroke="#ef4444" />
              <text x="110" y="20" fill="#991b1b" fontSize="11" fontWeight="bold" textAnchor="middle">৭. অ্যাপ্লিকেশন (HTTP, DNS)</text>

              <rect x="0" y="35" width="220" height="30" rx="4" fill="#fef3c7" stroke="#f59e0b" />
              <text x="110" y="55" fill="#92400e" fontSize="11" fontWeight="bold" textAnchor="middle">৬. প্রেজেন্টেশন (SSL, JPEG)</text>

              <rect x="0" y="70" width="220" height="30" rx="4" fill="#fef9c3" stroke="#eab308" />
              <text x="110" y="90" fill="#854d0e" fontSize="11" fontWeight="bold" textAnchor="middle">৫. সেশন (RPC, NetBIOS)</text>

              <rect x="0" y="105" width="220" height="30" rx="4" fill="#d1fae5" stroke="#10b981" />
              <text x="110" y="125" fill="#065f46" fontSize="11" fontWeight="bold" textAnchor="middle">৪. ট্রান্সপোর্ট (TCP, UDP)</text>

              <rect x="0" y="140" width="220" height="30" rx="4" fill="#e0e7ff" stroke="#6366f1" />
              <text x="110" y="160" fill="#3730a3" fontSize="11" fontWeight="bold" textAnchor="middle">৩. নেটওয়ার্ক (IPv4, IPv6, Router)</text>

              <rect x="0" y="175" width="220" height="30" rx="4" fill="#ede9fe" stroke="#8b5cf6" />
              <text x="110" y="195" fill="#5b21b6" fontSize="11" fontWeight="bold" textAnchor="middle">২. ডেটা লিংক (MAC, Switch)</text>

              <rect x="0" y="210" width="220" height="30" rx="4" fill="#f1f5f9" stroke="#94a3b8" />
              <text x="110" y="230" fill="#334155" fontSize="11" fontWeight="bold" textAnchor="middle">১. ফিজিক্যাল (Cable, Bits)</text>
            </g>

            {/* TCP/IP Layers (Right) */}
            <g transform="translate(280, 40)">
              {/* Application Layer (Combines 7,6,5) */}
              <rect x="0" y="0" width="190" height="100" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
              <text x="95" y="45" fill="#991b1b" fontSize="12" fontWeight="bold" textAnchor="middle">১. অ্যাপ্লিকেশন লেয়ার</text>
              <text x="95" y="65" fill="#7f1d1d" fontSize="10" textAnchor="middle">(HTTP, FTP, SMTP, DNS)</text>

              {/* Transport Layer (Layer 4) */}
              <rect x="0" y="105" width="190" height="30" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
              <text x="95" y="125" fill="#065f46" fontSize="11" fontWeight="bold" textAnchor="middle">২. ট্রান্সপোর্ট লেয়ার (TCP/UDP)</text>

              {/* Internet Layer (Layer 3) */}
              <rect x="0" y="140" width="190" height="30" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
              <text x="95" y="160" fill="#3730a3" fontSize="11" fontWeight="bold" textAnchor="middle">৩. ইন্টারনেট লেয়ার (IP, ICMP)</text>

              {/* Network Access Layer (Layers 2 & 1) */}
              <rect x="0" y="175" width="190" height="65" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
              <text x="95" y="205" fill="#334155" fontSize="11" fontWeight="bold" textAnchor="middle">৪. নেটওয়ার্ক এক্সেস লেয়ার</text>
              <text x="95" y="225" fill="#475569" fontSize="10" textAnchor="middle">(Ethernet, Wi-Fi, MAC)</text>
            </g>
          </svg>
        );

      // -------------------------------------------------------------
      // ICT: AI vs ML vs DL Venn Diagram
      // -------------------------------------------------------------
      case 'ai_ml_venn':
        return (
          <svg viewBox="0 0 500 290" className="visual-svg-canvas">
            <text x="250" y="25" fill="var(--rose-700)" fontSize="13" fontWeight="bold" textAnchor="middle">কৃত্রিম বুদ্ধিমত্তা, মেশিন লার্নিং ও ডিপ লার্নিং সম্পর্ক</text>

            {/* AI Outer Circle */}
            <circle cx="250" cy="155" r="115" fill="rgba(239, 68, 68, 0.12)" stroke="#ef4444" strokeWidth="2" />
            <text x="250" y="65" fill="#b91c1c" fontSize="12" fontWeight="bold" textAnchor="middle">কৃত্রিম বুদ্ধিমত্তা (Artificial Intelligence - AI)</text>

            {/* ML Middle Circle */}
            <circle cx="250" cy="170" r="80" fill="rgba(59, 130, 246, 0.18)" stroke="#3b82f6" strokeWidth="2" />
            <text x="250" y="115" fill="#1d4ed8" fontSize="11" fontWeight="bold" textAnchor="middle">মেশিন লার্নিং (Machine Learning - ML)</text>

            {/* DL Inner Circle */}
            <circle cx="250" cy="185" r="48" fill="rgba(16, 185, 129, 0.28)" stroke="#10b981" strokeWidth="2" />
            <text x="250" y="175" fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle">ডিপ লার্নিং (DL)</text>
            <text x="250" y="195" fill="#065f46" fontSize="9" textAnchor="middle">Neural Networks</text>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className="visual-diagram-card">
      <div className="visual-diagram-header">
        <div>
          <span className="diagram-badge">📊 একাডেমিক রেখাচিত্র ও মডেল স্পেক্স</span>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 2px' }}>
            {title}
          </h4>
          {subtitle && (
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="visual-svg-wrapper">
        {renderDiagram()}
      </div>
    </div>
  );
}
