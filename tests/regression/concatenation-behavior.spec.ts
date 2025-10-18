import { test, expect } from '@playwright/test';

test.describe('File Concatenation Behavior Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should preserve behavior when concatenating multiple JS files', async () => {
    // Simuler l'ouverture de la modal de concaténation
    await page.click('[data-testid="concat-button"]'); // À adapter selon votre UI
    
    // Attendre que la modal s'ouvre
    await page.waitForSelector('[data-testid="concat-modal"]');
    
    // Sélectionner JavaScript
    await page.selectOption('[data-testid="file-type-select"]', 'js');
    
    // Simuler l'ajout de fichiers (via drag & drop ou input file)
    // Pour l'instant, on va directement tester la logique de concaténation
    
    const file1 = `
      const Utils = {
        formatDate: function(date) {
          return new Date(date).toLocaleDateString('fr-FR');
        }
      };
    `;
    
    const file2 = `
      const result = Utils.formatDate('2024-01-01');
      console.log(result);
    `;
    
    // Tester le comportement du code original (séparé)
    const originalOutput = await page.evaluate(async (code1, code2) => {
      const outputs = [];
      page.on('console', msg => outputs.push(msg.text()));
      
      // Exécuter les deux fichiers séparément
      eval(code1);
      eval(code2);
      
      return outputs;
    }, file1, file2);
    
    // Tester le comportement du code concaténé
    const concatenatedCode = file1 + '\n' + file2;
    const concatenatedOutput = await page.evaluate(async (code) => {
      const outputs = [];
      page.on('console', msg => outputs.push(msg.text()));
      
      eval(code);
      
      return outputs;
    }, concatenatedCode);
    
    // Les outputs doivent être identiques
    expect(concatenatedOutput).toEqual(originalOutput);
  });

  test('should handle variable conflicts in concatenated files', async () => {
    const file1 = `
      var globalVar = 'first';
      console.log('File 1:', globalVar);
    `;
    
    const file2 = `
      var globalVar = 'second';
      console.log('File 2:', globalVar);
    `;
    
    // Tester le comportement attendu
    const originalOutput = await page.evaluate(async (code1, code2) => {
      const outputs = [];
      page.on('console', msg => outputs.push(msg.text()));
      
      eval(code1);
      eval(code2);
      
      return outputs;
    }, file1, file2);
    
    const concatenatedOutput = await page.evaluate(async (code) => {
      const outputs = [];
      page.on('console', msg => outputs.push(msg.text()));
      
      eval(code);
      
      return outputs;
    }, file1 + '\n' + file2);
    
    // Les deux doivent avoir le même comportement
    expect(concatenatedOutput).toEqual(originalOutput);
  });

  test('should preserve function scope in concatenated files', async () => {
    const file1 = `
      function createScope() {
        const private = 'secret';
        return function() {
          return private;
        };
      }
    `;
    
    const file2 = `
      const getSecret = createScope();
      console.log(getSecret());
    `;
    
    const originalOutput = await page.evaluate(async (code1, code2) => {
      const outputs = [];
      page.on('console', msg => outputs.push(msg.text()));
      
      eval(code1);
      eval(code2);
      
      return outputs;
    }, file1, file2);
    
    const concatenatedOutput = await page.evaluate(async (code) => {
      const outputs = [];
      page.on('console', msg => outputs.push(msg.text()));
      
      eval(code);
      
      return outputs;
    }, file1 + '\n' + file2);
    
    expect(concatenatedOutput).toEqual(originalOutput);
    expect(concatenatedOutput).toContain('secret');
  });
});
