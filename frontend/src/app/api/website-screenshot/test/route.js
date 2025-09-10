import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request) {
  let browser = null;
  
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url') || 'https://example.com';
    
    console.log('Testing screenshot with URL:', url);
    
    // Launch browser with minimal config
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

    // Navigate
    console.log('Navigating to:', url);
    await page.goto(url, {
      waitUntil: 'load',
      timeout: 10000
    });
    console.log('Navigation successful');

    // Take screenshot
    console.log('Taking screenshot...');
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false
    });
    console.log('Screenshot taken successfully');

    await browser.close();
    browser = null;

    return new Response(screenshot, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': screenshot.length.toString(),
      },
    });

  } catch (error) {
    console.error('Test screenshot error:', error);
    
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error('Error closing browser:', closeError);
      }
    }

    return NextResponse.json({ 
      error: 'Test failed: ' + error.message 
    }, { status: 500 });
  }
}
