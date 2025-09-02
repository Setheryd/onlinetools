"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

function isLikelyHost(value) {
  const v = value.trim();
  return /^[a-z0-9.-]+$/i.test(v) && v.includes('.') && !v.startsWith('.') && !v.endsWith('.');
}

const SslCheckerTool = () => {
  const [host, setHost] = useState('thetool.guru');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const canSubmit = useMemo(() => isLikelyHost(host), [host]);

  const onCheck = async () => {
    setLoading(true); setError(''); setData(null);
    try {
      const u = new URL('/api/ssl', window.location.origin);
      u.searchParams.set('host', host.trim());
      const resp = await fetch(u);
      const json = await resp.json();
      if (!resp.ok) throw new Error(json.error || 'Failed to fetch');
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">SSL Certificate Checker</h1>
      <p className="text-gray-600 mb-6">Inspect certificate details, issuer, SANs, and expiry.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <Input label="Hostname" value={host} onChange={e=>setHost(e.target.value)} placeholder="thetool.guru" />
        <div className="flex items-end">
          <Button onClick={onCheck} disabled={!canSubmit || loading}>{loading ? 'Checking…' : 'Check'}</Button>
        </div>
      </div>

      {error && (<div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm mb-4">{error}</div>)}

      {data && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-3 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600">Issuer</div>
              <div className="font-medium text-gray-900 break-all">{data.issuer?.CN || data.issuer?.commonName || JSON.stringify(data.issuer)}</div>
            </div>
            <div className="p-3 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600">Valid From</div>
              <div className="font-medium text-gray-900">{data.valid_from}</div>
            </div>
            <div className="p-3 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600">Valid To</div>
              <div className="font-medium text-gray-900">{data.valid_to}</div>
            </div>
            <div className="p-3 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600">Days to expiry</div>
              <div className="font-medium text-gray-900">{data.daysToExpiry}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600">Protocol</div>
              <div className="font-medium text-gray-900">{data.protocol}</div>
            </div>
            <div className="p-3 bg-gray-50 border rounded min-w-0">
              <div className="text-xs text-gray-600">Cipher</div>
              <div className="font-medium text-gray-900 break-all">{data.cipher?.name || (data.cipher ? JSON.stringify(data.cipher) : '—')}</div>
            </div>
            <div className="p-3 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600">Query time</div>
              <div className="font-medium text-gray-900">{data.durationMs} ms</div>
            </div>
          </div>

          <div className="p-4 bg-white border rounded">
            <div className="text-sm font-semibold text-gray-900 mb-2">Subject</div>
            <pre className="text-sm text-gray-900 whitespace-pre-wrap break-all max-h-64 overflow-auto">{JSON.stringify(data.subject, null, 2)}</pre>
          </div>

          {data.altNames && (
            <div className="p-4 bg-white border rounded">
              <div className="text-sm font-semibold text-gray-900 mb-2">Subject Alternative Names</div>
              <div className="flex flex-wrap gap-2">
                {String(data.altNames)
                  .split(/,\s*/)
                  .filter(Boolean)
                  .map((san, i) => (
                    <span key={i} className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs border border-gray-200 break-all">{san}</span>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SslCheckerTool;


