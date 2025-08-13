"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

const COMMON_TZS = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Berlin',
  'Europe/Paris',
  'Asia/Kolkata',
  'Asia/Tokyo',
  'Australia/Sydney',
];

function convertDateBetweenTimeZones(date, fromTZ, toTZ) {
  // date is ISO-like string in fromTZ; we will interpret it as local in fromTZ then format in toTZ
  try {
    const from = new Date(date);
    if (Number.isNaN(from.getTime())) return '';
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: toTZ,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false,
    });
    // Hack to get components by formatting parts
    const parts = fmt.formatToParts(from).reduce((acc, p) => { acc[p.type] = p.value; return acc; }, {});
    return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`;
  } catch {
    return '';
  }
}

const TimeZoneConverterTool = () => {
  const [input, setInput] = useState('');
  const [fromTZ, setFromTZ] = useState('UTC');
  const [toTZ, setToTZ] = useState('America/New_York');

  const output = useMemo(() => {
    if (!input.trim()) return '';
    return convertDateBetweenTimeZones(input, fromTZ, toTZ);
  }, [input, fromTZ, toTZ]);

  const loadNow = () => {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const isoLocal = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    setInput(isoLocal);
  };

  const swap = () => { const f = fromTZ; setFromTZ(toTZ); setToTZ(f); };
  const copy = async () => { if (!output) return; try { await navigator.clipboard.writeText(output); } catch {} };
  const clear = () => setInput('');

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Time Zone Converter</h1>
            <p className="text-gray-600">Convert a date and time between time zones.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={swap}>Swap</Button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <Button variant="outline" onClick={loadNow}>Load current time</Button>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">From Time Zone</label>
          <select value={fromTZ} onChange={(e) => setFromTZ(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900">
            {COMMON_TZS.map(tz => <option key={tz} value={tz}>{tz}</option>)}
          </select>
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">To Time Zone</label>
          <select value={toTZ} onChange={(e) => setToTZ(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900">
            {COMMON_TZS.map(tz => <option key={tz} value={tz}>{tz}</option>)}
          </select>
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Input (YYYY-MM-DD HH:mm:ss)</label>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="2025-01-31 13:45:00" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" />
        </div>
      </div>

      {output && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Converted Time</label>
            <Button variant="outline" size="sm" onClick={copy}>Copy</Button>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <pre className="whitespace-pre-wrap break-all text-sm text-gray-800">{output}</pre>
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-3">
        <Button onClick={() => {}} disabled>Convert</Button>
        <Button variant="outline" onClick={clear}>Clear</Button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">About Time Zones</h3>
        <p className="text-sm text-blue-700">This tool uses your browser&apos;s Intl API to convert between time zones. Input format is parsed by the browser Date implementation.</p>
      </div>
    </div>
  );
};

export default TimeZoneConverterTool;


