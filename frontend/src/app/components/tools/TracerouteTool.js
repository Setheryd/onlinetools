'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const TracerouteTool = () => {
  const [host, setHost] = useState('google.com');
  const [maxHops, setMaxHops] = useState('30');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const run = async () => {
    const h = host.trim();
    if (!h) return;
    setLoading(true);
    setError('');
    setData(null);
    try {
      const params = new URLSearchParams({ host: h });
      if (maxHops.trim() !== '') params.set('max_hops', maxHops.trim());
      const res = await fetch(`/api/traceroute?${params}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Traceroute failed');
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const hops = data && (Array.isArray(data.hops) ? data.hops : data.traceroute || []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Traceroute</h1>
      <p className="text-gray-600 mb-6">
        Trace the network path to a host. See each hop (router) along the way and round-trip times. Runs server-side so it works from anywhere.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <Input
          label="Host"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          placeholder="example.com or 8.8.8.8"
        />
        <Input
          label="Max hops (optional)"
          type="text"
          inputMode="numeric"
          value={maxHops}
          onChange={(e) => setMaxHops(e.target.value)}
          placeholder="30"
        />
        <div className="flex items-end">
          <Button onClick={run} disabled={!host.trim() || loading}>
            {loading ? 'Tracing…' : 'Trace'}
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
          {hops.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">Hop</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">IP</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">Hostname</th>
                    <th className="px-4 py-2 text-right font-medium text-gray-700">RTT (ms)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {hops.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-gray-900">{row.hop ?? i + 1}</td>
                      <td className="px-4 py-2 font-mono text-gray-800">{row.ip ?? row.address ?? '—'}</td>
                      <td className="px-4 py-2 text-gray-700">{row.hostname ?? row.name ?? '—'}</td>
                      <td className="px-4 py-2 text-right text-gray-700">
                        {row.rtt_ms != null ? row.rtt_ms : row.rtt != null ? row.rtt : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : data.message && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
              {data.message}
            </div>
          )}

          {Object.keys(data).length > 0 && (
            <details className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <summary className="cursor-pointer text-sm font-medium text-gray-700">Raw response</summary>
              <pre className="mt-2 text-sm text-gray-900 whitespace-pre-wrap break-words">
                {JSON.stringify(data, null, 2)}
              </pre>
            </details>
          )}
        </div>
      )}
    </div>
  );
};

export default TracerouteTool;
