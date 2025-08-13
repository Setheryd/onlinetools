"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

const UNITS = [
  { id: 'B', name: 'Bytes', factor: 1 },
  { id: 'KB', name: 'Kilobytes', factor: 1024 },
  { id: 'MB', name: 'Megabytes', factor: 1024 ** 2 },
  { id: 'GB', name: 'Gigabytes', factor: 1024 ** 3 },
  { id: 'TB', name: 'Terabytes', factor: 1024 ** 4 },
];

function formatNumber(n) {
  return Number.isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: 6 }) : '';
}

const FileSizeConverterTool = () => {
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('MB');
  const [error, setError] = useState('');

  const bytes = useMemo(() => {
    const num = Number(value);
    if (!value || !Number.isFinite(num)) return null;
    return num * (UNITS.find(u => u.id === unit)?.factor || 1);
  }, [value, unit]);

  const conversions = useMemo(() => {
    if (bytes == null) return [];
    return UNITS.map(u => ({ unit: u.id, value: bytes / u.factor }));
  }, [bytes]);

  const handleClear = () => {
    setValue('');
    setError('');
  };

  const handleCopy = async () => {
    if (!conversions.length) return;
    const text = conversions.map(c => `${formatNumber(c.value)} ${c.unit}`).join('\n');
    try { await navigator.clipboard.writeText(text); } catch {}
  };

  const validate = () => {
    const num = Number(value);
    if (value && !Number.isFinite(num)) setError('Enter a valid number.');
    else setError('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">File Size Converter</h1>
            <p className="text-gray-600">Convert between Bytes, KB, MB, GB, and TB.</p>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Examples</label>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => { setValue('1'); setUnit('GB'); }}>1 GB</Button>
          <Button variant="outline" size="sm" onClick={() => { setValue('1024'); setUnit('KB'); }}>1024 KB</Button>
          <Button variant="outline" size="sm" onClick={() => { setValue('0.5'); setUnit('TB'); }}>0.5 TB</Button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
          <input
            type="text"
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={validate}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900"
            placeholder="e.g. 1.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
          >
            {UNITS.map(u => (
              <option key={u.id} value={u.id}>{u.name} ({u.id})</option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <Button onClick={handleCopy} disabled={!conversions.length}>
            Copy results
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {conversions.length > 0 && (
        <div className="mb-6 grid grid-cols-2 md:grid-cols-5 gap-3">
          {conversions.map(c => (
            <div key={c.unit} className="p-3 bg-gray-50 border border-gray-200 rounded-md">
              <div className="text-xs text-gray-500">{c.unit}</div>
              <div className="text-lg font-semibold text-gray-900">{formatNumber(c.value)}</div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Binary units</h3>
        <p className="text-sm text-blue-700">This tool uses binary prefixes: 1 KB = 1024 B, 1 MB = 1024 KB, and so on.</p>
      </div>
    </div>
  );
};

export default FileSizeConverterTool;


