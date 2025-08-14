"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

const RobotsTxtGeneratorTool = () => {
  const [userAgent, setUserAgent] = useState('*');
  const [disallows, setDisallows] = useState(['/admin']);
  const [allows, setAllows] = useState(['/']);
  const [sitemaps, setSitemaps] = useState(['https://example.com/sitemap.xml']);

  const robots = useMemo(() => {
    const lines = [];
    lines.push(`User-agent: ${userAgent || '*'}`);
    (disallows || []).filter(Boolean).forEach(p => lines.push(`Disallow: ${p}`));
    (allows || []).filter(Boolean).forEach(p => lines.push(`Allow: ${p}`));
    if ((disallows?.length || 0) + (allows?.length || 0) === 0) lines.push('Disallow:');
    (sitemaps || []).filter(Boolean).forEach(u => lines.push(`Sitemap: ${u}`));
    return lines.join('\n');
  }, [userAgent, disallows, allows, sitemaps]);

  const add = (setter, init='') => setter((arr)=>[...arr, init]);
  const setAt = (setter, idx, val) => setter((arr)=> arr.map((v,i)=> i===idx?val:v));
  const removeAt = (setter, idx) => setter((arr)=> arr.filter((_,i)=> i!==idx));
  const copy = async () => { try { await navigator.clipboard.writeText(robots); } catch {} };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">robots.txt Generator</h1>
      <p className="text-gray-600 mb-4">Define crawl rules and sitemaps for search engines.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">User-agent</label>
            <input value={userAgent} onChange={(e)=>setUserAgent(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
          </div>
          <ListField label="Disallow" values={disallows} setValues={setDisallows} placeholder="/private" />
          <ListField label="Allow" values={allows} setValues={setAllows} placeholder="/public" />
          <ListField label="Sitemap URLs" values={sitemaps} setValues={setSitemaps} placeholder="https://example.com/sitemap.xml" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700">robots.txt</span>
            <Button variant="outline" size="sm" onClick={copy}>Copy</Button>
          </div>
          <textarea readOnly value={robots} className="w-full h-80 px-3 py-2 border rounded text-sm font-mono bg-gray-50" />
        </div>
      </div>
    </div>
  );
};

const ListField = ({ label, values, setValues, placeholder }) => (
  <div>
    <label className="block text-sm text-gray-700 mb-1">{label}</label>
    <div className="space-y-2">
      {values.map((v, i) => (
        <div key={i} className="flex gap-2">
          <input value={v} onChange={(e)=> setValues(vals => vals.map((x, idx)=> idx===i ? e.target.value : x))} placeholder={placeholder} className="flex-1 px-3 py-2 border rounded text-sm" />
          <Button variant="outline" size="sm" className="shrink-0" onClick={()=> setValues(vals => vals.filter((_,idx)=> idx!==i))}>Remove</Button>
        </div>
      ))}
      <Button variant="secondary" size="sm" onClick={()=> setValues(vals => [...vals, ''])}>Add</Button>
    </div>
  </div>
);

export default RobotsTxtGeneratorTool;


