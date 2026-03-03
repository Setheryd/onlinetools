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
  if (!content.includes('RelatedToolsSection')) continue;

  // Use toolId instead of tools so component can resolve internally
  content = content.replace(
    /<RelatedToolsSection\s+tools=\{relatedTools\}\s*\/>/,
    `<RelatedToolsSection toolId="${slug}" />`
  );

  // Remove getRelatedTools import if present (no longer needed in page)
  content = content.replace(/\s*import\s*\{\s*getRelatedTools\s*\}\s*from\s*['"]@\/lib\/tools['"];?\s*\n?/g, '\n');
  content = content.replace(/,?\s*getRelatedTools\s*/g, ' '); // remove from existing multi-import
  content = content.replace(/\s*import\s*\{\s*,\s*/g, 'import { '); // fix empty or leading comma

  // Remove const relatedTools line
  content = content.replace(/\s*const relatedTools = getRelatedTools\([^)]+\)\.filter\(t => t\.built\);?\s*\n?/g, '\n');

  fs.writeFileSync(pagePath, content);
  console.log('Fixed:', slug);
}
console.log('Done.');
