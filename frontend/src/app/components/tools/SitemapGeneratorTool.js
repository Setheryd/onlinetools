"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

function buildSitemap({ baseUrl, paths, changefreq, priority }) {
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';
  const lines = [urlsetOpen];
  const cleanBase = (baseUrl || '').replace(/\/$/, '');
  (paths || []).filter(Boolean).forEach((p) => {
    const loc = /^https?:\/\//i.test(p) ? p : `${cleanBase}${p.startsWith('/')?'':'/'}${p}`;
    lines.push('  <url>');
    lines.push(`    <loc>${loc}</loc>`);
    if (changefreq) lines.push(`    <changefreq>${changefreq}</changefreq>`);
    if (priority !== '') lines.push(`    <priority>${priority}</priority>`);
    lines.push('  </url>');
  });
  lines.push(urlsetClose);
  return lines.join('\n');
}

const SitemapGeneratorTool = () => {
  const [baseUrl, setBaseUrl] = useState('https://thetoolguru.com');
  const [paths, setPaths] = useState(['/','/about','/contact']);
  const [changefreq, setChangefreq] = useState('weekly');
  const [priority, setPriority] = useState('0.7');
  const xml = useMemo(() => buildSitemap({ baseUrl, paths, changefreq, priority }), [baseUrl, paths, changefreq, priority]);
  const copy = async () => { try { await navigator.clipboard.writeText(xml); } catch {} };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Sitemap.xml Generator</h1>
      <p className="text-gray-600 mb-4">Build a valid XML sitemap for your site.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Base URL</label>
            <input value={baseUrl} onChange={(e)=>setBaseUrl(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Default changefreq</label>
            <select value={changefreq} onChange={(e)=>setChangefreq(e.target.value)} className="w-full px-3 py-2 border rounded text-sm bg-white text-gray-800">
              {['always','hourly','daily','weekly','monthly','yearly','never'].map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Default priority</label>
            <input type="number" step="0.1" min="0" max="1" value={priority} onChange={(e)=>setPriority(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
          </div>
          <ListField label="Paths" values={paths} setValues={setPaths} placeholder="/path" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700">sitemap.xml</span>
            <Button variant="outline" size="sm" onClick={copy}>Copy</Button>
          </div>
          <textarea readOnly value={xml} className="w-full h-96 px-3 py-2 border rounded text-sm font-mono bg-gray-50" />
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

export default SitemapGeneratorTool;


