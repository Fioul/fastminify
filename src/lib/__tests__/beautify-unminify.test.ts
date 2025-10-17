import { beautifyCode, beautifyJavaScript, beautifyCSS, beautifyJSON, type BeautifyOptions } from '../beautify'
import { unminifyJS, unminifyCSS, unminifyJSON } from '../unminify'
import { minifyJavaScript } from '../javascript-options'
import { minifyCSSWithOptions } from '../css-options'
import { minifyJSONWithOptions } from '../json-options'

describe('Beautify and Unminify Functions', () => {
  describe('JavaScript Beautification', () => {
    test('should beautify simple JavaScript code', () => {
      const input = 'function test(){return"hello";}'
      const result = beautifyJavaScript(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('function test()')
      expect(result).toContain('return "hello"')
      expect(result).toContain('{')
      expect(result).toContain('}')
    })

    test('should beautify complex JavaScript code with proper indentation', () => {
      const input = 'const config={name:"test",options:{enabled:true,values:[1,2,3]}};'
      const result = beautifyJavaScript(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('const config = {')
      expect(result).toContain('name: "test"')
      expect(result).toContain('options: {')
      expect(result).toContain('enabled: true')
    })

    test('should handle Jest configuration code', () => {
      const input = `const nextJest=require("next/jest"),createJestConfig=nextJest({dir:"./"}),customJestConfig={setupFilesAfterEnv:["<rootDir>/jest.setup.js"],testEnvironment:"jsdom"};module.exports=createJestConfig(customJestConfig);`
      const result = beautifyJavaScript(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('const nextJest = require("next/jest")')
      expect(result).toContain('createJestConfig = nextJest({')
      expect(result).toContain('dir: "./"')
      expect(result).toContain('customJestConfig = {')
    })

    test('should preserve string content correctly', () => {
      const input = 'const str="src/**/*.{js,jsx,ts,tsx}";'
      const result = beautifyJavaScript(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"src/**/*.{js,jsx,ts,tsx}"')
      // The string should be preserved as a single line
      expect(result).toContain('const str = "src/**/*.{js,jsx,ts,tsx}"')
    })

    test('should handle different beautify options', () => {
      const input = 'function test(){return"hello";}'
      const options: BeautifyOptions = {
        indentSize: 4,
        indentChar: 'space',
        maxLineLength: 100,
        preserveNewlines: true
      }
      const result = beautifyJavaScript(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('function test()')
    })

    test('should handle tab indentation', () => {
      const input = 'function test(){return"hello";}'
      const options: BeautifyOptions = {
        indentSize: 2,
        indentChar: 'tab',
        maxLineLength: 100,
        preserveNewlines: true
      }
      const result = beautifyJavaScript(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('\t')
    })
  })

  describe('CSS Beautification', () => {
    test('should beautify CSS code', () => {
      const input = '.test{color:red;font-size:14px;}'
      const result = beautifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test {')
      expect(result).toContain('color: red')
      expect(result).toContain('font-size: 14px')
    })

    test('should handle complex CSS with multiple selectors', () => {
      const input = '.test,.test2{color:red;}.test3{font-size:14px;}'
      const result = beautifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test,')
      expect(result).toContain('.test2 {')
      expect(result).toContain('.test3 {')
    })
  })

  describe('JSON Beautification', () => {
    test('should beautify JSON code', () => {
      const input = '{"name":"test","value":123}'
      const result = beautifyJSON(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('{\n  "name": "test",\n  "value": 123\n}')
    })

    test('should handle nested JSON objects', () => {
      const input = '{"config":{"enabled":true,"options":{"size":"large"}}}'
      const result = beautifyJSON(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"config": {')
      expect(result).toContain('"enabled": true')
      expect(result).toContain('"options": {')
    })
  })

  describe('JavaScript Unminification', () => {
    test('should unminify simple JavaScript code', () => {
      const input = 'function test(){return"hello";}'
      const result = unminifyJS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('function test()')
      expect(result).toContain('return"hello"')
    })

    test('should unminify complex JavaScript code', () => {
      const input = 'const config={name:"test",options:{enabled:true,values:[1,2,3]}};'
      const result = unminifyJS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('const config={')
      expect(result).toContain('name:"test"')
      expect(result).toContain('options:{')
    })

    test('should preserve string content during unminification', () => {
      const input = 'const str="src/**/*.{js,jsx,ts,tsx}";'
      const result = unminifyJS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"src/**/*.{js,jsx,ts,tsx}"')
      // The string should be preserved as a single line
      expect(result).toContain('const str="src/**/*.{js,jsx,ts,tsx}"')
    })

    test('should handle Jest configuration unminification', () => {
      const input = `const nextJest=require("next/jest"),createJestConfig=nextJest({dir:"./"}),customJestConfig={setupFilesAfterEnv:["<rootDir>/jest.setup.js"],testEnvironment:"jsdom"};module.exports=createJestConfig(customJestConfig);`
      const result = unminifyJS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('const nextJest=require("next/jest")')
      expect(result).toContain('createJestConfig=nextJest({')
      expect(result).toContain('dir:"./"')
      expect(result).toContain('customJestConfig={')
    })
  })

  describe('CSS Unminification', () => {
    test('should unminify CSS code', () => {
      const input = '.test{color:red;font-size:14px;}'
      const result = unminifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test {')
      expect(result).toContain('color:red')
      expect(result).toContain('font-size:14px')
    })

    test('should handle multiple CSS rules', () => {
      const input = '.test{color:red;}.test2{font-size:14px;}'
      const result = unminifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test {')
      expect(result).toContain('.test2 {')
    })
  })

  describe('JSON Unminification', () => {
    test('should unminify JSON code', () => {
      const input = '{"name":"test","value":123}'
      const result = unminifyJSON(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('{\n  "name": "test",\n  "value": 123\n}')
    })
  })

  describe('Beautify Code Router', () => {
    test('should route JavaScript code correctly', () => {
      const input = 'function test(){return"hello";}'
      const result = beautifyCode(input, 'js')
      
      expect(result).toBeDefined()
      expect(result).toContain('function test()')
    })

    test('should route CSS code correctly', () => {
      const input = '.test{color:red;}'
      const result = beautifyCode(input, 'css')
      
      expect(result).toBeDefined()
      expect(result).toContain('.test {')
    })

    test('should route JSON code correctly', () => {
      const input = '{"name":"test"}'
      const result = beautifyCode(input, 'json')
      
      expect(result).toBeDefined()
      expect(result).toContain('{\n  "name": "test"\n}')
    })
  })

  describe('Complete Workflow Tests', () => {
    test('should handle beautify -> minify workflow', async () => {
      const originalCode = `const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}`

      // Step 1: Beautify
      const beautified = beautifyCode(originalCode, 'js')
      expect(beautified).toBeDefined()
      expect(beautified).toContain('const nextJest = require(\'next/jest\')')

      // Step 2: Minify
      const minified = await minifyJavaScript(beautified, {
        ecmaVersion: 'es2022',
        compressionLevel: 'normal',
        browserSupport: 'modern',
        preserveClassNames: false,
        preserveFunctionNames: false,
        removeConsole: false,
        removeDebugger: false
      })
      expect(minified).toBeDefined()
      expect(minified.length).toBeLessThan(beautified.length)
    })

    test('should handle minify -> unminify -> minify workflow', async () => {
      const originalCode = `const config = {
  name: 'test',
  options: {
    enabled: true,
    values: [1, 2, 3]
  }
}`

      // Step 1: Minify
      const minified = await minifyJavaScript(originalCode, {
        ecmaVersion: 'es2022',
        compressionLevel: 'normal',
        browserSupport: 'modern',
        preserveClassNames: false,
        preserveFunctionNames: false,
        removeConsole: false,
        removeDebugger: false
      })
      expect(minified).toBeDefined()

      // Step 2: Unminify
      const unminified = unminifyJS(minified)
      expect(unminified).toBeDefined()
      expect(unminified).toContain('const config={')

      // Step 3: Reminify
      const reminified = await minifyJavaScript(unminified, {
        ecmaVersion: 'es2022',
        compressionLevel: 'normal',
        browserSupport: 'modern',
        preserveClassNames: false,
        preserveFunctionNames: false,
        removeConsole: false,
        removeDebugger: false
      })
      expect(reminified).toBeDefined()
    })

    test('should handle CSS beautify -> minify workflow', async () => {
      const originalCode = '.test{color:red;font-size:14px;}.test2{background:blue;}'

      // Step 1: Beautify
      const beautified = beautifyCode(originalCode, 'css')
      expect(beautified).toBeDefined()
      expect(beautified).toContain('.test {')

      // Step 2: Minify
      const minified = await minifyCSSWithOptions(beautified, {
        compressionLevel: 'normal',
        browserSupport: 'modern',
        removeComments: true,
        convertColors: true,
        mergeRules: true,
        minifySelectors: true
      })
      expect(minified).toBeDefined()
      expect(minified.length).toBeLessThan(beautified.length)
    })

    test('should handle JSON beautify -> minify workflow', () => {
      const originalCode = '{"name":"test","value":123,"nested":{"enabled":true}}'

      // Step 1: Beautify
      const beautified = beautifyCode(originalCode, 'json')
      expect(beautified).toBeDefined()
      expect(beautified).toContain('{\n  "name": "test"')

      // Step 2: Minify
      const minified = minifyJSONWithOptions(beautified, {
        compressionLevel: 'normal',
        optimizeNumbers: true,
        useScientificNotation: false,
        removeEmptyKeys: false,
        removeNullValues: false,
        removeUndefinedValues: true,
        removeEmptyArrayElements: false,
        removeDuplicateArrayElements: false,
        sortArrayElements: false,
        removeEmptyObjects: false,
        removeEmptyArrays: false,
        sortObjectKeys: false,
        removeDuplicateKeys: false,
        validateBeforeMinify: true,
        fixCommonErrors: true
      })
      expect(minified).toBeDefined()
      expect(minified.length).toBeLessThan(beautified.length)
    })
  })

  describe('Error Handling', () => {
    test('should handle invalid JavaScript in beautify', () => {
      const input = 'function invalid syntax {'
      const result = beautifyJavaScript(input)
      
      // Should return beautified code even for invalid syntax (js-beautify tries to format it)
      expect(result).toBeDefined()
      expect(result).toContain('function invalid')
    })

    test('should handle invalid CSS in beautify', () => {
      const input = '.test{invalid: syntax'
      const result = beautifyCSS(input)
      
      // Should return beautified code even for invalid syntax (js-beautify tries to format it)
      expect(result).toBeDefined()
      expect(result).toContain('.test {')
    })

    test('should handle invalid JSON in beautify', () => {
      const input = '{"name":"test",invalid}'
      const result = beautifyJSON(input)
      
      // Should return original code on error
      expect(result).toBe(input)
    })

    test('should handle invalid JavaScript in unminify', () => {
      const input = 'function invalid syntax {'
      
      // The unminify function should handle invalid syntax gracefully
      const result = unminifyJS(input)
      expect(result).toBeDefined()
      expect(result).toContain('function invalid')
    })

    test('should handle invalid JSON in unminify', () => {
      const input = '{"name":"test",invalid}'
      
      expect(() => unminifyJSON(input)).toThrow()
    })
  })
})
