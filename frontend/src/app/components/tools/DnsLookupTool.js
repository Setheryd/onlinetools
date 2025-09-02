"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const RECORD_TYPES = ['A','AAAA','CNAME','MX','NS','TXT','SOA','SRV','PTR'];

function isLikelyDomain(value) {
  const v = value.trim();
  if (!v) return false;
  return /^[a-z0-9.-]+$/i.test(v) && v.includes('.') && !v.startsWith('.') && !v.endsWith('.');
}

const DnsLookupTool = () => {
  const [domain, setDomain] = useState('thetoolguru.com');
  const [type, setType] = useState('A');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const canSubmit = useMemo(() => isLikelyDomain(domain) && RECORD_TYPES.includes(type), [domain, type]);

  const onLookup = async () => {
    setLoading(true); setError(''); setResult(null);
    try {
      const u = new URL('/api/dns', window.location.origin);
      u.searchParams.set('name', domain.trim());
      u.searchParams.set('type', type);
      const resp = await fetch(u);
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Lookup failed');
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">DNS Lookup</h1>
      <p className="text-gray-600 mb-6">Resolve DNS records for a domain. Supports A, AAAA, CNAME, MX, NS, TXT, SOA, SRV, PTR.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <Input label="Domain" value={domain} onChange={e=>setDomain(e.target.value)} placeholder="thetoolguru.com" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Record Type</label>
          <select value={type} onChange={e=>setType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900">
            {RECORD_TYPES.map(rt => <option key={rt} value={rt}>{rt}</option>)}
          </select>
        </div>
        <div className="flex items-end">
          <Button onClick={onLookup} disabled={!canSubmit || loading}>{loading ? 'Looking up…' : 'Lookup'}</Button>
        </div>
      </div>

      {error && (<div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm mb-4">{error}</div>)}

      {result && (
        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="p-3 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600">Name</div>
              <div className="font-medium text-gray-900 break-words">{result.name}</div>
            </div>
            <div className="p-3 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600">Type</div>
              <div className="font-medium text-gray-900">{result.type}</div>
            </div>
            <div className="p-3 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600">Query time</div>
              <div className="font-medium text-gray-900">{result.durationMs} ms</div>
            </div>
          </div>

          <div className="p-4 bg-white border rounded">
            <div className="text-sm font-semibold text-gray-900 mb-2">Records</div>
            <pre className="text-sm text-gray-900 whitespace-pre-wrap break-words">{JSON.stringify(result.records, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default DnsLookupTool;


