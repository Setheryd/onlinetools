"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Button from '../ui/Button';
import JSZip from 'jszip';

const ImageCropperTool = () => {
  const [files, setFiles] = useState([]);
  const [queue, setQueue] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [processing, setProcessing] = useState(false);

  const [cropLeft, setCropLeft] = useState(0);
  const [cropTop, setCropTop] = useState(0);
  const [cropWidth, setCropWidth] = useState(512);
  const [cropHeight, setCropHeight] = useState(512);
  const [dragging, setDragging] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [resizing, setResizing] = useState(false);
  const [activeHandle, setActiveHandle] = useState(null); // 'n','s','e','w','ne','nw','se','sw'
  const [format, setFormat] = useState('original');
  const [quality, setQuality] = useState(80);
  const imgRef = useRef(null);
  const wrapRef = useRef(null);
  const [naturalDims, setNaturalDims] = useState({ w: 0, h: 0 });
  const [displayDims, setDisplayDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const updateDisplayDims = () => {
      const imgEl = imgRef.current;
      if (!imgEl) return;
      const rect = imgEl.getBoundingClientRect();
      setDisplayDims({ w: Math.round(rect.width), h: Math.round(rect.height) });
    };
    updateDisplayDims();
    window.addEventListener('resize', updateDisplayDims);
    return () => window.removeEventListener('resize', updateDisplayDims);
  }, [queue, selectedIdx]);

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

  // Interactive crop overlay on first selected image
  const onMouseDown = (e) => {
    if (!queue[selectedIdx]?.originalUrl) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    // If click is inside existing rect, start moving; otherwise start new rect
    const inside = x >= cropLeft && x <= cropLeft + cropWidth && y >= cropTop && y <= cropTop + cropHeight;
    setDragging(true);
    setStartPoint({ x, y, moving: inside, offsetX: x - cropLeft, offsetY: y - cropTop });
    if (!inside) {
      setCropLeft(x);
      setCropTop(y);
      setCropWidth(1);
      setCropHeight(1);
    }
  };
  const onMouseMove = (e) => {
    if (!dragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    if (resizing && activeHandle) {
      const maxW = displayDims.w || rect.width;
      const maxH = displayDims.h || rect.height;
      let left = cropLeft;
      let top = cropTop;
      let width = cropWidth;
      let height = cropHeight;
      const right = left + width;
      const bottom = top + height;

      const minSize = 4;
      if (activeHandle.includes('w')) {
        left = Math.max(0, Math.min(x, right - minSize));
        width = right - left;
      }
      if (activeHandle.includes('e')) {
        const newRight = Math.max(left + minSize, Math.min(x, maxW));
        width = newRight - left;
      }
      if (activeHandle.includes('n')) {
        top = Math.max(0, Math.min(y, bottom - minSize));
        height = bottom - top;
      }
      if (activeHandle.includes('s')) {
        const newBottom = Math.max(top + minSize, Math.min(y, maxH));
        height = newBottom - top;
      }

      setCropLeft(left);
      setCropTop(top);
      setCropWidth(width);
      setCropHeight(height);
    } else if (startPoint.moving) {
      const maxLeft = Math.max(0, (displayDims.w || rect.width) - cropWidth);
      const maxTop = Math.max(0, (displayDims.h || rect.height) - cropHeight);
      const newLeft = Math.max(0, Math.min(x - startPoint.offsetX, maxLeft));
      const newTop = Math.max(0, Math.min(y - startPoint.offsetY, maxTop));
      setCropLeft(newLeft);
      setCropTop(newTop);
    } else {
      const left = Math.min(startPoint.x, x);
      const top = Math.min(startPoint.y, y);
      const maxW = displayDims.w || rect.width;
      const maxH = displayDims.h || rect.height;
      const width = Math.max(1, Math.min(Math.abs(x - startPoint.x), maxW - left));
      const height = Math.max(1, Math.min(Math.abs(y - startPoint.y), maxH - top));
      setCropLeft(left);
      setCropTop(top);
      setCropWidth(width);
      setCropHeight(height);
    }
  };
  const onMouseUp = () => { setDragging(false); setResizing(false); setActiveHandle(null); };

  const startResize = (handle, e) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveHandle(handle);
    setResizing(true);
    setDragging(true);
  };

  const processItem = async (itemIndex) => {
    const item = queue[itemIndex];
    if (!item) return;
    setQueue((q) => q.map((it, idx) => idx === itemIndex ? { ...it, status: 'processing', error: '' } : it));
    try {
      const form = new FormData();
      form.append('file', item.file);
      const sx = naturalDims.w && displayDims.w ? naturalDims.w / displayDims.w : 1;
      const sy = naturalDims.h && displayDims.h ? naturalDims.h / displayDims.h : 1;
      form.append('cropLeft', String(Math.max(0, Math.round(cropLeft * sx))));
      form.append('cropTop', String(Math.max(0, Math.round(cropTop * sy))));
      form.append('cropWidth', String(Math.max(1, Math.round(cropWidth * sx))));
      form.append('cropHeight', String(Math.max(1, Math.round(cropHeight * sy))));
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Cropper</h1>
        <p className="text-gray-600">Crop images by coordinates and size. Limit: up to 3 per batch.</p>
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Left (px)</label>
          <input type="number" value={cropLeft} onChange={(e)=>setCropLeft(parseInt(e.target.value||'0',10))} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Top (px)</label>
          <input type="number" value={cropTop} onChange={(e)=>setCropTop(parseInt(e.target.value||'0',10))} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Width (px)</label>
          <input type="number" min="1" value={cropWidth} onChange={(e)=>setCropWidth(parseInt(e.target.value||'1',10))} className="w-full px-3 py-2 border rounded text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Height (px)</label>
          <input type="number" min="1" value={cropHeight} onChange={(e)=>setCropHeight(parseInt(e.target.value||'1',10))} className="w-full px-3 py-2 border rounded text-sm" />
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
      </div>

      {/* Visual crop UI */}
      {queue.length > 0 && queue[selectedIdx] && (
        <div className="mb-6">
          <div className="text-sm text-gray-700 mb-2">Crop selection</div>
          <div className="relative inline-block max-w-full border rounded bg-white">
            <div
              ref={wrapRef}
              className="relative select-none"
              style={{ maxHeight: '24rem', overflow: 'hidden' }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              <img
                ref={imgRef}
                src={queue[selectedIdx].originalUrl}
                alt="to-crop"
                className="max-h-[24rem] w-auto block"
                onLoad={(e)=> setNaturalDims({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
              />
              {/* crop rectangle */}
              <div
                className="absolute border-2 border-blue-500 bg-blue-500/10"
                style={{ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight, cursor: 'move' }}
              >
                {/* Resize handles */}
                <div onMouseDown={(e)=>startResize('nw', e)} className="absolute w-3 h-3 bg-white border border-blue-500" style={{ left: -5, top: -5, cursor: 'nwse-resize' }} />
                <div onMouseDown={(e)=>startResize('n', e)} className="absolute w-3 h-3 bg-white border border-blue-500" style={{ left: '50%', top: -5, transform: 'translateX(-50%)', cursor: 'ns-resize' }} />
                <div onMouseDown={(e)=>startResize('ne', e)} className="absolute w-3 h-3 bg-white border border-blue-500" style={{ right: -5, top: -5, cursor: 'nesw-resize' }} />
                <div onMouseDown={(e)=>startResize('e', e)} className="absolute w-3 h-3 bg-white border border-blue-500" style={{ right: -5, top: '50%', transform: 'translateY(-50%)', cursor: 'ew-resize' }} />
                <div onMouseDown={(e)=>startResize('se', e)} className="absolute w-3 h-3 bg-white border border-blue-500" style={{ right: -5, bottom: -5, cursor: 'nwse-resize' }} />
                <div onMouseDown={(e)=>startResize('s', e)} className="absolute w-3 h-3 bg-white border border-blue-500" style={{ left: '50%', bottom: -5, transform: 'translateX(-50%)', cursor: 'ns-resize' }} />
                <div onMouseDown={(e)=>startResize('sw', e)} className="absolute w-3 h-3 bg-white border border-blue-500" style={{ left: -5, bottom: -5, cursor: 'nesw-resize' }} />
                <div onMouseDown={(e)=>startResize('w', e)} className="absolute w-3 h-3 bg-white border border-blue-500" style={{ left: -5, top: '50%', transform: 'translateY(-50%)', cursor: 'ew-resize' }} />
              </div>
            </div>
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

export default ImageCropperTool;



