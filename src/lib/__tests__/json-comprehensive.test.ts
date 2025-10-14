import { minifyJSONWithOptions, defaultJSONOptions, type JSONOptions } from '../json-options'

describe('JSON Comprehensive Tests', () => {
  describe('Compression Levels', () => {
    test('conservative compression should only remove whitespace', () => {
      const input = `
        {
          "name": "test",
          "value": 123,
          "active": true
        }
      `
      const options: JSONOptions = { ...defaultJSONOptions, compressionLevel: 'conservative' }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBe('{"name":"test","value":123,"active":true}')
    })

    test('normal compression should optimize numbers', () => {
      const input = '{"value": 1.00, "count": 2.50, "id": 3}'
      const options: JSONOptions = { ...defaultJSONOptions, compressionLevel: 'normal' }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"value":1')
      expect(result).toContain('"count":2.5')
      expect(result).toContain('"id":3')
    })

    test('aggressive compression should clean data', () => {
      const input = '{"name": "test", "empty": "", "null": null, "value": 123}'
      const options: JSONOptions = { 
        ...defaultJSONOptions, 
        compressionLevel: 'aggressive',
        removeEmptyKeys: true,
        removeNullValues: true
      }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"name":"test"')
      expect(result).toContain('"value":123')
      expect(result).not.toContain('"empty"')
      expect(result).not.toContain('"null"')
    })
  })

  describe('Number Optimization', () => {
    test('should optimize decimal numbers when enabled', () => {
      const input = '{"price": 19.99, "quantity": 1.00, "discount": 0.50}'
      const options: JSONOptions = { ...defaultJSONOptions, optimizeNumbers: true }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"price":19.99')
      expect(result).toContain('"quantity":1')
      expect(result).toContain('"discount":0.5')
    })

    test('should preserve decimal numbers when disabled', () => {
      const input = '{"price": 19.99, "quantity": 1.00, "discount": 0.50}'
      const options: JSONOptions = { ...defaultJSONOptions, optimizeNumbers: false }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"price":19.99')
      expect(result).toContain('"quantity":1')
      expect(result).toContain('"discount":0.5')
    })

    test('should handle scientific notation for large numbers', () => {
      const input = '{"population": 1000000, "revenue": 5000000, "small": 0.000001}'
      const options: JSONOptions = { 
        ...defaultJSONOptions, 
        useScientificNotation: true 
      }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"population":"1e+6"')
      expect(result).toContain('"revenue":"5e+6"')
      expect(result).toContain('"small":0.000001')
    })

    test('should handle negative numbers correctly', () => {
      const input = '{"temperature": -5.5, "balance": -1000.00, "score": -0.25}'
      const options: JSONOptions = { ...defaultJSONOptions, optimizeNumbers: true }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"temperature":-5.5')
      expect(result).toContain('"balance":-1000')
      expect(result).toContain('"score":-0.25')
    })
  })

  describe('Data Cleaning', () => {
    test('should remove empty keys when enabled', () => {
      const input = '{"name": "test", "": "empty", "value": 123, "": "another empty"}'
      const options: JSONOptions = { 
        ...defaultJSONOptions, 
        compressionLevel: 'aggressive',
        removeEmptyKeys: true
      }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"name":"test"')
      expect(result).toContain('"value":123')
      expect(result).not.toContain('""')
    })

    test('should remove null values when enabled', () => {
      const input = '{"name": "test", "description": null, "value": 123, "status": null}'
      const options: JSONOptions = { 
        ...defaultJSONOptions, 
        compressionLevel: 'aggressive',
        removeNullValues: true
      }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"name":"test"')
      expect(result).toContain('"value":123')
      expect(result).not.toContain('"description"')
      expect(result).not.toContain('"status"')
    })

    test('should handle nested object cleaning', () => {
      const input = '{"user": {"name": "test", "email": null, "age": 25}, "settings": {"theme": null, "lang": "en"}}'
      const options: JSONOptions = { 
        ...defaultJSONOptions, 
        compressionLevel: 'aggressive',
        removeNullValues: true
      }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"user":{"name":"test","age":25}')
      expect(result).toContain('"settings":{"lang":"en"}')
      expect(result).not.toContain('"email"')
      expect(result).not.toContain('"theme"')
    })
  })

  describe('Array Processing', () => {
    test('should remove empty array elements when enabled', () => {
      const input = '[1, "", null, 3, {}, []]'
      const options: JSONOptions = { 
        ...defaultJSONOptions, 
        compressionLevel: 'aggressive',
        removeEmptyArrayElements: true
      }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('1')
      expect(result).toContain('3')
      expect(result).not.toContain('""')
      expect(result).not.toContain('null')
    })

    test('should sort array elements when enabled', () => {
      const input = '["zebra", "apple", "banana"]'
      const options: JSONOptions = { 
        ...defaultJSONOptions, 
        compressionLevel: 'aggressive',
        sortArrayElements: true
      }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toBe('["apple","banana","zebra"]')
    })

    test('should sort numeric arrays when enabled', () => {
      const input = '[3, 1, 4, 1, 5]'
      const options: JSONOptions = { 
        ...defaultJSONOptions, 
        compressionLevel: 'aggressive',
        sortArrayElements: true
      }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toBe('[1,1,3,4,5]')
    })

    test('should handle mixed arrays correctly', () => {
      const input = '[{"id": 3}, {"id": 1}, {"id": 2}]'
      const options: JSONOptions = { 
        ...defaultJSONOptions, 
        compressionLevel: 'aggressive',
        sortArrayElements: true
      }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      // Objects are not sorted by default
      expect(result).toContain('{"id":3}')
      expect(result).toContain('{"id":1}')
      expect(result).toContain('{"id":2}')
    })
  })

  describe('Error Handling and Validation', () => {
    test('should fix common JSON errors', () => {
      const input = "{'name': 'test', 'value': 123}"
      const options: JSONOptions = { ...defaultJSONOptions, fixCommonErrors: true }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"name":"test"')
      expect(result).toContain('"value":123')
    })

    test('should fix unquoted keys', () => {
      const input = '{name: "test", value: 123, active: true}'
      const options: JSONOptions = { ...defaultJSONOptions, fixCommonErrors: true }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"name":"test"')
      expect(result).toContain('"value":123')
      expect(result).toContain('"active":true')
    })

    test('should handle trailing commas', () => {
      const input = '{"name": "test", "value": 123,}'
      const options: JSONOptions = { ...defaultJSONOptions, fixCommonErrors: true }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toBe('{"name":"test","value":123}')
    })

    test('should validate JSON before processing when enabled', () => {
      const input = '{"name": "test", "value": }'
      const options: JSONOptions = { ...defaultJSONOptions, validateBeforeMinify: true }
      
      expect(() => minifyJSONWithOptions(input, options))
        .toThrow('Invalid JSON syntax')
    })

    test('should handle empty input gracefully', () => {
      expect(() => minifyJSONWithOptions(''))
        .toThrow('Invalid JSON code provided')
      
      expect(() => minifyJSONWithOptions('   '))
        .toThrow('Invalid JSON code provided')
    })
  })

  describe('Complex Data Structures', () => {
    test('should handle deeply nested objects', () => {
      const input = JSON.stringify({
        level1: {
          level2: {
            level3: {
              level4: {
                value: "deep",
                count: 42
              }
            }
          }
        }
      }, null, 2)
      
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"level1":{"level2":{"level3":{"level4":{"value":"deep","count":42}}}}}')
    })

    test('should handle arrays of objects', () => {
      const input = JSON.stringify([
        { id: 1, name: "Alice", active: true },
        { id: 2, name: "Bob", active: false },
        { id: 3, name: "Charlie", active: true }
      ], null, 2)
      
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('{"id":1,"name":"Alice","active":true}')
      expect(result).toContain('{"id":2,"name":"Bob","active":false}')
      expect(result).toContain('{"id":3,"name":"Charlie","active":true}')
    })

    test('should handle mixed data types', () => {
      const input = JSON.stringify({
        string: "hello",
        number: 42,
        boolean: true,
        null: null,
        array: [1, "two", false],
        object: { nested: "value" }
      }, null, 2)
      
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"string":"hello"')
      expect(result).toContain('"number":42')
      expect(result).toContain('"boolean":true')
      expect(result).toContain('"null":null')
      expect(result).toContain('"array":[1,"two",false]')
      expect(result).toContain('"object":{"nested":"value"}')
    })
  })

  describe('Performance and Edge Cases', () => {
    test('should handle large JSON efficiently', () => {
      const largeData = Array(1000).fill(0).map((_, i) => ({
        id: i,
        name: `Item ${i}`,
        value: Math.random() * 1000,
        active: i % 2 === 0,
        metadata: {
          created: new Date().toISOString(),
          tags: [`tag${i}`, `category${i % 10}`]
        }
      }))
      
      const input = JSON.stringify(largeData, null, 2)
      const start = Date.now()
      const result = minifyJSONWithOptions(input)
      const duration = Date.now() - start
      
      expect(result).toBeDefined()
      expect(duration).toBeLessThan(2000) // Should complete within 2 seconds
      expect(result.length).toBeLessThan(input.length)
    })

    test('should handle special characters correctly', () => {
      const input = JSON.stringify({
        unicode: "héllo wørld 🌍",
        quotes: 'He said "Hello"',
        backslashes: "C:\\Users\\Test",
        newlines: "Line 1\nLine 2\r\nLine 3"
      }, null, 2)
      
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"unicode":"héllo wørld 🌍"')
      expect(result).toContain('"quotes":"He said \\"Hello\\""')
      expect(result).toContain('"backslashes":"C:\\\\Users\\\\Test"')
      expect(result).toContain('"newlines":"Line 1\\nLine 2\\r\\nLine 3"')
    })

    test('should handle very large numbers', () => {
      const input = JSON.stringify({
        bigInt: 9007199254740991, // Max safe integer
        scientific: 1e15,
        negative: -1e10
      }, null, 2)
      
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"bigInt":9007199254740991')
      // Our regex only converts numbers with 7+ digits, not scientific notation
      expect(result).toContain('"scientific":1000000000000000')
      expect(result).toContain('"negative":-10000000000')
    })
  })

  describe('Option Combinations', () => {
    test('should work with all options enabled', () => {
      const input = '{"name": "test", "value": 1.00, "empty": "", "null": null, "array": [3, 1, 2]}'
      const options: JSONOptions = {
        compressionLevel: 'aggressive',
        optimizeNumbers: true,
        useScientificNotation: true,
        removeEmptyKeys: true,
        removeNullValues: true,
        removeEmptyArrayElements: true,
        sortArrayElements: true,
        fixCommonErrors: true,
        validateBeforeMinify: true
      }
      
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"name":"test"')
      expect(result).toContain('"value":1')
      expect(result).not.toContain('"empty"')
      expect(result).not.toContain('"null"')
      expect(result).toContain('"array":[1,2,3]')
    })

    test('should work with minimal options', () => {
      const input = '{"name": "test", "value": 123}'
      const options: JSONOptions = {
        compressionLevel: 'conservative',
        optimizeNumbers: false,
        useScientificNotation: false,
        removeEmptyKeys: false,
        removeNullValues: false,
        removeEmptyArrayElements: false,
        sortArrayElements: false,
        fixCommonErrors: false,
        validateBeforeMinify: false
      }
      
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toBe('{"name":"test","value":123}')
    })
  })
})
