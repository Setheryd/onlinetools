"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

function minifyCss(input) {
  let s = input;
  s = s.replace(/\/\*[\s\S]*?\*\//g, ''); // remove comments
  s = s.replace(/\s+/g, ' '); // collapse whitespace
  s = s.replace(/\s*([{}:;,>+~])\s*/g, '$1'); // remove space around tokens
  s = s.replace(/;}/g, '}'); // last semicolons
  return s.trim();
}

const CssMinifierTool = () => {
  const [input, setInput] = useState('/* Paste CSS here */\n.body {\n  color: #333;\n  margin: 0;\n}\n');
  const output = useMemo(() => minifyCss(input || ''), [input]);

  const copy = async () => { try { await navigator.clipboard.writeText(output); } catch {} };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">CSS Minifier</h1>
      <p className="text-gray-600 mb-4">Minify CSS by stripping comments and unnecessary whitespace.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-700 mb-2">Input CSS</label>
          <textarea value={input} onChange={(e)=>setInput(e.target.value)} className="w-full h-80 px-3 py-2 border rounded text-sm font-mono" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm text-gray-700">Minified CSS</label>
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

export default CssMinifierTool;


