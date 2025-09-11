import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const requestData = await req.json();
    const {
      method = 'GET',
      url,
      headers = [],
      body = '',
      auth = {},
      timeout = 30,
      followRedirects = true,
      maxRedirects = 5,
      verifySSL = true,
      includeHeaders = true,
      includeBody = true
    } = requestData;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate URL
    let targetUrl;
    try {
      targetUrl = new URL(url);
      if (!['http:', 'https:'].includes(targetUrl.protocol)) {
        throw new Error('Only HTTP and HTTPS protocols are supported');
      }
    } catch (error) {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    // Build fetch options
    const fetchOptions = {
      method: method.toUpperCase(),
      headers: {},
      redirect: followRedirects ? 'follow' : 'manual',
      signal: AbortSignal.timeout(timeout * 1000)
    };

    // Add headers
    headers.forEach(header => {
      if (header.enabled && header.key && header.value) {
        fetchOptions.headers[header.key] = header.value;
      }
    });

    // Add authentication
    if (auth.type === 'basic' && auth.username && auth.password) {
      const credentials = Buffer.from(`${auth.username}:${auth.password}`).toString('base64');
      fetchOptions.headers['Authorization'] = `Basic ${credentials}`;
    } else if (auth.type === 'bearer' && auth.token) {
      fetchOptions.headers['Authorization'] = `Bearer ${auth.token}`;
    } else if (auth.type === 'api-key' && auth.apiKey) {
      fetchOptions.headers[auth.apiKeyHeader || 'X-API-Key'] = auth.apiKey;
    }

    // Add body for applicable methods
    if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) && body) {
      fetchOptions.body = body;
    }

    // Add user agent if not provided
    if (!fetchOptions.headers['User-Agent']) {
      fetchOptions.headers['User-Agent'] = 'TheToolGuru-cURL/1.0';
    }

    const startTime = Date.now();
    let response;
    let responseBody = '';
    let responseHeaders = {};
    let status = 0;
    let statusText = '';
    let timing = {};

    try {
      // Make the request
      response = await fetch(targetUrl.toString(), fetchOptions);
      status = response.status;
      statusText = response.statusText;

      // Collect headers
      responseHeaders = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      // Get response body
      if (includeBody) {
        const contentType = response.headers.get('content-type') || '';
        
        if (contentType.includes('application/json')) {
          try {
            const jsonData = await response.json();
            responseBody = JSON.stringify(jsonData, null, 2);
          } catch {
            responseBody = await response.text();
          }
        } else if (contentType.includes('text/') || contentType.includes('application/xml')) {
          responseBody = await response.text();
        } else {
          // For binary content, return a placeholder
          responseBody = `[Binary content - ${contentType}]`;
        }
      }

      // Calculate timing
      const totalTime = Date.now() - startTime;
      timing = {
        total: totalTime,
        dns: 0, // DNS lookup time (not available in fetch)
        tcp: 0, // TCP connection time (not available in fetch)
        firstByte: totalTime, // Approximate first byte time
        download: 0 // Download time (not available in fetch)
      };

    } catch (error) {
      if (error.name === 'AbortError') {
        return NextResponse.json({ 
          error: `Request timeout after ${timeout} seconds` 
        }, { status: 408 });
      }
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return NextResponse.json({ 
          error: 'Network error - unable to connect to the target URL' 
        }, { status: 503 });
      }

      throw error;
    }

    // Handle redirects manually if needed
    if (!followRedirects && status >= 300 && status < 400) {
      const location = responseHeaders['location'];
      if (location) {
        responseHeaders['_redirect_location'] = location;
      }
    }

    return NextResponse.json({
      status,
      statusText,
      headers: responseHeaders,
      body: responseBody,
      timing,
      url: targetUrl.toString(),
      method: method.toUpperCase(),
      success: status >= 200 && status < 400
    });

  } catch (error) {
    console.error('cURL API Error:', error);
    
    if (error.message.includes('Invalid URL')) {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }
    
    if (error.message.includes('timeout')) {
      return NextResponse.json({ error: 'Request timeout' }, { status: 408 });
    }
    
    if (error.message.includes('network') || error.message.includes('ENOTFOUND')) {
      return NextResponse.json({ error: 'Network error - unable to resolve hostname' }, { status: 503 });
    }

    return NextResponse.json({ 
      error: 'Internal server error while processing request' 
    }, { status: 500 });
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(req) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
