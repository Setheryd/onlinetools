"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

function toUnixSeconds(date) {
  return Math.floor(date.getTime() / 1000);
}

function fromUnixSeconds(sec) {
  const n = Number(sec);
  if (!Number.isFinite(n)) return null;
  return new Date(n * 1000);
}

const TimestampConverterTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('unix-to-date');
  const [error, setError] = useState('');

  const now = useMemo(() => new Date(), []);

  const handleNow = () => {
    if (mode === 'unix-to-date') {
      setInput(String(toUnixSeconds(new Date())));
    } else {
      setInput(new Date().toISOString());
    }
    setOutput('');
    setError('');
  };

  const handleProcess = () => {
    setError('');
    try {
      if (mode === 'unix-to-date') {
        const d = fromUnixSeconds(input.trim());
        if (!d || isNaN(d.getTime())) throw new Error('Invalid timestamp');
        setOutput(d.toISOString());
      } else {
        const d = new Date(input.trim());
        if (isNaN(d.getTime())) throw new Error('Invalid date/time');
        setOutput(String(toUnixSeconds(d)));
      }
    } catch (e) {
      setError(e.message || 'Invalid input');
      setOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch {}
  };

  const handleSwap = () => {
    setMode(prev => (prev === 'unix-to-date' ? 'date-to-unix' : 'unix-to-date'));
    setInput(output || '');
    setOutput('');
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Timestamp Converter</h1>
            <p className="text-gray-600">Convert between Unix timestamps (seconds) and human-readable dates.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSwap} disabled={!input && !output}>Swap</Button>
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="flex bg-gray-100 rounded-lg p-1 w-full">
          <button
            className={`flex-1 px-4 py-2 text-sm rounded-md ${mode === 'unix-to-date' ? 'bg-white shadow text-gray-900' : 'text-gray-600'}`}
            onClick={() => setMode('unix-to-date')}
          >
            Unix → Date
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm rounded-md ${mode === 'date-to-unix' ? 'bg-white shadow text-gray-900' : 'text-gray-600'}`}
            onClick={() => setMode('date-to-unix')}
          >
            Date → Unix
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
          {mode === 'unix-to-date' ? 'Unix timestamp (in seconds)' : 'Date/time (ISO, e.g. 2024-01-01T00:00:00Z)'}
        </label>
        <textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'unix-to-date' ? '1704067200' : now.toISOString()}
          className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 resize-y text-gray-900 placeholder-gray-500"
        />
        <div className="mt-2">
          <Button variant="outline" size="sm" onClick={handleNow}>Use current {mode === 'unix-to-date' ? 'timestamp' : 'datetime'}</Button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <Button onClick={handleProcess} disabled={!input.trim()}>Convert</Button>
        <Button variant="secondary" onClick={handleClear}>Clear</Button>
        {output && (
          <Button variant="outline" onClick={handleCopy}>Copy</Button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

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
        <h3 className="text-sm font-semibold text-blue-800 mb-2">About Unix Time</h3>
        <p className="text-sm text-blue-700">
          Unix time counts seconds since 1970-01-01T00:00:00Z. This tool uses seconds (not milliseconds) for conversion.
          All processing happens in your browser.
        </p>
      </div>
    </div>
  );
};

export default TimestampConverterTool;


