import { ICT_SYLLABUS } from './ictData';
import { ECONOMICS_SYLLABUS } from './economicsData';

export const BOOK_PAGES = [];

// Page 1: Cover
BOOK_PAGES.push({
  pageNumber: 1,
  type: 'cover',
  volume: 'প্রচ্ছদ',
  title: 'পরীক্ষা প্রস্তুতি: আইসিটি ও অর্থনীতি',
  subtitle: 'জাতীয় শিক্ষাক্রম অনুযায়ী ১০০/১০০ প্রস্তুতির পূর্ণাঙ্গ ডিজিটাল পাঠ্যবই',
  section: 'প্রচ্ছদ'
});

// Page 2: Table of Contents
BOOK_PAGES.push({
  pageNumber: 2,
  type: 'toc',
  volume: 'সূচিপত্র',
  title: 'বিষয়ের সূচিপত্র',
  subtitle: 'খণ্ড ১: তথ্য ও যোগাযোগ প্রযুক্তি এবং খণ্ড ২: অর্থনীতি',
  section: 'সূচিপত্র'
});

// ICT Pages
let pageCounter = 3;
ICT_SYLLABUS.forEach(unit => {
  unit.topics.forEach(topic => {
    BOOK_PAGES.push({
      pageNumber: pageCounter++,
      type: 'chapter',
      subject: 'ICT',
      unitId: unit.unitId,
      volume: '১ম খণ্ড: তথ্য ও যোগাযোগ প্রযুক্তি',
      chapterTitle: unit.unitTitle,
      topic: topic,
      priority: topic.priority || unit.priority,
      section: `ইউনিট ${unit.unitId}`
    });
  });
});

// Economics Pages
ECONOMICS_SYLLABUS.forEach(topic => {
  topic.concepts.forEach(concept => {
    BOOK_PAGES.push({
      pageNumber: pageCounter++,
      type: 'chapter',
      subject: 'Economics',
      topicId: topic.topicId,
      volume: '২য় খণ্ড: অর্থনীতি ১ম ও ২য় পত্র',
      chapterTitle: topic.title,
      topic: concept,
      priority: concept.priority || topic.priority,
      section: `টপিক ${topic.topicId}`
    });
  });
});

// Appendix Pages
BOOK_PAGES.push({
  pageNumber: pageCounter++,
  type: 'differences',
  volume: 'পরিশিষ্ট ক',
  title: 'বোর্ড পরীক্ষার ১৭টি গুরুত্বপূর্ণ পার্থক্য ছক',
  subtitle: 'আইসিটি ও অর্থনীতির সকল তুলনামূলক মেট্রিক্স',
  section: 'পার্থক্য ছক'
});

BOOK_PAGES.push({
  pageNumber: pageCounter++,
  type: 'flashcards',
  volume: 'পরিশিষ্ট খ',
  title: 'স্পেসড রেপিটিশন ফ্ল্যাশকার্ড বক্স',
  subtitle: 'স্মৃতিশক্তি যাচাই ও দ্রুত রিভিশনের স্পর্শযোগ্য কার্ড',
  section: 'ফ্ল্যাশকার্ড'
});

BOOK_PAGES.push({
  pageNumber: pageCounter++,
  type: 'writing',
  volume: 'পরিশিষ্ট গ',
  title: 'সৃজনশীল ও টেকনিক্যাল রাইটিং ডেস্ক',
  subtitle: 'বোর্ড উত্তরের কী-ওয়ার্ড ট্র্যাকার ও স্বয়ংক্রিয় মূল্যায়ন',
  section: 'রাইটিং ডেস্ক'
});

BOOK_PAGES.push({
  pageNumber: pageCounter++,
  type: 'exam',
  volume: 'পরিশিষ্ট ঘ',
  title: 'টাইমারযুক্ত পূর্ণাঙ্গ বোর্ড পরীক্ষা হল',
  subtitle: 'মডেল টেস্ট ও ১০০/১০০ পূর্ণাঙ্গ প্রস্তুতি সূচক',
  section: 'পরীক্ষা হল'
});

BOOK_PAGES.push({
  pageNumber: pageCounter++,
  type: 'notebook',
  volume: 'পরিশিষ্ট ঙ',
  title: 'ভুল সংশোধনী ও রিভিশন নোটবুক',
  subtitle: 'ভুল উত্তর বিশ্লেষণ ও পরীক্ষার পূর্ববর্তী প্রস্তুতি খাতা',
  section: 'নোটবুক'
});

export const TOTAL_BOOK_PAGES = BOOK_PAGES.length;
