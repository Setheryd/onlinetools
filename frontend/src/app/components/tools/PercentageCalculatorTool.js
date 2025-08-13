"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

function calcPercentageOf(value, percent) { return (value * percent) / 100; }
function calcWhatPercentOf(part, whole) { return whole === 0 ? NaN : (part / whole) * 100; }
function calcPercentageChange(oldVal, newVal) { return oldVal === 0 ? NaN : ((newVal - oldVal) / Math.abs(oldVal)) * 100; }

const PercentageCalculatorTool = () => {
  const [precision, setPrecision] = useState(2);
  // 1) X% of Y
  const [percent1, setPercent1] = useState('');
  const [value1, setValue1] = useState('');
  const result1 = useMemo(() => {
    if (percent1 === '' || value1 === '' || isNaN(Number(percent1)) || isNaN(Number(value1))) return '';
    const r = calcPercentageOf(Number(value1), Number(percent1));
    return Number.isFinite(r) ? r.toFixed(precision) : '';
  }, [percent1, value1, precision]);

  // 2) X is what % of Y
  const [part2, setPart2] = useState('');
  const [whole2, setWhole2] = useState('');
  const result2 = useMemo(() => {
    if (part2 === '' || whole2 === '' || isNaN(Number(part2)) || isNaN(Number(whole2))) return '';
    const r = calcWhatPercentOf(Number(part2), Number(whole2));
    return Number.isFinite(r) ? r.toFixed(precision) + '%' : '';
  }, [part2, whole2, precision]);

  // 3) Percentage change from X to Y
  const [old3, setOld3] = useState('');
  const [new3, setNew3] = useState('');
  const result3 = useMemo(() => {
    if (old3 === '' || new3 === '' || isNaN(Number(old3)) || isNaN(Number(new3))) return '';
    const r = calcPercentageChange(Number(old3), Number(new3));
    return Number.isFinite(r) ? r.toFixed(precision) + '%' : '';
  }, [old3, new3, precision]);

  const clearAll = () => { setPercent1(''); setValue1(''); setPart2(''); setWhole2(''); setOld3(''); setNew3(''); };

  const loadExamples = () => {
    setPercent1('15'); setValue1('200'); // 15% of 200 = 30
    setPart2('50'); setWhole2('200');   // 50 is 25% of 200
    setOld3('80'); setNew3('100');      // 25% increase
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Percentage Calculator</h1>
            <p className="text-gray-600">Calculate X% of Y, what percent X is of Y, and percentage change.</p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">Precision:</label>
            <select value={precision} onChange={(e) => setPrecision(Number(e.target.value))} className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-800">
              {[0,1,2,3,4].map(p => <option key={p} value={p}>{p} decimals</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <Button variant="outline" onClick={loadExamples}>Load Examples</Button>
      </div>

      {/* X% of Y */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">X% of Y</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">X (%)</label>
            <input type="number" value={percent1} onChange={(e) => setPercent1(e.target.value)} placeholder="e.g. 15" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Y (value)</label>
            <input type="number" value={value1} onChange={(e) => setValue1(e.target.value)} placeholder="e.g. 200" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Result</label>
            <input type="text" value={result1} readOnly className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-gray-50 text-gray-900" />
          </div>
        </div>
      </div>

      {/* X is what % of Y */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">X is what % of Y</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">X (part)</label>
            <input type="number" value={part2} onChange={(e) => setPart2(e.target.value)} placeholder="e.g. 50" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Y (whole)</label>
            <input type="number" value={whole2} onChange={(e) => setWhole2(e.target.value)} placeholder="e.g. 200" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Result</label>
            <input type="text" value={result2} readOnly className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-gray-50 text-gray-900" />
          </div>
        </div>
      </div>

      {/* Percentage Change */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Percentage Change</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Old value</label>
            <input type="number" value={old3} onChange={(e) => setOld3(e.target.value)} placeholder="e.g. 80" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New value</label>
            <input type="number" value={new3} onChange={(e) => setNew3(e.target.value)} placeholder="e.g. 100" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Result</label>
            <input type="text" value={result3} readOnly className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-gray-50 text-gray-900" />
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <Button variant="outline" onClick={clearAll}>Clear All</Button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">About Percentage Calculations</h3>
        <p className="text-sm text-blue-700">This calculator performs common percentage operations and runs entirely in your browser.</p>
      </div>
    </div>
  );
};

export default PercentageCalculatorTool;


