"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

const AREA_UNITS = [
  { id: 'sqft', name: 'Square feet (ft²)', toSqft: 1 },
  { id: 'sqm', name: 'Square meters (m²)', toSqft: 10.7639 },
  { id: 'sqin', name: 'Square inches (in²)', toSqft: 0.00694444 },
  { id: 'sqyd', name: 'Square yards (yd²)', toSqft: 9 },
  { id: 'acre', name: 'Acres', toSqft: 43560 },
  { id: 'hectare', name: 'Hectares', toSqft: 107639 },
  { id: 'sqcm', name: 'Square centimeters (cm²)', toSqft: 0.00107639 },
  { id: 'sqmm', name: 'Square millimeters (mm²)', toSqft: 0.0000107639 },
];

const VOLUME_UNITS = [
  { id: 'cubicft', name: 'Cubic feet (ft³)', toCubicft: 1 },
  { id: 'cubicm', name: 'Cubic meters (m³)', toCubicft: 35.3147 },
  { id: 'cubicin', name: 'Cubic inches (in³)', toCubicft: 0.000578704 },
  { id: 'cubicyard', name: 'Cubic yards (yd³)', toCubicft: 27 },
  { id: 'liter', name: 'Liters (L)', toCubicft: 0.0353147 },
  { id: 'gallon', name: 'Gallons (gal)', toCubicft: 0.133681 },
  { id: 'cubiccm', name: 'Cubic centimeters (cm³)', toCubicft: 0.0000353147 },
  { id: 'cubicmm', name: 'Cubic millimeters (mm³)', toCubicft: 0.0000000353147 },
];

const PRICE_UNITS = [
  { id: 'per_sqft', name: 'per square foot ($/ft²)', baseUnit: 'sqft' },
  { id: 'per_sqm', name: 'per square meter ($/m²)', baseUnit: 'sqm' },
  { id: 'per_sqin', name: 'per square inch ($/in²)', baseUnit: 'sqin' },
  { id: 'per_sqyd', name: 'per square yard ($/yd²)', baseUnit: 'sqyd' },
  { id: 'per_acre', name: 'per acre ($/acre)', baseUnit: 'acre' },
  { id: 'per_hectare', name: 'per hectare ($/ha)', baseUnit: 'hectare' },
  { id: 'per_cubicft', name: 'per cubic foot ($/ft³)', baseUnit: 'cubicft' },
  { id: 'per_cubicm', name: 'per cubic meter ($/m³)', baseUnit: 'cubicm' },
  { id: 'per_cubicin', name: 'per cubic inch ($/in³)', baseUnit: 'cubicin' },
  { id: 'per_cubicyard', name: 'per cubic yard ($/yd³)', baseUnit: 'cubicyard' },
  { id: 'per_liter', name: 'per liter ($/L)', baseUnit: 'liter' },
  { id: 'per_gallon', name: 'per gallon ($/gal)', baseUnit: 'gallon' },
];

function convertArea(value, fromId, toId) {
  const from = AREA_UNITS.find(u => u.id === fromId);
  const to = AREA_UNITS.find(u => u.id === toId);
  if (!from || !to) return NaN;
  const sqft = value * from.toSqft;
  return sqft / to.toSqft;
}

function convertVolume(value, fromId, toId) {
  const from = VOLUME_UNITS.find(u => u.id === fromId);
  const to = VOLUME_UNITS.find(u => u.id === toId);
  if (!from || !to) return NaN;
  const cubicft = value * from.toCubicft;
  return cubicft / to.toCubicft;
}

