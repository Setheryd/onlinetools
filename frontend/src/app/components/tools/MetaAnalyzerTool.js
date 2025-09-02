"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

function isValidUrl(u) { try { const x = new URL(u); return x.protocol==='http:'||x.protocol==='https:'; } catch { return false; } }

const MetaAnalyzerTool = () => {
  const [url, setUrl] = useState('https://thetoolguru.com');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const canSubmit = useMemo(() => isValidUrl(url), [url]);

  const run = async () => {
    setLoading(true); setError(''); setData(null);
    try {
      const u = new URL('/api/meta', window.location.origin);
      u.searchParams.set('url', url.trim());
      const resp = await fetch(u);
      const json = await resp.json();
      if (!resp.ok) throw new Error(json.error || 'Failed');
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const warnings = useMemo(() => {
    if (!data?.meta) return [];
    const w = [];
    if (!data.meta.title) w.push('Missing <title>');
    if (!data.meta.description) w.push('Missing meta description');
    if (data.meta.description && data.meta.description.length > 160) w.push('Meta description is long (>160 chars)');
    if (!data.meta.og['title']) w.push('Missing Open Graph og:title');
    if (!data.meta.og['description']) w.push('Missing Open Graph og:description');
    if (!data.meta.twitter['card']) w.push('Missing Twitter card');
    if (!data.meta.canonical) w.push('Missing canonical link');
    return w;
  }, [data]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Meta Tags & Open Graph Analyzer</h1>
      <p className="text-gray-600 mb-6">Extract and validate SEO meta tags, Open Graph, Twitter card, and canonical link.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <Input label="URL" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://thetoolguru.com/page" />
        <div className="flex items-end">
          <Button onClick={run} disabled={!canSubmit || loading}>{loading ? 'Analyzing…' : 'Analyze'}</Button>
        </div>
      </div>
      {error && (<div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm mb-4">{error}</div>)}

      {data && (
        <div className="space-y-4">
          {warnings.length > 0 && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-900">
              <div className="font-semibold mb-1">Suggestions</div>
              <ul className="list-disc pl-5">
                {warnings.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600">Title</div>
              <div className="font-medium text-gray-900">{data.meta.title || '—'}</div>
            </div>
            <div className="p-4 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600">Meta Description</div>
              <div className="text-gray-900 text-sm">{data.meta.description || '—'}</div>
            </div>
            <div className="p-4 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600">Canonical</div>
              <div className="text-gray-900 text-sm break-all">{data.meta.canonical || '—'}</div>
            </div>
            <div className="p-4 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600">Robots</div>
              <div className="text-gray-900 text-sm">{data.meta.robots || '—'}</div>
            </div>
          </div>

          <div className="p-4 bg-white border rounded">
            <div className="text-sm font-semibold text-gray-900 mb-2">Open Graph</div>
            <pre className="text-sm text-gray-900 whitespace-pre-wrap break-words">{JSON.stringify(data.meta.og, null, 2)}</pre>
          </div>

          <div className="p-4 bg-white border rounded">
            <div className="text-sm font-semibold text-gray-900 mb-2">Twitter</div>
            <pre className="text-sm text-gray-900 whitespace-pre-wrap break-words">{JSON.stringify(data.meta.twitter, null, 2)}</pre>
          </div>

          {data.meta.icons?.length > 0 && (
            <div className="p-4 bg-white border rounded">
              <div className="text-sm font-semibold text-gray-900 mb-2">Icons</div>
              <ul className="text-sm text-gray-900 break-all list-disc pl-5">
                {data.meta.icons.map((i, idx) => <li key={idx}>{i}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MetaAnalyzerTool;


