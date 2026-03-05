import { NextResponse } from 'next/server';
import { extractArticle } from '@/lib/toolGuruApi';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request) {
  if (!process.env.TOOL_GURU_API_URL) {
    return NextResponse.json(
      { error: 'Article extraction is not configured. Set TOOL_GURU_API_URL.' },
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

  const format = ['text', 'markdown', 'json'].includes(body.format) ? body.format : 'text';
  const include_metadata = typeof body.include_metadata === 'boolean' ? body.include_metadata : true;

  try {
    const data = await extractArticle({
      url: url.startsWith('http') ? url : `https://${url}`,
      format,
      include_metadata,
    });
    return NextResponse.json(data);
  } catch (err) {
    const status = err.status || 500;
    const message = err.detail || err.message || 'Article extraction failed';
    if (status === 429) {
      return NextResponse.json({ error: 'Rate limit exceeded. Try again in a minute.' }, { status: 429 });
    }
    return NextResponse.json({ error: message }, { status: status >= 400 ? status : 500 });
  }
}