function calculatePrice(dimensions, pricePerUnit, priceUnitId, calculationType) {
  if (!dimensions || dimensions.length === 0 || !pricePerUnit || !priceUnitId) return null;
  
  const priceUnit = PRICE_UNITS.find(u => u.id === priceUnitId);
  if (!priceUnit) return null;

  let totalArea = 1;
  let totalVolume = 1;

  if (calculationType === 'area') {
    // For area calculations, multiply all dimensions
    totalArea = dimensions.reduce((acc, dim) => {
      if (dim.unit.startsWith('sq')) {
        // Already an area unit
        return acc * convertArea(dim.value, dim.unit, priceUnit.baseUnit);
      } else {
        // Linear unit, convert to area
        const linearValue = dim.value;
        const linearUnit = dim.unit;
        // Convert to feet first, then square it
        let feetValue;
        if (linearUnit === 'ft') feetValue = linearValue;
        else if (linearUnit === 'm') feetValue = linearValue * 3.28084;
        else if (linearUnit === 'in') feetValue = linearValue / 12;
        else if (linearUnit === 'yd') feetValue = linearValue * 3;
        else if (linearUnit === 'cm') feetValue = linearValue * 0.0328084;
        else if (linearUnit === 'mm') feetValue = linearValue * 0.00328084;
        else feetValue = linearValue; // Default to feet
        
        return acc * feetValue;
      }
    }, 1);
    
    // Convert to the price unit's base unit
    totalArea = convertArea(totalArea, 'sqft', priceUnit.baseUnit);
    return totalArea * pricePerUnit;
  } else {
    // For volume calculations, multiply all dimensions
    totalVolume = dimensions.reduce((acc, dim) => {
      if (dim.unit.startsWith('cubic')) {
        // Already a volume unit
        return acc * convertVolume(dim.value, dim.unit, priceUnit.baseUnit);
      } else if (dim.unit.startsWith('sq')) {
        // Area unit, treat as height = 1
        return acc * convertArea(dim.value, dim.unit, 'sqft');
      } else {
        // Linear unit, convert to cubic feet
        let feetValue;
        if (dim.unit === 'ft') feetValue = dim.value;
        else if (dim.unit === 'm') feetValue = dim.value * 3.28084;
        else if (dim.unit === 'in') feetValue = dim.value / 12;
        else if (dim.unit === 'yd') feetValue = dim.value * 3;
        else if (dim.unit === 'cm') feetValue = dim.value * 0.0328084;
        else if (dim.unit === 'mm') feetValue = dim.value * 0.00328084;
        else feetValue = dim.value; // Default to feet
        
        return acc * feetValue;
      }
    }, 1);
    
    // Convert to the price unit's base unit
    totalVolume = convertVolume(totalVolume, 'cubicft', priceUnit.baseUnit);
    return totalVolume * pricePerUnit;
  }
}

const LINEAR_UNITS = [
  { id: 'ft', name: 'Feet (ft)' },
  { id: 'm', name: 'Meters (m)' },
  { id: 'in', name: 'Inches (in)' },
  { id: 'yd', name: 'Yards (yd)' },
  { id: 'cm', name: 'Centimeters (cm)' },
  { id: 'mm', name: 'Millimeters (mm)' },
];

