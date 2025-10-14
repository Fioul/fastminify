import { minifyJSON } from '../minify-json'

describe('JSON Minification', () => {
  describe('Basic minification', () => {
    test('should minify simple JSON correctly', () => {
      const input = `{
        "name": "test",
        "value": 123,
        "active": true
      }`
      const result = minifyJSON(input)
      
      expect(result).toBe('{"name":"test","value":123,"active":true}')
    })

    test('should handle empty JSON object', () => {
      const input = '{}'
      const result = minifyJSON(input)
      
      expect(result).toBe('{}')
    })

    test('should handle empty JSON array', () => {
      const input = '[]'
      const result = minifyJSON(input)
      
      expect(result).toBe('[]')
    })
  })

  describe('Complex JSON structures', () => {
    test('should minify nested objects', () => {
      const input = `{
        "user": {
          "name": "John Doe",
          "age": 30,
          "address": {
            "street": "123 Main St",
            "city": "New York"
          }
        }
      }`
      const result = minifyJSON(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"user"')
      expect(result).toContain('"name":"John Doe"')
    })

    test('should minify arrays with objects', () => {
      const input = `[
        {
          "id": 1,
          "name": "Item 1"
        },
        {
          "id": 2,
          "name": "Item 2"
        }
      ]`
      const result = minifyJSON(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"id":1')
      expect(result).toContain('"id":2')
    })

    test('should handle mixed data types', () => {
      const input = `{
        "string": "hello",
        "number": 42,
        "boolean": true,
        "null": null,
        "array": [1, 2, 3],
        "object": {"nested": true}
      }`
      const result = minifyJSON(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"string":"hello"')
      expect(result).toContain('"number":42')
      expect(result).toContain('"boolean":true')
      expect(result).toContain('"null":null')
    })
  })

  describe('Whitespace and formatting', () => {
    test('should remove all unnecessary whitespace', () => {
      const input = `{
        "name"    :    "test"   ,
        "value"   :    123
      }`
      const result = minifyJSON(input)
      
      expect(result).toBe('{"name":"test","value":123}')
    })

    test('should handle tabs and newlines', () => {
      const input = `{\n\t"name": "test",\n\t"value": 123\n}`
      const result = minifyJSON(input)
      
      expect(result).toBe('{"name":"test","value":123}')
    })
  })

  describe('Error handling', () => {
    test('should handle invalid JSON gracefully', () => {
      const input = '{ "name": "test", "value": }'
      
      expect(() => minifyJSON(input)).toThrow()
    })

    test('should handle malformed JSON', () => {
      const input = '{ "name": "test" "value": 123 }'
      
      expect(() => minifyJSON(input)).toThrow()
    })

    test('should handle empty string', () => {
      const input = ''
      
      expect(() => minifyJSON(input)).toThrow()
    })
  })

  describe('Edge cases', () => {
    test('should handle JSON with special characters', () => {
      const input = `{
        "message": "Hello \"world\"!",
        "path": "C:\\\\Users\\\\test",
        "unicode": "café"
      }`
      const result = minifyJSON(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"Hello \\"world\\"!"')
      expect(result).toContain('"C:\\\\Users\\\\test"')
      expect(result).toContain('"café"')
    })

    test('should handle very large numbers', () => {
      const input = `{
        "largeNumber": 12345678901234567890,
        "decimal": 3.14159265359
      }`
      const result = minifyJSON(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('12345678901234567890')
      expect(result).toContain('3.14159265359')
    })

    test('should handle empty strings and null values', () => {
      const input = `{
        "emptyString": "",
        "nullValue": null,
        "zero": 0,
        "falseValue": false
      }`
      const result = minifyJSON(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('""')
      expect(result).toContain('null')
      expect(result).toContain('0')
      expect(result).toContain('false')
    })
  })

  describe('Performance', () => {
    test('should handle large JSON efficiently', () => {
      const largeObject = Array(1000).fill(0).map((_, i) => 
        `"key${i}": "value${i}"`
      ).join(',')
      const input = `{${largeObject}}`
      
      const start = Date.now()
      const result = minifyJSON(input)
      const duration = Date.now() - start
      
      expect(result).toBeDefined()
      expect(duration).toBeLessThan(1000) // Should complete within 1 second
    })
  })
})
