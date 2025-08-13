"use client";
import React, { useState } from 'react';
import Button from '../ui/Button';

const TextCaseConverterTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [selectedCase, setSelectedCase] = useState('lowercase');

  const caseOptions = [
    { id: 'lowercase', name: 'lowercase', description: 'all letters in lowercase' },
    { id: 'uppercase', name: 'UPPERCASE', description: 'all letters in uppercase' },
    { id: 'titlecase', name: 'Title Case', description: 'first letter of each word capitalized' },
    { id: 'sentencecase', name: 'Sentence case', description: 'first letter of each sentence capitalized' },
    { id: 'camelcase', name: 'camelCase', description: 'first word lowercase, others capitalized' },
    { id: 'pascalcase', name: 'PascalCase', description: 'first letter of each word capitalized' },
    { id: 'snakecase', name: 'snake_case', description: 'words separated by underscores' },
    { id: 'kebabcase', name: 'kebab-case', description: 'words separated by hyphens' },
    { id: 'alternating', name: 'aLtErNaTiNg', description: 'alternating upper and lowercase' },
    { id: 'inverse', name: 'InVeRsE', description: 'inverse the current case' }
  ];

  const convertCase = (text, caseType) => {
    if (!text.trim()) return '';
    
    switch (caseType) {
      case 'lowercase':
        return text.toLowerCase();
      case 'uppercase':
        return text.toUpperCase();
      case 'titlecase':
        return text.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
             case 'sentencecase':
         return text.toLowerCase().replace(/(^\w|[.!?]\s+\w)/g, l => l.toUpperCase());
      case 'camelcase':
        return text.toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
          .replace(/^[A-Z]/, m => m.toLowerCase());
      case 'pascalcase':
        return text.toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
          .replace(/^[a-z]/, m => m.toUpperCase());
      case 'snakecase':
        return text.toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, '_')
          .replace(/^_|_$/g, '');
      case 'kebabcase':
        return text.toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
      case 'alternating':
        return text.split('').map((char, index) => 
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        ).join('');
      case 'inverse':
        return text.split('').map(char => 
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        ).join('');
      default:
        return text;
    }
  };

  const handleConvert = () => {
    if (input.trim()) {
      const converted = convertCase(input, selectedCase);
      setOutput(converted);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSwap = () => {
    if (output) {
      setInput(output);
      setOutput('');
    }
  };

  const handleSampleLoad = () => {
    const sample = "Hello World! This is a sample text for case conversion. It has multiple sentences. And exclamation marks! And question marks?";
    setInput(sample);
    setOutput('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Text Case Converter</h1>
            <p className="text-gray-600">
              Convert text between different cases and formats. Perfect for formatting text, code, and documents.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {output && (
              <Button variant="outline" size="sm" onClick={handleSwap}>
                Swap
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Sample Button */}
      <div className="mb-6">
        <Button variant="outline" onClick={handleSampleLoad}>
          Load Sample Text
        </Button>
      </div>

      {/* Case Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Case Type
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {caseOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedCase(option.id)}
              className={`p-3 text-left rounded-md border transition-colors ${
                selectedCase === option.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
                             <div className="font-medium text-gray-900">{option.name}</div>
               <div className="text-xs text-gray-600">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="mb-6">
        <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
          Input Text
        </label>
        <textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to convert..."
          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 resize-y text-gray-900 placeholder-gray-500 font-mono text-sm"
        />
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Button onClick={handleConvert} disabled={!input.trim()}>
          Convert to {caseOptions.find(opt => opt.id === selectedCase)?.name}
        </Button>
        <Button variant="outline" onClick={handleClear}>
          Clear All
        </Button>
      </div>

      {/* Output */}
      {output && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Converted Text
            </label>
            <Button variant="outline" size="sm" onClick={() => handleCopy(output)}>
              Copy to clipboard
            </Button>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <pre className="whitespace-pre-wrap break-all text-sm text-gray-800 font-mono overflow-x-auto">
              {output}
            </pre>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">About Case Conversion</h3>
        <p className="text-sm text-blue-700">
          This tool converts text between various case formats. Use it for formatting titles, code variables, 
          file names, or any text that needs consistent casing. All processing happens in your browser for privacy and speed.
        </p>
      </div>
    </div>
  );
};

export default TextCaseConverterTool;
