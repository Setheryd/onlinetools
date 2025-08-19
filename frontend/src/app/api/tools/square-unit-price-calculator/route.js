export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

const AREA_UNITS = {
  sqft: 1,
  sqm: 10.7639,
  sqin: 0.00694444,
  sqyd: 9,
  acre: 43560,
  hectare: 107639,
  sqcm: 0.00107639,
  sqmm: 0.0000107639,
};

const VOLUME_UNITS = {
  cubicft: 1,
  cubicm: 35.3147,
  cubicin: 0.000578704,
  cubicyard: 27,
  liter: 0.0353147,
  gallon: 0.133681,
  cubiccm: 0.0000353147,
  cubicmm: 0.0000000353147,
};

const LINEAR_UNITS = {
  ft: 1,
  m: 3.28084,
  in: 1/12,
  yd: 3,
  cm: 0.0328084,
  mm: 0.00328084,
};

const PRICE_UNITS = {
  per_sqft: { baseUnit: 'sqft', type: 'area' },
  per_sqm: { baseUnit: 'sqm', type: 'area' },
  per_sqin: { baseUnit: 'sqin', type: 'area' },
  per_sqyd: { baseUnit: 'sqyd', type: 'area' },
  per_acre: { baseUnit: 'acre', type: 'area' },
  per_hectare: { baseUnit: 'hectare', type: 'area' },
  per_cubicft: { baseUnit: 'cubicft', type: 'volume' },
  per_cubicm: { baseUnit: 'cubicm', type: 'volume' },
  per_cubicin: { baseUnit: 'cubicin', type: 'volume' },
  per_cubicyard: { baseUnit: 'cubicyard', type: 'volume' },
  per_liter: { baseUnit: 'liter', type: 'volume' },
  per_gallon: { baseUnit: 'gallon', type: 'volume' },
};

function convertArea(value, fromUnit, toUnit) {
  if (!AREA_UNITS[fromUnit] || !AREA_UNITS[toUnit]) return null;
  const sqft = value * AREA_UNITS[fromUnit];
  return sqft / AREA_UNITS[toUnit];
}

function convertVolume(value, fromUnit, toUnit) {
  if (!VOLUME_UNITS[fromUnit] || !VOLUME_UNITS[toUnit]) return null;
  const cubicft = value * VOLUME_UNITS[fromUnit];
  return cubicft / VOLUME_UNITS[toUnit];
}

function convertLinear(value, fromUnit, toUnit) {
  if (!LINEAR_UNITS[fromUnit] || !LINEAR_UNITS[toUnit]) return null;
  const feet = value * LINEAR_UNITS[fromUnit];
  return feet / LINEAR_UNITS[toUnit];
}

