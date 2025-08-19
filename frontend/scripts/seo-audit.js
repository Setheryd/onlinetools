#!/usr/bin/env node

/**
 * SEO Audit Script for The Tool Guru
 * Run with: node scripts/seo-audit.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://thetool.guru';

// Test URLs to check
const TEST_URLS = [
  '/',
  '/tools',
  '/tools/password-generator',
  '/tools/base64',
  '/tools/json-formatter',
  '/blog',
  '/about',
  '/contact',
  '/sitemap.xml',
  '/robots.txt',
  '/ads.txt'
];

// SEO checks to perform
const SEO_CHECKS = {
  title: (html) => {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    return {
      passed: !!titleMatch,
      value: titleMatch ? titleMatch[1].trim() : null,
      message: titleMatch ? 'Title found' : 'No title tag found'
    };
  },
  
  description: (html) => {
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    return {
      passed: !!descMatch,
      value: descMatch ? descMatch[1].trim() : null,
      message: descMatch ? 'Meta description found' : 'No meta description found'
    };
  },
  
  canonical: (html) => {
    const canonMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
    return {
      passed: !!canonMatch,
      value: canonMatch ? canonMatch[1].trim() : null,
      message: canonMatch ? 'Canonical URL found' : 'No canonical URL found'
    };
  },
  
  ogTags: (html) => {
    const ogTitle = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i);
    const ogDesc = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
    const ogImage = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
    
    return {
      passed: !!(ogTitle && ogDesc && ogImage),
      value: { title: ogTitle?.[1], description: ogDesc?.[1], image: ogImage?.[1] },
      message: `Open Graph tags: ${ogTitle ? 'title ✓' : 'title ✗'}, ${ogDesc ? 'desc ✓' : 'desc ✗'}, ${ogImage ? 'image ✓' : 'image ✗'}`
    };
  },
  
  structuredData: (html) => {
    const schemaMatch = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
    return {
      passed: !!schemaMatch,
      value: schemaMatch ? 'Structured data found' : null,
      message: schemaMatch ? 'Schema.org structured data found' : 'No structured data found'
    };
  },
  
  h1Tags: (html) => {
    const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi);
    return {
      passed: h1Matches && h1Matches.length === 1,
      value: h1Matches ? h1Matches.length : 0,
      message: h1Matches ? `${h1Matches.length} H1 tag(s) found` : 'No H1 tags found'
    };
  },
  
  loadTime: (startTime) => {
    const loadTime = startTime;
    return {
      passed: loadTime < 3000,
      value: `${loadTime}ms`,
      message: `Page load time: ${loadTime}ms ${loadTime < 3000 ? '(Good)' : '(Slow)'}`
    };
  }
};

// Make HTTP request
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const loadTime = Date.now() - startTime;
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          loadTime
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Perform SEO audit on a URL
async function auditUrl(url) {
  const fullUrl = `${BASE_URL}${url}`;
  console.log(`\n🔍 Auditing: ${fullUrl}`);
  
  try {
    const response = await makeRequest(fullUrl);
    
    if (response.statusCode !== 200) {
      console.log(`❌ HTTP ${response.statusCode}`);
      return;
    }
    
    const results = {};
    
    // Run all SEO checks
    for (const [checkName, checkFn] of Object.entries(SEO_CHECKS)) {
      if (checkName === 'loadTime') {
        results[checkName] = checkFn(response.loadTime);
      } else {
        results[checkName] = checkFn(response.body);
      }
    }
    
    // Display results
    for (const [checkName, result] of Object.entries(results)) {
      const status = result.passed ? '✅' : '❌';
      console.log(`${status} ${checkName}: ${result.message}`);
      
      if (result.value && typeof result.value === 'string' && result.value.length < 100) {
        console.log(`   Value: ${result.value}`);
      }
    }
    
    return results;
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return null;
  }
}

// Check robots.txt
async function checkRobotsTxt() {
  console.log('\n🤖 Checking robots.txt...');
  
  try {
    const response = await makeRequest(`${BASE_URL}/robots.txt`);
    
    if (response.statusCode === 200) {
      const robotsContent = response.body;
      
      // Check for common issues
      const checks = {
        sitemap: robotsContent.includes('Sitemap:'),
        userAgent: robotsContent.includes('User-agent:'),
        allow: robotsContent.includes('Allow:'),
        disallow: robotsContent.includes('Disallow:'),
        crawlDelay: robotsContent.includes('Crawl-delay:')
      };
      
      for (const [check, passed] of Object.entries(checks)) {
        const status = passed ? '✅' : '❌';
        console.log(`${status} ${check}: ${passed ? 'Found' : 'Missing'}`);
      }
      
      // Check for duplicate entries
      const userAgentLines = robotsContent.match(/User-agent:/g);
      if (userAgentLines && userAgentLines.length > 1) {
        console.log(`⚠️  Multiple User-agent entries found: ${userAgentLines.length}`);
      }
      
    } else {
      console.log(`❌ robots.txt not accessible (HTTP ${response.statusCode})`);
    }
    
  } catch (error) {
    console.log(`❌ Error checking robots.txt: ${error.message}`);
  }
}

// Check sitemap
async function checkSitemap() {
  console.log('\n🗺️  Checking sitemap...');
  
  try {
    const response = await makeRequest(`${BASE_URL}/sitemap.xml`);
    
    if (response.statusCode === 200) {
      const sitemapContent = response.body;
      
      // Count URLs
      const urlMatches = sitemapContent.match(/<url>/g);
      const urlCount = urlMatches ? urlMatches.length : 0;
      
      console.log(`✅ Sitemap accessible`);
      console.log(`📊 URLs in sitemap: ${urlCount}`);
      
      // Check for common sitemap issues
      if (!sitemapContent.includes('<lastmod>')) {
        console.log('⚠️  No lastmod dates found in sitemap');
      }
      
      if (!sitemapContent.includes('<priority>')) {
        console.log('⚠️  No priority values found in sitemap');
      }
      
    } else {
      console.log(`❌ Sitemap not accessible (HTTP ${response.statusCode})`);
    }
    
  } catch (error) {
    console.log(`❌ Error checking sitemap: ${error.message}`);
  }
}

// Main audit function
async function runSEOAudit() {
  console.log('🚀 Starting SEO Audit for The Tool Guru');
  console.log('=' .repeat(50));
  
  // Check robots.txt and sitemap
  await checkRobotsTxt();
  await checkSitemap();
  
  // Audit individual pages
  console.log('\n📄 Auditing individual pages...');
  
  const allResults = {};
  
  for (const url of TEST_URLS) {
    const results = await auditUrl(url);
    if (results) {
      allResults[url] = results;
    }
    
    // Small delay to be respectful to the server
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Generate summary
  console.log('\n📊 SEO Audit Summary');
  console.log('=' .repeat(50));
  
  const totalChecks = Object.keys(SEO_CHECKS).length * TEST_URLS.length;
  let passedChecks = 0;
  
  for (const [url, results] of Object.entries(allResults)) {
    for (const [checkName, result] of Object.entries(results)) {
      if (result.passed) passedChecks++;
    }
  }
  
  const score = Math.round((passedChecks / totalChecks) * 100);
  console.log(`Overall SEO Score: ${score}% (${passedChecks}/${totalChecks} checks passed)`);
  
  if (score >= 80) {
    console.log('🎉 Excellent SEO health!');
  } else if (score >= 60) {
    console.log('👍 Good SEO health, some improvements needed');
  } else {
    console.log('⚠️  SEO needs attention');
  }
  
  console.log('\n✅ SEO Audit Complete!');
}

// Run the audit
if (require.main === module) {
  runSEOAudit().catch(console.error);
}

module.exports = { runSEOAudit, auditUrl, checkRobotsTxt, checkSitemap };
