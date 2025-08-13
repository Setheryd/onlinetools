"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

const RADICES = Array.from({ length: 35 }, (_, i) => i + 2); // 2..36

function isValidForBase(str, base) {
  const digits = '0123456789abcdefghijklmnopqrstuvwxyz'.slice(0, base);
  const pattern = new RegExp(`^[+-]?[${digits}]+$`, 'i');
  return pattern.test(str.trim());
}

function convertBase(value, fromBase, toBase) {
  const n = parseInt(value, fromBase);
  if (!Number.isFinite(n)) return null;
  return n.toString(toBase);
}

const NumberBaseConverterTool = () => {
  const [input, setInput] = useState('');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(16);
  const [error, setError] = useState('');

  const output = useMemo(() => {
    if (!input.trim()) return '';
    if (!isValidForBase(input, fromBase)) {
      setError('Input is not valid for the selected base.');
      return '';
    }
    setError('');
    const res = convertBase(input.toLowerCase(), fromBase, toBase);
    return res == null ? '' : res;
  }, [input, fromBase, toBase]);

  const handleSwap = () => {
    setFromBase(toBase);
    setToBase(fromBase);
    if (output) setInput(output);
  };

  const handleCopy = async () => {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); } catch {}
  };

  const handleClear = () => {
    setInput('');
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Number Base Converter</h1>
            <p className="text-gray-600">Convert integers between bases 2 and 36 (binary, octal, decimal, hexadecimal).</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSwap} disabled={!input.trim()}>Swap</Button>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Examples</label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setInput('255'); setFromBase(10); setToBase(16); }}
          >
            255 (dec) → hex
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setInput('ff'); setFromBase(16); setToBase(2); }}
          >
            ff (hex) → bin
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setInput('101010'); setFromBase(2); setToBase(10); }}
          >
            101010 (bin) → dec
          </Button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Input</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 255"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Base</label>
          <select
            value={fromBase}
            onChange={(e) => setFromBase(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
          >
            {RADICES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">To Base</label>
          <select
            value={toBase}
            onChange={(e) => setToBase(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
          >
            {RADICES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {output && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Output</label>
            <Button variant="outline" size="sm" onClick={handleCopy}>Copy</Button>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <pre className="whitespace-pre-wrap break-all text-sm text-gray-800">{output}</pre>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Note</h3>
        <p className="text-sm text-blue-700">This tool converts integers. Fractions are not supported.</p>
      </div>
    </div>
  );
};

export default NumberBaseConverterTool;


