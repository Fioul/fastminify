import { minifyJavaScript, defaultJavaScriptOptions, type JavaScriptOptions } from '../javascript-options'

describe('JavaScript Minification', () => {
  describe('Basic minification', () => {
    test('should minify simple JavaScript correctly', async () => {
      const input = 'function hello() { console.log("world"); }'
      const result = await minifyJavaScript(input, defaultJavaScriptOptions)
      
      expect(result).toBeDefined()
      expect(result.length).toBeLessThan(input.length)
      expect(result).toContain('function hello')
    })

    test('should handle empty input', async () => {
      const input = ''
      const result = await minifyJavaScript(input, defaultJavaScriptOptions)
      
      expect(result).toBe('')
    })

    test('should handle whitespace-only input', async () => {
      const input = '   \n\t  '
      const result = await minifyJavaScript(input, defaultJavaScriptOptions)
      
      expect(result).toBeDefined()
    })
  })

  describe('ECMAScript version handling', () => {
    test('should handle ES5 syntax', async () => {
      const input = 'var x = 1; function test() { return x; }'
      const options: JavaScriptOptions = { ...defaultJavaScriptOptions, ecmaVersion: 'es5' }
      const result = await minifyJavaScript(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('var')
    })

    test('should handle ES2020 features (optional chaining)', async () => {
      const input = 'const obj = { name: "test" }; console.log(obj?.name)'
      const options: JavaScriptOptions = { ...defaultJavaScriptOptions, ecmaVersion: 'es2020' }
      const result = await minifyJavaScript(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('?.')
    })

    test('should handle ES2022 features', async () => {
      const input = 'class Test { #private = 1; getPrivate() { return this.#private; } }'
      const options: JavaScriptOptions = { ...defaultJavaScriptOptions, ecmaVersion: 'es2022' }
      const result = await minifyJavaScript(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('#private')
    })
  })

  describe('Compression levels', () => {
    test('should apply conservative compression', async () => {
      const input = 'function test() { console.log("test"); }'
      const options: JavaScriptOptions = { ...defaultJavaScriptOptions, compressionLevel: 'conservative' }
      const result = await minifyJavaScript(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('console.log')
    })

    test('should apply normal compression', async () => {
      const input = 'function test() { console.log("test"); }'
      const options: JavaScriptOptions = { ...defaultJavaScriptOptions, compressionLevel: 'normal' }
      const result = await minifyJavaScript(input, options)
      
      expect(result).toBeDefined()
      expect(result.length).toBeLessThan(input.length)
    })

    test('should apply aggressive compression', async () => {
      const input = 'function test() { console.log("test"); }'
      const options: JavaScriptOptions = { ...defaultJavaScriptOptions, compressionLevel: 'aggressive' }
      const result = await minifyJavaScript(input, options)
      
      expect(result).toBeDefined()
      expect(result.length).toBeLessThan(input.length)
    })
  })

  describe('Console removal', () => {
    test('should remove console.log when enabled', async () => {
      const input = 'function test() { console.log("debug"); return "hello"; }'
      const options: JavaScriptOptions = { ...defaultJavaScriptOptions, removeConsole: true }
      const result = await minifyJavaScript(input, options)
      
      expect(result).toBeDefined()
      expect(result).not.toContain('console.log')
    })

    test('should keep console.log when disabled', async () => {
      const input = 'function test() { console.log("debug"); return "hello"; }'
      const options: JavaScriptOptions = { ...defaultJavaScriptOptions, removeConsole: false }
      const result = await minifyJavaScript(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('console.log')
    })
  })

  describe('Name preservation', () => {
    test('should preserve class names when enabled', async () => {
      const input = 'class MyClass { method() { return "test"; } }'
      const options: JavaScriptOptions = { ...defaultJavaScriptOptions, preserveClassNames: true }
      const result = await minifyJavaScript(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('MyClass')
    })

    test('should preserve function names when enabled', async () => {
      const input = 'function myFunction() { return "test"; }'
      const options: JavaScriptOptions = { ...defaultJavaScriptOptions, preserveFunctionNames: true }
      const result = await minifyJavaScript(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('myFunction')
    })
  })

  describe('Browser compatibility', () => {
    test('should handle modern browser target', async () => {
      const input = 'const arrow = () => "test";'
      const options: JavaScriptOptions = { ...defaultJavaScriptOptions, browserSupport: 'modern' }
      const result = await minifyJavaScript(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('=>')
    })

    test('should handle IE11+ target', async () => {
      const input = 'const arrow = () => "test";'
      const options: JavaScriptOptions = { ...defaultJavaScriptOptions, browserSupport: 'ie11' }
      const result = await minifyJavaScript(input, options)
      
      expect(result).toBeDefined()
    })

    test('should handle IE9+ target', async () => {
      const input = 'const arrow = () => "test";'
      const options: JavaScriptOptions = { ...defaultJavaScriptOptions, browserSupport: 'ie9' }
      const result = await minifyJavaScript(input, options)
      
      expect(result).toBeDefined()
    })
  })

  describe('Error handling', () => {
    test('should handle invalid JavaScript syntax', async () => {
      const input = 'function invalid syntax {'
      
      await expect(minifyJavaScript(input, defaultJavaScriptOptions))
        .rejects.toThrow()
    })

    test('should handle malformed code', async () => {
      const input = 'function test() { return; } }'
      
      await expect(minifyJavaScript(input, defaultJavaScriptOptions))
        .rejects.toThrow()
    })
  })

  describe('Edge cases', () => {
    test('should handle code with comments', async () => {
      const input = '/* comment */ function test() { return "hello"; } // another comment'
      const result = await minifyJavaScript(input, defaultJavaScriptOptions)
      
      expect(result).toBeDefined()
      expect(result).not.toContain('comment')
    })

    test('should handle code with strings containing keywords', async () => {
      const input = 'const str = "function test() { return \'hello\'; }"'
      const result = await minifyJavaScript(input, defaultJavaScriptOptions)
      
      expect(result).toBeDefined()
      expect(result).toContain('function test()')
    })

    test('should handle code with regex patterns', async () => {
      const input = 'const regex = /function\\s+test/gi'
      const result = await minifyJavaScript(input, defaultJavaScriptOptions)
      
      expect(result).toBeDefined()
      expect(result).toContain('/function')
    })
  })

  describe('Performance and size', () => {
    test('should reduce code size significantly', async () => {
      const input = `
        function calculateSum(a, b) {
          // This function calculates the sum of two numbers
          const result = a + b;
          console.log('Calculating sum:', result);
          return result;
        }
        
        const numbers = [1, 2, 3, 4, 5];
        const total = numbers.reduce(calculateSum, 0);
        console.log('Total:', total);
      `
      
      const result = await minifyJavaScript(input, defaultJavaScriptOptions)
      
      expect(result.length).toBeLessThan(input.length * 0.7) // At least 30% reduction
    })

    test('should handle large code efficiently', async () => {
      const input = Array(100).fill(0).map((_, i) => 
        `function test${i}() { return ${i}; }`
      ).join('\n')
      
      const start = Date.now()
      const result = await minifyJavaScript(input, defaultJavaScriptOptions)
      const duration = Date.now() - start
      
      expect(result).toBeDefined()
      expect(duration).toBeLessThan(5000) // Should complete within 5 seconds
    })
  })
})
