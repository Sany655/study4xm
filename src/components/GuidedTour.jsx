import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Sparkles, 
  Check, 
  Compass, 
  BookOpen, 
  Layers, 
  Lightbulb,
  Moon
} from 'lucide-react';

const TOUR_STEPS = [
  {
    targetId: 'tour-cover-btn',
    pageTarget: 1,
    title: 'বইয়ের প্রচ্ছদ ও কোর্স নির্বাচন',
    subtitle: 'মূল ড্যাশবোর্ড ও সামগ্রিক অগ্রগতি',
    icon: BookOpen,
    description: 'যেকোনো অধ্যায় পড়ার সময়ে এই "Cover" বোতামে ক্লিক করে সরাসরি বইয়ের মূল প্রচ্ছদে ফিরে আসতে পারবেন। এখান থেকে নির্বাচিত কোর্সের অগ্রগতি দেখুন।',
    placement: 'bottom-left'
  },
  {
    targetId: 'tour-toc-btn',
    title: 'ইন্টারেক্টিভ সূচিপত্র',
    subtitle: 'নির্বাচিত কোর্সের অধ্যায়ে দ্রুত যান',
    icon: Layers,
    description: '"সূচিপত্র" বাটনে চাপ দিলে নির্বাচিত কোর্সের অধ্যায় ও পাঠের তালিকা খুলবে।',
    placement: 'bottom-left'
  },
  {
    targetId: 'tour-course-switcher',
    title: 'কোর্স ও শিক্ষাবর্ষ নির্বাচন',
    subtitle: 'সক্রিয় কোর্স দেখুন, রোডম্যাপ থেকে আলাদা করে চিনুন',
    icon: Compass,
    description: 'কোর্স সিলেক্টর থেকে সক্রিয় প্রথম বর্ষের কোর্স বদলান। পরের শিক্ষাবর্ষগুলো এখনো রোডম্যাপ।',
    placement: 'bottom-left'
  },
  {
    targetId: 'tour-bottom-nav',
    title: 'সহজ পৃষ্ঠা পরিবর্তন ও ড্র্যাগ সোয়াইপ',
    subtitle: 'ডিজিটাল বইয়ের সত্যিকারের অনুভূতি',
    icon: Sparkles,
    description: 'পৃষ্ঠা পরিবর্তন করতে ৩টি সুবিধাজনক উপায় রয়েছে:\n১. নিচের "পূর্ববর্তী" ও "পরবর্তী" বোতাম চাপুন।\n২. কিবোর্ডের বাঁ ও ডান তীর (← →) কি ব্যবহার করুন।\n৩. মোবাইল বা ট্যাবলেটে আঙুল দিয়ে সত্যিকারের বইয়ের মতো সোয়াইপ করুন।',
    placement: 'top-center'
  },
  {
    targetId: null, // Centered overview step
    pageTarget: 3,
    title: 'পাঠ, অনুশীলন ও রিভিশন',
    subtitle: 'কোর্সভেদে উপলভ্য শেখার উপকরণ',
    icon: Lightbulb,
    description: 'কোর্সের পাঠে ধারণা, পরিভাষা, উদাহরণ, লিখিত উত্তরের অনুশীলন ও কুইজ থাকতে পারে। উপকরণ কোর্স ও অধ্যায়ভেদে আলাদা।',
    placement: 'center'
  },
  {
    targetId: 'tour-header-controls',
    title: 'বুকমার্ক, অডিও ও চোখের আরাম',
    subtitle: 'ব্যক্তিগত পাঠাভ্যাস ও ডার্ক মোড',
    icon: Moon,
    description: 'পড়ার সময় গুরুত্বপূর্ণ পাতা বুকমার্ক করে রাখুন, উচ্চৈঃস্বরে পড়ে শোনানোর জন্য অডিও চালু করুন এবং রাতে চোখের আরামের জন্য ডার্ক মোডে পরিবর্তন করুন। আপনার সব অগ্রগতি স্বয়ংক্রিয়ভাবে ব্রাউজারে সংরক্ষিত থাকে।',
    placement: 'bottom-right'
  }
];

