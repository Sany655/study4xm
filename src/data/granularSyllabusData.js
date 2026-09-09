// ==========================================================================
// GRANULAR SYLLABUS DATA (NCTB ICT Units 1-9 & Economics Topics 1-10)
// Extracted from requirements/tisha study.docx & National Curriculum
// ==========================================================================

export const GRANULAR_ICT_SYLLABUS = [
  {
    unitId: 1,
    unitTitle: "ইউনিট ১: তথ্য ও যোগাযোগ প্রযুক্তি এবং কম্পিউটার সিস্টেম",
    subtopics: [
      {
        id: "ict-u1-sub1",
        title: "আইসিটির সংজ্ঞা, মৌলিক ধারণা ও পারিভাষিক শব্দ",
        titleEn: "Definition of ICT, basic concepts and terminologies",
        keywords: ["ICT", "Data Processing", "Telecommunication", "Digital Media"],
        coreConcept: "তথ্য তৈরি, প্রক্রিয়াকরণ, সংরক্ষণ ও আদান-প্রদানে কম্পিউটার ও টেলিযোগাযোগ মাধ্যমের সমন্বিত প্রযুক্তি।"
      },
      {
        id: "ict-u1-sub2",
        title: "উপাত্ত বনাম তথ্য (Data vs. Information)",
        titleEn: "Data and Information",
        keywords: ["Data", "Information", "Processing", "Context", "Decision Making"],
        coreConcept: "উপাত্ত হলো অপরিশোধিত বিচ্ছিন্ন উপাদান; প্রক্রিয়াজাত হয়ে অর্থপূর্ণ রূপ লাভ করলে তা তথ্যে পরিণত হয়।"
      },
      {
        id: "ict-u1-sub3",
        title: "আইসিটির প্রয়োগক্ষেত্র, সুবিধা ও অসুবিধা",
        titleEn: "Application of ICT, Advantages and Disadvantages of ICT",
        keywords: ["E-Governance", "Telemedicine", "E-Commerce", "Automation", "E-Waste"],
        coreConcept: "শিক্ষা, চিকিৎসা ও ব্যবসায়িক বিপ্লব এবং এর বিপরীতে সাইবার ঝুঁকি ও প্রযুক্তি নির্ভরতার চ্যালেঞ্জ।"
      },
      {
        id: "ict-u1-sub4",
        title: "সমাজে আইসিটির প্রভাব ও ক্যারিয়ারের সুযোগ",
        titleEn: "Impact of ICT, Career opportunities in ICT education",
        keywords: ["Global Village", "Software Industry", "Freelancing", "Digital Divide"],
        coreConcept: "সামাজিক রূপান্তর, গ্লোবাল ভিলেজ প্রতিষ্ঠা এবং দেশীয় ও আন্তর্জাতিক আইটি ক্যারিয়ারের দিগন্ত।"
      },
      {
        id: "ict-u1-sub5",
        title: "ইনফরমেশন প্রসেসিং সাইকেল (IPOS Cycle)",
        titleEn: "Information Processing Cycle",
        keywords: ["Input", "Processing", "Output", "Storage", "Feedback"],
        coreConcept: "কম্পিউটারের কার্যপদ্ধতির মূল ৪টি ধাপ: ইনপুট গ্রহণ, সিপিইউতে প্রক্রিয়াকরণ, আউটপুট প্রদান ও মেমোরিতে সংরক্ষণ।"
      },
      {
        id: "ict-u1-sub6",
        title: "কম্পিউটারের শ্রেণিবিভাগ (আকার, গঠন ও কার্যপ্রণালী)",
        titleEn: "Classification of Computers",
        keywords: ["Supercomputer", "Mainframe", "Minicomputer", "Microcomputer", "Analog", "Digital", "Hybrid"],
        coreConcept: "সুপার, মেইনফ্রেম, মিনি ও মাইক্রো কম্পিউটার এবং অ্যানালগ, ডিজিটাল ও হাইব্রিড কম্পিউটারের তুলনামূলক পার্থক্য।"
      },
      {
        id: "ict-u1-sub7",
        title: "সিস্টেম ইউনিটের অত্যাবশ্যকীয় উপাদানসমূহ",
        titleEn: "The Vital Components of the Systems Unit",
        keywords: ["Motherboard", "CPU Socket", "RAM Slots", "Power Supply Unit (PSU)", "Expansion Bus"],
        coreConcept: "মাদারবোর্ড, চিপসেট, প্রসেসর সকেট, বাস সিস্টেম ও পাওয়ার ইউনিটের অভ্যন্তরীণ আর্কিটেকচার।"
      }
    ]
  },
  {
    unitId: 2,
    unitTitle: "ইউনিট ২: কম্পিউটার হার্ডওয়্যার ও সফটওয়্যার",
    subtopics: [
      {
        id: "ict-u2-sub1",
        title: "কম্পিউটার হার্ডওয়্যারের ৫টি মূল ক্যাটাগরি",
        titleEn: "Categories of Computer Hardware (Input, Processing, Output, Storage, Communication)",
        keywords: ["Input Devices", "Processing Units", "Output Devices", "Storage Media", "NIC / Modem"],
        coreConcept: "ইনপুট, প্রসেসিং, আউটপুট, সেকেন্ডারি স্টোরেজ এবং নেটওয়ার্ক কমিউনিকেশন হার্ডওয়্যার।"
      },
      {
        id: "ict-u2-sub2",
        title: "প্রধান প্রসেসিং ডিভাইস: প্রসেসর, কন্ট্রোল ইউনিট ও এএলইউ",
        titleEn: "Main Processing Devices: The Processor, Control Unit, and ALU",
        keywords: ["Processor", "Control Unit (CU)", "Arithmetic Logic Unit (ALU)", "Registers", "Clock Speed"],
        coreConcept: "সিপিইউ কীভাবে গাণিতিক ও যৌক্তিক সিদ্ধান্ত নেয় (ALU) এবং নির্দেশাবলি নিয়ন্ত্রণ করে (CU)।"
      },
      {
        id: "ict-u2-sub3",
        title: "সফটওয়্যার প্যাকেজ ও অপারেটিং সিস্টেমের ভূমিকা",
        titleEn: "Software Packages, Operating Systems",
        keywords: ["System Software", "Application Software", "Kernel", "Device Drivers"],
        coreConcept: "সফটওয়্যারের মৌলিক শ্রেণিবিভাগ এবং কম্পিউটার হার্ডওয়্যারের প্রাণভোমরা হিসেবে ওএস।"
      },
      {
        id: "ict-u2-sub4",
        title: "অপারেটিং সিস্টেমের প্রকারভেদ ও ব্যবহার",
        titleEn: "Types and uses of Operating Systems",
        keywords: ["Single-user", "Multi-user", "Multitasking", "Real-Time OS", "Windows", "Linux", "macOS"],
        coreConcept: "সিঙ্গেল বনাম মাল্টিইউজার ওএস, টাইম-শেয়ারিং ও রিয়েল-টাইম অপারেটিং সিস্টেমের তুলনামূলক বিচার।"
      },
      {
        id: "ict-u2-sub5",
        title: "অ্যাপ্লিকেশন সফটওয়্যারের প্রকারভেদ (শিক্ষা, গেম, গ্রাফিক্স, ডেটাবেস)",
        titleEn: "Types and uses of Application Software",
        keywords: ["Educational Software", "Gaming Engines", "CAD / Photoshop", "DBMS / SQL"],
        coreConcept: "ব্যবহারকারীর নির্দিষ্ট চাহিদা পূরণের জন্য তৈরি কাস্টম ও প্যাকেজ অ্যাপ্লিকেশন সফটওয়্যার।"
      },
      {
        id: "ict-u2-sub6",
        title: "ওয়েব ব্রাউজার: কার্যপ্রণালী ও প্রধান ব্রাউজারসমূহ",
        titleEn: "Browsers: Chrome, Firefox, Opera, Edge",
        keywords: ["Rendering Engine", "HTTP/HTTPS", "Cache", "Cookies", "DNS Lookup"],
        coreConcept: "ব্রাউজার কীভাবে এইচটিএমএল, সিএসএস ও জাভাস্ক্রিপ্ট রেন্ডার করে ওয়েব পেজ প্রদর্শন করে।"
      },
      {
        id: "ict-u2-sub7",
        title: "প্রোপ্রাইটারি বনাম ওপেন সোর্স সফটওয়্যার",
        titleEn: "Proprietary and Open Source Software",
        keywords: ["Open Source", "Proprietary", "GPL License", "Source Code", "Freeware"],
        coreConcept: "লাইসেন্সিং নীতিমালা, সোর্স কোডের উন্মুক্ততা ও কমিউনিটি সহায়তার তুলনামূলক বিশ্লেষণ।"
      }
    ]
  },
  {
    unitId: 3,
    unitTitle: "ইউনিট ৩: ওয়ার্ড প্রসেসিং অ্যাপ্লিকেশন",
    subtopics: [
      {
        id: "ict-u3-sub1",
        title: "ওয়ার্ড প্রসেসিং প্যাকেজ ও এদের বাস্তব ব্যবহার",
        titleEn: "Word Processing Packages and Their Uses",
        keywords: ["MS Word", "Google Docs", "LibreOffice Writer", "Typing", "Formatting"],
        coreConcept: "অফিসিয়াল নথি, প্রতিবেদন ও অ্যাসাইনমেন্ট তৈরির প্রধান ওয়ার্ড প্রসেসিং সফটওয়্যার।"
      },
      {
        id: "ict-u3-sub2",
        title: "ডকুমেন্ট তৈরি ও সেভ করা (Save vs. Save As)",
        titleEn: "Creating a Document and Saving Using ‘Save As’",
        keywords: ["Save", "Save As", "File Formats (.docx, .pdf)", "Directory Path"],
        coreConcept: "নতুন ডকুমেন্ট সংরক্ষণ, ফাইল ফরম্যাট পরিবর্তন এবং ভিন্ন নামে সেভ করার কৌশল।"
      },
      {
        id: "ict-u3-sub3",
        title: "টেক্সট এডিটিং টুলস (Cut, Copy, Paste, Undo/Redo, Find/Replace, Wrap)",
        titleEn: "Editing a Word Document Using Editing Tools",
        keywords: ["Clipboard", "Text Wrapping", "Find & Replace", "Undo / Redo Shortcuts"],
        coreConcept: "ক্লিপবোর্ড অপারেশন, কিবোর্ড শর্টকাট এবং ডকুমেন্টে টেক্সটের সুষম মোড়কবিন্যাস।"
      },
      {
        id: "ict-u3-sub4",
        title: "টেবিল ও বিশেষ সিম্বল এবং ছবি সন্নিবেশকরণ",
        titleEn: "Inserting a Table, Symbols and Pictures",
        keywords: ["Table Grid", "Merge Cells", "Unicode Symbols", "Image Alignment", "Caption"],
        coreConcept: "সারিবদ্ধ তথ্য প্রদর্শনে টেবিল গঠন, সেল মার্জ করা এবং গ্রাফিক্সের অবস্থান বিন্যাস।"
      },
      {
        id: "ict-u3-sub5",
        title: "হেডার, ফুটার, পেজ নম্বর, ড্রপ ক্যাপ ও ওয়ার্ড আর্ট",
        titleEn: "Header, Footer, Page Number, Drop Cap, WordArt",
        keywords: ["Header", "Footer", "Drop Cap", "WordArt", "Page Numbering"],
        coreConcept: "পেশাদার বই বা গবেষণাপত্রের মতো শীর্ষচরণ, পাদটীকা ও আকর্ষণীয় শৈল্পিক অক্ষরের বিন্যাস।"
      },
      {
        id: "ict-u3-sub6",
        title: "পেজ ডিজাইন: ওয়াটারমার্ক, পেজ বর্ডার ও পেজ সেটআপ",
        titleEn: "Page Design: Watermark, Page Border, Page Setup / Print",
        keywords: ["Watermark", "Page Border", "Margins", "Orientation (Portrait/Landscape)", "Print Preview"],
        coreConcept: "ডকুমেন্টের নিরাপত্তা ও নান্দনিকতায় জলছাপ, বর্ডার এবং প্রিন্ট মার্জিন নির্ধারণ।"
      }
    ]
  },
  {
    unitId: 4,
    unitTitle: "ইউনিট ৪: স্প্রেডশিট অ্যাপ্লিকেশন",
    subtopics: [
      {
        id: "ict-u4-sub1",
        title: "স্প্রেডশিট প্যাকেজ ও ডেটা ব্যবস্থাপনায় এর গুরুত্ব",
        titleEn: "Spreadsheet Packages (Excel) & Importance in Data Management",
        keywords: ["MS Excel", "Google Sheets", "Financial Modeling", "Data Analysis"],
        coreConcept: "গাণিতিক হিসাব, বাণিজ্যিক বিশ্লেষণ ও স্বয়ংক্রিয় হিসাব ব্যবস্থাপনায় স্প্রেডশিটের ভূমিকা।"
      },
      {
        id: "ict-u4-sub2",
        title: "মৌলিক পরিভাষা: সেল, রো, কলাম, ওয়ার্কশিট ও ওয়ার্কবুক",
        titleEn: "Concepts: Cells, Rows, Columns, Worksheet, Workbook",
        keywords: ["Cell Address (A1)", "Row Index", "Column Letter", "Worksheet Tabs", "Workbook"],
        coreConcept: "গ্রিড আর্কিটেকচার, কলাম ও সারির ছেদবিন্দু হিসেবে সেলের অনন্য পরিচয় ও ওয়ার্কবুকের গঠন।"
      },
      {
        id: "ict-u4-sub3",
        title: "স্প্রেডশিট উইন্ডোর টুলবার: ফর্মুলা বার, স্ট্যান্ডার্ড ও ফরম্যাটিং বার",
        titleEn: "Spreadsheet Window Toolbars: Formula Bar, Standard & Formatting Bar",
        keywords: ["Formula Bar (fx)", "Name Box", "Ribbon Bar", "Status Bar"],
        coreConcept: "ফর্মুলা ও ফাংশন টাইপ করার ফর্মুলা বার এবং সেল ভ্যালু মনিটর করার নেম বক্সের কার্যাবলি।"
      },
      {
        id: "ict-u4-sub4",
        title: "স্প্রেডশিটের ডেটা টাইপসমূহ (সংখ্যা, তারিখ, টেক্সট ও কারেন্সি)",
        titleEn: "Types of Data and Their Uses (Number, Date, Text, Currency)",
        keywords: ["Numeric Data", "Text / String", "Date/Time Format", "Currency Format"],
        coreConcept: "স্বয়ংক্রিয় গণনা নিশ্চিতকরণে ডেটা ফরম্যাট ঠিক রাখা এবং ভুল এড়ানোর কৌশল।"
      },
      {
        id: "ict-u4-sub5",
        title: "সহজ ফর্মুলা ও ফাংশন গঠন (=SUM, =AVERAGE, =MAX, =MIN, =COUNT)",
        titleEn: "Constructing and Inserting Simple Formulae and Functions",
        keywords: ["=SUM()", "=AVERAGE()", "=MAX()", "=MIN()", "=COUNT()", "Cell Range (A1:A10)"],
        coreConcept: "সেল রেঞ্জের ওপর সাধারণ গাণিতিক ও পরিসংখ্যানমূলক ফাংশন চালনা করার নিয়ম।"
      },
      {
        id: "ict-u4-sub6",
        title: "গ্রাফ ও চার্ট অঙ্কন এবং ওয়ার্কশিট প্রিন্টিং",
        titleEn: "Drawing Graphs/Charts, Editing and Printing Worksheet",
        keywords: ["Bar Chart", "Pie Chart", "Line Graph", "Print Area", "Gridlines on Print"],
        coreConcept: "সংখ্যাভিত্তিক ডেটাকে দৃষ্টিনন্দন চার্টে রূপান্তর এবং প্রয়োজনীয় প্রিন্ট এরিয়া নির্বাচন।"
      }
    ]
  },
  {
    unitId: 5,
    unitTitle: "ইউনিট ৫: প্রেজেন্টেশন অ্যাপ্লিকেশন",
    subtopics: [
      {
        id: "ict-u5-sub1",
        title: "প্রেজেন্টেশন প্যাকেজ ও উপস্থাপনার আধুনিক ডিভাইস",
        titleEn: "Presentation Packages and Devices Used for Presenting",
        keywords: ["PowerPoint", "Google Slides", "Multimedia Projector", "Presenter Remote", "Smart Board"],
        coreConcept: "শ্রোতার সামনে বক্তব্য প্রাঞ্জল করতে পাওয়ারপয়েন্ট ও প্রজেক্টরের সমন্বিত ব্যবহার।"
      },
      {
        id: "ict-u5-sub2",
        title: "প্রেজেন্টেশন ডিজাইনের মৌলিক নীতি ও মূল পরিভাষা",
        titleEn: "Principles for Designing Presentations & Terminologies",
        keywords: ["Slide Layout", "Slide Transitions", "Slide Show", "Color Contrast", "6x6 Rule"],
        coreConcept: "অতিরিক্ত তথ্য পরিহার করে পরিষ্কার টাইপোগ্রাফি ও কনট্রাস্ট মেনে পেশাদার স্লাইড তৈরির নিয়ম।"
      },
      {
        id: "ict-u5-sub3",
        title: "প্রেজেন্টেশন উইন্ডোর টুলবার ও বিভিন্ন ভিউ মোড",
        titleEn: "Window Features and Different Presentation View Modes",
        keywords: ["Normal View", "Slide Sorter", "Notes Page View", "Reading View", "Slide Master"],
        coreConcept: "স্লাইড সাজানো, বড় পরিসরে পুনর্বিন্যাস (Slide Sorter) এবং স্পিকার নোট যুক্ত করার ভিউ।"
      },
      {
        id: "ict-u5-sub4",
        title: "স্লাইডে এলিমেন্ট যোগ, ট্রানজিশন ও অ্যানিমেশন ইফেক্ট",
        titleEn: "Adding Elements, Slide Transition & Animation Effects",
        keywords: ["Slide Transition", "Entrance Animation", "Emphasis Animation", "Exit Animation", "Timing"],
        coreConcept: "এক স্লাইড থেকে অন্য স্লাইডে যাওয়ার রূপান্তর (Transition) বনাম স্লাইডের ভেতরের বস্তুর চলন (Animation)।"
      },
      {
        id: "ict-u5-sub5",
        title: "প্রেজেন্টেশন প্রিন্ট অপশনসমূহ (Handouts, Notes, Outline)",
        titleEn: "Selection of Print Option: Entire, Handouts, Notes Pages, Outline",
        keywords: ["Handouts (3/6 per page)", "Notes Pages", "Outline View", "Grayscale Print"],
        coreConcept: "শ্রোতাদের পড়ার জন্য হ্যান্ডআউটস প্রিন্ট করা এবং বক্তার নিজের জন্য নোটস পেজ প্রিন্ট করা।"
      }
    ]
  },
  {
    unitId: 6,
    unitTitle: "ইউনিট ৬: তথ্য নিরাপত্তা ও প্রাইভেসী",
    subtopics: [
      {
        id: "ict-u6-sub1",
        title: "তথ্য নিরাপত্তার মৌলিক ধারণা ও ডিজিটাল নৈতিকতা",
        titleEn: "Introduction to Information Security & Ethics in Digital World",
        keywords: ["CIA Triad (Confidentiality, Integrity, Availability)", "Cyber Ethics", "Digital Citizenship"],
        coreConcept: "তথ্যের গোপনীয়তা, অখণ্ডতা ও সহজপ্রাপ্যতা রক্ষা এবং সাইবার স্পেসে সৎ আচরণের বিধান।"
      },
      {
        id: "ict-u6-sub2",
        title: "সাইবার অপরাধ ও ডস/ডিডস আক্রমণ (DoS & DDoS)",
        titleEn: "Cybercrime, DoS and DDoS Attack",
        keywords: ["Cybercrime", "Denial of Service (DoS)", "DDoS", "Botnet", "Traffic Flooding"],
        coreConcept: "বটনেট ও জাল ট্রাফিকের মাধ্যমে সার্ভারের স্বাভাবিক সেবা বন্ধ করে দেওয়ার কৌশল।"
      },
      {
        id: "ict-u6-sub3",
        title: "কী-ম্যানেজমেন্ট, ডিজিটাল স্বাক্ষর ও ডিজিটাল সার্টিফিকেট",
        titleEn: "Key Management, Digital Signature and Certifications",
        keywords: ["Public Key", "Private Key", "Digital Signature", "SSL/TLS Certificate", "CA Authority"],
        coreConcept: "অপ্রতিসম ক্রিপ্টোগ্রাফি দিয়ে প্রেরকের পরিচয় নিশ্চিত করা এবং তথ্যের বিকৃতি রোধ।"
      },
      {
        id: "ict-u6-sub4",
        title: "প্রাইভেসী, ডেটা সিকিউরিটি, দুর্বলতা, হুমকি ও ঝুঁকি",
        titleEn: "Privacy, Data Security, Vulnerability, Threat and Risk",
        keywords: ["Vulnerability (দুর্বলতা)", "Threat (হুমকি)", "Risk (ঝুঁকি)", "Data Breach"],
        coreConcept: "সিস্টেমের ত্রুটি (Vulnerability), সম্ভাব্য বিপদ (Threat) এবং এদের সমন্বিত ক্ষতি (Risk)।"
      },
      {
        id: "ict-u6-sub5",
        title: "ম্যালওয়্যার, সোশ্যাল ইঞ্জিনিয়ারিং, হ্যাকিং, ফিশিং ও পাইরেসি",
        titleEn: "Malware, Social Engineering, Hacking, Phishing, Software Piracy",
        keywords: ["Phishing", "Social Engineering", "Ethical Hacking", "Software Piracy", "Plagiarism"],
        coreConcept: "মানুষকে ফাঁদে ফেলে পাসওয়ার্ড চুরি (Phishing) এবং সফটওয়্যারের লাইসেন্স ছাড়া নকল ব্যবহার।"
      },
      {
        id: "ict-u6-sub6",
        title: "স্প্যাম, অ্যাডওয়্যার, স্পাইওয়্যার, র্যানসমওয়্যার ও ভাইরাস/ওয়ার্ম",
        titleEn: "Spam, Adware, Spyware, Ransomware, Worms and Viruses",
        keywords: ["Ransomware", "Spyware", "Trojan Horse", "Worm", "Antivirus"],
        coreConcept: "কম্পিউটারের ফাইল লক করে মুক্তিপণ দাবি (Ransomware) ও নিজে নিজে ছড়িয়ে পড়া ক্ষতিকর কোড (Worm)।"
      }
    ]
  },
  {
    unitId: 7,
    unitTitle: "ইউনিট ৭: ইন্টারনেট ব্যবহার করে যোগাযোগ ও তথ্য আহরণ",
    subtopics: [
      {
        id: "ict-u7-sub1",
        title: "ইন্টারনেট পরিচিতি, আইপি অ্যাড্রেস ও ম্যাক অ্যাড্রেস",
        titleEn: "Introduction to Internet, IP Address, MAC Address",
        keywords: ["IP Address (Logical)", "MAC Address (Physical NIC)", "Packets", "Router"],
        coreConcept: "ভৌত হার্ডওয়্যার ঠিকানা (MAC) বনাম নেটওয়ার্কের পরিবর্তনযোগ্য লজিক্যাল ঠিকানা (IP)।"
      },
      {
        id: "ict-u7-sub2",
        title: "ওএসআই রেফারেন্স মডেল (OSI 7-Layers) ও TCP/IP স্ট্যাক",
        titleEn: "Internet Services, OSI Reference Model, TCP/IP Protocol Stack",
        keywords: ["Application Layer", "Transport Layer (TCP/UDP)", "Network Layer (IP)", "Data Link", "Physical"],
        coreConcept: "নেটওয়ার্ক যোগাযোগের আন্তর্জাতিক ৭টি স্তর এবং প্যাকেট এনক্যাপসুলেশন ও ডিক্যাপসুলেশন।"
      },
      {
        id: "ict-u7-sub3",
        title: "আইপিভি৪ বনাম আইপিভি৬, সাবনেট মাস্কিং ও ট্রাবলশুটিং",
        titleEn: "IPv4, IPv6, Subnet Masking, Network Configuration and Troubleshooting",
        keywords: ["IPv4 (32-bit)", "IPv6 (128-bit)", "Subnet Mask", "Default Gateway", "Ping / Tracert"],
        coreConcept: "৩২-বিট অ্যাড্রেস সংকট দূরীকরণে ১২৮-বিট হেক্সাডেসিমেল আইপিভি৬ এবং নেটওয়ার্ক সমস্যা সমাধান।"
      },
      {
        id: "ict-u7-sub4",
        title: "ওয়াই-ফাই, ব্রডব্যান্ড ও ইমেইল যোগাযোগ",
        titleEn: "Wi-Fi, Broadband, Email Usage (Creating, Sending, Attachments)",
        keywords: ["Wi-Fi (802.11)", "Fiber Broadband", "SMTP", "IMAP/POP3", "Attachments"],
        coreConcept: "তারবিহীন রেডিও তরঙ্গ দিয়ে লোকাল নেটওয়ার্ক এবং ইমেইল আদান-প্রদানের প্রোটোকল।"
      },
      {
        id: "ict-u7-sub5",
        title: "ইন্টারনেট নীতিমালা, প্রাইভেসী, স্প্যাম ও মেধা স্বত্বাধিকার (IPR)",
        titleEn: "Rules and Regulations, Spam, Privacy, Intellectual Property Rights, ICT Policy",
        keywords: ["Intellectual Property Rights (IPR)", "Copyright Law", "ICT Act", "Cyber Safety"],
        coreConcept: "অনলাইন কপিরাইট আইন লঙ্ঘন প্রতিরোধ এবং সাইবার সুরক্ষা বিধিমালার প্রয়োগ।"
      },
      {
        id: "ict-u7-sub6",
        title: "ক্লাউড স্টোরেজ ও ওয়েব সেবা (Google Drive, OneDrive, Dropbox)",
        titleEn: "Using Cloud Space: Google Drive, Workspace, OneDrive, Dropbox, URLs & Search",
        keywords: ["Cloud Computing", "Google Drive", "OneDrive", "Dropbox", "Sync", "URL Architecture"],
        coreConcept: "রিমোট সেন্ট্রাল সার্ভারে ডেটা সংরক্ষণ, সার্বক্ষণিক অ্যাক্সেস এবং দলগত ফাইল শেয়ারিং।"
      }
    ]
  },
  {
    unitId: 8,
    unitTitle: "ইউনিট ৮: উদীয়মান প্রযুক্তি — ডেটা অ্যানালিটিক্স, কৃত্রিম বুদ্ধিমত্তা ও মেশিন লার্নিং",
    subtopics: [
      {
        id: "ict-u8-sub1",
        title: "ডেটা অ্যানালিটিক্স পরিচিতি: উপাত্তের প্রকারভেদ ও মূল ধাপসমূহ",
        titleEn: "Introduction to Data Analytics: What is Data? Types and Basic Steps",
        keywords: ["Structured Data", "Unstructured Data", "Data Cleaning", "Data Visualization", "BI Tools"],
        coreConcept: "কাঁচা ডেটা সংগ্রহ, পরিচ্ছন্নকরণ এবং ব্যবসায়িক সিদ্ধান্ত নেওয়ার জন্য তথ্য রূপান্তর।"
      },
      {
        id: "ict-u8-sub2",
        title: "কৃত্রিম বুদ্ধিমত্তা (AI): সংজ্ঞা, মানব মস্তিষ্কের অনুকরণ ও ক্ষেত্রসমূহ",
        titleEn: "Artificial Intelligence (AI): Machine Human-like Thinking and Capabilities",
        keywords: ["Artificial Intelligence (AI)", "Natural Language Processing (NLP)", "Computer Vision", "Chatbots"],
        coreConcept: "মানুষের মতো যুক্তি প্রয়োগ, ভাষা বোঝা ও সিদ্ধান্ত গ্রহণে সক্ষম কম্পিউটার সিস্টেম।"
      },
      {
        id: "ict-u8-sub3",
        title: "মেশিন লার্নিং (ML): কার্যপদ্ধতি, ট্রেনিং ডেটা ও শ্রেণিবিভাগ",
        titleEn: "Machine Learning (ML): Definition, How It Works, Classification and Examples",
        keywords: ["Supervised Learning", "Unsupervised Learning", "Training Data", "Prediction Model"],
        coreConcept: "স্পষ্ট কোডিং ছাড়া অতীতের অভিজ্ঞতা ও ডেটার প্যাটার্ন বিশ্লেষণ করে স্বয়ংক্রিয় শিখন।"
      },
      {
        id: "ict-u8-sub4",
        title: "সম্পর্ক: ডেটা অ্যানালিটিক্স বনাম এআই বনাম মেশিন লার্নিং",
        titleEn: "Relationship Between Data Analytics, AI, and ML",
        keywords: ["Analytics vs AI vs ML", "Overlap", "Predictive Analytics", "Deep Learning"],
        coreConcept: "ডেটা অ্যানালিটিক্স != এআই != এমএল; কীভাবে এরা পরস্পরের পরিপূরক হিসেবে কাজ করে।"
      },
      {
        id: "ict-u8-sub5",
        title: "এআই ও মেশিন লার্নিংয়ের সুবিধা, নৈতিক চ্যালেঞ্জ ও ভবিষ্যতের ক্যারিয়ার",
        titleEn: "Benefits and Challenges of AI/ML, Future Trends and Career Paths",
        keywords: ["AI Ethics", "Job Automation", "Algorithmic Bias", "AI Prompt Engineering", "Data Scientist"],
        coreConcept: "কাজের দক্ষতা বৃদ্ধি বনাম মানুষের কর্মসংস্থান ঝুঁকি এবং নতুন যুগের উদ্ভাবনী ক্যারিয়ার।"
      }
    ]
  },
  {
    unitId: 9,
    unitTitle: "ইউনিট ৯: ফ্রিল্যান্সিং পরিচিতি",
    subtopics: [
      {
        id: "ict-u9-sub1",
        title: "ফ্রিল্যান্সিংয়ের মৌলিক ধারণা ও জনপ্রিয় কর্মক্ষেত্রসমূহ",
        titleEn: "Introduction to Freelancing, Basic Concepts and Fields",
        keywords: ["Freelancing", "Independent Contractor", "Web Dev", "Graphic Design", "Content Writing"],
        coreConcept: "নির্দিষ্ট কোনো প্রতিষ্ঠানের অধীনে না থেকে চুক্তির ভিত্তিতে স্বাধীনভাবে সেবা প্রদানের পেশা।"
      },
      {
        id: "ict-u9-sub2",
        title: "ফ্রিল্যান্সিংয়ের আবশ্যকীয় দক্ষতা ও মানসিক প্রস্তুতি",
        titleEn: "Essential Skills and Preparation for Freelancing",
        keywords: ["Hard Skills", "Soft Skills", "English Communication", "Time Management", "Portfolio"],
        coreConcept: "কারিগরী দক্ষতার পাশাপাশি বিদেশি গ্রাহকদের সাথে যোগাযোগের ইংরেজি ও নিয়মানুবর্তিতা।"
      },
      {
        id: "ict-u9-sub3",
        title: "আন্তর্জাতিক ফ্রিল্যান্সিং মার্কেটপ্লেস ও কাজের ধরন",
        titleEn: "Introduction to Freelancing Marketplaces (Upwork, Fiverr, Freelancer)",
        keywords: ["Upwork", "Fiverr", "Gig System", "Hourly vs Fixed Contract", "Escrow Payment"],
        coreConcept: "আন্তর্জাতিক মার্কেটপ্লেসে একাউন্ট তৈরি, গিগ বা বিড করা এবং নিরাপদ পেমেন্ট গেটওয়ে।"
      },
      {
        id: "ict-u9-sub4",
        title: "একটি সফল ফ্রিল্যান্সিং ক্যারিয়ার গড়ে তোলা ও ক্লায়েন্ট ধরে রাখা",
        titleEn: "Building a Freelancing Career and Client Retention",
        keywords: ["Personal Branding", "Reviews & Ratings", "Long-term Clients", "Niche Specialization"],
        coreConcept: "উচ্চমানের সেবা ও যথাসময়ে কাজ ডেলিভারি দিয়ে দীর্ঘমেয়াদী স্থায়ী আয় নিশ্চিতকরণ।"
      },
      {
        id: "ict-u9-sub5",
        title: "ফ্রিল্যান্সিংয়ের বাস্তব চ্যালেঞ্জ, সমস্যা ও কার্যকর সমাধান",
        titleEn: "Challenges, Problems, and Solutions in Freelancing",
        keywords: ["Income Instability", "Burnout", "Payment Disputes", "Continuous Upskilling"],
        coreConcept: "আয়ের অনিশ্চয়তা ও কাজের চাপের মানসিক ক্লান্তি মোকাবেলা করে পেশাদারিত্ব বজায় রাখা।"
      }
    ]
  }
];

