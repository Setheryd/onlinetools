"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

const presets = [
  { label: 'Every minute', expr: '* * * * *' },
  { label: 'Every 5 minutes', expr: '*/5 * * * *' },
  { label: 'Hourly', expr: '0 * * * *' },
  { label: 'Daily at 00:00', expr: '0 0 * * *' },
  { label: 'Weekly (Sun 00:00)', expr: '0 0 * * 0' },
  { label: 'Monthly (1st 00:00)', expr: '0 0 1 * *' },
  { label: 'Yearly (Jan 1 00:00)', expr: '0 0 1 1 *' },
];

function humanize(expr) {
  const parts = expr.trim().split(/\s+/);
  if (parts.length < 5) return 'Invalid cron expression';
  const [min, hour, dom, mon, dow] = parts;
  const w = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const pretty = (v, type) => {
    if (v === '*') return `every ${type}`;
    if (/^\*\/(\d+)$/.test(v)) return `every ${RegExp.$1} ${type}`;
    if (/^\d+$/.test(v)) {
      const n = Number(v);
      if (type === 'weekday') return w[n] ?? v;
      if (type === 'month') return monthNames[n-1] ?? v;
      return `${v}`;
    }
    return v;
  };
  return `${pretty(hour,'hour')} at minute ${pretty(min,'minute')}, on ${dom==='*'?'every day of month':`day ${dom}`} of ${pretty(mon,'month')}, ${dow==='*'?'every weekday':pretty(dow,'weekday')}`;
}

const CronJobGeneratorTool = () => {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [dom, setDom] = useState('*');
  const [month, setMonth] = useState('*');
  const [dow, setDow] = useState('*');
  const expr = useMemo(() => `${minute} ${hour} ${dom} ${month} ${dow}`, [minute, hour, dom, month, dow]);
  const desc = useMemo(() => humanize(expr), [expr]);

  const applyPreset = (p) => {
    const [mi, ho, d1, mo, d2] = p.split(' ');
    setMinute(mi); setHour(ho); setDom(d1); setMonth(mo); setDow(d2);
  };

  const copy = async () => { try { await navigator.clipboard.writeText(expr); } catch {} };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Cron Job Generator</h1>
      <p className="text-gray-600 mb-4">Build cron expressions with helpful presets and a human-readable summary.</p>

      <div className="mb-4 flex flex-wrap gap-2">
        {presets.map((p)=> (
          <Button key={p.expr} variant="outline" size="sm" onClick={()=>applyPreset(p.expr)}>{p.label}</Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
        <Field label="Minute" value={minute} setValue={setMinute} placeholder="* or 0-59 or */n" />
        <Field label="Hour" value={hour} setValue={setHour} placeholder="* or 0-23" />
        <Field label="Day of Month" value={dom} setValue={setDom} placeholder="* or 1-31" />
        <Field label="Month" value={month} setValue={setMonth} placeholder="* or 1-12" />
        <Field label="Day of Week" value={dow} setValue={setDow} placeholder="* or 0-6" />
      </div>

      <div className="p-4 bg-gray-50 border rounded mb-4">
        <div className="text-sm text-gray-600">Cron expression</div>
        <div className="flex items-center gap-3">
          <code className="text-gray-900 text-sm">{expr}</code>
          <Button variant="outline" size="sm" onClick={copy}>Copy</Button>
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded">
        <div className="text-sm font-semibold text-blue-800 mb-1">Summary</div>
        <div className="text-sm text-blue-700">{desc}</div>
      </div>
    </div>
  );
};

const Field = ({ label, value, setValue, placeholder }) => (
  <div>
    <label className="block text-sm text-gray-700 mb-1">{label}</label>
    <input value={value} onChange={(e)=>setValue(e.target.value)} placeholder={placeholder} className="w-full px-3 py-2 border rounded text-sm font-mono" />
  </div>
);

export default CronJobGeneratorTool;


