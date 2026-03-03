import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';

const ALLOWED = [
  '01-logo-only',
  '02-logo-tagline',
  '03-measure-twice-ship-once',
  '04-i-fix-things',
  '05-tool-guru-approved',
  '06-built-right',
  '07-if-it-works-dont-touch-it',
  '08-show-me-the-code',
  '09-its-a-feature',
  '10-turn-it-off-and-on',
  '11-code-blooded-bug-free',
  '12-this-should-do-the-trick',
  '13-rubber-duck-approved',
  '14-10-types-of-people',
  '15-sudo-make-me-a-sandwich',
  '16-404-sleep-not-found',
  'profile-logo-only',
  'profile-fix-it-ship-it',
  'profile-approved',
  'profile-built-right',
];

const PROFILE_ASSET = 'Profile_Photo_Transparent.png';

function textOverlaySvg(width, height, text, options = {}) {
  const { fontSize = 72, fontWeight = '700', gradient = true } = options;
  const gradientDef = gradient
    ? `<defs><linearGradient id="tg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#6366f1"/><stop offset="100%" style="stop-color:#a855f7"/></linearGradient></defs>`
    : '';
  const fill = gradient ? 'url(#tg)' : '#4f46e5';
  return Buffer.from(
    `<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${gradientDef}<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial,sans-serif" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fill}">${String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text></svg>`
  );
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name') || '01-logo-only';
    const width = Math.min(20000, Math.max(500, parseInt(searchParams.get('width'), 10) || 2250));

    if (!ALLOWED.includes(name)) {
      return NextResponse.json({ error: 'Unknown design name' }, { status: 400 });
    }

    const isProfile = name.startsWith('profile-');
    if (isProfile) {
      const profilePath = path.join(process.cwd(), 'public', 'Brand_Assets', PROFILE_ASSET);
      await fs.access(profilePath);
      const profileBuffer = await fs.readFile(profilePath);
      const meta = await sharp(profileBuffer).metadata();
      const aspect = meta.height / meta.width;
      const logoHeight = Math.round(width * aspect);
      const textAreaHeight = Math.round(width * 0.28);
      const totalHeight = logoHeight + textAreaHeight;

      const logoResized = await sharp(profileBuffer)
        .resize(width, logoHeight, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer();

      const logoMeta = await sharp(logoResized).metadata();
      const logoWidth = logoMeta.width || width;
      const left = Math.round((width - logoWidth) / 2);

      let base = await sharp({
        create: { width, height: totalHeight, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
      })
        .png()
        .toBuffer();

      const composites = [{ input: logoResized, top: 0, left }];

      if (name !== 'profile-logo-only') {
        const fontSize = Math.round(width * 0.045);
        const text =
          name === 'profile-fix-it-ship-it'
            ? 'Fix It. Ship It.'
            : name === 'profile-approved'
              ? 'TOOL GURU APPROVED'
              : 'Built Right.';
        const textSvg = textOverlaySvg(width, textAreaHeight, text, {
          fontSize: Math.min(180, fontSize),
          fontWeight: name === 'profile-approved' ? '800' : '700',
        });
        composites.push({ input: textSvg, top: logoHeight, left: 0 });
      }

      const png =
        name === 'profile-logo-only'
          ? logoResized
          : await sharp(base)
              .composite(composites)
              .png()
              .toBuffer();

      return new Response(png, {
        headers: {
          'Content-Type': 'image/png',
          'Content-Disposition': `attachment; filename="${name}-printful-${width}w.png"`,
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    const dir = path.join(process.cwd(), 'public', 'printful-designs');
    const filePath = path.join(dir, `${name}.svg`);
    await fs.access(filePath);
    const svg = await fs.readFile(filePath);

    const png = await sharp(svg)
      .resize(width, null, { withoutEnlargement: false })
      .png()
      .toBuffer();

    return new Response(png, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="${name}-printful-${width}w.png"`,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err) {
    if (err.code === 'ENOENT') {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 });
    }
    console.error('Printful design export failed:', err);
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}