export default function GuidedTour({
  isOpen,
  onClose,
  onNavigateToPage,
  currentPage
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const stepObj = TOUR_STEPS[currentStep];

  // Calculate coordinates of current target
  const updateRect = () => {
    if (!stepObj || !stepObj.targetId) {
      setTargetRect(null);
      return;
    }
    const el = document.getElementById(stepObj.targetId);
    if (el) {
      const rect = el.getBoundingClientRect();
      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        bottom: rect.bottom,
        right: rect.right
      });
    } else {
      setTargetRect(null);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    // Navigate to expected page if step requires it
    if (stepObj?.pageTarget && stepObj.pageTarget !== currentPage && onNavigateToPage) {
      onNavigateToPage(stepObj.pageTarget);
    }

    const timer = setTimeout(() => {
      if (stepObj?.targetId) {
        const el = document.getElementById(stepObj.targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
      updateRect();
    }, 220);

    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [isOpen, currentStep, currentPage]);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        handleFinish();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, currentStep]);

  if (!isOpen || !stepObj) return null;

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setIsAnimating(true);
      setCurrentStep(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 200);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setCurrentStep(prev => prev - 1);
      setTimeout(() => setIsAnimating(false), 200);
    }
  };

  const handleFinish = () => {
    try {
      localStorage.setItem('study4xm_tour_completed', 'true');
    } catch {
      // ignore
    }
    setCurrentStep(0);
    onClose();
  };

  const StepIcon = stepObj.icon || Sparkles;

  // Tooltip positioning
  let tooltipStyle = {};
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  if (isMobile) {
    tooltipStyle = {
      position: 'fixed',
      left: '12px',
      right: '12px',
      bottom: '20px',
      maxWidth: 'calc(100vw - 24px)',
      zIndex: 10002
    };
  } else if (targetRect && stepObj.placement !== 'center') {
    const margin = 14;
    const cardWidth = 380;
    
    if (stepObj.placement === 'bottom-left') {
      tooltipStyle = {
        position: 'fixed',
        top: Math.min(window.innerHeight - 340, targetRect.bottom + margin),
        left: Math.max(16, Math.min(window.innerWidth - cardWidth - 20, targetRect.left)),
        width: `${cardWidth}px`,
        zIndex: 10002
      };
    } else if (stepObj.placement === 'bottom-right') {
      tooltipStyle = {
        position: 'fixed',
        top: Math.min(window.innerHeight - 340, targetRect.bottom + margin),
        left: Math.max(16, targetRect.right - cardWidth),
        width: `${cardWidth}px`,
        zIndex: 10002
      };
    } else if (stepObj.placement === 'top-center') {
      tooltipStyle = {
        position: 'fixed',
        bottom: Math.min(window.innerHeight - 50, window.innerHeight - targetRect.top + margin),
        left: Math.max(16, targetRect.left + (targetRect.width / 2) - (cardWidth / 2)),
        width: `${cardWidth}px`,
        zIndex: 10002
      };
    }
  } else {
    // Default center placement
    tooltipStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'min(92vw, 440px)',
      zIndex: 10002
    };
  }

  // Padding around target cut-out
  const pad = 6;
  const cutX = targetRect ? targetRect.left - pad : 0;
  const cutY = targetRect ? targetRect.top - pad : 0;
  const cutW = targetRect ? targetRect.width + (pad * 2) : 0;
  const cutH = targetRect ? targetRect.height + (pad * 2) : 0;

  return (
    <div className="guided-tour-root">
      {/* SVG Mask Backdrop: Guarantees the spotlighted element is 100% UNMASKED and CRYSTAL CLEAR */}
      <svg 
        className="tour-svg-mask-overlay" 
        onClick={handleFinish}
        aria-hidden="true"
      >
        <defs>
          <mask id="tour-spotlight-cutout">
            {/* White covers the entire viewport (renders dark overlay) */}
            <rect x="0" y="0" width="100%" height="100%" fill="#ffffff" />
            {/* Black cuts out the target element completely (100% transparent hole) */}
            {targetRect && (
              <rect
                x={cutX}
                y={cutY}
                width={cutW}
                height={cutH}
                rx="10"
                ry="10"
                fill="#000000"
              />
            )}
          </mask>
        </defs>

        {/* Shaded backdrop with cut-out mask */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(10, 3, 6, 0.72)"
          mask="url(#tour-spotlight-cutout)"
        />
      </svg>

      {/* Target Spotlight Glowing Ring (Border & Pulse ONLY, no darkening) */}
      {targetRect && (
        <div 
          className="tour-spotlight-ring"
          style={{
            position: 'fixed',
            top: cutY,
            left: cutX,
            width: cutW,
            height: cutH,
            borderRadius: '10px',
            pointerEvents: 'none',
            zIndex: 10001
          }}
        />
      )}

      {/* Tour Dialog Card */}
      <div 
        className={`tour-card ${isAnimating ? 'animating' : ''}`}
        style={tooltipStyle}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={stepObj.title}
      >
        {/* Header */}
        <div className="tour-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="tour-step-icon">
              <StepIcon size={16} color="#fff" />
            </div>
            <div>
              <span className="tour-step-badge">ধাপ {currentStep + 1} / {TOUR_STEPS.length}</span>
              <span className="tour-step-sub">{stepObj.subtitle}</span>
            </div>
          </div>

          <button 
            className="tour-close-btn" 
            onClick={handleFinish}
            title="ট্যুর বন্ধ করুন (Esc)"
            aria-label="Close Tour"
          >
            <X size={18} />
          </button>
        </div>

        {/* Title & Body */}
        <div className="tour-card-body">
          <h3 className="tour-title">{stepObj.title}</h3>
          <p className="tour-description">{stepObj.description}</p>
        </div>

        {/* Footer */}
        <div className="tour-card-footer">
          {/* Progress dots */}
          <div className="tour-dots">
            {TOUR_STEPS.map((_, idx) => (
              <span 
                key={idx} 
                className={`tour-dot ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}
                onClick={() => setCurrentStep(idx)}
                title={`ধাপ ${idx + 1}-এ যান`}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div className="tour-actions">
            <button 
              className="btn btn-secondary btn-sm tour-skip-btn"
              onClick={handleFinish}
              title="ট্যুর শেষ না করে সরাসরি পড়ুন"
            >
              বাদ দিন
            </button>

            {currentStep > 0 && (
              <button 
                className="btn btn-secondary btn-sm"
                onClick={handlePrev}
                style={{ padding: '6px 12px', fontSize: '0.82rem' }}
              >
                <ChevronLeft size={14} />
                <span>পূর্ববর্তী</span>
              </button>
            )}

            <button 
              className="btn btn-primary btn-sm"
              onClick={handleNext}
              style={{ padding: '6px 16px', fontSize: '0.82rem' }}
            >
              {currentStep < TOUR_STEPS.length - 1 ? (
                <>
                  <span>পরবর্তী</span>
                  <ChevronRight size={14} />
                </>
              ) : (
                <>
                  <Check size={14} />
                  <span>পড়া শুরু করুন</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
