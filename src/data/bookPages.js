import { ICT_SYLLABUS } from './ictData';
import { ECONOMICS_SYLLABUS } from './economicsData';
import { INTRO_SOCIOLOGY_SYLLABUS } from './introSociologyData';
import { HISTORY_BD_SYLLABUS } from './historyBdData';
import { SOCIOLOGY_MARRIAGE_SYLLABUS } from './sociologyMarriageData';
import { SOCIAL_HISTORY_SYLLABUS } from './socialHistoryData';
import { SOCIAL_PROBLEMS_SYLLABUS } from './socialProblemsData';
import { POLITICAL_SCIENCE_SYLLABUS } from './politicalScienceData';
import { getCourseConfig, getYearConfig } from './curriculumRegistry';

export const COURSE_SYLLABUS_MAP = {
  'intro-sociology': { syllabus: INTRO_SOCIOLOGY_SYLLABUS, name: 'প্রারম্ভিক সমাজবিজ্ঞান', code: '212003' },
  'social-history': { syllabus: SOCIAL_HISTORY_SYLLABUS, name: 'সামাজিক ইতিহাস ও বিশ্বসভ্যতা', code: '212005' },
  'sociology-marriage': { syllabus: SOCIOLOGY_MARRIAGE_SYLLABUS, name: 'বিবাহ ও পরিবারের সমাজতত্ত্ব', code: '212005' },
  'social-problems': { syllabus: SOCIAL_PROBLEMS_SYLLABUS, name: 'সামাজিক সমস্যা ও ইস্যু', code: '212007' },
  'history-bd': { syllabus: HISTORY_BD_SYLLABUS, name: 'বাংলাদেশের ইতিহাস: ভাষা, সংস্কৃতি ও পরিচয়', code: '211501' },
  'political-science': { syllabus: POLITICAL_SCIENCE_SYLLABUS, name: 'রাষ্ট্রবিজ্ঞান পরিচিতি', code: '211909' },
  'economics': { syllabus: ECONOMICS_SYLLABUS, name: 'প্রিন্সিপলস অব ইকোনমিক্স', code: '212209' },
  'ict': { syllabus: ICT_SYLLABUS, name: 'তথ্য ও যোগাযোগ প্রযুক্তি ও ল্যাব', code: '216601' }
};

export function generatePlaceholderSyllabus(courseMeta) {
  const totalChapters = courseMeta.totalChapters || 6;
  const chapters = courseMeta.chapters || Array.from({ length: totalChapters }).map((_, i) => ({
    id: i + 1,
    titleBn: `অধ্যায় ${i + 1}`,
    titleEn: `Chapter ${i + 1}`
  }));

  return chapters.map((chap, i) => ({
    unitId: i + 1,
    unitTitle: chap.titleBn || `অধ্যায় ${i + 1}`,
    priority: 5,
    topics: [
      {
        id: `${courseMeta.id}-c${i+1}-t1`,
        title: (chap.titleBn || `অধ্যায় ${i + 1}`) + " - প্রারম্ভিক আলোচনা",
        type: "theory",
        description: "এই অংশে মৌলিক ধারণা নিয়ে আলোচনা করা হয়েছে। বিস্তারিত কন্টেন্ট পরবর্তীতে যুক্ত করা হবে।",
        priority: 5
      },
      {
        id: `${courseMeta.id}-c${i+1}-t2`,
        title: (chap.titleBn || `অধ্যায় ${i + 1}`) + " - বিস্তারিত বিশ্লেষণ",
        type: "theory",
        description: "এই অংশে বিস্তারিত তাত্ত্বিক বিশ্লেষণ করা হয়েছে। বিস্তারিত কন্টেন্ট পরবর্তীতে যুক্ত করা হবে।",
        priority: 5
      }
    ]
  }));
}

