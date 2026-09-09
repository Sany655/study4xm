export const MOTIVATIONAL_QUOTES = [
  { text: "Someone important believes you can do this. Now prove it to yourself.", author: "Exam Mission" },
  { text: "আজকের কাজটা শেষ করো। এক ধাপ এগিয়ে যাবে।", author: "Daily Reminder" },
  { text: "100/100 starts with understanding one single concept deeply.", author: "Study Philosophy" },
  { text: "আরেকটা topic জয় করা যাক!", author: "Tutor Note" },
  { text: "Don't memorize what you don't understand.", author: "Active Recall" },
  { text: "You don't need to be naturally brilliant. You need to understand and practice.", author: "Mindset" },
  { text: "Focus. Learn. Recall. Write. Repeat.", author: "Mastery Loop" },
  { text: "She/he may be part of your motivation, but YOU are building the future.", author: "Personal Drive" }
];

export const OSI_LAYERS = [
  {
    layerNum: 7,
    name: "Application Layer",
    bangla: "ইউজার বা অ্যাপ্লিকেশনের সরাসরি সাথে কাজ করে এমন স্তর।",
    english: "Provides network services directly to end-user software applications.",
    protocols: "HTTP, HTTPS, FTP, SMTP, DNS, DHCP",
    example: "Typing https://google.com into your browser address bar.",
    keywords: "End-user interface, HTTP, SMTP, DNS, API communication",
    examQuestion: "Explain the role of the Application Layer in web browsing with example protocols."
  },
  {
    layerNum: 6,
    name: "Presentation Layer",
    bangla: "ডেটাকে অনুবাদ, এনক্রিপ্ট এবং কমপ্রেস (সংকোচন) করে।",
    english: "Translates, encrypts, and compresses data formats between system and network.",
    protocols: "SSL, TLS, JPEG, ASCII, MPEG",
    example: "Encrypting banking credit card details using TLS/SSL before sending.",
    keywords: "Data translation, SSL/TLS Encryption, Compression, Serialization",
    examQuestion: "Which layer handles SSL/TLS data encryption and syntax formatting?"
  },
  {
    layerNum: 5,
    name: "Session Layer",
    bangla: "দুই ডিভাইসের মধ্যে কানেকশন স্থাপন, পরিচালনা ও সমাপ্তি করে।",
    english: "Establishes, manages, synchronizes, and terminates dialogues between computers.",
    protocols: "NetBIOS, RPC, PPTP, Sockets",
    example: "Maintaining an active login session on a banking portal without re-entering password.",
    keywords: "Dialogue control, Checkpointing, Session tokens, Synchronization",
    examQuestion: "What is the primary function of the Session Layer during a video conference?"
  },
  {
    layerNum: 4,
    name: "Transport Layer",
    bangla: "ডেটার সম্পূর্ণ নির্ভুল ও ক্রমানুসারে পৌঁছানো নিশ্চিত করে (প্যাকেট ভেঙে সেগমেন্ট তৈরি করে)।",
    english: "Ensures reliable, transparent end-to-end data transfer, flow control, and error recovery.",
    protocols: "TCP (Transmission Control Protocol), UDP (User Datagram Protocol)",
    example: "TCP sending numbered segments and requesting acknowledgements (ACKs).",
    keywords: "Port numbers, Segmentation, Flow control, TCP 3-way handshake, Reliability",
    examQuestion: "Differentiate TCP from UDP at the Transport layer with real-world examples."
  },
  {
    layerNum: 3,
    name: "Network Layer",
    bangla: "প্যাকেট রাউটিং এবং যৌক্তিক ঠিকানা (IP Address) নির্ধারণ করে।",
    english: "Determines the optimal physical path for data packets using logical addressing (IP).",
    protocols: "IPv4, IPv6, ICMP, OSPF, BGP, Routers",
    example: "A router in Dhaka deciding the fastest fiber path to route a packet to London.",
    keywords: "Logical addressing, IP Address, Packet routing, Subnet mask, Routers",
    examQuestion: "Which layer is responsible for logical routing of packets across different networks?"
  },
  {
    layerNum: 2,
    name: "Data Link Layer",
    bangla: "লোকাল নেটওয়ার্কে ডিভাইসের ফিজিক্যাল MAC অ্যাড্রেস দিয়ে ফ্রেম আদান-প্রদান করে।",
    english: "Provides node-to-node data transfer across physical links via framing and MAC addresses.",
    protocols: "Ethernet (IEEE 802.3), Wi-Fi (IEEE 802.11), Switches, MAC Address",
    example: "A network switch forwarding a frame exclusively to port 4 based on destination MAC.",
    keywords: "Frames, MAC address, Error detection (CRC), Network Switch, Flow control",
    examQuestion: "What is the difference between a MAC address (Layer 2) and an IP address (Layer 3)?"
  },
  {
    layerNum: 1,
    name: "Physical Layer",
    bangla: "ক্যাবল বা বেতার তরঙ্গের মাধ্যমে ০ এবং ১ (বাইনারি বিট) সংকেত আকারে পাঠায়।",
    english: "Transmits raw, unstructured bit streams over physical transmission media.",
    protocols: "Ethernet cables (CAT6), Fiber optics, Radio waves, Hubs, Connectors (RJ-45)",
    example: "Light pulses flashing through undersea fiber optic cables across the Atlantic ocean.",
    keywords: "Raw bits (0 and 1), Voltage levels, Fiber optic, Radio frequencies, Connectors",
    examQuestion: "Name three physical transmission media that operate at Layer 1."
  }
];

