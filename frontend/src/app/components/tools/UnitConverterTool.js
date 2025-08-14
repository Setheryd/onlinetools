"use client";
import React, { useMemo, useState } from 'react';

const UNIT_CATEGORIES = {
  length: {
    label: 'Length',
    units: {
      m: { label: 'Meters', toBase: v => v, fromBase: v => v },
      km: { label: 'Kilometers', toBase: v => v * 1000, fromBase: v => v / 1000 },
      cm: { label: 'Centimeters', toBase: v => v / 100, fromBase: v => v * 100 },
      mm: { label: 'Millimeters', toBase: v => v / 1000, fromBase: v => v * 1000 },
      in: { label: 'Inches', toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
      ft: { label: 'Feet', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
      yd: { label: 'Yards', toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
      mi: { label: 'Miles', toBase: v => v * 1609.344, fromBase: v => v / 1609.344 },
    },
    base: 'm'
  },
  weight: {
    label: 'Weight',
    units: {
      g: { label: 'Grams', toBase: v => v / 1000, fromBase: v => v * 1000 },
      kg: { label: 'Kilograms', toBase: v => v, fromBase: v => v },
      lb: { label: 'Pounds', toBase: v => v * 0.45359237, fromBase: v => v / 0.45359237 },
      oz: { label: 'Ounces', toBase: v => v * 0.028349523125, fromBase: v => v / 0.028349523125 },
      st: { label: 'Stone', toBase: v => v * 6.35029318, fromBase: v => v / 6.35029318 },
    },
    base: 'kg'
  },
  temperature: {
    label: 'Temperature',
    units: {
      C: { label: 'Celsius', toBase: v => v, fromBase: v => v },
      F: { label: 'Fahrenheit', toBase: v => (v - 32) * 5/9, fromBase: v => v * 9/5 + 32 },
      K: { label: 'Kelvin', toBase: v => v - 273.15, fromBase: v => v + 273.15 },
    },
    base: 'C'
  },
  volume: {
    label: 'Volume',
    units: {
      ml: { label: 'Milliliters', toBase: v => v / 1000, fromBase: v => v * 1000 },
      l: { label: 'Liters', toBase: v => v, fromBase: v => v },
      cup: { label: 'Cups', toBase: v => v * 0.2365882365, fromBase: v => v / 0.2365882365 },
      pt: { label: 'Pints', toBase: v => v * 0.473176473, fromBase: v => v / 0.473176473 },
      qt: { label: 'Quarts', toBase: v => v * 0.946352946, fromBase: v => v / 0.946352946 },
      gal: { label: 'Gallons', toBase: v => v * 3.785411784, fromBase: v => v / 3.785411784 },
    },
    base: 'l'
  },
  speed: {
    label: 'Speed',
    units: {
      'm/s': { label: 'Meters/second', toBase: v => v, fromBase: v => v },
      'km/h': { label: 'Kilometers/hour', toBase: v => v / 3.6, fromBase: v => v * 3.6 },
      'mph': { label: 'Miles/hour', toBase: v => v * 0.44704, fromBase: v => v / 0.44704 },
      'knot': { label: 'Knots', toBase: v => v * 0.514444, fromBase: v => v / 0.514444 },
    },
    base: 'm/s'
  },
  area: {
    label: 'Area',
    units: {
      'm²': { label: 'Square meters', toBase: v => v, fromBase: v => v },
      'km²': { label: 'Square kilometers', toBase: v => v * 1_000_000, fromBase: v => v / 1_000_000 },
      'cm²': { label: 'Square centimeters', toBase: v => v / 10_000, fromBase: v => v * 10_000 },
      'mm²': { label: 'Square millimeters', toBase: v => v / 1_000_000, fromBase: v => v * 1_000_000 },
      'ft²': { label: 'Square feet', toBase: v => v * 0.09290304, fromBase: v => v / 0.09290304 },
      'yd²': { label: 'Square yards', toBase: v => v * 0.83612736, fromBase: v => v / 0.83612736 },
      'acre': { label: 'Acres', toBase: v => v * 4046.8564224, fromBase: v => v / 4046.8564224 },
      'hectare': { label: 'Hectares', toBase: v => v * 10_000, fromBase: v => v / 10_000 },
    },
    base: 'm²'
  },
  pressure: {
    label: 'Pressure',
    units: {
      Pa: { label: 'Pascal', toBase: v => v, fromBase: v => v },
      kPa: { label: 'Kilopascal', toBase: v => v * 1000, fromBase: v => v / 1000 },
      bar: { label: 'Bar', toBase: v => v * 100000, fromBase: v => v / 100000 },
      atm: { label: 'Atmosphere', toBase: v => v * 101325, fromBase: v => v / 101325 },
      psi: { label: 'PSI', toBase: v => v * 6894.757293168, fromBase: v => v / 6894.757293168 },
    },
    base: 'Pa'
  },
  energy: {
    label: 'Energy',
    units: {
      J: { label: 'Joule', toBase: v => v, fromBase: v => v },
      kJ: { label: 'Kilojoule', toBase: v => v * 1000, fromBase: v => v / 1000 },
      Wh: { label: 'Watt-hour', toBase: v => v * 3600, fromBase: v => v / 3600 },
      kWh: { label: 'Kilowatt-hour', toBase: v => v * 3_600_000, fromBase: v => v / 3_600_000 },
      cal: { label: 'Calorie', toBase: v => v * 4.184, fromBase: v => v / 4.184 },
      kcal: { label: 'Kilocalorie', toBase: v => v * 4184, fromBase: v => v / 4184 },
    },
    base: 'J'
  },
  power: {
    label: 'Power',
    units: {
      W: { label: 'Watt', toBase: v => v, fromBase: v => v },
      kW: { label: 'Kilowatt', toBase: v => v * 1000, fromBase: v => v / 1000 },
      hp: { label: 'Horsepower (mechanical)', toBase: v => v * 745.699871582, fromBase: v => v / 745.699871582 },
    },
    base: 'W'
  },
};

const UnitConverterTool = () => {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [value, setValue] = useState(1);

  const current = UNIT_CATEGORIES[category];

  const units = useMemo(() => Object.keys(current.units), [current]);

  const converted = useMemo(() => {
    const num = Number(value);
    if (!isFinite(num)) return null;
    const toBase = current.units[fromUnit].toBase;
    const fromBase = current.units[toUnit].fromBase;
    const inBase = toBase(num);
    return fromBase(inBase);
  }, [value, current, fromUnit, toUnit]);

  const onCategoryChange = (id) => {
    setCategory(id);
    const first = Object.keys(UNIT_CATEGORIES[id].units)[0];
    const second = Object.keys(UNIT_CATEGORIES[id].units)[1] || first;
    setFromUnit(first);
    setToUnit(second);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Unit Converter</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="md:col-span-1">
          <label className="block text-sm text-gray-700 mb-1">Category</label>
          <select value={category} onChange={(e)=>onCategoryChange(e.target.value)} className="w-full px-3 py-2 border rounded text-sm">
            {Object.entries(UNIT_CATEGORIES).map(([id, cfg]) => (
              <option key={id} value={id}>{cfg.label}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm text-gray-700 mb-1">From</label>
          <select value={fromUnit} onChange={(e)=>setFromUnit(e.target.value)} className="w-full px-3 py-2 border rounded text-sm">
            {units.map(u => (
              <option key={u} value={u}>{current.units[u].label} ({u})</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm text-gray-700 mb-1">To</label>
          <select value={toUnit} onChange={(e)=>setToUnit(e.target.value)} className="w-full px-3 py-2 border rounded text-sm">
            {units.map(u => (
              <option key={u} value={u}>{current.units[u].label} ({u})</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm text-gray-700 mb-1">Value</label>
          <input type="number" step="any" value={value} onChange={(e)=>setValue(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border rounded">
        <div className="text-sm text-gray-600">Result</div>
        <div className="text-2xl font-semibold text-gray-900">
          {converted != null ? converted.toLocaleString(undefined, { maximumFractionDigits: 8 }) : '—'}
        </div>
      </div>
    </div>
  );
};

export default UnitConverterTool;


