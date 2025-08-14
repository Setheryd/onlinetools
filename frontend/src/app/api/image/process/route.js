import { NextResponse } from 'next/server';
import sharp from 'sharp';

function parseInteger(value, fallback) {
  const n = parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

export async function POST(request) {
  try {
    const form = await request.formData();
    const file = form.get('file');
    if (!file) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    }
    const arrayBuffer = await file.arrayBuffer();
    const input = Buffer.from(arrayBuffer);

    const width = parseInteger(form.get('width'), null);
    const height = parseInteger(form.get('height'), null);
    const fit = (form.get('fit') || 'cover'); // cover | contain | inside | outside | fill
    const format = (form.get('format') || 'webp').toLowerCase(); // jpeg | png | webp | avif
    const quality = parseInteger(form.get('quality'), 80);
    const strip = (form.get('strip') || 'true') === 'true';
    const position = (form.get('position') || 'center'); // center | top | right | left | bottom | entropy | attention

    let pipeline = sharp(input, { failOnError: false }).rotate();
    if (width || height) {
      pipeline = pipeline.resize({ width: width || null, height: height || null, fit, position });
    }
    if (!strip) {
      pipeline = pipeline.withMetadata();
    }

    let contentType = 'image/webp';
    switch (format) {
      case 'jpeg':
      case 'jpg':
        pipeline = pipeline.jpeg({ quality: Math.max(1, Math.min(100, quality)), mozjpeg: true });
        contentType = 'image/jpeg';
        break;
      case 'png':
        pipeline = pipeline.png({ quality: Math.max(1, Math.min(100, quality)) });
        contentType = 'image/png';
        break;
      case 'avif':
        pipeline = pipeline.avif({ quality: Math.max(1, Math.min(100, quality)) });
        contentType = 'image/avif';
        break;
      case 'webp':
      default:
        pipeline = pipeline.webp({ quality: Math.max(1, Math.min(100, quality)) });
        contentType = 'image/webp';
        break;
    }

    const output = await pipeline.toBuffer();
    return new Response(output, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('Image processing failed:', err);
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
  }
}


