import React, { useState, useEffect, useRef } from 'react';

export default function SupplyDemandCanvas() {
  const canvasRef = useRef(null);
  const [demandShift, setDemandShift] = useState(0);
  const [supplyShift, setSupplyShift] = useState(0);
  const [equilibrium, setEquilibrium] = useState({ price: 50, quantity: 50 });

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Grid & Axes
    ctx.strokeStyle = "rgba(225, 29, 72, 0.15)";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(50, 20);
    ctx.lineTo(50, h - 40);
    ctx.lineTo(w - 20, h - 40);
    ctx.stroke();

    ctx.fillStyle = "#6b434e";
    ctx.font = "bold 12px Outfit, sans-serif";
    ctx.fillText("Price (P)", 10, 30);
    ctx.fillText("Quantity (Q)", w - 75, h - 15);

    // Demand Curve (Downward sloping)
    const dX1 = 70 + demandShift * 1.5;
    const dY1 = 40;
    const dX2 = w - 70 + demandShift * 1.5;
    const dY2 = h - 60;

    ctx.strokeStyle = "#e11d48";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(dX1, dY1);
    ctx.lineTo(dX2, dY2);
    ctx.stroke();

    ctx.fillStyle = "#e11d48";
    ctx.fillText("Demand (D)", dX2 - 40, dY2 - 8);

    // Supply Curve (Upward sloping)
    const sX1 = 70 + supplyShift * 1.5;
    const sY1 = h - 60;
    const sX2 = w - 70 + supplyShift * 1.5;
    const sY2 = 40;

    ctx.strokeStyle = "#059669";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(sX1, sY1);
    ctx.lineTo(sX2, sY2);
    ctx.stroke();

    ctx.fillStyle = "#059669";
    ctx.fillText("Supply (S)", sX2 - 30, sY2 - 8);

    // Intersection
    const mD = (dY2 - dY1) / (dX2 - dX1);
    const mS = (sY2 - sY1) / (sX2 - sX1);

    const eqX = (sY1 - dY1 + mD * dX1 - mS * sX1) / (mD - mS);
    const eqY = dY1 + mD * (eqX - dX1);

    if (eqX >= 50 && eqX <= w - 20 && eqY >= 20 && eqY <= h - 40) {
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "#9c737d";
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(eqX, eqY);
      ctx.lineTo(50, eqY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(eqX, eqY);
      ctx.lineTo(eqX, h - 40);
      ctx.stroke();

      ctx.setLineDash([]);

      ctx.fillStyle = "#be123c";
      ctx.beginPath();
      ctx.arc(eqX, eqY, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#3b111e";
      ctx.font = "bold 13px Outfit, sans-serif";
      ctx.fillText("E*", eqX + 8, eqY - 8);

      const calcP = Math.round((((h - 40) - eqY) / (h - 60)) * 100);
      const calcQ = Math.round(((eqX - 50) / (w - 70)) * 100);
      setEquilibrium({ price: calcP, quantity: calcQ });
    }
  };

  useEffect(() => {
    drawChart();
  }, [demandShift, supplyShift]);

  return (
    <div className="glass-panel" style={{ padding: '24px', margin: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            📈 Interactive Supply & Demand Equilibrium Simulator
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Drag sliders to simulate curve shifts and inspect the updated market equilibrium price (P*) and quantity (Q*).
          </p>
        </div>
        <span style={{ fontSize: '0.75rem', background: 'var(--rose-100)', color: 'var(--rose-800)', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
          Topic 2 Tool
        </span>
      </div>

      <div style={{ maxWidth: '600px', height: '300px', margin: '0 auto 20px', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', position: 'relative' }}>
        <canvas ref={canvasRef} width={560} height={300} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700 }}>
            <span>Demand Shift (D):</span>
            <span style={{ color: 'var(--rose-600)' }}>{demandShift > 0 ? `+${demandShift}` : demandShift}</span>
          </div>
          <input 
            type="range" 
            min="-40" 
            max="40" 
            value={demandShift} 
            onChange={(e) => setDemandShift(parseInt(e.target.value))}
            style={{ accentColor: 'var(--rose-600)' }}
          />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Left: Tastes decline | Right: Income increases</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700 }}>
            <span>Supply Shift (S):</span>
            <span style={{ color: 'var(--rose-600)' }}>{supplyShift > 0 ? `+${supplyShift}` : supplyShift}</span>
          </div>
          <input 
            type="range" 
            min="-40" 
            max="40" 
            value={supplyShift} 
            onChange={(e) => setSupplyShift(parseInt(e.target.value))}
            style={{ accentColor: 'var(--rose-600)' }}
          />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Left: Input costs surge | Right: Technology improves</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ background: 'var(--rose-100)', color: 'var(--rose-900)', padding: '8px 16px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.9rem' }}>
          Equilibrium Price (P*): ${equilibrium.price}.00 &nbsp;|&nbsp; Quantity (Q*): {equilibrium.quantity} Units
        </div>
        <button 
          className="btn btn-secondary btn-sm" 
          onClick={() => { setDemandShift(0); setSupplyShift(0); }}
        >
          Reset Sliders
        </button>
      </div>
    </div>
  );
}
