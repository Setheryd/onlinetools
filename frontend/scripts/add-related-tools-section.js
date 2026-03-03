/**
 * One-off script: add RelatedToolsSection to every tool page that doesn't have it.
 * Run from repo root: node frontend/scripts/add-related-tools-section.js
 */
const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '../src/app/tools');
const dirs = fs.readdirSync(toolsDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

for (const slug of dirs) {
  const pagePath = path.join(toolsDir, slug, 'page.js');
  if (!fs.existsSync(pagePath)) continue;

  let content = fs.readFileSync(pagePath, 'utf8');
  if (content.includes('RelatedToolsSection')) continue;

  // 1. Add getRelatedTools to existing @/lib/tools import, or add new import
  if (content.includes("from '@/lib/tools'") || content.includes('from \'@/lib/tools\'')) {
    content = content.replace(
      /import\s*\{\s*([^}]+)\s*\}\s*from\s*['"]@\/lib\/tools['"]/,
      (match, imports) => {
        if (imports.includes('getRelatedTools')) return match;
        return `import { ${imports.trim()}, getRelatedTools } from '@/lib/tools'`;
      }
    );
  } else {
    // Insert after last import before "export const metadata"
    content = content.replace(
      /(import\s+.*?from\s+['"].*?['"];?\s*\n)(?=export const metadata)/s,
      `$1import { getRelatedTools } from '@/lib/tools';\n`
    );
  }

  // 2. Add RelatedToolsSection import (after ToolContentSection import)
  if (!content.includes('RelatedToolsSection')) {
    content = content.replace(
      /import ToolContentSection from ['"].*?ToolContentSection['"];/,
      "import ToolContentSection from '../../components/tools/ToolContentSection';\nimport RelatedToolsSection from '../../components/tools/RelatedToolsSection';"
    );
  }

  // 3. Add const relatedTools at start of component body (after => {)
  if (!content.includes('relatedTools')) {
    content = content.replace(
      /(const\s+\w+Page\s*=\s*(?:async\s*)?\([^)]*\)\s*=>\s*\{\s*\n)/,
      `$1  const relatedTools = getRelatedTools('${slug}', 6).filter(t => t.built);\n`
    );
  }

  // 4. Add <RelatedToolsSection tools={relatedTools} /> before </Body>
  if (!content.includes('<RelatedToolsSection')) {
    content = content.replace(
      /(\s*)<\/Body>/,
      `$1<RelatedToolsSection tools={relatedTools} />\n$1</Body>`
    );
  }

  fs.writeFileSync(pagePath, content);
  console.log('Updated:', slug);
}

console.log('Done.');
