"use client";
import React, { useState } from 'react';
import Button from '../ui/Button';

function encodeHtml(input) {
  if (typeof document === 'undefined') return input;
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

function decodeHtml(input) {
  if (typeof document === 'undefined') return input;
  const div = document.createElement('div');
  div.innerHTML = input;
  return div.textContent || '';
}

const HtmlEncoderTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');

  const handleProcess = () => {
    if (mode === 'encode') setOutput(encodeHtml(input));
    else setOutput(decodeHtml(input));
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleCopy = async () => {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); } catch {}
  };

  const handleSwap = () => {
    if (!output) return;
    setInput(output);
    setOutput('');
    setMode(prev => (prev === 'encode' ? 'decode' : 'encode'));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">HTML Encoder / Decoder</h1>
            <p className="text-gray-600">Convert between plain text and HTML entities to safely display content on the web.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSwap} disabled={!output}>Swap</Button>
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="flex bg-gray-100 rounded-lg p-1 w-full">
          <button
            className={`flex-1 px-4 py-2 text-sm rounded-md ${mode === 'encode' ? 'bg-white shadow text-gray-900' : 'text-gray-600'}`}
            onClick={() => setMode('encode')}
          >
            Encode
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm rounded-md ${mode === 'decode' ? 'bg-white shadow text-gray-900' : 'text-gray-600'}`}
            onClick={() => setMode('decode')}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
          {mode === 'encode' ? 'Text to encode' : 'HTML to decode'}
        </label>
        <textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? '<script>alert("xss")</script>' : '&lt;div&gt;Hello &amp; welcome!&lt;/div&gt;'}
          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 resize-y text-gray-900 placeholder-gray-500"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <Button onClick={handleProcess} disabled={!input.trim()}>{mode === 'encode' ? 'Encode' : 'Decode'}</Button>
        <Button variant="secondary" onClick={handleClear}>Clear</Button>
        {output && <Button variant="outline" onClick={handleCopy}>Copy</Button>}
      </div>

      {output && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Result</label>
            <Button variant="outline" size="sm" onClick={handleCopy}>Copy to clipboard</Button>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <pre className="whitespace-pre-wrap break-all text-sm text-gray-800">{output}</pre>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">About HTML Entities</h3>
        <p className="text-sm text-blue-700">Encoding replaces special characters like &lt;, &gt;, &amp; with entities so browsers display them as text.</p>
      </div>
    </div>
  );
};

export default HtmlEncoderTool;


