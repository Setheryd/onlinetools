'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const PingTool = () => {
  const [host, setHost] = useState('google.com');
  const [port, setPort] = useState('');
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
      if (port.trim() !== '') params.set('port', port.trim());
      const res = await fetch(`/api/ping?${params}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Ping failed');
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const reachable = data && (data.reachable === true || data.ok === true || data.success === true);
  const latencyMs = data && (data.latency_ms ?? data.time_ms ?? data.latency ?? data.ping_ms);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Ping & Port Check</h1>
      <p className="text-gray-600 mb-6">
        Check if a host is reachable and measure latency. Optionally specify a port for TCP port checks. Runs server-side so it works from anywhere.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <Input
          label="Host"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          placeholder="example.com or 192.168.1.1"
        />
        <Input
          label="Port (optional)"
          type="text"
          inputMode="numeric"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          placeholder="80, 443, 22..."
        />
        <div className="flex items-end">
          <Button onClick={run} disabled={!host.trim() || loading}>
            {loading ? 'Checking…' : 'Ping'}
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
          <div className={`p-4 rounded-lg border ${reachable ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center gap-3">
              <span className={`text-2xl ${reachable ? 'text-green-600' : 'text-red-600'}`}>
                {reachable ? '✓' : '✗'}
              </span>
              <div>
                <div className="font-semibold text-gray-900">
                  {reachable ? 'Reachable' : 'Not reachable'}
                </div>
                {typeof latencyMs === 'number' && (
                  <div className="text-sm text-gray-700">
                    Latency: <span className="font-medium">{latencyMs} ms</span>
                  </div>
                )}
                {data.message && (
                  <div className="text-sm text-gray-600 mt-1">{data.message}</div>
                )}
              </div>
            </div>
          </div>

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

export default PingTool;
