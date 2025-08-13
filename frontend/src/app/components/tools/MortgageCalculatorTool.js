"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

function monthlyPayment(principal, annualRatePct, years) {
  const r = Number(annualRatePct) / 100 / 12;
  const n = Number(years) * 12;
  if (r === 0) return principal / n;
  const factor = Math.pow(1 + r, n);
  return (principal * r * factor) / (factor - 1);
}

function amortizationSchedule(principal, annualRatePct, years, extraMonthly = 0) {
  const r = Number(annualRatePct) / 100 / 12;
  const n = Number(years) * 12;
  const base = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const payment = base + Number(extraMonthly || 0);
  const rows = [];
  let balance = principal;
  let month = 0;
  let totalInterest = 0;
  while (balance > 0 && month < 1000 * 12) {
    const interest = r * balance;
    let principalPaid = Math.min(balance, payment - interest);
    if (principalPaid <= 0) {
      // Prevent infinite loop when payment doesn't cover interest
      principalPaid = 0;
    }
    const newBalance = Math.max(0, balance - principalPaid);
    totalInterest += interest;
    rows.push({ month: month + 1, payment, principal: principalPaid, interest, balance: newBalance });
    balance = newBalance;
    month += 1;
    if (principalPaid === 0 && interest >= payment) break; // safeguard
  }
  return { schedule: rows, totalInterest, months: month, monthlyPayment: payment };
}

const number = (v, d = 2) => Number(v).toLocaleString(undefined, { maximumFractionDigits: d, minimumFractionDigits: d });

const MortgageCalculatorTool = () => {
  const [principal, setPrincipal] = useState('350000');
  const [rate, setRate] = useState('6.5');
  const [years, setYears] = useState('30');
  const [extra, setExtra] = useState('0');

  const summary = useMemo(() => {
    if (isNaN(Number(principal)) || isNaN(Number(rate)) || isNaN(Number(years))) return null;
    const baseMonthly = monthlyPayment(Number(principal), Number(rate), Number(years));
    const withExtra = amortizationSchedule(Number(principal), Number(rate), Number(years), Number(extra || 0));
    return { baseMonthly, ...withExtra };
  }, [principal, rate, years, extra]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mortgage Calculator</h1>
        <p className="text-gray-600">Calculate monthly payments and view amortization with optional extra payments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Interest (APR %)</label>
          <input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Term (years)</label>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Extra monthly</label>
          <input type="number" value={extra} onChange={(e) => setExtra(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
      </div>

      {summary && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 border rounded">
            <div className="text-sm text-gray-600">Base monthly payment</div>
            <div className="text-xl font-semibold text-gray-900">${number(summary.baseMonthly)}</div>
          </div>
          <div className="p-4 bg-gray-50 border rounded">
            <div className="text-sm text-gray-600">With extra payment</div>
            <div className="text-xl font-semibold text-gray-900">${number(summary.monthlyPayment)}</div>
          </div>
          <div className="p-4 bg-gray-50 border rounded">
            <div className="text-sm text-gray-600">Payoff months</div>
            <div className="text-xl font-semibold text-gray-900">{summary.months}</div>
          </div>
        </div>
      )}

      {summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Amortization Schedule (first 12 months)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="p-2">Month</th>
                  <th className="p-2">Payment</th>
                  <th className="p-2">Principal</th>
                  <th className="p-2">Interest</th>
                  <th className="p-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {summary.schedule.slice(0, 12).map((row) => (
                  <tr key={row.month} className="border-t">
                    <td className="p-2">{row.month}</td>
                    <td className="p-2">${number(row.payment)}</td>
                    <td className="p-2">${number(row.principal)}</td>
                    <td className="p-2">${number(row.interest)}</td>
                    <td className="p-2">${number(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Notes</h3>
        <p className="text-sm text-blue-700">This simplified calculator excludes taxes, insurance, and HOA fees. Extra payments reduce interest and payoff time.</p>
      </div>
    </div>
  );
};

export default MortgageCalculatorTool;


