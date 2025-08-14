"use client";
import React, { useMemo, useState } from 'react';

function scorePassword(pwd) {
  if (!pwd) return { score: 0, label: 'Very weak', suggestions: ['Use a longer password'] };
  let score = 0;
  const suggestions = [];
  const length = pwd.length;
  const hasLower = /[a-z]/.test(pwd);
  const hasUpper = /[A-Z]/.test(pwd);
  const hasDigit = /\d/.test(pwd);
  const hasSymbol = /[^A-Za-z0-9]/.test(pwd);
  const uniqueChars = new Set(pwd).size;

  // Length-based
  if (length >= 8) score += 20; else suggestions.push('Use at least 8 characters');
  if (length >= 12) score += 15; else suggestions.push('Use 12+ characters for better security');
  if (length >= 16) score += 10;

  // Variety
  if (hasLower) score += 10; else suggestions.push('Include lowercase letters');
  if (hasUpper) score += 10; else suggestions.push('Include uppercase letters');
  if (hasDigit) score += 10; else suggestions.push('Include numbers');
  if (hasSymbol) score += 10; else suggestions.push('Include symbols');

  // Repetition penalty
  if (uniqueChars / Math.max(1, length) < 0.5) {
    score -= 10;
    suggestions.push('Avoid repeating characters');
  }

  // Common patterns
  const patterns = [/password/i, /1234/, /qwerty/i, /letmein/i, /admin/i];
  if (patterns.some(rx => rx.test(pwd))) {
    score = Math.max(0, score - 30);
    suggestions.push('Avoid common words and patterns');
  }

  // Clamp and label
  score = Math.max(0, Math.min(100, score));
  const label = score >= 80 ? 'Very strong' : score >= 60 ? 'Strong' : score >= 40 ? 'Fair' : score >= 20 ? 'Weak' : 'Very weak';
  return { score, label, suggestions: [...new Set(suggestions)] };
}

const PasswordStrengthCheckerTool = () => {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const { score, label, suggestions } = useMemo(() => scorePassword(password), [password]);

  const barClass = useMemo(() => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 60) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    if (score >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  }, [score]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Password Strength Checker</h1>
      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1">Password</label>
        <div className="flex gap-2">
          <input type={show ? 'text' : 'password'} value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
          <button className="px-3 py-2 text-sm bg-gray-100 border rounded" onClick={()=>setShow(s=>!s)}>{show ? 'Hide' : 'Show'}</button>
        </div>
      </div>
      <div className="h-3 w-full bg-gray-200 rounded">
        <div className={`h-3 ${barClass} rounded`} style={{ width: `${score}%` }} />
      </div>
      <div className="mt-2 text-sm text-gray-700 font-medium">{label} ({score}/100)</div>
      {suggestions.length > 0 && (
        <ul className="mt-3 list-disc list-inside text-sm text-gray-600">
          {suggestions.map(s => (<li key={s}>{s}</li>))}
        </ul>
      )}
    </div>
  );
};

export default PasswordStrengthCheckerTool;


