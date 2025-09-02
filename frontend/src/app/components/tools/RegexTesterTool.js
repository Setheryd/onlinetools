"use client";
import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';

const RegexTesterTool = () => {
  const [regex, setRegex] = useState('');
  const [testText, setTestText] = useState('');
  const [flags, setFlags] = useState('g');
  const [matches, setMatches] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const [selectedDateFormat, setSelectedDateFormat] = useState('iso');

  const dateFormats = {
    iso: { name: 'ISO (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}' },
    us: { name: 'US (MM/DD/YYYY)', pattern: '\\d{1,2}/\\d{1,2}/\\d{4}' },
    eu: { name: 'EU (DD-MM-YYYY)', pattern: '\\d{1,2}-\\d{1,2}-\\d{4}' },
    any: { name: 'Any Format', pattern: '\\b\\d{1,2}[-/]\\d{1,2}[-/]\\d{4}\\b|\\b\\d{4}[-/]\\d{1,2}[-/]\\d{1,2}\\b' }
  };

  const commonPatterns = [
    { name: 'Email', pattern: '[\\w\\.-]+@[\\w\\.-]+\\.[\\w]{2,}', description: 'Find email addresses' },
    { name: 'Phone', pattern: '(?:\\+?1[-.]?)?\\(?([0-9]{3})\\)?\\s*[-.]?\\s*([0-9]{3})\\s*[-.]?\\s*([0-9]{4})', description: 'Find US phone numbers' },
    { name: 'URL', pattern: 'https?://[\\w\\-]+(\\.[\\w\\-]+)+([\\w\\-\\.,@?^=%&:/~\\+#]*[\\w\\-@?^=%&/~\\+#])?', description: 'Find URLs' },
    { name: 'Date', pattern: dateFormats.iso.pattern, description: 'Find dates (select format below)' },
    { name: 'IPv4', pattern: '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)', description: 'Find IPv4 addresses' },
    { name: 'Credit Card', pattern: '\\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\\d{3})\\d{11})\\b', description: 'Find credit card numbers' }
  ];

  useEffect(() => {
    if (regex && testText) {
      testRegex();
    } else {
      setMatches([]);
      setError('');
      setIsValid(true);
    }
  }, [regex, testText, flags]);

  const testRegex = () => {
    if (!regex.trim() || !testText.trim()) {
      setMatches([]);
      return;
    }

    try {
      const regexObj = new RegExp(regex, flags);
      setIsValid(true);
      setError('');

      const allMatches = [];
      let match;
      
      // Reset regex object for global search
      regexObj.lastIndex = 0;
      
      while ((match = regexObj.exec(testText)) !== null) {
        allMatches.push({
          text: match[0],
          index: match.index,
          groups: match.slice(1),
          fullMatch: match
        });
      }

      setMatches(allMatches);
    } catch (err) {
      setIsValid(false);
      setError(err.message);
      setMatches([]);
    }
  };

  const handlePatternLoad = (pattern) => {
    if (pattern.name === 'Date') {
      setRegex(dateFormats[selectedDateFormat].pattern);
    } else {
      setRegex(pattern.pattern);
    }
    setFlags('g');
  };

  const handleDateFormatChange = (format) => {
    setSelectedDateFormat(format);
    if (regex === dateFormats.iso.pattern || regex === dateFormats.us.pattern || regex === dateFormats.eu.pattern || regex === dateFormats.any.pattern) {
      setRegex(dateFormats[format].pattern);
    }
  };

  const handleClear = () => {
    setRegex('');
    setTestText('');
    setFlags('g');
    setMatches([]);
    setError('');
    setIsValid(true);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const highlightMatches = (text, matches) => {
    if (matches.length === 0) return text;

    // Create a simple highlighting approach
    let result = text;
    
    // Sort matches by index in reverse order to avoid offset issues
    const sortedMatches = [...matches].sort((a, b) => b.index - a.index);

    sortedMatches.forEach(match => {
      const before = result.substring(0, match.index);
      const matched = result.substring(match.index, match.index + match.text.length);
      const after = result.substring(match.index + match.text.length);
      
      result = before + `<mark class="bg-yellow-200 px-1 rounded font-bold">${matched}</mark>` + after;
    });

    return result;
  };

  const getMatchInfo = () => {
    if (matches.length === 0) return null;
    
    const totalLength = matches.reduce((sum, match) => sum + match.text.length, 0);
    const uniqueMatches = new Set(matches.map(m => m.text));
    
    return {
      count: matches.length,
      totalLength,
      uniqueCount: uniqueMatches.size,
      uniqueMatches: Array.from(uniqueMatches)
    };
  };

  const matchInfo = getMatchInfo();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Regex Tester</h1>
            <p className="text-gray-600">
              Test and debug regular expressions with real-time matching and highlighting.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isValid && matchInfo && (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                {matchInfo.count} matches
              </span>
            )}
            {!isValid && (
              <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                Invalid regex
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Common Patterns */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Common Patterns
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {commonPatterns.map((pattern) => (
            <button
              key={pattern.name}
              onClick={() => handlePatternLoad(pattern)}
              className="p-3 text-left rounded-md border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium text-gray-900">{pattern.name}</div>
              <div className="text-xs text-gray-500">{pattern.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Regex Input */}
      <div className="mb-6">
        <label htmlFor="regex" className="block text-sm font-medium text-gray-700 mb-2">
          Regular Expression
        </label>
        <div className="flex gap-2">
          <input
            id="regex"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
            placeholder="Enter your regex pattern..."
            className={`flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 text-gray-900 placeholder-gray-500 font-mono text-sm ${
              isValid ? 'border-gray-300' : 'border-red-300 bg-red-50'
            }`}
          />
                     <div className="flex flex-col gap-1">
             <label className="text-xs font-medium text-gray-700">Flags</label>
             <input
               value={flags}
               onChange={(e) => setFlags(e.target.value)}
               placeholder="flags"
               className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 text-gray-900 font-mono text-sm"
             />
           </div>
        </div>
        {!isValid && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
                 <p className="mt-1 text-xs text-gray-500">
           Common flags: <strong>g</strong> (global), <strong>i</strong> (case-insensitive), <strong>m</strong> (multiline), <strong>s</strong> (dotAll), <strong>u</strong> (unicode), <strong>y</strong> (sticky)
         </p>
         
         {/* Date Format Dropdown */}
         {regex === dateFormats.iso.pattern || regex === dateFormats.us.pattern || regex === dateFormats.eu.pattern || regex === dateFormats.any.pattern ? (
           <div className="mt-3">
             <label className="block text-xs font-medium text-gray-700 mb-2">Date Format</label>
             <select
               value={selectedDateFormat}
               onChange={(e) => handleDateFormatChange(e.target.value)}
               className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 text-gray-900 text-sm"
             >
               {Object.entries(dateFormats).map(([key, format]) => (
                 <option key={key} value={key}>{format.name}</option>
               ))}
             </select>
           </div>
         ) : null}
      </div>

      {/* Test Text */}
      <div className="mb-6">
        <label htmlFor="testText" className="block text-sm font-medium text-gray-700 mb-2">
          Test Text
        </label>
        <textarea
          id="testText"
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          placeholder="Enter text to test against the regex pattern..."
          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 resize-y text-gray-900 placeholder-gray-500 font-mono text-sm"
        />
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Button variant="outline" onClick={handleClear}>
          Clear All
        </Button>
                 <Button variant="outline" onClick={() => setTestText('Contact us at john.doe@thetoolguru.com or call (555) 123-4567 or +1-555-123-4567. Visit https://thetoolguru.com for more info. Meeting on 2024-01-15 (ISO), 01/15/2024 (US), or 15-01-2024 (EU) at 192.168.1.1. Phone: 555.123.4567')}>
           Load Sample Text
         </Button>
        <Button onClick={testRegex} disabled={!regex.trim() || !testText.trim()}>
          Test Regex
        </Button>
      </div>

      {/* Results */}
      {matchInfo && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Results</h3>
          
          {/* Match Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-blue-50 p-3 rounded-md">
              <div className="text-2xl font-bold text-blue-600">{matchInfo.count}</div>
              <div className="text-xs text-blue-600">Total Matches</div>
            </div>
            <div className="bg-green-50 p-3 rounded-md">
              <div className="text-2xl font-bold text-green-600">{matchInfo.uniqueCount}</div>
              <div className="text-xs text-green-600">Unique Matches</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-md">
              <div className="text-2xl font-bold text-purple-600">{matchInfo.totalLength}</div>
              <div className="text-xs text-purple-600">Total Length</div>
            </div>
            <div className="bg-orange-50 p-3 rounded-md">
              <div className="text-2xl font-bold text-orange-600">{flags}</div>
              <div className="text-xs text-orange-600">Flags Used</div>
            </div>
          </div>

          {/* Highlighted Text */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Highlighted Text
            </label>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
              <div 
                className="text-sm text-gray-800 font-mono whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ 
                  __html: highlightMatches(testText, matches) 
                }}
              />
            </div>
          </div>

          {/* Match Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Match Details
            </label>
            <div className="space-y-2">
              {matches.map((match, index) => (
                <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-600">Match {index + 1}</span>
                        <span className="text-xs text-gray-500">at position {match.index}</span>
                      </div>
                      <div className="font-mono text-sm text-gray-800 bg-white px-2 py-1 rounded border">
                        {match.text}
                      </div>
                      {match.groups.length > 0 && (
                        <div className="mt-2">
                          <span className="text-xs text-gray-600">Groups: </span>
                                                     {match.groups.map((group, groupIndex) => (
                             <span key={groupIndex} className="text-xs bg-gray-200 px-1 py-0.5 rounded mr-1 text-gray-900 font-medium">
                               {group || '(empty)'}
                             </span>
                           ))}
                        </div>
                      )}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleCopy(match.text)}>
                      Copy
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">About Regex Testing</h3>
        <p className="text-sm text-blue-700">
          This tool helps you test and debug regular expressions in real-time. Enter a regex pattern, 
          add flags if needed, and see matches highlighted in your test text. Perfect for developers 
          working with text processing and validation.
        </p>
      </div>
    </div>
  );
};

export default RegexTesterTool;
