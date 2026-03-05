import { NextResponse } from 'next/server';
import { traceroute } from '@/lib/toolGuruApi';

export const runtime = 'nodejs';

export async function GET(request) {
  if (!process.env.TOOL_GURU_API_URL) {
    return NextResponse.json(
      { error: 'Traceroute is not configured. Set TOOL_GURU_API_URL.' },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const host = (searchParams.get('host') || '').trim();
  const maxHops = searchParams.get('max_hops');

  if (!host) {
    return NextResponse.json({ error: 'host is required' }, { status: 400 });
  }

  try {
    const data = await traceroute({ host, max_hops: maxHops ?? undefined });
    return NextResponse.json(data);
  } catch (err) {
    const status = err.status || 500;
    const message = err.detail || err.message || 'Traceroute failed';
    if (status === 429) {
      return NextResponse.json({ error: 'Rate limit exceeded. Try again in a minute.' }, { status: 429 });
    }
    return NextResponse.json({ error: message }, { status: status >= 400 ? status : 500 });
  }
}
