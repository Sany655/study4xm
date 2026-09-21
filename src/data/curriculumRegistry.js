// ==========================================================================
// 4-YEAR BSS (HONOURS) SOCIOLOGY CURRICULUM REGISTRY
// National University of Bangladesh (জাতীয় বিশ্ববিদ্যালয় — সমাজবিজ্ঞান বিভাগ)
// Structure: Year -> Course -> Chapter -> Lesson
// ==========================================================================

export const DEGREE_INFO = {
  degreeNameEn: "Bachelor of Social Science (BSS Honours)",
  degreeNameBn: "বিএসএস (অনার্স) সমাজবিজ্ঞান",
  departmentEn: "Department of Sociology",
  departmentBn: "সমাজবিজ্ঞান বিভাগ",
  institutionEn: "National University, Bangladesh",
  institutionBn: "জাতীয় বিশ্ববিদ্যালয়, বাংলাদেশ",
  durationYears: 4,
  totalCredits: 120
};

export const ACADEMIC_YEARS = [
  {
    yearId: 1,
    yearNumberBn: "১ম বর্ষ",
    yearNumberEn: "1st Year",
    status: "active",
    totalCourses: 8,
    totalCredits: 30,
    descriptionBn: "সমাজবিজ্ঞান মূল ভিত্তি, সামাজিক ইতিহাস, পরিবার-বিবাহ ও সহায়ক অর্থনীতি, আইসিটি ও রাষ্ট্রবিজ্ঞান পাঠ।",
    courses: [
      {
        id: "intro-sociology",
        paperCode: "212003",
        titleBn: "প্রারম্ভিক সমাজবিজ্ঞান",
        titleEn: "Introduction to Sociology",
        type: "core",
        credits: 4,
        classHours: 60,
        icon: "BookOpen",
        accentColor: "#4f46e5",
        status: "available",
        totalChapters: 8,
        author: "ড. মো: জাহিদুল ইসলাম ও সহযোগী গবেষকবৃন্দ",
        chapters: [
          { id: 1, titleBn: "অধ্যায় ১: সমাজবিজ্ঞানের সূচনা ও পরিধি", titleEn: "Introduction: Nature, Scope & Thinkers" },
          { id: 2, titleBn: "অধ্যায় ২: সমাজবিজ্ঞানের পদ্ধতি ও পরিমাপ", titleEn: "Methods and Measures in Sociology" },
          { id: 3, titleBn: "অধ্যায় ৩: সংস্কৃতি, বিশ্বাস ও মূল্যবোধ", titleEn: "Culture, Beliefs and Values" },
          { id: 4, titleBn: "অধ্যায় ৪: সামাজিক মিথস্ক্রিয়া ও সমাজ কাঠামো", titleEn: "Social Interaction & Structure" },
          { id: 5, titleBn: "অধ্যায় ৫: সামাজিক প্রতিষ্ঠানসমূহ", titleEn: "Social Institutions" },
          { id: 6, titleBn: "অধ্যায় ৬: সামাজিক স্তরবিন্যাস ও গতিশীলতা", titleEn: "Social Stratification & Mobility" },
          { id: 7, titleBn: "অধ্যায় ৭: বিচ্যুতি ও সামাজিক নিয়ন্ত্রণ", titleEn: "Deviance and Social Control" },
          { id: 8, titleBn: "অধ্যায় ৮: সামাজিক পরিবর্তন", titleEn: "Social Change" }
        ]
      },
      {
        id: "social-history",
        paperCode: "212005",
        titleBn: "সামাজিক ইতিহাস ও বিশ্বসভ্যতা",
        titleEn: "Social History and World Civilization",
        type: "core",
        credits: 4,
        classHours: 60,
        icon: "Landmark",
        accentColor: "#059669",
        status: "available",
        totalChapters: 9,
        author: "প্রফেসর মো: জাহিদুল ইসলাম",
        chapters: [
          { id: 1, titleBn: "অধ্যায় ১: সামাজিক ইতিহাসের স্বরূপ ও গুরুত্ব", titleEn: "Introduction to Social History" },
          { id: 2, titleBn: "অধ্যায় ২: প্রাগৈতিহাসিক যুগ ও প্রস্তর যুগ", titleEn: "Prehistoric Age (Stone Age)" },
          { id: 3, titleBn: "অধ্যায় ৩: সমাজের শ্রেণিবিভাগ (মার্ক্স ও লেনস্কি)", titleEn: "Types of Societies" },
          { id: 4, titleBn: "অধ্যায় ৪: সভ্যতার ধারণা ও ক্রমবিকাশ", titleEn: "Civilization & Evolution" },
          { id: 5, titleBn: "অধ্যায় ৫: প্রাচীন সভ্যতার সূচনা (সিন্ধু, মিসরীয়, ব্যবিলনীয়)", titleEn: "Birth of Ancient Civilizations" },
          { id: 6, titleBn: "অধ্যায় ৬: গ্রিক ও রোমান সভ্যতা", titleEn: "Greek and Roman Civilizations" },
          { id: 7, titleBn: "অধ্যায় ৭: মধ্যযুগের সামন্ততন্ত্র ও রেনেসাঁ", titleEn: "Feudalism & Middle Ages" },
          { id: 8, titleBn: "অধ্যায় ৮: পুঁজিবাদ ও শিল্প বিপ্লব", titleEn: "Advent of Capitalism & Industry" },
          { id: 9, titleBn: "অধ্যায় ৯: বাংলাদেশের অভ্যুদয়ের সামাজিক ইতিহাস", titleEn: "Social History of Bangladesh" }
        ]
      },
      {
        id: "sociology-marriage",
        paperCode: "212005",
        titleBn: "বিবাহ ও পরিবারের সমাজতত্ত্ব",
        titleEn: "Sociology of Marriage and Family",
        type: "core",
        credits: 4,
        classHours: 60,
        icon: "HeartHandshake",
        accentColor: "#e11d48",
        status: "available",
        totalChapters: 8,
        author: "প্রফেসর মো: মাহফুজ-উল-আলম",
        chapters: [
          { id: 1, titleBn: "অধ্যায় ১: পরিবার ও বিবাহ অধ্যয়নের তাৎপর্য", titleEn: "Importance of Studying Family" },
          { id: 2, titleBn: "অধ্যায় ২: পরিবার ও বিবাহের উৎপত্তি ও বিকাশ", titleEn: "Origin & Development of Family" },
          { id: 3, titleBn: "অধ্যায় ৩: পরিবার ও বিবাহের তাত্ত্বিক দৃষ্টিকোণ", titleEn: "Theoretical Perspectives" },
          { id: 4, titleBn: "অধ্যায় ৪: পরিবারের রূপ, ধরন ও কার্যপ্রণালী", titleEn: "Forms & Functions of Family" },
          { id: 5, titleBn: "অধ্যায় ৫: বিবাহ: রূপভেদ, সঙ্গী নির্বাচন ও যৌতুক", titleEn: "Marriage Patterns & Courtship" },
          { id: 6, titleBn: "অধ্যায় ৬: পরিবারের পরিবর্তিত রূপরেখা ও তত্ত্ব", titleEn: "Changing Structure of Family" },
          { id: 7, titleBn: "অধ্যায় ৭: পরিবারের ক্ষমতার কাঠামো ও জেন্ডার ভূমিকা", titleEn: "Power Structure & Violence" },
          { id: 8, titleBn: "অধ্যায় ৮: বাংলাদেশে বিবাহ নিবন্ধন ও পারিবারিক আইন", titleEn: "Marriage Laws in Bangladesh" }
        ]
      },
      {
        id: "social-problems",
        paperCode: "212007",
        titleBn: "সামাজিক সমস্যা ও ইস্যু",
        titleEn: "Social Problems and Issues",
        type: "core",
        credits: 4,
        classHours: 60,
        icon: "AlertTriangle",
        accentColor: "#d97706",
        status: "available",
        totalChapters: 10,
        author: "প্রফেসর মো: মাহফুজ-উল-আলম",
        chapters: [
          { id: 1, titleBn: "অধ্যায় ১: সামাজিক সমস্যার সমাজবিজ্ঞান", titleEn: "Sociology of Social Problems" },
          { id: 2, titleBn: "অধ্যায় ২: জনসংখ্যা ও পরিবেশগত সংকট", titleEn: "Population & Environment" },
          { id: 3, titleBn: "অধ্যায় ৩: নগরায়ণ, বস্তি ও দারিদ্র্য", titleEn: "Urbanization & Poverty" },
          { id: 4, titleBn: "অধ্যায় ৪: বিশ্বায়ন যুগে সংস্কৃতির রূপান্তর", titleEn: "Culture in Age of Globalization" },
          { id: 5, titleBn: "অধ্যায় ৫: সামাজিক অসমতা ও প্রান্তিকীকরণ", titleEn: "Social Inequality" },
          { id: 6, titleBn: "অধ্যায় ৬: স্বাস্থ্য, ব্যাধি ও চিকিৎসা সংকট", titleEn: "Health and Illness" },
          { id: 7, titleBn: "অধ্যায় ৭: প্রাতিষ্ঠানিক সমস্যা (শিক্ষা ও পরিবার)", titleEn: "Institutional Problems" },
          { id: 8, titleBn: "অধ্যায় ৮: অপরাধ, কিশোর অপরাধ ও বিচ্যুতি", titleEn: "Crime, Delinquency & Deviance" },
          { id: 9, titleBn: "অধ্যায় ৯: পতিতাবৃত্তি ও নৈতিক অবক্ষয়", titleEn: "Sex Trade & Social Stigma" },
          { id: 10, titleBn: "অধ্যায় ১০: প্রাকৃতিক দুর্যোগ ও পরিবেশগত বিপর্যয়", titleEn: "Natural Disasters & Crisis" }
        ]
      },
      {
        id: "history-bd",
        paperCode: "211501",
        titleBn: "বাংলাদেশের ইতিহাস: ভাষা, সংস্কৃতি ও পরিচয়",
        titleEn: "History of Bangladesh: Language & Culture",
        type: "compulsory",
        credits: 4,
        classHours: 60,
        icon: "Flag",
        accentColor: "#047857",
        status: "available",
        totalChapters: 8,
        author: "প্রফেসর ড. মুন্সী শরীফ-উজজামান",
        chapters: [
          { id: 1, titleBn: "অধ্যায় ১: প্রাক-ঔপনিবেশিক যুগ ও প্রাচীন বাংলা", titleEn: "Pre-colonial Era" },
          { id: 2, titleBn: "অধ্যায় ২: ঔপনিবেশিক যুগ (১৮শ ও ১৯শ শতক)", titleEn: "Colonial Era (18th-19th C)" },
          { id: 3, titleBn: "অধ্যায় ৩: বিংশ শতাব্দীর প্রথমার্ধ ও ভারত ভাগ", titleEn: "Early 20th Century & 1947" },
          { id: 4, titleBn: "অধ্যায় ৪: দেশভাগ পরবর্তী যুগ (১৯৪৭-১৯৭১)", titleEn: "Post-Partition Era (1947-1971)" },
          { id: 5, titleBn: "অধ্যায় ৫: বাঙালি পরিচয়ের বিবর্তন", titleEn: "Changing Bengali Identity" },
          { id: 6, titleBn: "অধ্যায় ৬: ১৯৭১-এর মুক্তিযুদ্ধ ও ২০২৪-এর গণঅভ্যুত্থান", titleEn: "Liberation 1971 & 2024 Uprising" },
          { id: 7, titleBn: "অধ্যায় ৭: বাংলাদেশের ক্ষুদ্র নৃগোষ্ঠীর ইতিহাস", titleEn: "History of Ethnic Groups" },
          { id: 8, titleBn: "অধ্যায় ৮: সাংস্কৃতিক ঐতিহ্য ও আধুনিক রূপান্তর", titleEn: "Cultural Heritage & Modernity" }
        ]
      },
      {
        id: "political-science",
        paperCode: "211909",
        titleBn: "রাষ্ট্রবিজ্ঞান পরিচিতি",
        titleEn: "Introduction to Political Science",
        type: "allied",
        credits: 4,
        classHours: 60,
        icon: "Scale",
        accentColor: "#0284c7",
        status: "available",
        totalChapters: 7,
        author: "মো: রফিকুল ইসলাম ও কাজী আরাফাত হোসেন",
        chapters: [
          { id: 1, titleBn: "অধ্যায় ১: রাষ্ট্রবিজ্ঞান পরিচিতি ও রাষ্ট্রের উৎপত্তি", titleEn: "Intro to Political Science & State" },
          { id: 2, titleBn: "অধ্যায় ২: সংবিধান: প্রকৃতি ও সংশোধন প্রক্রিয়া", titleEn: "Constitution & Supremacy" },
          { id: 3, titleBn: "অধ্যায় ৩: সরকার ব্যবস্থার রূপভেদ (গণতন্ত্র ও একনায়কতন্ত্র)", titleEn: "Forms of Government" },
          { id: 4, titleBn: "অধ্যায় ৪: রাষ্ট্রের প্রধান তিনটি অঙ্গ", titleEn: "Organs of State" },
          { id: 5, titleBn: "অধ্যায় ৫: ক্ষমতা স্বতন্ত্রীকরণ নীতি ও প্রতিনিধিত্ব", titleEn: "Separation of Powers" },
          { id: 6, titleBn: "অধ্যায় ৬: রাজনৈতিক দল ও চাপসৃষ্টিকারী গোষ্ঠী", titleEn: "Political Parties & Groups" },
          { id: 7, titleBn: "অধ্যায় ৭: জনমত, সুশীল সমাজ ও সুশাসন", titleEn: "Public Opinion & Governance" }
        ]
      },
      {
        id: "economics",
        paperCode: "212209",
        titleBn: "প্রিন্সিপলস অব ইকোনমিক্স",
        titleEn: "Principles of Economics",
        type: "allied",
        credits: 4,
        classHours: 60,
        icon: "TrendingUp",
        accentColor: "#b45309",
        status: "mastered",
        totalChapters: 10,
        author: "ম্যাঙ্কিউ, কেস ও ফেয়ার, প্রফেসর সোহরাওয়ার্দী",
        chapters: [
          { id: 1, titleBn: "অধ্যায় ১: অর্থনীতির মৌলিক বিষয় ও দুষ্প্রাপ্যতা", titleEn: "Fundamentals of Economics" },
          { id: 2, titleBn: "অধ্যায় ২: চাহিদা ও যোগান বিশ্লেষণ", titleEn: "Supply and Demand Analysis" },
          { id: 3, titleBn: "অধ্যায় ৩: ভোক্তার আচরণ তত্ত্ব ও উপযোগ", titleEn: "Theory of Consumer Behavior" },
          { id: 4, titleBn: "অধ্যায় ৪: উৎপাদন ও ব্যয় তত্ত্ব", titleEn: "Production and Cost" },
          { id: 5, titleBn: "অধ্যায় ৫: বাজার কাঠামো (পূর্ণ প্রতিযোগিতা ও একচেটিয়া)", titleEn: "Market Analysis" },
          { id: 6, titleBn: "অধ্যায় ৬: সামষ্টিক অর্থনীতি ও জাতীয় আয় (GDP)", titleEn: "Overview of Macroeconomics" },
          { id: 7, titleBn: "অধ্যায় ৭: আন্তর্জাতিক বাণিজ্য ও লেনদেন ভারসাম্য", titleEn: "International Trade" },
          { id: 8, titleBn: "অধ্যায় ৮: অর্থনৈতিক প্রবৃদ্ধি ও উন্নয়ন", titleEn: "Growth and Development" },
          { id: 9, titleBn: "অধ্যায় ৯: অর্থ, মুদ্রাস্ফীতি ও ব্যাংকিং", titleEn: "Money and Inflation" },
          { id: 10, titleBn: "অধ্যায় ১০: সরকারি আয় ও ব্যয় (বাজেট)", titleEn: "Public Finance and Budget" }
        ]
      },
      {
        id: "ict",
        paperCode: "216601",
        titleBn: "তথ্য ও যোগাযোগ প্রযুক্তি ও ল্যাব",
        titleEn: "ICT and Computer System",
        type: "allied",
        credits: 4,
        classHours: 75,
        icon: "Monitor",
        accentColor: "#2563eb",
        status: "mastered",
        totalChapters: 9,
        author: "ল্যাম্বার্ট, রাসেল ও নরভিগ, প্রকাশ কুমার দাস",
        chapters: [
          { id: 1, titleBn: "ইউনিট ১: আইসিটি ও কম্পিউটার সিস্টেমের পরিচয়", titleEn: "Intro to ICT & Systems" },
          { id: 2, titleBn: "ইউনিট ২: কম্পিউটার হার্ডওয়্যার ও সফটওয়্যার", titleEn: "Hardware & Software" },
          { id: 3, titleBn: "ইউনিট ৩: ওয়ার্ড প্রসেসিং অ্যাপ্লিকেশন", titleEn: "Word Processing (MS Word)" },
          { id: 4, titleBn: "ইউনিট ৪: স্প্রেডশিট অ্যাপ্লিকেশন (এক্সেল)", titleEn: "Spreadsheet (MS Excel)" },
          { id: 5, titleBn: "ইউনিট ৫: প্রেজেন্টেশন সফটওয়্যার (পাওয়ারপয়েন্ট)", titleEn: "Presentation (MS PowerPoint)" },
          { id: 6, titleBn: "ইউনিট ৬: তথ্যের গোপনীয়তা ও সাইবার নিরাপত্তা", titleEn: "Privacy and Security" },
          { id: 7, titleBn: "ইউনিট ৭: ইন্টারনেট, নেটওয়ার্কিং ও ওএসআই", titleEn: "Internet & Networking" },
          { id: 8, titleBn: "ইউনিট ৮: ডেটা অ্যানালিটিক্স ও কৃত্রিম বুদ্ধিমত্তা", titleEn: "Emerging Tech (AI & ML)" },
          { id: 9, titleBn: "ইউনিট ৯: ফ্রিল্যান্সিং পরিচিতি ও ক্যারিয়ার", titleEn: "Freelancing Basics" }
        ]
      }
    ]
  },
  {
    yearId: 2,
    yearNumberBn: "২য় বর্ষ",
    yearNumberEn: "2nd Year",
    status: "roadmap",
    totalCourses: 7,
    totalCredits: 28,
    descriptionBn: "ধ্রুপদী সমাজতাত্ত্বিক তত্ত্ব, সামাজিক গবেষণা পদ্ধতি, সামাজিক পরিসংখ্যান ও গ্রামীণ-নগর সমাজ অধ্যয়ন।",
    courses: [
      {
        id: "classical-sociological-theory",
        paperCode: "222001",
        titleBn: "ধ্রুপদী সমাজতাত্ত্বিক তত্ত্ব",
        titleEn: "Classical Sociological Theory",
        type: "core",
        credits: 4,
        icon: "Scroll",
        accentColor: "#7c3aed",
        status: "upcoming",
        totalChapters: 6,
        descriptionBn: "অগাস্ট কোঁৎ, কার্ল মার্ক্স, এমিল ডুর্খেইম এবং ম্যাক্স ওয়েবারের ক্লাসিক্যাল তত্ত্বসমূহের বিশদ ব্যবচ্ছেদ।"
      },
      {
        id: "social-research-methodology",
        paperCode: "222003",
        titleBn: "সামাজিক গবেষণা পদ্ধতি",
        titleEn: "Social Research Methodology",
        type: "core",
        credits: 4,
        icon: "Search",
        accentColor: "#0284c7",
        status: "upcoming",
        totalChapters: 8,
        descriptionBn: "গুণগত ও পরিমাণগত গবেষণার ডিজাইন, জরিপ পদ্ধতি, তথ্য সংগ্রহ কৌশল ও প্রতিবেদন প্রণয়ন।"
      },
      {
        id: "social-statistics",
        paperCode: "222005",
        titleBn: "সামাজিক পরিসংখ্যান",
        titleEn: "Social Statistics",
        type: "core",
        credits: 4,
        icon: "BarChart3",
        accentColor: "#059669",
        status: "upcoming",
        totalChapters: 7,
        descriptionBn: "কেন্দ্রীয় প্রবণতার পরিমাপ, বিস্তার পরিমাপ, সংশ্লেষ ও রিগ্রেশন এবং সমাজবিজ্ঞানে পরিসংখ্যানের ব্যবহার।"
      },
      {
        id: "bangladesh-society-culture",
        paperCode: "222007",
        titleBn: "বাংলাদেশের সমাজ ও সংস্কৃতি",
        titleEn: "Society and Culture of Bangladesh",
        type: "core",
        credits: 4,
        icon: "Users",
        accentColor: "#d97706",
        status: "upcoming",
        totalChapters: 6,
        descriptionBn: "বাঙালি সমাজের ঐতিহাসিক বিন্যাস, লোকসংস্কৃতি, ধর্মীয় সম্প্রীতি এবং আধুনিকায়নের ঘাত-প্রতিঘাত।"
      },
      {
        id: "rural-sociology",
        paperCode: "222009",
        titleBn: "গ্রামীণ সমাজবিজ্ঞান",
        titleEn: "Rural Sociology",
        type: "core",
        credits: 4,
        icon: "Tractor",
        accentColor: "#16a34a",
        status: "upcoming",
        totalChapters: 6,
        descriptionBn: "গ্রামীণ অর্থনীতি, ভূমিস্বত্ব ব্যবস্থা, কৃষি রূপান্তর এবং গ্রাম বাংলার নেতৃত্ব ও ক্ষমতা কাঠামো।"
      },
      {
        id: "urban-sociology",
        paperCode: "222011",
        titleBn: "নগর সমাজবিজ্ঞান",
        titleEn: "Urban Sociology",
        type: "core",
        credits: 4,
        icon: "Building2",
        accentColor: "#ea580c",
        status: "upcoming",
        totalChapters: 6,
        descriptionBn: "শিকাগো স্কুল, নগরায়ণের তত্ত্ব, মেগা সিটি সংকট, নাগরিক সংস্কৃতি ও বস্তি জীবন।"
      },
      {
        id: "english-allied",
        paperCode: "221109",
        titleBn: "ইংরেজি (আবশ্যিক/সহযোগী)",
        titleEn: "English (Compulsory / Allied)",
        type: "compulsory",
        credits: 4,
        icon: "Languages",
        accentColor: "#475569",
        status: "upcoming",
        totalChapters: 5,
        descriptionBn: "অ্যাকাডেমিক ইংরেজি ব্যাকরণ, রিডিং কম্প্রিহেনশন, প্রবন্ধ রচনা ও কার্যকর যোগাযোগ দক্ষতা।"
      }
    ]
  },
  {
    yearId: 3,
    yearNumberBn: "৩য় বর্ষ",
    yearNumberEn: "3rd Year",
    status: "roadmap",
    totalCourses: 8,
    totalCredits: 32,
    descriptionBn: "আধুনিক সমাজতাত্ত্বিক তত্ত্ব, সামাজিক স্তরবিন্যাস, অপরাধবিজ্ঞান, জেন্ডার অধ্যয়ন ও জনমিতি।",
    courses: [
      {
        id: "contemporary-sociological-theory",
        paperCode: "232001",
        titleBn: "আধুনিক সমাজতাত্ত্বিক তত্ত্ব",
        titleEn: "Contemporary Sociological Theory",
        type: "core",
        credits: 4,
        icon: "Layers",
        accentColor: "#6366f1",
        status: "upcoming",
        totalChapters: 6
      },
      {
        id: "social-stratification",
        paperCode: "232003",
        titleBn: "সামাজিক স্তরবিন্যাস ও বৈষম্য",
        titleEn: "Social Stratification and Inequality",
        type: "core",
        credits: 4,
        icon: "BarChart2",
        accentColor: "#8b5cf6",
        status: "upcoming",
        totalChapters: 6
      },
      {
        id: "demography-population",
        paperCode: "232005",
        titleBn: "জনসংখ্যা ও সমাজ (জনমিতি)",
        titleEn: "Population and Society (Demography)",
        type: "core",
        credits: 4,
        icon: "Users2",
        accentColor: "#0ea5e9",
        status: "upcoming",
        totalChapters: 6
      },
      {
        id: "gender-society",
        paperCode: "232007",
        titleBn: "জেন্ডার ও সমাজ",
        titleEn: "Gender and Society",
        type: "core",
        credits: 4,
        icon: "Smile",
        accentColor: "#ec4899",
        status: "upcoming",
        totalChapters: 6
      },
      {
        id: "deviance-criminology",
        paperCode: "232009",
        titleBn: "সামাজিক বিচ্যুতি ও অপরাধবিজ্ঞান",
        titleEn: "Social Deviance and Criminology",
        type: "core",
        credits: 4,
        icon: "ShieldAlert",
        accentColor: "#dc2626",
        status: "upcoming",
        totalChapters: 7
      },
      {
        id: "sociology-organization",
        paperCode: "232011",
        titleBn: "সংগঠনের সমাজবিজ্ঞান",
        titleEn: "Sociology of Organization",
        type: "core",
        credits: 4,
        icon: "Briefcase",
        accentColor: "#f59e0b",
        status: "upcoming",
        totalChapters: 6
      },
      {
        id: "environmental-sociology",
        paperCode: "232013",
        titleBn: "পরিবেশের সমাজবিজ্ঞান",
        titleEn: "Environmental Sociology",
        type: "core",
        credits: 4,
        icon: "Trees",
        accentColor: "#10b981",
        status: "upcoming",
        totalChapters: 6
      },
      {
        id: "research-monograph",
        paperCode: "232015",
        titleBn: "মাঠকর্ম ও গবেষণা মনোগ্রাফ",
        titleEn: "Fieldwork & Research Monograph",
        type: "core",
        credits: 4,
        icon: "FileSpreadsheet",
        accentColor: "#0d9488",
        status: "upcoming",
        totalChapters: 4
      }
    ]
  },
  {
    yearId: 4,
    yearNumberBn: "৪র্থ বর্ষ",
    yearNumberEn: "4th Year",
    status: "roadmap",
    totalCourses: 9,
    totalCredits: 36,
    descriptionBn: "উচ্চতর তত্ত্ব, উন্নয়নের সমাজবিজ্ঞান, রাজনৈতিক ও শিল্প সমাজবিজ্ঞান, স্বাস্থ্য ও ধর্ম অধ্যয়ন।",
    courses: [
      {
        id: "advanced-sociological-theory",
        paperCode: "242001",
        titleBn: "উচ্চতর সমাজতাত্ত্বিক তত্ত্ব",
        titleEn: "Advanced Sociological Theory",
        type: "core",
        credits: 4,
        icon: "Brain",
        accentColor: "#4338ca",
        status: "upcoming",
        totalChapters: 6
      },
      {
        id: "sociology-development",
        paperCode: "242003",
        titleBn: "উন্নয়নের সমাজবিজ্ঞান",
        titleEn: "Sociology of Development",
        type: "core",
        credits: 4,
        icon: "TrendingUp",
        accentColor: "#15803d",
        status: "upcoming",
        totalChapters: 6
      },
      {
        id: "political-sociology",
        paperCode: "242005",
        titleBn: "রাজনৈতিক সমাজবিজ্ঞান",
        titleEn: "Political Sociology",
        type: "core",
        credits: 4,
        icon: "Vote",
        accentColor: "#b91c1c",
        status: "upcoming",
        totalChapters: 6
      },
      {
        id: "industrial-sociology",
        paperCode: "242007",
        titleBn: "শিল্প সমাজবিজ্ঞান",
        titleEn: "Industrial Sociology",
        type: "core",
        credits: 4,
        icon: "Factory",
        accentColor: "#b45309",
        status: "upcoming",
        totalChapters: 6
      },
      {
        id: "sociology-health",
        paperCode: "242009",
        titleBn: "চিকিৎসা ও স্বাস্থ্যের সমাজবিজ্ঞান",
        titleEn: "Sociology of Health and Illness",
        type: "core",
        credits: 4,
        icon: "Activity",
        accentColor: "#0284c7",
        status: "upcoming",
        totalChapters: 6
      },
      {
        id: "sociology-religion",
        paperCode: "242011",
        titleBn: "ধর্মের সমাজবিজ্ঞান",
        titleEn: "Sociology of Religion",
        type: "core",
        credits: 4,
        icon: "Sparkles",
        accentColor: "#7c2d12",
        status: "upcoming",
        totalChapters: 6
      },
      {
        id: "social-movements",
        paperCode: "242013",
        titleBn: "সামাজিক পরিবর্তন ও আন্দোলন",
        titleEn: "Social Change and Movements",
        type: "core",
        credits: 4,
        icon: "Flame",
        accentColor: "#e11d48",
        status: "upcoming",
        totalChapters: 6
      },
      {
        id: "applied-sociology-project",
        paperCode: "242015",
        titleBn: "ফলিত সমাজবিজ্ঞান ও প্রকল্প",
        titleEn: "Applied Sociology and Project",
        type: "core",
        credits: 4,
        icon: "Wrench",
        accentColor: "#0f766e",
        status: "upcoming",
        totalChapters: 4
      },
      {
        id: "viva-voce-comprehensive",
        paperCode: "242016",
        titleBn: "মৌখিক পরীক্ষা (কম্প্রিহেনসিভ ভাইভা)",
        titleEn: "Comprehensive Viva-Voce",
        type: "core",
        credits: 4,
        icon: "GraduationCap",
        accentColor: "#312e81",
        status: "upcoming",
        totalChapters: 1
      }
    ]
  }
];

export function getYearConfig(yearId) {
  return ACADEMIC_YEARS.find(y => y.yearId === Number(yearId)) || ACADEMIC_YEARS[0];
}

export function getCourseConfig(yearId, courseId) {
  const year = getYearConfig(yearId);
  return year?.courses?.find(c => c.id === courseId) || year?.courses?.[0];
}
