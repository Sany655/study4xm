
### Items to verify against the official NU syllabus

- The registry assigns course code `212005` to both Social History and Sociology of Marriage.
- Year 1 is listed as 30 total credits, while its eight registered courses each show 4 credits (32 combined).
- The ICT course code is `216602`; verify this against the current official department outline before changing it.
# Study4XM | National University Study Platform

## 📖 সারসংক্ষেপ (Overview)

Study4XM is being built as a premium study platform for **National University of Bangladesh** learners. It is designed to grow across programs; the only active lesson pack today is **BSS Honours Sociology, Year 1**, with the eight subjects listed below. Other departments and years are planned, not currently available or included in the purchase. Study4XM is not an NCTB HSC ICT/Economics app.

<img width="425" height="1326" alt="image" src="https://github.com/user-attachments/assets/9e42a326-7d98-4bfb-840a-d5e6ed26242a" />

### Current course coverage

| Year | Subject | Current status |
| --- | --- | --- |
| 1st | Introduction to Sociology | Active lesson data |
| 1st | Social History and World Civilization | Active lesson data |
| 1st | Sociology of Marriage and Family | Active lesson data |
| 1st | Social Problems and Issues | Active lesson data |
| 1st | History of Bangladesh: Language and Culture | Active lesson data |
| 1st | Introduction to Political Science | Active lesson data |
| 1st | Principles of Economics | Active lesson data |
| 1st | ICT and Computer System / Lab | Active lesson data |
| 2nd–4th | Sociology Honours roadmap courses | Catalog/roadmap only; lesson content is not active |

Course metadata lives in `src/data/curriculumRegistry.js`; `src/data/bookPages.js` maps the eight first-year course IDs to their lesson datasets. The requirements folder contains course-outline/reference scans and the written hierarchy requirement: `subject -> chapters -> lessons`. New programs should be added only after their syllabus and lesson datasets are ready; the current purchase covers only the active Sociology Year 1 pack.

