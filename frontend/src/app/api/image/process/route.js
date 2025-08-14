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
    // Reject large files (>15MB)
    if (typeof file.size === 'number' && file.size > 15 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Max 15MB.' }, { status: 413 });
    }
    const arrayBuffer = await file.arrayBuffer();
    const input = Buffer.from(arrayBuffer);

    // Reject extremely large dimensions (>6000 px)
    try {
      const meta = await sharp(input).metadata();
      if ((meta.width && meta.width > 6000) || (meta.height && meta.height > 6000)) {
        return NextResponse.json({ error: 'Image dimensions too large. Max 6000px in width or height.' }, { status: 400 });
      }
    } catch {}

    const width = parseInteger(form.get('width'), null);
    const height = parseInteger(form.get('height'), null);
    const fit = (form.get('fit') || 'cover'); // cover | contain | inside | outside | fill
    const format = (form.get('format') || 'webp').toLowerCase(); // jpeg | png | webp | avif | original
    const quality = parseInteger(form.get('quality'), 80);
    const strip = (form.get('strip') || 'true') === 'true';
    const position = (form.get('position') || 'center'); // center | top | right | left | bottom | entropy | attention

    // Optional crop params
    const cropLeft = parseInteger(form.get('cropLeft'), null);
    const cropTop = parseInteger(form.get('cropTop'), null);
    const cropWidth = parseInteger(form.get('cropWidth'), null);
    const cropHeight = parseInteger(form.get('cropHeight'), null);

    // Optional transform flags
    const rotate = parseInteger(form.get('rotate'), 0);
    const flip = (form.get('flip') || 'false') === 'true';
    const flop = (form.get('flop') || 'false') === 'true';
    const grayscale = (form.get('grayscale') || 'false') === 'true';
    const negate = (form.get('negate') || 'false') === 'true';
    const blur = parseInteger(form.get('blur'), 0); // 0-50
    const sharpen = parseInteger(form.get('sharpen'), 0);
    const brightness = Number.isFinite(parseFloat(form.get('brightness'))) ? parseFloat(form.get('brightness')) : 1; // 0.1-3
    const saturation = Number.isFinite(parseFloat(form.get('saturation'))) ? parseFloat(form.get('saturation')) : 1; // 0.1-3
    const hue = parseInteger(form.get('hue'), 0); // -180..180
    const tint = (form.get('tint') || '').toString(); // hex color like #rrggbb

    // Watermark (text) options
    const watermarkText = (form.get('watermarkText') || '').toString();
    const watermarkSize = parseInteger(form.get('watermarkSize'), 32);
    const watermarkColor = (form.get('watermarkColor') || '#ffffff').toString();
    const watermarkOpacity = Math.max(0, Math.min(1, Number.isFinite(parseFloat(form.get('watermarkOpacity'))) ? parseFloat(form.get('watermarkOpacity')) : 0.4));
    const watermarkGravity = (form.get('watermarkPosition') || 'southeast').toString();
    const watermarkX = parseInteger(form.get('watermarkX'), null);
    const watermarkY = parseInteger(form.get('watermarkY'), null);

    let pipeline = sharp(input, { failOnError: false }).rotate(rotate || undefined);

    // Crop first if specified
    if (cropLeft !== null && cropTop !== null && cropWidth && cropHeight) {
      pipeline = pipeline.extract({ left: Math.max(0, cropLeft), top: Math.max(0, cropTop), width: Math.max(1, cropWidth), height: Math.max(1, cropHeight) });
    }
    if (width || height) {
      pipeline = pipeline.resize({ width: width || null, height: height || null, fit, position });
    }
    if (!strip) {
      pipeline = pipeline.withMetadata();
    }

    // Filters and transforms
    if (flip) pipeline = pipeline.flip();
    if (flop) pipeline = pipeline.flop();
    if (grayscale) pipeline = pipeline.grayscale();
    if (negate) pipeline = pipeline.negate();
    if (blur && blur > 0) pipeline = pipeline.blur(Math.min(50, Math.max(0.3, blur)));
    if (sharpen && sharpen > 0) pipeline = pipeline.sharpen(Math.min(10, Math.max(0.3, sharpen)));
    if (tint && /^#?[0-9a-fA-F]{6}$/.test(tint)) {
      const color = tint.startsWith('#') ? tint : `#${tint}`;
      pipeline = pipeline.tint(color);
    }
    if (brightness !== 1 || saturation !== 1 || hue !== 0) {
      pipeline = pipeline.modulate({ brightness: Math.max(0.1, Math.min(3, brightness)), saturation: Math.max(0.1, Math.min(3, saturation)), hue });
    }

    let contentType = 'image/webp';
    let outputFormat = format;

    if (format === 'original') {
      try {
        const meta = await sharp(input).metadata();
        outputFormat = (meta.format || 'webp').toLowerCase();
      } catch {
        outputFormat = 'webp';
      }
    }

    switch (outputFormat) {
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

    // Text watermark overlay applied after formatting selection but before output buffer
    if (watermarkText) {
      // Create SVG overlay for crisp text rendering
      const svg = Buffer.from(
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="200">` +
        `<style> .wm { font: ${watermarkSize}px sans-serif; fill: ${watermarkColor}; opacity: ${watermarkOpacity}; } </style>` +
        `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="wm">${String(watermarkText).replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text>` +
        `</svg>`
      );
      if (watermarkX !== null && watermarkY !== null) {
        pipeline = pipeline.composite([{ input: svg, left: Math.max(0, watermarkX), top: Math.max(0, watermarkY) }]);
      } else {
        pipeline = pipeline.composite([{ input: svg, gravity: watermarkGravity }]);
      }
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


