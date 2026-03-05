import { NextResponse } from 'next/server';
import { validateSitemap } from '@/lib/toolGuruApi';

export const runtime = 'nodejs';

export async function GET(request) {
  if (!process.env.TOOL_GURU_API_URL) {
    return NextResponse.json(
      { error: 'Validation is not configured. Set TOOL_GURU_API_URL.' },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const url = (searchParams.get('url') || '').trim();
  if (!url) {
    return NextResponse.json({ error: 'url is required' }, { status: 400 });
  }

  try {
    const data = await validateSitemap({ url });
    return NextResponse.json(data);
  } catch (err) {
    const status = err.status || 500;
    const message = err.detail || err.message || 'Sitemap validation failed';
    if (status === 429) {
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
    }
    return NextResponse.json({ error: message }, { status: status >= 400 ? status : 500 });
  }
}
