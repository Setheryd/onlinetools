"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

const UNITS = [
  { id: 'kg', name: 'Kilograms (kg)', toKg: 1 },
  { id: 'g', name: 'Grams (g)', toKg: 0.001 },
  { id: 'mg', name: 'Milligrams (mg)', toKg: 0.000001 },
  { id: 'lb', name: 'Pounds (lb)', toKg: 0.45359237 },
  { id: 'oz', name: 'Ounces (oz)', toKg: 0.028349523125 },
  { id: 'ton', name: 'Metric Tons (t)', toKg: 1000 },
];

function convertWeight(value, fromId, toId) {
  const from = UNITS.find(u => u.id === fromId);
  const to = UNITS.find(u => u.id === toId);
  if (!from || !to) return NaN;
  const kg = value * from.toKg;
  return kg / to.toKg;
}

const WeightConverterTool = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kg');
  const [toUnit, setToUnit] = useState('lb');
  const [precision, setPrecision] = useState(4);

  const output = useMemo(() => {
    if (value === '' || isNaN(Number(value))) return '';
    const res = convertWeight(Number(value), fromUnit, toUnit);
    return Number.isFinite(res) ? res.toFixed(precision) : '';
  }, [value, fromUnit, toUnit, precision]);

  const handleSwap = () => { const f = fromUnit; setFromUnit(toUnit); setToUnit(f); };
  const handleCopy = async () => { if (!output) return; try { await navigator.clipboard.writeText(output); } catch {} };
  const clearAll = () => { setValue(''); };
  const loadExample = (v, f, t) => { setValue(String(v)); setFromUnit(f); setToUnit(t); };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Weight Converter</h1>
            <p className="text-gray-600">Convert between kilograms, grams, pounds, ounces, and metric tons.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSwap}>Swap</Button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Examples</label>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => loadExample(1, 'kg', 'lb')}>1 kg → lb</Button>
          <Button variant="outline" size="sm" onClick={() => loadExample(16, 'oz', 'lb')}>16 oz → lb</Button>
          <Button variant="outline" size="sm" onClick={() => loadExample(2.5, 'lb', 'kg')}>2.5 lb → kg</Button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="e.g. 2.5" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900">
            {UNITS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900">
            {UNITS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <label className="text-sm text-gray-700">Precision:</label>
        <select value={precision} onChange={(e) => setPrecision(Number(e.target.value))} className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-800">
          {[0,1,2,3,4,5,6].map(p => <option key={p} value={p}>{p} decimals</option>)}
        </select>
      </div>

      {output !== '' && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Result</label>
            <Button variant="outline" size="sm" onClick={handleCopy}>Copy</Button>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <pre className="whitespace-pre-wrap break-all text-sm text-gray-800">{output}</pre>
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-3">
        <Button onClick={() => {}} disabled>Convert</Button>
        <Button variant="outline" onClick={clearAll}>Clear</Button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">About Weight Conversion</h3>
        <p className="text-sm text-blue-700">Uses exact conversion factors (e.g., 1 lb = 0.45359237 kg) and computes entirely in your browser.</p>
      </div>
    </div>
  );
};

export default WeightConverterTool;


