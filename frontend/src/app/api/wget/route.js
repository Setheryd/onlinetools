import { NextResponse } from 'next/server';
import { wget } from '@/lib/toolGuruApi';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request) {
  if (!process.env.TOOL_GURU_API_URL) {
    return NextResponse.json(
      { error: 'URL fetch is not configured. Set TOOL_GURU_API_URL.' },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const url = typeof body.url === 'string' ? body.url.trim() : '';
  if (!url) {
    return NextResponse.json({ error: 'url is required' }, { status: 400 });
  }

  try {
    const data = await wget({
      url: url.startsWith('http') ? url : `https://${url}`,
      method: body.method || 'GET',
      includeBody: body.includeBody !== false,
    });
    return NextResponse.json(data);
  } catch (err) {
    const status = err.status || 500;
    const message = err.detail || err.message || 'URL fetch failed';
    if (status === 429) {
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
    }
    return NextResponse.json({ error: message }, { status: status >= 400 ? status : 500 });
  }
}
