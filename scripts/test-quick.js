#!/usr/bin/env node

/**
 * Script de test rapide pour FastMinify
 * 
 * Usage:
 *   node scripts/test-quick.js
 *   node scripts/test-quick.js --watch
 *   node scripts/test-quick.js --coverage
 */

const { execSync } = require('child_process');
const path = require('path');

// Couleurs pour la console
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  log(`\n${colors.bold}${description}${colors.reset}`);
  log(`Running: ${command}`, 'blue');
  
  try {
    const output = execSync(command, { 
      cwd: process.cwd(),
      stdio: 'inherit',
      encoding: 'utf8'
    });
    return true;
  } catch (error) {
    log(`❌ ${description} failed`, 'red');
    return false;
  }
}

function main() {
  const args = process.argv.slice(2);
  const isWatch = args.includes('--watch');
  const isCoverage = args.includes('--coverage');
  
  log('🧪 FastMinify - Test Runner', 'bold');
  log('============================', 'bold');
  
  // Vérifier que nous sommes dans le bon répertoire
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  try {
    const packageJson = require(packageJsonPath);
    if (packageJson.name !== 'fastminify') {
      throw new Error('Not in FastMinify directory');
    }
  } catch (error) {
    log('❌ Please run this script from the FastMinify root directory', 'red');
    process.exit(1);
  }
  
  // Installer les dépendances si nécessaire
  log('\n📦 Checking dependencies...', 'blue');
  try {
    execSync('npm list jest', { stdio: 'pipe' });
  } catch (error) {
    log('Installing test dependencies...', 'yellow');
    runCommand('npm install', 'Installing dependencies');
  }
  
  // Lancer les tests
  let testCommand = 'npm test';
  
  if (isWatch) {
    testCommand = 'npm run test:watch';
    log('\n🔄 Running tests in watch mode...', 'green');
  } else if (isCoverage) {
    testCommand = 'npm run test:coverage';
    log('\n📊 Running tests with coverage...', 'green');
  } else {
    log('\n⚡ Running quick tests...', 'green');
  }
  
  const success = runCommand(testCommand, 'Running tests');
  
  if (success) {
    log('\n✅ All tests completed successfully!', 'green');
    
    if (!isWatch && !isCoverage) {
      log('\n💡 Tips:', 'yellow');
      log('  • Use --watch for continuous testing during development');
      log('  • Use --coverage to see code coverage report');
      log('  • Run "npm test -- --help" for more options');
    }
  } else {
    log('\n❌ Some tests failed. Check the output above for details.', 'red');
    process.exit(1);
  }
}

// Gestion des erreurs
process.on('uncaughtException', (error) => {
  log(`\n❌ Unexpected error: ${error.message}`, 'red');
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  log(`\n❌ Unhandled rejection: ${reason}`, 'red');
  process.exit(1);
});

// Aide
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  log('FastMinify Test Runner', 'bold');
  log('=====================', 'bold');
  log('');
  log('Usage: node scripts/test-quick.js [options]');
  log('');
  log('Options:');
  log('  --watch     Run tests in watch mode');
  log('  --coverage  Run tests with coverage report');
  log('  --help      Show this help message');
  log('');
  log('Examples:');
  log('  node scripts/test-quick.js');
  log('  node scripts/test-quick.js --watch');
  log('  node scripts/test-quick.js --coverage');
  process.exit(0);
}

main();
