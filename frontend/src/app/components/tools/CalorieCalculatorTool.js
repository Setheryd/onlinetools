"use client";
import React, { useMemo, useState } from 'react';

function mifflinStJeor({ sex, weightKg, heightCm, ageYears }) {
  const s = sex === 'male' ? 5 : -161;
  return 10 * weightKg + 6.25 * heightCm - 5 * ageYears + s;
}

const activityFactors = [
  { key: 'sedentary', label: 'Sedentary (little or no exercise)', factor: 1.2 },
  { key: 'light', label: 'Light (1-3 days/wk)', factor: 1.375 },
  { key: 'moderate', label: 'Moderate (3-5 days/wk)', factor: 1.55 },
  { key: 'active', label: 'Active (6-7 days/wk)', factor: 1.725 },
  { key: 'very', label: 'Very Active (physical job/training)', factor: 1.9 },
];

const CalorieCalculatorTool = () => {
  const [sex, setSex] = useState('male');
  const [units, setUnits] = useState('metric'); // metric | imperial
  const [age, setAge] = useState('30');
  const [height, setHeight] = useState('175'); // cm (metric)
  const [heightFt, setHeightFt] = useState('5'); // ft (imperial)
  const [heightInches, setHeightInches] = useState('9'); // in (imperial)
  const [weight, setWeight] = useState('70'); // kg or lb
  const [activity, setActivity] = useState('moderate');

  const { weightKg, heightCm } = useMemo(() => {
    if (units === 'metric') {
      return { weightKg: Number(weight)||0, heightCm: Number(height)||0 };
    }
    const totalInches = (Number(heightFt)||0) * 12 + (Number(heightInches)||0);
    return {
      weightKg: (Number(weight)||0) * 0.45359237,
      heightCm: totalInches * 2.54,
    };
  }, [units, weight, height, heightFt, heightInches]);

  const bmr = useMemo(() => mifflinStJeor({ sex, weightKg, heightCm, ageYears: Number(age)||0 }), [sex, weightKg, heightCm, age]);
  const tdee = useMemo(() => (activityFactors.find(a=>a.key===activity)?.factor || 1) * bmr, [activity, bmr]);

  const maintenance = Math.round(tdee);
  const loss = Math.round(tdee - 500);
  const gain = Math.round(tdee + 500);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Calorie Calculator</h1>
      <div className="mb-4">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          {['metric','imperial'].map((m) => (
            <button key={m} onClick={() => setUnits(m)} className={`px-3 py-1 text-sm rounded ${units===m?'bg-white shadow':'text-gray-600'}`}>{m==='metric'?'Metric (kg, cm)':'Imperial (lb, ft/in)'}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Sex</label>
          <select value={sex} onChange={(e)=>setSex(e.target.value)} className="w-full px-3 py-2 border rounded text-sm bg-white text-gray-800">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Age</label>
          <input type="number" value={age} onChange={(e)=>setAge(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        {units === 'metric' ? (
          <>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Height (cm)</label>
              <input type="number" value={height} onChange={(e)=>setHeight(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Weight (kg)</label>
              <input type="number" value={weight} onChange={(e)=>setWeight(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Height (ft/in)</label>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" step="1" min="0" value={heightFt} onChange={(e)=>setHeightFt(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" placeholder="ft" />
                <input type="number" step="1" min="0" value={heightInches} onChange={(e)=>setHeightInches(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" placeholder="in" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Weight (lb)</label>
              <input type="number" value={weight} onChange={(e)=>setWeight(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
            </div>
          </>
        )}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Activity</label>
          <select value={activity} onChange={(e)=>setActivity(e.target.value)} className="w-full px-3 py-2 border rounded text-sm bg-white text-gray-800">
            {activityFactors.map(a=> <option key={a.key} value={a.key}>{a.label}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 border rounded">
          <div className="text-sm text-gray-600">Maintenance (TDEE)</div>
          <div className="text-xl font-semibold text-gray-900">{maintenance} kcal/day</div>
        </div>
        <div className="p-4 bg-gray-50 border rounded">
          <div className="text-sm text-gray-600">Weight Loss (−500)</div>
          <div className="text-xl font-semibold text-gray-900">{loss} kcal/day</div>
        </div>
        <div className="p-4 bg-gray-50 border rounded">
          <div className="text-sm text-gray-600">Weight Gain (+500)</div>
          <div className="text-xl font-semibold text-gray-900">{gain} kcal/day</div>
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculatorTool;


