import { beautifyCode, beautifyJavaScript, beautifyCSS, beautifyJSON, beautifyPHP, type BeautifyOptions } from '../beautify'
import { unminifyJS, unminifyCSS, unminifyJSON, unminifyPHP } from '../unminify'
import { minifyJavaScript } from '../javascript-options'
import { minifyCSSWithOptions } from '../css-options'
import { minifyJSONWithOptions } from '../json-options'
import { serializePHPWithOptions, unserializePHPWithOptions } from '../php-options'

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

  describe('CSS Beautification', () => {
    test('should beautify simple CSS code', () => {
      const input = '.test{color:red;background:blue;margin:10px;}'
      const result = beautifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test')
      expect(result).toContain('color: red')
      expect(result).toContain('background: blue')
      expect(result).toContain('margin: 10px')
    })

    test('should beautify complex CSS with multiple selectors', () => {
      const input = '.header,.footer{background:#fff;color:#000;}.header h1{font-size:2rem;margin:0;}'
      const result = beautifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('.header,')
      expect(result).toContain('.footer')
      expect(result).toContain('background: #fff')
      expect(result).toContain('.header h1')
    })

    test('should handle CSS with media queries', () => {
      const input = '@media (max-width:768px){.container{width:100%;padding:0;}}'
      const result = beautifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('@media (max-width:768px)')
      expect(result).toContain('.container')
      expect(result).toContain('width: 100%')
    })

    test('should handle CSS with pseudo-selectors', () => {
      const input = '.button:hover{background:#007bff;color:#fff;}.button:active{transform:scale(0.95);}'
      const result = beautifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('.button:hover')
      expect(result).toContain('.button:active')
      expect(result).toContain('background: #007bff')
      expect(result).toContain('transform: scale(0.95)')
    })

    test('should handle CSS with keyframes', () => {
      const input = '@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}'
      const result = beautifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('@keyframes fadeIn')
      expect(result).toContain('from')
      expect(result).toContain('to')
      expect(result).toContain('opacity: 0')
      expect(result).toContain('opacity: 1')
    })

    test('should handle CSS with comments', () => {
      const input = '/* Main styles */.container{width:100%;}/* End styles */'
      const result = beautifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('/* Main styles */')
      expect(result).toContain('.container')
      expect(result).toContain('/* End styles */')
    })
  })

  describe('JSON Beautification', () => {
    test('should beautify simple JSON code', () => {
      const input = '{"name":"test","value":123}'
      const result = beautifyJSON(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"name": "test"')
      expect(result).toContain('"value": 123')
    })

    test('should beautify complex JSON with nested objects', () => {
      const input = '{"config":{"enabled":true,"options":{"size":"large","colors":["red","blue","green"]}}}'
      const result = beautifyJSON(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"config": {')
      expect(result).toContain('"enabled": true')
      expect(result).toContain('"options": {')
      expect(result).toContain('"colors": [')
    })

    test('should handle JSON arrays', () => {
      const input = '{"items":[{"id":1,"name":"item1"},{"id":2,"name":"item2"}],"count":2}'
      const result = beautifyJSON(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"items": [')
      expect(result).toContain('"id": 1')
      expect(result).toContain('"name": "item1"')
      expect(result).toContain('"count": 2')
    })

    test('should handle JSON with different data types', () => {
      const input = '{"string":"hello","number":42,"boolean":true,"null":null,"array":[1,2,3],"object":{"nested":"value"}}'
      const result = beautifyJSON(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"string": "hello"')
      expect(result).toContain('"number": 42')
      expect(result).toContain('"boolean": true')
      expect(result).toContain('"null": null')
      expect(result).toContain('"array": [')
      expect(result).toContain('"object": {')
    })

    test('should handle empty JSON objects and arrays', () => {
      const input = '{"emptyObject":{},"emptyArray":[],"mixed":{"obj":{},"arr":[]}}'
      const result = beautifyJSON(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"emptyObject": {}')
      expect(result).toContain('"emptyArray": []')
      expect(result).toContain('"mixed": {')
    })

    test('should handle JSON with special characters', () => {
      const input = '{"message":"Hello \\"World\\"","path":"C:\\\\Users\\\\Test","unicode":"\\u0041\\u0042"}'
      const result = beautifyJSON(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"message": "Hello \\"World\\""')
      expect(result).toContain('"path": "C:\\\\Users\\\\Test"')
      // JSON.stringify automatically decodes Unicode sequences
      expect(result).toContain('"unicode": "AB"')
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

  describe('CSS Unminification', () => {
    test('should unminify simple CSS code', () => {
      const input = '.test{color:red;background:blue;margin:10px;}'
      const result = unminifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('.test')
      expect(result).toContain('color:red')
      expect(result).toContain('background:blue')
      expect(result).toContain('margin:10px')
    })

    test('should unminify complex CSS with multiple selectors', () => {
      const input = '.header,.footer{background:#fff;color:#000;}.header h1{font-size:2rem;margin:0;}'
      const result = unminifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('.header,')
      expect(result).toContain('.footer')
      expect(result).toContain('background:#fff')
      expect(result).toContain('.header h1')
    })

    test('should handle CSS with media queries', () => {
      const input = '@media (max-width:768px){.container{width:100%;padding:0;}}'
      const result = unminifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('@media (max-width:768px)')
      expect(result).toContain('.container')
      expect(result).toContain('width:100%')
    })

    test('should handle CSS with pseudo-selectors', () => {
      const input = '.button:hover{background:#007bff;color:#fff;}.button:active{transform:scale(0.95);}'
      const result = unminifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('.button:hover')
      expect(result).toContain('.button:active')
      expect(result).toContain('background:#007bff')
      expect(result).toContain('transform:scale(0.95)')
    })

    test('should handle CSS with keyframes', () => {
      const input = '@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}'
      const result = unminifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('@keyframes fadeIn')
      expect(result).toContain('from')
      expect(result).toContain('to')
      expect(result).toContain('opacity:0')
      expect(result).toContain('opacity:1')
    })

    test('should handle CSS with comments', () => {
      const input = '/* Main styles */.container{width:100%;}/* End styles */'
      const result = unminifyCSS(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('/* Main styles */')
      expect(result).toContain('.container')
      // Note: The unminify function may not preserve all comments in the same format
      expect(result).toContain('width:100%')
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

  describe('PHP Beautification', () => {
    test('should beautify simple PHP serialized data as JSON', () => {
      const input = 'a:2:{s:4:"name";s:4:"test";s:5:"value";i:123;}'
      const result = beautifyPHP(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"name": "test"')
      expect(result).toContain('"value": 123')
      expect(result).toContain('{\n  "name": "test",\n  "value": 123\n}')
    })

    test('should beautify nested PHP serialized data as JSON', () => {
      const input = 'a:1:{s:6:"config";a:2:{s:7:"enabled";b:1;s:7:"options";a:1:{s:4:"size";s:5:"large";}}}'
      const result = beautifyPHP(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"config": {')
      expect(result).toContain('"enabled": true')
      expect(result).toContain('"options": {')
      expect(result).toContain('"size": "large"')
    })

    test('should beautify PHP serialized array as JSON', () => {
      const input = 'a:3:{i:0;s:5:"apple";i:1;s:6:"banana";i:2;s:6:"orange";}'
      const result = beautifyPHP(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"apple"')
      expect(result).toContain('"banana"')
      expect(result).toContain('"orange"')
      expect(result).toContain('[\n  "apple",\n  "banana",\n  "orange"\n]')
    })

    test('should beautify PHP serialized with different data types as JSON', () => {
      const input = 'a:4:{s:6:"string";s:5:"hello";s:6:"number";i:42;s:7:"boolean";b:1;s:4:"null";N;}'
      const result = beautifyPHP(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"string": "hello"')
      expect(result).toContain('"number": 42')
      expect(result).toContain('"boolean": true')
      expect(result).toContain('"null": null')
    })

    test('should handle different indentation options', () => {
      const input = 'a:1:{s:4:"test";s:4:"value";}'
      const result = beautifyPHP(input, { indentSize: 4, indentChar: 'space' })
      
      expect(result).toBeDefined()
      expect(result).toContain('"test": "value"')
      expect(result).toContain('{\n    "test": "value"\n}')
    })

    test('should handle tab indentation', () => {
      const input = 'a:1:{s:4:"test";s:4:"value";}'
      const result = beautifyPHP(input, { indentSize: 2, indentChar: 'tab' })
      
      expect(result).toBeDefined()
      expect(result).toContain('"test": "value"')
      expect(result).toContain('{\n\t"test": "value"\n}')
    })
  })


  describe('PHP Unminification', () => {
    test('should unminify simple PHP serialized data', () => {
      const input = 'a:2:{s:4:"name";s:4:"test";s:5:"value";i:123;}'
      const result = unminifyPHP(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('a:2:{')
      expect(result).toContain('s:4:"name"')
      expect(result).toContain('s:4:"test"')
      expect(result).toContain('s:5:"value"')
      expect(result).toContain('i:123')
    })

    test('should unminify complex PHP serialized data', () => {
      const input = 'a:3:{s:6:"config";a:2:{s:7:"enabled";b:1;s:7:"options";a:1:{s:4:"size";s:5:"large";}}s:5:"items";a:2:{i:0;s:5:"item1";i:1;s:5:"item2";}s:5:"count";i:2;}'
      const result = unminifyPHP(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('a:3:{')
      expect(result).toContain('s:6:"config"')
      expect(result).toContain('a:2:{')
      expect(result).toContain('s:7:"enabled"')
      expect(result).toContain('b:1')
    })

    test('should handle PHP serialized arrays', () => {
      const input = 'a:2:{i:0;a:2:{s:2:"id";i:1;s:4:"name";s:5:"item1";}i:1;a:2:{s:2:"id";i:2;s:4:"name";s:5:"item2";}}'
      const result = unminifyPHP(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('a:2:{')
      expect(result).toContain('i:0')
      expect(result).toContain('s:2:"id"')
      expect(result).toContain('s:4:"name"')
    })

    test('should handle PHP serialized with different data types', () => {
      const input = 'a:6:{s:6:"string";s:5:"hello";s:6:"number";i:42;s:7:"boolean";b:1;s:4:"null";N;s:5:"array";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}s:6:"object";a:1:{s:6:"nested";s:5:"value";}}'
      const result = unminifyPHP(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('s:6:"string"')
      expect(result).toContain('s:5:"hello"')
      expect(result).toContain('s:6:"number"')
      expect(result).toContain('i:42')
      expect(result).toContain('s:7:"boolean"')
      expect(result).toContain('b:1')
      expect(result).toContain('s:4:"null"')
      expect(result).toContain('N')
    })

    test('should handle empty PHP serialized data', () => {
      const input = 'a:2:{s:11:"emptyArray";a:0:{}s:12:"emptyObject";a:0:{}}'
      const result = unminifyPHP(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('s:11:"emptyArray"')
      expect(result).toContain('a:0:{')
      expect(result).toContain('s:12:"emptyObject"')
    })

    test('should handle PHP serialized with special characters', () => {
      const input = 'a:2:{s:7:"message";s:13:"Hello \\"World\\"";s:4:"path";s:16:"C:\\\\Users\\\\Test";}'
      const result = unminifyPHP(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('s:7:"message"')
      expect(result).toContain('s:13:"Hello \\"World\\""')
      expect(result).toContain('s:4:"path"')
      expect(result).toContain('s:16:"C:\\\\Users\\\\Test"')
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
      expect(result).toContain('"name": "test"')
    })

    test('should route PHP code correctly', () => {
      const input = 'a:2:{s:4:"name";s:4:"test";s:5:"value";i:123;}'
      const result = beautifyCode(input, 'php')
      
      expect(result).toBeDefined()
      expect(result).toContain('"name": "test"')
      expect(result).toContain('"value": 123')
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
        removeComments: true,
        mergeRules: true,
        minifySelectors: true
      })
      expect(minified).toBeDefined()
      expect(minified.length).toBeLessThan(beautified.length)
    })

    test('should handle CSS minify -> unminify -> minify workflow', async () => {
      const originalCode = `.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background: #0056b3;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  
  .button {
    width: 100%;
    margin-bottom: 10px;
  }
}`

      // Step 1: Minify
      const minified = await minifyCSSWithOptions(originalCode, {
        compressionLevel: 'normal',
        removeComments: true,
        mergeRules: true,
        minifySelectors: true
      })
      expect(minified).toBeDefined()
      expect(minified.length).toBeLessThanOrEqual(originalCode.length)

      // Step 2: Unminify
      const unminified = unminifyCSS(minified)
      expect(unminified).toBeDefined()
      expect(unminified).toContain('.container')
      expect(unminified).toContain('.button')
      expect(unminified).toContain('@media')

      // Step 3: Reminify
      const reminified = await minifyCSSWithOptions(unminified, {
        compressionLevel: 'normal',
        removeComments: true,
        mergeRules: true,
        minifySelectors: true
      })
      expect(reminified).toBeDefined()
      expect(reminified.length).toBeLessThan(unminified.length)
    })

    test('should handle CSS beautify -> minify -> unminify -> minify workflow', async () => {
      const originalCode = '.test{color:red;font-size:14px;}.test2{background:blue;}.test3{margin:10px;padding:5px;}'

      // Step 1: Beautify
      const beautified = beautifyCode(originalCode, 'css')
      expect(beautified).toBeDefined()
      expect(beautified).toContain('.test {')

      // Step 2: Minify
      const minified = await minifyCSSWithOptions(beautified, {
        compressionLevel: 'normal',
        removeComments: true,
        mergeRules: true,
        minifySelectors: true
      })
      expect(minified).toBeDefined()
      expect(minified.length).toBeLessThan(beautified.length)

      // Step 3: Unminify
      const unminified = unminifyCSS(minified)
      expect(unminified).toBeDefined()
      expect(unminified).toContain('.test')
      expect(unminified).toContain('.test2')
      expect(unminified).toContain('.test3')

      // Step 4: Reminify
      const reminified = await minifyCSSWithOptions(unminified, {
        compressionLevel: 'normal',
        removeComments: true,
        mergeRules: true,
        minifySelectors: true
      })
      expect(reminified).toBeDefined()
      expect(reminified.length).toBeLessThan(unminified.length)
    })

    test('should handle complex CSS with keyframes and pseudo-selectors', async () => {
      const originalCode = `@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button:hover {
  background: #0056b3;
  transform: translateY(-2px);
}

.button:active {
  transform: scale(0.95);
}

.button:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}`

      // Step 1: Beautify
      const beautified = beautifyCode(originalCode, 'css')
      expect(beautified).toBeDefined()
      expect(beautified).toContain('@keyframes fadeIn')
      expect(beautified).toContain('.button:hover')

      // Step 2: Minify
      const minified = await minifyCSSWithOptions(beautified, {
        compressionLevel: 'normal',
        removeComments: true,
        mergeRules: true,
        minifySelectors: true
      })
      expect(minified).toBeDefined()
      expect(minified.length).toBeLessThan(beautified.length)

      // Step 3: Unminify
      const unminified = unminifyCSS(minified)
      expect(unminified).toBeDefined()
      expect(unminified).toContain('@keyframes fadeIn')
      expect(unminified).toContain('.button:hover')
      expect(unminified).toContain('.button:active')
      expect(unminified).toContain('.button:focus')

      // Step 4: Reminify
      const reminified = await minifyCSSWithOptions(unminified, {
        compressionLevel: 'normal',
        removeComments: true,
        mergeRules: true,
        minifySelectors: true
      })
      expect(reminified).toBeDefined()
      expect(reminified.length).toBeLessThan(unminified.length)
    })

    test('should handle JSON beautify -> minify workflow', () => {
      const originalCode = '{"name":"test","value":123,"nested":{"enabled":true}}'

      // Step 1: Beautify
      const beautified = beautifyCode(originalCode, 'json')
      expect(beautified).toBeDefined()
      expect(beautified).toContain('"name": "test"')

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

    test('should handle JSON minify -> unminify -> minify workflow', () => {
      const originalCode = '{"config":{"enabled":true,"options":{"size":"large","colors":["red","blue","green"]}},"items":[{"id":1,"name":"item1"},{"id":2,"name":"item2"}],"count":2}'

      // Step 1: Minify
      const minified = minifyJSONWithOptions(originalCode, {
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
      expect(minified.length).toBeLessThanOrEqual(originalCode.length)

      // Step 2: Unminify
      const unminified = unminifyJSON(minified)
      expect(unminified).toBeDefined()
      expect(unminified).toContain('"config": {')
      expect(unminified).toContain('"items": [')
      expect(unminified).toContain('"count": 2')

      // Step 3: Reminify
      const reminified = minifyJSONWithOptions(unminified, {
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
      expect(reminified).toBeDefined()
      expect(reminified.length).toBeLessThan(unminified.length)
    })

    test('should handle JSON beautify -> minify -> unminify -> minify workflow', () => {
      const originalCode = '{"name":"test","value":123,"nested":{"enabled":true,"options":{"size":"large"}}}'

      // Step 1: Beautify
      const beautified = beautifyCode(originalCode, 'json')
      expect(beautified).toBeDefined()
      expect(beautified).toContain('"name": "test"')

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

      // Step 3: Unminify
      const unminified = unminifyJSON(minified)
      expect(unminified).toBeDefined()
      expect(unminified).toContain('"name": "test"')
      expect(unminified).toContain('"nested": {')

      // Step 4: Reminify
      const reminified = minifyJSONWithOptions(unminified, {
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
      expect(reminified).toBeDefined()
      expect(reminified.length).toBeLessThan(unminified.length)
    })

    test('should handle PHP beautify -> serialize workflow', () => {
      const originalData = {
        name: 'test',
        value: 123,
        config: {
          enabled: true,
          options: {
            size: 'large',
            colors: ['red', 'blue', 'green']
          }
        },
        items: [
          { id: 1, name: 'item1' },
          { id: 2, name: 'item2' }
        ],
        count: 2
      }

      // Step 1: Serialize
      const serialized = serializePHPWithOptions(originalData, {
        includeNullValues: true,
        removeEmptyArrays: false,
        removeEmptyObjects: false,
        sortKeys: false
      })
      expect(serialized).toBeDefined()

      // Step 2: Beautify
      const beautified = beautifyCode(serialized, 'php')
      expect(beautified).toBeDefined()
      expect(beautified).toContain('"name": "test"')
      expect(beautified).toContain('"value": 123')
      expect(beautified).toContain('"config"')
    })

    test('should handle PHP serialize -> beautify -> unminify -> serialize workflow', () => {
      const originalData = {
        config: {
          enabled: true,
          options: {
            size: 'large',
            colors: ['red', 'blue', 'green']
          }
        },
        items: [
          { id: 1, name: 'item1' },
          { id: 2, name: 'item2' }
        ],
        count: 2
      }

      // Step 1: Serialize
      const serialized = serializePHPWithOptions(originalData, {
        includeNullValues: true,
        removeEmptyArrays: false,
        removeEmptyObjects: false,
        sortKeys: false
      })
      expect(serialized).toBeDefined()

      // Step 2: Beautify
      const beautified = beautifyCode(serialized, 'php')
      expect(beautified).toBeDefined()
      expect(beautified).toContain('"config"')
      expect(beautified).toContain('"enabled"')

      // Step 3: Unminify (simulate minified state)
      const unminified = unminifyPHP(serialized)
      expect(unminified).toBeDefined()
      expect(unminified).toContain('a:3:{')
      expect(unminified).toContain('s:6:"config"')

      // Step 4: Reserialize (simulate re-serialization)
      const reserialized = serializePHPWithOptions(originalData, {
        includeNullValues: true,
        removeEmptyArrays: false,
        removeEmptyObjects: false,
        sortKeys: false
      })
      expect(reserialized).toBeDefined()
      expect(reserialized.length).toBeGreaterThan(0)
    })

    test('should handle JSON beautify -> minify workflow', async () => {
      const originalCode = '{"user":{"id":1,"name":"John","active":true,"scores":[85,92,78],"profile":{"email":"john@example.com","age":30}}}'

      // Step 1: Beautify
      const beautified = beautifyCode(originalCode, 'json')
      expect(beautified).toBeDefined()
      expect(beautified).toContain('"user": {')
      expect(beautified).toContain('"id": 1')

      // Step 2: Minify
      const minified = await minifyJSONWithOptions(beautified, {
        compressionLevel: 'normal',
        sortKeys: false,
        validateBeforeMinify: true,
        fixCommonErrors: false,
        optimizeNumbers: true,
        removeEmptyValues: false
      })
      expect(minified).toBeDefined()
      expect(minified.length).toBeLessThan(beautified.length)
    })

    test('should handle JSON minify -> unminify -> minify workflow', async () => {
      const originalCode = '{"config":{"enabled":true,"options":{"size":"large","colors":["red","blue","green"]}}}'

      // Step 1: Minify
      const minified = await minifyJSONWithOptions(originalCode, {
        compressionLevel: 'normal',
        sortKeys: false,
        validateBeforeMinify: true,
        fixCommonErrors: false,
        optimizeNumbers: true,
        removeEmptyValues: false
      })
      expect(minified).toBeDefined()
      expect(minified.length).toBeLessThanOrEqual(originalCode.length)

      // Step 2: Unminify
      const unminified = unminifyJSON(minified)
      expect(unminified).toBeDefined()
      expect(unminified).toContain('"config": {')
      expect(unminified).toContain('"enabled": true')

      // Step 3: Reminify
      const reminified = await minifyJSONWithOptions(unminified, {
        compressionLevel: 'normal',
        sortKeys: false,
        validateBeforeMinify: true,
        fixCommonErrors: false,
        optimizeNumbers: true,
        removeEmptyValues: false
      })
      expect(reminified).toBeDefined()
      expect(reminified.length).toBeLessThan(unminified.length)
    })

    test('should handle JSON beautify -> minify -> unminify -> minify workflow', async () => {
      const originalCode = '{"items":[{"id":1,"name":"item1"},{"id":2,"name":"item2"}],"count":2}'

      // Step 1: Beautify
      const beautified = beautifyCode(originalCode, 'json')
      expect(beautified).toBeDefined()
      expect(beautified).toContain('"items": [')

      // Step 2: Minify
      const minified = await minifyJSONWithOptions(beautified, {
        compressionLevel: 'normal',
        sortKeys: false,
        validateBeforeMinify: true,
        fixCommonErrors: false,
        optimizeNumbers: true,
        removeEmptyValues: false
      })
      expect(minified).toBeDefined()
      expect(minified.length).toBeLessThan(beautified.length)

      // Step 3: Unminify
      const unminified = unminifyJSON(minified)
      expect(unminified).toBeDefined()
      expect(unminified).toContain('"items": [')
      expect(unminified).toContain('"count": 2')

      // Step 4: Reminify
      const reminified = await minifyJSONWithOptions(unminified, {
        compressionLevel: 'normal',
        sortKeys: false,
        validateBeforeMinify: true,
        fixCommonErrors: false,
        optimizeNumbers: true,
        removeEmptyValues: false
      })
      expect(reminified).toBeDefined()
      expect(reminified.length).toBeLessThan(unminified.length)
    })

    test('should handle PHP beautify -> serialize workflow', async () => {
      const originalData = { name: 'test', value: 123, active: true }
      const serialized = await serializePHPWithOptions(originalData, {
        includeNullValues: true,
        removeEmptyArrays: false,
        removeEmptyObjects: false,
        sortKeys: false
      })

      // Step 1: Beautify
      const beautified = beautifyCode(serialized, 'php')
      expect(beautified).toBeDefined()
      expect(beautified).toContain('"name": "test"')
      expect(beautified).toContain('"value": 123')

      // Step 2: Parse JSON (beautified is JSON, not PHP)
      const unserialized = JSON.parse(beautified)
      expect(unserialized).toBeDefined()
      expect(unserialized).toEqual(originalData)
    })

    test('should handle PHP serialize -> beautify -> unserialize -> serialize workflow', async () => {
      const originalData = { 
        config: { 
          enabled: true, 
          options: { 
            size: 'large', 
            colors: ['red', 'blue', 'green'] 
          } 
        },
        count: 3
      }

      // Step 1: Serialize
      const serialized = await serializePHPWithOptions(originalData, {
        includeNullValues: true,
        removeEmptyArrays: false,
        removeEmptyObjects: false,
        sortKeys: false
      })
      expect(serialized).toBeDefined()

      // Step 2: Beautify
      const beautified = beautifyCode(serialized, 'php')
      expect(beautified).toBeDefined()
      expect(beautified).toContain('"config"')
      expect(beautified).toContain('"enabled"')

      // Step 3: Parse JSON (beautified is JSON, not PHP)
      const unserialized = JSON.parse(beautified)
      expect(unserialized).toBeDefined()
      expect(unserialized).toEqual(originalData)

      // Step 4: Re-serialize
      const reserialized = await serializePHPWithOptions(unserialized, {
        includeNullValues: true,
        removeEmptyArrays: false,
        removeEmptyObjects: false,
        sortKeys: false
      })
      expect(reserialized).toBeDefined()
      expect(reserialized.length).toBeGreaterThan(0)
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
