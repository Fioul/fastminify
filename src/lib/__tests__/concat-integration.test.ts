import { minifyJavaScript } from '../javascript-options'
import { minifyCSSWithOptions } from '../css-options'

// Test the actual concatenation logic used in ConcatModal
async function processFiles(
  files: Array<{ name: string; content: string; type: 'js' | 'css' }>,
  addComments: boolean,
  addNewlines: boolean
): Promise<string> {
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
      concatenated += '\n\n\n'
    }
  }

  // Minify the result
  let minified = concatenated
  if (files[0]?.type === 'js') {
    minified = await minifyJavaScript(concatenated, {
      ecmaVersion: 'es2020',
      compressionLevel: 'normal',
      preserveClassNames: false,
      preserveFunctionNames: false,
      removeConsole: false,
      removeDebugger: false
    })
  } else {
    minified = await minifyCSSWithOptions(concatenated, {
      compressionLevel: 'normal',
      removeComments: !addComments // Only remove comments if addComments is false
    })
  }

  return minified
}

describe('Concatenation Integration Tests', () => {
  const testJSFiles = [
    { name: 'utils.js', content: 'function add(a, b) { return a + b; }', type: 'js' as const },
    { name: 'api.js', content: 'function fetchData() { return fetch("/api/data"); }', type: 'js' as const }
  ]

  const testCSSFiles = [
    { name: 'reset.css', content: '* { margin: 0; padding: 0; }', type: 'css' as const },
    { name: 'components.css', content: '.btn { padding: 10px; background: blue; }', type: 'css' as const }
  ]

  describe('JavaScript Integration', () => {
    test('should remove comments during minification (normal behavior)', async () => {
      const result = await processFiles(testJSFiles, true, true)
      
      // Comments are removed during JS minification (normal behavior)
      expect(result).not.toContain('// utils.js')
      expect(result).not.toContain('// api.js')
      // But functions should be preserved and minified
      expect(result).toContain('function add(')
      expect(result).toContain('function fetchData(')
    })

    test('should remove comments when addComments is false', async () => {
      const result = await processFiles(testJSFiles, false, true)
      
      // Comments should not be in the final result
      expect(result).not.toContain('// utils.js')
      expect(result).not.toContain('// api.js')
      // But functions should be preserved
      expect(result).toContain('function add(')
      expect(result).toContain('function fetchData(')
    })
  })

  describe('CSS Integration', () => {
    test('should preserve comments when addComments is true', async () => {
      const result = await processFiles(testCSSFiles, true, true)
      
      // Comments should be preserved in the final result
      expect(result).toContain('/* reset.css */')
      expect(result).toContain('/* components.css */')
      // Content should be present (not minified when comments are preserved)
      expect(result).toContain('*{margin:0;padding:0;}')
      expect(result).toContain('.btn{padding:10px;background:blue;}')
    })

    test('should remove comments when addComments is false', async () => {
      const result = await processFiles(testCSSFiles, false, true)
      
      // Comments should not be in the final result
      expect(result).not.toContain('/* reset.css */')
      expect(result).not.toContain('/* components.css */')
      // But content should be preserved and minified
      expect(result).toContain('*{margin:0;padding:0}')
      expect(result).toContain('.btn{padding:10px;background:#00f}')
    })

    test('should handle newlines correctly with addNewlines', async () => {
      const result = await processFiles(testCSSFiles, true, true)
      
      // Should contain the comments
      expect(result).toContain('/* reset.css */')
      expect(result).toContain('/* components.css */')
      // Content should be present (not minified when comments are preserved)
      expect(result).toContain('*{margin:0;padding:0;}')
      expect(result).toContain('.btn{padding:10px;background:blue;}')
    })

    test('should handle no newlines correctly', async () => {
      const result = await processFiles(testCSSFiles, true, false)
      
      // Should contain the comments
      expect(result).toContain('/* reset.css */')
      expect(result).toContain('/* components.css */')
      // Content should be present (not minified when comments are preserved)
      expect(result).toContain('*{margin:0;padding:0;}')
      expect(result).toContain('.btn{padding:10px;background:blue;}')
    })
  })

  describe('Real-world scenarios', () => {
    test('should work with actual test files', async () => {
      // Test with the actual files we created
      const realJSFiles = [
        { name: 'api.js', content: `// Gestion des appels API
class ApiClient {
    constructor(baseURL = 'https://api.example.com') {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    }

    async get(endpoint, options = {}) {
        try {
            const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
                method: 'GET',
                headers: { ...this.defaultHeaders, ...options.headers },
                ...options
            });

            if (!response.ok) {
                throw new Error(\`HTTP error! status: \${response.status}\`);
            }

            return await response.json();
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    }
}

const apiClient = new ApiClient();`, type: 'js' as const },
        { name: 'utils.js', content: `// Utilitaires généraux
function formatDate(date) {
    return new Intl.DateTimeFormat('fr-FR').format(date);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export { formatDate, debounce };`, type: 'js' as const }
      ]

      const result = await processFiles(realJSFiles, true, true)
      
      // Comments are removed during JS minification (normal behavior)
      expect(result).not.toContain('// api.js')
      expect(result).not.toContain('// utils.js')
      // Should contain class and function names (minified)
      expect(result).toContain('class ApiClient')
      expect(result).toContain('function formatDate')
      expect(result).toContain('function debounce')
    })
  })
})
