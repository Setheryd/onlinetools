const fs = require('fs');
const path = require('path');

// Get the path to pdfjs-dist package
const pdfjsDistPath = path.dirname(require.resolve('pdfjs-dist/package.json'));
const pdfWorkerPath = path.join(pdfjsDistPath, 'build', 'pdf.worker.min.mjs');
const publicPath = path.join(__dirname, '..', 'public', 'pdf.worker.min.js');

// Ensure public directory exists
const publicDir = path.dirname(publicPath);
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy the worker file
try {
  fs.copyFileSync(pdfWorkerPath, publicPath);
  console.log('✅ PDF.js worker copied successfully to public directory');
} catch (error) {
  console.error('❌ Error copying PDF.js worker:', error.message);
  process.exit(1);
}


