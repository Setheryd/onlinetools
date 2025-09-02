"use client";
import React, { useState } from 'react';
import Button from '../ui/Button';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmailValidatorTool = () => {
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState(null);

  const handleValidate = () => {
    setValid(EMAIL_REGEX.test(email.trim()));
  };

  const handleClear = () => {
    setEmail('');
    setValid(null);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Validator</h1>
        <p className="text-gray-600">Quickly check if an email address is properly formatted.</p>
      </div>

      {/* Examples */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Examples</label>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setEmail('name@thetoolguru.com')}>Valid</Button>
          <Button variant="outline" size="sm" onClick={() => setEmail('invalid@')}>Missing domain</Button>
          <Button variant="outline" size="sm" onClick={() => setEmail('first.last@sub.example.co')}>Subdomain</Button>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900"
          placeholder="name@thetoolguru.com"
        />
      </div>

      <div className="mb-6 flex gap-3">
        <Button onClick={handleValidate} disabled={!email.trim()}>Validate</Button>
        <Button variant="secondary" onClick={handleClear}>Clear</Button>
      </div>

      {valid === true && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">Looks good! This email is properly formatted.</div>
      )}
      {valid === false && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">This email address is not properly formatted.</div>
      )}

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Note</h3>
        <p className="text-sm text-blue-700">Format check only for now. Deliverability verification (DNS/SMTP) coming soon.</p>
      </div>
    </div>
  );
};

export default EmailValidatorTool;


