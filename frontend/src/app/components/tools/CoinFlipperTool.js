"use client";
import React, { useMemo, useState } from 'react';

const CoinFlipperTool = () => {
  const [history, setHistory] = useState([]);
  const [spinning, setSpinning] = useState(false);

  const flip = () => {
    setSpinning(true);
    setTimeout(() => {
      const val = Math.random() < 0.5 ? 'Heads' : 'Tails';
      setHistory(h => [val, ...h].slice(0, 20));
      setSpinning(false);
    }, 300);
  };

  const counts = useMemo(() => ({
    Heads: history.filter(v => v === 'Heads').length,
    Tails: history.filter(v => v === 'Tails').length,
  }), [history]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Coin Flipper</h1>
      <button onClick={flip} className="px-4 py-2 text-sm bg-blue-600 text-white rounded">Flip</button>
      <div className="mt-4 p-4 bg-gray-50 border rounded">
        <div className="text-sm text-gray-600">Result</div>
        <div className="text-2xl font-semibold text-gray-900 h-8">{spinning ? '…' : (history[0] || '—')}</div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 border rounded">
          <div className="text-sm text-gray-600">Heads</div>
          <div className="text-xl font-semibold text-gray-900">{counts.Heads}</div>
        </div>
        <div className="p-4 bg-gray-50 border rounded">
          <div className="text-sm text-gray-600">Tails</div>
          <div className="text-xl font-semibold text-gray-900">{counts.Tails}</div>
        </div>
      </div>
      {history.length > 0 && (
        <div className="mt-6">
          <div className="text-sm text-gray-700 mb-2">History</div>
          <div className="text-sm text-gray-800">{history.join(' · ')}</div>
        </div>
      )}
    </div>
  );
};

export default CoinFlipperTool;


