"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

function minifyJs(input) {
  let s = input;
  // remove /* */ comments (naive)
  s = s.replace(/\/\*[\s\S]*?\*\//g, '');
  // remove // comments (naive, per line)
  s = s.replace(/(^|\n)\s*\/\/.*(?=\n|$)/g, '$1');
  // collapse whitespace
  s = s.replace(/\s+/g, ' ');
  // remove spaces around punctuation
  s = s.replace(/\s*([{}();,:+\-*/%<>=&|^!?\[\]])\s*/g, '$1');
  return s.trim();
}

const JsMinifierTool = () => {
  const [input, setInput] = useState('// Paste JS here\nfunction add(a, b) {\n  return a + b; // sum\n}\n');
  const output = useMemo(() => minifyJs(input || ''), [input]);
  const copy = async () => { try { await navigator.clipboard.writeText(output); } catch {} };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">JavaScript Minifier</h1>
      <p className="text-gray-600 mb-4">Minify JavaScript by stripping comments and whitespace. Note: naive minifier; avoid on complex builds.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-700 mb-2">Input JS</label>
          <textarea value={input} onChange={(e)=>setInput(e.target.value)} className="w-full h-80 px-3 py-2 border rounded text-sm font-mono" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm text-gray-700">Minified JS</label>
            <div className="text-xs text-gray-500">{(input||'').length.toLocaleString()} → {output.length.toLocaleString()} chars</div>
          </div>
          <textarea readOnly value={output} className="w-full h-80 px-3 py-2 border rounded text-sm font-mono bg-gray-50" />
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={copy} disabled={!output}>Copy</Button>
        <Button variant="secondary" onClick={()=>setInput('')}>Clear</Button>
      </div>
    </div>
  );
};

export default JsMinifierTool;


