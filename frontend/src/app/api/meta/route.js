export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);

function sanitizeUrl(input) {
  try {
    const u = new URL(input);
    if (!ALLOWED_PROTOCOLS.has(u.protocol)) return null;
    u.hash = '';
    return u.toString();
  } catch {
    return null;
  }
}

function extractMeta(html) {
  const result = { title: null, description: null, canonical: null, robots: null, og: {}, twitter: {}, icons: [] };
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  result.title = titleMatch ? titleMatch[1].trim() : null;

  const metaRegex = /<meta\s+[^>]*>/gi;
  const attrRegex = /([a-zA-Z-:]+)\s*=\s*(["'])(.*?)\2/gi;
  const linkRegex = /<link\s+[^>]*>/gi;

  let m;
  while ((m = metaRegex.exec(html))) {
    const tag = m[0];
    const attrs = {};
    let a;
    while ((a = attrRegex.exec(tag))) attrs[a[1].toLowerCase()] = a[3];
    const name = attrs['name'] || attrs['property'] || '';
    const content = attrs['content'] || '';
    const lower = name.toLowerCase();
    if (lower === 'description') result.description = content;
    if (lower === 'robots') result.robots = content;
    if (lower.startsWith('og:')) result.og[lower.slice(3)] = content;
    if (lower.startsWith('twitter:')) result.twitter[lower.slice(8)] = content;
  }

  let l;
  while ((l = linkRegex.exec(html))) {
    const tag = l[0];
    const attrs = {};
    let a;
    while ((a = attrRegex.exec(tag))) attrs[a[1].toLowerCase()] = a[3];
    if ((attrs['rel'] || '').toLowerCase() === 'canonical') result.canonical = attrs['href'] || null;
    if ((attrs['rel'] || '').toLowerCase().includes('icon')) result.icons.push(attrs['href']);
  }

  return result;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const rawUrl = (searchParams.get('url') || '').trim();
  if (!rawUrl) return NextResponse.json({ error: 'Missing ?url=' }, { status: 400 });
  const safeUrl = sanitizeUrl(rawUrl);
  if (!safeUrl) return NextResponse.json({ error: 'Invalid or unsupported URL' }, { status: 400 });

  try {
    const startedAt = Date.now();
    const resp = await fetch(safeUrl, { headers: { 'user-agent': 'TheToolGuru-Meta-Analyzer' } });
    const html = await resp.text();
    const meta = extractMeta(html);
    const durationMs = Date.now() - startedAt;
    return NextResponse.json({ url: safeUrl, status: resp.status, meta, durationMs });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}


