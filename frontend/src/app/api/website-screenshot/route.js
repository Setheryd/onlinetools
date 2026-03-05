import { NextResponse } from 'next/server';
import { screenshot as toolGuruScreenshot } from '@/lib/toolGuruApi';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const format = searchParams.get('format') || 'png';
  const width = parseInt(searchParams.get('width')) || 1920;
  const quality = parseInt(searchParams.get('quality')) || 90;
  const delay = Math.min(parseInt(searchParams.get('delay')) || 1, 3);

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }
  if (!['png', 'jpeg', 'webp'].includes(format)) {
    return NextResponse.json({ error: 'Invalid format. Use png, jpeg, or webp' }, { status: 400 });
  }
  if (width < 320 || width > 1920) {
    return NextResponse.json({ error: 'Width must be between 320 and 1920 pixels' }, { status: 400 });
  }

  if (!process.env.TOOL_GURU_API_URL) {
    return NextResponse.json(
      { error: 'Screenshot service is not configured. Set TOOL_GURU_API_URL.' },
      { status: 503 }
    );
  }

  try {
    const normalizedUrl = url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`;
    const apiWidth = Math.min(3840, Math.max(320, width));
    const body = {
      url: normalizedUrl,
      width: apiWidth,
      height: 1080,
      format: format === 'jpg' ? 'jpeg' : format,
      // Use 'load' so the API finishes sooner; 'networkidle' often hits timeouts on heavy pages.
      wait_until: 'load',
    };
    if (format === 'jpeg' || format === 'webp') {
      body.quality = Math.min(100, Math.max(1, quality));
    }
    const data = await toolGuruScreenshot(body);
    const buffer = Buffer.from(data.image_base64, 'base64');
    const contentTypes = {
      png: 'image/png',
      jpeg: 'image/jpeg',
      webp: 'image/webp',
    };
    const contentType = contentTypes[data.format] || contentTypes.png;
    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Screenshot-Width': String(data.viewport_width ?? apiWidth),
        'X-Screenshot-Height': String(data.viewport_height ?? 1080),
      },
    });
  } catch (apiErr) {
    const status = apiErr.status || 500;
    const message = apiErr.detail || apiErr.message || 'Screenshot failed';
    if (status === 429) {
      return NextResponse.json({ error: 'Rate limit exceeded. Please try again in a minute.' }, { status: 429 });
    }
    if (status === 504) {
      return NextResponse.json({
        error: message || 'The page took too long to capture. Try a simpler URL or reduce the delay.',
      }, { status: 504 });
    }
    if (status === 502) {
      return NextResponse.json({
        error: message || 'Screenshot service error. Check the Tool Guru API logs for the real exception (Playwright/Chromium).',
      }, { status: 502 });
    }
    return NextResponse.json({ error: message }, { status: status >= 400 ? status : 500 });
  }
}
