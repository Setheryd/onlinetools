"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

const UNITS = [
  { id: 'w', name: 'Watts (W)', toW: 1 },
  { id: 'kw', name: 'Kilowatts (kW)', toW: 1000 },
  { id: 'mw', name: 'Megawatts (MW)', toW: 1_000_000 },
  { id: 'hp', name: 'Horsepower (hp)', toW: 745.6998715822702 },
  { id: 'dbm', name: 'dBm', toW: null },
];

function dbmToW(dbm) { return Math.pow(10, dbm / 10) / 1000; }
function wToDbm(w) { return 10 * Math.log10(w * 1000); }

function convertPower(value, fromId, toId) {
  // Convert to Watts
  let watts;
  if (fromId === 'dbm') {
    watts = dbmToW(value);
  } else {
    const from = UNITS.find(u => u.id === fromId);
    if (!from) return NaN;
    watts = value * from.toW;
  }
  // Convert from Watts to target
  if (toId === 'dbm') return wToDbm(watts);
  const to = UNITS.find(u => u.id === toId);
  if (!to) return NaN;
  return watts / to.toW;
}

const PowerConverterTool = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kw');
  const [toUnit, setToUnit] = useState('hp');
  const [precision, setPrecision] = useState(4);

  const output = useMemo(() => {
    if (value === '' || isNaN(Number(value))) return '';
    const res = convertPower(Number(value), fromUnit, toUnit);
    return Number.isFinite(res) ? res.toFixed(precision) : '';
  }, [value, fromUnit, toUnit, precision]);

  const handleSwap = () => { const f = fromUnit; setFromUnit(toUnit); setToUnit(f); };
  const handleCopy = async () => { if (!output) return; try { await navigator.clipboard.writeText(output); } catch {} };
  const clearAll = () => { setValue(''); };
  const loadExample = (v, f, t) => { setValue(String(v)); setFromUnit(f); setToUnit(t); };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Power Converter</h1>
            <p className="text-gray-600">Convert between Watts, kW, MW, horsepower, and dBm.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSwap}>Swap</Button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Examples</label>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => loadExample(1, 'kw', 'hp')}>1 kW → hp</Button>
          <Button variant="outline" size="sm" onClick={() => loadExample(0.5, 'hp', 'w')}>0.5 hp → W</Button>
          <Button variant="outline" size="sm" onClick={() => loadExample(30, 'dbm', 'mw')}>30 dBm → mW</Button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="e.g. 1.5" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900">
            {UNITS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900">
            {UNITS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <label className="text-sm text-gray-700">Precision:</label>
        <select value={precision} onChange={(e) => setPrecision(Number(e.target.value))} className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-800">
          {[0,1,2,3,4,5,6].map(p => <option key={p} value={p}>{p} decimals</option>)}
        </select>
      </div>

      {output !== '' && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Result</label>
            <Button variant="outline" size="sm" onClick={handleCopy}>Copy</Button>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <pre className="whitespace-pre-wrap break-all text-sm text-gray-800">{output}</pre>
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-3">
        <Button onClick={() => {}} disabled>Convert</Button>
        <Button variant="outline" onClick={clearAll}>Clear</Button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">About Power Conversion</h3>
        <p className="text-sm text-blue-700">Includes engineering units like horsepower and dBm. dBm conversions assume 1 mW = 0 dBm.</p>
      </div>
    </div>
  );
};

export default PowerConverterTool;


