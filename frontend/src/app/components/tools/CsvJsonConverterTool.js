"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

function parseCSV(text, delimiter = ',') {
  const rows = [];
  let row = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === delimiter) {
        row.push(current);
        current = '';
      } else if (char === '\n') {
        row.push(current);
        rows.push(row);
        row = [];
        current = '';
      } else if (char === '\r') {
        // ignore
      } else {
        current += char;
      }
    }
  }
  // Push last cell/row
  row.push(current);
  if (row.length > 1 || row[0] !== '') rows.push(row);

  if (rows.length === 0) return [];
  const headers = rows[0];
  const dataRows = rows.slice(1);
  return dataRows.map((r) => {
    const obj = {};
    headers.forEach((h, idx) => {
      const key = String(h ?? '').trim();
      obj[key || `col_${idx + 1}`] = r[idx] ?? '';
    });
    return obj;
  });
}

function jsonToCSV(jsonArray, delimiter = ',') {
  const rows = Array.isArray(jsonArray) ? jsonArray : [];
  const headerSet = new Set();
  rows.forEach((item) => Object.keys(item || {}).forEach((k) => headerSet.add(k)));
  const headers = Array.from(headerSet);

  const escapeCell = (val) => {
    const s = val == null ? '' : String(val);
    const needsQuotes = s.includes('"') || s.includes('\n') || s.includes('\r') || s.includes(delimiter);
    const escaped = s.replace(/"/g, '""');
    return needsQuotes ? `"${escaped}"` : escaped;
  };

  const lines = [headers.join(delimiter)];
  rows.forEach((row) => {
    const line = headers.map((h) => escapeCell(row?.[h])).join(delimiter);
    lines.push(line);
  });
  return lines.join('\n');
}

const CsvJsonConverterTool = () => {
  const [mode, setMode] = useState('csv-to-json'); // 'csv-to-json' | 'json-to-csv'
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [delimiter, setDelimiter] = useState(',');

  const output = useMemo(() => {
    if (!input.trim()) { setError(''); return ''; }
    try {
      if (mode === 'csv-to-json') {
        const parsed = parseCSV(input, delimiter);
        setError('');
        return JSON.stringify(parsed, null, 2);
      } else {
        const data = JSON.parse(input);
        const csv = jsonToCSV(data, delimiter);
        setError('');
        return csv;
      }
    } catch (e) {
      setError(e.message || 'Conversion error');
      return '';
    }
  }, [mode, input, delimiter]);

  const handleCopy = async () => { if (output) { try { await navigator.clipboard.writeText(output); } catch {} } };
  const handleSwap = () => { if (output) { setInput(output); setMode(mode === 'csv-to-json' ? 'json-to-csv' : 'csv-to-json'); } };
  const clearAll = () => { setInput(''); setError(''); };

  const loadCsvExample = () => {
    const ex = 'name,age,city\nAlice,30,New York\nBob,25,Los Angeles';
    setMode('csv-to-json');
    setInput(ex);
    setError('');
  };
  const loadJsonExample = () => {
    const ex = [
      { name: 'Alice', age: 30, city: 'New York' },
      { name: 'Bob', age: 25, city: 'Los Angeles' }
    ];
    setMode('json-to-csv');
    setInput(JSON.stringify(ex, null, 2));
    setError('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">CSV ⇄ JSON Converter</h1>
            <p className="text-gray-600">Convert between CSV and JSON in your browser. Handles quoted fields and commas.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSwap} disabled={!output}>Swap</Button>
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-3 items-center">
        <div className="inline-flex rounded-md border border-gray-200 overflow-hidden">
          <button
            className={`px-3 py-2 text-sm ${mode === 'csv-to-json' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setMode('csv-to-json')}
          >CSV → JSON</button>
          <button
            className={`px-3 py-2 text-sm border-l border-gray-200 ${mode === 'json-to-csv' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setMode('json-to-csv')}
          >JSON → CSV</button>
        </div>

        <div className="flex items-center gap-2 ml-0 md:ml-2">
          <label className="text-sm text-gray-700">Delimiter</label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-800"
          >
            <option value="," disabled={false}>, (comma)</option>
            <option value=";">; (semicolon)</option>
            <option value="\t">Tab</option>
            <option value="|">| (pipe)</option>
          </select>
        </div>
      </div>

      {/* Examples */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Examples</label>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={loadCsvExample}>CSV sample</Button>
          <Button variant="outline" size="sm" onClick={loadJsonExample}>JSON sample</Button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">{mode === 'csv-to-json' ? 'Input CSV' : 'Input JSON'}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'csv-to-json' ? 'Paste CSV here...' : 'Paste JSON array (e.g., [{"name":"Alice"}, ...])'}
          className={`w-full h-48 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 resize-y text-gray-900 placeholder-gray-500 font-mono text-sm ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
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
        <Button onClick={() => { /* computed live */ }} disabled>Convert</Button>
        <Button variant="outline" onClick={clearAll}>Clear All</Button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">About CSV and JSON</h3>
        <p className="text-sm text-blue-700">CSV is a plain text format with delimited fields, while JSON is a structured data format. This tool converts between them entirely in your browser.</p>
      </div>
    </div>
  );
};

export default CsvJsonConverterTool;


