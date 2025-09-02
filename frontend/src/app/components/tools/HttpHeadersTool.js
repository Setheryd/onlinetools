"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

function isValidUrl(u) {
  try { const x = new URL(u); return x.protocol === 'http:' || x.protocol === 'https:'; } catch { return false; }
}

const HttpHeadersTool = ({
  title = 'HTTP Headers Checker',
  description = 'Inspect response headers and follow redirects to see each hop.',
  mode = 'headers'
}) => {
  const [url, setUrl] = useState('https://thetoolguru.com');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [showChain, setShowChain] = useState(false);
  const [expanded, setExpanded] = useState({});

  const canSubmit = useMemo(() => isValidUrl(url), [url]);

  const run = async () => {
    setLoading(true); setError(''); setData(null);
    try {
      const u = new URL('/api/http', window.location.origin);
      u.searchParams.set('url', url.trim());
      u.searchParams.set('maxRedirects', '10');
      const resp = await fetch(u);
      const json = await resp.json();
      if (!resp.ok) throw new Error(json.error || 'Request failed');
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const chain = data?.chain || [];
  const finalHop = chain.length ? chain[chain.length - 1] : null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <Input label="URL" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://thetoolguru.com" />
        <div className="flex items-end">
          <Button onClick={run} disabled={!canSubmit || loading}>{loading ? 'Fetching…' : 'Fetch'}</Button>
        </div>
      </div>

      {error && (<div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm mb-4">{error}</div>)}

      {data && mode === 'headers' && finalHop && (
        <div className="space-y-4">
          <div className="text-sm text-gray-700">Total time: <span className="font-semibold text-gray-900">{data.totalMs} ms</span></div>
          <div className="border rounded">
            <div className={`flex items-center justify-between px-4 py-2 ${finalHop.status >= 300 && finalHop.status < 400 ? 'bg-yellow-50' : finalHop.status >= 400 ? 'bg-red-50' : 'bg-gray-50'}`}>
              <div className="text-sm text-gray-700 truncate">{finalHop.url}</div>
              <div className="text-sm font-semibold text-gray-900">{finalHop.status} {finalHop.statusText} • {finalHop.durationMs} ms</div>
            </div>
            <div className="p-4">
              <div className="text-sm font-semibold text-gray-900 mb-2">Final Response Headers</div>
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(finalHop.headers).map(([k,v]) => (
                      <tr key={k} className="border-b last:border-b-0">
                        <td className="py-1 pr-3 text-gray-600 whitespace-nowrap">{k}</td>
                        <td className="py-1 text-gray-900 break-all">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {chain.length > 1 && (
            <div className="mt-2">
              <Button variant="outline" size="sm" onClick={()=>setShowChain(v=>!v)}>{showChain ? 'Hide' : 'Show'} redirect chain ({chain.length - 1})</Button>
              {showChain && (
                <div className="mt-3 space-y-2">
                  {chain.slice(0, -1).map((hop, idx) => (
                    <div key={idx} className={`flex items-center justify-between px-4 py-2 rounded border ${hop.status >= 300 && hop.status < 400 ? 'bg-yellow-50 border-yellow-200' : hop.status >= 400 ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="text-xs text-gray-700 truncate">{hop.url}</div>
                      <div className="text-xs font-semibold text-gray-900">{hop.status} {hop.statusText}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {data && mode === 'redirects' && (
        <div className="space-y-4">
          <div className="text-sm text-gray-700">Total time: <span className="font-semibold text-gray-900">{data.totalMs} ms</span></div>
          {chain.map((hop, idx) => (
            <div key={idx} className="border rounded">
              <div className={`flex items-center justify-between px-4 py-2 ${hop.status >= 300 && hop.status < 400 ? 'bg-yellow-50' : hop.status >= 400 ? 'bg-red-50' : 'bg-gray-50'}`}>
                <div className="text-sm text-gray-700 truncate">{idx+1}. {hop.url}</div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" onClick={()=>setExpanded(prev=>({ ...prev, [idx]: !prev[idx] }))}>{expanded[idx] ? 'Hide headers' : 'Show headers'}</Button>
                  <div className="text-sm font-semibold text-gray-900">{hop.status} {hop.statusText} • {hop.durationMs} ms</div>
                </div>
              </div>
              {expanded[idx] && (
                <div className="p-4">
                  <div className="text-sm font-semibold text-gray-900 mb-2">Headers</div>
                  <div className="overflow-auto">
                    <table className="w-full text-sm">
                      <tbody>
                        {Object.entries(hop.headers).map(([k,v]) => (
                          <tr key={k} className="border-b last:border-b-0">
                            <td className="py-1 pr-3 text-gray-600 whitespace-nowrap">{k}</td>
                            <td className="py-1 text-gray-900 break-all">{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HttpHeadersTool;


