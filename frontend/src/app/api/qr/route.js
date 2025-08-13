import { NextResponse } from 'next/server';
import QRCode from 'qrcode';

function parseNumber(value, fallback, { min, max } = {}) {
  const n = Number(value);
  if (Number.isFinite(n)) {
    if (typeof min === 'number' && n < min) return min;
    if (typeof max === 'number' && n > max) return max;
    return n;
  }
  return fallback;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text') || '';
    const format = (searchParams.get('format') || 'png').toLowerCase(); // 'png' | 'svg'
    const size = parseNumber(searchParams.get('size'), 256, { min: 64, max: 2048 });
    const margin = parseNumber(searchParams.get('margin'), 2, { min: 0, max: 16 });
    const errorCorrectionLevel = (searchParams.get('ec') || 'M').toUpperCase(); // L M Q H
    const colorDark = searchParams.get('dark') || '#000000';
    const colorLight = searchParams.get('light') || '#ffffff';

    if (!text.trim()) {
      return NextResponse.json({ error: 'Missing required parameter: text' }, { status: 400 });
    }

    const options = {
      errorCorrectionLevel,
      margin,
      color: { dark: colorDark, light: colorLight },
      width: size,
      type: format === 'svg' ? 'svg' : 'png',
    };

    if (format === 'svg') {
      const svg = await QRCode.toString(text, { ...options, type: 'svg' });
      return new Response(svg, {
        status: 200,
        headers: {
          'Content-Type': 'image/svg+xml; charset=utf-8',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    const buffer = await QRCode.toBuffer(text, { ...options, type: 'png' });
    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 });
  }
}


