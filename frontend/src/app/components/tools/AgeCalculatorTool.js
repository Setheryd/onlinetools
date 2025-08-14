"use client";
import React, { useMemo, useState } from 'react';

function diffYMD(from, to) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    days += prevMonth;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

const AgeCalculatorTool = () => {
  const [dob, setDob] = useState('1990-01-01');
  const [refDate, setRefDate] = useState(() => new Date().toISOString().slice(0,10));

  const res = useMemo(() => {
    const start = new Date(dob + 'T00:00:00');
    const end = new Date(refDate + 'T00:00:00');
    if (isNaN(start) || isNaN(end) || end < start) return null;
    const ymd = diffYMD(start, end);
    const diffMs = end - start;
    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonthsApprox = ymd.years * 12 + ymd.months + Math.floor(ymd.days / 30);
    const nextBirthdayYear = end.getMonth() > start.getMonth() || (end.getMonth() === start.getMonth() && end.getDate() >= start.getDate()) ? end.getFullYear()+1 : end.getFullYear();
    const nextBirthday = new Date(nextBirthdayYear, start.getMonth(), start.getDate());
    const daysToNext = Math.ceil((nextBirthday - end) / (1000*60*60*24));
    const bornWeekday = start.toLocaleDateString(undefined, { weekday: 'long' });
    const upcomingWeekday = nextBirthday.toLocaleDateString(undefined, { weekday: 'long' });
    return {
      ymd,
      totalMonthsApprox,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      nextBirthday: nextBirthday.toISOString().slice(0,10),
      daysToNext,
      bornWeekday,
      upcomingWeekday,
    };
  }, [dob, refDate]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Age Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Date of Birth</label>
          <input type="date" value={dob} onChange={(e)=>setDob(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">As of date</label>
          <input type="date" value={refDate} onChange={(e)=>setRefDate(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
      </div>
      {res && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 border rounded">
            <div className="text-sm text-gray-600">Age</div>
            <div className="text-xl font-semibold text-gray-900">{res.ymd.years}y {res.ymd.months}m {res.ymd.days}d</div>
          </div>
          <div className="p-4 bg-gray-50 border rounded">
            <div className="text-sm text-gray-600">Total days</div>
            <div className="text-xl font-semibold text-gray-900">{res.totalDays.toLocaleString()}</div>
          </div>
          <div className="p-4 bg-gray-50 border rounded">
            <div className="text-sm text-gray-600">Next birthday</div>
            <div className="text-xl font-semibold text-gray-900">{res.nextBirthday} ({res.daysToNext} days)</div>
          </div>
        </div>
      )}

      {res && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 border rounded">
            <div className="text-sm text-gray-600">Born on</div>
            <div className="text-lg font-semibold text-gray-900">{res.bornWeekday}</div>
          </div>
          <div className="p-4 bg-gray-50 border rounded">
            <div className="text-sm text-gray-600">Next birthday falls on</div>
            <div className="text-lg font-semibold text-gray-900">{res.upcomingWeekday}</div>
          </div>
          <div className="p-4 bg-gray-50 border rounded">
            <div className="text-sm text-gray-600">Total months (approx)</div>
            <div className="text-lg font-semibold text-gray-900">{res.totalMonthsApprox.toLocaleString()}</div>
          </div>
          <div className="p-4 bg-gray-50 border rounded">
            <div className="text-sm text-gray-600">Total weeks</div>
            <div className="text-lg font-semibold text-gray-900">{res.totalWeeks.toLocaleString()}</div>
          </div>
          <div className="p-4 bg-gray-50 border rounded">
            <div className="text-sm text-gray-600">Total hours</div>
            <div className="text-lg font-semibold text-gray-900">{res.totalHours.toLocaleString()}</div>
          </div>
          <div className="p-4 bg-gray-50 border rounded">
            <div className="text-sm text-gray-600">Total minutes</div>
            <div className="text-lg font-semibold text-gray-900">{res.totalMinutes.toLocaleString()}</div>
          </div>
          <div className="p-4 bg-gray-50 border rounded">
            <div className="text-sm text-gray-600">Total seconds</div>
            <div className="text-lg font-semibold text-gray-900">{res.totalSeconds.toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgeCalculatorTool;


