"use client";
import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';

const TextDiffTool = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diffResult, setDiffResult] = useState(null);
  const [showWhitespace, setShowWhitespace] = useState(true);
  const [caseSensitive, setCaseSensitive] = useState(true);

  const calculateDiff = () => {
    if (!text1.trim() && !text2.trim()) {
      setDiffResult(null);
      return;
    }

    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    
    const result = {
      added: [],
      removed: [],
      modified: [],
      unchanged: [],
      totalChanges: 0
    };

    // Simple line-by-line comparison
    const maxLines = Math.max(lines1.length, lines2.length);
    
    for (let i = 0; i < maxLines; i++) {
      const line1 = i < lines1.length ? lines1[i] : '';
      const line2 = i < lines2.length ? lines2[i] : '';
      
      let line1Compare = line1;
      let line2Compare = line2;
      
      if (!caseSensitive) {
        line1Compare = line1.toLowerCase();
        line2Compare = line2.toLowerCase();
      }
      
      if (!showWhitespace) {
        line1Compare = line1Compare.trim();
        line2Compare = line2Compare.trim();
      }
      
      if (line1Compare === line2Compare) {
        if (line1 === line2) {
          result.unchanged.push({ line: i + 1, text: line1, type: 'unchanged' });
        } else {
          result.modified.push({ 
            line: i + 1, 
            original: line1, 
            modified: line2, 
            type: 'modified' 
          });
          result.totalChanges++;
        }
      } else if (line1 && !line2) {
        result.removed.push({ line: i + 1, text: line1, type: 'removed' });
        result.totalChanges++;
      } else if (!line1 && line2) {
        result.added.push({ line: i + 1, text: line2, type: 'added' });
        result.totalChanges++;
      } else {
        result.modified.push({ 
          line: i + 1, 
          original: line1, 
          modified: line2, 
          type: 'modified' 
        });
        result.totalChanges++;
      }
    }

    setDiffResult(result);
  };

  useEffect(() => {
    calculateDiff();
  }, [text1, text2, showWhitespace, caseSensitive]);

  const handleClear = () => {
    setText1('');
    setText2('');
    setDiffResult(null);
  };

  const handleSampleLoad = () => {
    const sample1 = `Hello World!
This is the first version of the text.
It contains some content.
The weather is nice today.`;

    const sample2 = `Hello World!
This is the second version of the text.
It contains updated content.
The weather is nice today.
Have a great day!`;

    setText1(sample1);
    setText2(sample2);
  };

  const handleSwap = () => {
    setText1(text2);
    setText2(text1);
  };

  const renderDiffLine = (item) => {
    switch (item.type) {
      case 'added':
        return (
          <div key={`added-${item.line}`} className="flex items-start gap-2 p-2 bg-green-50 border-l-4 border-green-400">
            <span className="text-xs font-mono text-green-600 w-8 text-right">+{item.line}</span>
            <span className="text-sm text-green-800 font-mono flex-1">{item.text}</span>
          </div>
        );
      case 'removed':
        return (
          <div key={`removed-${item.line}`} className="flex items-start gap-2 p-2 bg-red-50 border-l-4 border-red-400">
            <span className="text-xs font-mono text-red-600 w-8 text-right">-{item.line}</span>
            <span className="text-sm text-red-800 font-mono flex-1">{item.text}</span>
          </div>
        );
      case 'modified':
        return (
          <div key={`modified-${item.line}`} className="space-y-1">
            <div className="flex items-start gap-2 p-2 bg-red-50 border-l-4 border-red-400">
              <span className="text-xs font-mono text-red-600 w-8 text-right">-{item.line}</span>
              <span className="text-sm text-red-800 font-mono flex-1">{item.original}</span>
            </div>
            <div className="flex items-start gap-2 p-2 bg-green-50 border-l-4 border-green-400">
              <span className="text-xs font-mono text-green-600 w-8 text-right">+{item.line}</span>
              <span className="text-sm text-green-800 font-mono flex-1">{item.modified}</span>
            </div>
          </div>
        );
      default:
        return (
          <div key={`unchanged-${item.line}`} className="flex items-start gap-2 p-2 bg-gray-50">
            <span className="text-xs font-mono text-gray-500 w-8 text-right">{item.line}</span>
            <span className="text-sm text-gray-700 font-mono flex-1">{item.text}</span>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Text Diff Checker</h1>
            <p className="text-gray-600">
              Compare two texts and see the differences highlighted line by line.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {diffResult && (
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                {diffResult.totalChanges} changes
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="mb-6 flex flex-wrap gap-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showWhitespace}
            onChange={(e) => setShowWhitespace(e.target.checked)}
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">Show whitespace differences</span>
        </label>
        
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">Case sensitive comparison</span>
        </label>
      </div>

      {/* Text Inputs */}
      <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label htmlFor="text1" className="block text-sm font-medium text-gray-700 mb-2">
            Original Text
          </label>
          <textarea
            id="text1"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Enter or paste the original text..."
            className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 resize-y text-gray-900 placeholder-gray-500 font-mono text-sm"
          />
        </div>
        
        <div>
          <label htmlFor="text2" className="block text-sm font-medium text-gray-700 mb-2">
            Modified Text
          </label>
          <textarea
            id="text2"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Enter or paste the modified text..."
            className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 resize-y text-gray-900 placeholder-gray-500 font-mono text-sm"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Button variant="outline" onClick={handleSampleLoad}>
          Load Sample Texts
        </Button>
        <Button variant="outline" onClick={handleSwap} disabled={!text1 || !text2}>
          Swap Texts
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!text1 && !text2}>
          Clear All
        </Button>
      </div>

      {/* Diff Results */}
      {diffResult && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">Difference Results</h3>
            <div className="text-xs text-gray-500">
              {diffResult.added.length} added, {diffResult.removed.length} removed, {diffResult.modified.length} modified
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-md overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-400 rounded"></div>
                  Added lines
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-400 rounded"></div>
                  Removed lines
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gray-400 rounded"></div>
                  Unchanged lines
                </span>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {diffResult.unchanged.map(renderDiffLine)}
              {diffResult.removed.map(renderDiffLine)}
              {diffResult.added.map(renderDiffLine)}
              {diffResult.modified.map(renderDiffLine)}
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">About Text Diff</h3>
        <p className="text-sm text-blue-700">
          This tool compares two texts line by line and highlights the differences. Added lines are shown in green, 
          removed lines in red, and modified lines show both versions. Perfect for code reviews, document comparisons, 
          and tracking changes between different versions of text.
        </p>
      </div>
    </div>
  );
};

export default TextDiffTool;
