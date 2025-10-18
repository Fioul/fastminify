import { minifyCSS } from '../minify-css'

describe('CSS Minification', () => {
  describe('Basic minification', () => {
    test('should minify simple CSS correctly', async () => {
      const input = `
        .test {
          color: red;
          background-color: blue;
        }
      `
      const result = await minifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result.length).toBeLessThan(input.length)
      // CSSNano may convert color names to hex values
      expect(result).toContain('.test{')
      expect(result).toContain('color:')
      expect(result).toContain('background-color:')
    })

    test('should handle empty CSS', async () => {
      const input = ''
      const result = await minifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toBe('')
    })

    test('should handle whitespace-only CSS', async () => {
      const input = '   \n\t  '
      const result = await minifyCSS(input)
      
      expect(result).toBeDefined()
    })
  })

  describe('CSS features', () => {
    test('should handle CSS variables', async () => {
      const input = `
        :root {
          --primary-color: #007bff;
        }
        .button {
          color: var(--primary-color);
        }
      `
      const result = await minifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('--primary-color')
      expect(result).toContain('var(--primary-color)')
    })

    test('should handle media queries', async () => {
      const input = `
        @media (max-width: 768px) {
          .container {
            width: 100%;
          }
        }
      `
      const result = await minifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('@media')
      expect(result).toContain('max-width:768px')
    })

    test('should handle pseudo-selectors', async () => {
      const input = `
        .button:hover {
          background-color: #0056b3;
        }
        .button::before {
          content: "";
        }
      `
      const result = await minifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain(':hover')
      expect(result).toContain('::before')
    })
  })

  describe('Comments and formatting', () => {
    test('should remove CSS comments', async () => {
      const input = `
        /* This is a comment */
        .test {
          color: red; /* Another comment */
        }
      `
      const result = await minifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).not.toContain('comment')
    })

    test('should preserve important declarations', async () => {
      const input = '.test { color: red !important; }'
      const result = await minifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('!important')
    })
  })

  describe('Error handling', () => {
    test('should handle malformed CSS gracefully', async () => {
      const input = '.test { color: red; background-color: }'
      
      // CSS minifiers are usually more forgiving than JS minifiers
      const result = await minifyCSS(input)
      expect(result).toBeDefined()
    })
  })

  describe('Performance', () => {
    test('should handle large CSS efficiently', async () => {
      const input = Array(100).fill(0).map((_, i) => 
        `.class${i} { color: red; margin: ${i}px; }`
      ).join('\n')
      
      const start = Date.now()
      const result = await minifyCSS(input)
      const duration = Date.now() - start
      
      expect(result).toBeDefined()
      expect(duration).toBeLessThan(3000) // Should complete within 3 seconds
    })
  })
})
