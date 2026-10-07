import React, { useState } from 'react';
import { DIFFERENCE_TABLES } from '../data/differenceData';

export default function DifferenceTablesView({ onChime }) {
  const [selectedId, setSelectedId] = useState(DIFFERENCE_TABLES[0].id);

  const selectedTable = DIFFERENCE_TABLES.find(t => t.id === selectedId) || DIFFERENCE_TABLES[0];

  const handleSelect = (id) => {
    setSelectedId(id);
    if (onChime) onChime('click');
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--rose-700)', background: 'var(--rose-100)', padding: '3px 12px', borderRadius: 'var(--radius-full)' }}>
          ⚖️ তুলনামূলক পার্থক্য ছক জেনারেটর (Distinction Matrix)
        </span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-ink)', margin: '6px 0 2px' }}>
          নির্বাচিত ICT ও Economics তুলনামূলক ছক
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          এই পরিশিষ্টে বর্তমানে ICT ও Economics-এর তুলনামূলক ছক রয়েছে; অন্য কোর্সের জন্য এটি প্রযোজ্য নয়।
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        {DIFFERENCE_TABLES.map(t => (
          <button
            key={t.id}
            className={`btn btn-sm ${t.id === selectedId ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleSelect(t.id)}
          >
            {t.title}
          </button>
        ))}
      </div>

      <div className="diff-table-container">
        <table className="diff-table">
          <thead>
            <tr>
              <th style={{ width: '25%' }}>পার্থক্যকারী বিষয় / ভিত্তি</th>
              <th style={{ width: '37.5%', color: 'var(--rose-900)' }}>{selectedTable.itemA}</th>
              <th style={{ width: '37.5%', color: 'var(--rose-800)' }}>{selectedTable.itemB}</th>
            </tr>
          </thead>
          <tbody>
            {selectedTable.rows.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700, color: 'var(--text-ink)', background: 'var(--book-bg)' }}>{r.feature}</td>
                <td>{r.a}</td>
                <td>{r.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
