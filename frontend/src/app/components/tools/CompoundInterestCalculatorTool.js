"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

function fvCompound({ principal, annualRatePct, compoundsPerYear, years, periodicContribution }) {
  const r = Number(annualRatePct) / 100;
  const n = Math.max(1, Number(compoundsPerYear));
  const t = Number(years);
  const pmt = Number(periodicContribution) || 0;
  const base = Number(principal) || 0;
  const growth = Math.pow(1 + r / n, n * t);
  const fvPrincipal = base * growth;
  const fvContrib = r === 0 ? pmt * n * t : pmt * ((growth - 1) / (r / n));
  const fv = fvPrincipal + fvContrib;
  const totalContrib = base + pmt * n * t;
  return { fv, fvPrincipal, fvContrib, totalContrib, growth };
}

const number = (v, d = 2) => Number(v).toLocaleString(undefined, { maximumFractionDigits: d, minimumFractionDigits: d });

const CompoundInterestCalculatorTool = () => {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('7');
  const [years, setYears] = useState('10');
  const [compounds, setCompounds] = useState('12');
  const [contribution, setContribution] = useState('200');

  const result = useMemo(() => fvCompound({ principal, annualRatePct: rate, compoundsPerYear: compounds, years, periodicContribution: contribution }), [principal, rate, years, compounds, contribution]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Compound Interest Calculator</h1>
        <p className="text-gray-600">Compute future value with compound growth and periodic contributions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Principal</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">APR (%)</label>
          <input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Years</label>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Compounds/Year</label>
          <select value={compounds} onChange={(e) => setCompounds(e.target.value)} className="w-full px-3 py-2 border rounded text-sm bg-white text-gray-800">
            <option value="1">Annual (1)</option>
            <option value="2">Semiannual (2)</option>
            <option value="4">Quarterly (4)</option>
            <option value="12">Monthly (12)</option>
            <option value="26">Biweekly (26)</option>
            <option value="52">Weekly (52)</option>
            <option value="365">Daily (365)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Contribution per period</label>
          <input type="number" value={contribution} onChange={(e) => setContribution(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gray-50 border rounded">
          <div className="text-sm text-gray-600">Future Value</div>
          <div className="text-xl font-semibold text-gray-900">${number(result.fv)}</div>
        </div>
        <div className="p-4 bg-gray-50 border rounded">
          <div className="text-sm text-gray-600">Total Contributed</div>
          <div className="text-xl font-semibold text-gray-900">${number(result.totalContrib)}</div>
        </div>
        <div className="p-4 bg-gray-50 border rounded">
          <div className="text-sm text-gray-600">Growth from Principal</div>
          <div className="text-xl font-semibold text-gray-900">${number(result.fvPrincipal)}</div>
        </div>
        <div className="p-4 bg-gray-50 border rounded">
          <div className="text-sm text-gray-600">Growth from Contributions</div>
          <div className="text-xl font-semibold text-gray-900">${number(result.fvContrib)}</div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Tips</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
          <li>Compounding frequency increases effective annual yield.</li>
          <li>Contributions are assumed at the end of each period.</li>
        </ul>
      </div>
    </div>
  );
};

export default CompoundInterestCalculatorTool;


