import { serializePHP, unserializePHP } from '../php-serializer'

describe('PHP Serialization', () => {
  describe('Serialization', () => {
    test('should serialize simple objects', () => {
      const input = { name: 'test', value: 123 }
      const result = serializePHP(input)
      
      expect(result).toBeDefined()
      expect(typeof result).toBe('string')
      expect(result).toContain('a:2:')
    })

    test('should serialize arrays', () => {
      const input = [1, 2, 3, 'test']
      const result = serializePHP(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('a:4:')
    })

    test('should serialize nested structures', () => {
      const input = {
        user: {
          name: 'John',
          age: 30,
          hobbies: ['reading', 'coding']
        }
      }
      const result = serializePHP(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('a:1:')
    })

    test('should handle empty objects', () => {
      const input = {}
      const result = serializePHP(input)
      
      expect(result).toBeDefined()
      expect(result).toBe('a:0:{}')
    })

    test('should handle empty arrays', () => {
      const input: any[] = []
      const result = serializePHP(input)
      
      expect(result).toBeDefined()
      expect(result).toBe('a:0:{}')
    })
  })

  describe('Unserialization', () => {
    test('should unserialize simple objects', () => {
      const input = 'a:2:{s:4:"name";s:4:"test";s:5:"value";i:123;}'
      const result = unserializePHP(input)
      
      expect(result).toBeDefined()
      expect(result).toEqual({ name: 'test', value: 123 })
    })

    test('should unserialize arrays', () => {
      const input = 'a:4:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;s:4:"test";}'
      const result = unserializePHP(input)
      
      expect(result).toBeDefined()
      expect(Array.isArray(result)).toBe(true)
      expect(result).toEqual([1, 2, 3, 'test'])
    })

    test('should unserialize nested structures', () => {
      const input = 'a:1:{s:4:"user";a:3:{s:4:"name";s:4:"John";s:3:"age";i:30;s:7:"hobbies";a:2:{i:0;s:7:"reading";i:1;s:6:"coding";}}}'
      const result = unserializePHP(input)
      
      expect(result).toBeDefined()
      expect(result).toEqual({
        user: {
          name: 'John',
          age: 30,
          hobbies: ['reading', 'coding']
        }
      })
    })

    test('should handle empty serialized data', () => {
      const input = 'a:0:{}'
      const result = unserializePHP(input)
      
      expect(result).toBeDefined()
      expect(Array.isArray(result)).toBe(true)
      expect(result).toEqual([])
    })
  })

  describe('Round-trip serialization', () => {
    test('should maintain data integrity through serialize/unserialize cycle', () => {
      const original = {
        name: 'test',
        value: 123,
        active: true,
        items: [1, 2, 3],
        nested: {
          key: 'value',
          number: 42
        }
      }
      
      const serialized = serializePHP(original)
      const unserialized = unserializePHP(serialized)
      
      expect(unserialized).toEqual(original)
    })

    test('should handle complex nested structures', () => {
      const original = {
        users: [
          { id: 1, name: 'John', roles: ['admin', 'user'] },
          { id: 2, name: 'Jane', roles: ['user'] }
        ],
        settings: {
          theme: 'dark',
          notifications: true,
          preferences: {
            language: 'en',
            timezone: 'UTC'
          }
        }
      }
      
      const serialized = serializePHP(original)
      const unserialized = unserializePHP(serialized)
      
      expect(unserialized).toEqual(original)
    })
  })

  describe('Error handling', () => {
    test('should handle invalid serialized data', () => {
      const input = 'invalid serialized data'
      
      expect(() => unserializePHP(input)).toThrow()
    })

    test('should handle malformed serialized data', () => {
      const input = 'a:2:{s:4:"name";s:4:"test";s:5:"value";'
      
      expect(() => unserializePHP(input)).toThrow()
    })

    test('should handle empty string', () => {
      const input = ''
      
      expect(() => unserializePHP(input)).toThrow()
    })
  })

  describe('Data types', () => {
    test('should handle different data types correctly', () => {
      const input = {
        string: 'hello',
        number: 42,
        float: 3.14,
        boolean: true,
        nullValue: null,
        array: [1, 2, 3],
        object: { nested: true }
      }
      
      const serialized = serializePHP(input)
      const unserialized = unserializePHP(serialized)
      
      expect(unserialized).toEqual(input)
    })

    test('should handle special characters in strings', () => {
      const input = {
        message: 'Hello world!',
        path: 'C:/Users/test',
        unicode: 'cafe'
      }
      
      const serialized = serializePHP(input)
      const unserialized = unserializePHP(serialized)
      
      expect(unserialized).toEqual(input)
    })
  })

  describe('Edge cases', () => {
    test('should handle very large numbers', () => {
      const input = {
        largeNumber: 12345678901234567890,
        decimal: 3.14159265359
      }
      
      const serialized = serializePHP(input)
      const unserialized = unserializePHP(serialized)
      
      expect(unserialized).toEqual(input)
    })

    test('should handle empty strings and null values', () => {
      const input = {
        emptyString: '',
        nullValue: null,
        zero: 0,
        falseValue: false
      }
      
      const serialized = serializePHP(input)
      const unserialized = unserializePHP(serialized)
      
      expect(unserialized).toEqual(input)
    })

    test('should handle deeply nested structures', () => {
      const input = {
        level1: {
          level2: {
            level3: {
              level4: {
                level5: 'deep value'
              }
            }
          }
        }
      }
      
      const serialized = serializePHP(input)
      const unserialized = unserializePHP(serialized)
      
      expect(unserialized).toEqual(input)
    })
  })

  describe('Performance', () => {
    test('should handle large data structures efficiently', () => {
      const largeObject = Array(1000).fill(0).map((_, i) => ({
        id: i,
        name: `Item ${i}`,
        value: Math.random()
      }))
      
      const start = Date.now()
      const serialized = serializePHP(largeObject)
      const unserialized = unserializePHP(serialized)
      const duration = Date.now() - start
      
      expect(unserialized).toEqual(largeObject)
      expect(duration).toBeLessThan(2000) // Should complete within 2 seconds
    })
  })
})
