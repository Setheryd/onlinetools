import React, { useState } from 'react';
import Button from '../ui/Button';

const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode'); // 'encode' or 'decode'
  const [error, setError] = useState('');

  const handleEncode = () => {
    try {
      setError('');
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (err) {
      setError('Error encoding text. Please check your input.');
      setOutput('');
    }
  };

  const handleDecode = () => {
    try {
      setError('');
      const decoded = atob(input);
      setOutput(decoded);
    } catch (err) {
      setError('Error decoding text. Please check if your input is valid Base64.');
      setOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  };

  const handleProcess = () => {
    if (mode === 'encode') {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Base64 Encoder/Decoder</h1>
        <p className="text-gray-600">
          Encode text to Base64 or decode Base64 back to text. This tool is useful for encoding binary data or simple text obfuscation.
        </p>
      </div>

      {/* Mode Selection */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <Button
            variant={mode === 'encode' ? 'primary' : 'outline'}
            onClick={() => setMode('encode')}
          >
            Encode to Base64
          </Button>
          <Button
            variant={mode === 'decode' ? 'primary' : 'outline'}
            onClick={() => setMode('decode')}
          >
            Decode from Base64
          </Button>
        </div>
      </div>

      {/* Input Section */}
      <div className="mb-6">
        <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
          {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
        </label>
        <textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter text to encode to Base64...' : 'Enter Base64 string to decode...'}
          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="mb-6 flex space-x-4">
        <Button onClick={handleProcess} disabled={!input.trim()}>
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear All
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Output Section */}
      {output && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {mode === 'encode' ? 'Encoded Base64' : 'Decoded Text'}
            </label>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              Copy to Clipboard
            </Button>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <pre className="whitespace-pre-wrap break-all text-sm text-gray-800">{output}</pre>
          </div>
        </div>
      )}

      {/* Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">About Base64</h3>
        <p className="text-sm text-blue-700">
          Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format. 
          It's commonly used for encoding data in URLs, email attachments, and other applications where binary data needs to be transmitted as text.
        </p>
      </div>
    </div>
  );
};

export default Base64Tool;
