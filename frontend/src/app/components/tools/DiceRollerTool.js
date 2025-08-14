"use client";
import React, { useMemo, useState } from 'react';

function rollDie(sides) {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const x = new Uint32Array(1);
    window.crypto.getRandomValues(x);
    return (x[0] % sides) + 1;
  }
  return Math.floor(Math.random() * sides) + 1;
}

const DiceRollerTool = () => {
  const [numDice, setNumDice] = useState(2);
  const [sides, setSides] = useState(6);
  const [results, setResults] = useState([]);

  const total = useMemo(() => results.reduce((a,b)=>a+b,0), [results]);

  const roll = () => {
    const n = Math.max(1, Math.min(50, Number(numDice)));
    const s = Math.max(2, Math.min(1000, Number(sides)));
    const out = Array.from({ length: n }, () => rollDie(s));
    setResults(out);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Dice Roller</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Number of dice</label>
          <input type="number" min="1" max="50" value={numDice} onChange={(e)=>setNumDice(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Sides</label>
          <select value={sides} onChange={(e)=>setSides(Number(e.target.value))} className="w-full px-3 py-2 border rounded text-sm">
            {[4,6,8,10,12,20,100].map(n => (<option key={n} value={n}>d{n}</option>))}
          </select>
        </div>
        <div>
          <button onClick={roll} className="px-4 py-2 text-sm bg-blue-600 text-white rounded">Roll</button>
        </div>
      </div>
      {results.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 border rounded">
          <div className="text-sm text-gray-600">Results</div>
          <div className="text-lg font-semibold text-gray-900">{results.join(', ')}</div>
          <div className="text-sm text-gray-700 mt-1">Total: {total}</div>
        </div>
      )}
    </div>
  );
};

export default DiceRollerTool;


