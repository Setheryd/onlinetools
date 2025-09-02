"use client";
import React, { useEffect, useMemo, useState } from 'react';
import Button from '../ui/Button';

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

// Parsing helpers
function parseHex(hex) {
  let h = hex.replace(/[^0-9a-f]/gi, '').toLowerCase();
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  if (h.length === 6) return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
    a: 1,
  };
  if (h.length === 8) return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
    a: parseInt(h.slice(6, 8), 16) / 255,
  };
  return null;
}

function parseRgb(str) {
  const m = str.match(/^rgba?\(([^)]+)\)$/i);
  if (!m) return null;
  const parts = m[1].split(',').map(s => s.trim());
  if (parts.length < 3) return null;
  const [r, g, b] = parts.slice(0, 3).map(Number);
  const a = parts[3] !== undefined ? Number(parts[3]) : 1;
  if ([r, g, b].some(v => Number.isNaN(v))) return null;
  return { r: clamp(r, 0, 255), g: clamp(g, 0, 255), b: clamp(b, 0, 255), a: clamp(a, 0, 1) };
}

function parseHsl(str) {
  const m = str.match(/^hsla?\(([^)]+)\)$/i);
  if (!m) return null;
  const parts = m[1].split(',').map(s => s.trim());
  if (parts.length < 3) return null;
  const h = Number(parts[0]);
  const s = Number(parts[1].replace('%', '')) / 100;
  const l = Number(parts[2].replace('%', '')) / 100;
  const a = parts[3] !== undefined ? Number(parts[3]) : 1;
  if ([h, s, l].some(v => Number.isNaN(v))) return null;
  return { h, s, l, a: clamp(a, 0, 1) };
}

// Conversions
function rgbToHex({ r, g, b, a = 1 }) {
  const hx = (n) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
  const base = `#${hx(r)}${hx(g)}${hx(b)}`;
  if (a >= 1) return base.toUpperCase();
  return (base + hx(a * 255)).toUpperCase();
}

function rgbToHsl({ r, g, b, a = 1 }) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = (gn - bn) / d + (gn < bn ? 6 : 0); break;
      case gn: h = (bn - rn) / d + 2; break;
      case bn: h = (rn - gn) / d + 4; break;
      default: break;
    }
    h /= 6;
  }
  return { h: h * 360, s, l, a };
}

function hslToRgb({ h, s, l, a = 1 }) {
  const hh = ((h % 360) + 360) % 360 / 360;
  let r, g, b;
  if (s === 0) { r = g = b = l; }
  else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : (l + s - l * s);
    const p = 2 * l - q;
    r = hue2rgb(p, q, hh + 1/3);
    g = hue2rgb(p, q, hh);
    b = hue2rgb(p, q, hh - 1/3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255), a };
}

function rgbToHsv({ r, g, b, a = 1 }) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  if (d !== 0) {
    switch (max) {
      case rn: h = (gn - bn) / d + (gn < bn ? 6 : 0); break;
      case gn: h = (bn - rn) / d + 2; break;
      case bn: h = (rn - gn) / d + 4; break;
      default: break;
    }
    h /= 6;
  }
  return { h: h * 360, s, v: max, a };
}

function hsvToRgb({ h, s, v, a = 1 }) {
  const hh = ((h % 360) + 360) % 360 / 60;
  const i = Math.floor(hh);
  const f = hh - i;
  const p = v * (1 - s);
  const q = v * (1 - s * f);
  const t = v * (1 - s * (1 - f));
  let r, g, b;
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
    default: r = v; g = t; b = p; break;
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255), a };
}

function rgbToCmyk({ r, g, b }) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 1 };
  const c = (1 - rn - k) / (1 - k);
  const m = (1 - gn - k) / (1 - k);
  const y = (1 - bn - k) / (1 - k);
  return { c, m, y, k };
}

function cmykToRgb({ c, m, y, k }) {
  const r = Math.round(255 * (1 - c) * (1 - k));
  const g = Math.round(255 * (1 - m) * (1 - k));
  const b = Math.round(255 * (1 - y) * (1 - k));
  return { r, g, b, a: 1 };
}

