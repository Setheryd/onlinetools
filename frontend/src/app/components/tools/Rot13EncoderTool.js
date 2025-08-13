"use client";
import React, { useState } from 'react';
import Button from '../ui/Button';

function rot13(text) {
  return text.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97;
    const code = c.charCodeAt(0) - base;
    return String.fromCharCode(((code + 13) % 26) + base);
  });
}

const Rot13EncoderTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleEncode = () => {
    if (!input.trim()) return setOutput('');
    setOutput(rot13(input));
  };

  const handleDecode = () => {
    if (!input.trim()) return setOutput('');
    setOutput(rot13(input));
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleCopy = async () => {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); } catch {}
  };

  const loadExample = (text) => {
    setInput(text);
    setOutput('');
  };

  const handleSwap = () => {
    if (!output) return;
    setInput(output);
    setOutput('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ROT13 Encoder/Decoder</h1>
            <p className="text-gray-600">Rotate letters by 13 positions. Encoding and decoding are the same operation.</p>
          </div>
          <div className="flex items-center gap-2">
            {output && (
              <Button variant="outline" size="sm" onClick={handleSwap}>Swap</Button>
            )}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Examples</label>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => loadExample('Hello, World!')}>
            Hello, World!
          </Button>
          <Button variant="outline" size="sm" onClick={() => loadExample('Attack at dawn')}>
            Attack at dawn
          </Button>
          <Button variant="outline" size="sm" onClick={() => loadExample('Gur Dhvpx Oebja Qbt Whzcf Bire Gur Ynml Svir Tenff Jvgarff.') }>
            Sample (encoded)
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to encode/decode with ROT13..."
          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 resize-y text-gray-900 placeholder-gray-500 font-mono text-sm"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <Button onClick={handleEncode} disabled={!input.trim()}>Encode</Button>
        <Button variant="secondary" onClick={handleDecode} disabled={!input.trim()}>Decode</Button>
        <Button variant="outline" onClick={handleClear}>Clear All</Button>
      </div>

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

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">About ROT13</h3>
        <p className="text-sm text-blue-700">ROT13 is a simple substitution cipher that rotates each letter by 13 places in the alphabet. Applying ROT13 twice returns the original text.</p>
      </div>
    </div>
  );
};

export default Rot13EncoderTool;


