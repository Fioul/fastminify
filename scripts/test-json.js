#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🧪 JSON Options Test Suite\n');

const testFiles = [
  'src/lib/__tests__/json-options.test.ts',
  'src/lib/__tests__/json-comprehensive.test.ts',
  'src/lib/__tests__/json-real-world.test.ts'
];

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

console.log('📋 Running JSON-specific tests...\n');

testFiles.forEach((testFile, index) => {
  console.log(`\n${index + 1}. Testing ${testFile}`);
  console.log('─'.repeat(50));
  
  try {
    const result = execSync(`npm test -- ${testFile}`, { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    // Parse test results
    const lines = result.split('\n');
    const summaryLine = lines.find(line => line.includes('Tests:') && line.includes('passed'));
    
    if (summaryLine) {
      const match = summaryLine.match(/Tests:\s+(\d+)\s+passed(?:,\s+(\d+)\s+failed)?/);
      if (match) {
        const passed = parseInt(match[1]);
        const failed = parseInt(match[2] || 0);
        
        totalTests += passed + failed;
        passedTests += passed;
        failedTests += failed;
        
        console.log(`✅ ${passed} passed${failed > 0 ? `, ❌ ${failed} failed` : ''}`);
      } else {
        // Try alternative pattern
        const altMatch = summaryLine.match(/(\d+)\s+passed(?:,\s+(\d+)\s+failed)?/);
        if (altMatch) {
          const passed = parseInt(altMatch[1]);
          const failed = parseInt(altMatch[2] || 0);
          
          totalTests += passed + failed;
          passedTests += passed;
          failedTests += failed;
          
          console.log(`✅ ${passed} passed${failed > 0 ? `, ❌ ${failed} failed` : ''}`);
        } else {
          console.log('✅ All tests passed');
        }
      }
    } else {
      console.log('✅ All tests passed');
    }
    
  } catch (error) {
    console.log('❌ Test execution failed');
    console.log(error.stdout || error.message);
    failedTests++;
  }
});

console.log('\n' + '='.repeat(60));
console.log('📊 JSON Test Summary');
console.log('='.repeat(60));
console.log(`Total Tests: ${totalTests}`);
console.log(`✅ Passed: ${passedTests}`);
console.log(`❌ Failed: ${failedTests}`);
console.log(`Success Rate: ${totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : 0}%`);

if (failedTests === 0) {
  console.log('\n🎉 All JSON tests passed successfully!');
  process.exit(0);
} else {
  console.log(`\n⚠️  ${failedTests} test(s) failed. Please check the output above.`);
  process.exit(1);
}
