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

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const rawUrl = (searchParams.get('url') || '').trim();
  if (!rawUrl) return NextResponse.json({ error: 'Missing ?url=' }, { status: 400 });
  const safeUrl = sanitizeUrl(rawUrl);
  if (!safeUrl) return NextResponse.json({ error: 'Invalid or unsupported URL' }, { status: 400 });

  const method = 'GET';
  const maxRedirects = Math.min(parseInt(searchParams.get('maxRedirects') || '5', 10), 10);
  const userAgent = 'TheToolGuru-HTTP-Inspector';

  const chain = [];
  let currentUrl = safeUrl;
  let startOverall = Date.now();

  for (let i = 0; i <= maxRedirects; i++) {
    const start = Date.now();
    const resp = await fetch(currentUrl, {
      method,
      redirect: 'manual',
      headers: { 'user-agent': userAgent },
    });
    const durationMs = Date.now() - start;

    const headers = {};
    resp.headers.forEach((value, key) => { headers[key] = value; });

    chain.push({
      url: currentUrl,
      status: resp.status,
      statusText: resp.statusText,
      headers,
      durationMs,
    });

    const location = resp.headers.get('location');
    if (location && resp.status >= 300 && resp.status < 400) {
      currentUrl = new URL(location, currentUrl).toString();
      continue;
    }
    break;
  }

  const totalMs = Date.now() - startOverall;
  return NextResponse.json({ chain, totalMs });
}


