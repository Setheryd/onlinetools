"use client";
import React, { useEffect, useMemo, useState } from 'react';
import Button from '../ui/Button';
import JSZip from 'jszip';

const ImageFiltersTool = () => {
  const [files, setFiles] = useState([]);
  const [queue, setQueue] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [processing, setProcessing] = useState(false);

  const [grayscale, setGrayscale] = useState(false);
  const [negate, setNegate] = useState(false);
  const [blur, setBlur] = useState(0);
  const [sharpen, setSharpen] = useState(0);
  const [brightness, setBrightness] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [hue, setHue] = useState(0);
  const [tint, setTint] = useState('');
  const [rotate, setRotate] = useState(0);
  const [flip, setFlip] = useState(false);
  const [flop, setFlop] = useState(false);
  const [format, setFormat] = useState('original');
  const [quality, setQuality] = useState(80);

  useEffect(() => {
    if (!files || files.length === 0) {
      setQueue([]);
      setSelectedIdx(0);
      return;
    }
    const now = Date.now();
    const newQueue = files.slice(0, 3).map((f, i) => ({
      id: `${now}-${i}`,
      file: f,
      name: f.name,
      size: f.size,
      originalUrl: URL.createObjectURL(f),
      status: 'queued',
      outputUrl: '',
      outputBlob: null,
      error: '',
    }));
    setQueue(newQueue);
    setSelectedIdx(0);
  }, [files]);

  const handleDrop = (e) => {
    e.preventDefault();
    const list = Array.from(e.dataTransfer.files || [])
      .filter(f => f.type.startsWith('image/'))
      .slice(0, 3);
    if (list.length) setFiles(list);
  };

  const processItem = async (itemIndex) => {
    const item = queue[itemIndex];
    if (!item) return;
    setQueue((q) => q.map((it, idx) => idx === itemIndex ? { ...it, status: 'processing', error: '' } : it));
    try {
      const form = new FormData();
      form.append('file', item.file);
      form.append('grayscale', String(grayscale));
      form.append('negate', String(negate));
      form.append('blur', String(blur));
      form.append('sharpen', String(sharpen));
      form.append('brightness', String(brightness));
      form.append('saturation', String(saturation));
      form.append('hue', String(hue));
      if (tint) form.append('tint', tint.replace('#',''));
      form.append('rotate', String(rotate));
      form.append('flip', String(flip));
      form.append('flop', String(flop));
      form.append('format', format);
      form.append('quality', String(quality));
      const res = await fetch('/api/image/process', { method: 'POST', body: form });
      if (!res.ok) {
        let errText = 'Failed to process';
        try { const j = await res.json(); errText = j.error || errText; } catch {}
        throw new Error(errText);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setQueue((q) => q.map((it, idx) => idx === itemIndex ? { ...it, outputUrl: url, outputBlob: blob, status: 'done' } : it));
    } catch (e) {
      setQueue((q) => q.map((it, idx) => idx === itemIndex ? { ...it, status: 'error', error: e.message || 'Failed to process' } : it));
    }
  };

  const handleProcessAll = async () => {
    if (!queue.length) return;
    setProcessing(true);
    const concurrency = 3;
    let nextIndex = 0;
    let active = 0;
    await new Promise((resolve) => {
      const runNext = () => {
        while (active < concurrency && nextIndex < queue.length) {
          const idx = nextIndex++;
          active += 1;
          processItem(idx).finally(() => {
            active -= 1;
            if (nextIndex >= queue.length && active === 0) {
              resolve();
            } else {
              runNext();
            }
          });
        }
      };
      runNext();
    });
    setProcessing(false);
  };

  const overallProgress = useMemo(() => {
    if (!queue.length) return 0;
    const done = queue.filter((it) => it.status === 'done').length;
    const processingCount = queue.filter((it) => it.status === 'processing').length;
    return Math.min(100, Math.round(((done + processingCount * 0.5) / queue.length) * 100));
  }, [queue]);

  const formatBytes = (bytes) => {
    if (!bytes && bytes !== 0) return '-';
    const units = ['B','KB','MB','GB'];
    let b = bytes;
    let i = 0;
    while (b >= 1024 && i < units.length - 1) { b /= 1024; i += 1; }
    return `${b.toFixed(2)} ${units[i]}`;
  };

  const downloadAll = async () => {
    const doneItems = queue.filter((it) => it.status === 'done' && it.outputBlob);
    if (!doneItems.length) return;
    const zip = new JSZip();
    for (const it of doneItems) {
      const ext = format === 'jpeg' ? 'jpg' : (format === 'original' ? (it.name.split('.').pop() || 'webp') : format);
      const base = it.name.replace(/\.[^.]+$/, '');
      zip.file(`${base}.${ext}`, it.outputBlob);
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'images.zip';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Filters</h1>
        <p className="text-gray-600">Apply filters and adjustments. Limit: up to 3 per batch.</p>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={(e)=>e.preventDefault()}
        className="mb-4 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-600 hover:border-blue-400"
      >
        Drag & drop images here, or
        <label className="ml-1 text-blue-600 hover:underline">
          browse
          <input type="file" accept="image/*" multiple className="hidden" onChange={(e)=> setFiles(Array.from(e.target.files || []).slice(0, 3))} />
        </label>
        <div className="mt-2 text-xs text-gray-500">Only the first 3 selected will be queued.</div>
      </div>

      {/* Live preview for selected image with CSS approximations */}
      {queue.length > 0 && queue[selectedIdx] && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 border rounded">
            <div className="text-sm text-gray-700 mb-2">Preview</div>
            <div className="relative flex items-center justify-center bg-white border rounded max-h-[24rem] overflow-hidden">
              <img
                src={queue[selectedIdx].originalUrl}
                alt="preview"
                className="max-h-[22rem] w-auto"
                style={{
                  transform: `rotate(${Number(rotate)||0}deg) ${flip ? 'scaleY(-1)' : ''} ${flop ? 'scaleX(-1)' : ''}`.trim(),
                  filter: `grayscale(${grayscale?1:0}) invert(${negate?1:0}) blur(${blur/10}rem) saturate(${saturation}) brightness(${brightness}) hue-rotate(${hue}deg)`
                }}
              />
              {!!tint && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ backgroundColor: tint, opacity: 0.35, mixBlendMode: 'color' }}
                />
              )}
            </div>
          </div>
          <div className="p-3 bg-gray-50 border rounded">
            <div className="text-sm text-gray-700 mb-2">Processed (after run)</div>
            {queue[selectedIdx]?.outputUrl ? (
              <img src={queue[selectedIdx].outputUrl} alt="output" className="max-h-[22rem] w-auto mx-auto rounded" />
            ) : (
              <div className="text-xs text-gray-500">Run "Process All" to see the final server output.</div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm text-gray-800">
          <input type="checkbox" checked={grayscale} onChange={(e)=>setGrayscale(e.target.checked)} />
          Grayscale
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-800">
          <input type="checkbox" checked={negate} onChange={(e)=>setNegate(e.target.checked)} />
          Invert colors
        </label>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Blur</label>
          <input type="range" min="0" max="50" value={blur} onChange={(e)=>setBlur(Number(e.target.value))} className="w-full" />
          <div className="text-xs text-gray-600">{blur}</div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Sharpen</label>
          <input type="range" min="0" max="10" value={sharpen} onChange={(e)=>setSharpen(Number(e.target.value))} className="w-full" />
          <div className="text-xs text-gray-600">{sharpen}</div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Brightness</label>
          <input type="range" min="0.1" max="3" step="0.1" value={brightness} onChange={(e)=>setBrightness(Number(e.target.value))} className="w-full" />
          <div className="text-xs text-gray-600">{brightness.toFixed(1)}</div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Saturation</label>
          <input type="range" min="0.1" max="3" step="0.1" value={saturation} onChange={(e)=>setSaturation(Number(e.target.value))} className="w-full" />
          <div className="text-xs text-gray-600">{saturation.toFixed(1)}</div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Hue</label>
          <input type="range" min="-180" max="180" value={hue} onChange={(e)=>setHue(Number(e.target.value))} className="w-full" />
          <div className="text-xs text-gray-600">{hue}</div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Tint</label>
          <input type="color" value={tint || '#ffffff'} onChange={(e)=>setTint(e.target.value)} className="w-full h-10 p-1 border rounded text-sm" />
          <div className="text-xs text-gray-600">Optional hex tint overlay</div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Rotate</label>
          <input type="number" min="0" max="359" value={rotate} onChange={(e)=>setRotate(parseInt(e.target.value||'0',10))} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-800">
          <input type="checkbox" checked={flip} onChange={(e)=>setFlip(e.target.checked)} />
          Flip vertically
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-800">
          <input type="checkbox" checked={flop} onChange={(e)=>setFlop(e.target.checked)} />
          Flip horizontally
        </label>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Output format</label>
          <select value={format} onChange={(e)=>setFormat(e.target.value)} className="w-full px-3 py-2 border rounded text-sm bg-white text-gray-800">
            <option value="original">Original</option>
            <option value="webp">WebP</option>
            <option value="avif">AVIF</option>
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Quality</label>
          <input type="range" min="1" max="100" value={quality} onChange={(e)=>setQuality(Number(e.target.value))} className="w-full" />
          <div className="text-xs text-gray-600">{quality}</div>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <Button onClick={handleProcessAll} disabled={queue.length === 0 || processing}>{processing ? 'Processing…' : 'Process All'}</Button>
        {queue.some((it) => it.status === 'done') && (
          <Button variant="outline" onClick={downloadAll}>Download All</Button>
        )}
      </div>

      {queue.length > 0 && (
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm text-gray-700">Queue</div>
            <div className="w-48 h-2 bg-gray-200 rounded overflow-hidden" title={`Overall progress: ${overallProgress}%`}>
              <div className="h-full bg-blue-600" style={{ width: `${overallProgress}%` }} />
            </div>
          </div>
          <div className="divide-y border rounded">
            {queue.map((it, idx) => (
              <div key={it.id} className={`flex items-center gap-3 p-3 ${selectedIdx===idx?'bg-blue-50':''}`}>
                <button className="flex-1 text-left" onClick={()=> setSelectedIdx(idx)}>
                  <div className="text-sm text-gray-900 truncate">{it.name}</div>
                  <div className="text-xs text-gray-500">{formatBytes(it.size)}</div>
                </button>
                <div className="w-32 h-2 bg-gray-200 rounded overflow-hidden">
                  <div className={`h-full ${it.status==='done'?'bg-green-600': it.status==='processing'?'bg-blue-600':'bg-gray-300'}`} style={{ width: it.status==='done'? '100%': it.status==='processing'?'50%':'0%' }} />
                </div>
                <div className="text-xs text-gray-600 w-20 text-right">{it.status}</div>
                {it.outputUrl && (
                  <Button size="sm" variant="outline" onClick={() => {
                    const a = document.createElement('a');
                    const ext = format === 'jpeg' ? 'jpg' : (format === 'original' ? (it.name.split('.').pop() || 'webp') : format);
                    const base = it.name.replace(/\.[^.]+$/, '');
                    a.href = it.outputUrl;
                    a.download = `${base}.${ext}`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                  }}>Download</Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageFiltersTool;



