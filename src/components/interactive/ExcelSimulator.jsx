import React, { useState } from 'react';

export default function ExcelSimulator({ onChime }) {
  const [data, setData] = useState({
    A1: 45, B1: 80,
    A2: 60, B2: 95,
    A3: 35, B3: 70,
    A4: 90, B4: 85
  });
  const [formula, setFormula] = useState('=SUM(A1:B4)');
  const [result, setResult] = useState('560');
  const [itemCount, setItemCount] = useState(8);

  const getValuesInRange = (start, end, currentData) => {
    const col1 = start[0], row1 = parseInt(start[1]);
    const col2 = end[0], row2 = parseInt(end[1]);
    const cols = (col1 === col2) ? [col1] : ["A", "B"];
    const minRow = Math.min(row1, row2);
    const maxRow = Math.max(row1, row2);

    const vals = [];
    cols.forEach(c => {
      for (let r = minRow; r <= maxRow; r++) {
        const key = `${c}${r}`;
        if (currentData[key] !== undefined) {
          vals.push(currentData[key]);
        }
      }
    });
    return vals;
  };

  const evaluateFormula = (inputFormula, currentData = data) => {
    const clean = inputFormula.trim().toUpperCase();
    if (!clean.startsWith('=')) {
      setResult(`Text: "${inputFormula}" (Requires = to compute)`);
      return;
    }

    const match = clean.match(/^=(SUM|AVERAGE|MAX|MIN|COUNT)\((A[1-4]|B[1-4]):(A[1-4]|B[1-4])\)$/);
    if (!match) {
      setResult('Error: Invalid Syntax. Use =SUM(A1:B4)');
      if (onChime) onChime('warn');
      return;
    }

    const [, func, startCell, endCell] = match;
    const values = getValuesInRange(startCell, endCell, currentData);

    let res = 0;
    switch (func) {
      case 'SUM':
        res = values.reduce((a, b) => a + b, 0);
        break;
      case 'AVERAGE':
        res = values.length ? Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 100) / 100 : 0;
        break;
      case 'MAX':
        res = Math.max(...values);
        break;
      case 'MIN':
        res = Math.min(...values);
        break;
      case 'COUNT':
        res = values.length;
        break;
      default:
        res = 0;
    }

    setResult(String(res));
    setItemCount(values.length);
    if (onChime) onChime('success');
  };

  const handleCellChange = (cell, val) => {
    const num = parseFloat(val) || 0;
    const updated = { ...data, [cell]: num };
    setData(updated);
    evaluateFormula(formula, updated);
  };

  const setQuickFormula = (fx) => {
    setFormula(fx);
    evaluateFormula(fx);
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', margin: '20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            📊 Live Spreadsheet Formula Runner
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Edit cell numbers and test Excel calculations in real-time
          </p>
        </div>
        <span style={{ fontSize: '0.75rem', background: 'var(--rose-100)', color: 'var(--rose-800)', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
          Unit 4 Tool
        </span>
      </div>

      {/* Formula Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', background: 'var(--bg-main)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
        <span style={{ fontWeight: 800, fontStyle: 'italic', color: 'var(--rose-700)' }}>fx</span>
        <input 
          type="text" 
          value={formula} 
          onChange={(e) => setFormula(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && evaluateFormula(formula)}
          style={{ flex: 1, border: 'none', background: 'transparent', fontFamily: 'monospace', fontSize: '1rem', color: 'var(--text-primary)', outline: 'none' }}
        />
        <button className="btn btn-primary btn-sm" onClick={() => evaluateFormula(formula)}>
          Calculate
        </button>
      </div>

      {/* Grid */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', marginBottom: '14px' }}>
        <thead>
          <tr>
            <th style={{ width: '50px', background: 'var(--rose-100)', padding: '8px', border: '1px solid var(--border-subtle)' }}>#</th>
            <th style={{ background: 'var(--rose-100)', padding: '8px', border: '1px solid var(--border-subtle)' }}>A</th>
            <th style={{ background: 'var(--rose-100)', padding: '8px', border: '1px solid var(--border-subtle)' }}>B</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map(row => (
            <tr key={row}>
              <th style={{ background: 'var(--rose-100)', padding: '8px', border: '1px solid var(--border-subtle)' }}>{row}</th>
              {['A', 'B'].map(col => {
                const cellKey = `${col}${row}`;
                return (
                  <td key={cellKey} style={{ border: '1px solid var(--border-subtle)', padding: '4px' }}>
                    <input 
                      type="number" 
                      value={data[cellKey]}
                      onChange={(e) => handleCellChange(cellKey, e.target.value)}
                      style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center', fontFamily: 'inherit', color: 'var(--text-primary)', outline: 'none', padding: '6px' }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Quick Buttons & Result */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setQuickFormula('=SUM(A1:B4)')}>=SUM()</button>
          <button className="btn btn-secondary btn-sm" onClick={() => setQuickFormula('=AVERAGE(A1:B4)')}>=AVERAGE()</button>
          <button className="btn btn-secondary btn-sm" onClick={() => setQuickFormula('=MAX(A1:B4)')}>=MAX()</button>
          <button className="btn btn-secondary btn-sm" onClick={() => setQuickFormula('=MIN(A1:B4)')}>=MIN()</button>
          <button className="btn btn-secondary btn-sm" onClick={() => setQuickFormula('=COUNT(A1:B4)')}>=COUNT()</button>
        </div>

        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--rose-700)', background: 'var(--rose-100)', padding: '6px 14px', borderRadius: 'var(--radius-sm)' }}>
          Result: <strong>{result}</strong> <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>({itemCount} cells)</span>
        </div>
      </div>
    </div>
  );
}
