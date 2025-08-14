export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);

function sanitizeUrl(input) {
  try {
    const u = new URL(input);
    if (!ALLOWED_PROTOCOLS.has(u.protocol)) return null;
    u.pathname = '/robots.txt';
    u.search = '';
    u.hash = '';
    return u.toString();
  } catch {
    return null;
  }
}

function isAllowed(robotsTxt, path, userAgent = '*') {
  // Minimalistic parser: respects Disallow/Allow for the provided UA
  const lines = robotsTxt.split(/\r?\n/).map(l => l.trim());
  let applies = false;
  const rules = [];
  for (const line of lines) {
    if (!line || line.startsWith('#')) continue;
    const [key, ...rest] = line.split(':');
    const value = rest.join(':').trim();
    const k = key.toLowerCase();
    if (k === 'user-agent') {
      const ua = value.toLowerCase();
      applies = ua === '*' || ua === userAgent.toLowerCase();
    } else if (applies && (k === 'disallow' || k === 'allow')) {
      rules.push({ type: k, pattern: value });
    }
  }
  // Longest match wins; Allow overrides Disallow of shorter length
  let matched = { type: 'allow', length: 0 };
  for (const rule of rules) {
    if (!rule.pattern) continue;
    if (path.startsWith(rule.pattern)) {
      const len = rule.pattern.length;
      if (len > matched.length) matched = { type: rule.type, length: len };
    }
  }
  return matched.type !== 'disallow';
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const site = (searchParams.get('site') || '').trim();
  const path = (searchParams.get('path') || '/').trim() || '/';
  const ua = (searchParams.get('ua') || '*').trim();
  if (!site) return NextResponse.json({ error: 'Missing ?site=' }, { status: 400 });
  const robotsUrl = sanitizeUrl(site);
  if (!robotsUrl) return NextResponse.json({ error: 'Invalid site URL' }, { status: 400 });

  try {
    const resp = await fetch(robotsUrl, { headers: { 'user-agent': 'TheToolGuru-Robots-Tester' } });
    const text = await resp.text();
    const allowed = isAllowed(text, path, ua);
    return NextResponse.json({ robotsUrl, status: resp.status, allowed, ua, path, robotsTxt: text });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}


