import React, { useState } from 'react';
import { 
  ACADEMIC_YEARS, 
  DEGREE_INFO, 
  getYearConfig 
} from '../data/curriculumRegistry';
import { 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  X, 
  Layers, 
  Clock, 
  Award,
  ChevronRight
} from 'lucide-react';

export default function YearCourseSelector({
  currentYear,
  currentCourse,
  onSelectCourse,
  onClose
}) {
  const [selectedYearId, setSelectedYearId] = useState(currentYear || 1);
  const activeYearData = getYearConfig(selectedYearId);

  const handleCourseClick = (course) => {
    if (course.status === 'upcoming') {
      return; // Not yet ingested, shows roadmap
    }
    onSelectCourse(selectedYearId, course.id);
    if (onClose) onClose();
  };

  return (
    <div className="year-selector-overlay" onClick={onClose}>
      <div className="year-selector-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="year-selector-header">
          <div className="header-badge-group">
            <div className="uni-tag">
              <GraduationCap size={16} />
              <span>{DEGREE_INFO.institutionBn}</span>
            </div>
            <div className="dept-tag">
              <span>{DEGREE_INFO.degreeNameBn} — {DEGREE_INFO.departmentBn}</span>
            </div>
          </div>
          <button 
            className="close-btn" 
            onClick={onClose}
            title="বন্ধ করুন"
          >
            <X size={20} />
          </button>
        </div>

        {/* Title */}
        <div className="year-selector-title-bar">
          <div>
            <h2 className="modal-heading">৪-বর্ষের পূর্ণাঙ্গ পাঠ্যক্রম ও কোর্স নির্বাচন</h2>
            <p className="modal-subheading">
              আপনার শিক্ষাবর্ষ ও পাঠ্য বিষয় নির্বাচন করুন। প্রতিটি কোর্সে রয়েছে সম্পূর্ণ সিলেবাস ও ১০০/১০০ প্রস্তুতি।
            </p>
          </div>
        </div>

        {/* 4 Academic Year Tabs */}
        <div className="year-tabs-container">
          {ACADEMIC_YEARS.map(year => {
            const isSelected = year.yearId === selectedYearId;
            const isCurrentActive = year.yearId === currentYear;
            return (
              <button
                key={year.yearId}
                className={`year-tab-btn ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedYearId(year.yearId)}
              >
                <div className="tab-top">
                  <span className="year-title-bn">{year.yearNumberBn}</span>
                  {year.status === 'active' ? (
                    <span className="status-chip active">সক্রিয় ({year.totalCourses} কোর্স)</span>
                  ) : (
                    <span className="status-chip roadmap">রোডম্যাপ</span>
                  )}
                </div>
                <div className="tab-bottom">
                  <span className="credits-text">{year.totalCredits} ক্রেডিট</span>
                  {isCurrentActive && <span className="current-dot" title="বর্তমান নির্বাচিত বর্ষ" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Description Banner for Selected Year */}
        <div className="selected-year-banner">
          <div className="banner-info">
            <Sparkles size={16} className="sparkle-icon" />
            <span><strong>{activeYearData.yearNumberBn} কারিকুলাম:</strong> {activeYearData.descriptionBn}</span>
          </div>
          <div className="banner-meta">
            <span>মোট কোর্স: <strong>{activeYearData.totalCourses}টি</strong></span>
            <span>•</span>
            <span>ক্রেডিট: <strong>{activeYearData.totalCredits}</strong></span>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {activeYearData.courses.map(course => {
            const isSelected = activeYearData.yearId === currentYear && course.id === currentCourse;
            const isReady = course.status === 'available' || course.status === 'mastered';

            return (
              <div 
                key={course.id}
                className={`course-card ${isSelected ? 'selected' : ''} ${!isReady ? 'upcoming' : ''}`}
                onClick={() => handleCourseClick(course)}
              >
                <div className="course-card-top">
                  <div className="code-pill">
                    {course.paperCode ? `কোড: ${course.paperCode}` : 'অ্যালাইড'}
                  </div>
                  {isReady ? (
                    <span className="ready-badge">
                      <CheckCircle2 size={12} />
                      {course.status === 'mastered' ? 'সম্পূর্ণ ও ল্যাব' : 'প্রস্তুত'}
                    </span>
                  ) : (
                    <span className="lock-badge">
                      <Lock size={12} />
                      সিলেবাস ভিউ
                    </span>
                  )}
                </div>

                <h3 className="course-title-bn">{course.titleBn}</h3>
                <h4 className="course-title-en">{course.titleEn}</h4>

                {course.author && (
                  <p className="course-author">মূল নির্দেশক: {course.author}</p>
                )}

                <div className="course-footer">
                  <div className="course-stats">
                    <span>{course.totalChapters}টি অধ্যায়</span>
                    {course.credits && <span>• {course.credits} ক্রেডিট</span>}
                  </div>
                  <button className={`btn-launch ${isSelected ? 'active-btn' : ''}`}>
                    {isSelected ? 'পড়ছেন' : isReady ? 'বই খুলুন' : 'রোডম্যাপ'}
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
