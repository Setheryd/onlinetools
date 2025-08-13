"use client";
import React, { useState } from 'react';
import Button from '../ui/Button';

const HashGeneratorTool = () => {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const hashAlgorithms = [
    { id: 'sha1', name: 'SHA-1', description: '160-bit hash (not recommended for security)' },
    { id: 'sha256', name: 'SHA-256', description: '256-bit hash (recommended for security)' },
    { id: 'sha512', name: 'SHA-512', description: '512-bit hash (highest security)' }
  ];

  const generateHash = async (text, algorithm) => {
    if (!text.trim()) return '';
    
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      
      let hashBuffer;
      
      switch (algorithm) {
        case 'sha1':
          hashBuffer = await crypto.subtle.digest('SHA-1', data);
          break;
        case 'sha256':
          hashBuffer = await crypto.subtle.digest('SHA-256', data);
          break;
        case 'sha512':
          hashBuffer = await crypto.subtle.digest('SHA-512', data);
          break;
        default:
          return 'Unknown algorithm';
      }
      
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      console.error('Hash generation error:', error);
      return 'Error generating hash';
    }
  };

  const generateAllHashes = async () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    const newHashes = {};
    
    for (const algo of hashAlgorithms) {
      newHashes[algo.id] = await generateHash(input, algo.id);
    }
    
    setHashes(newHashes);
    setIsProcessing(false);
  };

  const handleClear = () => {
    setInput('');
    setHashes({});
  };

  const handleCopy = async (hash) => {
    try {
      await navigator.clipboard.writeText(hash);
    } catch (err) {
      console.error('Failed to copy hash: ', err);
    }
  };

  const handleCopyAll = async () => {
    const allHashes = Object.entries(hashes)
      .map(([algo, hash]) => `${algo.toUpperCase()}: ${hash}`)
      .join('\n');
    
    try {
      await navigator.clipboard.writeText(allHashes);
    } catch (err) {
      console.error('Failed to copy all hashes: ', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hash Generator</h1>
            <p className="text-gray-600">
              Generate cryptographic hash values for text using various algorithms. Perfect for checksums and data integrity.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {Object.keys(hashes).length > 0 && (
              <Button variant="outline" size="sm" onClick={handleCopyAll}>
                Copy All
              </Button>
            )}
          </div>
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
          placeholder="Enter text to generate hashes for..."
          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 resize-y text-gray-900 placeholder-gray-500 font-mono text-sm"
        />
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Button onClick={generateAllHashes} disabled={!input.trim() || isProcessing}>
          {isProcessing ? 'Generating...' : 'Generate Hashes'}
        </Button>
        <Button variant="outline" onClick={handleClear}>
          Clear All
        </Button>
      </div>

      {/* Hash Results */}
      {Object.keys(hashes).length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Generated Hashes</h3>
          <div className="space-y-4">
            {hashAlgorithms.map((algo) => (
              <div key={algo.id} className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-sm font-semibold text-gray-900">{algo.name}</h4>
                      <span className="text-xs text-gray-500">({algo.description})</span>
                    </div>
                    <div className="font-mono text-sm text-gray-800 break-all">
                      {hashes[algo.id] || 'Not generated'}
                    </div>
                  </div>
                                     {hashes[algo.id] && (
                     <Button variant="outline" size="sm" onClick={() => handleCopy(hashes[algo.id])}>
                       Copy
                     </Button>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">About Hash Generation</h3>
                 <p className="text-sm text-blue-700">
           Hash functions convert input data into fixed-size strings. SHA-256 and SHA-512 are recommended for security purposes. 
           All processing happens in your browser for privacy and security.
         </p>
      </div>
    </div>
  );
};

export default HashGeneratorTool;
