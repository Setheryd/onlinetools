"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

function calcBmi({ weightKg, heightCm }) {
  const hM = (Number(heightCm) || 0) / 100;
  const w = Number(weightKg) || 0;
  if (hM <= 0) return { bmi: 0, category: '' };
  const bmi = w / (hM * hM);
  let category = '';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obesity';
  return { bmi, category };
}

const BmiCalculatorTool = () => {
  const [units, setUnits] = useState('metric');
  const [weight, setWeight] = useState('70'); // kg or lb
  const [height, setHeight] = useState('175'); // cm (metric)
  const [heightFt, setHeightFt] = useState('5'); // feet (imperial)
  const [heightInches, setHeightInches] = useState('9'); // inches (imperial)

  const { weightKg, heightCm } = useMemo(() => {
    if (units === 'metric') {
      return { weightKg: Number(weight)||0, heightCm: Number(height)||0 };
    }
    const totalInches = (Number(heightFt)||0) * 12 + (Number(heightInches)||0);
    return { weightKg: (Number(weight)||0) * 0.45359237, heightCm: totalInches * 2.54 };
  }, [units, weight, height, heightFt, heightInches]);

  const res = useMemo(() => calcBmi({ weightKg, heightCm }), [weightKg, heightCm]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">BMI Calculator</h1>
        <p className="text-gray-600">Compute Body Mass Index and see your category.</p>
      </div>

      <div className="mb-4">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          {['metric','imperial'].map((m) => (
            <button key={m} onClick={() => setUnits(m)} className={`px-3 py-1 text-sm rounded ${units===m?'bg-white shadow':'text-gray-600'}`}>{m==='metric'?'Metric (kg, cm)':'Imperial (lb, in)'}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Weight ({units==='metric'?'kg':'lb'})</label>
          <input type="number" step="0.1" value={weight} onChange={(e)=>setWeight(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        {units === 'metric' ? (
          <div>
            <label className="block text-sm text-gray-700 mb-1">Height (cm)</label>
            <input type="number" step="0.1" value={height} onChange={(e)=>setHeight(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
          </div>
        ) : (
          <div>
            <label className="block text-sm text-gray-700 mb-1">Height (ft/in)</label>
            <div className="grid grid-cols-2 gap-2">
              <input type="number" step="1" min="0" value={heightFt} onChange={(e)=>setHeightFt(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" placeholder="ft" />
              <input type="number" step="1" min="0" value={heightInches} onChange={(e)=>setHeightInches(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" placeholder="in" />
            </div>
          </div>
        )}
        <div className="p-4 bg-gray-50 border rounded">
          <div className="text-sm text-gray-600">BMI</div>
          <div className="text-xl font-semibold text-gray-900">{res.bmi ? res.bmi.toFixed(1) : '-'}</div>
          <div className="text-sm text-gray-700">{res.category}</div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Notes</h3>
        <p className="text-sm text-blue-700">BMI is a general guideline and may not reflect body composition for athletes or certain populations.</p>
      </div>
    </div>
  );
};

export default BmiCalculatorTool;


