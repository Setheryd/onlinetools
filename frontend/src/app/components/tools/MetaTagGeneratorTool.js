"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

const MetaTagGeneratorTool = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');

  const html = useMemo(() => {
    if (!title && !description && !url && !image) return '';
    return `
<title>${title}</title>
<meta name="description" content="${description}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${image}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${image}" />
`.trim();
  }, [title, description, url, image]);

  const handleCopy = async () => {
    if (!html) return;
    try { await navigator.clipboard.writeText(html); } catch {}
  };

  const handleClear = () => {
    setTitle('');
    setDescription('');
    setUrl('');
    setImage('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meta Tag Generator</h1>
        <p className="text-gray-600">Generate SEO and social meta tags (Open Graph, Twitter) for your pages.</p>
      </div>

      {/* Examples */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Examples</label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setTitle('The Tool Guru — Free Online Tools');
              setDescription('A suite of fast, privacy-first tools for developers and creators.');
              setUrl('https://thetool.guru');
              setImage('https://thetool.guru/og-image.jpg');
            }}
          >
            Load sample
          </Button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" placeholder="Page title" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
          <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" placeholder="https://example.com/page" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" placeholder="Short description for search and social" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
          <input value={image} onChange={(e) => setImage(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900" placeholder="https://example.com/og-image.jpg" />
        </div>
      </div>

      <div className="mb-6 flex gap-3">
        <Button onClick={handleCopy} disabled={!html}>Copy</Button>
        <Button variant="secondary" onClick={handleClear}>Clear</Button>
      </div>

      {html && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Generated tags</label>
            <Button variant="outline" size="sm" onClick={handleCopy}>Copy</Button>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <pre className="whitespace-pre-wrap break-all text-sm text-gray-800">{html}</pre>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Tip</h3>
        <p className="text-sm text-blue-700">Use absolute URLs and ensure your image is accessible and large enough for social previews.</p>
      </div>
    </div>
  );
};

export default MetaTagGeneratorTool;