export function buildBookPagesForCourse(courseId = 'intro-sociology', yearId = 1) {
  const pages = [];
  const courseMeta = getCourseConfig(yearId, courseId) || {
    id: courseId,
    titleBn: COURSE_SYLLABUS_MAP[courseId]?.name || 'পাঠ্যবই',
    titleEn: 'Digital Masterbook',
    paperCode: COURSE_SYLLABUS_MAP[courseId]?.code || '212003'
  };

  const yearMeta = getYearConfig(yearId);
  const syllabusData = COURSE_SYLLABUS_MAP[courseId]?.syllabus || generatePlaceholderSyllabus(courseMeta);

  // Page 1: Cover
  pages.push({
    pageNumber: 1,
    type: 'cover',
    volume: `${yearMeta.yearNumberBn}: ${courseMeta.titleBn}`,
    title: courseMeta.titleBn,
    titleEn: courseMeta.titleEn,
    paperCode: courseMeta.paperCode,
    subtitle: `জাতীয় বিশ্ববিদ্যালয় বিএসএস (অনার্স) সমাজবিজ্ঞান বিভাগ — ১০০/১০০ পূর্ণাঙ্গ ডিজিটাল মাস্টারবুক`,
    section: 'প্রচ্ছদ',
    courseId: courseId,
    yearId: yearId
  });

  // Page 2: Table of Contents
  pages.push({
    pageNumber: 2,
    type: 'toc',
    volume: 'সূচিপত্র',
    title: `${courseMeta.titleBn} — সূচিপত্র`,
    subtitle: `কোর্স কোড: ${courseMeta.paperCode} • পূর্ণমান: ১০০ • ক্রেডিট: ${courseMeta.credits || 4}`,
    section: 'সূচিপত্র',
    courseId: courseId,
    yearId: yearId
  });

  // Chapter & Lesson Pages
  let pageCounter = 3;

  if (courseId === 'economics') {
    // Economics uses topics with concepts
    syllabusData.forEach(topic => {
      const concepts = topic.concepts || [topic];
      concepts.forEach(concept => {
        pages.push({
          pageNumber: pageCounter++,
          type: 'chapter',
          subject: 'Economics',
          courseId: courseId,
          topicId: topic.topicId,
          parentUnit: topic,
          volume: courseMeta.titleBn,
          chapterTitle: topic.title,
          topic: concept,
          priority: concept.priority || topic.priority || 5,
          section: `টপিক ${topic.topicId}`
        });
      });
    });
  } else {
    // Standard courses use units/chapters with topics
    syllabusData.forEach(unit => {
      const topics = unit.topics || [];
      topics.forEach(topic => {
        pages.push({
          pageNumber: pageCounter++,
          type: 'chapter',
          subject: courseMeta.titleBn,
          courseId: courseId,
          unitId: unit.unitId,
          parentUnit: unit,
          volume: courseMeta.titleBn,
          chapterTitle: unit.unitTitle,
          topic: topic,
          priority: topic.priority || unit.priority || 5,
          section: `অধ্যায় ${unit.unitId}`
        });
      });
    });
  }

  // Appendix Pages
  pages.push({
    pageNumber: pageCounter++,
    type: 'differences',
    volume: 'পরিশিষ্ট ক',
    title: 'বোর্ড পরীক্ষার গুরুত্বপূর্ণ পার্থক্য ছক',
    subtitle: `${courseMeta.titleBn} বিষয়ের সকল তুলনামূলক মেট্রিক্স ও পার্থক্য`,
    section: 'পার্থক্য ছক',
    courseId: courseId
  });

  pages.push({
    pageNumber: pageCounter++,
    type: 'flashcards',
    volume: 'পরিশিষ্ট খ',
    title: 'স্পেসড রেপিটিশন ফ্ল্যাশকার্ড বক্স',
    subtitle: 'স্মৃতিশক্তি যাচাই ও দ্রুত রিভিশনের স্পর্শযোগ্য কার্ড',
    section: 'ফ্ল্যাশকার্ড',
    courseId: courseId
  });

  pages.push({
    pageNumber: pageCounter++,
    type: 'writing',
    volume: 'পরিশিষ্ট গ',
    title: 'সৃজনশীল ও টেকনিক্যাল রাইটিং ডেস্ক',
    subtitle: 'বোর্ড উত্তরের কী-ওয়ার্ড ট্র্যাকার ও স্বয়ংক্রিয় মূল্যায়ন',
    section: 'রাইটিং ডেস্ক',
    courseId: courseId
  });

  pages.push({
    pageNumber: pageCounter++,
    type: 'exam',
    volume: 'পরিশিষ্ট ঘ',
    title: 'টাইমারযুক্ত পূর্ণাঙ্গ বোর্ড পরীক্ষা হল',
    subtitle: 'মডেল টেস্ট ও ১০০/১০০ পূর্ণাঙ্গ প্রস্তুতি সূচক',
    section: 'পরীক্ষা হল',
    courseId: courseId
  });

  pages.push({
    pageNumber: pageCounter++,
    type: 'notebook',
    volume: 'পরিশিষ্ট ঙ',
    title: 'ভুল সংশোধনী ও রিভিশন নোটবুক',
    subtitle: 'ভুল উত্তর বিশ্লেষণ ও পরীক্ষার পূর্ববর্তী প্রস্তুতি খাতা',
    section: 'নোটবুক',
    courseId: courseId
  });

  pages.push({
    pageNumber: pageCounter++,
    type: 'refer',
    volume: 'পরিশিষ্ট চ',
    title: 'Refer & Earn',
    subtitle: 'প্রিমিয়াম বৈশিষ্ট্য আনলক করতে বন্ধুদের আমন্ত্রণ জানান',
    section: 'প্রিমিয়াম আনলক',
    courseId: courseId
  });

  return pages;
}

// Default export for initial render (1st Year - Introduction to Sociology)
export const BOOK_PAGES = buildBookPagesForCourse('intro-sociology', 1);
export const TOTAL_BOOK_PAGES = BOOK_PAGES.length;

