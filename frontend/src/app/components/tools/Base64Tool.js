"use client";
import React, { useMemo, useRef, useState } from 'react';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';

const textEncoder = typeof window !== 'undefined' ? new TextEncoder() : null;
const getTextDecoder = () => (typeof window !== 'undefined' ? new TextDecoder() : null);

function bytesToBase64(bytes) {
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, chunk);
  }
  return btoa(binary);
}

function base64ToBytes(base64) {
  const binary = atob(base64);
  const length = binary.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function normalizeBase64(input, { urlSafe }) {
  let s = input.replace(/\s+/g, '');
  if (urlSafe) {
    s = s.replace(/-/g, '+').replace(/_/g, '/');
  }
  // re-pad to multiple of 4
  const pad = s.length % 4;
  if (pad) s += '='.repeat(4 - pad);
  return s;
}

function parseDataUrl(input) {
  const match = input.match(/^data:([^;,]+);base64,(.*)$/i);
  if (!match) return null;
  return { mime: match[1], base64: match[2] };
}

function detectMimeFromBytes(bytes) {
  if (bytes.length >= 4) {
    // PDF: %PDF
    if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) return 'application/pdf';
    // PNG: 89 50 4E 47
    if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return 'image/png';
    // JPEG: FF D8 FF
    if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
    // GIF: GIF8
    if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38) return 'image/gif';
    // WEBP: RIFF....WEBP
    if (
      bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
      bytes.length >= 12 && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
    ) return 'image/webp';
  }
  // SVG (text-based): try a quick check for "<svg"
  try {
    const decoder = getTextDecoder();
    const head = bytes.subarray(0, Math.min(256, bytes.length));
    const text = decoder ? decoder.decode(head) : '';
    if (/\<svg[\s\S]*?\>/.test(text)) return 'image/svg+xml';
  } catch {}
  return 'application/octet-stream';
}

function defaultFilenameForType(mime) {
  switch (mime) {
    case 'application/pdf':
      return 'decoded.pdf';
    case 'image/png':
      return 'decoded.png';
    case 'image/jpeg':
      return 'decoded.jpg';
    case 'image/gif':
      return 'decoded.gif';
    case 'image/webp':
      return 'decoded.webp';
    case 'image/svg+xml':
      return 'decoded.svg';
    case 'text/plain; charset=utf-8':
      return 'decoded.txt';
    default:
      return 'decoded.bin';
  }
}