const SquareUnitPriceCalculatorTool = () => {
  const [calculationType, setCalculationType] = useState('area');
  const [dimensions, setDimensions] = useState([
    { value: '', unit: 'ft', label: 'Length' },
    { value: '', unit: 'ft', label: 'Width' }
  ]);
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [priceUnit, setPriceUnit] = useState('per_sqft');
  const [precision, setPrecision] = useState(2);

  const availableUnits = calculationType === 'area' ? AREA_UNITS : VOLUME_UNITS;
  const availablePriceUnits = calculationType === 'area' 
    ? PRICE_UNITS.filter(u => u.baseUnit.startsWith('sq') || u.baseUnit === 'acre' || u.baseUnit === 'hectare')
    : PRICE_UNITS.filter(u => u.baseUnit.startsWith('cubic') || u.baseUnit === 'liter' || u.baseUnit === 'gallon');

  const result = useMemo(() => {
    const validDimensions = dimensions.filter(d => d.value !== '' && !isNaN(Number(d.value)));
    if (validDimensions.length === 0 || !pricePerUnit || isNaN(Number(pricePerUnit))) return null;
    
    const price = calculatePrice(
      validDimensions.map(d => ({ ...d, value: Number(d.value) })),
      Number(pricePerUnit),
      priceUnit,
      calculationType
    );
    
    return price !== null ? price.toFixed(precision) : null;
  }, [dimensions, pricePerUnit, priceUnit, calculationType, precision]);

  const addDimension = () => {
    setDimensions([...dimensions, { value: '', unit: 'ft', label: `Dimension ${dimensions.length + 1}` }]);
  };

  const removeDimension = (index) => {
    if (dimensions.length > 1) {
      setDimensions(dimensions.filter((_, i) => i !== index));
    }
  };

  const updateDimension = (index, field, value) => {
    const newDimensions = [...dimensions];
    newDimensions[index] = { ...newDimensions[index], [field]: value };
    setDimensions(newDimensions);
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(`$${result}`);
    } catch {}
  };

  const clearAll = () => {
    setDimensions([{ value: '', unit: 'ft', label: 'Length' }, { value: '', unit: 'ft', label: 'Width' }]);
    setPricePerUnit('');
    setPriceUnit('per_sqft');
  };

  const loadExample = (type, dims, price, priceUnitId) => {
    setCalculationType(type);
    setDimensions(dims);
    setPricePerUnit(String(price));
    setPriceUnit(priceUnitId);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Square Unit Price Calculator</h1>
            <p className="text-gray-600">Calculate total price based on area or volume measurements and price per unit.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={clearAll}>Clear All</Button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Examples</label>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => loadExample('area', [
            { value: '120', unit: 'in', label: 'Length' },
            { value: '36', unit: 'in', label: 'Width' }
          ], 15, 'per_sqft')}>120" × 36" @ $15/ft²</Button>
          <Button variant="outline" size="sm" onClick={() => loadExample('area', [
            { value: '10', unit: 'm', label: 'Length' },
            { value: '5', unit: 'm', label: 'Width' }
          ], 25, 'per_sqm')}>10m × 5m @ $25/m²</Button>
          <Button variant="outline" size="sm" onClick={() => loadExample('volume', [
            { value: '8', unit: 'ft', label: 'Length' },
            { value: '6', unit: 'ft', label: 'Width' },
            { value: '4', unit: 'ft', label: 'Height' }
          ], 2.50, 'per_cubicft')}>8' × 6' × 4' @ $2.50/ft³</Button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Type</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="area"
              checked={calculationType === 'area'}
              onChange={(e) => setCalculationType(e.target.value)}
              className="mr-2"
            />
            Area Calculation
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="volume"
              checked={calculationType === 'volume'}
              onChange={(e) => setCalculationType(e.target.value)}
              className="mr-2"
            />
            Volume Calculation
          </label>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Dimensions</label>
          <Button variant="outline" size="sm" onClick={addDimension}>Add Dimension</Button>
        </div>
        <div className="space-y-3">
          {dimensions.map((dim, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{dim.label}</label>
                <input
                  type="number"
                  value={dim.value}
                  onChange={(e) => updateDimension(index, 'value', e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <select
                  value={dim.unit}
                  onChange={(e) => updateDimension(index, 'unit', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
                >
                  {calculationType === 'area' ? (
                    <>
                      {LINEAR_UNITS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                      {AREA_UNITS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </>
                  ) : (
                    <>
                      {LINEAR_UNITS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                      {AREA_UNITS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                      {VOLUME_UNITS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input
                  type="text"
                  value={dim.label}
                  onChange={(e) => updateDimension(index, 'label', e.target.value)}
                  placeholder="Label"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900"
                />
              </div>
              <div className="flex items-end">
                {dimensions.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeDimension(index)}
                    className="w-full"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price per Unit</label>
          <input
            type="number"
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(e.target.value)}
            placeholder="0.00"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Unit</label>
          <select
            value={priceUnit}
            onChange={(e) => setPriceUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
          >
            {availablePriceUnits.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <label className="text-sm text-gray-700">Precision:</label>
        <select
          value={precision}
          onChange={(e) => setPrecision(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-800"
        >
          {[0,1,2,3,4,5,6].map(p => <option key={p} value={p}>{p} decimals</option>)}
        </select>
      </div>

      {result !== null && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Total Price</label>
            <Button variant="outline" size="sm" onClick={handleCopy}>Copy</Button>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="text-2xl font-bold text-green-800">${result}</div>
            <div className="text-sm text-green-600 mt-1">
              {calculationType === 'area' ? 'Area-based calculation' : 'Volume-based calculation'}
            </div>
          </div>
        </div>
      )}

      <div className="text-sm text-gray-600">
        <p><strong>Note:</strong> This calculator supports both area and volume calculations. For area calculations, multiply all dimensions. For volume calculations, multiply all dimensions to get the total volume.</p>
        <p className="mt-2">All results are displayed in US dollars ($).</p>
      </div>
    </div>
  );
};

export default SquareUnitPriceCalculatorTool;
