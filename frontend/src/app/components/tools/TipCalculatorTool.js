"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

const TipCalculatorTool = () => {
  const [bill, setBill] = useState('86.40');
  const [tipPct, setTipPct] = useState('18');
  const [split, setSplit] = useState('2');
  const [round, setRound] = useState('none'); // none | total | perPerson

  const computed = useMemo(() => {
    const b = Number(bill) || 0;
    const t = (Number(tipPct) || 0) / 100;
    const s = Math.max(1, Math.floor(Number(split) || 1));
    const tip = b * t;
    let total = b + tip;
    let perPerson = total / s;
    if (round === 'total') {
      total = Math.round(total);
      perPerson = total / s;
    } else if (round === 'perPerson') {
      perPerson = Math.round(perPerson);
      total = perPerson * s;
    }
    return { tip, total, perPerson, split: s };
  }, [bill, tipPct, split, round]);

  const number = (v) => Number(v).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tip Calculator</h1>
        <p className="text-gray-600">Calculate tip amounts, split the bill, and optionally round totals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bill amount</label>
          <input type="number" step="0.01" value={bill} onChange={(e) => setBill(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tip %</label>
          <input type="number" step="1" value={tipPct} onChange={(e) => setTipPct(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Split</label>
          <input type="number" min="1" step="1" value={split} onChange={(e) => setSplit(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rounding</label>
          <select value={round} onChange={(e) => setRound(e.target.value)} className="w-full px-3 py-2 border rounded text-sm bg-white text-gray-800">
            <option value="none">No rounding</option>
            <option value="total">Round total</option>
            <option value="perPerson">Round per person</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-50 border rounded">
          <div className="text-sm text-gray-600">Tip</div>
          <div className="text-xl font-semibold text-gray-900">${number(computed.tip)}</div>
        </div>
        <div className="p-4 bg-gray-50 border rounded">
          <div className="text-sm text-gray-600">Total</div>
          <div className="text-xl font-semibold text-gray-900">${number(computed.total)}</div>
        </div>
        <div className="p-4 bg-gray-50 border rounded">
          <div className="text-sm text-gray-600">Per person ({computed.split})</div>
          <div className="text-xl font-semibold text-gray-900">${number(computed.perPerson)}</div>
        </div>
      </div>

      <div className="flex gap-2">
        {[10, 12, 15, 18, 20, 22, 25].map((p) => (
          <Button key={p} variant="outline" size="sm" onClick={() => setTipPct(String(p))}>{p}%</Button>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Tips</h3>
        <p className="text-sm text-blue-700">Use rounding to simplify payments when splitting bills.</p>
      </div>
    </div>
  );
};

export default TipCalculatorTool;


