import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      gradientType, 
      colors, 
      angle, 
      centerX, 
      centerY, 
      shape, 
      size, 
      conicAngle, 
      conicCenterX, 
      conicCenterY,
      waveFrequency,
      waveAmplitude,
      blobComplexity,
      blobSmoothness,
      meshResolution,
      noiseScale,
      fractalIterations,
      width = 400,
      height = 400,
      format = 'png',
      quality = 0.9
    } = body;

    // Generate CSS gradient string
    let gradientString = '';
    
    if (gradientType === 'linear') {
      gradientString = `linear-gradient(${angle}deg, ${colors.map(c => `${c.color} ${c.stop}%`).join(', ')})`;
    } else if (gradientType === 'radial') {
      gradientString = `radial-gradient(${shape} ${size} at ${centerX}% ${centerY}%, ${colors.map(c => `${c.color} ${c.stop}%`).join(', ')})`;
    } else if (gradientType === 'conic') {
      gradientString = `conic-gradient(from ${conicAngle}deg at ${conicCenterX}% ${conicCenterY}%, ${colors.map(c => `${c.color} ${c.stop}deg`).join(', ')})`;
    }

    if (format === 'svg') {
      // Generate SVG with gradient
      const svgContent = generateSVG(
        gradientType, 
        colors, 
        angle, 
        centerX, 
        centerY, 
        shape, 
        size, 
        conicAngle, 
        conicCenterX, 
        conicCenterY, 
        waveFrequency,
        waveAmplitude,
        blobComplexity,
        blobSmoothness,
        meshResolution,
        noiseScale,
        fractalIterations,
        width, 
        height
      );
      
      return new NextResponse(svgContent, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Content-Disposition': 'attachment; filename="gradient.svg"'
        }
      });
    } else {
      // For PNG/JPEG, we'll return the gradient data that can be used by the client
      return NextResponse.json({
        gradientCSS: gradientString,
        width,
        height,
        format,
        quality
      });
    }
  } catch (error) {
    console.error('Gradient generation error:', error);
    return NextResponse.json({ error: 'Failed to generate gradient' }, { status: 500 });
  }
}

function generateSVG(gradientType, colors, angle, centerX, centerY, shape, size, conicAngle, conicCenterX, conicCenterY, waveFrequency, waveAmplitude, blobComplexity, blobSmoothness, meshResolution, noiseScale, fractalIterations, width, height) {
  let gradientDef = '';
  
  if (gradientType === 'linear') {
    // Convert angle to SVG coordinates
    const rad = (angle - 90) * Math.PI / 180;
    const x1 = 0.5 - Math.cos(rad) * 0.5;
    const y1 = 0.5 - Math.sin(rad) * 0.5;
    const x2 = 0.5 + Math.cos(rad) * 0.5;
    const y2 = 0.5 + Math.sin(rad) * 0.5;
    
    gradientDef = `
      <linearGradient id="gradient" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
        ${colors.map(c => `<stop offset="${c.stop}%" style="stop-color:${c.color};stop-opacity:1" />`).join('')}
      </linearGradient>
    `;
  } else if (gradientType === 'radial') {
    gradientDef = `
      <radialGradient id="gradient" cx="${centerX}%" cy="${centerY}%" r="${size === 'farthest-corner' ? '70%' : '50%'}">
        ${colors.map(c => `<stop offset="${c.stop}%" style="stop-color:${c.color};stop-opacity:1" />`).join('')}
      </radialGradient>
    `;
  } else if (gradientType === 'conic') {
    // SVG doesn't have native conic gradients, so we'll create a radial approximation
    gradientDef = `
      <radialGradient id="gradient" cx="${conicCenterX}%" cy="${conicCenterY}%" r="70%">
        ${colors.map(c => `<stop offset="${c.stop}%" style="stop-color:${c.color};stop-opacity:1" />`).join('')}
      </radialGradient>
    `;
  } else {
    // For custom gradients, fallback to linear gradient
    const rad = (angle - 90) * Math.PI / 180;
    const x1 = 0.5 - Math.cos(rad) * 0.5;
    const y1 = 0.5 - Math.sin(rad) * 0.5;
    const x2 = 0.5 + Math.cos(rad) * 0.5;
    const y2 = 0.5 + Math.sin(rad) * 0.5;
    
    gradientDef = `
      <linearGradient id="gradient" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
        ${colors.map(c => `<stop offset="${c.stop}%" style="stop-color:${c.color};stop-opacity:1" />`).join('')}
      </linearGradient>
    `;
  }

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${gradientDef}
      </defs>
      <rect width="100%" height="100%" fill="url(#gradient)"/>
    </svg>
  `;
}
