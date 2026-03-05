'use client';

import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

function isValidUrl(u) {
  try {
    const x = new URL(u);
    return x.protocol === 'http:' || x.protocol === 'https:';
  } catch {
    return false;
  }
}

const RobotsTxtValidatorTool = () => {
  const [url, setUrl] = useState('https://thetool.guru');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const canSubmit = useMemo(() => isValidUrl(url), [url]);

  const run = async () => {
    setLoading(true);
    setError('');
    setData(null);
    try {
      const res = await fetch(`/api/validate/robots-txt?url=${encodeURIComponent(url.trim())}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Validation failed');
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const isValid = data && (data.valid === true || (data.errors && data.errors.length === 0 && !data.invalid));
  const hasErrors = data && Array.isArray(data.errors) && data.errors.length > 0;
  const hasWarnings = data && Array.isArray(data.warnings) && data.warnings.length > 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Robots.txt Validator</h1>
      <p className="text-gray-600 mb-6">
        Validate a site&apos;s robots.txt file. Enter a URL and we&apos;ll fetch and check the robots.txt for proper syntax and common issues.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <Input
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
        <div className="flex items-end">
          <Button onClick={run} disabled={!canSubmit || loading}>
            {loading ? 'Validating…' : 'Validate'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm mb-4">
          {error}
        </div>
      )}

      {data && (
        <div className="space-y-4">
          {/* Summary */}
          <div className={`p-4 rounded-lg border ${hasErrors ? 'bg-red-50 border-red-200' : isValid ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <span className={`text-2xl ${hasErrors ? 'text-red-600' : isValid ? 'text-green-600' : 'text-gray-600'}`}>
                {hasErrors ? '✗' : isValid ? '✓' : '○'}
              </span>
              <div>
                <div className="font-semibold text-gray-900">
                  {hasErrors ? 'Issues found' : isValid ? 'Valid' : 'Validation complete'}
                </div>
                {data.url && (
                  <div className="text-sm text-gray-600 mt-0.5 break-all">
                    robots.txt URL: {data.url}
                  </div>
                )}
              </div>
            </div>
          </div>

          {hasErrors && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="font-semibold text-red-900 mb-2">Errors</div>
              <ul className="list-disc pl-5 text-sm text-red-800 space-y-1">
                {data.errors.map((err, i) => (
                  <li key={i}>{typeof err === 'string' ? err : JSON.stringify(err)}</li>
                ))}
              </ul>
            </div>
          )}

          {hasWarnings && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="font-semibold text-yellow-900 mb-2">Warnings</div>
              <ul className="list-disc pl-5 text-sm text-yellow-800 space-y-1">
                {data.warnings.map((w, i) => (
                  <li key={i}>{typeof w === 'string' ? w : JSON.stringify(w)}</li>
                ))}
              </ul>
            </div>
          )}

          {data.content != null && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-sm font-semibold text-gray-700 mb-2">robots.txt content</div>
              <pre className="text-sm text-gray-900 whitespace-pre-wrap break-words font-mono bg-white p-3 rounded border border-gray-200 max-h-64 overflow-y-auto">
                {typeof data.content === 'string' ? data.content : JSON.stringify(data.content, null, 2)}
              </pre>
            </div>
          )}

          {data.directives && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-sm font-semibold text-gray-700 mb-2">Directives</div>
              <pre className="text-sm text-gray-900 whitespace-pre-wrap break-words">
                {JSON.stringify(data.directives, null, 2)}
              </pre>
            </div>
          )}

          <details className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <summary className="cursor-pointer text-sm font-medium text-gray-700">Raw response</summary>
            <pre className="mt-2 text-sm text-gray-900 whitespace-pre-wrap break-words">
              {JSON.stringify(data, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default RobotsTxtValidatorTool;
