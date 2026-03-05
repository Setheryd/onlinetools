'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const UrlFetchTool = () => {
  const [url, setUrl] = useState('https://example.com');
  const [includeBody, setIncludeBody] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const run = async () => {
    const u = url.trim();
    if (!u) return;
    setLoading(true);
    setError('');
    setData(null);
    try {
      const res = await fetch('/api/wget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: u.startsWith('http') ? u : `https://${u}`,
          includeBody,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Fetch failed');
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const status = data?.status ?? data?.status_code;
  const headers = data?.headers ?? data?.response_headers ?? {};
  const body = data?.body ?? data?.content ?? '';

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">URL Fetch</h1>
      <p className="text-gray-600 mb-6">
        Fetch any URL from our server and see the response status, headers, and optional body. No CORS—works for any public URL.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <div className="md:col-span-2">
          <Input
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </div>
        <div className="flex items-end gap-2">
          <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
            <input
              type="checkbox"
              checked={includeBody}
              onChange={(e) => setIncludeBody(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Include body
          </label>
        </div>
        <div className="flex items-end">
          <Button onClick={run} disabled={!url.trim() || loading}>
            {loading ? 'Fetching…' : 'Fetch'}
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
          {status != null && (
            <div className="p-4 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600 mb-1">Status</div>
              <div className="font-mono font-semibold text-gray-900">
                {status} {data.status_text || ''}
              </div>
            </div>
          )}

          {Object.keys(headers).length > 0 && (
            <div className="p-4 bg-white border rounded">
              <div className="text-sm font-semibold text-gray-900 mb-2">Response headers</div>
              <pre className="text-xs text-gray-700 overflow-x-auto max-h-48 overflow-y-auto p-3 bg-gray-50 rounded border">
                {Object.entries(headers).map(([k, v]) => `${k}: ${v}`).join('\n')}
              </pre>
            </div>
          )}

          {body !== '' && (
            <div className="p-4 bg-white border rounded">
              <div className="text-sm font-semibold text-gray-900 mb-2">Body</div>
              <pre className="text-xs text-gray-900 whitespace-pre-wrap break-words max-h-96 overflow-y-auto p-3 bg-gray-50 rounded border">
                {typeof body === 'string' ? body : JSON.stringify(body, null, 2)}
              </pre>
            </div>
          )}

          {status != null && Object.keys(headers).length === 0 && body === '' && (
            <div className="p-3 bg-gray-50 border rounded text-gray-600 text-sm">
              No headers or body in response.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UrlFetchTool;
