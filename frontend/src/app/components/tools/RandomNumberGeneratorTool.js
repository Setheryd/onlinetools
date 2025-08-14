"use client";
import React, { useMemo, useState } from 'react';

function secureRandomInt(min, max) {
  const low = Math.ceil(min);
  const high = Math.floor(max);
  if (high < low) return null;
  const range = high - low + 1;
  if (range <= 0) return null;
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const maxUint32 = 0xFFFFFFFF;
    const bucketSize = Math.floor((maxUint32 + 1) / range) * range;
    let x = new Uint32Array(1);
    do { window.crypto.getRandomValues(x); } while (x[0] >= bucketSize);
    return low + (x[0] % range);
  }
  return low + Math.floor(Math.random() * range);
}

const RandomNumberGeneratorTool = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(false);
  const [results, setResults] = useState([]);

  const disabled = useMemo(() => unique && (max - min + 1) < count, [min, max, count, unique]);

  const generate = () => {
    const a = Number(min), b = Number(max), c = Number(count);
    if (!isFinite(a) || !isFinite(b) || !isFinite(c)) return;
    const lo = Math.min(a,b), hi = Math.max(a,b);
    if (unique) {
      const pool = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
      for (let i = pool.length - 1; i > 0; i--) {
        const j = secureRandomInt(0, i);
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      setResults(pool.slice(0, c));
    } else {
      const out = [];
      for (let i = 0; i < c; i++) out.push(secureRandomInt(lo, hi));
      setResults(out);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Random Number Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Min</label>
          <input type="number" value={min} onChange={(e)=>setMin(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Max</label>
          <input type="number" value={max} onChange={(e)=>setMax(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Count</label>
          <input type="number" min="1" value={count} onChange={(e)=>setCount(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        <div className="flex items-center gap-2">
          <input id="unique" type="checkbox" checked={unique} onChange={(e)=>setUnique(e.target.checked)} />
          <label htmlFor="unique" className="text-sm text-gray-700">Unique</label>
        </div>
      </div>
      {disabled && <div className="mt-2 text-sm text-red-600">Not enough unique numbers in range.</div>}
      <button onClick={generate} disabled={disabled} className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded disabled:opacity-40">Generate</button>

      {results.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 border rounded">
          <div className="text-sm text-gray-600">Results</div>
          <div className="text-lg font-semibold text-gray-900 break-words">{results.join(', ')}</div>
        </div>
      )}
    </div>
  );
};

export default RandomNumberGeneratorTool;


