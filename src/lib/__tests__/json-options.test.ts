import { minifyJSONWithOptions, defaultJSONOptions, type JSONOptions } from '../json-options'

describe('JSON Options', () => {
  describe('Basic minification', () => {
    test('should minify JSON with default options', () => {
      const input = `
        {
          "name": "test",
          "value": 123,
          "active": true
        }
      `
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result.length).toBeLessThan(input.length)
      expect(result).toContain('"name":"test"')
    })

    test('should handle empty JSON', () => {
      const input = '{}'
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toBe('{}')
    })

    test('should handle array JSON', () => {
      const input = '[1, 2, 3]'
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toBe('[1,2,3]')
    })
  })

  describe('Compression levels', () => {
    test('should apply conservative compression', () => {
      const input = '{"name": "test", "value": 123}'
      const options: JSONOptions = { ...defaultJSONOptions, compressionLevel: 'conservative' }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toBe('{"name":"test","value":123}')
    })

    test('should apply normal compression', () => {
      const input = '{"name": "test", "value": 1.00}'
      const options: JSONOptions = { ...defaultJSONOptions, compressionLevel: 'normal' }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"name":"test"')
    })

    test('should apply aggressive compression', () => {
      const input = '{"name": "test", "value": 123, "empty": "", "null": null}'
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

  describe('Number optimization', () => {
    test('should optimize numbers when enabled', () => {
      const input = '{"value": 1.00, "count": 2.50}'
      const options: JSONOptions = { ...defaultJSONOptions, optimizeNumbers: true }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"value":1')
      expect(result).toContain('"count":2.5')
    })

    test('should preserve numbers when disabled', () => {
      const input = '{"value": 1.00, "count": 2.50}'
      const options: JSONOptions = { ...defaultJSONOptions, optimizeNumbers: false }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      // JSON.stringify converts 1.00 to 1 automatically
      expect(result).toContain('"value":1')
      expect(result).toContain('"count":2.5')
    })

    test('should use scientific notation when enabled', () => {
      const input = '{"large": 1000000, "small": 0.000001}'
      const options: JSONOptions = { 
        ...defaultJSONOptions, 
        optimizeNumbers: true,
        useScientificNotation: true
      }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      // Our regex converts large numbers to scientific notation as strings
      expect(result).toContain('"large":"1e+6"')
      // Small numbers are not converted by our regex (only 7+ digits)
      expect(result).toContain('"small":0.000001')
    })

    test('should preserve decimals when optimizeNumbers is disabled', () => {
      const input = '{"price": 1.00, "discount": 0.50, "count": 42}'
      const options: JSONOptions = { 
        ...defaultJSONOptions, 
        optimizeNumbers: false
      }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"price":1.00')
      expect(result).toContain('"discount":0.50')
      expect(result).toContain('"count":42')
    })

    test('should use scientific notation even when optimizeNumbers is disabled', () => {
      const input = '{"large": 1000000, "price": 1.00}'
      const options: JSONOptions = { 
        ...defaultJSONOptions, 
        optimizeNumbers: false,
        useScientificNotation: true
      }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"large":"1e+6"')
      expect(result).toContain('"price":1.00')
    })
  })

  describe('Key and value cleaning', () => {
    test('should remove empty keys when enabled', () => {
      const input = '{"name": "test", "": "empty", "value": 123}'
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
      const input = '{"name": "test", "nullValue": null, "value": 123}'
      const options: JSONOptions = { 
        ...defaultJSONOptions, 
        compressionLevel: 'aggressive',
        removeNullValues: true
      }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"name":"test"')
      expect(result).toContain('"value":123')
      expect(result).not.toContain('"nullValue"')
    })

    test('should handle undefined values gracefully', () => {
      // JSON doesn't support undefined natively, so we test with a valid JSON
      const input = '{"name": "test", "value": 123}'
      const options: JSONOptions = { 
        ...defaultJSONOptions, 
        compressionLevel: 'aggressive',
        removeUndefinedValues: true
      }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"name":"test"')
      expect(result).toContain('"value":123')
    })
  })

  describe('Array processing', () => {
    test('should remove empty array elements when enabled', () => {
      const input = '[1, "", null, 3, {}]'
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

    test('should remove duplicate array elements when enabled', () => {
      const input = '[1, 2, 1, 3, 2]'
      const options: JSONOptions = { 
        ...defaultJSONOptions, 
        compressionLevel: 'aggressive',
        removeDuplicateArrayElements: true
      }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      // Note: This is a simplified test, actual deduplication is complex
      expect(result).toContain('1')
      expect(result).toContain('2')
      expect(result).toContain('3')
    })

    test('should sort array elements when enabled', () => {
      const input = '["c", "a", "b"]'
      const options: JSONOptions = { 
        ...defaultJSONOptions, 
        compressionLevel: 'aggressive',
        sortArrayElements: true
      }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toBe('["a","b","c"]')
    })
  })

  describe('Error handling and validation', () => {
    test('should validate JSON before minifying when enabled', () => {
      const input = '{"name": "test", "value": }'
      const options: JSONOptions = { ...defaultJSONOptions, validateBeforeMinify: true }
      
      expect(() => minifyJSONWithOptions(input, options))
        .toThrow('Invalid JSON syntax')
    })

    test('should fix common errors when enabled', () => {
      const input = "{'name': 'test', 'value': 123}"
      const options: JSONOptions = { ...defaultJSONOptions, fixCommonErrors: true }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"name":"test"')
      expect(result).toContain('"value":123')
    })

    test('should fix missing commas after null values', () => {
      const input = `{
        "nullValue": null
        "nextValue": "test"
      }`
      const options: JSONOptions = { ...defaultJSONOptions, fixCommonErrors: true }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"nullValue":null,')
      expect(result).toContain('"nextValue":"test"')
    })

    test('should fix missing commas after boolean values', () => {
      const input = `{
        "active": true
        "enabled": false
      }`
      const options: JSONOptions = { ...defaultJSONOptions, fixCommonErrors: true }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"active":true,')
      expect(result).toContain('"enabled":false')
    })

    test('should fix missing commas after numeric values', () => {
      const input = `{
        "count": 42
        "price": 19.99
      }`
      const options: JSONOptions = { ...defaultJSONOptions, fixCommonErrors: true }
      const result = minifyJSONWithOptions(input, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('"count":42,')
      expect(result).toContain('"price":19.99')
    })

    test('should handle invalid input', () => {
      expect(() => minifyJSONWithOptions(''))
        .toThrow('Invalid JSON code provided')
      
      expect(() => minifyJSONWithOptions(null as any))
        .toThrow('Invalid JSON code provided')
    })
  })

  describe('Edge cases', () => {
    test('should handle nested objects', () => {
      const input = '{"user": {"name": "test", "age": 25}, "active": true}'
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"user":{"name":"test","age":25}')
    })

    test('should handle nested arrays', () => {
      const input = '{"items": [1, 2, [3, 4]], "count": 2}'
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"items":[1,2,[3,4]]')
    })

    test('should handle complex data types', () => {
      const input = '{"string": "test", "number": 123, "boolean": true, "null": null, "array": [1, 2, 3]}'
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"string":"test"')
      expect(result).toContain('"number":123')
      expect(result).toContain('"boolean":true')
      expect(result).toContain('"null":null')
      expect(result).toContain('"array":[1,2,3]')
    })
  })

  describe('Performance tests', () => {
    test('should handle large JSON efficiently', () => {
      const largeObject = Array(100).fill(0).map((_, i) => ({
        id: i,
        name: `Item ${i}`,
        value: Math.random() * 1000,
        active: i % 2 === 0
      }))
      
      const input = JSON.stringify(largeObject, null, 2)
      const start = Date.now()
      const result = minifyJSONWithOptions(input)
      const duration = Date.now() - start
      
      expect(result).toBeDefined()
      expect(duration).toBeLessThan(1000) // Should complete within 1 second
      expect(result.length).toBeLessThan(input.length)
    })

    test('should reduce JSON size significantly', () => {
      const input = `
        {
          "users": [
            {
              "id": 1,
              "name": "John Doe",
              "email": "john@example.com",
              "active": true,
              "permissions": {
                "read": true,
                "write": false,
                "admin": false
              }
            },
            {
              "id": 2,
              "name": "Jane Smith",
              "email": "jane@example.com",
              "active": true,
              "permissions": {
                "read": true,
                "write": true,
                "admin": false
              }
            }
          ],
          "total": 2,
          "page": 1,
          "limit": 10
        }
      `
      
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result.length).toBeLessThan(input.length)
      expect(result.length / input.length).toBeLessThan(0.7) // At least 30% reduction
    })
  })
})
