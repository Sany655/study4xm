// ==========================================================================
// AI SERVICE - Real-time LLM API Client (Google Gemini / Smart Offline Engine)
// Handles structured syllabus explanations and prompt-based modifications
// ==========================================================================

const API_KEY_STORAGE_KEY = "study4xm_gemini_api_key";
const CACHE_PREFIX = "study4xm_ai_cache_";

export function getGeminiApiKey() {
  try {
    return localStorage.getItem(API_KEY_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

export function setGeminiApiKey(key) {
  try {
    if (key && key.trim()) {
      localStorage.setItem(API_KEY_STORAGE_KEY, key.trim());
    } else {
      localStorage.removeItem(API_KEY_STORAGE_KEY);
    }
    window.dispatchEvent(new Event('study4xm_apikey_changed'));
  } catch (e) {
    console.error("Could not save API key to localStorage", e);
  }
}

export function hasCustomApiKey() {
  return Boolean(getGeminiApiKey());
}

// Generate a strictly defined, high-yield educational response for any subtopic
function generateOfflineExplanation(subtopic, subject, unitTitle, customPrompt = "") {
  const isEcon = subject?.toLowerCase().includes("econ") || subject === "অর্থনীতি";
  const kwList = subtopic.keywords?.join(", ") || "";
  
  const kwFormatted = subtopic.keywords && subtopic.keywords.length > 0
    ? subtopic.keywords.map(kw => `* **${kw}:** বোর্ড পরীক্ষায় সংজ্ঞায় আবশ্যক এমন একটি মৌলিক প্রযুক্তিগত/অর্থনৈতিক স্তম্ভ।`).join("\n")
    : "* **মূল পরিভাষা:** সংশ্লিষ্ট অধ্যায়ের গুরুত্বপূর্ণ প্রযুক্তিগত বা অর্থনৈতিক ধারণা।";

  let promptSection = "";
  if (customPrompt && customPrompt.trim()) {
    const p = customPrompt.trim();
    let promptAnswer = "";
    if (p.includes("সহজ") || p.includes("simpler") || p.includes("সহজ ভাষায়")) {
      promptAnswer = `**সহজ ভাষায় বাস্তব উপলব্ধি:**\nমনে করুন, আমরা যখন দৈনন্দিন জীবনে কোনো কাজ করি তখন পেছনের জটিল মেকানিজম না দেখে সরাসরি সুফল পাই। ঠিক সেভাবেই **"${subtopic.title}"** হলো একটি সুশৃঙ্খল প্রক্রিয়া যা জটিল ইনপুটকে মানুষের উপযোগী অর্থবহ ফলাফলে রূপান্তর করে। যেমন: রান্নার কাঁচামাল প্রক্রিয়াজাত হয়ে খাওয়ার উপযোগী খাদ্যে পরিণত হওয়া।`;
    } else if (p.includes("বুলেট") || p.includes("৫ নম্বর") || p.includes("পয়েন্ট")) {
      promptAnswer = `**বোর্ড পরীক্ষায় ৫ নম্বরের ৪টি আবশ্যিক বুলেট পয়েন্ট:**\n1. **সংজ্ঞা ও পারিভাষিক সূচনা:** ${subtopic.coreConcept}\n2. **অত্যাবশ্যকীয় উপাদানসমূহ:** ${kwList}\n3. **বাস্তব প্রয়োগ ও উপযোগিতা:** নির্ভুল ফলাফল পাওয়া, অপচয় রোধ করা এবং দ্রুত ও সঠিক সিদ্ধান্ত গ্রহণে সহায়তা করা।\n4. **বোর্ড সতর্কবার্তা:** উত্তরের ভেতরে আবশ্যকীয় ইংরেজি টার্মিনোলজি আন্ডারলাইন করে দিলে পরীক্ষক সর্বোচ্চ নম্বর প্রদান করেন।`;
    } else if (p.includes("mcq") || p.includes("প্রশ্ন")) {
      promptAnswer = `**বোর্ড স্ট্যান্ডার্ড ২টি উচ্চফলনশীল MCQ ও সমাধান:**\n\n1. **প্রশ্ন:** ${subtopic.title}-এর ক্ষেত্রে নিচের কোনটি সবচেয়ে সঠিক?\n   - ক) এটি একটি বিচ্ছিন্ন প্রক্রিয়া\n   - খ) ${subtopic.coreConcept.slice(0, 50)}... (সঠিক উত্তর)\n   - গ) এর কোনো ব্যবহারিক উপযোগ নেই\n   - ঘ) কোনোটিই নয়\n   *সঠিক উত্তর:* খ | *ব্যাখ্যা:* এনসিটিবি পাঠ্যবই অনুযায়ী এটি মূল কারিগরি রূপ।\n\n2. **প্রশ্ন:** নিচের কোন পরিভাষাটি এর সাথে সরাসরি সম্পৃক্ত?\n   - ক) ${subtopic.keywords?.[0] || "প্রধান উপাদান"} (সঠিক উত্তর)\n   - খ) অপ্রাসঙ্গিক চলক\n   - গ) স্থায়ী অচলাবস্থা\n   - ঘ) কোনোটিই নয়\n   *সঠিক উত্তর:* ক | *ব্যাখ্যা:* এটি এই টপিকের অপরিহার্য টার্মিনোলজি।`;
    } else if (p.includes("উদাহরণ") || p.includes("example")) {
      promptAnswer = `**বাস্তব জীবনের প্রাসঙ্গিক কেস স্টাডি:**\nবাংলাদেশে মোবাইল ফিন্যান্সিয়াল সার্ভিস (বিকাশ/নগদ) অথবা ডিজিটাল জাতীয় পরিচয়পত্র (NID) ডেটাবেজের দিকে তাকালে এর প্রত্যক্ষ ব্যবহার দেখা যায়। গ্রাহক যখন লেনদেনের নির্দেশ দেন, সেন্ট্রাল সার্ভার তা নিমেষেই প্রক্রিয়াজাত করে উভয় পক্ষের কাছে কনফার্মেশন পাঠিয়ে লেজার আপডেট করে।`;
    }

    if (promptAnswer) {
      promptSection = `\n\n### 💬 ৭. আপনার অনুরোধ অনুযায়ী সিলেবাস নোটস (অফলাইন)\n\n**আপনার অনুরোধ:** "${p}"\n\n${promptAnswer}`;
    }
  }

  return `### 💡 ১. মূল ধারণা ও সারমর্ম (Core Summary)

${subtopic.coreConcept}

জাতীয় শিক্ষাক্রম (NCTB) অনুযায়ী এটি বোর্ড পরীক্ষায় ১০০/১০০ অর্জনের জন্য একটি অতি-গুরুত্বপূর্ণ ভিত্তিপ্রস্তর। এর স্পষ্ট উপলব্ধি থাকলে বহুনির্বাচনী ও সৃজনশীল উভয় বিভাগেই পূর্ণ নম্বর পাওয়া নিশ্চিত হয়।

### 🔑 ২. আবশ্যকীয় ইংরেজি ও পারিভাষিক শব্দ (Key Technical Terminology)

বোর্ড পরীক্ষায় পরীক্ষকের দৃষ্টি আকর্ষণ ও পূর্ণ নম্বরের নিশ্চয়তা পেতে নিচের পরিভাষাগুলো অবশ্যই খাতায় উল্লেখ করুন:

${kwFormatted}

### 📝 ৩. ২ নম্বরের অনুধাবনমূলক প্রশ্ন ও শতভাগ আদর্শ উত্তর (2-Mark Model Answer)

**অনুধাবনমূলক প্রশ্ন:** *"${subtopic.title} বলতে কী বোঝায়?"*

> **শতভাগ আদর্শ উত্তর:** ${subtopic.coreConcept} আধুনিক ${isEcon ? "অর্থনীতি ও বাজার ব্যবস্থাপনায়" : "কম্পিউটার ও ডিজিটাল তথ্যপ্রযুক্তিতে"} এর সঠিক জ্ঞান সময় বাঁচায় এবং সামগ্রিক সিদ্ধান্ত গ্রহণে নির্ভুলতা নিশ্চিত করে।

### 📊 ৪. সৃজনশীল উত্তরের পয়েন্টভিত্তিক কাঠামো (Broad Answer - 5/10 Marks)

1. **ভূমিকা ও সংজ্ঞা:** পারিভাষিক শব্দ সমন্বয়ে পরিষ্কার ও দৃষ্টিনন্দন প্রারম্ভিকা।
2. **মূল কার্যপদ্ধতি ও মেকানিজম:** ধাপে ধাপে প্রক্রিয়া, সূত্র বা সমীকরণ বিশদভাবে উপস্থাপন করা।
3. **সুবিধা ও প্রায়োগিক দিক:** ব্যবহারিক কার্যকারিতা ও জাতীয় অর্থনীতিতে এর ইতিবাচক ফলাফল তুলে ধরা।
4. **উপসংহার:** আধুনিক বিজ্ঞান ও প্রায়োগিক বাস্তবতায় এই ধারণার অপরিহার্যতা ব্যক্ত করা।

### 🌍 ৫. বাস্তব জীবনের উদাহরণ (Real-World Case Study)

বাংলাদেশের বাস্তব প্রেক্ষাপটে (যেমন: ব্যাংকিং লেনদেন স্বয়ংক্রিয়করণ, ই-গভর্ন্যান্স সেবা, তৈরি পোশাক শিল্প ব্যবস্থাপনা অথবা জাতীয় রাজস্ব বোর্ড) এটি সরাসরি প্রযুক্ত হচ্ছে এবং মানুষের জীবনযাত্রাকে সহজতর করছে।

### ⚠️ ৬. সাধারণ ভুল ও পরীক্ষকের সতর্কতা (Common Pitfalls & Tips)

শিক্ষার্থীরা প্রায়ই পারিভাষিক সংজ্ঞার ক্ষেত্রে আক্ষরিক বা ভুল বাংলা অনুবাদের আশ্রয় নেয়। সবসময় মূল ইংরেজি টার্মটি বন্ধনীতে লিখে রাখা উচিত এবং কোনো অবস্থাতেই অসম্পূর্ণ সংজ্ঞা দিয়ে উত্তর শেষ করা যাবে না।${promptSection}`;
}

/**
 * Main function to fetch or stream AI explanation for a subtopic
 */
export async function fetchTopicAiExplanation({
  subtopic,
  subject,
  unitTitle,
  customPrompt = "",
  conversationHistory = []
}) {
  const apiKey = getGeminiApiKey();

  // If no custom API key is configured, return offline intelligent response
  if (!apiKey) {
    await new Promise(resolve => setTimeout(resolve, 350));
    return {
      text: generateOfflineExplanation(subtopic, subject, unitTitle, customPrompt),
      source: "offline-knowledge-engine"
    };
  }

// Construct strictly defined system prompt for Gemini
  const systemInstruction = `You are an elite academic examiner and senior curriculum specialist for the Bangladesh NCTB National Curriculum for HSC/Board level ICT and Economics (আইসিটি ও অর্থনীতি).
Target: Help the student master the concept, retain essential English technical terms, and write flawless board exam answers targeting 100/100 marks.
Subject: ${subject}
Unit / Chapter: ${unitTitle}
Subtopic: ${subtopic.title} (${subtopic.titleEn || ""})
Core Context: ${subtopic.coreConcept}
Keywords: ${subtopic.keywords?.join(", ")}

STRICT STRUCTURAL CONTRACT (MANDATORY FORMATTING RULES):
1. You MUST divide your entire response into EXACTLY the following 6 numbered sections using markdown '### ' headings.
2. Under NO circumstances should any text follow the '### [Heading]' on the same line.
3. Every '### [Heading]' MUST be followed by an empty blank line before the content starts.
4. Put an empty blank line between every paragraph, bullet point, and blockquote.
5. NEVER merge multiple bullet points onto a single line. Every bullet point MUST start on its own new line with a hyphen and a space: '- '.
6. In Section 2 (Key Technical Terminology), write each term on a new line in this exact format:
   - **English Term** (বাংলা পারিভাষিক অর্থ): এক লাইনের স্পষ্ট কারিগরি সংজ্ঞা।
7. In Section 3 (2-Mark Model Answer), structure strictly as:
   **প্রশ্ন:** [একটি আদর্শ ২ নম্বরের বোর্ড প্রশ্ন]

   > **শতভাগ আদর্শ উত্তর:** [বোর্ড স্ট্যান্ডার্ড ২-৩ লাইনের নির্ভুল উত্তর যা লিখলে পূর্ণ ২/২ পাওয়া যায়।]
8. In Section 4 (Creative Answer Structure), list points numbered 1, 2, 3, 4 each on its own line:
   1. **ভূমিকা ও সংজ্ঞা:** [পয়েন্ট]
   2. **মূল মেকানিজম ও কার্যপদ্ধতি:** [পয়েন্ট]
   3. **বাস্তব প্রয়োগ ও সুবিধা:** [পয়েন্ট]
   4. **উপসংহার:** [পয়েন্ট]
9. In Section 6 (Common Pitfalls & Tips), give clear, concrete advice on mistakes students make and what examiners look for.

EXACT 6 HEADINGS TO USE VERBATIM:
### 💡 ১. মূল ধারণা ও সারমর্ম (Core Summary)

### 🔑 ২. আবশ্যকীয় ইংরেজি ও পারিভাষিক শব্দ (Key Technical Terminology)

### 📝 ৩. ২ নম্বরের অনুধাবনমূলক প্রশ্ন ও শতভাগ আদর্শ উত্তর (2-Mark Model Answer)

### 📊 ৪. সৃজনশীল উত্তরের পয়েন্টভিত্তিক কাঠামো (Broad Answer - 5/10 Marks)

### 🌍 ৫. বাস্তব জীবনের উদাহরণ (Real-World Case Study)

### ⚠️ ৬. সাধারণ ভুল ও পরীক্ষকের সতর্কতা (Common Pitfalls & Tips)
`;

  const userQuery = customPrompt && customPrompt.trim()
    ? `The student has requested a specific modification or follow-up for the subtopic "${subtopic.title}":
"${customPrompt.trim()}"

Please adapt the explanation to fulfill this request thoroughly, and append a dedicated 7th section:

### 💬 ৭. আপনার অনুরোধ অনুযায়ী বিশেষ বিশ্লেষণ
**আপনার প্রশ্ন/অনুরোধ:** "${customPrompt.trim()}"

[Your detailed, academically precise response fulfilling the student's request.]`
    : `Generate the complete, strictly formatted 6-section NCTB board exam guide for the subtopic "${subtopic.title}". Remember: follow all spacing and heading rules strictly.`;

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const requestBody = {
      system_instruction: {
        parts: [{ text: systemInstruction }]
      },
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemInstruction}\n\n${userQuery}` }]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 1800,
        topP: 0.85
      }
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.warn("Gemini API call failed, falling back to smart engine:", errData);
      return {
        text: generateOfflineExplanation(subtopic, subject, unitTitle, customPrompt) +
          `\n\n*(নোট: লাইভ এআই এপিআই রেসপন্স দেয়নি: ${errData.error?.message || response.statusText}; অফলাইন জ্ঞানভাণ্ডার থেকে প্রস্তুত করা হয়েছে)*`,
        source: "fallback-smart-engine"
      };
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error("No candidate text returned by Gemini");
    }

    return {
      text: candidateText,
      source: "gemini-live-api"
    };
  } catch (error) {
    console.error("Error connecting to Gemini API:", error);
    return {
      text: generateOfflineExplanation(subtopic, subject, unitTitle, customPrompt) +
        `\n\n*(নেটওয়ার্ক সংযোগ বিঘ্নিত হওয়ায় অফলাইন জ্ঞানভাণ্ডার থেকে স্বয়ংক্রিয়ভাবে লোড করা হয়েছে)*`,
      source: "fallback-smart-engine"
    };
  }
}

