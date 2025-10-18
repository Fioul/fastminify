import { test, expect } from '@playwright/test';
import { CodeBehaviorTester } from './code-behavior-tester';

test.describe('JavaScript Minification Behavior Tests', () => {
  let tester: CodeBehaviorTester;

  test.beforeEach(async ({ page }) => {
    tester = new CodeBehaviorTester(page);
    await page.goto('/');
  });

  test('should preserve basic function behavior', async () => {
    const code = `
      function add(a, b) {
        return a + b;
      }
      console.log(add(2, 3));
    `;

    const result = await tester.testJavaScriptBehavior(code);
    
    expect(result.success).toBe(true);
    expect(result.originalOutput).toContain('5');
    expect(result.minifiedOutput).toContain('5');
    expect(result.unminifiedOutput).toContain('5');
  });

  test('should preserve closure behavior', async () => {
    const code = `
      function createCounter() {
        let count = 0;
        return function() {
          return ++count;
        };
      }
      const counter = createCounter();
      console.log(counter());
      console.log(counter());
    `;

    const result = await tester.testJavaScriptBehavior(code);
    
    expect(result.success).toBe(true);
    expect(result.originalOutput).toEqual(['1', '2']);
    expect(result.minifiedOutput).toEqual(['1', '2']);
    expect(result.unminifiedOutput).toEqual(['1', '2']);
  });

  test('should preserve variable hoisting', async () => {
    const code = `
      console.log(typeof myVar);
      var myVar = 'test';
      console.log(myVar);
    `;

    const result = await tester.testJavaScriptBehavior(code);
    
    expect(result.success).toBe(true);
    expect(result.originalOutput).toEqual(['undefined', 'test']);
    expect(result.minifiedOutput).toEqual(['undefined', 'test']);
    expect(result.unminifiedOutput).toEqual(['undefined', 'test']);
  });

  test('should preserve object methods', async () => {
    const code = `
      const obj = {
        name: 'test',
        getName: function() {
          return this.name;
        }
      };
      console.log(obj.getName());
    `;

    const result = await tester.testJavaScriptBehavior(code);
    
    expect(result.success).toBe(true);
    expect(result.originalOutput).toContain('test');
    expect(result.minifiedOutput).toContain('test');
    expect(result.unminifiedOutput).toContain('test');
  });

  test('should preserve array operations', async () => {
    const code = `
      const arr = [1, 2, 3];
      const doubled = arr.map(x => x * 2);
      console.log(doubled.join(','));
    `;

    const result = await tester.testJavaScriptBehavior(code);
    
    expect(result.success).toBe(true);
    expect(result.originalOutput).toContain('2,4,6');
    expect(result.minifiedOutput).toContain('2,4,6');
    expect(result.unminifiedOutput).toContain('2,4,6');
  });

  test('should preserve DOM manipulation', async () => {
    const code = `
      document.body.innerHTML = '<div id="test">Hello World</div>';
      const element = document.getElementById('test');
      console.log(element.textContent);
    `;

    const result = await tester.testJavaScriptBehavior(code);
    
    expect(result.success).toBe(true);
    expect(result.originalOutput).toContain('Hello World');
    expect(result.minifiedOutput).toContain('Hello World');
    expect(result.unminifiedOutput).toContain('Hello World');
  });

  test('should preserve async/await behavior', async () => {
    const code = `
      async function fetchData() {
        return new Promise(resolve => {
          setTimeout(() => resolve('data'), 10);
        });
      }
      
      async function test() {
        const result = await fetchData();
        console.log(result);
      }
      
      test();
    `;

    const result = await tester.testJavaScriptBehavior(code);
    
    // Attendre un peu pour que l'async se termine
    await new Promise(resolve => setTimeout(resolve, 50));
    
    expect(result.success).toBe(true);
    expect(result.originalOutput).toContain('data');
    expect(result.minifiedOutput).toContain('data');
    expect(result.unminifiedOutput).toContain('data');
  });

  test('should preserve class behavior', async () => {
    const code = `
      class Calculator {
        constructor() {
          this.value = 0;
        }
        
        add(n) {
          this.value += n;
          return this;
        }
        
        getValue() {
          return this.value;
        }
      }
      
      const calc = new Calculator();
      console.log(calc.add(5).add(3).getValue());
    `;

    const result = await tester.testJavaScriptBehavior(code);
    
    expect(result.success).toBe(true);
    expect(result.originalOutput).toContain('8');
    expect(result.minifiedOutput).toContain('8');
    expect(result.unminifiedOutput).toContain('8');
  });
});