[![Live App](https://img.shields.io/badge/Live_Site-study4xm.web.app-e11d48?style=for-the-badge&logo=firebase)](https://study4xm.web.app)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Curriculum](https://img.shields.io/badge/Curriculum-NU_BSS_Sociology-006a4e?style=for-the-badge)](https://study4xm.web.app)

---

* **🌐 লাইভ ওয়েবসাইট**: [https://study4xm.web.app](https://study4xm.web.app)
* **🔥 ফায়ারবেস প্রজেক্ট**: `portfolio-sany` (হোস্টিং সাইট: `study4xm`)

---

## 🏗️ মূল ডেটা স্ট্রাকচার (Data Hierarchy Architecture)

অ্যাপ্লিকেশনটির ডেটা মডেল কঠোরভাবে **`Subject -> Chapters / Units -> Lessons / Topics`** হায়ারার্কি অনুসরণ করে:

```mermaid
graph TD
  A["BSS Honours Sociology"] --> Y1["Year 1: active lesson library"]
  A --> Y2["Years 2–4: roadmap"]
  Y1 --> C["8 registered subjects"]
  C --> H["Chapters / Units"]
  H --> L["Lessons / Topics"]
```

---

## 🎯 ৫-লেভেল শিক্ষণ পদ্ধতি (5-Level Learning System per Lesson)

প্রথম বর্ষের lesson data-তে ধারণা, টার্ম, উদাহরণ, লিখিত অনুশীলন ও কুইজের মতো ক্ষেত্র থাকতে পারে। সব কোর্স/পাঠে প্রতিটি ক্ষেত্র সমানভাবে নেই এবং কোনো ফলাফল বা নম্বর নিশ্চিত করা হয় না:

1. **লেভেল ১: প্রাথমিক ধারণা ও মূল উপলব্ধি (Core Concept & Syllabus Outline)**
   * সহজ বাংলায় মূল ধারণার রূপরেখা (`simpleIdea`).
   * অতি সহজ কথোপকথনমূলক ব্যাখ্যা (`simplerVersion`) টগল বাটন সহ।
  * কোর্স-নির্দিষ্ট ব্যাখ্যা (`banglaExplanation`).
2. **লেভেল ২: পরীক্ষার জন্য আবশ্যকীয় শব্দকোষ (Key Terminology & Keywords)**
   * পারিভাষিক শব্দ ও নির্ভুল সংজ্ঞার গ্রিড (`keywords`: `term` + `def`).
3. **লেভেল ৩: প্রযুক্তিগত কার্যপদ্ধতি ও বাস্তব উদাহরণ (Technical Mechanics & Labs)**
   * প্রযুক্তিগত প্রক্রিয়া ও সমীকরণ (`technicalExplanation`).
   * বাস্তব জীবনের প্রাসঙ্গিক উদাহরণ (`realLifeExample`).
   * টপিক-ভিত্তিক লাইভ ইন্টারঅ্যাক্টিভ ল্যাব (যেমন: এক্সেল রানার, ওএসআই লেয়ার, চাহিদা-যোগান ক্যানভাস)।
4. **লেভেল ৪: বোর্ড পরীক্ষার লিখিত উত্তরের কাঠামো (Board Exam Answer Templates)**
  * `twoMark`, `fiveMark`, `tenMark`-এর মতো লিখিত অনুশীলন, যেখানে ডেটায় দেওয়া আছে।
5. **লেভেল ৫: তাৎক্ষণিক যাচাই ও সক্রিয় স্মরণ (Assessment & Active Recall)**
   * অবজেক্টিভ চেকপয়েন্ট কুইজ (`mcqs`) সঠিক/ভুল ব্যাখ্যা সহ।
   * না দেখে নিজের ভাষায় লেখার অ্যাক্টিভ রিকল নোটপ্যাড (`notepad-textarea`).
   * স্বয়ংক্রিয় ভুল ট্র্যাকিং যা ভুলগুলোকে সরাসরি "ভুল সংশোধনী খাতা"-য় যুক্ত করে।

---

## 🧪 ইন-বুক ইন্টারঅ্যাক্টিভ সিমুলেটরসমূহ (Embedded Simulators)

| সিমুলেটর | ফাইল পাথ | কার্যপদ্ধতি |
| :--- | :--- | :--- |
| **লাইভ স্প্রেডশিট ল্যাব** | [`src/components/interactive/ExcelSimulator.jsx`](file:///c:/All/works/tisha-exams/src/components/interactive/ExcelSimulator.jsx) | রিয়েল-টাইম সেল এডিটিং, `=SUM`, `=AVERAGE`, `=MAX`, `=MIN` ফর্মুলা পার্সিং |
| **OSI ৭-লেয়ার ভিজ্যুয়ালাইজার** | [`src/components/interactive/OSIVisualizer.jsx`](file:///c:/All/works/tisha-exams/src/components/interactive/OSIVisualizer.jsx) | অ্যাপ্লিকেশন থেকে ফিজিক্যাল লেয়ার পর্যন্ত প্যাকেট এনক্যাপসুলেশন ও অডিও ভয়েস ব্যাখ্যা |
| **স্লাইড ট্রানজিশন বিল্ডার** | [`src/components/interactive/PowerPointBuilder.jsx`](file:///c:/All/works/tisha-exams/src/components/interactive/PowerPointBuilder.jsx) | স্লাইড তৈরি, অ্যানিমেশন টাইমলাইন ও লাইভ প্লেয়ার |
| **সাইবার নিরাপত্তা ডিসিশন ট্রি** | [`src/components/interactive/CyberScenario.jsx`](file:///c:/All/works/tisha-exams/src/components/interactive/CyberScenario.jsx) | ফিশিং, র‌্যানসমওয়্যার ও টু-ফ্যাক্টর অথেনটিকেশনের লাইভ সিনারিও টেস্ট |
| **চাহিদা ও যোগান ভারসাম্য ক্যানভাস** | [`src/components/interactive/SupplyDemandCanvas.jsx`](file:///c:/All/works/tisha-exams/src/components/interactive/SupplyDemandCanvas.jsx) | HTML5 ক্যানভাসে দাম (P) ও পরিমাণ (Q) পরিবর্তনের সাথে সাথে ভারসাম্য রেখাচিত্রের ডাইনামিক শিফট |

---

## 🧭 গাইডেড ট্যুর সিস্টেম (Interactive SVG Mask Onboarding Tour)

নতুন ব্যবহারকারীদের জন্য অ্যাপটিতে একটি অত্যাধুনিক অনবোর্ডিং গাইড ট্যুর অন্তর্ভুক্ত রয়েছে:
* **ফাইল**: [`src/components/GuidedTour.jsx`](file:///c:/All/works/tisha-exams/src/components/GuidedTour.jsx)
* **আর্কিটেকচার**: SVG Mask Cutout (`<mask id="tour-spotlight-cutout">`) ব্যবহার করা হয়েছে।
* **বৈশিষ্ট্য**: 
  * টার্গেট এলিমেন্টের ওপর কোনো ঘোলা বা অন্ধকার আবরণ থাকে না; টার্গেট বোতামটি ১০০% উজ্জ্বল ও তীক্ষ্ণ থাকে।
  * চারদিকে একটি লুমিনাস পিংক স্পটলাইট রিং ও পালসিং অ্যানিমেশন প্রদর্শিত হয়।
  * প্রথমবার আগত ভিজিটরদের জন্য স্বয়ংক্রিয় ওয়েলকাম টোস্ট।
  * হেডারে **"🧭 গাইড"** বোতামে চাপ দিয়ে যেকোনো সময় পুনরায় ট্যুর চালু করা যায়।
  * "বাদ দিন" (Skip), "পূর্ববর্তী", "পরবর্তী" এবং কিবোর্ড শর্টকাট (`←`, `→`, `Esc`) সাপোর্ট।

---

## 📂 ফাইল ও ফোল্ডার বিন্যাস (Directory Layout)

```text
tisha-exams/
├── index.html                     # প্রধান HTML ও Google Fonts (Hind Siliguri, Outfit)
├── package.json                   # প্রজেক্ট ডিপেনডেন্সি ও স্ক্রিপ্টসমূহ
├── vite.config.js                 # Vite কনফিগারেশন (React প্লাগইন সহ)
├── firebase.json                  # ফায়ারবেস হোস্টিং রুল ও রিরাইট কনফিগ
├── .firebaserc                    # ফায়ারবেস প্রজেক্ট ম্যাপিং (portfolio-sany)
│
├── src/
│   ├── main.jsx                   # React DOM রুট মাউন্ট
│   ├── App.jsx                    # মূল রুট কনটেইনার ও থিম সিঙ্ক
│   ├── index.css                  # গ্লোবাল সিএসএস, ডার্ক মোড প্যালেট ও বুক স্টাইলিং
│   │
│   ├── data/                      # Course registry and subject -> chapters -> lessons data
│   │   ├── curriculumRegistry.js  # 4-year course catalog and active/roadmap status
│   │   ├── bookPages.js           # Maps the 8 active first-year courses to lesson data
│   │   ├── *Data.js                # Subject datasets for sociology, history, family, politics, economics, ICT
│   │   └── differenceData.js      # Shared ICT/Economics comparison tables
│   │
│   ├── hooks/                     # ⚙️ স্টেট ও অডিও কন্ট্রোলার
│   │   ├── useAppState.js         # লোকাল স্টোরেজ সিঙ্ক, অগ্রগতি ট্র্যাকার, কুইজ ও মিস্টেক হ্যান্ডলার
│   │   └── useAudioTTS.js         # Web Audio API and Web Speech text-to-speech
│   │
│   └── components/                # 🧩 ভিউ ও ইন্টারঅ্যাক্টিভ উপাদানসমূহ
│       ├── BookLayout.jsx         # মূল বই ফ্রেমওয়ার্ক, হেডার, বটম ডক ও ড্র্যাগ/সোয়াইপ ইঞ্জিন
│       ├── BookPage.jsx           # ৫-লেভেল লেসন রেন্ডারার ও অ্যাক্টিভ রিকল নোটপ্যাড
│       ├── TableOfContents.jsx    # স্লাইড-আউট সূচিপত্র ড্রয়ার ও দ্রুত কোর্স সুইচ
│       ├── GuidedTour.jsx         # এসভিজি মাস্কভিত্তিক ইন্টারেক্টিভ স্পটলাইট ট্যুর
│       ├── DifferenceTablesView.jsx # পার্থক্য ছক ভিউয়ার
│       ├── FlashcardsView.jsx     # স্পেসড রেপিটিশন (SRS) ফ্ল্যাশকার্ড ডেক
│       ├── WritingTrainerView.jsx # লিখিত সৃজনশীল উত্তরের কাঠামো ও স্ব-মূল্যায়ন
│       ├── ExamSimulatorView.jsx  # ১০০ নম্বরের টাইমারযুক্ত বোর্ড পরীক্ষা হল
│       ├── MistakeNotebookView.jsx# ভুল সংশোধনী খাতা (রিভিশন ট্র্যাকার)
│       ├── SpacedRevisionView.jsx # সময় অনুযায়ী রিভিশন শিডিউলার
│       │
│       └── interactive/           # 🧪 ৫টি লাইভ ইন্টারঅ্যাক্টিভ ল্যাব
│           ├── ExcelSimulator.jsx
│           ├── OSIVisualizer.jsx
│           ├── PowerPointBuilder.jsx
│           ├── CyberScenario.jsx
│           └── SupplyDemandCanvas.jsx
```

---

## 🛠️ নতুন ডেটা ও ফিচার যুক্ত করার নির্দেশিকা (Developer Guide)

### ১. নতুন পাঠ/লেসন যুক্ত করা (Adding a New Lesson)

প্রথমে `src/data/curriculumRegistry.js` থেকে course ID খুঁজুন, তারপর সংশ্লিষ্ট dataset module-এ ওই course-এর schema অনুসারে chapter/topic যোগ করুন. Active course IDs and source modules are mapped in [`src/data/bookPages.js`](src/data/bookPages.js). ICT and Economics use a different schema from the Sociology datasets, so follow the nearby examples in the matching module. The lesson fields below are illustrative, not required on every lesson:

```javascript
{
  id: "ict-u1-t3", // অনন্য ইউনিক আইডি
  title: "উপাত্ত ও তথ্যের মধ্যে পার্থক্য (Data vs Information)",
  priority: 5,     // ১ থেকে ৫ স্টার গুরুত্ব
  simpleIdea: "উপাত্ত হলো কাঁচামাল, আর তথ্য হলো প্রক্রিয়াজাত অর্থপূর্ণ ফল।",
  simplerVersion: "যেমন: '৮০, ৯০, ৮৫' হলো উপাত্ত। কিন্তু 'রকিবের পরীক্ষার নম্বর ৮০, ৯০, ৮৫' হলো তথ্য।",
  banglaExplanation: "উপাত্ত হলো কোনো প্রক্রিয়াকরণ ব্যতীত বিচ্ছিন্ন উপাদান। উপাত্তকে যখন নির্দিষ্ট প্রক্রিয়াকরণের মাধ্যমে ব্যবহারযোগ্য ও অর্থবহ করা হয়, তখন তাকে তথ্য বলে।",
  keywords: [
    { term: "উপাত্ত (Data)", def: "তথ্যের ক্ষুদ্রতম কাঁচামাল যা এককভাবে কোনো পূর্ণাঙ্গ অর্থ প্রকাশ করতে পারে না।" },
    { term: "তথ্য (Information)", def: "অর্থপূর্ণ প্রক্রিয়াজাত উপাত্ত যা সিদ্ধান্ত গ্রহণে সহায়তা করে।" }
  ],
  technicalExplanation: "ডেটাবেজে রেকর্ড ও ফিল্ডের সমন্বয়ে ডেটা সঞ্চিত হয়। অ্যালগরিদম ও কুয়েরি প্রক্রিয়াকরণের মাধ্যমে ডেটা ইনফরমেশনে রূপান্তরিত হয়।",
  realLifeExample: "ভোটার তালিকায় প্রতিটি নাগরিকের আঙুলের ছাপ ও ছবি হলো উপাত্ত, আর তৈরি হওয়া স্মার্ট জাতীয় পরিচয়পত্র হলো তথ্য।",
  examAnswers: {
    twoMark: "উপাত্ত ও তথ্যের মধ্যে দুটি পার্থক্য লিখুন:\n১. উপাত্ত কোনো অর্থ প্রকাশ করতে পারে না, কিন্তু তথ্য পূর্ণ অর্থ প্রকাশ করে।\n২. উপাত্ত প্রক্রিয়াকরণের পূর্ববর্তী রূপ, আর তথ্য হলো প্রক্রিয়াকরণের পরবর্তী ফলাফল।",
    fiveMark: "উপাত্ত ও তথ্যের সম্পর্ক ও এদের রূপান্তর প্রক্রিয়া চিত্রসহ ব্যাখ্যা করো...",
    tenMark: "তথ্যপ্রযুক্তির যুগে নির্ভরযোগ্য তথ্যের গুরুত্ব ও উপাত্ত ব্যবস্থাপনার ভূমিকা বিশদ আলোচনা করো..."
  },
  commonMistakes: "উপাত্তকে তথ্যের চেয়ে বড় মনে করা একটি ভুল ধারণা; উপাত্ত প্রক্রিয়াজাত হয়েই তথ্য তৈরি হয়।",
  recallQuestion: "উপাত্ত ও তথ্যের মূল ৩টি পার্থক্য স্মৃতি থেকে লিখুন:",
  mcqs: [
    {
      question: "নিচের কোনটি প্রক্রিয়াজাত উপাত্তের রূপ?",
      options: ["উপাত্ত", "তথ্য", "সংকেত", "অ্যালগরিদম"],
      correct: 1,
      difficulty: "সহজ",
      explanation: "উপাত্তকে প্রক্রিয়াকরণ করলেই তা অর্থপূর্ণ তথ্যে পরিণত হয়।"
    }
  ]
}
```

> **নোট**: `bookPages.js` builds pages from each mapped course's syllabus data. A course without a mapping currently gets generated placeholder lessons, so do not mark it active until real lesson data is mapped and checked.

---

### ২. নতুন বিষয় বা কোর্স যুক্ত করা (Adding a Course)

1. Add the course metadata and honest status to `ACADEMIC_YEARS` in `src/data/curriculumRegistry.js`.
2. Add its syllabus module to `src/data/bookPages.js` and ensure the content uses a schema that `BookPage.jsx` supports.
3. Confirm the course selector, syllabus pages, practice content, and any course-specific exam tools before marking the course active.

---

### ৩. নতুন ইন্টারঅ্যাক্টিভ ল্যাব বা সিমুলেটর তৈরি করা (Adding an Interactive Simulator)

1. `src/components/interactive/` ডিরেক্টরিতে একটি নতুন কম্পোনেন্ট তৈরি করুন (যেমন: `LogicGateSimulator.jsx`)।
2. [`src/components/BookPage.jsx`](file:///c:/All/works/tisha-exams/src/components/BookPage.jsx)-এ শর্ত অনুযায়ী ইমপোর্ট ও রেন্ডার করুন:
   ```jsx
   {topic.id === 'ict-u3-t1' && (
     <div className="book-lab-container">
       <div className="lab-title-row">
         <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>ইন্টারেক্টিভ ল্যাব: লজিক গেট ট্রুথ টেবিল রানার</h4>
         <span className="lab-tag">হাতে-কলমে ল্যাব</span>
       </div>
       <LogicGateSimulator onChime={onChime} />
     </div>
   )}
   ```

---

## 💻 লোকাল ডেভেলপমেন্ট ও বিল্ড কমান্ডসমূহ (Running Locally)

### ১. ডিপেনডেন্সি ইনস্টল করুন
```bash
npm install
```

### ২. ডেভেলপমেন্ট সার্ভার চালু করুন
```bash
npm run dev
```
ব্রাউজারে ডিফল্ট পোর্ট `http://localhost:5173` ওপেন হবে।

### ৩. প্রোডাকশন বিল্ড তৈরি করুন
```bash
npm run build
```
এটি `dist/` ফোল্ডারে অপ্টিমাইজড এইচটিএমএল, সিএসএস এবং জেএস বান্ডেল তৈরি করবে।

### ৪. ফায়ারবেস হোস্টিংয়ে ডিপ্লয় করুন
```bash
npx firebase deploy --only hosting:study4xm --project portfolio-sany
```
সরাসরি লাইভ ইউআরএল: **`https://study4xm.web.app`** এ পরিবর্তন প্রতিফলিত হবে।

### Premium payment setup

The public premium page uses Firebase Authentication. AamarPay checkout and referral endpoints are in the standalone Vercel project under [`payment-service/`](./payment-service/README.md). The service fixes the price server-side, stores a pending transaction, verifies it with AamarPay, and only then grants Premium through Firebase Admin. Stripe and Google Play Billing remain disabled until their own server-side purchase verification flows are implemented.

Deploy `payment-service/` to Vercel with that folder set as the project root. Configure the Firebase service-account variables, AamarPay credentials, `AAMARPAY_MODE=sandbox`, `PUBLIC_APP_URL`, and the stable `PAYMENT_SERVICE_URL` in Vercel. Keep all credentials in Vercel environment settings; never put them in Vite variables or client code. Detailed environment variable names and sandbox-to-live steps are in [`payment-service/README.md`](./payment-service/README.md).

After deploying the API, set `VITE_PAYMENT_CHECKOUT_API=https://<your-vercel-domain>/api/create` in the frontend build environment, then rebuild and deploy Hosting. This setting is intentionally empty in `.env.example`, so payment stays unavailable until a real API URL is configured. Test sandbox success, failure, cancellation, and status polling before enabling live credentials. AamarPay must issue/approve live merchant credentials before `AAMARPAY_MODE` is changed to `live`.

The payment service handles referrals server-side because the Firestore rules are owner-only for user documents. Keep those rules in place so clients cannot grant themselves Premium; the Firebase Admin payment service is the Premium grant path.

---

## 🎨 থিম ও স্টাইলিং সিস্টেম (Warm Rose Academic Aesthetic)

* **লাইট মোড (Creamy Warm Rose Parchment)**:
  * `--rose-50`: `#fff5f7`, `--rose-100`: `#ffe4e9`, `--rose-600`: `#e11d48`, `--text-ink`: `#2e0d16`.
* **ডার্ক মোড (Deep Dark Rose & High Contrast)**:
  * `--book-bg`: `#12070b`, `--page-bg`: `#1c0a10`, `--rose-50`: `#270f17`, `--text-ink`: `#fff0f3`.
* **টাইপোগ্রাফি**:
  * বাংলা পাঠ ও হেডারের জন্য Google Font: **`'Hind Siliguri'`** (যুক্তবর্ণ ও স্বরচিহ্নের নির্ভুল রেন্ডারিং)।
  * ইংরেজি টেক্সট ও সংখ্যার জন্য: **`'Outfit'`** ও **`'Crimson Pro'`**।

---

## 👨‍💻 অবদান ও লাইসেন্স (License & Maintenance)

প্রজেক্টটি NU BSS Honours Sociology-র প্রথম বর্ষের কোর্স কনটেন্টের জন্য তৈরি। নতুন অধ্যায়, অনুশীলন প্রশ্ন বা ইন্টারঅ্যাক্টিভ ভিজ্যুয়ালাইজার যোগ করার আগে সংশ্লিষ্ট অফিসিয়াল কোর্স সিলেবাসের সাথে মিলিয়ে নিন।
