"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

function isValidSite(u) { try { const x = new URL(u); return x.protocol==='http:'||x.protocol==='https:'; } catch { return false; } }

const RobotsTesterTool = () => {
  const [site, setSite] = useState('https://thetool.guru');
  const [path, setPath] = useState('/');
  const [ua, setUa] = useState('*');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const canSubmit = useMemo(() => isValidSite(site) && path.startsWith('/'), [site, path]);

  const run = async () => {
    setLoading(true); setError(''); setData(null);
    try {
      const u = new URL('/api/robots', window.location.origin);
      u.searchParams.set('site', site.trim());
      u.searchParams.set('path', path.trim() || '/');
      u.searchParams.set('ua', ua.trim() || '*');
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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Robots.txt & Sitemap Tester</h1>
      <p className="text-gray-600 mb-6">Check if a specific path is allowed for a given user-agent. Fetch and display the robots.txt.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <Input label="Site" value={site} onChange={e=>setSite(e.target.value)} placeholder="https://thetool.guru" />
        <Input label="Path" value={path} onChange={e=>setPath(e.target.value)} placeholder="/blog" />
        <Input label="User-Agent" value={ua} onChange={e=>setUa(e.target.value)} placeholder="*" />
      </div>
      <div className="mb-4">
        <Button onClick={run} disabled={!canSubmit || loading}>{loading ? 'Checking…' : 'Check'}</Button>
      </div>
      {error && (<div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm mb-4">{error}</div>)}

      {data && (
        <div className="space-y-4">
          <div className={`p-3 border rounded ${data.allowed ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900'}`}>
            {data.allowed ? 'Allowed' : 'Disallowed'} for user-agent "{data.ua}" on path {data.path}
          </div>
          <div className="p-4 bg-white border rounded">
            <div className="text-sm font-semibold text-gray-900 mb-2">robots.txt ({data.status})</div>
            <pre className="text-xs text-gray-800 whitespace-pre-wrap break-words max-h-96 overflow-auto">{data.robotsTxt}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default RobotsTesterTool;


