import React from 'react';
import { BookMarked, ExternalLink } from 'lucide-react';

/**
 * ReferenceBooksBadge - Displays prescribed academic reference textbooks
 * Based on syllabus requirements (Mankiw, Case & Fair, Lambert & Frye, Russell & Norvig, etc.)
 */
export default function ReferenceBooksBadge({ references }) {
  if (!references || references.length === 0) return null;

  return (
    <div className="reference-books-card">
      <div className="ref-header">
        <span className="ref-badge">
          <BookMarked size={14} /> সিলেবাস নির্দেশিত প্রামাণ্য গ্রন্থ ও রেফারেন্স (Reference Books)
        </span>
      </div>
      <div className="ref-list">
        {references.map((ref, idx) => (
          <div key={idx} className="ref-item">
            <div className="ref-item-bullet">📖</div>
            <div className="ref-item-details">
              <span className="ref-author-title">
                <strong>{ref.author}</strong> ({ref.year}). <em>{ref.title}</em> {ref.edition ? `(${ref.edition})` : ''}. {ref.publisher}.
              </span>
              {ref.relevantChapters && (
                <span className="ref-chapters">
                  🎯 প্রাসঙ্গিক অধ্যায়: {ref.relevantChapters}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
