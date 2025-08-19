#!/usr/bin/env node

/**
 * Performance Check Script for The Tool Guru
 * Run with: node scripts/performance-check.js
 */

const https = require('https');
const http = require('http');

const BASE_URL = 'https://thetool.guru';

// Test URLs
const TEST_URLS = [
  '/',
  '/tools',
  '/tools/password-generator',
  '/tools/base64',
  '/blog',
  '/about'
];

// Performance metrics
const metrics = {
  responseTime: [],
  dnsLookup: [],
  tcpConnection: [],
  firstByte: [],
  downloadTime: []
};

// Make detailed performance request
function makeDetailedRequest(url) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-Audit-Bot/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    };

    const req = https.request(options, (res) => {
      const firstByteTime = Date.now() - startTime;
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const totalTime = Date.now() - startTime;
        const downloadTime = totalTime - firstByteTime;
        
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          timing: {
            total: totalTime,
            firstByte: firstByteTime,
            download: downloadTime
          }
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.on('socket', (socket) => {
      socket.on('lookup', () => {
        console.log(`  DNS lookup started for ${urlObj.hostname}`);
      });
      
      socket.on('connect', () => {
        console.log(`  TCP connection established`);
      });
    });

    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

// Check server response headers
function analyzeHeaders(headers) {
  const analysis = {
    hasGzip: headers['content-encoding'] === 'gzip',
    hasCacheControl: !!headers['cache-control'],
    hasETag: !!headers['etag'],
    hasLastModified: !!headers['last-modified'],
    contentType: headers['content-type'] || 'unknown',
    contentLength: headers['content-length'] || 'unknown',
    server: headers['server'] || 'unknown'
  };
  
  return analysis;
}

// Check for common performance issues
function checkPerformanceIssues(body, headers) {
  const issues = [];
  
  // Check for large images
  const imgMatches = body.match(/<img[^>]+src=["']([^"']+)["']/gi);
  if (imgMatches && imgMatches.length > 10) {
    issues.push(`Large number of images: ${imgMatches.length}`);
  }
  
  // Check for external resources
  const externalScripts = body.match(/<script[^>]+src=["'](https?:\/\/[^"']+)["']/gi);
  if (externalScripts && externalScripts.length > 5) {
    issues.push(`Many external scripts: ${externalScripts.length}`);
  }
  
  // Check for inline styles
  const inlineStyles = body.match(/<style[^>]*>[\s\S]*?<\/style>/gi);
  if (inlineStyles && inlineStyles.length > 3) {
    issues.push(`Multiple inline style blocks: ${inlineStyles.length}`);
  }
  
  // Check for large HTML size
  const htmlSize = body.length;
  if (htmlSize > 500000) {
    issues.push(`Large HTML size: ${(htmlSize / 1024).toFixed(1)}KB`);
  }
  
  // Check for missing compression
  if (!headers['content-encoding']) {
    issues.push('No compression detected (gzip/brotli)');
  }
  
  return issues;
}

// Main performance check function
async function runPerformanceCheck() {
  console.log('🚀 Starting Performance Check for The Tool Guru');
  console.log('=' .repeat(60));
  
  const results = {};
  
  for (const url of TEST_URLS) {
    const fullUrl = `${BASE_URL}${url}`;
    console.log(`\n📊 Testing: ${fullUrl}`);
    
    try {
      const response = await makeDetailedRequest(fullUrl);
      
      if (response.statusCode !== 200) {
        console.log(`❌ HTTP ${response.statusCode}`);
        continue;
      }
      
      const headerAnalysis = analyzeHeaders(response.headers);
      const performanceIssues = checkPerformanceIssues(response.body, response.headers);
      
      console.log(`✅ Status: ${response.statusCode}`);
      console.log(`⏱️  Total Time: ${response.timing.total}ms`);
      console.log(`📡 First Byte: ${response.timing.firstByte}ms`);
      console.log(`⬇️  Download: ${response.timing.download}ms`);
      console.log(`📦 Content Size: ${(response.body.length / 1024).toFixed(1)}KB`);
      
      // Header analysis
      console.log(`\n📋 Headers Analysis:`);
      console.log(`  Compression: ${headerAnalysis.hasGzip ? '✅ Gzip' : '❌ None'}`);
      console.log(`  Cache Control: ${headerAnalysis.hasCacheControl ? '✅ Yes' : '❌ No'}`);
      console.log(`  ETag: ${headerAnalysis.hasETag ? '✅ Yes' : '❌ No'}`);
      console.log(`  Server: ${headerAnalysis.server}`);
      
      // Performance issues
      if (performanceIssues.length > 0) {
        console.log(`\n⚠️  Performance Issues:`);
        performanceIssues.forEach(issue => {
          console.log(`  • ${issue}`);
        });
      } else {
        console.log(`\n✅ No major performance issues detected`);
      }
      
      // Store results
      results[url] = {
        timing: response.timing,
        headers: headerAnalysis,
        issues: performanceIssues,
        size: response.body.length
      };
      
      // Add to metrics
      metrics.responseTime.push(response.timing.total);
      metrics.firstByte.push(response.timing.firstByte);
      metrics.downloadTime.push(response.timing.download);
      
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Generate summary
  console.log('\n📊 Performance Summary');
  console.log('=' .repeat(60));
  
  if (metrics.responseTime.length > 0) {
    const avgResponseTime = metrics.responseTime.reduce((a, b) => a + b, 0) / metrics.responseTime.length;
    const avgFirstByte = metrics.firstByte.reduce((a, b) => a + b, 0) / metrics.firstByte.length;
    const avgDownloadTime = metrics.downloadTime.reduce((a, b) => a + b, 0) / metrics.downloadTime.length;
    
    console.log(`📈 Average Response Time: ${avgResponseTime.toFixed(0)}ms`);
    console.log(`📈 Average First Byte: ${avgFirstByte.toFixed(0)}ms`);
    console.log(`📈 Average Download Time: ${avgDownloadTime.toFixed(0)}ms`);
    
    // Performance rating
    let rating = 'Excellent';
    if (avgResponseTime > 3000) rating = 'Poor';
    else if (avgResponseTime > 2000) rating = 'Fair';
    else if (avgResponseTime > 1000) rating = 'Good';
    
    console.log(`\n🏆 Performance Rating: ${rating}`);
    
    // Recommendations
    console.log(`\n💡 Recommendations:`);
    if (avgFirstByte > 1000) {
      console.log(`  • Server response time is slow (${avgFirstByte.toFixed(0)}ms)`);
      console.log(`  • Consider server optimization or CDN`);
    }
    if (avgDownloadTime > 1000) {
      console.log(`  • Download time is slow (${avgDownloadTime.toFixed(0)}ms)`);
      console.log(`  • Consider compression and asset optimization`);
    }
    if (avgResponseTime < 1000) {
      console.log(`  • Excellent performance! Keep it up!`);
    }
  }
  
  console.log('\n✅ Performance Check Complete!');
}

// Run the check
if (require.main === module) {
  runPerformanceCheck().catch(console.error);
}

module.exports = { runPerformanceCheck, makeDetailedRequest };
