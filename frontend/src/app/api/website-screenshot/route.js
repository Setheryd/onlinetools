import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

// Configure runtime for Vercel
export const runtime = 'nodejs';
export const maxDuration = 30;

export async function GET(request) {
  let browser = null;
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substr(2, 9);
  
  // Set timeout for the entire operation (Vercel has 10s limit for hobby plan)
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout - operation took too long')), 8000);
  });
  
  // Extract parameters first so they're available in error handling
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const format = searchParams.get('format') || 'png';
  const width = parseInt(searchParams.get('width')) || 3840;
  const quality = parseInt(searchParams.get('quality')) || 90;
  const fullPage = searchParams.get('fullPage') === 'true';
  const delay = parseInt(searchParams.get('delay')) || 2;
  
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
    // Race between the main operation and timeout
    const result = await Promise.race([
      performScreenshot(),
      timeoutPromise
    ]);
    
    return result;
  } catch (error) {
    const errorLog = logError(error);
    
    // Safely close browser
    if (browser) {
      try {
        if (browser.isConnected()) {
          await browser.close();
          console.log('Browser closed after error');
        } else {
          console.log('Browser already disconnected');
        }
      } catch (closeError) {
        console.error('Error closing browser:', closeError.message);
      }
    }

    // Handle specific errors
    if (error.message.includes('Request timeout')) {
      return NextResponse.json({ error: 'Screenshot operation timed out. Please try again with a simpler website.' }, { status: 408 });
    }

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

  async function performScreenshot() {
    // Validate URL
    if (!url) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    // Validate format
    if (!['png', 'jpeg', 'webp'].includes(format)) {
      return NextResponse.json({ error: 'Invalid format. Use png, jpeg, or webp' }, { status: 400 });
    }

    // Validate width
    if (width < 320 || width > 7680) {
      return NextResponse.json({ error: 'Width must be between 320 and 7680 pixels' }, { status: 400 });
    }

    // Launch browser with Vercel-optimized configuration
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-extensions',
        '--disable-plugins',
        '--no-first-run',
        '--disable-blink-features=AutomationControlled',
        '--disable-features=TranslateUI',
        '--disable-ipc-flooding-protection',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--single-process',
        '--no-zygote',
        '--disable-background-networking',
        '--disable-default-apps',
        '--disable-sync',
        '--disable-translate',
        '--hide-scrollbars',
        '--metrics-recording-only',
        '--mute-audio',
        '--safebrowsing-disable-auto-update',
        '--disable-client-side-phishing-detection',
        '--disable-hang-monitor',
        '--disable-popup-blocking',
        '--disable-prompt-on-repost',
        '--disable-domain-reliability',
        '--disable-features=TranslateUI,BlinkGenPropertyTrees',
        '--disable-component-extensions-with-background-pages',
        '--disable-features=VizDisplayCompositor'
      ]
    });

    const page = await browser.newPage();

    // Set viewport
    await page.setViewport({
      width: width,
      height: 1080, // Initial height, will be adjusted for full page
      deviceScaleFactor: 1,
    });

    // Set user agent to avoid bot detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // Navigate to the page with basic approach
    console.log('Attempting navigation to:', url);
    
    try {
      // Use basic navigation with minimal waiting
      await page.goto(url, {
        waitUntil: 'load',
        timeout: 10000
      });
      console.log('Navigation successful');
    } catch (navError) {
      console.log('Navigation failed:', navError.message);
      // Try with commit as fallback
      try {
        await page.goto(url, {
          waitUntil: 'commit',
          timeout: 5000
        });
        console.log('Navigation successful with commit');
      } catch (commitError) {
        throw new Error(`Failed to navigate to the website: ${navError.message}`);
      }
    }

    // Wait for animations to complete before taking screenshot
    console.log(`Waiting ${delay} seconds for animations to complete...`);
    await new Promise(resolve => setTimeout(resolve, delay * 1000));
    
    console.log('Taking screenshot after delay...');

    // Prepare screenshot options
    let screenshotOptions = {
      type: format,
      fullPage: fullPage,
    };

    // Add quality for jpeg and webp
    if (format === 'jpeg' || format === 'webp') {
      screenshotOptions.quality = quality;
    }

    console.log('Taking screenshot with options:', screenshotOptions);

    // Take screenshot immediately - no retries to avoid session issues
    let screenshot;
    try {
      screenshot = await page.screenshot(screenshotOptions);
      console.log('Screenshot taken successfully');
    } catch (screenshotError) {
      console.log('Screenshot failed:', screenshotError.message);
      throw new Error(`Failed to take screenshot: ${screenshotError.message}`);
    }

    // Get actual dimensions
    let dimensions = { width: width, height: 1080 };
    try {
      if (!page.isClosed()) {
        dimensions = await page.evaluate(() => {
          return {
            width: document.documentElement.scrollWidth,
            height: document.documentElement.scrollHeight
          };
        });
      }
    } catch (dimError) {
      console.log('Could not get page dimensions:', dimError.message);
    }

    // Close browser safely
    try {
      if (browser && !browser.isConnected()) {
        console.log('Browser already disconnected');
      } else if (browser) {
        await browser.close();
        console.log('Browser closed successfully');
      }
    } catch (closeError) {
      console.log('Error closing browser:', closeError.message);
    }
    browser = null;

    // Log successful capture
    console.log('Screenshot captured successfully:', {
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
  }
}