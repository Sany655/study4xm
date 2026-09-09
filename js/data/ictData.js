/* ==========================================================================
   ICTDATA.JS - Complete 9 Units of ICT Course Syllabus
   Fully enriched with 5-Level Learning System, Bangla explanations,
   keywords, exam answers (2, 5, 10 marks), MCQs, and flashcards.
   ========================================================================== */

window.ICT_SYLLABUS = [
  {
    unitId: 1,
    unitTitle: "Unit 1: Introduction to ICT and Computer System",
    priority: 4,
    description: "Foundational concepts, data vs information, computer classification, and systems unit components.",
    topics: [
      {
        id: "ict-u1-t1",
        title: "Definition of ICT & Basic Concepts",
        priority: 4,
        simpleIdea: "ICT is like an invisible highway and postal system combined with smart machines: it allows people to create, send, store, and process information anywhere in seconds.",
        simplerVersion: "সহজ কথায়, তথ্য (Information) তৈরি করা, আদান-প্রদান করা এবং সংরক্ষণ করার জন্য আমরা কম্পিউটার, ইন্টারনেট ও মোবাইল যে ব্যবহার করি—এই পুরো প্রযুক্তি ব্যবস্থাটাই হলো ICT।",
        banglaExplanation: "ICT (Information and Communication Technology) হলো এমন প্রযুক্তি যার মাধ্যমে ডেটা গ্রহণ, প্রক্রিয়া, সংরক্ষণ এবং বিভিন্ন কমিউনিকেশন মাধ্যমের সাহায্যে দ্রুত এক স্থান থেকে অন্য স্থানে স্থানান্তর করা যায়। এটি তথ্য ও যোগাযোগ ব্যবস্থার সমন্বিত রূপ।",
        keywords: [
          { term: "ICT", def: "Information and Communication Technology — technologies that provide access to information through telecommunications." },
          { term: "Data Processing", def: "The collection and manipulation of raw items into meaningful information." },
          { term: "Telecommunication", def: "Communication over a distance by cable, telegraph, telephone, or broadcasting." }
        ],
        technicalExplanation: "ICT encompasses hardware, software, telecommunications, and network infrastructure designed to capture, process, transmit, and display electronic data and communications in structured forms.",
        realLifeExample: "Using an online mobile banking app (like bKash/Nagad) to instantly send money with SMS verification and server database transaction logs.",
        examAnswers: {
          twoMark: "ICT stands for Information and Communication Technology. It is the convergence of computing and telecommunication networks that enables the transmission, storage, and processing of digital information.",
          fiveMark: "Definition: ICT refers to all communication technologies including the internet, wireless networks, computers, and software that enable users to access, store, transmit, and manipulate information.\n\nImportance:\n1. Instant global communication through email, VoIP, and social networks.\n2. Automation of business processes and scientific computation.\n3. Digital education and remote learning platforms.\n\nConclusion: ICT serves as the foundational infrastructure of modern knowledge-based economies.",
          tenMark: "Introduction:\nInformation and Communication Technology (ICT) represents the unified integration of telecommunications, computers, and enterprise software.\n\nCore Components:\n1. Hardware: Physical computing devices (processors, memory, peripherals).\n2. Software: System and application programs that direct hardware.\n3. Telecommunications: Fiber optic, satellite, and cellular transmission media.\n4. Data & Human Resources: Structured information inputs and skilled personnel managing systems.\n\nImpact & Opportunities:\nICT drives national economic efficiency through e-commerce, smart governance, telehealth, and software outsourcing.\n\nChallenges:\nDigital divide, cybersecurity vulnerabilities, and electronic waste.\n\nConclusion:\nA robust ICT foundation is essential for sustainable educational and industrial advancement."
        },
        commonMistakes: "Students often define IT instead of ICT, omitting the vital 'Communication' and network transmission aspects.",
        mcqs: [
          {
            question: "Which of the following best defines ICT?",
            options: [
              "Only standalone computer hardware repairs",
              "Convergence of computing hardware, software, and telecommunication networks",
              "Manual filing and cataloging of office paperwork",
              "Programming exclusively in machine language"
            ],
            correct: 1,
            difficulty: "Medium",
            explanation: "ICT encompasses computing technologies together with telecommunications to handle, transmit, and store digital data."
          }
        ],
        flashcards: [
          { front: "What does ICT stand for and what is its core purpose?", back: "Information and Communication Technology: to capture, process, store, and transmit data electronically across networks." }
        ],
        recallQuestion: "Define ICT and name two core pillars that distinguish it from standalone computing."
      },
      {
        id: "ict-u1-t2",
        title: "Data vs. Information & Information Processing Cycle",
        priority: 5,
        simpleIdea: "Data is like raw unboiled rice grains. Information is the delicious, cooked biryani you can actually eat and enjoy.",
        simplerVersion: "Data হলো অগোছালো কাঁচামাল (যেমন: 45, 92, 80)। আর Information হলো গুছানো অর্থপূর্ণ ফল (যেমন: 'ক্লাসে গণিতে প্রথম হয়েছে সাব্বির, নম্বর ৯২')।",
        banglaExplanation: "Data হলো প্রক্রিয়াকরণের পূর্বের অসংগঠিত কাঁচা তথ্য বা উপাদান। যখন এই Data কে নিয়ম অনুযায়ী Process করে অর্থপূর্ণ এবং সিদ্ধান্ত গ্রহণের উপযোগী করা হয়, তখন তাকে Information বলা হয়।",
        keywords: [
          { term: "Raw Data", def: "Unorganized facts, figures, and symbols with no inherent contextual meaning." },
          { term: "Information", def: "Processed, structured, and contextualized data that has decision-making value." },
          { term: "IPOS Cycle", def: "Input, Processing, Output, and Storage — the 4 fundamental stages of computing." }
        ],
        technicalExplanation: "Computers execute the Information Processing Cycle (IPOS): Raw data is received via input devices, manipulated by CPU according to program logic (processing), presented in human-readable form (output), and retained non-volatilely in secondary storage.",
        realLifeExample: "Scanning student barcode IDs at exam entry (Input) -> server calculates attendance % (Processing) -> displays student clearance slip (Output) -> writes to exam database (Storage).",
        examAnswers: {
          twoMark: "Data is raw, unorganized facts and figures without context. Information is processed, organized, and structured data that conveys specific meaning and aids in decision-making.",
          fiveMark: "Data vs Information:\n1. Nature: Data is raw and unorganized; Information is processed and structured.\n2. Dependency: Information cannot exist without data; data exists independently.\n3. Value: Data alone rarely guides action; Information directly aids decision-making.\n\nInformation Processing Cycle:\nInput (Keyboard/Scanner) -> Processing (CPU/ALU) -> Output (Monitor/Printer) -> Storage (SSD/HDD).",
          tenMark: "Comprehensive Analysis of the IPOS Cycle & Data Transformation:\n\n1. Definition & Comparative Matrix: Differentiate raw inputs from semantic outputs.\n2. The 4 Stages of Information Processing Cycle:\n   - Input: Conversion of human analogue input to binary digital signals.\n   - Processing: Fetch-Decode-Execute cycle orchestrated by Control Unit and ALU.\n   - Output: Generating actionable results for users or trigger downstream APIs.\n   - Storage: Non-volatile preservation for historical recall and audit trails.\n3. Practical Impact in Enterprise Computing: How ERP systems transform raw inventory numbers into quarterly financial forecasts."
        },
        commonMistakes: "Thinking that data and information are interchangeable synonyms in academic exam writing.",
        mcqs: [
          {
            question: "What is the correct sequence of the Information Processing Cycle?",
            options: [
              "Output → Processing → Input → Storage",
              "Input → Processing → Output → Storage",
              "Storage → Input → Processing → Output",
              "Processing → Storage → Input → Output"
            ],
            correct: 1,
            difficulty: "Easy",
            explanation: "The standard cycle is Input, Processing, Output, followed by secondary Storage."
          }
        ],
        flashcards: [
          { front: "What are the 4 fundamental steps of the IPOS cycle?", back: "Input (Capture) -> Processing (Compute) -> Output (Present) -> Storage (Save)." }
        ],
        recallQuestion: "State the difference between Data and Information with a concrete exam-ready example."
      }
    ]
  },
  {
    unitId: 2,
    unitTitle: "Unit 2: Computer Hardware and Software",
    priority: 5,
    description: "Categories of hardware, Processor (CU & ALU), Operating Systems, Software categories, and Web Browsers.",
    topics: [
      {
        id: "ict-u2-t1",
        title: "Categories of Computer Hardware & The Processor (CU + ALU)",
        priority: 5,
        simpleIdea: "Hardware is the tangible body of the computer. The CPU is its brain: the Control Unit is the brain's manager, and the ALU is the calculator mathematician.",
        simplerVersion: "হার্ডওয়্যার হলো কম্পিউটারের যে অংশগুলো আমরা হাত দিয়ে স্পর্শ করতে পারি। CPU হলো মূল মস্তিষ্ক—এর CU অংশ সবাইকে নির্দেশ দেয় এবং ALU অংশ সব যোগ-বিয়োগ ও লজিক হিসাব করে।",
        banglaExplanation: "কম্পিউটার হার্ডওয়্যারকে ৫টি মূল ভাগে ভাগ করা হয়: Input, Processing, Output, Storage, এবং Communication। প্রসেসর বা CPU মূলত Control Unit (CU), Arithmetic Logic Unit (ALU) এবং Registers নিয়ে গঠিত।",
        keywords: [
          { term: "Control Unit (CU)", def: "Extracts instructions from memory, decodes them, and directs operations of other units." },
          { term: "Arithmetic Logic Unit (ALU)", def: "Performs mathematical arithmetic (+, -, *, /) and boolean logical comparisons (AND, OR, NOT, <, >)." },
          { term: "Registers", def: "Ultra-fast, tiny internal CPU memory cells storing current instructions and operands." }
        ],
        technicalExplanation: "The Central Processing Unit (CPU) continually executes the Machine Instruction Cycle (Fetch, Decode, Execute, Store). The CU regulates the timing pulses and control signals via the control bus, while the ALU executes arithmetic calculations and relational evaluations on binary operands stored in high-speed registers.",
        realLifeExample: "When you play a video game, the ALU calculates player position vectors and physics collisions at billions of operations per second while the CU coordinates GPU data transfer.",
        examAnswers: {
          twoMark: "The CPU consists of the Control Unit (CU), which supervises and coordinates all system operations, and the Arithmetic Logic Unit (ALU), which executes all arithmetic and logical calculations.",
          fiveMark: "Main Processing Devices:\n1. Control Unit (CU): Decodes machine instructions, manages instruction registers, and synchronizes signal flow between CPU and peripherals.\n2. Arithmetic Logic Unit (ALU): Divided into AU (arithmetic calculations like addition/subtraction) and LU (logical evaluations like comparisons).\n3. Registers: High-speed temporary storage (e.g., Program Counter, Accumulator) directly accessed by ALU during execution.",
          tenMark: "Detailed Examination of CPU Architecture & Hardware Categories:\n\n1. Five Categories of Hardware: Input (Keyboard, Optical Scanner), Processing (CPU, GPU), Output (Monitor, Printer), Storage (RAM, NVMe SSD, Optical Media), Communication (NIC, Router).\n2. Deep Dive into Internal Processor Architecture:\n   - Control Unit: Fetching instructions, Program Counter management, clock synchronization.\n   - ALU Architecture: Parallel adders, status flags (zero, carry, overflow), logic gate arrays.\n   - System Buses: Data Bus (bi-directional), Address Bus (uni-directional), Control Bus.\n3. Von Neumann Architecture principles and performance bottlenecks."
        },
        commonMistakes: "Confusing the Control Unit with secondary storage or assuming the ALU stores operating system files.",
        mcqs: [
          {
            question: "Which component of the processor is responsible for decoding instructions and directing system components?",
            options: [
              "Arithmetic Logic Unit (ALU)",
              "Control Unit (CU)",
              "Secondary Storage Disk",
              "Random Access Memory (RAM)"
            ],
            correct: 1,
            difficulty: "Medium",
            explanation: "The Control Unit (CU) retrieves and decodes instructions, coordinating how the ALU, memory, and I/O devices respond."
          }
        ],
        flashcards: [
          { front: "What are the specific functions of the CU and the ALU in a CPU?", back: "CU = Decodes instructions and orchestrates signals; ALU = Performs arithmetic math (+, -, *, /) and logic comparisons (AND, OR, <, >)." }
        ],
        recallQuestion: "Describe the exact role of the Control Unit and Arithmetic Logic Unit in executing an instruction."
      },
      {
        id: "ict-u2-t2",
        title: "Operating Systems, Application Software & Software Licensing",
        priority: 5,
        simpleIdea: "The Operating System is like a hotel manager who assigns rooms, manages food delivery, and handles security so guests (apps) can stay smoothly.",
        simplerVersion: "Operating System (যেমন Windows বা Android) হলো এমন মাস্টার সফটওয়্যার যা ছাড়া কম্পিউটার চালু হতেই পারে না। এটি হার্ডওয়্যার এবং ইউজারের মাঝে সেতুবন্ধন হিসেবে কাজ করে।",
        banglaExplanation: "অপারেটিং সিস্টেম (OS) হলো একটি সিস্টেম সফটওয়্যার যা কম্পিউটার হার্ডওয়্যার এবং ব্যবহারকারীর মধ্যে ইন্টারফেস তৈরি করে এবং মেমরি, প্রসেস, ফাইল সিস্টেম ও ডিভাইস নিয়ন্ত্রণ করে।",
        keywords: [
          { term: "Operating System (OS)", def: "Core system software managing hardware resources, process scheduling, and memory allocation." },
          { term: "Proprietary Software", def: "Closed-source software whose source code is protected and licensed commercially (e.g., Microsoft Windows)." },
          { term: "Open Source Software", def: "Software whose source code is freely available for inspection, modification, and distribution (e.g., Linux, Firefox)." }
        ],
        technicalExplanation: "The OS kernel manages memory management (virtual memory paging), process scheduling (round robin, priority queues), device drivers via hardware abstraction layers (HAL), and security access control lists (ACLs). Software is categorized into System Software (OS, utilities) and Application Software (Word, browsers, ERP).",
        realLifeExample: "Windows 11 manages 16GB RAM among 50 open background processes while running Chrome browser safely without system freeze.",
        examAnswers: {
          twoMark: "An Operating System is system software that manages computer hardware, system resources, and provides common services for application programs (e.g., Windows, Linux).",
          fiveMark: "Differences between Proprietary and Open Source Software:\n1. Source Code: Proprietary is closed and encrypted; Open source code is publicly accessible and editable.\n2. Cost: Proprietary usually requires paid commercial licenses; Open source is typically free (FOSS).\n3. Customization: Users cannot modify proprietary software; developers can freely adapt open source.\n4. Examples: Microsoft Windows vs Linux; MS Word vs LibreOffice.",
          tenMark: "Comprehensive Analysis of System Software vs Application Software:\n\n1. Role & Architecture of Operating Systems: Process management, Virtual memory management, File systems (NTFS, ext4), Device management via I/O drivers.\n2. Types of Application Software: General purpose (Word processors, Spreadsheets), Special purpose (Medical billing systems), Bespoke software.\n3. Software Distribution Models: Proprietary commercial licenses, Freeware, Shareware, and Open Source Software (GPL, MIT licenses) with security and economic implications."
        },
        commonMistakes: "Believing that Google Chrome or Microsoft Word are Operating Systems.",
        mcqs: [
          {
            question: "Which of the following is an example of an Open Source Operating System?",
            options: [
              "Microsoft Windows 11",
              "Apple macOS",
              "Linux Ubuntu",
              "Apple iOS"
            ],
            correct: 2,
            difficulty: "Medium",
            explanation: "Linux (and its distributions like Ubuntu) is open-source software with openly available kernel source code."
          }
        ],
        flashcards: [
          { front: "What is the key difference between Proprietary and Open Source software?", back: "Proprietary source code is restricted and closed (e.g., Windows); Open source code is publicly accessible and modifiable (e.g., Linux)." }
        ],
        recallQuestion: "List 4 major functions of an Operating System and give 2 examples of open-source software."
      }
    ]
  },
  {
    unitId: 3,
    unitTitle: "Unit 3: Introduction to Word Processing Application",
    priority: 4,
    description: "Creating documents, Save As, editing tools, clipboard operations, tables, drop caps, headers/footers, and page borders.",
    topics: [
      {
        id: "ict-u3-t1",
        title: "Document Creation, Formatting Tools & Visual Design Elements",
        priority: 4,
        simpleIdea: "Word processing turns raw handwriting into elegant, formatted publications with tables, headers, and decorative drop-caps ready for printing.",
        simplerVersion: "ওয়ার্ড প্রসেসিং হলো কম্পিউটারে কোনো টেক্সট বা চিঠি লেখা, সেটিকে সুন্দর করে সাজানো (বোল্ড, কালার, ফন্ট পরিবর্তন), টেবিল ও ছবি যোগ করা এবং প্রিন্ট করার সফটওয়্যার।",
        banglaExplanation: "ওয়ার্ড প্রসেসর (যেমন Microsoft Word) ব্যবহার করে ডকুমেন্ট তৈরি, এডিটিং (Copy, Cut, Paste, Undo, Redo), টেবিল ইনসার্ট, হেডার-ফুটার, ড্রপ ক্যাপ এবং ওয়াটারমার্ক যোগ করে প্রফেশনাল ডকুমেন্ট তৈরি করা যায়।",
        keywords: [
          { term: "Save As", def: "A command to save an active document under a new filename, file format, or folder location." },
          { term: "Drop Cap", def: "A large capital letter at the beginning of a text block that drops down two or more lines." },
          { term: "Watermark", def: "A faint background text or image displayed behind document text for copyright or security." }
        ],
        technicalExplanation: "Word processors store text alongside character formatting tags (font face, point size, kerning, weight), paragraph attributes (line spacing, alignment, tab stops), and document-level structures (margins, headers/footers, section breaks, watermarks).",
        realLifeExample: "Creating a formal university assignment report featuring a Roman numeral header, customized 4x3 comparison table, and a 'CONFIDENTIAL' watermark.",
        examAnswers: {
          twoMark: "'Save' updates modifications to the existing document file, while 'Save As' allows saving the document under a new name, file type (e.g., PDF), or different directory.",
          fiveMark: "Key Features of Word Processing:\n1. Text Editing: Cut, Copy, Paste, Undo (Ctrl+Z), Redo (Ctrl+Y), Find & Replace.\n2. Structural Layout: Headers, footers, page numbering, column formatting.\n3. Visual Enhancements: Drop Cap for magazine-style typography, Watermarks for security/branding, and Page Borders.\n4. Tables & Media: Inserting dynamic tables with cell merging and wrapping styles for photos.",
          tenMark: "Full Examination of Document Formatting & Workflow in Microsoft Word:\n\n1. Document Lifecycle: Template selection, input, WYSIWYG editing, proofing tools (Spellcheck, Grammar).\n2. Layout Management: Section breaks vs page breaks, margins (Normal, Narrow), portrait vs landscape orientation.\n3. Advanced Elements: Table of Contents automation, mail merge, digital watermarks, security document protection."
        },
        commonMistakes: "Confusing Undo (Ctrl+Z) with Redo (Ctrl+Y), or confusing Save with Save As.",
        mcqs: [
          {
            question: "What is the typographical feature where the first letter of a paragraph is enlarged to span multiple lines?",
            options: ["WordArt", "Drop Cap", "Watermark", "Header"],
            correct: 1,
            difficulty: "Easy",
            explanation: "Drop Cap enlarges the first letter of a paragraph downwards across several lines."
          }
        ],
        flashcards: [
          { front: "What is the distinction between Save and Save As?", back: "Save overwrites current file changes; Save As creates a new copy with a new name, path, or format." }
        ],
        recallQuestion: "Explain the purpose of Drop Cap, Watermark, and Header/Footer in document formatting."
      }
    ]
  },
  {
    unitId: 4,
    unitTitle: "Unit 4: Spreadsheet Application",
    priority: 5,
    description: "Cells, rows, columns, workbooks, formulas (=SUM, =AVERAGE, =MAX, =MIN, =COUNT), charts, and data management.",
    topics: [
      {
        id: "ict-u4-t1",
        title: "Spreadsheet Concepts, Formulas & Mathematical Functions",
        priority: 5,
        simpleIdea: "A spreadsheet is a giant grid of smart numbered boxes. Whenever you change a single number, all totals and formulas update automatically!",
        simplerVersion: "স্প্রেডশিট (যেমন MS Excel) হলো ছক বা গ্রিড আকারের শিট যেখানে রো (Row) ও কলাম (Column) দিয়ে গঠিত সেল (Cell)-এ সংখ্যা বসিয়ে স্বয়ংক্রিয়ভাবে হিসাব-নিকাশ করা যায়।",
        banglaExplanation: "স্প্রেডশিট অ্যাপ্লিকেশনে ডেটা সেল-এ সংরক্ষিত থাকে (কলাম লেটার ও রো নম্বরের সংযোগস্থল, যেমন B4)। এতে গাণিতিক ফর্মুলা (= দিয়ে শুরু) এবং বিল্ট-ইন ফাংশন যেমন =SUM(), =AVERAGE(), =MAX(), =MIN(), =COUNT() ব্যবহার করে দ্রুত তথ্য বিশ্লেষণ করা হয়।",
        keywords: [
          { term: "Cell Reference", def: "The coordinate identification of a cell formed by column letter and row number (e.g., C5)." },
          { term: "Formula vs Function", def: "A formula is a user-defined mathematical expression (=A1+B1); a function is a built-in named routine (=SUM(A1:B10))." },
          { term: "Workbook", def: "An Excel file containing one or more related worksheets." }
        ],
        technicalExplanation: "Spreadsheets operate on directed acyclic graph dependencies. When a cell operand value is altered, the calculation engine identifies dependent formulas and re-evaluates outputs instantly using IEEE floating-point operations.",
        realLifeExample: "A school calculating final grades: =AVERAGE(B2:F2), determining class topper with =MAX(G2:G100), and finding total students with =COUNT(A2:A100).",
        examAnswers: {
          twoMark: "A cell is the intersection of a row and a column in a spreadsheet, identified by a column letter and row number (such as A1, D12).",
          fiveMark: "Essential Excel Functions:\n1. =SUM(range): Calculates the arithmetic sum of numbers.\n2. =AVERAGE(range): Computes arithmetic mean.\n3. =MAX(range): Identifies highest value in range.\n4. =MIN(range): Identifies lowest value in range.\n5. =COUNT(range): Counts the number of numeric cells.",
          tenMark: "Comprehensive Analysis of Spreadsheet Data Management in Business & Finance:\n\n1. Structural Hierarchy: Workbooks, Worksheets, Rows, Columns, Cells, Ranges.\n2. Data Types: Numerical values, Text/String labels, Dates/Times, Currency formatting.\n3. Formulas vs Functions with Syntax: Proper usage of equal sign (=), argument lists, relative vs absolute cell referencing ($A$1).\n4. Data Visualization: Column charts, Pie charts, Line graphs for trend projection."
        },
        commonMistakes: "Forgetting to write the equals sign '=' at the start of an Excel formula, causing it to be treated as plain text.",
        mcqs: [
          {
            question: "Every formula or function in a spreadsheet application MUST begin with which character?",
            options: ["#", "=", "@", ":"],
            correct: 1,
            difficulty: "Easy",
            explanation: "All spreadsheet formulas and built-in functions must begin with an equal sign (=)."
          }
        ],
        flashcards: [
          { front: "Write the syntax and purpose of =AVERAGE(A1:A10)", back: "It calculates the arithmetic mean of all numeric values located in cells A1 through A10." }
        ],
        recallQuestion: "Write the exact syntax for 5 core Excel functions: SUM, AVERAGE, MAX, MIN, and COUNT."
      }
    ]
  },
  {
    unitId: 5,
    unitTitle: "Unit 5: Presentation Application",
    priority: 4,
    description: "Slide layouts, transitions, animations, presentation views, presenter tools, and printing options.",
    topics: [
      {
        id: "ict-u5-t1",
        title: "Presentation Design Principles, Transitions vs. Animations",
        priority: 4,
        simpleIdea: "A presentation is visual storytelling. Transitions are how the screen moves between whole slides; Animations are how items inside a slide fly or fade in.",
        simplerVersion: "ট্রানজিশন (Transition) হলো এক স্লাইড থেকে অন্য স্লাইডে যাওয়ার পুরো পাতার ইফেক্ট। আর অ্যানিমেশন (Animation) হলো একই স্লাইডের ভেতরের লেখা বা ছবির ইফেক্ট।",
        banglaExplanation: "একটি সফল প্রেজেন্টেশন তৈরির ক্ষেত্রে মূল বিষয় হলো স্লাইড লেআউট, স্পষ্ট ফন্ট এবং সঠিক ইফেক্ট। স্লাইড ট্রানজিশন দুই স্লাইডের রূপান্তর নির্ধারণ করে, আর অ্যানিমেশন স্লাইডের ভেতরের অবজেক্টের মুভমেন্ট তৈরি করে।",
        keywords: [
          { term: "Slide Transition", def: "Visual motion effect occurring when progressing from one entire slide to the next in Slide Show." },
          { term: "Object Animation", def: "Visual effects applied to individual text boxes, images, or shapes on a single slide." },
          { term: "Handouts", def: "Printed sheets containing multiple miniature slides per page for distribution to the audience." }
        ],
        technicalExplanation: "Presentation software sequences vector and raster assets on timed canvas keyframes. Slide master templates ensure uniform typography, color palettes, and branding across deck hierarchies.",
        realLifeExample: "A startup pitch where slides fade smoothly from problem to solution (Transition), while bullet points appear sequentially on click (Animation).",
        examAnswers: {
          twoMark: "Slide Transition is the visual animation between two successive slides, whereas Animation refers to visual movements applied to individual elements (text, images) on a slide.",
          fiveMark: "Design Principles for Effective Presentations:\n1. 6x6 Rule: Maximum 6 bullet points per slide, 6 words per bullet.\n2. High Contrast: Dark text on light background or vice-versa for readability.\n3. Consistent Hierarchy: Uniform headings, fonts, and color palettes.\n4. Purposeful Animation: Subtle motion that aids comprehension rather than distracting.",
          tenMark: "Examination of Presentation Delivery, Views, and Output Strategies:\n\n1. Core Presentation Views: Normal View, Slide Sorter View (re-arranging slides), Notes Page View, Reading View, Slide Show View.\n2. Mechanical Difference between Transition & Animation: Entrance, Emphasis, Exit, and Motion Path effects.\n3. Output and Distribution: Presenter View with multi-monitor speaker notes, PDF export, Handouts (3, 6, 9 slides per page with note lines)."
        },
        commonMistakes: "Using Transition and Animation interchangeably in exam papers.",
        mcqs: [
          {
            question: "What is the key difference between a Transition and an Animation in PowerPoint?",
            options: [
              "Transitions apply to individual text words; Animations apply to entire slides",
              "Transitions apply to the whole slide movement; Animations apply to elements inside a slide",
              "Transitions are audio-only; Animations are video-only",
              "There is no difference between them"
            ],
            correct: 1,
            difficulty: "Medium",
            explanation: "Transitions dictate how slides enter/exit; Animations control elements (text, pictures) within an active slide."
          }
        ],
        flashcards: [
          { front: "Differentiate Slide Transition from Object Animation.", back: "Transition = Effect moving from one slide to another. Animation = Movement of individual objects/text within a single slide." }
        ],
        recallQuestion: "State 3 essential presentation design principles and differentiate Slide Sorter view from Normal view."
      }
    ]
  },
  {
    unitId: 6,
    unitTitle: "Unit 6: Privacy and Security",
    priority: 5,
    description: "Information security, Cybercrime, DoS/DDoS, Malware types, Phishing, Ransomware, and Digital Ethics.",
    topics: [
      {
        id: "ict-u6-t1",
        title: "Cyber Threats, Malware Classification (Virus, Worm, Ransomware) & Attacks",
        priority: 5,
        simpleIdea: "Computer security is like defending a house: viruses hitchhike inside innocent files, worms crawl in through open windows by themselves, and ransomware holds your photos hostage for money.",
        simplerVersion: "ভাইরাস ছড়াতে কোনো ফাইলের সাহায্য লাগে, কিন্তু ওর্ম (Worm) কারো সাহায্য ছাড়াই নিজে নিজে নেটওয়ার্কে ছড়িয়ে পড়ে। র‍্যানসমওয়্যার হলো ডিজিটাল ডাকাত যা ফাইল লক করে মুক্তিপণ চায়।",
        banglaExplanation: "তথ্য নিরাপত্তা নিশ্চিত করতে সাইবার অপরাধ ও ম্যালওয়্যার সম্পর্কে স্পষ্ট জ্ঞান প্রয়োজন। DoS ও DDoS অ্যাটাক সার্ভারকে ট্র্যাফিক দিয়ে অচল করে দেয়, আর ফিশিং প্রতারণামূলক বার্তার মাধ্যমে পাসওয়ার্ড চুরি করে।",
        keywords: [
          { term: "Virus", def: "Malicious code that attaches to host executable files and requires human action to propagate." },
          { term: "Worm", def: "Self-replicating standalone malware that spreads across computer networks automatically without human intervention." },
          { term: "Ransomware", def: "Malware that encrypts victim files and demands payment in cryptocurrency for the decryption key." },
          { term: "DoS / DDoS", def: "Denial of Service / Distributed Denial of Service — overwhelming servers with bogus requests to make services unavailable." }
        ],
        technicalExplanation: "Threat agents exploit unpatched CVE vulnerabilities. A DoS attack emanates from a single host or IP, while a DDoS attack leverages distributed botnets to flood target routers with SYN/UDP packets, exhausting bandwidth and CPU thread pools.",
        realLifeExample: "The 2017 WannaCry ransomware attack exploited SMB protocol flaws, encrypting hospital computers across 150 nations within hours.",
        examAnswers: {
          twoMark: "A computer Virus requires a host program and user execution to spread, whereas a Worm is a self-contained program that replicates and travels independently across computer networks.",
          fiveMark: "DoS vs DDoS Attacks:\n1. Source: DoS originates from a single computer/connection; DDoS originates from thousands of compromised computers (botnet).\n2. Traceability: DoS is relatively easy to block by IP; DDoS spoofing across global origins makes mitigation complex.\n3. Impact: DDoS generates gigabits to terabits of synthetic traffic, completely saturating ISP uplinks.",
          tenMark: "In-Depth Study of Cyber Threat Vectors & Enterprise Defense Architecture:\n\n1. Malware Taxonomies: Viruses, Worms, Trojan Horses, Spyware/Keyloggers, Ransomware.\n2. Attack Strategies: Social Engineering & Phishing, Man-in-the-Middle (MITM), DoS and botnet DDoS attacks.\n3. Defense & Digital Ethics: Multi-Factor Authentication (MFA), public-key cryptography (Digital Signatures and SSL/TLS Certificates), principle of least privilege, ethical handling of user telemetry."
        },
        commonMistakes: "Claiming that a virus and a worm are identical, or that firewalls eliminate the need for strong passwords.",
        mcqs: [
          {
            question: "Which malicious software replicates itself across networks WITHOUT requiring a host program or user execution?",
            options: ["Computer Virus", "Worm", "Trojan Horse", "Macro Virus"],
            correct: 1,
            difficulty: "Hard",
            explanation: "Worms are self-replicating standalone programs that spread automatically across networks without host execution."
          }
        ],
        flashcards: [
          { front: "What is the core operational difference between a Virus and a Worm?", back: "A Virus requires an infected host file and user action to spread; a Worm is autonomous and self-propagates across network ports." }
        ],
        recallQuestion: "Differentiate DoS from DDoS, and explain how Phishing traps work."
      }
    ]
  },
  {
    unitId: 7,
    unitTitle: "Unit 7: Internet and Communication",
    priority: 5,
    description: "Internet services, OSI 7-Layer Model, TCP/IP, IPv4 vs IPv6, subnetting, Wi-Fi, and intellectual property rights.",
    topics: [
      {
        id: "ict-u7-t1",
        title: "OSI 7-Layer Reference Model & TCP/IP Architecture",
        priority: 5,
        simpleIdea: "The OSI model is like the 7-step postal delivery chain: from writing the letter (Application) down to the physical van driving on the asphalt road (Physical layer).",
        simplerVersion: "কম্পিউটার নেটওয়ার্কে এক ডিভাইস থেকে অন্য ডিভাইসে ডেটা যাওয়ার নিয়মগুলোকে ৭টি ধাপে ভাগ করা হয়েছে। একেই OSI মডেল বলে।",
        banglaExplanation: "OSI (Open Systems Interconnection) মডেলে ৭টি স্তর রয়েছে: Application, Presentation, Session, Transport, Network, Data Link, এবং Physical। প্রতিটি স্তর নির্দিষ্ট কাজ ও প্রোটোকল পরিচালনা করে।",
        keywords: [
          { term: "Layer 7: Application", def: "Provides network services directly to end-user applications (HTTP, SMTP, FTP, DNS)." },
          { term: "Layer 4: Transport", def: "End-to-end communication, segmentation, flow control, and error recovery (TCP, UDP)." },
          { term: "Layer 3: Network", def: "Logical addressing and packet routing across networks (IP, ICMP, Routers)." },
          { term: "Layer 2: Data Link", def: "Node-to-node frame transfer and MAC physical addressing (Switches, Ethernet)." }
        ],
        technicalExplanation: "Data encapsulation travels downwards during transmission: Data (L7-L5) -> Segments (L4) -> Packets (L3) -> Frames (L2) -> Bits (L1). The receiver unwraps headers via de-encapsulation.",
        realLifeExample: "Browsing a website: Browser creates HTTP GET request (L7) -> TCP adds port 80/443 headers (L4) -> IP adds source/destination IP (L3) -> Ethernet adds MAC address (L2) -> Signals travel over fiber wire (L1).",
        examAnswers: {
          twoMark: "The 7 layers of the OSI model in top-down order are: Application, Presentation, Session, Transport, Network, Data Link, and Physical Layer.",
          fiveMark: "Roles of the Key OSI Layers:\n1. Application (L7): User interface and protocols like HTTP/DNS.\n2. Transport (L4): Guarantees end-to-end delivery with TCP handshakes and port numbers.\n3. Network (L3): Responsible for logical routing of packets using IP addresses.\n4. Data Link (L2): Handles physical framing and MAC addressing on local switches.",
          tenMark: "Exhaustive Comparison: OSI 7-Layer Model vs TCP/IP 4-Layer Architecture:\n\n1. Layer-by-layer breakdown of all 7 OSI layers with PDU (Protocol Data Units) and devices.\n2. Mapping to TCP/IP Stack: Application (L7-L5), Transport (L4), Internet (L3), Network Access (L2-L1).\n3. Encapsulation & De-encapsulation: Adding protocol headers, sequence numbers, checksums (CRC) and transmission mechanisms."
        },
        commonMistakes: "Mixing up the order of Network (L3) and Transport (L4) layers.",
        mcqs: [
          {
            question: "Which layer of the OSI model handles logical addressing and packet routing?",
            options: ["Data Link Layer", "Transport Layer", "Network Layer", "Session Layer"],
            correct: 2,
            difficulty: "Medium",
            explanation: "The Network Layer (Layer 3) handles IP addressing and router packet path determination."
          }
        ],
        flashcards: [
          { front: "Name all 7 layers of the OSI model from Layer 7 to Layer 1.", back: "7. Application, 6. Presentation, 5. Session, 4. Transport, 3. Network, 2. Data Link, 1. Physical." }
        ],
        recallQuestion: "List all 7 layers of the OSI model and state the primary function of Layer 3 and Layer 4."
      },
      {
        id: "ict-u7-t2",
        title: "IP Address (IPv4 vs. IPv6) & Network Addressing",
        priority: 5,
        simpleIdea: "An IP address is the unique digital mailing address of your device on the global internet, so data packets know where to go.",
        simplerVersion: "ইন্টারনেটের জগতে প্রতিটি ডিভাইসের একটি নির্দিষ্ট পরিচয় বা ঠিকানা থাকে। যেমন: ১৯২.১৬৮.১.১। একেই IP অ্যাড্রেস বলে।",
        banglaExplanation: "IP (Internet Protocol) অ্যাড্রেস দুই ধরনের: IPv4 (৩২-বিট, ৪টি অক্টেট দশমিক সংখ্যা দিয়ে গঠিত) এবং IPv6 (১২৮-বিট, হেক্সাডেসিমেল পদ্ধতিতে লিখিত)। IPv4 অ্যাড্রেস শেষ হয়ে যাওয়ায় IPv6 চালু করা হয়েছে।",
        keywords: [
          { term: "IPv4", def: "32-bit address represented in decimal notation (e.g., 192.168.1.1), providing ~4.3 billion unique addresses." },
          { term: "IPv6", def: "128-bit address written in hexadecimal format (e.g., 2001:0db8::ff00:42), providing 3.4 x 10^38 addresses." },
          { term: "MAC Address", def: "Permanent 48-bit physical hardware identifier burned into the Network Interface Card (NIC)." }
        ],
        technicalExplanation: "IPv4 uses four 8-bit octets separated by dots. Exhaustion of the 32-bit IPv4 address pool necessitated IPv6, which incorporates native IPSec security, eliminates NAT bottlenecks, and uses auto-configuration.",
        realLifeExample: "Your home Wi-Fi assigns your smartphone an internal IPv4 (192.168.0.105), while modern cellular 5G networks provide a native IPv6 address.",
        examAnswers: {
          twoMark: "IPv4 is a 32-bit address written in decimal numbers (e.g. 172.16.254.1), whereas IPv6 is a 128-bit address written in hexadecimal digits separated by colons.",
          fiveMark: "IPv4 vs IPv6 Detailed Comparison:\n1. Bit Length: IPv4 has 32 bits (4 bytes); IPv6 has 128 bits (16 bytes).\n2. Format: IPv4 uses 4 decimal numbers with dots; IPv6 uses 8 hexadecimal blocks with colons.\n3. Address Space: IPv4 provides ~4.3 billion addresses; IPv6 provides ~3.4×10^38 addresses (virtually limitless).\n4. Security: IPv4 security depends on optional add-ons; IPv6 natively integrates IPSec.",
          tenMark: "Evolution of Internet Protocol Addressing & Architecture:\n\n1. The Problem of IPv4 Depletion: CIDR, Classful vs Classless addressing, Private IP ranges (RFC 1918), NAT limitations.\n2. Technical Specifications of IPv6: Structure, compression rules (omitting leading zeros and :: notation), header simplicity, packet fragmentation.\n3. Comparison with MAC addresses: Logical network-layer routing vs Physical link-layer hop delivery."
        },
        commonMistakes: "Writing that IPv6 is 64-bit instead of 128-bit.",
        mcqs: [
          {
            question: "How many bits are in an IPv6 address?",
            options: ["32 bits", "64 bits", "128 bits", "256 bits"],
            correct: 2,
            difficulty: "Easy",
            explanation: "IPv6 addresses are 128 bits long, written as 8 groups of 4 hexadecimal digits."
          }
        ],
        flashcards: [
          { front: "What is the address length difference between IPv4 and IPv6?", back: "IPv4 = 32 bits (decimal notation); IPv6 = 128 bits (hexadecimal notation)." }
        ],
        recallQuestion: "Compare IPv4 and IPv6 across bit length, address format, and total available address space."
      }
    ]
  },
  {
    unitId: 8,
    unitTitle: "Unit 8: Emerging Technologies — Data Analytics, AI, and Machine Learning",
    priority: 5,
    description: "Data analytics steps, AI definition, Machine Learning models (classification & prediction), and their inter-relationships.",
    topics: [
      {
        id: "ict-u8-t1",
        title: "Data Analytics, Artificial Intelligence & Machine Learning Dynamics",
        priority: 5,
        simpleIdea: "Data Analytics reads the diary of the past. AI is the robotic assistant that makes smart decisions. Machine Learning is how the assistant gets smarter by studying thousands of past examples.",
        simplerVersion: "Data Analytics অতীত ডেটা দেখে ফলাফল বলে। AI মানুষের মতো বুদ্ধিমান আচরণ করে। আর ML হলো AI-এর সেই অংশ যা অতীতের উদাহরণ দেখে নিজে নিজে শেখে।",
        banglaExplanation: "Data Analytics হলো কাঁচা ডেটা পরিষ্কার, বিশ্লেষণ ও ভিজ্যুয়ালাইজ করে সিদ্ধান্ত নেওয়ার প্রক্রিয়া। Artificial Intelligence (AI) এমন সিস্টেম তৈরি করে যা মানুষের মতো চিন্তা করতে পারে। Machine Learning (ML) হলো AI-এর একটি সাবসেট যা ডেটা দিয়ে অ্যালগরিদম ট্রেন করে ভবিষ্যদ্বাণী করতে পারে।",
        keywords: [
          { term: "Data Analytics", def: "The science of examining raw data sets to discover patterns, anomalies, and actionable insights." },
          { term: "Artificial Intelligence (AI)", def: "Simulating human intelligence in machines programmed to perceive, reason, and solve problems." },
          { term: "Machine Learning (ML)", def: "A subset of AI where systems automatically learn and improve from experience without being explicitly programmed." }
        ],
        technicalExplanation: "Relationship hierarchy: Data Analytics feeds transformed datasets into Machine Learning models (Supervised, Unsupervised, Reinforcement). ML powers AI reasoning engines for classification (is this email spam?) and regression/prediction (what will tomorrow's temperature be?). Note: Data Analytics != AI != ML, but they form a pipeline.",
        realLifeExample: "Netflix analyses viewing history (Data Analytics), trains ML recommendation algorithms on genre preference matrices, and serves dynamic AI movie suggestions.",
        examAnswers: {
          twoMark: "Artificial Intelligence (AI) is the broader discipline of creating intelligent machines, while Machine Learning (ML) is a specific subset of AI where systems learn patterns from training data.",
          fiveMark: "How Data Analytics, AI, and ML Interact:\n1. Data Analytics: Cleans and discovers historical patterns from raw information.\n2. Machine Learning: Uses that processed data to train predictive mathematical models.\n3. Artificial Intelligence: Uses the trained models to make automated, human-like autonomous decisions.\nFormula: Data -> Analytics -> Insights -> Machine Learning -> Artificial Intelligence.",
          tenMark: "In-Depth Study of Emerging Technologies in Modern Computing:\n\n1. Data Analytics Lifecycle: Data ingestion, data cleansing, exploratory data analysis, visualization (dashboards), and business intelligence.\n2. AI Taxonomy: Narrow/Weak AI (Siri, chess computers) vs General/Strong AI.\n3. Machine Learning Paradigms: Supervised learning (labeled data), Unsupervised learning (clustering customer segments), Reinforcement learning.\n4. Ethical and Career Dimensions: Algorithmic bias, data privacy (GDPR), job automation and emerging careers."
        },
        commonMistakes: "Writing that AI and Machine Learning are completely separate, unrelated fields.",
        mcqs: [
          {
            question: "Which of the following correctly describes the relationship between AI and Machine Learning?",
            options: [
              "Machine Learning is a subset of Artificial Intelligence",
              "Artificial Intelligence is a subset of Machine Learning",
              "They are completely unrelated opposing technologies",
              "Machine Learning only applies to computer hardware"
            ],
            correct: 0,
            difficulty: "Medium",
            explanation: "Machine Learning is a specialized branch and core subset of the broader field of Artificial Intelligence."
          }
        ],
        flashcards: [
          { front: "Explain the relationship: Data Analytics, AI, and Machine Learning.", back: "Data Analytics provides curated data insights; ML is a subset of AI that learns patterns from data; AI is the overarching system capable of autonomous reasoning." }
        ],
        recallQuestion: "State the core distinction between Artificial Intelligence and Machine Learning with a practical application."
      }
    ]
  },
  {
    unitId: 9,
    unitTitle: "Unit 9: Introduction to Freelancing",
    priority: 4,
    description: "Concepts, major freelancing fields, marketplace platforms, portfolio building, and overcoming challenges.",
    topics: [
      {
        id: "ict-u9-t1",
        title: "Freelancing Fundamentals, Marketplaces & Career Paths",
        priority: 4,
        simpleIdea: "Freelancing is being your own boss: offering your digital skills (like web design or copywriting) to international clients from the comfort of your desk.",
        simplerVersion: "ফ্রিল্যান্সিং হলো কোনো নির্দিষ্ট প্রতিষ্ঠানে স্থায়ী চাকরি না করে স্বাধীনভাবে বিভিন্ন দেশি-বিদেশি ক্লায়েন্টের কাজ চুক্তিভিত্তিক সম্পন্ন করে বৈদেশিক মুদ্রা আয় করা।",
        banglaExplanation: "ফ্রিল্যান্সিং হলো মুক্তপেশা যেখানে দক্ষ ব্যক্তিরা অনলাইন মার্কেটপ্লেসের (Upwork, Fiverr) মাধ্যমে ক্লায়েন্টদের নির্দিষ্ট কাজ ডেলিভারি দিয়ে আয় করেন। প্রধান ফিল্ডগুলো হলো Web Development, Graphics Design, Digital Marketing, Data Analytics, এবং Content Writing।",
        keywords: [
          { term: "Freelancer", def: "A self-employed individual who provides services to multiple clients on a contract or project basis." },
          { term: "Marketplace", def: "Online platforms (such as Upwork, Fiverr, Freelancer.com) connecting clients with skilled professionals." },
          { term: "Portfolio", def: "A curated collection of past work samples proving technical competence to prospective clients." }
        ],
        technicalExplanation: "Freelancers operate as independent micro-enterprises utilizing escrow payment systems, milestone billing, and contract bidding architectures. Success depends on technical mastery combined with professional communication, deadline management, and risk diversification.",
        realLifeExample: "A Bangladeshi developer building a customized responsive e-commerce website for a Canadian client through an escrow milestone contract on Upwork.",
        examAnswers: {
          twoMark: "Freelancing is self-employment where a professional offers specialized technical services to multiple clients on a flexible, project-based contract without permanent employment.",
          fiveMark: "Key Steps to Building a Successful Freelancing Career:\n1. Skill Acquisition: Master high-demand skills (e.g. Web Development, Graphics, Python).\n2. Portfolio Development: Build tangible real-world projects showing capability.\n3. Marketplace Profile: Create verified profiles on platforms like Upwork and Fiverr.\n4. Proposal Writing: Submit customized, solution-oriented bids.\n5. Professional Delivery: Meet strict deadlines, ensure quality, and cultivate 5-star client ratings.",
          tenMark: "Comprehensive Analysis of the Global Freelance Economy & Challenges:\n\n1. Prominent Freelancing Fields: Web & Software Development, UI/UX Design, Data Science, SEO & Digital Marketing, Technical Writing.\n2. Economic Impact: Foreign remittance inflow, reduction of youth unemployment, flexible remote lifestyle.\n3. Critical Challenges & Solutions:\n   - Payment Gateway constraints (PayPal availability, bank remittances).\n   - Income volatility and lack of employee benefits (insurance, retirement).\n   - Health and burnout management from irregular working hours."
        },
        commonMistakes: "Assuming freelancing requires no formal skills or that income is guaranteed without building a competitive portfolio.",
        mcqs: [
          {
            question: "Which of the following is an online freelancing marketplace?",
            options: ["Microsoft Excel", "Upwork", "Ubuntu Linux", "VLC Player"],
            correct: 1,
            difficulty: "Easy",
            explanation: "Upwork is one of the world's largest global marketplaces connecting freelancers and clients."
          }
        ],
        flashcards: [
          { front: "What is an escrow payment system in freelancing?", back: "A secure third-party holding mechanism where the client deposits funds before work begins and releases them upon project approval." }
        ],
        recallQuestion: "List 4 major freelancing career fields and 2 significant challenges faced by freelancers."
      }
    ]
  }
];
