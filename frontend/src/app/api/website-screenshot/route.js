import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

// Configure runtime for Vercel
export const runtime = 'nodejs';
export const maxDuration = 30;

export async function GET(request) {
  let browser = null;
  let page = null;
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substr(2, 9);
  
  // Extract parameters
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const format = searchParams.get('format') || 'png';
  const width = parseInt(searchParams.get('width')) || 1920;
  const quality = parseInt(searchParams.get('quality')) || 90;
  const fullPage = searchParams.get('fullPage') === 'true';
  const delay = Math.min(parseInt(searchParams.get('delay')) || 1, 3);
  
  // Enhanced error logging
  const logError = (error, context = {}) => {
    const errorLog = {
      requestId,
      timestamp: new Date().toISOString(),
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      },
      context: {
        url: url,
        format: format,
        width: width,
        quality: quality,
        fullPage: fullPage,
        delay: delay,
        ...context
      },
      duration: Date.now() - startTime,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    };
    
    console.error('Screenshot API Error:', JSON.stringify(errorLog, null, 2));
    return errorLog;
  };
  
  try {
    // Validate URL
    if (!url) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    // Validate format
    if (!['png', 'jpeg', 'webp'].includes(format)) {
      return NextResponse.json({ error: 'Invalid format. Use png, jpeg, or webp' }, { status: 400 });
    }

    // Validate width (reduced limits for stability)
    if (width < 320 || width > 1920) {
      return NextResponse.json({ error: 'Width must be between 320 and 1920 pixels' }, { status: 400 });
    }

    console.log('Starting screenshot process for:', url);

    // Launch browser with ultra-minimal configuration for stability
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--single-process',
        '--no-zygote',
        '--disable-extensions',
        '--disable-plugins',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--disable-hang-monitor',
        '--disable-popup-blocking',
        '--disable-prompt-on-repost',
        '--disable-sync',
        '--disable-translate',
        '--hide-scrollbars',
        '--mute-audio',
        '--no-first-run',
        '--disable-default-apps',
        '--disable-background-networking',
        '--disable-domain-reliability',
        '--disable-client-side-phishing-detection',
        '--disable-ipc-flooding-protection',
        '--disable-features=TranslateUI'
      ]
    });

    page = await browser.newPage();

    // Set viewport with reduced dimensions for stability
    await page.setViewport({
      width: Math.min(width, 1920),
      height: 1080,
      deviceScaleFactor: 1,
    });

    // Set user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    console.log('Navigating to:', url);

    // Try multiple navigation strategies
    let navigationSuccess = false;
    const navigationStrategies = [
      { waitUntil: 'domcontentloaded', timeout: 6000 },
      { waitUntil: 'load', timeout: 4000 },
      { waitUntil: 'commit', timeout: 3000 }
    ];

    for (let i = 0; i < navigationStrategies.length; i++) {
      try {
        const strategy = navigationStrategies[i];
        console.log(`Trying navigation strategy ${i + 1}:`, strategy.waitUntil);
        
        await page.goto(url, strategy);
        navigationSuccess = true;
        console.log(`Navigation successful with strategy ${i + 1}`);
        break;
      } catch (navError) {
        console.log(`Navigation strategy ${i + 1} failed:`, navError.message);
        if (i === navigationStrategies.length - 1) {
          throw new Error(`All navigation strategies failed. Last error: ${navError.message}`);
        }
      }
    }

    if (!navigationSuccess) {
      throw new Error('Failed to navigate to the website');
    }

    // Wait for animations (limited delay for production)
    if (delay > 0) {
      console.log(`Waiting ${delay} seconds for animations...`);
      await new Promise(resolve => setTimeout(resolve, delay * 1000));
    }

    console.log('Taking screenshot...');

    // Check if page is still valid before taking screenshot
    try {
      await page.evaluate(() => document.title);
      console.log('Page is still valid, proceeding with screenshot');
    } catch (evalError) {
      throw new Error('Page became invalid before screenshot');
    }

    // Prepare screenshot options
    const screenshotOptions = {
      type: format,
      fullPage: fullPage,
    };

    // Add quality for jpeg and webp
    if (format === 'jpeg' || format === 'webp') {
      screenshotOptions.quality = quality;
    }

    // Take screenshot with retry logic
    let screenshot = null;
    let screenshotAttempts = 0;
    const maxScreenshotAttempts = 3;

    while (!screenshot && screenshotAttempts < maxScreenshotAttempts) {
      try {
        screenshotAttempts++;
        console.log(`Screenshot attempt ${screenshotAttempts}/${maxScreenshotAttempts}`);
        
        screenshot = await page.screenshot(screenshotOptions);
        console.log('Screenshot taken successfully');
        break;
      } catch (screenshotError) {
        console.log(`Screenshot attempt ${screenshotAttempts} failed:`, screenshotError.message);
        
        if (screenshotAttempts >= maxScreenshotAttempts) {
          throw new Error(`Failed to take screenshot after ${maxScreenshotAttempts} attempts: ${screenshotError.message}`);
        }
        
        // Wait a bit before retry
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    // Get dimensions
    let dimensions = { width: width, height: 1080 };
    try {
      dimensions = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight
      }));
    } catch (dimError) {
      console.log('Could not get dimensions:', dimError.message);
    }

    // Safely close page and browser
    try {
      if (page && !page.isClosed()) {
        await page.close();
      }
    } catch (closeError) {
      console.log('Error closing page:', closeError.message);
    }
    
    try {
      if (browser && browser.isConnected()) {
        await browser.close();
      }
    } catch (closeError) {
      console.log('Error closing browser:', closeError.message);
    }
    
    browser = null;
    page = null;

    // Log success
    console.log('Screenshot completed successfully:', {
      requestId,
      url: url,
      format: format,
      width: width,
      dimensions: `${dimensions.width}x${dimensions.height}`,
      duration: Date.now() - startTime,
      size: `${(screenshot.length / 1024 / 1024).toFixed(2)} MB`
    });

    // Determine content type
    const contentTypes = {
      png: 'image/png',
      jpeg: 'image/jpeg',
      webp: 'image/webp'
    };

    // Return the screenshot
    return new Response(screenshot, {
      status: 200,
      headers: {
        'Content-Type': contentTypes[format],
        'Content-Length': screenshot.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Screenshot-Width': dimensions.width.toString(),
        'X-Screenshot-Height': dimensions.height.toString(),
      },
    });

  } catch (error) {
    console.error('Screenshot error:', error.message);
    
    // Safely close page and browser
    try {
      if (page && !page.isClosed()) {
        await page.close();
      }
    } catch (closeError) {
      console.error('Error closing page:', closeError.message);
    }
    
    try {
      if (browser && browser.isConnected()) {
        await browser.close();
      }
    } catch (closeError) {
      console.error('Error closing browser:', closeError.message);
    }

    // Log error
    logError(error);

    // Handle specific errors
    if (error.message.includes('net::ERR_NAME_NOT_RESOLVED')) {
      return NextResponse.json({ error: 'Website not found. Please check the URL and try again.' }, { status: 400 });
    }
    
    if (error.message.includes('TimeoutError') || error.message.includes('Navigation timeout')) {
      return NextResponse.json({ error: 'Website took too long to load. Please try again.' }, { status: 408 });
    }

    if (error.message.includes('Navigating frame was detached') || error.message.includes('LifecycleWatcher disposed')) {
      return NextResponse.json({ error: 'Website failed to load properly. Please try again or check if the URL is accessible.' }, { status: 500 });
    }

    if (error.message.includes('Attempted to use detached Frame') || error.message.includes('Session closed')) {
      return NextResponse.json({ error: 'Browser session was interrupted. Please try again.' }, { status: 500 });
    }

    if (error.message.includes('Page was closed')) {
      return NextResponse.json({ error: 'Page navigation was interrupted. Please try again.' }, { status: 500 });
    }

    if (error.message.includes('net::ERR_CONNECTION_REFUSED')) {
      return NextResponse.json({ error: 'Connection refused. The website may be down or blocking requests.' }, { status: 400 });
    }

    if (error.message.includes('net::ERR_SSL_PROTOCOL_ERROR')) {
      return NextResponse.json({ error: 'SSL error. Please try using http:// instead of https:// or check the website security.' }, { status: 400 });
    }

    return NextResponse.json({ 
      error: 'Failed to capture screenshot. Please check the URL and try again.' 
    }, { status: 500 });
  }
}