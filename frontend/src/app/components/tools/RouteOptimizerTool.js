'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Button from '../ui/Button';

// Load map only on client to avoid Turbopack/SSR issues with Leaflet
const RouteMap = dynamic(() => import('./RouteMap'), { ssr: false });

const MIN_ADDRESSES = 2;
const MAX_ADDRESSES = 25;
const ROUTE_OPTIMIZER_TIMEOUT_MS = 90000;

function validateAddresses(addresses) {
  const trimmed = addresses
    .map((a) => (a && typeof a === 'string' ? a.trim() : ''))
    .filter(Boolean);
  if (trimmed.length < MIN_ADDRESSES) return `Add at least ${MIN_ADDRESSES} addresses.`;
  if (trimmed.length > MAX_ADDRESSES) return `Maximum ${MAX_ADDRESSES} addresses.`;
  return null;
}

function formatMiles(meters) {
  if (meters == null) return '—';
  const miles = meters / 1609.344;
  return miles < 0.1 ? '<0.1 mi' : `${miles.toFixed(1)} mi`;
}

function formatMinutes(seconds) {
  if (seconds == null) return '—';
  const min = seconds / 60;
  if (min < 1) return '<1 min';
  return `${Math.round(min)} min`;
}

const RouteOptimizerTool = () => {
  const [addressInput, setAddressInput] = useState('');
  const [roundtrip, setRoundtrip] = useState(false);
  const [startAtFirst, setStartAtFirst] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [rateLimitedUntil, setRateLimitedUntil] = useState(0);

  const addresses = addressInput
    .split(/\n/)
    .map((a) => a.trim())
    .filter(Boolean);
  const validationError = validateAddresses(addresses);
  const isDisabled = loading || !!validationError || (rateLimitedUntil > 0 && Date.now() < rateLimitedUntil);

  const run = async () => {
    const err = validateAddresses(addresses);
    if (err) {
      setError(err);
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ROUTE_OPTIMIZER_TIMEOUT_MS);
    try {
      const res = await fetch('/api/route-optimizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          addresses,
          roundtrip: roundtrip ?? false,
          start_at_first: startAtFirst ?? false,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message = data.error || data.detail || (res.status === 429 ? 'Too many requests. Try again in a minute.' : 'Could not optimize route.');
        setError(message);
        if (res.status === 429) setRateLimitedUntil(Date.now() + 60_000);
        return;
      }
      setResult(data);
    } catch (e) {
      clearTimeout(timeoutId);
      setError(e.name === 'AbortError' ? 'Request timed out. Try fewer addresses or try again.' : (e.message || 'Network error. Try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Route Optimizer</h1>
      <p className="text-gray-600 mb-6">
        Paste 2–25 addresses (one per line). Choose whether to return to the start and whether to fix the first address as your starting point. We’ll return the best visit order and show distance and time between each step, plus a map.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Addresses (one per line)</label>
          <textarea
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            placeholder={"123 Main St, Austin, TX\n456 Oak Ave, Austin, TX\n789 Pine Rd, Austin, TX"}
            rows={8}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            {addresses.length} address{addresses.length !== 1 ? 'es' : ''}. Min {MIN_ADDRESSES}, max {MAX_ADDRESSES}.
          </p>
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={roundtrip}
              onChange={(e) => setRoundtrip(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Return to start (round trip)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={startAtFirst}
              onChange={(e) => setStartAtFirst(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Start at first address (fix start/end)</span>
          </label>
        </div>

        <Button onClick={run} disabled={isDisabled}>
          {loading ? 'Optimizing route…' : 'Optimize route'}
        </Button>
        {loading && (
          <p className="text-sm text-gray-500">This may take up to a minute for many stops.</p>
        )}
        {rateLimitedUntil > 0 && Date.now() < rateLimitedUntil && (
          <p className="text-sm text-amber-700">Rate limited. Try again in a minute.</p>
        )}
      </div>

      {validationError && !loading && addresses.length > 0 && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-sm">
          {validationError}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-8 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Optimized route</h2>

          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm text-gray-600">Total distance</span>
              <p className="text-lg font-semibold text-gray-900">
                {result.total_distance_miles != null ? `${result.total_distance_miles.toFixed(1)} mi` : formatMiles(result.total_distance_meters)}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Total time</span>
              <p className="text-lg font-semibold text-gray-900">
                {result.total_duration_minutes != null ? `${result.total_duration_minutes.toFixed(1)} min` : formatMinutes(result.total_duration_seconds)}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Stop order</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-800">
              {result.ordered_addresses.map((addr, i) => (
                <li key={i} className="pl-1">{addr}</li>
              ))}
            </ol>
          </div>

          {result.legs?.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Legs (distance & time between stops)</h3>
              <ul className="space-y-3">
                {result.legs.map((leg, i) => (
                  <li key={i} className="p-3 border border-gray-200 rounded-lg bg-white">
                    <p className="font-medium text-gray-900">Step {i + 1}: {leg.from_address} → {leg.to_address}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatMiles(leg.distance_meters)} · {formatMinutes(leg.duration_seconds)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Map</h3>
            <RouteMap orderedAddresses={result.ordered_addresses} legs={result.legs} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteOptimizerTool;
