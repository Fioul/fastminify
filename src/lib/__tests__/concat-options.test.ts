import { minifyJavaScript } from '../javascript-options'
import { minifyCSSWithOptions } from '../css-options'

// Mock data for testing
const mockJSFiles = [
  {
    id: '1',
    name: 'utils.js',
    content: 'function add(a, b) { return a + b; }',
    type: 'js' as const,
    size: 100
  },
  {
    id: '2', 
    name: 'api.js',
    content: 'function fetchData() { return fetch("/api/data"); }',
    type: 'js' as const,
    size: 150
  }
]

const mockCSSFiles = [
  {
    id: '1',
    name: 'reset.css',
    content: '* { margin: 0; padding: 0; }',
    type: 'css' as const,
    size: 50
  },
  {
    id: '2',
    name: 'components.css', 
    content: '.btn { padding: 10px; background: blue; }',
    type: 'css' as const,
    size: 80
  }
]

// Helper function to simulate concatenation logic
function concatenateFiles(
  files: Array<{ name: string; content: string; type: 'js' | 'css' }>,
  addComments: boolean,
  addNewlines: boolean
): string {
  let concatenated = ''
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    
    // Add file name as comment
    if (addComments) {
      if (file.type === 'js') {
        concatenated += `// ${file.name}\n`
      } else {
        concatenated += `/* ${file.name} */\n`
      }
    }
    
    // Add file content
    concatenated += file.content
    
    // Add newlines between files
    if (addNewlines && i < files.length - 1) {
      concatenated += '\n\n'
    }
  }
  
  return concatenated
}

