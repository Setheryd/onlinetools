"use client";
import React, { useState } from 'react';
import Button from '../ui/Button';

function generateUuidV4() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 16; i += 1) bytes[i] = Math.floor(Math.random() * 256);
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const toHex = (n) => n.toString(16).padStart(2, '0');
  const parts = [
    Array.from(bytes.slice(0, 4)).map(toHex).join(''),
    Array.from(bytes.slice(4, 6)).map(toHex).join(''),
    Array.from(bytes.slice(6, 8)).map(toHex).join(''),
    Array.from(bytes.slice(8, 10)).map(toHex).join(''),
    Array.from(bytes.slice(10, 16)).map(toHex).join(''),
  ];
  return parts.join('-');
}

const UuidGeneratorTool = () => {
  const [uuids, setUuids] = useState([]);
  const [count, setCount] = useState(1);

  const handleGenerate = () => {
    const n = Math.min(Math.max(parseInt(count || '1', 10), 1), 100);
    const list = Array.from({ length: n }, () => generateUuidV4());
    setUuids(list);
  };

  const handleClear = () => {
    setUuids([]);
  };

  const handleCopyAll = async () => {
    if (uuids.length === 0) return;
    try {
      await navigator.clipboard.writeText(uuids.join('\n'));
    } catch {}
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">UUID Generator</h1>
            <p className="text-gray-600">Generate RFC 4122 version 4 UUIDs locally in your browser.</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-900 font-medium">Count:</label>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-24 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900"
            />
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <Button onClick={handleGenerate}>Generate</Button>
        <Button variant="secondary" onClick={handleClear}>Clear</Button>
        {uuids.length > 0 && (
          <Button variant="outline" onClick={handleCopyAll}>Copy all</Button>
        )}
      </div>

      {uuids.length > 0 && (
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <pre className="whitespace-pre-wrap break-all text-sm text-gray-800">{uuids.join('\n')}</pre>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">About UUID v4</h3>
        <p className="text-sm text-blue-700">
          UUID v4 values are randomly generated identifiers commonly used for database keys and request ids. Generation happens entirely in your browser.
        </p>
      </div>
    </div>
  );
};

export default UuidGeneratorTool;


