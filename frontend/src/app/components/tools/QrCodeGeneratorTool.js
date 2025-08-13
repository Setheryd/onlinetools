"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Button from '../ui/Button';

const defaultText = 'https://thetool.guru/';

const QrCodeGeneratorTool = () => {
  const [text, setText] = useState(defaultText);
  const [size, setSize] = useState(256);
  const [margin, setMargin] = useState(2);
  const [format, setFormat] = useState('png'); // png | svg
  const [ecLevel, setEcLevel] = useState('M'); // L M Q H
  const [dark, setDark] = useState('#000000');
  const [light, setLight] = useState('#FFFFFF');
  const [pngUrl, setPngUrl] = useState('');
  const [svgMarkup, setSvgMarkup] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const objectUrlRef = useRef('');

  const apiUrl = useMemo(() => {
    const u = new URL('/api/qr', typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    u.searchParams.set('text', text);
    u.searchParams.set('size', String(size));
    u.searchParams.set('margin', String(margin));
    u.searchParams.set('ec', ecLevel);
    u.searchParams.set('dark', dark);
    u.searchParams.set('light', light);
    u.searchParams.set('format', format);
    return u.toString();
  }, [text, size, margin, ecLevel, dark, light, format]);

  useEffect(() => {
    const generate = async () => {
      setLoading(true);
      setError('');
      try {
        if (format === 'svg') {
          const res = await fetch(apiUrl, { cache: 'no-store' });
          if (!res.ok) throw new Error('Failed to generate SVG');
          const svg = await res.text();
          setSvgMarkup(svg);
          if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
            objectUrlRef.current = '';
          }
          setPngUrl('');
        } else {
          const res = await fetch(apiUrl, { cache: 'no-store' });
          if (!res.ok) throw new Error('Failed to generate PNG');
          const blob = await res.blob();
          if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
          const url = URL.createObjectURL(blob);
          objectUrlRef.current = url;
          setPngUrl(url);
          setSvgMarkup('');
        }
      } catch (e) {
        setError('Could not generate QR code.');
      } finally {
        setLoading(false);
      }
    };

    if (text.trim()) generate();
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = '';
      }
    };
  }, [apiUrl, format, text]);

  const download = () => {
    if (format === 'svg' && svgMarkup) {
      const blob = new Blob([svgMarkup], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qr-code.svg';
      a.click();
      URL.revokeObjectURL(url);
    } else if (pngUrl) {
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = 'qr-code.png';
      a.click();
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Code Generator</h1>
        <p className="text-gray-600">Generate QR codes for URLs, text, or anything else. All processing happens on serverless route within this app.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Text or URL</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or URL..."
              className="w-full h-28 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 resize-y text-gray-900 placeholder-gray-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size (px)</label>
              <input
                type="number"
                min={64}
                max={2048}
                value={size}
                onChange={(e) => setSize(Number(e.target.value) || 256)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Margin</label>
              <input
                type="number"
                min={0}
                max={16}
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value) || 2)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Error Correction</label>
              <select
                value={ecLevel}
                onChange={(e) => setEcLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-800"
              >
                <option value="L">L - 7%</option>
                <option value="M">M - 15%</option>
                <option value="Q">Q - 25%</option>
                <option value="H">H - 30%</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-800"
              >
                <option value="png">PNG</option>
                <option value="svg">SVG</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dark Color</label>
              <input
                type="color"
                value={dark}
                onChange={(e) => setDark(e.target.value)}
                className="w-full h-10 p-1 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Light Color</label>
              <input
                type="color"
                value={light}
                onChange={(e) => setLight(e.target.value)}
                className="w-full h-10 p-1 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setText(text.trim())} disabled={!text.trim() || loading}>{loading ? 'Generating…' : 'Generate'}</Button>
            <Button variant="secondary" onClick={() => { setText(''); setPngUrl(''); setSvgMarkup(''); }}>Clear</Button>
            {(pngUrl || svgMarkup) && (
              <Button variant="outline" onClick={download}>Download</Button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg min-w-[256px] min-h-[256px] flex items-center justify-center">
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            {!error && (
              <>
                {format === 'svg' && svgMarkup && (
                  <div
                    className="max-w-full max-h-[28rem]"
                    dangerouslySetInnerHTML={{ __html: svgMarkup }}
                  />
                )}
                {format === 'png' && pngUrl && (
                  <img src={pngUrl} alt="QR code" className="max-w-full max-h-[28rem] rounded" />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Tips</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
          <li>Higher error correction increases scan reliability but makes codes denser.</li>
          <li>Use SVG for vector-perfect printing; PNG for quick sharing.</li>
        </ul>
      </div>
    </div>
  );
};

export default QrCodeGeneratorTool;