function calculatePrice(dimensions, pricePerUnit, priceUnitId, calculationType, shape = 'square') {
  if (!dimensions || dimensions.length === 0 || !pricePerUnit || !priceUnitId) {
    return { error: 'Missing required parameters' };
  }
  
  const priceUnit = PRICE_UNITS[priceUnitId];
  if (!priceUnit) {
    return { error: 'Invalid price unit' };
  }

  try {
    let totalValue = 1;

    if (calculationType === 'area') {
      // Convert all dimensions to feet for calculation
      const feetDimensions = dimensions.map(dim => {
        if (dim.unit.startsWith('sq')) {
          // Already an area unit, convert to square feet
          const converted = convertArea(dim.value, dim.unit, 'sqft');
          if (converted === null) throw new Error(`Invalid area unit: ${dim.unit}`);
          return converted;
        } else if (LINEAR_UNITS[dim.unit]) {
          // Linear unit, convert to feet
          const feetValue = convertLinear(dim.value, dim.unit, 'ft');
          if (feetValue === null) throw new Error(`Invalid linear unit: ${dim.unit}`);
          return feetValue;
        } else {
          throw new Error(`Invalid unit for area calculation: ${dim.unit}`);
        }
      });

      // Calculate area based on shape
      switch (shape) {
        case 'square':
        case 'rectangle':
          totalValue = feetDimensions[0] * feetDimensions[1];
          break;
        case 'triangle':
          totalValue = 0.5 * feetDimensions[0] * feetDimensions[1];
          break;
        case 'circle':
          totalValue = Math.PI * Math.pow(feetDimensions[0] / 2, 2);
          break;
        case 'trapezoid':
          totalValue = 0.5 * (feetDimensions[0] + feetDimensions[1]) * feetDimensions[2];
          break;
        case 'parallelogram':
          totalValue = feetDimensions[0] * feetDimensions[1];
          break;
        case 'rhombus':
          totalValue = 0.5 * feetDimensions[0] * feetDimensions[1];
          break;
        case 'ellipse':
          totalValue = Math.PI * (feetDimensions[0] / 2) * (feetDimensions[1] / 2);
          break;
        default:
          // For custom shapes, multiply all dimensions
          totalValue = feetDimensions.reduce((acc, val) => acc * val, 1);
      }
      
      // Convert to the price unit's base unit
      totalValue = convertArea(totalValue, 'sqft', priceUnit.baseUnit);
    } else {
      // Convert all dimensions to feet for calculation
      const feetDimensions = dimensions.map(dim => {
        if (dim.unit.startsWith('cubic')) {
          // Already a volume unit, convert to cubic feet
          const converted = convertVolume(dim.value, dim.unit, 'cubicft');
          if (converted === null) throw new Error(`Invalid volume unit: ${dim.unit}`);
          return converted;
        } else if (dim.unit.startsWith('sq')) {
          // Area unit, treat as height = 1
          const converted = convertArea(dim.value, dim.unit, 'sqft');
          if (converted === null) throw new Error(`Invalid area unit: ${dim.unit}`);
          return converted;
        } else if (LINEAR_UNITS[dim.unit]) {
          // Linear unit, convert to feet
          const feetValue = convertLinear(dim.value, dim.unit, 'ft');
          if (feetValue === null) throw new Error(`Invalid linear unit: ${dim.unit}`);
          return feetValue;
        } else {
          throw new Error(`Invalid unit for volume calculation: ${dim.unit}`);
        }
      });

      // Calculate volume based on shape
      switch (shape) {
        case 'cube':
        case 'box':
          totalValue = feetDimensions[0] * feetDimensions[1] * feetDimensions[2];
          break;
        case 'cylinder':
          totalValue = Math.PI * Math.pow(feetDimensions[0] / 2, 2) * feetDimensions[1];
          break;
        case 'sphere':
          totalValue = (4/3) * Math.PI * Math.pow(feetDimensions[0] / 2, 3);
          break;
        case 'cone':
          totalValue = (1/3) * Math.PI * Math.pow(feetDimensions[0] / 2, 2) * feetDimensions[1];
          break;
        case 'pyramid':
          totalValue = (1/3) * feetDimensions[0] * feetDimensions[1] * feetDimensions[2];
          break;
        case 'prism':
          // Base area * height
          const baseArea = feetDimensions[0] * feetDimensions[1];
          totalValue = baseArea * feetDimensions[2];
          break;
        default:
          // For custom shapes, multiply all dimensions
          totalValue = feetDimensions.reduce((acc, val) => acc * val, 1);
      }
      
      // Convert to the price unit's base unit
      totalValue = convertVolume(totalValue, 'cubicft', priceUnit.baseUnit);
    }
    
    const totalPrice = totalValue * pricePerUnit;
    
    return {
      totalPrice: parseFloat(totalPrice.toFixed(6)),
      totalValue: parseFloat(totalValue.toFixed(6)),
      pricePerUnit,
      priceUnit: priceUnitId,
      calculationType,
      shape,
      dimensions: dimensions.map(d => ({
        ...d,
        value: parseFloat(d.value)
      }))
    };
  } catch (error) {
    return { error: error.message };
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { dimensions, pricePerUnit, priceUnit, calculationType, shape = 'square' } = body;

    // Validate input
    if (!dimensions || !Array.isArray(dimensions) || dimensions.length === 0) {
      return NextResponse.json({ error: 'Dimensions array is required and must not be empty' }, { status: 400 });
    }

    if (!pricePerUnit || isNaN(Number(pricePerUnit)) || Number(pricePerUnit) < 0) {
      return NextResponse.json({ error: 'Valid price per unit is required' }, { status: 400 });
    }

    if (!priceUnit || !PRICE_UNITS[priceUnit]) {
      return NextResponse.json({ error: 'Valid price unit is required' }, { status: 400 });
    }

    if (!calculationType || !['area', 'volume'].includes(calculationType)) {
      return NextResponse.json({ error: 'Calculation type must be either "area" or "volume"' }, { status: 400 });
    }

    // Validate dimensions
    for (const dim of dimensions) {
      if (!dim.value || isNaN(Number(dim.value)) || Number(dim.value) <= 0) {
        return NextResponse.json({ error: 'All dimensions must have valid positive values' }, { status: 400 });
      }
      if (!dim.unit) {
        return NextResponse.json({ error: 'All dimensions must have units' }, { status: 400 });
      }
    }

    const result = calculatePrice(dimensions, Number(pricePerUnit), priceUnit, calculationType, shape);
    
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  
  // Example usage via GET parameters
  const length = searchParams.get('length');
  const width = searchParams.get('width');
  const height = searchParams.get('height');
  const pricePerUnit = searchParams.get('price');
  const priceUnit = searchParams.get('unit') || 'per_sqft';
  const calculationType = searchParams.get('type') || 'area';
  const shape = searchParams.get('shape') || 'square';

  if (!length || !pricePerUnit) {
    return NextResponse.json({ 
      error: 'Missing required parameters. Use: ?length=10&price=15&unit=per_sqft&type=area&shape=square',
      example: '/api/tools/square-unit-price-calculator?length=120&price=15&unit=per_sqft&type=area&shape=square'
    }, { status: 400 });
  }

  let dimensions = [];
  
  if (shape === 'circle' || shape === 'sphere') {
    dimensions = [{ value: Number(length), unit: 'in', label: 'Diameter' }];
  } else if (shape === 'triangle' || shape === 'parallelogram') {
    dimensions = [
      { value: Number(length), unit: 'in', label: 'Base' },
      { value: Number(width || length), unit: 'in', label: 'Height' }
    ];
  } else if (shape === 'trapezoid') {
    dimensions = [
      { value: Number(length), unit: 'in', label: 'Base 1' },
      { value: Number(width || length), unit: 'in', label: 'Base 2' },
      { value: Number(height || length), unit: 'in', label: 'Height' }
    ];
  } else if (shape === 'rhombus') {
    dimensions = [
      { value: Number(length), unit: 'in', label: 'Diagonal 1' },
      { value: Number(width || length), unit: 'in', label: 'Diagonal 2' }
    ];
  } else if (shape === 'ellipse') {
    dimensions = [
      { value: Number(length), unit: 'in', label: 'Major Axis' },
      { value: Number(width || length), unit: 'in', label: 'Minor Axis' }
    ];
  } else if (shape === 'cylinder' || shape === 'cone') {
    dimensions = [
      { value: Number(length), unit: 'in', label: 'Diameter' },
      { value: Number(height || length), unit: 'in', label: 'Height' }
    ];
  } else if (shape === 'pyramid' || shape === 'prism') {
    dimensions = [
      { value: Number(length), unit: 'in', label: 'Base Length' },
      { value: Number(width || length), unit: 'in', label: 'Base Width' },
      { value: Number(height || length), unit: 'in', label: 'Height' }
    ];
  } else {
    // Default for square, rectangle, cube, box
    dimensions = [
      { value: Number(length), unit: 'in', label: 'Length' },
      { value: Number(width || length), unit: 'in', label: 'Width' }
    ];
    
    if (height && (calculationType === 'volume' || shape === 'box')) {
      dimensions.push({ value: Number(height), unit: 'in', label: 'Height' });
    }
  }

  const result = calculatePrice(dimensions, Number(pricePerUnit), priceUnit, calculationType, shape);
  
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(result);
}
