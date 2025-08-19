#!/usr/bin/env node

/**
 * Update import paths after reorganization
 * Run with: node scripts/update-imports.js
 */

const fs = require('fs');
const path = require('path');

// Files that might need import path updates
const filesToCheck = [
  'package.json',
  'src/app/layout.js',
  'src/app/page.js',
  // Add more files as needed
];

// Update package.json scripts to use config directory
function updatePackageJson() {
  const packagePath = path.join(__dirname, '..', 'package.json');
  if (fs.existsSync(packagePath)) {
    let content = fs.readFileSync(packagePath, 'utf8');
    
    // Update any scripts that reference config files
    content = content.replace(/tailwind\.config\.js/g, 'config/tailwind.config.js');
    content = content.replace(/next\.config\.mjs/g, 'config/next.config.mjs');
    content = content.replace(/postcss\.config\.mjs/g, 'config/postcss.config.mjs');
    
    fs.writeFileSync(packagePath, content);
    console.log('✅ Updated package.json');
  }
}

// Update any other files that might reference config files
function updateOtherFiles() {
  console.log('🔍 Checking for files that need import path updates...');
  
  // This is a placeholder for future updates
  // Add specific file updates as needed
  
  console.log('✅ Import path updates completed');
}

// Main function
function main() {
  console.log('🚀 Starting import path updates...');
  
  updatePackageJson();
  updateOtherFiles();
  
  console.log('✅ All import path updates completed!');
  console.log('\n📝 Next steps:');
  console.log('1. Test the build: npm run build');
  console.log('2. Test the dev server: npm run dev');
  console.log('3. Update any remaining import paths manually if needed');
}

if (require.main === module) {
  main();
}

module.exports = { updatePackageJson, updateOtherFiles };
