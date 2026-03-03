'use client';

import React, { useState, useCallback } from 'react';
import Button from '../ui/Button';

const KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'IN', 'ON', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER',
  'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'AS', 'DISTINCT', 'INSERT', 'INTO', 'VALUES',
  'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP', 'INDEX', 'PRIMARY', 'KEY',
  'FOREIGN', 'REFERENCES', 'UNIQUE', 'NULL', 'DEFAULT', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX',
  'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'BETWEEN', 'LIKE', 'IS', 'EXISTS', 'UNION', 'ALL',
];

const NEWLINE_BEFORE = ['FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING', 'SET', 'VALUES', 'LIMIT', 'OFFSET'];

function formatSql(input, indentSize) {
  const ind = ' '.repeat(Number(indentSize) || 2);
  let s = input.replace(/\r\n/g, '\n').replace(/\s+/g, ' ').trim();
  if (!s) return '';

  KEYWORDS.forEach((kw) => {
    const re = new RegExp(`\\b${kw.replace(/\s/g, '\\s')}\\b`, 'gi');
    s = s.replace(re, kw);
  });

  let depth = 0;
  let out = '';
  const parts = s.split(/(\s+)/);
  for (let i = 0; i < parts.length; i++) {
    const token = parts[i];
    if (/^\s+$/.test(token)) continue;
    const upper = token.toUpperCase();
    if (NEWLINE_BEFORE.includes(upper) && out.trimEnd()) {
      out += '\n' + ind.repeat(depth);
    } else if (out.trimEnd() && !out.trimEnd().endsWith('(') && !out.trimEnd().endsWith(',')) {
      out += ' ';
    }
    if (token === '(') depth++;
    if (token === ')') depth = Math.max(0, depth - 1);
    out += token;
  }
  return out.trim();
}

const SqlFormatterTool = () => {
  const [input, setInput] = useState('SELECT id,name FROM users WHERE active=1 ORDER BY name;');
  const [output, setOutput] = useState('');
  const [indentSize, setIndentSize] = useState(2);
  const [error, setError] = useState('');

  const format = useCallback(() => {
    setError('');
    const result = formatSql(input.trim(), indentSize);
    setOutput(result || input.trim());
  }, [input, indentSize]);

  const copy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch (_) {}
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">SQL Formatter</h1>
      <p className="text-gray-600 mb-6">
        Format SQL queries with consistent indentation and uppercase keywords. Client-side only.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <label className="block text-sm font-medium text-gray-700">SQL</label>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              Indent:
              <input
                type="number"
                min={1}
                max={8}
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value) || 2)}
                className="w-14 px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </label>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="SELECT * FROM users WHERE id=1;"
            className="w-full h-80 px-3 py-2 border border-gray-300 rounded-md text-sm font-mono text-gray-900"
            spellCheck={false}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Formatted</label>
          <textarea
            readOnly
            value={output}
            placeholder="Click Format to see result"
            className="w-full h-80 px-3 py-2 border border-gray-300 rounded-md text-sm font-mono bg-gray-50 text-gray-900"
            spellCheck={false}
          />
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">{error}</div>}

      <div className="flex flex-wrap gap-2">
        <Button onClick={format} disabled={!input.trim()}>Format SQL</Button>
        <Button variant="outline" onClick={copy} disabled={!output}>Copy</Button>
        <Button variant="outline" onClick={() => { setInput(''); setOutput(''); }}>Clear</Button>
      </div>
    </div>
  );
};

export default SqlFormatterTool;