export const GRANULAR_ECONOMICS_SYLLABUS = [
  {
    topicId: 1,
    title: "টপিক ১: অর্থনীতির মৌলিক বিষয় ও অর্থনৈতিক সমস্যা",
    subtopics: [
      {
        id: "econ-t1-sub1",
        title: "অর্থনীতির সংজ্ঞা, পরিধি ও প্রকৃতি",
        titleEn: "Definition, Nature and Scope of Economics",
        keywords: ["Adam Smith", "Alfred Marshall", "Lionel Robbins", "Wealth", "Welfare", "Scarcity"],
        coreConcept: "অভাব ও সীমিত সম্পদের সম্পর্ক বিষয়ক বিজ্ঞান হিসেবে অর্থনীতির বিকাশ ও পরিধি।"
      },
      {
        id: "econ-t1-sub2",
        title: "সম্পদের দুষ্প্রাপ্যতা ও পছন্দের সমস্যা",
        titleEn: "Scarcity of Resources and Problems of Choice",
        keywords: ["Scarcity", "Problem of Choice", "Unlimited Wants", "Resource Allocation"],
        coreConcept: "অসীম অভাবের বিপরীতে সীমিত ও বিকল্প ব্যবহারযোগ্য সম্পদের অগ্রাধিকার নির্ধারণের বাধ্যবাধকতা।"
      },
      {
        id: "econ-t1-sub3",
        title: "সুযোগ ব্যয় ও উৎপাদন সম্ভাবনা রেখা (PPC)",
        titleEn: "Opportunity Cost and Production Possibility Curve (PPC)",
        keywords: ["Opportunity Cost", "PPC / PPF", "Marginal Rate of Transformation (MRT)", "Trade-off"],
        coreConcept: "একটি দ্রব্য অতিরিক্ত পেতে অন্য দ্রব্য ত্যাগের পরিমাণ এবং পিসিপি রেখার জ্যামিতিক রূপ।"
      },
      {
        id: "econ-t1-sub4",
        title: "ইতিবাচক বনাম নীতিবাচক অর্থনীতি (Positive vs. Normative)",
        titleEn: "Positive and Normative Economics",
        keywords: ["Positive ('What is')", "Normative ('What ought to be')", "Value Judgement", "Empirical Data"],
        coreConcept: "তথ্যনির্ভর বর্ণনামূলক বিজ্ঞান বনাম আদর্শিক ও নীতিভিত্তিক বিশ্লেষণের তফাত।"
      },
      {
        id: "econ-t1-sub5",
        title: "অর্থনৈতিক দক্ষতা, সমতা ও অনানুষ্ঠানিক অর্থনীতি",
        titleEn: "Efficiency and Equity, Informal Economics",
        keywords: ["Productive Efficiency", "Allocative Efficiency", "Equity", "Informal Sector"],
        coreConcept: "উৎপাদন ও বণ্টন দক্ষতা, সমাজে আয়ের ন্যায়সংগত বণ্টন এবং অপ্রাতিষ্ঠানিক খাতের ভূমিকা।"
      }
    ]
  },
  {
    topicId: 2,
    title: "টপিক ২: চাহিদা, যোগান ও বাজার ভারসাম্য",
    subtopics: [
      {
        id: "econ-t2-sub1",
        title: "চাহিদা ও চাহিদার পরিমাণ, চাহিদা সূচি ও চাহিদা রেখা",
        titleEn: "Demand and Quantity Demanded, Demand Schedule, Demand Curve",
        keywords: ["Law of Demand", "Demand Schedule", "Downward Slope", "Negative Price-Demand Relation"],
        coreConcept: "অন্যান্য অবস্থা অপরিবর্তিত থাকলে দাম বাড়লে চাহিদা কমার সম্পর্ক ও বাম থেকে ডানে নিম্নগামী রেখা।"
      },
      {
        id: "econ-t2-sub2",
        title: "যোগান ও যোগানের পরিমাণ, যোগান সূচি ও যোগান রেখা",
        titleEn: "Supply and Quantity Supplied, Supply Schedule, Supply Curve",
        keywords: ["Law of Supply", "Supply Schedule", "Upward Slope", "Positive Price-Supply Relation"],
        coreConcept: "দাম ও যোগানের পরিমাণের মধ্যকার প্রত্যক্ষ সম্পর্ক এবং ঊর্ধ্বগামী যোগান রেখা।"
      },
      {
        id: "econ-t2-sub3",
        title: "রেখায় সঞ্চালন (Movement) বনাম রেখার স্থানান্তর (Shift)",
        titleEn: "Movement along Curve vs Shift of Curve (Demand & Supply)",
        keywords: ["Change in Quantity Demanded (Movement)", "Change in Demand (Shift)", "Non-price Determinants"],
        coreConcept: "শুধুমাত্র দামের প্রভাবে সঞ্চালন বনাম আয়/পছন্দ/প্রযুক্তির কারণে সম্পূর্ণ রেখার স্থানবদল।"
      },
      {
        id: "econ-t2-sub4",
        title: "বাজার ভারসাম্য: ভারসাম্য দাম ও পরিমাণ নির্ধারণ",
        titleEn: "Market Equilibrium: Price and Quantity Determination",
        keywords: ["Equilibrium Price (Pe)", "Equilibrium Quantity (Qe)", "Excess Demand (Shortage)", "Excess Supply (Surplus)"],
        coreConcept: "যেখানে চাহিদা ও যোগান রেখা পরস্পর ছেদ করে ($Q_d = Q_s$) সেখানে স্থিতিশীল ভারসাম্য সৃষ্টি।"
      },
      {
        id: "econ-t2-sub5",
        title: "চাহিদার স্থিতিস্থাপকতা: দাম, আয় ও আড়াআড়ি স্থিতিস্থাপকতা",
        titleEn: "Elasticity of Demand: Price, Income and Cross Elasticity",
        keywords: ["Price Elasticity (Ep)", "Income Elasticity (Ey)", "Cross Elasticity (Exy)", "Substitute vs Complement"],
        coreConcept: "দামের শতকরা পরিবর্তনের প্রেক্ষিতে চাহিদার শতকরা সংবেদনশীলতা পরিমাপের সমীকরণ।"
      }
    ]
  },
  {
    topicId: 3,
    title: "টপিক ৩: ভোক্তা ও উৎপাদকের আচরণ তত্ত্ব",
    subtopics: [
      {
        id: "econ-t3-sub1",
        title: "সংখ্যাগত বনাম পর্যায়গত উপযোগ বিশ্লেষণ (Cardinal vs. Ordinal)",
        titleEn: "Cardinal and Ordinal Utility Analyses",
        keywords: ["Utility (উপযোগ)", "Cardinal (Utils)", "Ordinal (Indifference Curves)", "Marshall vs Hicks"],
        coreConcept: "উপযোগকে ১, ২, ৩ হিসেবে সংখ্যায় মাপা (মার্শাল) বনাম পছন্দক্রমে সাজানো (হিকস)।"
      },
      {
        id: "econ-t3-sub2",
        title: "মোট উপযোগ (TU) ও প্রান্তিক উপযোগ (MU) এর সম্পর্ক",
        titleEn: "Total Utility (TU) and Marginal Utility (MU)",
        keywords: ["Total Utility (TU)", "Marginal Utility (MU = delta TU/delta Q)", "Maximum Point", "Zero MU"],
        coreConcept: "ভোগ বাড়ার সাথে সাথে TU বাড়ে কিন্তু ক্রমহ্রাসমান হারে; TU যখন সর্বোচ্চ, তখন MU শূন্য হয়।"
      },
      {
        id: "econ-t3-sub3",
        title: "ক্রমহ্রাসমান প্রান্তিক উপযোগ বিধি (Law of Diminishing MU)",
        titleEn: "Law of Diminishing Marginal Utility",
        keywords: ["Diminishing MU", "Assumptions (সমজাতীয় দ্রব্য, সময় অপরিবর্তিত)", "Consumer Satiety"],
        coreConcept: "একই দ্রব্য ক্রমাগত ভোগ করতে থাকলে অতিরিক্ত একক থেকে প্রাপ্ত তৃপ্তি ক্রমশ কমে যায়।"
      },
      {
        id: "econ-t3-sub4",
        title: "সম-প্রান্তিক উপযোগ বিধি ও ভোক্তার ভারসাম্য",
        titleEn: "Equi-Marginal Utility and Consumer Equilibrium",
        keywords: ["Equi-Marginal Principle", "MUx / Px = MUy / Py", "Budget Constraint", "Maximum Satisfaction"],
        coreConcept: "ভোক্তা তখনই সর্বোচ্চ তৃপ্তি পায় যখন বিভিন্ন পণ্যের প্রান্তিক উপযোগ ও তাদের দামের অনুপাত সমান হয়।"
      },
      {
        id: "econ-t3-sub5",
        title: "ভোক্তার উদ্বৃত্ত (Consumer Surplus)",
        titleEn: "Consumer Surplus: Concept and Measurement",
        keywords: ["Consumer Surplus", "Willingness to Pay (WTP)", "Actual Market Price", "Welfare Area"],
        coreConcept: "ক্রেতা কোনো পণ্যের জন্য যে দাম দিতে প্রস্তুত ছিল এবং প্রকৃতপক্ষে যে দাম দিয়েছে—এই দুইয়ের ব্যবধান।"
      }
    ]
  },
  {
    topicId: 4,
    title: "টপিক ৪: উৎপাদন ও উৎপাদন ব্যয়",
    subtopics: [
      {
        id: "econ-t4-sub1",
        title: "উৎপাদন অপেক্ষক ও স্বল্পকালীন এক পরিবর্তনশীল উপকরণ",
        titleEn: "Production Function with One Variable Input (Short Run)",
        keywords: ["Production Function Q=f(L, K)", "Total Product (TP)", "Marginal Product (MP)", "Average Product (AP)"],
        coreConcept: "স্থির মূলধনে শ্রম বাড়ালে উৎপাদনের বৃদ্ধি এবং ক্রমহ্রাসমান উৎপাদন বিধির কার্যকারিতা।"
      },
      {
        id: "econ-t4-sub2",
        title: "দীর্ঘকালীন উৎপাদন অপেক্ষক ও মাত্রাগত উৎপাদন (Returns to Scale)",
        titleEn: "Production with Two Variable Inputs & Returns to Scale",
        keywords: ["Returns to Scale", "Increasing Returns", "Constant Returns", "Decreasing Returns", "Isoquants"],
        coreConcept: "সকল উপকরণ একই অনুপাতে বৃদ্ধি করলে মোট উৎপাদন কী অনুপাতে বাড়ে তার ৩টি অবস্থা।"
      },
      {
        id: "econ-t4-sub3",
        title: "স্বল্পকালীন উৎপাদন ব্যয়সমূহ (TFC, TVC, TC, AFC, AVC, ATC, SMC)",
        titleEn: "Costs in the Short-Run: Fixed, Variable and Marginal Costs",
        keywords: ["Total Fixed Cost (TFC)", "Total Variable Cost (TVC)", "Average Cost (AC)", "Marginal Cost (MC)", "U-Shaped AC"],
        coreConcept: "স্থির ও পরিবর্তনশীল ব্যয়ের যোগফল হিসেবে মোট ব্যয় এবং ইউ-আকৃতির গড় ও প্রান্তিক ব্যয় রেখা।"
      },
      {
        id: "econ-t4-sub4",
        title: "দীর্ঘকালীন উৎপাদন ব্যয় ও খাম রেখা (LAC & LMC Envelope Curve)",
        titleEn: "Costs in the Long-Run: LAC, SAC, LMC, SMC Envelope Curve",
        keywords: ["Long-run Average Cost (LAC)", "Envelope Curve", "Economies of Scale", "Diseconomies of Scale"],
        coreConcept: "দীর্ঘকালে সব ব্যয়ই পরিবর্তনশীল; স্বল্পকালীন এসি রেখাগুলাকে জড়িয়ে থাকা এনভেলপ রেখা।"
      }
    ]
  },
  {
    topicId: 5,
    title: "টপিক ৫: বাজার বিশ্লেষণ ও কাঠামো",
    subtopics: [
      {
        id: "econ-t5-sub1",
        title: "পূর্ণাঙ্গ প্রতিযোগিতা বাজার: বৈশিষ্ট্য ও গড়/প্রান্তিক আয় রেখা",
        titleEn: "Perfect Competition: Definition, Characteristics, AR and MR",
        keywords: ["Perfect Competition", "Price Taker", "Homogeneous Product", "P = AR = MR", "Horizontal Line"],
        coreConcept: "অসংখ্য ক্রেতা-বিক্রেতা, সমজাতীয় পণ্য এবং ভূমির সমান্তরাল সরলরৈখিক চাহিদা রেখা (P = AR = MR)।"
      },
      {
        id: "econ-t5-sub2",
        title: "পূর্ণাঙ্গ প্রতিযোগিতায় ফার্মের স্বল্পকালীন ও দীর্ঘকালীন ভারসাম্য",
        titleEn: "Short-run and Long-run Equilibrium of a Competitive Firm",
        keywords: ["MR = MC Rule", "Normal Profit", "Supernormal Profit", "Loss", "Shutdown Point (P = AVC)"],
        coreConcept: "স্বল্পকালে অস্বাভাবিক মুনাফা বা লোকসান হলেও দীর্ঘকালে কেবল স্বাভাবিক মুনাফা বজায় থাকে।"
      },
      {
        id: "econ-t5-sub3",
        title: "একচেটিয়া বাজার (Monopoly): বৈশিষ্ট্য, চাহিদা রেখা ও দাম নির্ধারণ",
        titleEn: "Monopoly: Characteristics, Downward AR/MR, Equilibrium Position",
        keywords: ["Monopoly", "Price Maker", "No Close Substitutes", "Downward Sloping AR/MR", "Deadweight Loss"],
        coreConcept: "একক বিক্রেতা, কোনো বিকল্প নেই, এবং বাজারে দাম বা যোগান এককভাবে নিয়ন্ত্রণ করার ক্ষমতা।"
      },
      {
        id: "econ-t5-sub4",
        title: "তুলনামূলক বিশ্লেষণ: পূর্ণ প্রতিযোগিতা বনাম একচেটিয়া বাজার",
        titleEn: "Comparison between Perfect Competition and Monopoly",
        keywords: ["Comparison", "Price & Output Comparison", "Efficiency", "Consumer Welfare"],
        coreConcept: "পূর্ণ প্রতিযোগিতায় বেশি উৎপাদন ও কম দাম বনাম একচেটিয়া বাজারে কম উৎপাদন ও উচ্চ দাম।"
      }
    ]
  },
  {
    topicId: 6,
    title: "টপিক ৬: সামষ্টিক অর্থনীতির রূপরেখা ও জাতীয় আয়",
    subtopics: [
      {
        id: "econ-t6-sub1",
        title: "সামষ্টিক অর্থনীতির লক্ষ্য ও নীতিগত হাতিয়ারসমূহ",
        titleEn: "Overview of Macroeconomics: Objectives and Policy Instruments",
        keywords: ["Macroeconomics", "Fiscal Policy", "Monetary Policy", "Full Employment", "Price Stability"],
        coreConcept: "একটি সামগ্রিক দেশের মোট উৎপাদন, নিয়োগ, মুদ্রাস্ফীতি নিয়ন্ত্রণ ও অর্থনৈতিক প্রবৃদ্ধির ব্যবস্থাপনা।"
      },
      {
        id: "econ-t6-sub2",
        title: "জাতীয় আয় পরিমাপের ৩টি পদ্ধতি (উৎপাদন, আয় ও ব্যয় পদ্ধতি)",
        titleEn: "National Income Accounting Methods: Product, Income, Expenditure",
        keywords: ["Product Method (GVA)", "Income Method (Rent+Wage+Interest+Profit)", "Expenditure Method (C+I+G+X-M)"],
        coreConcept: "একটি অর্থবছরে দেশে উৎপাদিত পণ্য ও সেবার বাজারমূল্য হিসাবের সমতুল্য ৩টি বৈজ্ঞানিক পদ্ধতি।"
      },
      {
        id: "econ-t6-sub3",
        title: "জিডিপি, এনডিপি, জিএনপি ও এনএনপি-র পারস্পরিক সম্পর্ক",
        titleEn: "GDP, NDP, GNP, NNP Concepts and Mathematical Relations",
        keywords: ["GDP (ভৌগোলিক সীমানা)", "GNP / GNI (নাগরিকত্ব)", "Depreciation (অবচয়)", "Net Factor Income (NFIA)"],
        coreConcept: "ভৌগোলিক সীমানার ভেতরে উৎপাদন (GDP) বনাম দেশের নাগরিকদের দেশে-বিদেশে মোট আয় (GNP)।"
      },
      {
        id: "econ-t6-sub4",
        title: "দ্বৈত গণনার সমস্যা (Double Counting Problem) ও মূল্য সংযোজন সমাধান",
        titleEn: "Double Counting Problem and Value Added Method",
        keywords: ["Double Counting", "Intermediate Goods", "Final Goods", "Gross Value Added (GVA)"],
        coreConcept: "কাঁচামালের মূল্য বারবার যোগ করে জাতীয় আয় বাড়িয়ে দেখানোর ভুল এবং মূল্য সংযোজন দিয়ে তার সমাধান।"
      },
      {
        id: "econ-t6-sub5",
        title: "ব্যক্তিক আয় থেকে ব্যয়যোগ্য আয় (Disposable Income) ও নিট অর্থনৈতিক কল্যাণ (NEW)",
        titleEn: "From GDP to Disposable Income (DI) and Net Economic Welfare (NEW)",
        keywords: ["Personal Income", "Direct Taxes", "Disposable Income (DI = C + S)", "NEW", "Green GDP"],
        coreConcept: "কর পরিশোধের পর নিজের ইচ্ছামতো ভোগ ও সঞ্চয়ে খরচের আয় (DI) এবং পরিবেশ ক্ষতিমুক্ত জাতীয় কল্যাণ।"
      }
    ]
  },
  {
    topicId: 7,
    title: "টপিক ৭: আন্তর্জাতিক বাণিজ্য",
    subtopics: [
      {
        id: "econ-t7-sub1",
        title: "অভ্যন্তরীণ বাণিজ্য বনাম আন্তর্জাতিক বাণিজ্য",
        titleEn: "Domestic vs. International Trade",
        keywords: ["Domestic Trade", "Foreign Trade", "Different Currencies", "Tariffs & Quotas", "Mobility of Factors"],
        coreConcept: "একই দেশের ভেতরে লেনদেন বনাম ভিন্ন সার্বভৌম রাষ্ট্র, আইন ও মুদ্রার অধীনে লেনদেন।"
      },
      {
        id: "econ-t7-sub2",
        title: "বাণিজ্য ভারসাম্য (BoT) বনাম লেনদেন ভারসাম্য (BoP)",
        titleEn: "Balance of Trade (BoT) vs Balance of Payments (BoP)",
        keywords: ["Balance of Trade (Visible Exports - Imports)", "Balance of Payments (Current + Capital Account)", "Always Balances"],
        coreConcept: "শুধুমাত্র দৃশ্যমান পণ্যের লেনদেন (BoT) বনাম সেবা ও আর্থিক পুঁজির সামগ্রিক হিসাব (BoP)।"
      },
      {
        id: "econ-t7-sub3",
        title: "বাংলাদেশের বৈদেশিক বাণিজ্যের গতিধারা ও রেমিট্যান্স",
        titleEn: "Trends in Foreign Trade in Bangladesh & Remittance",
        keywords: ["RMG Sector", "Remittance Inflow", "Trade Deficit", "Export Diversification"],
        coreConcept: "তৈরি পোশাক ও প্রবাসী আয়ের ওপর নির্ভরতা এবং আমদানি-রপ্তানি ঘাটতির বাস্তব পরিস্থিতি।"
      },
      {
        id: "econ-t7-sub4",
        title: "অবাধ বাণিজ্য বনাম সংরক্ষণ নীতি (Free Trade vs. Protection)",
        titleEn: "Free Trade vs. Protectionism (Tariff, Quota, Subsidies)",
        keywords: ["Free Trade", "Tariff", "Import Quota", "Infant Industry Argument", "Dumping"],
        coreConcept: "শুল্কমুক্ত আন্তর্জাতিক বাণিজ্য বনাম দেশীয় নবীন শিল্পকে বাঁচাতে আমদানি শুল্কের প্রাচীর তোলা।"
      },
      {
        id: "econ-t7-sub5",
        title: "বাণিজ্য তত্ত্ব: পরম ব্যয় সুবিধা বনাম তুলনামূলক সুবিধা তত্ত্ব",
        titleEn: "Absolute Advantage (Adam Smith) vs Comparative Advantage (David Ricardo)",
        keywords: ["Absolute Advantage", "Comparative Advantage", "Opportunity Cost Ratio", "Gains from Trade"],
        coreConcept: "কোনো পণ্য কম সুযোগ ব্যয়ে তৈরি করার সক্ষমতা থাকলে বিশেষায়িত রপ্তানির মাধ্যমে দুই দেশেরই লাভ।"
      }
    ]
  },
  {
    topicId: 8,
    title: "টপিক ৮: অর্থনৈতিক প্রবৃদ্ধি ও টেকসই উন্নয়ন",
    subtopics: [
      {
        id: "econ-t8-sub1",
        title: "অর্থনৈতিক প্রবৃদ্ধি (Growth) বনাম অর্থনৈতিক উন্নয়ন (Development)",
        titleEn: "Economic Growth vs. Economic Development",
        keywords: ["Economic Growth (Quantitative GDP)", "Economic Development (Qualitative Structural Change)", "Poverty Reduction"],
        coreConcept: "শুধুমাত্র মোট আয় বা জিডিপি বৃদ্ধি (প্রবৃদ্ধি) বনাম শিক্ষা, স্বাস্থ্য ও জীবনযাত্রার গুণগত রূপান্তর (উন্নয়ন)।"
      },
      {
        id: "econ-t8-sub2",
        title: "উন্নয়ন পরিমাপের সূচকসমূহ: মাথাপিছু আয়, এইচডিআই ও বহুমাত্রিক দারিদ্র্য",
        titleEn: "Measurement of Development: Per Capita Income, HDI, MPI",
        keywords: ["Per Capita GNI", "Human Development Index (HDI: Life, Education, Income)", "Multidimensional Poverty Index (MPI)"],
        coreConcept: "আয়ভিত্তিক পরিমাপের সীমাবদ্ধতা এবং জাতিসংঘের মানব উন্নয়ন সূচকের ৩টি মূল স্তম্ভ।"
      },
      {
        id: "econ-t8-sub3",
        title: "উন্নয়নের প্রধান অন্তরায়সমূহ (ভৌগোলিক, জনসংখ্যা ও প্রাতিষ্ঠানিক দুর্বলতা)",
        titleEn: "Obstacles to Economic Development in Developing Countries",
        keywords: ["Vicious Circle of Poverty (Ragnar Nurkse)", "Low Savings-Low Investment", "Institutional Corruption"],
        coreConcept: "দারিদ্র্যের দুষ্টচক্র: কম আয় -> কম সঞ্চয় -> কম বিনিয়োগ -> কম উৎপাদন -> কম আয়।"
      },
      {
        id: "econ-t8-sub4",
        title: "উন্নয়নের সমসাময়িক ধারণা ও টেকসই উন্নয়ন অভীষ্ট (SDG)",
        titleEn: "Contemporary Concepts of Development: Sustainable Development Goals (SDGs)",
        keywords: ["Sustainable Development", "SDG 17 Goals", "Climate Action", "Inclusive Growth", "Gender Equality"],
        coreConcept: "ভবিষ্যৎ প্রজন্মের সম্পদের ক্ষতি না করে বর্তমানের চাহিদা পূরণ এবং এসডিজির লক্ষ্যমাত্রা।"
      }
    ]
  },
  {
    topicId: 9,
    title: "টপিক ৯: অর্থ, অর্থের মূল্য ও মুদ্রাস্ফীতি",
    subtopics: [
      {
        id: "econ-t9-sub1",
        title: "অর্থের সংজ্ঞা, উৎপত্তি ও আধুনিক অর্থনীতিতে এর গুরুত্ব",
        titleEn: "Definition and Functions of Money, Importance in Modern Economy",
        keywords: ["Medium of Exchange", "Unit of Account", "Store of Value", "Standard of Deferred Payments"],
        coreConcept: "বিনিময়ের সাধারণ মাধ্যম, মূল্যের পরিমাপক, সঞ্চয়ের বাহন এবং ভবিষ্যৎ দেনা-পাওনার মানদণ্ড।"
      },
      {
        id: "econ-t9-sub2",
        title: "অর্থের সরবরাহ ও বিভিন্ন রূপ (M1, M2, M3 Money Supply)",
        titleEn: "Concepts of Money Supply: M1, M2, M3",
        keywords: ["Narrow Money (M1)", "Broad Money (M2, M3)", "Currency in Circulation", "Demand Deposits", "Time Deposits"],
        coreConcept: "জনগণের হাতে থাকা নগদ নোট ও চলতি আমানত (M1) বনাম মেয়াদি সঞ্চয়ী আমানত সহ সামগ্রিক অর্থ (M2)।"
      },
      {
        id: "econ-t9-sub3",
        title: "অর্থের মূল্য ও ফিশারের বিনিময় সমীকরণ (Fisher's Equation: MV = PT)",
        titleEn: "Value of Money and Fisher's Quantity Theory of Money (MV = PT)",
        keywords: ["Value of Money (Vm = 1/P)", "Fisher's Equation (MV = PT)", "Money Circulation Velocity"],
        coreConcept: "অর্থের পরিমাণ দ্বিগুণ হলে দামস্তর দ্বিগুণ হয় এবং অর্থের নিজস্ব ক্রয়ক্ষমতা অর্ধেক হয়ে যায়।"
      },
      {
        id: "econ-t9-sub4",
        title: "মুদ্রাস্ফীতি: চাহিদা বৃদ্ধিজনিত বনাম খরচ বৃদ্ধিজনিত মুদ্রাস্ফীতি",
        titleEn: "Inflation: Demand-Pull vs Cost-Push Inflation",
        keywords: ["Demand-Pull Inflation (Excess Demand)", "Cost-Push Inflation (Wage/Raw Material Cost)", "Creeping vs Hyperinflation"],
        coreConcept: "সামগ্রিক চাহিদা যোগানের চেয়ে বেশি হলে বনাম কাঁচামাল ও উৎপাদন খরচ বাড়লে দাম বৃদ্ধি।"
      },
      {
        id: "econ-t9-sub5",
        title: "মুদ্রাস্ফীতি ও মুদ্রা সংকোচনের সামাজিক ও অর্থনৈতিক প্রভাব",
        titleEn: "Effects of Inflation and Deflation, Remedial Monetary/Fiscal Policies",
        keywords: ["Fixed Income Earners", "Debtors vs Creditors", "Contractionary Monetary Policy", "Bank Rate"],
        coreConcept: "মুদ্রাস্ফীতিতে ঋণগ্রহীতার লাভ ও নির্দিষ্ট আয়ের মানুষের ক্ষতি; কেন্দ্রীয় ব্যাংকের সুদের হার বৃদ্ধির প্রতিকার।"
      }
    ]
  },
  {
    topicId: 10,
    title: "টপিক ১০: সরকারি অর্থব্যবস্থা ও বাজেট",
    subtopics: [
      {
        id: "econ-t10-sub1",
        title: "সরকারি অর্থব্যবস্থা বনাম ব্যক্তিগত অর্থব্যবস্থা",
        titleEn: "Public Finance vs Private Finance",
        keywords: ["Public Finance", "Private Finance", "Social Welfare Maximization", "Budget Secrecy vs Openness"],
        coreConcept: "আগে আয় নির্ধারণ করে ব্যয় করা (ব্যক্তি) বনাম আগে ব্যয়ের প্রাক্কলন করে রাজস্ব আদায়ের পরিকল্পনা (সরকার)।"
      },
      {
        id: "econ-t10-sub2",
        title: "সরকারের আয়ের উৎসসমূহ: কর রাজস্ব ও কর-বহির্ভূত রাজস্ব",
        titleEn: "Sources of Government Revenues: Tax and Non-Tax Revenue",
        keywords: ["Direct Tax (Income Tax)", "Indirect Tax (VAT, Customs)", "Non-tax (Fees, Fines, Dividends)"],
        coreConcept: "প্রত্যক্ষ কর (যার করভার স্থানান্তরযোগ্য নয়) বনাম পরোক্ষ কর (ভ্যাট যা ভোক্তার ওপর বর্তায়)।"
      },
      {
        id: "econ-t10-sub3",
        title: "প্রত্যক্ষ কর বনাম পরোক্ষ কর এবং উত্তম কর ব্যবস্থার বৈশিষ্ট্য",
        titleEn: "Direct vs Indirect Taxation & Canons of Taxation (Adam Smith)",
        keywords: ["Direct Tax", "Indirect Tax (VAT)", "Canons of Taxation (Equality, Certainty, Convenience, Economy)"],
        coreConcept: "আদম স্মিথের ৪টি কর নীতি: সমতা, নিশ্চিততা, সুবিধা এবং মিতব্যয়িতা।"
      },
      {
        id: "econ-t10-sub4",
        title: "জাতীয় বাজেট: রাজস্ব বাজেট ও উন্নয়ন বাজেট (ADP)",
        titleEn: "National Budget Structure: Revenue Budget and Development Budget (ADP)",
        keywords: ["Revenue Budget (Day-to-day Admin)", "Development Budget (ADP Infrastructure)", "Bridge, Power, Roads"],
        coreConcept: "প্রশাসনিক ব্যয় ও বেতন মেটানোর রাজস্ব বাজেট বনাম অবকাঠামো ও মেগা প্রকল্প বাস্তবায়নের বার্ষিক উন্নয়ন বাজেট।"
      },
      {
        id: "econ-t10-sub5",
        title: "সুষম, উদ্বৃত্ত ও ঘাটতি বাজেট (Deficit Financing & Economic Impact)",
        titleEn: "Balanced, Surplus and Deficit Budget: Deficit Financing",
        keywords: ["Deficit Budget", "Deficit Financing (Borrowing from Central Bank)", "Surplus Budget", "Economic Stimulus"],
        coreConcept: "উন্নয়নশীল দেশে প্রবৃদ্ধি বাড়াতে রাজস্বের চেয়ে বেশি ব্যয় করার ঘাটতি বাজেট এবং কেন্দ্রীয় ব্যাংক থেকে ঋণ নেওয়ার প্রভাব।"
      }
    ]
  }
];
