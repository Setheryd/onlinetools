import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    
    if (!url) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    // For now, return a message that the service is temporarily unavailable
    // This can be replaced with an alternative screenshot service
    return NextResponse.json({ 
      error: 'Screenshot service is temporarily unavailable. Please try again later or contact support.',
      fallback: true,
      url: url
    }, { status: 503 });
    
  } catch (error) {
    return NextResponse.json({ 
      error: 'Service temporarily unavailable' 
    }, { status: 500 });
  }
}
