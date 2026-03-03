'use client';

import React, { useState, useMemo } from 'react';
import Button from '../ui/Button';

const BoxShadowGeneratorTool = () => {
  const [hOffset, setHOffset] = useState(4);
  const [vOffset, setVOffset] = useState(4);
  const [blur, setBlur] = useState(12);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.25);
  const [inset, setInset] = useState(false);

  const colorHex = useMemo(() => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }, [color, opacity]);

  const css = useMemo(() => {
    const shadow = `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${colorHex}${inset ? ' inset' : ''}`;
    return `box-shadow: ${shadow};`;
  }, [hOffset, vOffset, blur, spread, colorHex, inset]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(css); } catch (_) {}
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Box Shadow Generator</h1>
      <p className="text-gray-600 mb-6">Create CSS box-shadow with a visual preview. All in your browser.</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Horizontal: {hOffset}px</label>
          <input type="range" min="-50" max="50" value={hOffset} onChange={(e) => setHOffset(Number(e.target.value))} className="w-full" />
          <label className="block text-sm font-medium text-gray-700">Vertical: {vOffset}px</label>
          <input type="range" min="-50" max="50" value={vOffset} onChange={(e) => setVOffset(Number(e.target.value))} className="w-full" />
          <label className="block text-sm font-medium text-gray-700">Blur: {blur}px</label>
          <input type="range" min="0" max="80" value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full" />
          <label className="block text-sm font-medium text-gray-700">Spread: {spread}px</label>
          <input type="range" min="-50" max="50" value={spread} onChange={(e) => setSpread(Number(e.target.value))} className="w-full" />
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Color</label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-12 h-10 cursor-pointer" />
            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="flex-1 px-2 py-1 border rounded font-mono text-sm" />
          </div>
          <label className="block text-sm font-medium text-gray-700">Opacity: {(opacity * 100).toFixed(0)}%</label>
          <input type="range" min="0" max="1" step="0.05" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} />
            Inset
          </label>
        </div>
        <div>
          <div className="mb-4 p-4 bg-gray-100 rounded-lg font-mono text-sm break-all">{css}</div>
          <Button onClick={copy}>Copy CSS</Button>
          <div className="mt-8 flex items-center justify-center p-12 bg-gray-100 rounded-xl">
            <div className="w-40 h-40 bg-white rounded-lg" style={{ boxShadow: `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${colorHex}${inset ? ' inset' : ''}` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxShadowGeneratorTool;
