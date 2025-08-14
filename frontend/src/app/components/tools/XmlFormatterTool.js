"use client";
import React, { useMemo, useRef, useState } from 'react';
import Button from '../ui/Button';

function formatXml(xml) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'application/xml');
    const err = doc.getElementsByTagName('parsererror')[0];
    if (err) throw new Error(err.textContent || 'Invalid XML');

    const PADDING = '  ';

    const serializeNode = (node, level) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.trim();
        return text.length ? text : '';
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return '';

      const el = node;
      const name = el.nodeName;
      const attrs = Array.from(el.attributes || []).map(a => `${a.name}="${a.value}"`).join(' ');
      const openTag = attrs ? `<${name} ${attrs}>` : `<${name}>`;

      const children = Array.from(el.childNodes || []).filter(c => {
        if (c.nodeType === Node.TEXT_NODE) return c.textContent.trim().length > 0;
        return true;
      });

      if (children.length === 0) {
        // Empty element
        return `${PADDING.repeat(level)}${openTag.replace(/>$/, '')}></${name}>`;
      }

      if (children.length === 1 && children[0].nodeType === Node.TEXT_NODE) {
        const text = children[0].textContent.trim();
        return `${PADDING.repeat(level)}${openTag}${text}</${name}>`;
      }

      const inner = children.map((c) => serializeNode(c, level + 1)).filter(Boolean).join('\n');
      return `${PADDING.repeat(level)}${openTag}\n${inner}\n${PADDING.repeat(level)}</${name}>`;
    };

    return serializeNode(doc.documentElement, 0);
  } catch (e) {
    return { error: e.message || 'Invalid XML' };
  }
}

const XmlFormatterTool = () => {
  const [input, setInput] = useState('<root><child id="1">hello</child></root>');
  const result = useMemo(() => formatXml(input || ''), [input]);
  const isError = typeof result === 'object' && result?.error;
  const output = isError ? '' : result;
  const outputRef = useRef(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      try {
        const ta = outputRef.current;
        if (ta) {
          ta.removeAttribute('readonly');
          ta.select();
          document.execCommand('copy');
          ta.setAttribute('readonly', true);
        }
      } catch {}
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">XML Formatter</h1>
      <p className="text-gray-600 mb-4">Validate and pretty-print XML using your browser.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-700 mb-2">Input XML</label>
          <textarea value={input} onChange={(e)=>setInput(e.target.value)} className="w-full h-80 px-3 py-2 border rounded text-sm font-mono" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm text-gray-700">Formatted XML</label>
            {!isError && <Button variant="outline" size="sm" onClick={copy}>Copy</Button>}
          </div>
          {isError ? (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">{result.error}</div>
          ) : (
            <textarea ref={outputRef} readOnly value={output} className="w-full h-80 px-3 py-2 border rounded text-sm font-mono bg-gray-50" />
          )}
        </div>
      </div>
    </div>
  );
};

export default XmlFormatterTool;


