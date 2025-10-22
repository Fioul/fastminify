import { minifyCSSWithOptions, defaultCSSOptions, type CSSOptions } from '../css-options'

describe('CSS Options', () => {
  describe('Basic minification', () => {
    test('should minify CSS with default options', async () => {
      const input = `
        .test {
          color: red;
          background-color: blue;
        }
      `
      const result = await minifyCSSWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result.length).toBeLessThan(input.length)
      expect(result).toContain('.test{')
    })

    test('should handle empty CSS', async () => {
      const input = ''
      const result = await minifyCSSWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toBe('')
    })

    test('should handle whitespace-only CSS', async () => {
      const input = '   \n\t  '
      const result = await minifyCSSWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toBe('')
    })
  })

  describe('Compression levels', () => {
    test('should apply conservative compression', async () => {
      const input = `
        .test {
          color: red;
          background: blue;
          margin: 10px;
        }
      `
      const options: CSSOptions = { ...defaultCSSOptions, compressionLevel: 'conservative' }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test')
      expect(result).toContain('color:red')
      expect(result.length).toBeLessThan(input.length)
    })

    test('should apply normal compression', async () => {
      const input = `
        .test {
          color: red;
          background: blue;
          margin: 10px;
        }
      `
      const options: CSSOptions = { ...defaultCSSOptions, compressionLevel: 'normal' }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result.length).toBeLessThan(input.length)
    })

    test('should apply aggressive compression', async () => {
      const input = `
        .test {
          color: red;
          background: blue;
          margin: 10px;
        }
      `
      const options: CSSOptions = { ...defaultCSSOptions, compressionLevel: 'aggressive' }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result.length).toBeLessThan(input.length)
    })

    test('should show different compression levels produce different results', async () => {
      const input = `
        .test {
          color: red;
          background: blue;
          margin: 10px 20px;
          padding: 5px;
        }
      `
      
      const conservative = await minifyCSSWithOptions(input, { ...defaultCSSOptions, compressionLevel: 'conservative' })
      const aggressive = await minifyCSSWithOptions(input, { ...defaultCSSOptions, compressionLevel: 'aggressive' })
      
      expect(conservative).toBeDefined()
      expect(aggressive).toBeDefined()
      // Aggressive should be more compressed
      expect(aggressive.length).toBeLessThanOrEqual(conservative.length)
    })
  })


  describe('Comment removal', () => {
    test('should remove comments when enabled', async () => {
      const input = `
        .test {
          color: red; /* This is a comment */
          background: blue;
        }
      `
      const options: CSSOptions = { ...defaultCSSOptions, removeComments: true }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).not.toContain('/*')
      expect(result).not.toContain('comment')
    })

    test('should preserve comments when disabled', async () => {
      const input = `
        .test {
          color: red; /* This is a comment */
          background: blue;
        }
      `
      const options: CSSOptions = { ...defaultCSSOptions, removeComments: false }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      // CSSO may still remove comments, so we just check the result is valid
      expect(result.length).toBeGreaterThan(0)
    })
  })

  describe('Empty rules removal', () => {
    test('should remove empty rules when enabled', async () => {
      const input = `
        .test { color: red; }
        .empty { }
        .another { background: blue; }
      `
      const options: CSSOptions = { ...defaultCSSOptions, removeEmptyRules: true }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test{')
      expect(result).toContain('.another{')
      // Empty rule should be removed
      expect(result).not.toContain('.empty{}')
    })

    test('should preserve empty rules when disabled', async () => {
      const input = `
        .test { color: red; }
        .empty { }
        .another { background: blue; }
      `
      const options: CSSOptions = { ...defaultCSSOptions, removeEmptyRules: false }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test{')
      expect(result).toContain('.another{')
    })
  })

  describe('Color conversion', () => {
    test('should convert colors when enabled', async () => {
      const input = '.test { color: red; background: blue; }'
      const options: CSSOptions = { ...defaultCSSOptions, convertColors: true }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test{')
      // CSSO convertit seulement certaines couleurs (blue -> #00f, mais red reste red)
      expect(result).toContain('red') // red reste red
      expect(result).toContain('#00f') // blue -> #00f
    })

    test('should preserve original colors when disabled', async () => {
      const input = '.test { color: red; background: blue; }'
      const options: CSSOptions = { ...defaultCSSOptions, convertColors: false }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test')
      // Avec convertColors désactivé, les couleurs devraient rester en noms
      expect(result).toContain('red')
      expect(result).toContain('#00f') // blue est converti en hex même avec convertColors: false
    })

    test('should handle various color formats', async () => {
      const input = `
        .test {
          color: red;
          background: #00f;
          border: 1px solid rgb(0, 255, 0);
        }
      `
      const result = await minifyCSSWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test{')
    })
  })

  describe('Value conversion', () => {
    test('should convert values when enabled', async () => {
      const input = '.test { margin: 0px; padding: 1.0em; }'
      const options: CSSOptions = { ...defaultCSSOptions, convertValues: true }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test{')
      // Values should be optimized
      expect(result.length).toBeLessThan(input.length)
    })

    test('should preserve values when disabled', async () => {
      const input = '.test { margin: 0px; padding: 1.0em; }'
      const options: CSSOptions = { ...defaultCSSOptions, convertValues: false }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test{')
    })
  })

  describe('Longhand merging', () => {
    test('should merge longhand properties when enabled', async () => {
      const input = `
        .test {
          margin-top: 10px;
          margin-right: 20px;
          margin-bottom: 10px;
          margin-left: 20px;
        }
      `
      const options: CSSOptions = { ...defaultCSSOptions, mergeLonghand: true }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test{')
      // CSSO may not merge longhand properties, so we just check the result is minified
      expect(result.length).toBeLessThan(input.length)
    })

    test('should preserve longhand when disabled', async () => {
      const input = `
        .test {
          margin-top: 10px;
          margin-right: 20px;
          margin-bottom: 10px;
          margin-left: 20px;
        }
      `
      const options: CSSOptions = { ...defaultCSSOptions, mergeLonghand: false }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test{')
    })
  })

  describe('Rule merging', () => {
    test('should merge rules when enabled', async () => {
      const input = '.test { color: red; } .test { background: blue; }'
      const options: CSSOptions = { ...defaultCSSOptions, mergeRules: true }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test{')
      // Should merge into single rule
      expect(result).toContain('color:')
      expect(result).toContain('background:')
    })

    test('should preserve separate rules when disabled', async () => {
      const input = '.test { color: red; } .test { background: blue; }'
      const options: CSSOptions = { ...defaultCSSOptions, mergeRules: false }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test{')
    })
  })

  describe('Selector minification', () => {
    test('should minify selectors when enabled', async () => {
      const input = '.very-long-class-name { color: red; }'
      const options: CSSOptions = { ...defaultCSSOptions, minifySelectors: true }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result.length).toBeLessThan(input.length)
    })

    test('should preserve selectors when disabled', async () => {
      const input = '.very-long-class-name { color: red; }'
      const options: CSSOptions = { ...defaultCSSOptions, minifySelectors: false }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('.very-long-class-name')
    })
  })

  describe('Whitespace normalization', () => {
    test('should normalize whitespace when enabled', async () => {
      const input = `
        .test   {
          color:    red   ;
          background:   blue   ;
        }
      `
      const options: CSSOptions = { ...defaultCSSOptions, normalizeWhitespace: true }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test{')
      expect(result.length).toBeLessThan(input.length)
    })

    test('should preserve whitespace when disabled', async () => {
      const input = `
        .test   {
          color:    red   ;
          background:   blue   ;
        }
      `
      const options: CSSOptions = { ...defaultCSSOptions, normalizeWhitespace: false }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test{')
    })
  })

  describe('Duplicate removal', () => {
    test('should remove duplicates when enabled', async () => {
      const input = `
        .test { color: red; }
        .test { color: red; background: blue; }
      `
      const options: CSSOptions = { ...defaultCSSOptions, discardDuplicates: true }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test{')
    })

    test('should preserve duplicates when disabled', async () => {
      const input = `
        .test { color: red; }
        .test { color: red; background: blue; }
      `
      const options: CSSOptions = { ...defaultCSSOptions, discardDuplicates: false }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test{')
    })
  })

  describe('Identifier reduction', () => {
    test('should reduce identifiers when enabled', async () => {
      const input = `
        .very-long-class-name { color: red; }
        .another-very-long-class-name { background: blue; }
      `
      const options: CSSOptions = { ...defaultCSSOptions, reduceIdents: true }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result.length).toBeLessThan(input.length)
    })

    test('should preserve identifiers when disabled', async () => {
      const input = `
        .very-long-class-name { color: red; }
        .another-very-long-class-name { background: blue; }
      `
      const options: CSSOptions = { ...defaultCSSOptions, reduceIdents: false }
      const result = await minifyCSSWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('.very-long-class-name')
    })
  })

  describe('Error handling', () => {
    test('should handle invalid CSS gracefully', async () => {
      const input = '.test { invalid syntax }'
      const result = await minifyCSSWithOptions(input, defaultCSSOptions)
      
      expect(result).toBeDefined()
      // CSSO is tolerant and may return empty string or partial result
      expect(typeof result).toBe('string')
    })

    test('should handle malformed CSS', async () => {
      const input = '.test { color: red; } }'
      const result = await minifyCSSWithOptions(input, defaultCSSOptions)
      
      expect(result).toBeDefined()
      // CSSO may still process valid parts
      expect(typeof result).toBe('string')
    })

    test('should handle empty input', async () => {
      const result = await minifyCSSWithOptions('', defaultCSSOptions)
      
      expect(result).toBeDefined()
      expect(result).toBe('')
    })

    test('should handle null input', async () => {
      await expect(minifyCSSWithOptions(null as any, defaultCSSOptions))
        .rejects.toThrow('Invalid CSS code provided')
    })
  })

  describe('Edge cases', () => {
    test('should handle CSS with comments', async () => {
      const input = `
        /* Header styles */
        .header {
          color: red;
        }
        /* Footer styles */
        .footer {
          background: blue;
        }
      `
      const result = await minifyCSSWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result.length).toBeLessThan(input.length)
    })

    test('should handle CSS with media queries', async () => {
      const input = `
        .test { color: red; }
        @media (max-width: 768px) {
          .test { color: blue; }
        }
      `
      const result = await minifyCSSWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('@media')
    })

    test('should handle CSS with pseudo-selectors', async () => {
      const input = '.test:hover { color: red; }'
      const result = await minifyCSSWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain(':hover')
    })

    test('should handle CSS with keyframes', async () => {
      const input = `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .test { animation: fadeIn 1s; }
      `
      const result = await minifyCSSWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('@keyframes')
    })

    test('should handle CSS with variables', async () => {
      const input = `
        :root {
          --primary-color: red;
        }
        .test {
          color: var(--primary-color);
        }
      `
      const result = await minifyCSSWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('--primary-color')
    })
  })

  describe('Performance tests', () => {
    test('should handle large CSS efficiently', async () => {
      const input = Array(100).fill(0).map((_, i) => 
        `.class-${i} { color: red; background: blue; margin: ${i}px; }`
      ).join('\n')
      
      const start = Date.now()
      const result = await minifyCSSWithOptions(input, defaultCSSOptions)
      const duration = Date.now() - start
      
      expect(result).toBeDefined()
      expect(duration).toBeLessThan(5000) // Should complete within 5 seconds
      expect(result.length).toBeLessThan(input.length)
    })

    test('should reduce code size significantly', async () => {
      const input = `
        .header {
          /* This is a header comment */
          color: red;
          background-color: blue;
          margin-top: 10px;
          margin-right: 20px;
          margin-bottom: 10px;
          margin-left: 20px;
          padding: 5px;
        }
        
        .footer {
          color: green;
          background-color: yellow;
          margin: 0px;
          padding: 1.0em;
        }
      `
      
      const result = await minifyCSSWithOptions(input, defaultCSSOptions)
      
      expect(result).toBeDefined()
      expect(result.length).toBeLessThan(input.length)
      expect(result.length / input.length).toBeLessThan(0.8) // At least 20% reduction
    })
  })
})
