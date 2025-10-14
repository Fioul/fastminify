#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🧪 JSON Options Test Suite\n');

const testFiles = [
  'src/lib/__tests__/json-options.test.ts',
  'src/lib/__tests__/json-comprehensive.test.ts',
  'src/lib/__tests__/json-real-world.test.ts'
];

let allPassed = true;

console.log('📋 Running JSON-specific tests...\n');

testFiles.forEach((testFile, index) => {
  console.log(`${index + 1}. Testing ${testFile}`);
  console.log('─'.repeat(50));
  
  try {
    execSync(`npm test -- ${testFile}`, { 
      encoding: 'utf8',
      stdio: 'inherit'
    });
    console.log('✅ All tests passed\n');
  } catch (error) {
    console.log('❌ Some tests failed\n');
    allPassed = false;
  }
});

console.log('='.repeat(60));
console.log('📊 JSON Test Summary');
console.log('='.repeat(60));

if (allPassed) {
  console.log('🎉 All JSON tests passed successfully!');
  console.log('\n📈 Test Coverage:');
  console.log('• Basic JSON minification: ✅');
  console.log('• Compression levels: ✅');
  console.log('• Number optimization: ✅');
  console.log('• Data cleaning: ✅');
  console.log('• Array processing: ✅');
  console.log('• Error handling: ✅');
  console.log('• Real-world scenarios: ✅');
  console.log('• Performance tests: ✅');
  process.exit(0);
} else {
  console.log('⚠️  Some tests failed. Please check the output above.');
  process.exit(1);
}