describe('Concatenation Options', () => {
  describe('JavaScript Concatenation', () => {
    test('should add file names as comments when enabled', () => {
      const result = concatenateFiles(mockJSFiles, true, false)
      
      expect(result).toContain('// utils.js')
      expect(result).toContain('// api.js')
      expect(result).toContain('function add(a, b) { return a + b; }')
      expect(result).toContain('function fetchData() { return fetch("/api/data"); }')
    })

    test('should not add file names as comments when disabled', () => {
      const result = concatenateFiles(mockJSFiles, false, false)
      
      expect(result).not.toContain('// utils.js')
      expect(result).not.toContain('// api.js')
      expect(result).toContain('function add(a, b) { return a + b; }')
      expect(result).toContain('function fetchData() { return fetch("/api/data"); }')
    })

    test('should add newlines between files when enabled', () => {
      const result = concatenateFiles(mockJSFiles, false, true)
      
      // Should contain double newlines between files
      expect(result).toMatch(/function add\(a, b\) \{ return a \+ b; \}\n\nfunction fetchData\(\)/)
    })

    test('should not add newlines between files when disabled', () => {
      const result = concatenateFiles(mockJSFiles, false, false)
      
      // Should not contain double newlines between files
      expect(result).not.toMatch(/function add\(a, b\) \{ return a \+ b; \}\n\nfunction fetchData\(\)/)
      expect(result).toMatch(/function add\(a, b\) \{ return a \+ b; \}function fetchData\(\)/)
    })

    test('should combine both options correctly', () => {
      const result = concatenateFiles(mockJSFiles, true, true)
      
      expect(result).toContain('// utils.js')
      expect(result).toContain('// api.js')
      expect(result).toMatch(/\/\/ utils\.js\nfunction add\(a, b\) \{ return a \+ b; \}\n\n\/\/ api\.js\nfunction fetchData\(\)/)
    })

    test('should work with minification - comments removed (normal behavior)', async () => {
      const concatenated = concatenateFiles(mockJSFiles, true, true)
      const minified = await minifyJavaScript(concatenated, {
        ecmaVersion: 'es2020',
        compressionLevel: 'normal',
        browserSupport: 'modern',
        preserveClassNames: false,
        preserveFunctionNames: false,
        removeConsole: false,
        removeDebugger: false
      })
      
      // Comments are removed during JS minification (normal behavior)
      expect(minified).not.toContain('// utils.js')
      expect(minified).not.toContain('// api.js')
      // But functions should be preserved and minified
      expect(minified).toContain('function add(')
      expect(minified).toContain('function fetchData(')
    })
  })

  describe('CSS Concatenation', () => {
    test('should add file names as comments when enabled', () => {
      const result = concatenateFiles(mockCSSFiles, true, false)
      
      expect(result).toContain('/* reset.css */')
      expect(result).toContain('/* components.css */')
      expect(result).toContain('* { margin: 0; padding: 0; }')
      expect(result).toContain('.btn { padding: 10px; background: blue; }')
    })

    test('should not add file names as comments when disabled', () => {
      const result = concatenateFiles(mockCSSFiles, false, false)
      
      expect(result).not.toContain('/* reset.css */')
      expect(result).not.toContain('/* components.css */')
      expect(result).toContain('* { margin: 0; padding: 0; }')
      expect(result).toContain('.btn { padding: 10px; background: blue; }')
    })

    test('should add newlines between files when enabled', () => {
      const result = concatenateFiles(mockCSSFiles, false, true)
      
      // Should contain double newlines between files
      expect(result).toMatch(/\* \{ margin: 0; padding: 0; \}\n\n\.btn \{ padding: 10px; background: blue; \}/)
    })

    test('should not add newlines between files when disabled', () => {
      const result = concatenateFiles(mockCSSFiles, false, false)
      
      // Should not contain double newlines between files
      expect(result).not.toMatch(/\* \{ margin: 0; padding: 0; \}\n\n\.btn \{ padding: 10px; background: blue; \}/)
      expect(result).toMatch(/\* \{ margin: 0; padding: 0; \}\.btn \{ padding: 10px; background: blue; \}/)
    })

    test('should combine both options correctly', () => {
      const result = concatenateFiles(mockCSSFiles, true, true)
      
      expect(result).toContain('/* reset.css */')
      expect(result).toContain('/* components.css */')
      expect(result).toMatch(/\/\* reset\.css \*\/\n\* \{ margin: 0; padding: 0; \}\n\n\/\* components\.css \*\/\n\.btn \{ padding: 10px; background: blue; \}/)
    })

    test('should work with minification - comments removed by default', async () => {
      const concatenated = concatenateFiles(mockCSSFiles, true, true)
      const minified = await minifyCSSWithOptions(concatenated, {
        compressionLevel: 'normal',
        browserSupport: 'modern',
        removeComments: true
      })
      
      // Comments should be removed in CSS minification when removeComments: true
      expect(minified).not.toContain('/* reset.css */')
      expect(minified).not.toContain('/* components.css */')
      // But content should be preserved (blue becomes #00f during minification)
      expect(minified).toContain('*{margin:0;padding:0}')
      expect(minified).toContain('.btn{padding:10px;background:#00f}')
    })

    test('should preserve comments when removeComments is false', async () => {
      const concatenated = concatenateFiles(mockCSSFiles, true, true)
      const minified = await minifyCSSWithOptions(concatenated, {
        compressionLevel: 'normal',
        browserSupport: 'modern',
        removeComments: false
      })
      
      // Comments should be preserved when removeComments: false
      expect(minified).toContain('/* reset.css */')
      expect(minified).toContain('/* components.css */')
    })
  })

  describe('Edge Cases', () => {
    test('should handle single file correctly', () => {
      const singleFile = [mockJSFiles[0]]
      const result = concatenateFiles(singleFile, true, true)
      
      expect(result).toContain('// utils.js')
      expect(result).toContain('function add(a, b) { return a + b; }')
      // Should not have trailing newlines for single file
      expect(result).not.toMatch(/function add\(a, b\) \{ return a \+ b; \}\n\n$/)
    })

    test('should handle empty files array', () => {
      const result = concatenateFiles([], true, true)
      expect(result).toBe('')
    })

    test('should handle files with empty content', () => {
      const emptyFiles = [
        { name: 'empty1.js', content: '', type: 'js' as const },
        { name: 'empty2.js', content: '', type: 'js' as const }
      ]
      const result = concatenateFiles(emptyFiles, true, true)
      
      expect(result).toContain('// empty1.js')
      expect(result).toContain('// empty2.js')
      // Should have newlines between comments for empty files (3 newlines: comment + content + newlines)
      expect(result).toMatch(/\/\/ empty1\.js\n\n\n\/\/ empty2\.js/)
    })
  })
})
