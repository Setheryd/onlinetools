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

// Password presets for different use cases
const PASSWORD_PRESETS = {
  'Strong': { length: 16, includeLowercase: true, includeUppercase: true, includeNumbers: true, includeSymbols: true, excludeSimilar: true, excludeAmbiguous: false },
  'Extra Strong': { length: 24, includeLowercase: true, includeUppercase: true, includeNumbers: true, includeSymbols: true, excludeSimilar: true, excludeAmbiguous: false },
  'PIN': { length: 6, includeLowercase: false, includeUppercase: false, includeNumbers: true, includeSymbols: false, excludeSimilar: false, excludeAmbiguous: false },
  'Memorable': { length: 20, includeLowercase: true, includeUppercase: true, includeNumbers: true, includeSymbols: false, excludeSimilar: true, excludeAmbiguous: false },
  'Website': { length: 12, includeLowercase: true, includeUppercase: true, includeNumbers: true, includeSymbols: true, excludeSimilar: false, excludeAmbiguous: true },
  'Custom': null
};

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

// Calculate password strength
function calculatePasswordStrength(password) {
  if (!password) return { score: 0, label: 'Very Weak', color: 'bg-red-500', timeToCrack: 'Instantly' };
  
  let score = 0;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const length = password.length;
  
  // Length contribution
  if (length >= 8) score += 1;
  if (length >= 12) score += 1;
  if (length >= 16) score += 1;
  if (length >= 20) score += 1;
  
  // Character variety contribution
  if (hasLower) score += 1;
  if (hasUpper) score += 1;
  if (hasNumber) score += 1;
  if (hasSymbol) score += 1;
  
  // Bonus for length
  if (length > 20) score += 1;
  
  // Penalty for common patterns
  if (/(.)\1{2,}/.test(password)) score = Math.max(0, score - 1); // Repeated characters
  if (/^(.)\1*$/.test(password)) score = Math.max(0, score - 2); // All same character
  
  const strengthMap = [
    { label: 'Very Weak', color: 'bg-red-500', timeToCrack: 'Instantly' },
    { label: 'Weak', color: 'bg-orange-500', timeToCrack: 'Minutes' },
    { label: 'Fair', color: 'bg-yellow-500', timeToCrack: 'Hours' },
    { label: 'Good', color: 'bg-blue-500', timeToCrack: 'Days' },
    { label: 'Strong', color: 'bg-green-500', timeToCrack: 'Years' },
    { label: 'Very Strong', color: 'bg-emerald-500', timeToCrack: 'Centuries' }
  ];
  
  // Ensure score is within bounds and map to strength level
  const maxScore = strengthMap.length - 1;
  const clampedScore = Math.min(score, maxScore);
  const index = Math.max(0, Math.min(clampedScore, maxScore));
  
  return { score: clampedScore, ...strengthMap[index] };
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
  const [selectedPreset, setSelectedPreset] = useState('Strong');
  const [passwordHistory, setPasswordHistory] = useState([]);
  const [showCopiedFeedback, setShowCopiedFeedback] = useState(false);
  const [showStrengthDetails, setShowStrengthDetails] = useState(false);

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
  const passwordStrength = useMemo(() => calculatePasswordStrength(password), [password]);

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
    
    // Add to history (keep last 10)
    setPasswordHistory(prev => {
      const newHistory = [pwd, ...prev.filter(p => p !== pwd)].slice(0, 10);
      return newHistory;
    });
  };

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setShowCopiedFeedback(true);
      setTimeout(() => setShowCopiedFeedback(false), 2000);
    } catch (error) {
      console.error('Failed to copy password:', error);
    }
  };

  const handleClear = () => {
    setPassword('');
  };

  const handlePresetChange = (presetName) => {
    setSelectedPreset(presetName);
    if (presetName !== 'Custom' && PASSWORD_PRESETS[presetName]) {
      const preset = PASSWORD_PRESETS[presetName];
      setLength(preset.length);
      setIncludeLowercase(preset.includeLowercase);
      setIncludeUppercase(preset.includeUppercase);
      setIncludeNumbers(preset.includeNumbers);
      setIncludeSymbols(preset.includeSymbols);
      setExcludeSimilar(preset.excludeSimilar);
      setExcludeAmbiguous(preset.excludeAmbiguous);
    }
  };

  const handleHistorySelect = (historicalPassword) => {
    setPassword(historicalPassword);
  };

  useEffect(() => {
    // Generate a password initially and on option changes for live preview
    const pwd = generate();
    setPassword(pwd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, includeLowercase, includeUppercase, includeNumbers, includeSymbols, excludeSimilar, excludeAmbiguous]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Password Generator</h1>
            <p className="text-gray-600">
              Create secure, random passwords with customizable length and character sets. 100% in-browser with advanced security features.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleGenerate} disabled={!canGenerate}>
              Regenerate
            </Button>
          </div>
        </div>
      </div>

      {/* Preset Templates */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Password Templates</label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(PASSWORD_PRESETS).map((presetName) => (
            <button
              key={presetName}
              onClick={() => handlePresetChange(presetName)}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                selectedPreset === presetName
                  ? 'bg-blue-100 border-blue-300 text-blue-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {presetName}
            </button>
          ))}
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
        <div className="relative">
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 text-gray-900 pr-20"
          />
          {showCopiedFeedback && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600 text-sm font-medium">
              Copied!
            </div>
          )}
        </div>
      </div>

      {/* Password Strength Meter */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Password Strength</label>
          <button
            onClick={() => setShowStrengthDetails(!showStrengthDetails)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showStrengthDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
        
        <div className="flex items-center gap-3 mb-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
              style={{ width: `${Math.min(100, (passwordStrength.score / 5) * 100)}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-700 min-w-[80px]">{passwordStrength.label}</span>
        </div>
        
        {showStrengthDetails && (
          <div className="bg-gray-50 rounded-md p-3 text-sm text-gray-600">
            <p><strong>Time to crack:</strong> {passwordStrength.timeToCrack}</p>
            <p><strong>Character variety:</strong> {pools.length}/4 types used</p>
            <p><strong>Entropy:</strong> ~{Math.round(Math.log2(Math.pow(combinedPool.length, length)))} bits</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Button onClick={handleGenerate} disabled={!canGenerate}>Generate</Button>
        <Button variant="secondary" onClick={handleClear}>Clear</Button>
        {password && (
          <Button variant="outline" onClick={handleCopy}>
            {showCopiedFeedback ? 'Copied!' : 'Copy'}
          </Button>
        )}
      </div>

      {/* Password History */}
      {passwordHistory.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Recent Passwords</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {passwordHistory.map((pwd, index) => (
              <button
                key={index}
                onClick={() => handleHistorySelect(pwd)}
                className="text-left p-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-mono hover:bg-gray-100 transition-colors truncate"
                title={pwd}
              >
                {pwd}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">Security Tips</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use at least 12 characters for better security</li>
            <li>• Include a mix of character types (letters, numbers, symbols)</li>
            <li>• Avoid reusing passwords across different sites</li>
            <li>• Store passwords securely in a reputable password manager</li>
            <li>• Your generation happens locally in your browser</li>
          </ul>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <h3 className="text-sm font-semibold text-green-800 mb-2">Password Best Practices</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Use unique passwords for each account</li>
            <li>• Enable two-factor authentication when available</li>
            <li>• Regularly update your passwords</li>
            <li>• Be cautious of phishing attempts</li>
            <li>• Consider using passphrases for better memorability</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;


