/**
 * Add full metadata (alternates.canonical, full openGraph, full twitter) to tool pages
 * that only have title, description, keywords, and minimal openGraph.
 * Run from repo root: node frontend/scripts/add-full-metadata.js
 */

const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, '../src/app/tools');
const BASE_URL = 'https://thetool.guru/tools';

function getSlug(dirPath) {
  const name = path.basename(dirPath);
  return name === 'page.js' ? path.basename(path.dirname(dirPath)) : name;
}

function extractTitleDescription(content) {
  const titleMatch = content.match(/title:\s*['"]([^'"]*)['"]/);
  const descMatch = content.match(/description:\s*['"]([^'"]*)['"]/);
  return {
    title: titleMatch ? titleMatch[1] : 'Tool — The Tool Guru',
    description: descMatch ? descMatch[1] : 'Free online tool.',
  };
}

function hasFullMetadata(content) {
  return (
    /alternates:\s*\{/.test(content) &&
    /canonical:\s*['"]https:/.test(content) &&
    /openGraph:[\s\S]*?url:\s*['"]https:/.test(content) &&
    /twitter:\s*\{/.test(content)
  );
}

function buildMetadataBlock(slug, title, description, existingKeywords) {
  const canonical = `${BASE_URL}/${slug}`;
  const keywordsStr = existingKeywords
    ? `  keywords: ${existingKeywords},\n`
    : '';

  return `export const metadata = {
  title: '${title.replace(/'/g, "\\'")}',
  description: '${description.replace(/'/g, "\\'")}',
${keywordsStr}  alternates: {
    canonical: '${canonical}',
  },
  openGraph: {
    title: '${title.replace(/'/g, "\\'")}',
    description: '${description.replace(/'/g, "\\'")}',
    url: '${canonical}',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: '${title.replace(/ — The Tool Guru$/, '').replace(/'/g, "\\'") || title.replace(/'/g, "\\'")} - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '${title.replace(/'/g, "\\'")}',
    description: '${description.replace(/'/g, "\\'")}',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}`;
}

function extractKeywords(content) {
  const m = content.match(/keywords:\s*(\[[\s\S]*?\]),/);
  return m ? m[1] : null;
}

function replaceMetadata(content, slug) {
  const { title, description } = extractTitleDescription(content);
  const existingKeywords = extractKeywords(content);

  // Match from "export const metadata = {" to the closing "};" or "}" (metadata only)
  const metadataRegex = /export const metadata = \{[\s\S]*?\n\}(?=\s*(?:;|\nconst |\nfunction ))/;
  const newBlock = buildMetadataBlock(slug, title, description, existingKeywords);
  if (!metadataRegex.test(content)) {
    return null;
  }
  return content.replace(metadataRegex, newBlock);
}

function main() {
  const toolsPath = path.resolve(TOOLS_DIR);
  const entries = fs.readdirSync(toolsPath, { withFileTypes: true });
  let updated = 0;
  let skipped = 0;

  for (const ent of entries) {
    if (!ent.isDirectory()) continue;
    const slug = ent.name;
    const pagePath = path.join(toolsPath, slug, 'page.js');
    if (!fs.existsSync(pagePath)) continue;

    const content = fs.readFileSync(pagePath, 'utf8');
    if (hasFullMetadata(content)) {
      skipped++;
      continue;
    }

    const newContent = replaceMetadata(content, slug);
    if (newContent && newContent !== content) {
      fs.writeFileSync(pagePath, newContent, 'utf8');
      updated++;
      console.log('Updated:', slug);
    }
  }

  console.log('\nDone. Updated:', updated, 'Skipped (already full):', skipped);
}

main();
