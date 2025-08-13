"use client";
import React, { useState } from 'react';
import Button from '../ui/Button';

const JsonFormatterTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indentSize, setIndentSize] = useState(2);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [stats, setStats] = useState(null);

  // Sample JSON examples
  const sampleJsons = {
    'Simple Object': '{"name": "John", "age": 30, "city": "New York"}',
    'Nested Object': '{"user": {"id": 1, "profile": {"name": "John", "email": "john@example.com"}}, "settings": {"theme": "dark", "notifications": true}}',
    'Array Example': '[{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}, {"id": 3, "name": "Charlie"}]',
    'API Response': '{"status": "success", "data": {"users": [{"id": 1, "name": "John"}, {"id": 2, "name": "Jane"}]}, "message": "Users retrieved successfully"}'
  };

  const formatJson = (jsonString, indent = 2) => {
    try {
      const parsed = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      setError('');
      setIsValid(true);
      
      // Calculate statistics
      const stats = analyzeJson(parsed);
      setStats(stats);
      
      return formatted;
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setOutput('');
      setIsValid(false);
      setStats(null);
      return null;
    }
  };

  const minifyJson = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
      setIsValid(true);
      
      const stats = analyzeJson(parsed);
      setStats(stats);
      
      return minified;
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setOutput('');
      setIsValid(false);
      setStats(null);
      return null;
    }
  };

  const analyzeJson = (data) => {
    const stats = {
      keys: 0,
      values: 0,
      arrays: 0,
      objects: 0,
      strings: 0,
      numbers: 0,
      booleans: 0,
      nulls: 0,
      maxDepth: 0
    };

    const analyzeNode = (node, depth = 0) => {
      stats.maxDepth = Math.max(stats.maxDepth, depth);
      
      if (Array.isArray(node)) {
        stats.arrays++;
        stats.values += node.length;
        node.forEach(item => analyzeNode(item, depth + 1));
      } else if (node && typeof node === 'object') {
        stats.objects++;
        const keys = Object.keys(node);
        stats.keys += keys.length;
        stats.values += keys.length;
        keys.forEach(key => analyzeNode(node[key], depth + 1));
      } else if (typeof node === 'string') {
        stats.strings++;
      } else if (typeof node === 'number') {
        stats.numbers++;
      } else if (typeof node === 'boolean') {
        stats.booleans++;
      } else if (node === null) {
        stats.nulls++;
      }
    };

    analyzeNode(data);
    return stats;
  };

  const validateJson = (jsonString) => {
    try {
      JSON.parse(jsonString);
      setError('');
      setIsValid(true);
      return true;
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setIsValid(false);
      return false;
    }
  };

  const handleFormat = () => {
    if (input.trim()) {
      formatJson(input, indentSize);
    }
  };

  const handleMinify = () => {
    if (input.trim()) {
      minifyJson(input);
    }
  };

  const handleValidate = () => {
    if (input.trim()) {
      validateJson(input);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
    setIsValid(false);
    setStats(null);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSampleLoad = (sampleName) => {
    const sample = sampleJsons[sampleName];
    if (sample) {
      setInput(sample);
      setError('');
      setIsValid(false);
      setOutput('');
      setStats(null);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    
    // Auto-validate as user types (with debouncing)
    if (value.trim()) {
      clearTimeout(window.validationTimeout);
      window.validationTimeout = setTimeout(() => {
        validateJson(value);
      }, 500);
    } else {
      setError('');
      setIsValid(false);
      setStats(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">JSON Formatter & Validator</h1>
            <p className="text-gray-600">
              Format, validate, and beautify JSON data with syntax highlighting and error detection.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isValid && (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                Valid JSON
              </span>
            )}
            {error && (
              <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                Invalid JSON
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Sample JSON buttons */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Load Sample JSON
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(sampleJsons).map((sampleName) => (
            <Button
              key={sampleName}
              variant="outline"
              size="sm"
              onClick={() => handleSampleLoad(sampleName)}
            >
              {sampleName}
            </Button>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-700">Indent Size:</label>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-800"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={8}>8 spaces</option>
            <option value={0}>No indent</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700">Status:</span>
          {isValid ? (
            <span className="text-green-600 text-sm font-medium">✓ Valid JSON</span>
          ) : error ? (
            <span className="text-red-600 text-sm font-medium">✗ Invalid JSON</span>
          ) : (
            <span className="text-gray-500 text-sm">No input</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {stats && (
            <span className="text-xs text-gray-500">
              {stats.keys} keys, {stats.values} values, depth: {stats.maxDepth}
            </span>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="mb-4">
        <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
          Input JSON
        </label>
        <textarea
          id="input"
          value={input}
          onChange={handleInputChange}
          placeholder="Paste your JSON here or use a sample above..."
          className={`w-full h-64 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 resize-y text-gray-900 placeholder-gray-500 font-mono text-sm ${
            isValid ? 'border-green-300 bg-green-50' : error ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
        />
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Button onClick={handleFormat} disabled={!input.trim()}>
          Format JSON
        </Button>
        <Button variant="secondary" onClick={handleMinify} disabled={!input.trim()}>
          Minify JSON
        </Button>
        <Button variant="outline" onClick={handleValidate} disabled={!input.trim()}>
          Validate Only
        </Button>
        <Button variant="outline" onClick={handleClear}>
          Clear All
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-start gap-3">
            <div className="text-red-500 text-lg">⚠</div>
            <div>
              <h3 className="text-red-800 font-medium mb-1">JSON Validation Error</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Output */}
      {output && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Formatted JSON
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

      {/* Statistics */}
      {stats && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">JSON Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-3 rounded-md">
              <div className="text-2xl font-bold text-blue-600">{stats.keys}</div>
              <div className="text-xs text-blue-600">Keys</div>
            </div>
            <div className="bg-green-50 p-3 rounded-md">
              <div className="text-2xl font-bold text-green-600">{stats.values}</div>
              <div className="text-xs text-green-600">Values</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-md">
              <div className="text-2xl font-bold text-purple-600">{stats.maxDepth}</div>
              <div className="text-xs text-purple-600">Max Depth</div>
            </div>
            <div className="bg-orange-50 p-3 rounded-md">
              <div className="text-2xl font-bold text-orange-600">{stats.arrays + stats.objects}</div>
              <div className="text-xs text-orange-600">Complex Types</div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-sm">
              <span className="text-gray-600">Strings:</span> <span className="text-gray-900 font-medium">{stats.strings}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Numbers:</span> <span className="text-gray-900 font-medium">{stats.numbers}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Booleans:</span> <span className="text-gray-900 font-medium">{stats.booleans}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Nulls:</span> <span className="text-gray-900 font-medium">{stats.nulls}</span>
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">About JSON Formatting</h3>
        <p className="text-sm text-blue-700">
          This tool formats JSON with proper indentation, validates syntax, and provides detailed statistics. 
          Use it to beautify API responses, debug JSON data, or prepare data for documentation. 
          All processing happens in your browser for privacy and speed.
        </p>
      </div>
    </div>
  );
};

export default JsonFormatterTool;
