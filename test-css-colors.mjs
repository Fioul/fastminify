import { minifyCSSWithOptions, defaultCSSOptions } from './src/lib/css-options.ts';

async function testColorConversion() {
  const css = `
    body {
      background: blue;
      color: red;
      border: 1px solid green;
    }
  `;
  
  console.log('CSS original:');
  console.log(css);
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test avec convertColors activé
  console.log('Avec convertColors: true');
  const result1 = await minifyCSSWithOptions(css, { ...defaultCSSOptions, convertColors: true });
  console.log('Résultat:', result1);
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test avec convertColors désactivé
  console.log('Avec convertColors: false');
  const result2 = await minifyCSSWithOptions(css, { ...defaultCSSOptions, convertColors: false });
  console.log('Résultat:', result2);
}

testColorConversion().catch(console.error);
