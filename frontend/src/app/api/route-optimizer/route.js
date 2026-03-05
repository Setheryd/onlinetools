import { NextResponse } from 'next/server';
import { routeOptimizer as apiRouteOptimizer } from '@/lib/toolGuruApi';

export const runtime = 'nodejs';
export const maxDuration = 90;

export async function POST(request) {
  if (!process.env.TOOL_GURU_API_URL) {
    return NextResponse.json(
      { error: 'Route optimizer is not configured. Set TOOL_GURU_API_URL.' },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const addresses = Array.isArray(body.addresses)
    ? body.addresses.map((a) => (a && typeof a === 'string' ? a.trim() : '')).filter(Boolean)
    : [];
  if (addresses.length < 2) {
    return NextResponse.json(
      { error: 'Add at least 2 addresses.' },
      { status: 400 }
    );
  }
  if (addresses.length > 25) {
    return NextResponse.json(
      { error: 'Maximum 25 addresses allowed.' },
      { status: 400 }
    );
  }

  try {
    const data = await apiRouteOptimizer({
      addresses,
      roundtrip: body.roundtrip ?? false,
      start_at_first: body.start_at_first ?? false,
    });
    return NextResponse.json(data);
  } catch (err) {
    const status = err.status ?? 500;
    const message = err.detail ?? err.message ?? 'Route optimization failed';
    if (status === 429) {
      return NextResponse.json(
        { error: 'Too many requests. Try again in a minute.' },
        { status: 429 }
      );
    }
    if (status === 502 || status === 504) {
      return NextResponse.json(
        { error: status === 504 ? 'Request timed out. Try fewer addresses or try again.' : 'Service temporarily unavailable. Try again.' },
        { status }
      );
    }
    return NextResponse.json({ error: message }, { status: status >= 400 ? status : 500 });
  }
}
