import { NextResponse } from 'next/server';
import { cronParse } from '@/lib/toolGuruApi';

export const runtime = 'nodejs';

export async function GET(request) {
  if (!process.env.TOOL_GURU_API_URL) {
    return NextResponse.json(
      { error: 'Cron parse is not configured. Set TOOL_GURU_API_URL.' },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const expression = (searchParams.get('expression') || searchParams.get('expr') || '').trim();
  const count = searchParams.get('count');

  if (!expression) {
    return NextResponse.json({ error: 'expression is required' }, { status: 400 });
  }

  try {
    const data = await cronParse({
      expression,
      count: count != null ? parseInt(count, 10) : 10,
    });
    const nextRuns = data.next_runs ?? data.times ?? data.next_run_times ?? [];
    return NextResponse.json({ next_runs: nextRuns, ...data });
  } catch (err) {
    const status = err.status || 500;
    const message = err.detail || err.message || 'Cron parse failed';
    if (status === 429) {
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
    }
    return NextResponse.json({ error: message }, { status: status >= 400 ? status : 500 });
  }
}
