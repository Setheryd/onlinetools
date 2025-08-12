"use client";
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
// Curated symbol set that balances availability and typical password policies
const SYMBOLS = '!@#$%^&*()-_=+[]{};:,<.>/?';

const SIMILAR = new Set(['i', 'l', '1', 'L', 'o', '0', 'O']);
const AMBIGUOUS = new Set(['{', '}', '[', ']', '(', ')', '/', '\\', '\'', '"', '`', '~', ',', ';', ':', '.', '<', '>']);

function getRandomInt(maxExclusive) {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % maxExclusive;
  }
  return Math.floor(Math.random() * maxExclusive);
}

function shuffleArray(array) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = getRandomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function filterChars(chars, excludeSimilar, excludeAmbiguous) {
  return chars
    .split('')
    .filter((ch) => (!excludeSimilar || !SIMILAR.has(ch)) && (!excludeAmbiguous || !AMBIGUOUS.has(ch)))
    .join('');
}

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState('');

  const pools = useMemo(() => {
    const poolsArr = [];
    if (includeLowercase) poolsArr.push(filterChars(LOWERCASE, excludeSimilar, false));
    if (includeUppercase) poolsArr.push(filterChars(UPPERCASE, excludeSimilar, false));
    if (includeNumbers) poolsArr.push(filterChars(NUMBERS, excludeSimilar, false));
    if (includeSymbols) poolsArr.push(filterChars(SYMBOLS, excludeSimilar, excludeAmbiguous));
    return poolsArr.filter(Boolean);
  }, [includeLowercase, includeUppercase, includeNumbers, includeSymbols, excludeSimilar, excludeAmbiguous]);

  const combinedPool = useMemo(() => pools.join(''), [pools]);

  const canGenerate = combinedPool.length > 0 && length > 0;

  const generate = useCallback(() => {
    if (!canGenerate) return '';

    const atLeastOneFromEach = [];
    pools.forEach((pool) => {
      atLeastOneFromEach.push(pool[getRandomInt(pool.length)]);
    });

    const remainingCount = Math.max(0, length - atLeastOneFromEach.length);
    const rest = [];
    for (let i = 0; i < remainingCount; i += 1) {
      rest.push(combinedPool[getRandomInt(combinedPool.length)]);
    }

    const result = shuffleArray([...atLeastOneFromEach, ...rest]).join('');
    return result;
  }, [canGenerate, pools, combinedPool, length]);

  const handleGenerate = () => {
    const pwd = generate();
    setPassword(pwd);
  };

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
    } catch {}
  };

  const handleClear = () => {
    setPassword('');
  };

  useEffect(() => {
    // Generate a password initially and on option changes for live preview
    const pwd = generate();
    setPassword(pwd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, includeLowercase, includeUppercase, includeNumbers, includeSymbols, excludeSimilar, excludeAmbiguous]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Password Generator</h1>
            <p className="text-gray-600">
              Create secure, random passwords with customizable length and character sets. 100% in-browser.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleGenerate} disabled={!canGenerate}>
              Regenerate
            </Button>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Length control */}
        <div className="bg-gray-100 rounded-lg p-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">Length: {length}</label>
          <input
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value, 10) || 0)}
            className="w-full"
          />
          <div className="mt-2">
            <input
              type="number"
              min={1}
              max={128}
              value={length}
              onChange={(e) => setLength(Math.max(1, Math.min(128, parseInt(e.target.value || '0', 10))))}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm w-28"
            />
          </div>
        </div>

        {/* Character sets */}
        <div className="flex flex-col justify-center gap-y-3">
          <Checkbox label="Lowercase (a-z)" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} />
          <Checkbox label="Uppercase (A-Z)" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />
          <Checkbox label="Numbers (0-9)" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
          <Checkbox label="Symbols (!@#$…)" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
        </div>

        {/* Filters */}
        <div className="flex flex-col justify-center gap-y-3">
          <Checkbox label="Exclude similar characters (i, l, 1, L, o, 0, O)" checked={excludeSimilar} onChange={(e) => setExcludeSimilar(e.target.checked)} />
          <Checkbox label={'Exclude ambiguous symbols ({ } [ ] ( ) / \\ \' " ` ~ , ; : . < >)'} checked={excludeAmbiguous} onChange={(e) => setExcludeAmbiguous(e.target.checked)} />
        </div>
      </div>

      {/* Output */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Generated password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 text-gray-900"
        />
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Button onClick={handleGenerate} disabled={!canGenerate}>Generate</Button>
        <Button variant="secondary" onClick={handleClear}>Clear</Button>
        {password && (
          <Button variant="outline" onClick={handleCopy}>Copy</Button>
        )}
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Security tips</h3>
        <p className="text-sm text-blue-700">
          Longer passwords are stronger. Use a mix of character types and avoid reusing passwords across sites. Store passwords securely
          in a reputable password manager. Your generation happens locally in your browser.
        </p>
      </div>
    </div>
  );
};

export default PasswordGenerator;