export const SCENARIOS = [
  {
    id: "sc-phish",
    title: "Suspicious Email Alert",
    scenarioText: "You receive an urgent email saying: 'Your university exam account has been suspended! Click this link immediately to enter your password and restore access within 10 minutes.'",
    choices: [
      { text: "Click the link immediately to restore your exam access", correct: false, feedback: "Incorrect! This is classic phishing panic tactics designed to steal your credentials." },
      { text: "Verify the sender's actual email domain and navigate directly to official portal", correct: true, feedback: "Correct! Never click suspicious urgency links. Inspect the actual sending header and use official bookmarks." },
      { text: "Reply to the email with your username and password", correct: false, feedback: "Dangerous mistake! Legitimate administrators never solicit credentials via unsecured email." },
      { text: "Forward the email to all your classmates", correct: false, feedback: "Incorrect! This risks spreading the phishing lure to vulnerable peers." }
    ]
  },
  {
    id: "sc-ddos",
    title: "Online Exam Server Under DDoS Siege",
    scenarioText: "During the final semester exam, the university server CPU spikes to 100% due to 500,000 requests per second originating from 40,000 infected IoT smart cameras worldwide.",
    choices: [
      { text: "Block a single IP address on the local campus router", correct: false, feedback: "Insufficient! A DDoS attack is distributed across tens of thousands of IPs; single IP blocking will fail." },
      { text: "Deploy Cloudflare/CDN rate limiting, Web Application Firewall (WAF), and Anycast scrubbing", correct: true, feedback: "Optimal defense! Anycast distribution and scrubbing centers absorb distributed botnet volumetric floods." },
      { text: "Turn off the server permanently and give up on online exams", correct: false, feedback: "Not an engineering solution." },
      { text: "Ask students to refresh their browser pages continuously", correct: false, feedback: "Refreshing browsers worsens server congestion by injecting even more concurrent HTTP requests." }
    ]
  }
];

export const FREELANCING_CAREERS = [
  {
    title: "Web Development",
    icon: "💻",
    skills: "HTML5, CSS3, JavaScript, React, Node.js, Python/Django, Database management",
    marketplaces: "Upwork, Toptal, Freelancer",
    scope: "Building responsive websites, SaaS web apps, and customized e-commerce portals for global businesses."
  },
  {
    title: "Graphic Design & UI/UX",
    icon: "🎨",
    skills: "Figma, Adobe Photoshop, Illustrator, Color theory, Wireframing, Prototyping",
    marketplaces: "Fiverr, 99designs, Dribbble",
    scope: "Creating brand identities, mobile app mockups, logos, social media marketing assets."
  },
  {
    title: "Digital Marketing & SEO",
    icon: "📈",
    skills: "Google Analytics, Search Engine Optimization (SEO), Meta Ads, Copywriting",
    marketplaces: "Upwork, Fiverr, PeoplePerHour",
    scope: "Optimizing website ranking on Google search and managing paid customer acquisition campaigns."
  },
  {
    title: "Data Analysis",
    icon: "📊",
    skills: "Excel, SQL, Power BI, Tableau, Python (Pandas, Matplotlib)",
    marketplaces: "Upwork, Toptal, Kaggle Projects",
    scope: "Transforming raw business sales numbers into interactive decision dashboards and predictive forecasts."
  },
  {
    title: "Content & Technical Writing",
    icon: "✍️",
    skills: "Research, English syntax, SEO keyword integration, Technical documentation",
    marketplaces: "ProBlogger, Upwork, Contently",
    scope: "Authoring tech blog articles, API developer documentation, and academic instructional guides."
  },
  {
    title: "Video Editing & Motion Graphics",
    icon: "🎬",
    skills: "Adobe Premiere Pro, After Effects, DaVinci Resolve, Audio mastering",
    marketplaces: "Fiverr, Upwork, YouTube Creator partnerships",
    scope: "Editing commercial videos, documentary shorts, podcasts, and explanatory animations."
  }
];
