"use client";
import React, { useState } from 'react';
import Button from '../ui/Button';

function base64UrlDecode(input) {
  try {
    const s = input.replace(/-/g, '+').replace(/_/g, '/');
    const pad = s.length % 4 ? '='.repeat(4 - (s.length % 4)) : '';
    const decoded = atob(s + pad);
    const bytes = Uint8Array.from(decoded, c => c.charCodeAt(0));
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
  } catch {
    return null;
  }
}

function safeJsonParse(text) {
  try { return JSON.parse(text); } catch { return null; }
}

const JwtDecoderTool = () => {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState('');

  const handleDecode = () => {
    setError('');
    setHeader('');
    setPayload('');
    const parts = token.trim().split('.');
    if (parts.length < 2) {
      setError('Invalid JWT format. Expecting header.payload.signature');
      return;
    }
    const [h, p] = parts;
    const hText = base64UrlDecode(h);
    const pText = base64UrlDecode(p);
    if (!hText || !pText) {
      setError('Failed to decode Base64URL segments.');
      return;
    }
    const hObj = safeJsonParse(hText);
    const pObj = safeJsonParse(pText);
    if (!hObj || !pObj) {
      setError('Header or payload is not valid JSON.');
      return;
    }
    setHeader(JSON.stringify(hObj, null, 2));
    setPayload(JSON.stringify(pObj, null, 2));
  };

  const handleClear = () => {
    setToken('');
    setHeader('');
    setPayload('');
    setError('');
  };

  const copyText = async (text) => {
    try { await navigator.clipboard.writeText(text); } catch {}
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">JWT Decoder</h1>
            <p className="text-gray-600">Decode JSON Web Tokens to view their header and payload. No verification performed.</p>
          </div>
        </div>
      </div>

      {/* Example */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Example</label>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkphbmUgRG9lIiwiaWF0IjoxNjAwMDAwMDAwfQ.su5P5F2nHpwzIbZsOQ8Gg3l2udv4vW2b0H5a1H9Q9sQ');
            setHeader('');
            setPayload('');
            setError('');
          }}
        >
          Load sample JWT
        </Button>
      </div>

      <div className="mb-4">
        <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-2">JWT</label>
        <textarea
          id="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOi..."
          className="w-full h-28 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 resize-y text-gray-900 placeholder-gray-500"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <Button onClick={handleDecode} disabled={!token.trim()}>Decode</Button>
        <Button variant="secondary" onClick={handleClear}>Clear</Button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {(header || payload) && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Header</label>
              <Button variant="outline" size="sm" onClick={() => copyText(header)}>Copy</Button>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
              <pre className="whitespace-pre-wrap break-all text-sm text-gray-800">{header}</pre>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Payload</label>
              <Button variant="outline" size="sm" onClick={() => copyText(payload)}>Copy</Button>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
              <pre className="whitespace-pre-wrap break-all text-sm text-gray-800">{payload}</pre>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Security note</h3>
        <p className="text-sm text-blue-700">This tool does not verify signatures or validate token expiry. Decode only.</p>
      </div>
    </div>
  );
};

export default JwtDecoderTool;


