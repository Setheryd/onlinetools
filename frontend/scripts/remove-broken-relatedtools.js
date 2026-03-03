const fs = require('fs');
const path = require('path');
const toolsDir = path.join(__dirname, '../src/app/tools');
const dirs = fs.readdirSync(toolsDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
let count = 0;
for (const slug of dirs) {
  const p = path.join(toolsDir, slug, 'page.js');
  if (!fs.existsSync(p)) continue;
  let c = fs.readFileSync(p, 'utf8');
  const needle = "  const relatedTools = ('" + slug + "', 6).filter(t => t.built);\n";
  if (c.includes(needle)) {
    c = c.replace(needle, '');
    fs.writeFileSync(p, c);
    count++;
  }
}
console.log('Removed from', count, 'files');
