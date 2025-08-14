"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

function isLikelyDomain(value) {
  const v = value.trim();
  return /^[a-z0-9.-]+$/i.test(v) && v.includes('.') && !v.startsWith('.') && !v.endsWith('.');
}

const WhoisLookupTool = () => {
  const [domain, setDomain] = useState('example.com');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [showRaw, setShowRaw] = useState(false);

  const canSubmit = useMemo(() => isLikelyDomain(domain), [domain]);

  const run = async () => {
    setLoading(true); setError(''); setData(null);
    try {
      const u = new URL('/api/whois', window.location.origin);
      u.searchParams.set('domain', domain.trim());
      const resp = await fetch(u);
      const json = await resp.json();
      if (!resp.ok) throw new Error(json.error || 'Lookup failed');
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">WHOIS Lookup</h1>
      <p className="text-gray-600 mb-6">Query domain registration and expiry information via WHOIS.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <Input label="Domain" value={domain} onChange={e=>setDomain(e.target.value)} placeholder="example.com" />
        <div className="flex items-end gap-2">
          <Button onClick={run} disabled={!canSubmit || loading}>{loading ? 'Looking up…' : 'Lookup'}</Button>
          {data && <Button variant="outline" onClick={()=>setShowRaw(v=>!v)}>{showRaw ? 'Hide raw' : 'Show raw'}</Button>}
        </div>
      </div>

      {error && (<div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm mb-4">{error}</div>)}

      {data && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600">Registrar</div>
              <div className="font-medium text-gray-900 break-words">{data.fields['registrar'] || data.fields['registrar name'] || '—'}</div>
            </div>
            <div className="p-3 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600">Creation Date</div>
              <div className="font-medium text-gray-900">{data.fields['creation date'] || data.fields['created'] || '—'}</div>
            </div>
            <div className="p-3 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600">Expiry Date</div>
              <div className="font-medium text-gray-900">{data.fields['registry expiry date'] || data.fields['paid-till'] || data.fields['expiry date'] || '—'}</div>
            </div>
          </div>

          {!showRaw && (
            <div className="p-4 bg-white border rounded">
              <div className="text-sm font-semibold text-gray-900 mb-2">Key Fields</div>
              <pre className="text-sm text-gray-900 whitespace-pre-wrap break-words">{JSON.stringify(data.fields, null, 2)}</pre>
            </div>
          )}

          {showRaw && (
            <div className="p-4 bg-white border rounded">
              <div className="text-sm font-semibold text-gray-900 mb-2">Raw WHOIS</div>
              <pre className="text-xs text-gray-800 whitespace-pre-wrap break-words">{data.raw}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WhoisLookupTool;


