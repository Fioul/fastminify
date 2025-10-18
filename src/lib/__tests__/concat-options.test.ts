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

const mockJSFilesWithComments = [
  {
    id: '1',
    name: 'utils.js',
    content: `// This is a utility function
function add(a, b) { 
  /* Add two numbers */
  return a + b; 
}`,
    type: 'js' as const,
    size: 100
  },
  {
    id: '2', 
    name: 'api.js',
    content: `// API functions
function fetchData() { 
  /* Fetch data from API */
  return fetch("/api/data"); 
}`,
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

const mockCSSFilesWithComments = [
  {
    id: '1',
    name: 'reset.css',
    content: `/* CSS Reset */
* { 
  margin: 0; 
  padding: 0; 
}`,
    type: 'css' as const,
    size: 50
  },
  {
    id: '2',
    name: 'components.css', 
    content: `/* Button styles */
.btn { 
  padding: 10px; 
  background: blue; 
}`,
    type: 'css' as const,
    size: 80
  }
]

// Helper function to clean existing comments
function cleanComments(content: string, type: 'js' | 'css'): string {
  if (type === 'js') {
    // Remove line comments (//) and block comments (/* */) in JavaScript
    return content
      .replace(/\/\*[\s\S]*?\*\//g, '') // Block comments /* */
      .replace(/\/\/.*$/gm, '') // Line comments //
      .replace(/\n\s*\n\s*\n/g, '\n\n') // Clean multiple empty lines
      .trim()
  } else {
    // Remove CSS comments (/* */)
    return content
      .replace(/\/\*[\s\S]*?\*\//g, '') // CSS comments /* */
      .replace(/\n\s*\n\s*\n/g, '\n\n') // Clean multiple empty lines
      .trim()
  }
}

// Helper function to simulate concatenation logic
function concatenateFiles(
  files: Array<{ name: string; content: string; type: 'js' | 'css' }>,
  addComments: boolean,
  addNewlines: boolean
): string {
  let concatenated = ''
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    
    // Clean existing comments from file content
    const cleanedContent = cleanComments(file.content, file.type)
    
    // Smart spacing logic
    if (i > 0) {
      // Add spacing before file (except for first one)
      if (addComments && addNewlines) {
        // Both options enabled: 2 newlines before comment
        concatenated += '\n\n'
      } else if (addNewlines) {
        // Only spacing option: 2 newlines between files
        concatenated += '\n\n'
      }
    }
    
    // Add file name as comment with spacing
    if (addComments) {
      if (file.type === 'js') {
        concatenated += `\n// ${file.name}\n`
      } else {
        concatenated += `\n/* ${file.name} */\n`
      }
    }
    
    // Add cleaned file content
    concatenated += cleanedContent
    
    // Add newline after file content
    if (i < files.length - 1) {
      if (addComments) {
        // If we have comments, add a newline after content
        concatenated += '\n'
      } else if (addNewlines) {
        // If only spacing, add 2 newlines
        concatenated += '\n\n'
      }
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
      // Comments should have newlines before and after
      expect(result).toMatch(/\n\/\/ utils\.js\n/)
      expect(result).toMatch(/\n\/\/ api\.js\n/)
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
      
      // Should contain triple newlines between files (2 empty lines + 1 newline after first file)
      expect(result).toMatch(/function add\(a, b\) \{ return a \+ b; \}\n\n\nfunction fetchData\(\)/)
    })

    test('should not add newlines between files when disabled', () => {
      const result = concatenateFiles(mockJSFiles, false, false)
      
      // Should not contain any newlines between files
      expect(result).not.toMatch(/function add\(a, b\) \{ return a \+ b; \}\n\nfunction fetchData\(\)/)
      expect(result).toMatch(/function add\(a, b\) \{ return a \+ b; \}function fetchData\(\)/)
    })

    test('should combine both options correctly', () => {
      const result = concatenateFiles(mockJSFiles, true, true)
      
      expect(result).toContain('// utils.js')
      expect(result).toContain('// api.js')
      // With both options: 2 newlines before comment, then comment with newlines, then 1 newline after first file
      expect(result).toMatch(/function add\(a, b\) \{ return a \+ b; \}\n\n\n\/\/ api\.js\nfunction fetchData\(\)/)
    })

    test('should remove existing comments and add file name comments', () => {
      const result = concatenateFiles(mockJSFilesWithComments, true, false)
      
      // Should contain file name comments
      expect(result).toContain('// utils.js')
      expect(result).toContain('// api.js')
      
      // Should not contain original comments
      expect(result).not.toContain('// This is a utility function')
      expect(result).not.toContain('/* Add two numbers */')
      expect(result).not.toContain('// API functions')
      expect(result).not.toContain('/* Fetch data from API */')
      
      // Should contain clean function code
      expect(result).toContain('function add(a, b) {')
      expect(result).toContain('return a + b;')
      expect(result).toContain('function fetchData() {')
      expect(result).toContain('return fetch("/api/data");')
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
      // Comments should have newlines before and after
      expect(result).toMatch(/\n\/\* reset\.css \*\/\n/)
      expect(result).toMatch(/\n\/\* components\.css \*\/\n/)
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
      
      // Should contain triple newlines between files (2 empty lines + 1 newline after first file)
      expect(result).toMatch(/\* \{ margin: 0; padding: 0; \}\n\n\n\.btn \{ padding: 10px; background: blue; \}/)
    })

    test('should not add newlines between files when disabled', () => {
      const result = concatenateFiles(mockCSSFiles, false, false)
      
      // Should not contain any newlines between files
      expect(result).not.toMatch(/\* \{ margin: 0; padding: 0; \}\n\n\.btn \{ padding: 10px; background: blue; \}/)
      expect(result).toMatch(/\* \{ margin: 0; padding: 0; \}\.btn \{ padding: 10px; background: blue; \}/)
    })

    test('should combine both options correctly', () => {
      const result = concatenateFiles(mockCSSFiles, true, true)
      
      expect(result).toContain('/* reset.css */')
      expect(result).toContain('/* components.css */')
      // With both options: 2 newlines before comment, then comment with newlines, then 1 newline after first file
      expect(result).toMatch(/\* \{ margin: 0; padding: 0; \}\n\n\n\/\* components\.css \*\/\n\.btn \{ padding: 10px; background: blue; \}/)
    })

    test('should remove existing CSS comments and add file name comments', () => {
      const result = concatenateFiles(mockCSSFilesWithComments, true, false)
      
      // Should contain file name comments
      expect(result).toContain('/* reset.css */')
      expect(result).toContain('/* components.css */')
      
      // Should not contain original comments
      expect(result).not.toContain('/* CSS Reset */')
      expect(result).not.toContain('/* Button styles */')
      
      // Should contain clean CSS code
      expect(result).toContain('* {')
      expect(result).toContain('margin: 0;')
      expect(result).toContain('padding: 0;')
      expect(result).toContain('.btn {')
      expect(result).toContain('padding: 10px;')
      expect(result).toContain('background: blue;')
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
      // Should have newlines between comments for empty files (4 newlines: comment + content + 2 empty lines + 1 newline after first file)
      expect(result).toMatch(/\/\/ empty1\.js\n\n\n\n\/\/ empty2\.js/)
    })
  })
})
