'use client';

import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

function isValidUrl(u) {
  try {
    const x = new URL(u.startsWith('http') ? u : `https://${u}`);
    return x.protocol === 'http:' || x.protocol === 'https:';
  } catch {
    return false;
  }
}

const ArticleExtractorTool = () => {
  const [url, setUrl] = useState('https://thetool.guru');
  const [format, setFormat] = useState('markdown');
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const canSubmit = useMemo(() => isValidUrl(url), [url]);

  const run = async () => {
    setLoading(true);
    setError('');
    setData(null);
    try {
      const res = await fetch('/api/article-extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`,
          format,
          include_metadata: includeMetadata,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Extraction failed');
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const content = useMemo(() => {
    if (!data) return null;
    if (format === 'json') return JSON.stringify(data, null, 2);
    return data.markdown ?? data.text ?? data.content ?? '';
  }, [data, format]);

  const copyContent = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
  };

  const downloadContent = () => {
    if (!content) return;
    const ext = format === 'json' ? 'json' : format === 'markdown' ? 'md' : 'txt';
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `article.${ext}`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Extractor</h1>
      <p className="text-gray-600 mb-6">
        Extract the main article content from any URL. No CORS—we fetch server-side and return clean text or markdown.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <Input
          label="Article URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/article"
        />
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">Output format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="text">Plain text</option>
            <option value="markdown">Markdown</option>
            <option value="json">JSON</option>
          </select>
        </div>
        <div className="flex items-end gap-2">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={includeMetadata}
              onChange={(e) => setIncludeMetadata(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Include metadata
          </label>
          <Button onClick={run} disabled={!canSubmit || loading}>
            {loading ? 'Extracting…' : 'Extract'}
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
          {includeMetadata && (data.title || data.author || data.date) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.title && (
                <div className="p-4 bg-gray-50 border rounded">
                  <div className="text-xs text-gray-600">Title</div>
                  <div className="font-medium text-gray-900">{data.title}</div>
                </div>
              )}
              {data.author && (
                <div className="p-4 bg-gray-50 border rounded">
                  <div className="text-xs text-gray-600">Author</div>
                  <div className="text-gray-900 text-sm">{data.author}</div>
                </div>
              )}
              {data.date && (
                <div className="p-4 bg-gray-50 border rounded">
                  <div className="text-xs text-gray-600">Date</div>
                  <div className="text-gray-900 text-sm">{data.date}</div>
                </div>
              )}
            </div>
          )}

          {content && (
            <div className="p-4 bg-white border rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900">
                  {format === 'json' ? 'Full response' : 'Content'}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={copyContent}>
                    Copy
                  </Button>
                  <Button size="sm" variant="outline" onClick={downloadContent}>
                    Download
                  </Button>
                </div>
              </div>
              <pre className="text-sm text-gray-900 whitespace-pre-wrap break-words max-h-[60vh] overflow-y-auto p-3 bg-gray-50 rounded border">
                {content}
              </pre>
            </div>
          )}

          {data && data.extracted === false && !content && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-900 text-sm">
              No article content could be extracted from this URL.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleExtractorTool;