const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode'); // 'encode' | 'decode'
  const [error, setError] = useState('');
  const [urlSafe, setUrlSafe] = useState(false);
  const [includePadding, setIncludePadding] = useState(true);
  const [wrapLines, setWrapLines] = useState(false);
  const [decodeAsText, setDecodeAsText] = useState(true);
  const [decodedBlobUrl, setDecodedBlobUrl] = useState('');
  const [decodedFilename, setDecodedFilename] = useState('decoded.bin');
  const [filenameTouched, setFilenameTouched] = useState(false);
  const [previewEnabled, setPreviewEnabled] = useState(true);
  const [selectedMimeType, setSelectedMimeType] = useState('auto');
  const [resolvedMimeType, setResolvedMimeType] = useState('application/octet-stream');
  const fileInputRef = useRef(null);

  const inputBytes = useMemo(() => {
    try {
      if (!input) return 0;
      if (mode === 'encode') return textEncoder ? textEncoder.encode(input).length : input.length;
      // approximate bytes for base64 input
      const s = input.replace(/\s+/g, '');
      const padding = (s.match(/=/g) || []).length;
      return Math.floor((s.length * 3) / 4) - padding;
    } catch {
      return 0;
    }
  }, [input, mode]);

  const formatBase64 = (b64) => {
    let result = b64;
    if (!includePadding) result = result.replace(/=+$/g, '');
    if (urlSafe) result = result.replace(/\+/g, '-').replace(/\//g, '_');
    if (wrapLines) result = result.replace(/(.{1,76})/g, '$1\n').trim();
    return result;
  };

  const handleEncodeText = () => {
    const encoder = textEncoder;
    if (!encoder) return;
    const bytes = encoder.encode(input);
    const base64 = bytesToBase64(bytes);
    setOutput(formatBase64(base64));
  };

  const handleEncodeFile = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const base64 = bytesToBase64(bytes);
    setOutput(formatBase64(base64));
  };

  const handleDecode = () => {
    try {
      let base64String = input.trim();
      let mimeFromDataUrl = '';
      const parsed = parseDataUrl(base64String);
      if (parsed) {
        mimeFromDataUrl = parsed.mime;
        base64String = parsed.base64;
      }
      const normalized = normalizeBase64(base64String, { urlSafe });
      const bytes = base64ToBytes(normalized);
      if (decodeAsText) {
        const decoder = getTextDecoder();
        const text = decoder ? decoder.decode(bytes) : '';
        setOutput(text);
        setDecodedBlobUrl('');
        setResolvedMimeType('text/plain; charset=utf-8');
        if (!filenameTouched) {
          setDecodedFilename(defaultFilenameForType('text/plain; charset=utf-8'));
        }
      } else {
        const type = selectedMimeType !== 'auto' ? selectedMimeType : (mimeFromDataUrl || detectMimeFromBytes(bytes));
        const blob = new Blob([bytes], { type });
        if (decodedBlobUrl) URL.revokeObjectURL(decodedBlobUrl);
        const url = URL.createObjectURL(blob);
        setDecodedBlobUrl(url);
        setResolvedMimeType(type);
        if (!filenameTouched) {
          setDecodedFilename(defaultFilenameForType(type));
        }
        setOutput('');
      }
      setError('');
    } catch (err) {
      setError('Invalid Base64 input. Please check your data and options.');
      setOutput('');
      if (decodedBlobUrl) {
        URL.revokeObjectURL(decodedBlobUrl);
        setDecodedBlobUrl('');
      }
    }
  };

  const handleProcess = () => {
    setError('');
    if (mode === 'encode') {
      handleEncodeText();
    } else {
      handleDecode();
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
    if (decodedBlobUrl) {
      URL.revokeObjectURL(decodedBlobUrl);
      setDecodedBlobUrl('');
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch {}
  };

  const handleSwap = () => {
    if (!output) return;
    setInput(output);
    setOutput('');
    setMode((prev) => (prev === 'encode' ? 'decode' : 'encode'));
  };

  const onDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      setMode('encode');
      await handleEncodeFile(file);
      setInput(`File: ${file.name} (${file.type || 'application/octet-stream'})`);
    }
  };

  const onPaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file) {
          handleEncodeFile(file);
          setMode('encode');
          setInput(`File: ${file.name} (${file.type || 'application/octet-stream'})`);
          e.preventDefault();
          return;
        }
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Base64 Encoder / Decoder</h1>
            <p className="text-gray-600">
              Fast, privacy-first Base64 with UTF-8 support, URL-safe option, and file drag & drop.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{inputBytes.toLocaleString()} bytes</span>
            <Button variant="outline" size="sm" onClick={handleSwap} disabled={!output}>
              Swap
            </Button>
          </div>
        </div>
      </div>

      {/* Mode and options */}
      <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="flex bg-gray-100 rounded-lg p-1 w-full">
          <button
            className={`flex-1 px-4 py-2 text-sm rounded-md ${mode === 'encode' ? 'bg-white shadow text-gray-900' : 'text-gray-600'}`}
            onClick={() => setMode('encode')}
          >
            Encode
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm rounded-md ${mode === 'decode' ? 'bg-white shadow text-gray-900' : 'text-gray-600'}`}
            onClick={() => setMode('decode')}
          >
            Decode
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <Checkbox label="URL-safe" checked={urlSafe} onChange={(e) => setUrlSafe(e.target.checked)} />
          <Checkbox label="Include padding" checked={includePadding} onChange={(e) => setIncludePadding(e.target.checked)} />
          <Checkbox label="Wrap 76 cols" checked={wrapLines} onChange={(e) => setWrapLines(e.target.checked)} />
        </div>

        <div className="flex items-center gap-6">
          {mode === 'decode' && (
            <Checkbox label="Decode as text" checked={decodeAsText} onChange={(e) => setDecodeAsText(e.target.checked)} />
          )}
          {mode === 'decode' && !decodeAsText && (
            <div className="flex flex-wrap items-center gap-2 w-full">
              <input
                type="text"
                value={decodedFilename}
                onChange={(e) => {
                  setFilenameTouched(true);
                  setDecodedFilename(e.target.value);
                }}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm flex-1 min-w-0"
                placeholder="Filename"
              />
              {decodedBlobUrl && (
                <a
                  href={decodedBlobUrl}
                  download={decodedFilename || 'decoded.bin'}
                  className="text-blue-600 text-sm hover:underline shrink-0"
                >
                  Download file
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {mode === 'decode' && !decodeAsText && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <Checkbox
              label="Preview in browser"
              checked={previewEnabled}
              onChange={(e) => setPreviewEnabled(e.target.checked)}
            />
          </div>
          <div className="md:col-span-2 flex items-center gap-3">
            <label className="text-sm text-gray-700">Type:</label>
            <select
              value={selectedMimeType}
              onChange={(e) => setSelectedMimeType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-800"
            >
              <option value="auto">Auto-detect</option>
              <option value="application/pdf">PDF (application/pdf)</option>
              <option value="image/png">PNG (image/png)</option>
              <option value="image/jpeg">JPEG (image/jpeg)</option>
              <option value="image/gif">GIF (image/gif)</option>
              <option value="image/webp">WEBP (image/webp)</option>
              <option value="image/svg+xml">SVG (image/svg+xml)</option>
              <option value="application/octet-stream">Binary (application/octet-stream)</option>
            </select>
            {resolvedMimeType && decodedBlobUrl && (
              <span className="text-xs text-gray-500">Detected: {resolvedMimeType}</span>
            )}
          </div>
        </div>
      )}

      {/* Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="mb-4 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-600 hover:border-blue-400"
      >
        Drag & drop a file here to encode it to Base64, or
        <button
          className="ml-1 text-blue-600 hover:underline"
          onClick={() => fileInputRef.current?.click()}
          type="button"
        >
          browse
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleEncodeFile(f);
          }}
        />
      </div>

      {/* Input */}
      <div className="mb-4">
        <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
          {mode === 'encode' ? 'Text to encode (UTF‑8)' : 'Base64 to decode'}
        </label>
        <textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPaste={onPaste}
          placeholder={mode === 'encode' ? 'Type or paste text, or drop a file above…' : 'Paste Base64 (URL-safe supported)…'}
          className="w-full h-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 resize-y text-gray-900 placeholder-gray-500"
        />
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Button onClick={handleProcess} disabled={!input.trim()}>{mode === 'encode' ? 'Encode' : 'Decode'}</Button>
        <Button variant="secondary" onClick={handleClear}>Clear</Button>
        {output && (
          <Button variant="outline" onClick={handleCopy}>Copy</Button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Output */}
      {(output || decodedBlobUrl) && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {mode === 'encode' ? 'Encoded Base64' : decodeAsText ? 'Decoded Text' : 'Decoded File'}
            </label>
            {output && (
              <Button variant="outline" size="sm" onClick={handleCopy}>Copy to clipboard</Button>
            )}
          </div>
          {output && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
              <pre className="whitespace-pre-wrap break-all text-sm text-gray-800">{output}</pre>
            </div>
          )}
          {!output && decodedBlobUrl && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
              {previewEnabled && resolvedMimeType?.startsWith('image/') && (
                <div className="w-full">
                  <img src={decodedBlobUrl} alt="Decoded preview" className="max-h-[28rem] w-auto mx-auto rounded-md border" />
                </div>
              )}
              {previewEnabled && resolvedMimeType === 'application/pdf' && (
                <div className="w-full h-[36rem]">
                  <iframe
                    title="PDF preview"
                    src={decodedBlobUrl}
                    className="w-full h-full rounded-md border"
                  />
                </div>
              )}
              {!previewEnabled || (!resolvedMimeType?.startsWith('image/') && resolvedMimeType !== 'application/pdf') ? (
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="text-sm text-gray-700">Binary data decoded. Preview not available for this type.</div>
                  <a
                    href={decodedBlobUrl}
                    download={decodedFilename || 'decoded.bin'}
                    className="text-blue-600 text-sm hover:underline shrink-0"
                  >
                    Download {decodedFilename || 'decoded.bin'}
                  </a>
                </div>
              ) : (
                <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs text-gray-500">Type: {resolvedMimeType}</span>
                  <a
                    href={decodedBlobUrl}
                    download={decodedFilename || 'decoded.bin'}
                    className="text-blue-600 text-sm hover:underline shrink-0"
                  >
                    Download
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">About Base64</h3>
        <p className="text-sm text-blue-700">
          Base64 encodes binary data as text using 64 characters. Use URL‑safe for web contexts, remove padding when required, and wrap
          lines for email (RFC 2045). Your data stays in your browser.
        </p>
      </div>
    </div>
  );
};

export default Base64Tool;
