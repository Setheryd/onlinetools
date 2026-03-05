import { NextResponse } from 'next/server';
import { redirectCheck } from '@/lib/toolGuruApi';

export const runtime = 'nodejs';
export const maxDuration = 30;

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

/** Normalize API response to { chain, totalMs } for RedirectCheckerTool. */
function normalizeChain(data) {
  const raw = data.chain || data.redirects || data.hops || [];
  if (!Array.isArray(raw) || raw.length === 0) {
    return {
      chain: [],
      totalMs: data.totalMs ?? data.total_time_ms ?? 0,
    };
  }
  const chain = raw.map((hop) => {
    const status = hop.status ?? hop.status_code ?? 0;
    return {
      url: hop.url ?? hop.final_url ?? '',
      status,
      statusText: hop.status_text ?? hop.statusText ?? (status >= 400 ? 'Error' : 'OK'),
      headers: hop.headers && typeof hop.headers === 'object' ? hop.headers : {},
      durationMs: hop.durationMs ?? hop.duration_ms ?? 0,
    };
  });
  let totalMs = data.totalMs ?? data.total_time_ms;
  if (totalMs == null && chain.length > 0) {
    totalMs = chain.reduce((sum, h) => sum + (h.durationMs || 0), 0);
  }
  return { chain, totalMs: totalMs ?? 0 };
}

export async function GET(request) {
  if (!process.env.TOOL_GURU_API_URL) {
    return NextResponse.json(
      { error: 'Redirect check is not configured. Set TOOL_GURU_API_URL.' },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const rawUrl = (searchParams.get('url') || '').trim();
  if (!rawUrl) {
    return NextResponse.json({ error: 'url is required' }, { status: 400 });
  }
  const url = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
  const safeUrl = sanitizeUrl(url);
  if (!safeUrl) {
    return NextResponse.json({ error: 'Invalid or unsupported URL' }, { status: 400 });
  }

  try {
    const data = await redirectCheck({ url: safeUrl });
    const normalized = normalizeChain(data);
    return NextResponse.json(normalized);
  } catch (err) {
    const status = err.status || 500;
    const message = err.detail || err.message || 'Redirect check failed';
    if (status === 429) {
      return NextResponse.json({ error: 'Rate limit exceeded. Try again in a minute.' }, { status: 429 });
    }
    return NextResponse.json({ error: message }, { status: status >= 400 ? status : 500 });
  }
}
