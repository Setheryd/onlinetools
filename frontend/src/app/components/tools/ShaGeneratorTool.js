'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';

const ALGOS = [
  { id: 'SHA-1', name: 'SHA-1' },
  { id: 'SHA-256', name: 'SHA-256' },
  { id: 'SHA-384', name: 'SHA-384' },
  { id: 'SHA-512', name: 'SHA-512' },
];

async function hashText(algorithm, text, encoding = 'hex') {
  const enc = new TextEncoder();
  const data = enc.encode(text);
  const buf = await crypto.subtle.digest(algorithm, data);
  const arr = new Uint8Array(buf);
  if (encoding === 'hex') {
    return Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  return btoa(String.fromCharCode(...arr));
}

const ShaGeneratorTool = () => {
  const [input, setInput] = useState('');
  const [algo, setAlgo] = useState('SHA-256');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const run = async () => {
    setError('');
    setOutput('');
    if (!input.trim()) return;
    setLoading(true);
    try {
      const hash = await hashText(algo, input);
      setOutput(hash);
    } catch (e) {
      setError(e?.message || 'Hashing failed.');
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch (_) {}
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">SHA Hash Generator</h1>
      <p className="text-gray-600 mb-6">
        Generate SHA-1, SHA-256, SHA-384, or SHA-512 hashes from text. Uses the Web Crypto API in your browser—nothing is sent to a server.
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Algorithm</label>
        <select
          value={algo}
          onChange={(e) => setAlgo(e.target.value)}
          className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md text-gray-900"
        >
          {ALGOS.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Input text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md text-sm font-mono text-gray-900"
          spellCheck={false}
        />
      </div>

      <div className="mb-4">
        <Button onClick={run} disabled={!input.trim() || loading}>
          {loading ? 'Hashing…' : 'Generate hash'}
        </Button>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">{error}</div>}

      {output && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Hash ({algo})</label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={output}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-mono bg-gray-50 text-gray-900"
            />
            <Button variant="outline" onClick={copy}>Copy</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShaGeneratorTool;
