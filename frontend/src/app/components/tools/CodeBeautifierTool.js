'use client';

import React, { useState, useCallback } from 'react';
import Button from '../ui/Button';

const LANGUAGES = [
  { id: 'json', name: 'JSON', placeholder: '{"name": "value", "array": [1, 2, 3]}' },
  { id: 'javascript', name: 'JavaScript', placeholder: 'function example() { return { a: 1 }; }' },
  { id: 'html', name: 'HTML', placeholder: '<div><p>Hello</p></div>' },
  { id: 'css', name: 'CSS', placeholder: '.class { color: red; margin: 0; }' },
  { id: 'xml', name: 'XML', placeholder: '<root><item id="1">Text</item></root>' },
];

function beautifyJson(input, indent) {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, Number(indent) || 2);
}

function beautifyJs(input, indent) {
  const ind = ' '.repeat(Number(indent) || 2);
  let depth = 0;
  let out = '';
  const lines = input.replace(/\r\n/g, '\n').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const open = (trimmed.match(/{|\[/g) || []).length;
    const close = (trimmed.match(/}|]/g) || []).length;
    if (close > 0) depth = Math.max(0, depth - close);
    out += ind.repeat(depth) + trimmed + '\n';
    depth += open;
  }
  return out.trimEnd() || input;
}

function beautifyHtmlOrXml(input, indent) {
  const ind = ' '.repeat(Number(indent) || 2);
  const str = input.replace(/>\s*</g, '>\n<').replace(/\r\n/g, '\n');
  let depth = 0;
  let out = '';
  const lines = str.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const closeMatch = trimmed.match(/^<\s*\/\s*[\w-]+/);
    if (closeMatch) depth = Math.max(0, depth - 1);
    out += ind.repeat(depth) + trimmed + '\n';
    if (!closeMatch && trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>')) {
      depth++;
    }
  }
  return out.trimEnd() || input;
}

function beautifyCss(input, indent) {
  const ind = ' '.repeat(Number(indent) || 2);
  const str = input.replace(/\r\n/g, '\n').replace(/\s*{\s*/g, ' {\n  ').replace(/\s*}\s*/g, '\n}\n').replace(/;\s*/g, ';\n  ');
  let out = '';
  let inRule = false;
  const lines = str.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed === '}') {
      inRule = false;
      out += ind + trimmed + '\n';
    } else if (trimmed.endsWith('{')) {
      inRule = true;
      out += trimmed + '\n';
    } else {
      out += (inRule ? ind : '') + trimmed + '\n';
    }
  }
  return out.trimEnd() || input;
}

const CodeBeautifierTool = () => {
  const [language, setLanguage] = useState('json');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indentSize, setIndentSize] = useState(2);
  const [error, setError] = useState('');

  const beautify = useCallback(() => {
    setError('');
    const raw = input.trim();
    if (!raw) {
      setOutput('');
      return;
    }
    const indent = indentSize;
    try {
      if (language === 'json') {
        setOutput(beautifyJson(raw, indent));
      } else if (language === 'javascript') {
        setOutput(beautifyJs(raw, indent));
      } else if (language === 'html' || language === 'xml') {
        setOutput(beautifyHtmlOrXml(raw, indent));
      } else if (language === 'css') {
        setOutput(beautifyCss(raw, indent));
      } else {
        setOutput(raw);
      }
    } catch (e) {
      setError(e.message || 'Invalid input for this language.');
      setOutput('');
    }
  }, [input, language, indentSize]);

  const copyOutput = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch (_) {}
  };

  const currentPlaceholder = LANGUAGES.find((l) => l.id === language)?.placeholder || 'Paste code…';

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Code Beautifier</h1>
      <p className="text-gray-600 mb-6">
        Format and beautify code in JSON, JavaScript, HTML, CSS, or XML. Choose a language and indentation size.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <label className="block text-sm font-medium text-gray-700">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900"
            >
              {LANGUAGES.map((l) => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
            <label className="flex items-center gap-2 text-sm text-gray-700">
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
            placeholder={currentPlaceholder}
            className="w-full h-80 px-3 py-2 border border-gray-300 rounded-md text-sm font-mono text-gray-900"
            spellCheck={false}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Formatted output</label>
            {output && (
              <span className="text-xs text-gray-500">
                {output.length.toLocaleString()} chars
              </span>
            )}
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Click Beautify to format"
            className="w-full h-80 px-3 py-2 border border-gray-300 rounded-md text-sm font-mono bg-gray-50 text-gray-900"
            spellCheck={false}
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={beautify} disabled={!input.trim()}>
          Beautify
        </Button>
        <Button variant="outline" onClick={copyOutput} disabled={!output}>
          Copy output
        </Button>
        <Button variant="outline" onClick={() => { setInput(''); setOutput(''); setError(''); }}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export default CodeBeautifierTool;