const ColorConverterTool = () => {
  const [hex, setHex] = useState('#4F46E5');
  const [alpha, setAlpha] = useState(1);
  const rgb = useMemo(() => parseHex(hex) || { r: 79, g: 70, b: 229, a: alpha }, [hex, alpha]);
  const hsl = useMemo(() => rgbToHsl(rgb), [rgb]);
  const hsv = useMemo(() => rgbToHsv(rgb), [rgb]);
  const cmyk = useMemo(() => rgbToCmyk(rgb), [rgb]);

  const onNativePick = (e) => {
    setHex(e.target.value);
  };

  const updateFromRgb = (r, g, b, a) => {
    const clamped = { r: clamp(Number(r)||0,0,255), g: clamp(Number(g)||0,0,255), b: clamp(Number(b)||0,0,255), a: clamp(Number(a)||1,0,1) };
    setHex(rgbToHex(clamped));
    setAlpha(clamped.a);
  };

  const updateFromHsl = (h, s, l, a) => {
    const rgbVal = hslToRgb({ h: Number(h)||0, s: clamp(Number(s)||0,0,1), l: clamp(Number(l)||0,0,1), a: clamp(Number(a)||1,0,1) });
    setHex(rgbToHex(rgbVal));
    setAlpha(rgbVal.a);
  };

  const updateFromHsv = (h, s, v, a) => {
    const rgbVal = hsvToRgb({ h: Number(h)||0, s: clamp(Number(s)||0,0,1), v: clamp(Number(v)||0,0,1), a: clamp(Number(a)||1,0,1) });
    setHex(rgbToHex(rgbVal));
    setAlpha(rgbVal.a);
  };

  const updateFromCmyk = (c, m, y, k) => {
    const rgbVal = cmykToRgb({ c: clamp(Number(c)||0,0,1), m: clamp(Number(m)||0,0,1), y: clamp(Number(y)||0,0,1), k: clamp(Number(k)||0,0,1) });
    setHex(rgbToHex(rgbVal));
    setAlpha(rgbVal.a);
  };

  const copy = async (text) => { try { await navigator.clipboard.writeText(text); } catch {} };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Color Converter</h1>
        <p className="text-gray-600">Pick a color and view/edit it across HEX, RGB, HSL, HSV, and CMYK. Supports alpha.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input type="color" value={rgbToHex(rgb)} onChange={onNativePick} className="w-16 h-16 p-0 border rounded cursor-pointer" />
            <div
              className="flex-1 h-16 rounded border"
              style={{ background: `linear-gradient(90deg, rgba(${rgb.r},${rgb.g},${rgb.b},0) 0%, rgba(${rgb.r},${rgb.g},${rgb.b},1) 100%)` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600 mb-1">HEX</div>
              <div className="flex items-center gap-3">
                <input value={rgbToHex(rgb)} onChange={(e) => { const v = e.target.value; const p = parseHex(v); if (p) { setHex(v); setAlpha(p.a ?? 1); } }} className="flex-1 min-w-0 px-2 py-1 border rounded text-sm" />
                <Button variant="outline" size="sm" className="shrink-0" onClick={() => copy(rgbToHex(rgb))}>Copy</Button>
              </div>
            </div>
            <div className="p-3 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600 mb-1">RGB(A)</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <input type="number" min={0} max={255} value={rgb.r} onChange={(e) => updateFromRgb(e.target.value, rgb.g, rgb.b, alpha)} className="w-full px-2 py-1 border rounded text-sm" placeholder="R" />
                <input type="number" min={0} max={255} value={rgb.g} onChange={(e) => updateFromRgb(rgb.r, e.target.value, rgb.b, alpha)} className="w-full px-2 py-1 border rounded text-sm" placeholder="G" />
                <input type="number" min={0} max={255} value={rgb.b} onChange={(e) => updateFromRgb(rgb.r, rgb.g, e.target.value, alpha)} className="w-full px-2 py-1 border rounded text-sm" placeholder="B" />
                <input type="number" step="0.01" min={0} max={1} value={alpha} onChange={(e) => updateFromRgb(rgb.r, rgb.g, rgb.b, e.target.value)} className="w-full px-2 py-1 border rounded text-sm" placeholder="A" />
              </div>
            </div>
            <div className="p-3 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600 mb-1">HSL(A)</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <input type="number" value={Math.round(hsl.h)} onChange={(e) => updateFromHsl(e.target.value, hsl.s, hsl.l, alpha)} className="w-full px-2 py-1 border rounded text-sm" placeholder="H" />
                <input type="number" step="0.01" min={0} max={1} value={Number(hsl.s.toFixed(2))} onChange={(e) => updateFromHsl(hsl.h, e.target.value, hsl.l, alpha)} className="w-full px-2 py-1 border rounded text-sm" placeholder="S" />
                <input type="number" step="0.01" min={0} max={1} value={Number(hsl.l.toFixed(2))} onChange={(e) => updateFromHsl(hsl.h, hsl.s, e.target.value, alpha)} className="w-full px-2 py-1 border rounded text-sm" placeholder="L" />
                <input type="number" step="0.01" min={0} max={1} value={alpha} onChange={(e) => updateFromHsl(hsl.h, hsl.s, hsl.l, e.target.value)} className="w-full px-2 py-1 border rounded text-sm" placeholder="A" />
              </div>
            </div>
            <div className="p-3 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600 mb-1">HSV(A)</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <input type="number" value={Math.round(hsv.h)} onChange={(e) => updateFromHsv(e.target.value, hsv.s, hsv.v, alpha)} className="w-full px-2 py-1 border rounded text-sm" placeholder="H" />
                <input type="number" step="0.01" min={0} max={1} value={Number(hsv.s.toFixed(2))} onChange={(e) => updateFromHsv(hsv.h, e.target.value, hsv.v, alpha)} className="w-full px-2 py-1 border rounded text-sm" placeholder="S" />
                <input type="number" step="0.01" min={0} max={1} value={Number(hsv.v.toFixed(2))} onChange={(e) => updateFromHsv(hsv.h, hsv.s, e.target.value, alpha)} className="w-full px-2 py-1 border rounded text-sm" placeholder="V" />
                <input type="number" step="0.01" min={0} max={1} value={alpha} onChange={(e) => updateFromHsv(hsv.h, hsv.s, hsv.v, e.target.value)} className="w-full px-2 py-1 border rounded text-sm" placeholder="A" />
              </div>
            </div>
            <div className="p-3 bg-gray-50 border rounded">
              <div className="text-xs text-gray-600 mb-1">CMYK</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <input type="number" step="0.01" min={0} max={1} value={Number(cmyk.c.toFixed(2))} onChange={(e) => updateFromCmyk(e.target.value, cmyk.m, cmyk.y, cmyk.k)} className="w-full px-2 py-1 border rounded text-sm" placeholder="C" />
                <input type="number" step="0.01" min={0} max={1} value={Number(cmyk.m.toFixed(2))} onChange={(e) => updateFromCmyk(cmyk.c, e.target.value, cmyk.y, cmyk.k)} className="w-full px-2 py-1 border rounded text-sm" placeholder="M" />
                <input type="number" step="0.01" min={0} max={1} value={Number(cmyk.y.toFixed(2))} onChange={(e) => updateFromCmyk(cmyk.c, cmyk.m, e.target.value, cmyk.k)} className="w-full px-2 py-1 border rounded text-sm" placeholder="Y" />
                <input type="number" step="0.01" min={0} max={1} value={Number(cmyk.k.toFixed(2))} onChange={(e) => updateFromCmyk(cmyk.c, cmyk.m, cmyk.y, e.target.value)} className="w-full px-2 py-1 border rounded text-sm" placeholder="K" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="h-64 rounded-lg border" style={{ backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` }} />
          <div className="mt-4 grid grid-cols-1 gap-3">
            <Swatch label="HEX" value={rgbToHex(rgb)} onCopy={copy} />
            <Swatch label="RGB" value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} onCopy={copy} />
            <Swatch label="RGBA" value={`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha.toFixed(2)})`} onCopy={copy} />
            <Swatch label="HSL" value={`hsl(${Math.round(hsl.h)}, ${(hsl.s*100).toFixed(0)}%, ${(hsl.l*100).toFixed(0)}%)`} onCopy={copy} />
            <Swatch label="HSLA" value={`hsla(${Math.round(hsl.h)}, ${(hsl.s*100).toFixed(0)}%, ${(hsl.l*100).toFixed(0)}%, ${alpha.toFixed(2)})`} onCopy={copy} />
            <Swatch label="HSV" value={`hsv(${Math.round(hsv.h)}, ${(hsv.s*100).toFixed(0)}%, ${(hsv.v*100).toFixed(0)}%)`} onCopy={copy} />
            <Swatch label="CMYK" value={`cmyk(${(cmyk.c*100).toFixed(0)}%, ${(cmyk.m*100).toFixed(0)}%, ${(cmyk.y*100).toFixed(0)}%, ${(cmyk.k*100).toFixed(0)}%)`} onCopy={copy} />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Tips</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
          <li>HEX with 8 digits includes alpha (e.g., #RRGGBBAA).</li>
          <li>Use RGB/HSL/HSV fields to tweak values precisely.</li>
        </ul>
      </div>

      {/* Blog Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Learn More About Color Conversion
        </h2>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Mastering Color Conversion and Design: A Complete Guide
              </h3>
              <p className="text-gray-700 mb-4">
                Discover the fundamentals of color theory, learn how to convert between different color formats, and master the art of color selection for your design projects.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  Color Theory
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  Design Principles
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  Color Formats
                </span>
              </div>
              <a
                href="/blog/mastering-color-conversion-and-design"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Read Full Article
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="Color Conversion Guide"
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Swatch = ({ label, value, onCopy }) => (
  <div className="p-3 bg-gray-50 border rounded flex items-center justify-between">
    <div>
      <div className="text-xs text-gray-600">{label}</div>
      <div className="text-sm text-gray-800 break-all">{value}</div>
    </div>
    <Button variant="outline" size="sm" onClick={() => onCopy(value)}>Copy</Button>
  </div>
);

export default ColorConverterTool;


