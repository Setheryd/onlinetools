"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

function toHex(text, group = true) {
  const bytes = new TextEncoder().encode(text);
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0'));
  return group ? hex.join(' ') : hex.join('');
}

function sanitizeHex(str) {
  return str.replace(/[^0-9a-fA-F]/g, '');
}

function isValidHex(str) {
  const clean = sanitizeHex(str);
  return clean.length % 2 === 0 && /^[0-9a-fA-F]*$/.test(clean);
}

function fromHex(hexString) {
  const clean = sanitizeHex(hexString);
  if (clean.length === 0) return '';
  if (clean.length % 2 !== 0) return null;
  const bytes = new Uint8Array(clean.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
  try {
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

const HexEncoderTool = () => {
  const [mode, setMode] = useState('encode'); // encode | decode
  const [input, setInput] = useState('');
  const [group, setGroup] = useState(true);
  const [error, setError] = useState('');

  const output = useMemo(() => {
    if (!input.trim()) { setError(''); return ''; }
    if (mode === 'encode') {
      setError('');
      return toHex(input, group);
    } else {
      if (!isValidHex(input)) {
        setError('Invalid hex input. Provide pairs of hexadecimal digits.');
        return '';
      }
      setError('');
      const text = fromHex(input);
      return text == null ? '' : text;
    }
  }, [mode, input, group]);

  const handleSwap = () => {
    if (!output) return;
    setInput(output);
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  const handleCopy = async () => {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); } catch {}
  };

  const loadExample = (example) => {
    if (mode === 'encode') setInput(example);
    else setInput(toHex(example));
  };

  const clearAll = () => { setInput(''); setError(''); };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hex Encoder/Decoder</h1>
            <p className="text-gray-600">Convert text to hexadecimal and back. Uses UTF-8 encoding.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSwap} disabled={!output}>Swap</Button>
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <div className="inline-flex rounded-md border border-gray-200 overflow-hidden">
          <button
            className={`px-3 py-2 text-sm ${mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setMode('encode')}
          >Text → Hex</button>
          <button
            className={`px-3 py-2 text-sm border-l border-gray-200 ${mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setMode('decode')}
          >Hex → Text</button>
        </div>

        {mode === 'encode' && (
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={group} onChange={(e) => setGroup(e.target.checked)} />
            Group bytes with spaces
          </label>
        )}
      </div>

      {/* Examples */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Examples</label>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => loadExample('Hello')}>
            Hello
          </Button>
          <Button variant="outline" size="sm" onClick={() => loadExample('The quick brown fox')}>
            The quick brown fox
          </Button>
          <Button variant="outline" size="sm" onClick={() => loadExample('😀 Emoji')}>
            😀 Emoji
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">{mode === 'encode' ? 'Input Text' : 'Input Hex'}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter text to convert to hex...' : 'Enter hexadecimal (e.g., 48 65 6c 6c 6f)'}
          className={`w-full h-40 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 resize-y text-gray-900 placeholder-gray-500 font-mono text-sm ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
        />
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {output && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Output</label>
            <Button variant="outline" size="sm" onClick={handleCopy}>Copy</Button>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <pre className="whitespace-pre-wrap break-all text-sm text-gray-800 font-mono overflow-x-auto">{output}</pre>
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-3">
        <Button onClick={() => { /* no-op, computed live */ }} disabled>Convert</Button>
        <Button variant="outline" onClick={clearAll}>Clear All</Button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">About Hex Encoding</h3>
        <p className="text-sm text-blue-700">Hex encoding represents bytes as pairs of hexadecimal digits. This tool uses UTF-8 for text encoding and decoding, and runs entirely in your browser.</p>
      </div>
    </div>
  );
};

export default HexEncoderTool;


