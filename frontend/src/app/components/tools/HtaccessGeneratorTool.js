"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

const recipes = {
  forceHttps: [
    'RewriteEngine On',
    'RewriteCond %{HTTPS} !=on',
    'RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]'
  ].join('\n'),
  nonWwwToWww: [
    'RewriteEngine On',
    'RewriteCond %{HTTP_HOST} !^www\.',
    'RewriteRule ^ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]'
  ].join('\n'),
  wwwToNonWww: [
    'RewriteEngine On',
    'RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]',
    'RewriteRule ^ https://%1%{REQUEST_URI} [L,R=301]'
  ].join('\n'),
  cacheStatic: [
    '<IfModule mod_expires.c>',
    '  ExpiresActive On',
    '  ExpiresByType image/jpg "access plus 1 year"',
    '  ExpiresByType image/jpeg "access plus 1 year"',
    '  ExpiresByType image/gif "access plus 1 year"',
    '  ExpiresByType image/png "access plus 1 year"',
    '  ExpiresByType text/css "access plus 1 month"',
    '  ExpiresByType application/javascript "access plus 1 month"',
    '</IfModule>'
  ].join('\n'),
  corsBasic: [
    '<IfModule mod_headers.c>',
    '  Header set Access-Control-Allow-Origin "*"',
    '  Header set Access-Control-Allow-Methods "GET,POST,OPTIONS"',
    '  Header set Access-Control-Allow-Headers "Content-Type, Authorization"',
    '</IfModule>'
  ].join('\n'),
  gzipCompression: [
    '<IfModule mod_deflate.c>',
    '  AddOutputFilterByType DEFLATE text/plain text/html text/xml text/css application/javascript application/json',
    '</IfModule>'
  ].join('\n'),
  blockDotFiles: [
    '<FilesMatch "^\..*">',
    '  Require all denied',
    '</FilesMatch>'
  ].join('\n'),
};

const HtaccessGeneratorTool = () => {
  const [enableHttps, setEnableHttps] = useState(true);
  const [hostMode, setHostMode] = useState('none'); // none | toWww | toNonWww
  const [enableCache, setEnableCache] = useState(false);
  const [enableCors, setEnableCors] = useState(false);
  const [enableGzip, setEnableGzip] = useState(false);
  const [blockDotfiles, setBlockDotfiles] = useState(true);
  const [custom, setCustom] = useState('');

  const htaccess = useMemo(() => {
    const parts = [];
    if (enableHttps) parts.push(recipes.forceHttps);
    if (hostMode === 'toWww') parts.push(recipes.nonWwwToWww);
    if (hostMode === 'toNonWww') parts.push(recipes.wwwToNonWww);
    if (enableCache) parts.push(recipes.cacheStatic);
    if (enableCors) parts.push(recipes.corsBasic);
    if (enableGzip) parts.push(recipes.gzipCompression);
    if (blockDotfiles) parts.push(recipes.blockDotFiles);
    if (custom.trim()) parts.push(custom.trim());
    return parts.join('\n\n');
  }, [enableHttps, hostMode, enableCache, enableCors, enableGzip, blockDotfiles, custom]);

  const copy = async () => { try { await navigator.clipboard.writeText(htaccess); } catch {} };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">.htaccess Generator</h1>
      <p className="text-gray-600 mb-4">Generate common Apache .htaccess rules (HTTPS, WWW redirects, caching) and add your own.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm text-gray-800">
            <input type="checkbox" checked={enableHttps} onChange={(e)=>setEnableHttps(e.target.checked)} />
            Force HTTPS
          </label>
          <div>
            <div className="text-sm text-gray-700 mb-1">Host redirect</div>
            <div className="flex gap-2">
              {[
                {k:'none', label:'None'},
                {k:'toWww', label:'non-www → www'},
                {k:'toNonWww', label:'www → non-www'}
              ].map(o => (
                <button key={o.k} onClick={()=>setHostMode(o.k)} className={`px-3 py-1 rounded text-sm ${hostMode===o.k?'bg-gray-200':'bg-gray-100'}`}>{o.label}</button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-800">
            <input type="checkbox" checked={enableCache} onChange={(e)=>setEnableCache(e.target.checked)} />
            Add caching headers for static files
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-800">
            <input type="checkbox" checked={enableCors} onChange={(e)=>setEnableCors(e.target.checked)} />
            Add basic CORS headers
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-800">
            <input type="checkbox" checked={enableGzip} onChange={(e)=>setEnableGzip(e.target.checked)} />
            Enable gzip compression
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-800">
            <input type="checkbox" checked={blockDotfiles} onChange={(e)=>setBlockDotfiles(e.target.checked)} />
            Block access to dotfiles
          </label>
          <div>
            <div className="text-sm text-gray-700 mb-1">Custom rules</div>
            <textarea value={custom} onChange={(e)=>setCustom(e.target.value)} className="w-full h-40 px-3 py-2 border rounded text-sm font-mono" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700">.htaccess</span>
            <Button variant="outline" size="sm" onClick={copy}>Copy</Button>
          </div>
          <textarea readOnly value={htaccess} className="w-full h-96 px-3 py-2 border rounded text-sm font-mono bg-gray-50" />
        </div>
      </div>
    </div>
  );
};

export default HtaccessGeneratorTool;


