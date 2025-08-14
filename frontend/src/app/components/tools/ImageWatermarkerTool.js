"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Button from '../ui/Button';
import JSZip from 'jszip';

const ImageWatermarkerTool = () => {
  const [files, setFiles] = useState([]);
  const [queue, setQueue] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [processing, setProcessing] = useState(false);

  const [text, setText] = useState('The Tool Guru');
  const [size, setSize] = useState(36);
  const [color, setColor] = useState('#ffffff');
  const [opacity, setOpacity] = useState(0.4);
  const [position, setPosition] = useState('southeast');
  const [format, setFormat] = useState('original');
  const [quality, setQuality] = useState(80);
  const [strip, setStrip] = useState(true);
  const [customPos, setCustomPos] = useState(false);
  const [wmX, setWmX] = useState(24);
  const [wmY, setWmY] = useState(24);
  const [draggingWm, setDraggingWm] = useState(false);
  const [dragOffset, setDragOffset] = useState({ dx: 0, dy: 0 });
  const [naturalDims, setNaturalDims] = useState({ w: 0, h: 0 });
  const [displayDims, setDisplayDims] = useState({ w: 0, h: 0 });
  const imgRef = useRef(null);
  const previewWrapRef = useRef(null);

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
      form.append('watermarkText', text);
      form.append('watermarkSize', String(size));
      form.append('watermarkColor', color);
      form.append('watermarkOpacity', String(opacity));
      if (customPos && naturalDims.w && displayDims.w) {
        const scaleX = naturalDims.w / displayDims.w;
        const scaleY = naturalDims.h / displayDims.h;
        const sx = Math.max(0, Math.round(wmX * scaleX));
        const sy = Math.max(0, Math.round(wmY * scaleY));
        form.append('watermarkX', String(sx));
        form.append('watermarkY', String(sy));
      } else {
        form.append('watermarkPosition', position);
      }
      form.append('format', format);
      form.append('quality', String(quality));
      form.append('strip', String(strip));
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

  // Preview helpers
  const rgbaFromHex = (hex, alpha) => {
    const h = hex.replace('#','');
    const r = parseInt(h.slice(0,2),16);
    const g = parseInt(h.slice(2,4),16);
    const b = parseInt(h.slice(4,6),16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const positionStyle = (pos) => {
    switch (pos) {
      case 'northwest': return { top: '8px', left: '8px', transform: 'none', justifyContent: 'flex-start', alignItems: 'flex-start' };
      case 'north': return { top: '8px', left: '50%', transform: 'translateX(-50%)', justifyContent: 'center', alignItems: 'flex-start' };
      case 'northeast': return { top: '8px', right: '8px', transform: 'none', justifyContent: 'flex-end', alignItems: 'flex-start' };
      case 'west': return { left: '8px', top: '50%', transform: 'translateY(-50%)', justifyContent: 'flex-start', alignItems: 'center' };
      case 'center': return { left: '50%', top: '50%', transform: 'translate(-50%, -50%)', justifyContent: 'center', alignItems: 'center' };
      case 'east': return { right: '8px', top: '50%', transform: 'translateY(-50%)', justifyContent: 'flex-end', alignItems: 'center' };
      case 'southwest': return { bottom: '8px', left: '8px', transform: 'none', justifyContent: 'flex-start', alignItems: 'flex-end' };
      case 'south': return { bottom: '8px', left: '50%', transform: 'translateX(-50%)', justifyContent: 'center', alignItems: 'flex-end' };
      case 'southeast':
      default: return { bottom: '8px', right: '8px', transform: 'none', justifyContent: 'flex-end', alignItems: 'flex-end' };
    }
  };

  // Measure displayed image size
  useEffect(() => {
    const updateDims = () => {
      const imgEl = imgRef.current;
      if (!imgEl) return;
      const rect = imgEl.getBoundingClientRect();
      setDisplayDims({ w: Math.round(rect.width), h: Math.round(rect.height) });
    };
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, [queue, selectedIdx]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Watermarker</h1>
        <p className="text-gray-600">Add a text watermark to your images. Limit: up to 3 per batch.</p>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Text</label>
          <input type="text" value={text} onChange={(e)=>setText(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Font size</label>
          <input type="number" min="8" max="256" value={size} onChange={(e)=>setSize(Number(e.target.value)||36)} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Color</label>
          <input type="color" value={color} onChange={(e)=>setColor(e.target.value)} className="w-full h-10 p-1 border rounded text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Opacity</label>
          <input type="range" min="0" max="1" step="0.05" value={opacity} onChange={(e)=>setOpacity(Number(e.target.value))} className="w-full" />
          <div className="text-xs text-gray-600">{opacity.toFixed(2)}</div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Position</label>
          <select value={position} onChange={(e)=>setPosition(e.target.value)} className="w-full px-3 py-2 border rounded text-sm bg-white text-gray-800" disabled={customPos}>
            <option value="northwest">Top Left</option>
            <option value="north">Top</option>
            <option value="northeast">Top Right</option>
            <option value="west">Left</option>
            <option value="center">Center</option>
            <option value="east">Right</option>
            <option value="southwest">Bottom Left</option>
            <option value="south">Bottom</option>
            <option value="southeast">Bottom Right</option>
          </select>
          <label className="mt-2 flex items-center gap-2 text-sm text-gray-800">
            <input type="checkbox" checked={customPos} onChange={(e)=>setCustomPos(e.target.checked)} />
            Drag watermark manually
          </label>
        </div>
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
        <label className="flex items-center gap-2 text-sm text-gray-800">
          <input type="checkbox" checked={strip} onChange={(e)=>setStrip(e.target.checked)} />
          Strip metadata (EXIF)
        </label>
      </div>

      {/* Live preview for selected image */}
      {queue.length > 0 && queue[selectedIdx] && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 border rounded">
            <div className="text-sm text-gray-700 mb-2">Preview</div>
            <div ref={previewWrapRef} className="relative max-h-[24rem] overflow-hidden flex items-center justify-center bg-white border rounded">
              {queue[selectedIdx]?.originalUrl && (
                <div className="relative">
                  <img
                    ref={imgRef}
                    src={queue[selectedIdx].originalUrl}
                    alt="preview"
                    className="max-h-[22rem] w-auto"
                    onLoad={(e)=> setNaturalDims({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
                  />
                  {text && (
                    <div className="absolute inset-0">
                      {customPos ? (
                        <div
                          className="absolute cursor-move select-none"
                          style={{ left: wmX, top: wmY, color: rgbaFromHex(color, opacity), fontSize: `${size}px`, fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                          onMouseDown={(e)=>{
                            e.preventDefault();
                            const rect = e.currentTarget.getBoundingClientRect();
                            setDraggingWm(true);
                            setDragOffset({ dx: e.clientX - rect.left, dy: e.clientY - rect.top });
                          }}
                          onMouseUp={(e)=>{ e.preventDefault(); setDraggingWm(false); }}
                          onMouseMove={(e)=>{
                            if (!draggingWm) return;
                            e.preventDefault();
                            const wrap = previewWrapRef.current;
                            if (!wrap) return;
                            const wrect = wrap.getBoundingClientRect();
                            let nx = e.clientX - wrect.left - dragOffset.dx;
                            let ny = e.clientY - wrect.top - dragOffset.dy;
                            // Constrain
                            const maxX = Math.max(0, displayDims.w - size * 6);
                            const maxY = Math.max(0, displayDims.h - size * 1.2);
                            nx = Math.max(0, Math.min(nx, isFinite(maxX)?maxX:nx));
                            ny = Math.max(0, Math.min(ny, isFinite(maxY)?maxY:ny));
                            setWmX(Math.round(nx));
                            setWmY(Math.round(ny));
                          }}
                          onMouseLeave={()=> setDraggingWm(false)}
                        >
                          {text}
                        </div>
                      ) : (
                        <div
                          className="absolute select-none"
                          style={{ ...positionStyle(position), color: rgbaFromHex(color, opacity), fontSize: `${size}px`, fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                        >
                          {text}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="p-3 bg-gray-50 border rounded">
            <div className="text-sm text-gray-700 mb-2">Processed (after run)</div>
            {queue[selectedIdx]?.outputUrl ? (
              <img src={queue[selectedIdx].outputUrl} alt="output" className="max-h-[22rem] w-auto mx-auto rounded" />
            ) : (
              <div className="text-xs text-gray-500">Run "Process All" or process this item to see the final result.</div>
            )}
          </div>
        </div>
      )}

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

export default ImageWatermarkerTool;



