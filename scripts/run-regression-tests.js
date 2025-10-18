#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🧪 Running JavaScript behavior regression tests...\n');

try {
  // Exécuter les tests Playwright
  execSync('npx playwright test --reporter=line', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  
  console.log('\n✅ All regression tests passed!');
  console.log('🎉 JavaScript minification/unminification is reliable.');
  
} catch (error) {
  console.error('\n❌ Some regression tests failed!');
  console.error('🔍 Check the test results above for details.');
  process.exit(1);
}
