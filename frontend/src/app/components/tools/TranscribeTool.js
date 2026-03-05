'use client';

import React, { useState, useRef } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const ACCEPT = 'audio/*,video/*,.mp3,.wav,.m4a,.ogg,.webm,.mp4';

const TranscribeTool = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    setError('');
    setResult(null);
  };

  const run = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });
      const raw = await res.text();
      let json;
      try {
        json = raw ? JSON.parse(raw) : {};
      } catch {
        if (!res.ok) {
          if (res.status === 413) {
            setError('File too large. Maximum size is 25 MB. The server may have a lower limit.');
            return;
          }
          setError(res.status === 500 ? 'Server error. Try again later.' : `Request failed (${res.status}).`);
          return;
        }
        setError('Invalid response from server.');
        return;
      }
      if (!res.ok) throw new Error(json.error || json.detail || 'Transcription failed');
      setResult(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const text = result && (result.text ?? result.transcript ?? '');
  const copyText = () => {
    if (text) navigator.clipboard.writeText(text);
  };
  const downloadText = () => {
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'transcript.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Audio to Text (Transcribe)</h1>
      <p className="text-gray-600 mb-6">
        Upload an audio or video file and get a text transcript. Powered by server-side speech recognition (e.g. Whisper). Supports MP3, WAV, M4A, and common video formats. Max 25 MB (uploads through this page may be limited to about 4.5 MB by the host).
      </p>

      <div className="flex flex-wrap items-end gap-3 mb-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Audio or video file</label>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <Button onClick={run} disabled={!file || loading}>
          {loading ? 'Transcribing…' : 'Transcribe'}
        </Button>
      </div>

      {file && !loading && (
        <p className="text-sm text-gray-500 mb-4">
          Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
        </p>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm mb-4">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          {text ? (
            <div className="p-4 bg-white border rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900">Transcript</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={copyText}>Copy</Button>
                  <Button size="sm" variant="outline" onClick={downloadText}>Download</Button>
                </div>
              </div>
              <pre className="text-sm text-gray-900 whitespace-pre-wrap break-words max-h-[50vh] overflow-y-auto p-3 bg-gray-50 rounded border">
                {text}
              </pre>
            </div>
          ) : (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-900 text-sm">
              No speech detected. The file may be silent, too short, or in an unsupported format.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TranscribeTool;
