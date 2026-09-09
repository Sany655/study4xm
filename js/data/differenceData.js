/* ==========================================================================
   DIFFERENCEDATA.JS - Comprehensive Difference Tables for Exam Preparation
   Supports all key comparisons for both ICT and Economics
   ========================================================================== */

window.DIFFERENCE_TABLES = [
  {
    id: "diff-data-info",
    subject: "ICT",
    title: "Data vs. Information",
    itemA: "Data",
    itemB: "Information",
    rows: [
      { feature: "Definition", a: "Raw, unorganized facts and figures without contextual meaning.", b: "Processed, organized, and structured data that carries semantic meaning." },
      { feature: "Form", a: "Unstructured numbers, letters, symbols, or readings (e.g. 98, 45, 12).", b: "Structured reports, grades, averages, or statements (e.g. 'Class average is 85%')." },
      { feature: "Dependency", a: "Independent; can exist without information.", b: "Dependent; cannot exist without underlying data." },
      { feature: "Decision Making", a: "Cannot be directly utilized for strategic decision making.", b: "Directly assists managers and users in making informed choices." },
      { feature: "Processing Stage", a: "Input stage of the IPOS computing cycle.", b: "Output stage of the IPOS computing cycle." }
    ]
  },
  {
    id: "diff-hw-sw",
    subject: "ICT",
    title: "Hardware vs. Software",
    itemA: "Hardware",
    itemB: "Software",
    rows: [
      { feature: "Nature", a: "Physical, tangible electrical and mechanical components.", b: "Intangible programs, scripts, instructions, and code." },
      { feature: "Function", a: "Performs actual execution and physical signal routing.", b: "Directs and instructs hardware on what operations to perform." },
      { feature: "Durability", a: "Suffers physical wear and tear over time.", b: "Does not wear out physically, but can become obsolete or develop bugs." },
      { feature: "Examples", a: "CPU, RAM, Hard Disk, Motherboard, Keyboard.", b: "Windows OS, Microsoft Word, Google Chrome, Python interpreter." }
    ]
  },
  {
    id: "diff-ram-rom",
    subject: "ICT",
    title: "RAM vs. ROM",
    itemA: "RAM (Random Access Memory)",
    itemB: "ROM (Read Only Memory)",
    rows: [
      { feature: "Volatility", a: "Volatile; data vanishes immediately when power is turned off.", b: "Non-volatile; permanently retains data even without power." },
      { feature: "Operations", a: "Read and Write memory; CPU modifies contents continuously.", b: "Read-only memory during normal computer operation." },
      { feature: "Contents", a: "Active operating system files and running application data.", b: "Firmware routines, bootstrap loader, and BIOS/UEFI code." },
      { feature: "Speed & Capacity", a: "Extremely fast, higher capacity (8GB - 64GB).", b: "Moderate speed, smaller capacity (4MB - 32MB)." }
    ]
  },
  {
    id: "diff-os-app",
    subject: "ICT",
    title: "Operating System vs. Application Software",
    itemA: "Operating System",
    itemB: "Application Software",
    rows: [
      { feature: "Role", a: "System platform that controls and orchestrates hardware resources.", b: "End-user software created to execute specific productive tasks." },
      { feature: "Dependency", a: "Runs independently as soon as the computer boots up.", b: "Requires an underlying Operating System to function." },
      { feature: "User Interaction", a: "Provides the underlying GUI / CLI environment.", b: "Users interact with it to complete assignments, games, or spreadsheets." },
      { feature: "Examples", a: "Microsoft Windows, Linux Ubuntu, macOS, Android.", b: "MS Word, Excel, Photoshop, VLC Media Player." }
    ]
  },
  {
    id: "diff-prop-oss",
    subject: "ICT",
    title: "Proprietary Software vs. Open Source Software",
    itemA: "Proprietary Software",
    itemB: "Open Source Software",
    rows: [
      { feature: "Source Code", a: "Closed, private, and encrypted; kept secret by vendor.", b: "Publicly accessible, inspectable, and editable by anyone." },
      { feature: "Cost & Licensing", a: "Typically requires purchasing a commercial license key.", b: "Generally free of cost under licenses like GPL, MIT, Apache." },
      { feature: "Customization", a: "Users cannot modify or recompile the program code.", b: "Developers can customize and redistribute modified versions." },
      { feature: "Examples", a: "Microsoft Windows, Adobe Photoshop, macOS.", b: "Linux Kernel, LibreOffice, Mozilla Firefox, Python." }
    ]
  },
  {
    id: "diff-virus-worm",
    subject: "ICT",
    title: "Computer Virus vs. Computer Worm",
    itemA: "Computer Virus",
    itemB: "Computer Worm",
    rows: [
      { feature: "Host Requirement", a: "Requires an existing executable host file (.exe, .docx) to attach to.", b: "Standalone program; does not need a host file to survive." },
      { feature: "Propagation", a: "Needs human intervention (e.g. running an infected file, opening an email attachment).", b: "Autonomous; replicates and travels automatically across computer networks." },
      { feature: "Speed of Spread", a: "Moderate speed, tied to human file transfer.", b: "Extremely rapid exponential propagation across vulnerable network ports." },
      { feature: "Primary Target", a: "Corrupts local file systems and system registries.", b: "Saturates network bandwidth, exhausts server connections." }
    ]
  },
  {
    id: "diff-dos-ddos",
    subject: "ICT",
    title: "DoS vs. DDoS Attacks",
    itemA: "DoS (Denial of Service)",
    itemB: "DDoS (Distributed DoS)",
    rows: [
      { feature: "Source", a: "Originates from a single computer and single internet connection.", b: "Originates from thousands of globally distributed infected machines (botnet)." },
      { feature: "Mitigation", a: "Relatively simple to identify and block the attacking IP address at the firewall.", b: "Extremely difficult to mitigate because traffic mimics authentic global users." },
      { feature: "Volume of Traffic", a: "Limited by the upload bandwidth of one attacking machine.", b: "Massive volumetric attack reaching hundreds of Gigabits or Terabits per second." }
    ]
  },
  {
    id: "diff-ipv4-ipv6",
    subject: "ICT",
    title: "IPv4 vs. IPv6",
    itemA: "IPv4",
    itemB: "IPv6",
    rows: [
      { feature: "Address Length", a: "32 bits (4 bytes).", b: "128 bits (16 bytes)." },
      { feature: "Representation", a: "Dotted-decimal notation (e.g., 192.168.1.1).", b: "Hexadecimal colon notation (e.g., 2001:0db8::8a2e:0370:7334)." },
      { feature: "Total Address Pool", a: "Approximately 4.29 billion (2^32) addresses (now depleted).", b: "Approximately 3.4 x 10^38 (2^128) addresses (virtually inexhaustible)." },
      { feature: "Configuration", a: "Manual or DHCP configuration required.", b: "Stateless Address Autoconfiguration (SLAAC) supported natively." },
      { feature: "Built-in Security", a: "Security (IPSec) is an optional add-on.", b: "IPSec is natively integrated into the protocol specification." }
    ]
  },
  {
    id: "diff-ai-ml",
    subject: "ICT",
    title: "Artificial Intelligence vs. Machine Learning",
    itemA: "Artificial Intelligence (AI)",
    itemB: "Machine Learning (ML)",
    rows: [
      { feature: "Scope", a: "Broad umbrella field aiming to simulate human intelligence in machines.", b: "Specific subset and technique of AI that learns patterns from data." },
      { feature: "Mechanism", a: "Includes rule-based systems, expert logic, search heuristics, and ML.", b: "Relies strictly on statistical and mathematical algorithms trained on datasets." },
      { feature: "Goal", a: "To create autonomous systems capable of reasoning and problem-solving.", b: "To maximize accuracy on predictive or classification tasks from data." },
      { feature: "Examples", a: "Self-driving vehicles, human-like virtual companions.", b: "Spam filtering algorithms, neural network image classifiers." }
    ]
  },
  {
    id: "diff-pos-norm",
    subject: "Economics",
    title: "Positive vs. Normative Economics",
    itemA: "Positive Economics",
    itemB: "Normative Economics",
    rows: [
      { feature: "Nature", a: "Objective, scientific, and value-free analysis.", b: "Subjective, moral, and value-laden analysis." },
      { feature: "Core Focus", a: "Examines 'What is, was, or will be'.", b: "Examines 'What ought to be or what should be'." },
      { feature: "Verification", a: "Can be empirically tested, validated, or rejected using data.", b: "Cannot be verified using facts; relies on personal ethics and opinions." },
      { feature: "Example", a: "'A 10% tariff on steel imports increased domestic steel prices by 8%'.", b: "'The government ought to eliminate import tariffs to promote international goodwill'." }
    ]
  },
  {
    id: "diff-movement-shift",
    subject: "Economics",
    title: "Movement Along Curve vs. Shift in Demand Curve",
    itemA: "Movement Along Curve",
    itemB: "Shift of Demand Curve",
    rows: [
      { feature: "Primary Cause", a: "Strictly caused by a change in the product's OWN price.", b: "Caused by changes in non-price factors (income, tastes, substitutes)." },
      { feature: "Terminology", a: "Referred to as 'Expansion' or 'Contraction' in Quantity Demanded.", b: "Referred to as 'Increase' or 'Decrease' in Demand." },
      { feature: "Visual Effect", a: "Traveling from one point to another along the exact same fixed curve.", b: "The entire demand curve physically shifts outward to the right or inward to the left." }
    ]
  },
  {
    id: "diff-card-ord",
    subject: "Economics",
    title: "Cardinal vs. Ordinal Utility Analysis",
    itemA: "Cardinal Utility",
    itemB: "Ordinal Utility",
    rows: [
      { feature: "Originators", a: "Alfred Marshall and classical economists.", b: "J.R. Hicks, R.G.D. Allen, and Pareto." },
      { feature: "Measurement", a: "Utility is quantifiable in exact numerical numbers called 'Utils'.", b: "Utility cannot be numbered; it is ranked ordinally (1st, 2nd, 3rd choice)." },
      { feature: "Analytical Tool", a: "Marginal Utility schedules and Equi-Marginal Utility curves.", b: "Indifference Curves and Budget Line tangency." }
    ]
  },
  {
    id: "diff-comp-monop",
    subject: "Economics",
    title: "Perfect Competition vs. Monopoly",
    itemA: "Perfect Competition",
    itemB: "Monopoly",
    rows: [
      { feature: "Number of Sellers", a: "Very large number of independent small sellers.", b: "Single sole producer and seller." },
      { feature: "Nature of Product", a: "Identical, homogeneous product with perfect substitutes.", b: "Unique product with no close substitutes." },
      { feature: "Price Influence", a: "Firms are Price Takers (P is given by market demand & supply).", b: "Firm is a Price Maker with full power over price." },
      { feature: "Demand Curve", a: "Horizontal, perfectly elastic demand curve (P = AR = MR).", b: "Downward sloping, inelastic demand curve (AR > MR)." },
      { feature: "Long-run Profits", a: "Only normal profit (P = minimum LAC) due to free entry/exit.", b: "Can sustain supernormal profit indefinitely due to high entry barriers." }
    ]
  },
  {
    id: "diff-gdp-gnp",
    subject: "Economics",
    title: "GDP vs. GNP",
    itemA: "GDP (Gross Domestic Product)",
    itemB: "GNP (Gross National Product)",
    rows: [
      { feature: "Geographic Scope", a: "Measures economic output within the geographic borders of the nation.", b: "Measures economic output produced by citizens/nationals worldwide." },
      { feature: "Formula", a: "GDP = C + I + G + (X - M).", b: "GNP = GDP + Net Factor Income from Abroad (NFIA)." },
      { feature: "Focus", a: "Focuses on the territory of production regardless of who produces it.", b: "Focuses on the nationality/citizenship of the producers." }
    ]
  },
  {
    id: "diff-bot-bop",
    subject: "Economics",
    title: "Balance of Trade (BOT) vs. Balance of Payments (BOP)",
    itemA: "Balance of Trade (BOT)",
    itemB: "Balance of Payments (BOP)",
    rows: [
      { feature: "Transactions Covered", a: "Covers only visible merchandise goods (exports and imports of tangible products).", b: "Covers all economic transactions: visible goods, invisible services, and capital flows." },
      { feature: "Nature", a: "Narrow component that forms a subpart of the Current Account.", b: "Comprehensive macro accounting statement of the nation with the rest of the world." },
      { feature: "Balance Status", a: "Can frequently remain in surplus or deficit indefinitely.", b: "In an accounting sense, BOP must always balance (Surplus/Deficit matched by reserves)." }
    ]
  },
  {
    id: "diff-growth-dev",
    subject: "Economics",
    title: "Economic Growth vs. Economic Development",
    itemA: "Economic Growth",
    itemB: "Economic Development",
    rows: [
      { feature: "Measurement", a: "Quantitative; increase in real GDP or real national income.", b: "Qualitative & structural; reduction in poverty, improvements in literacy and health." },
      { feature: "Scope", a: "Unidimensional, focusing strictly on output volumes.", b: "Multidimensional, covering institutions, living standards, and civil liberties." },
      { feature: "Primary Metric", a: "Real GDP growth rate, GDP per capita.", b: "Human Development Index (HDI), Multidimensional Poverty Index (MPI)." }
    ]
  },
  {
    id: "diff-direct-indirect-tax",
    subject: "Economics",
    title: "Direct Tax vs. Indirect Tax",
    itemA: "Direct Tax",
    itemB: "Indirect Tax",
    rows: [
      { feature: "Incidence & Burden", a: "Impact and incidence fall on the exact same person; cannot be shifted.", b: "Impact is on the seller, but monetary burden is shifted to final consumer." },
      { feature: "Basis of Levy", a: "Levied on income, wealth, or corporate profits.", b: "Levied on expenditure, purchase, and sale of goods and services." },
      { feature: "Progressivity", a: "Generally progressive (wealthier taxpayers pay higher marginal rates).", b: "Generally regressive in nature unless basic essentials are exempt." },
      { feature: "Examples", a: "Personal Income Tax, Corporate Tax, Wealth Tax.", b: "Value Added Tax (VAT), Customs Duty, Sales Tax." }
    ]
  }
];
