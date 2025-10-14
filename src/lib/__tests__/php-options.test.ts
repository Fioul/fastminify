import { serializePHPWithOptions, unserializePHPWithOptions, defaultPHPOptions, type PHPOptions } from '../php-options'

describe('PHP Options', () => {
  describe('Basic serialization', () => {
    test('should serialize with default options', () => {
      const data = {
        name: 'test',
        value: 123,
        active: true
      }
      const result = serializePHPWithOptions(data)
      
      expect(result).toBeDefined()
      expect(typeof result).toBe('string')
      expect(result).toContain('a:3:')
    })

    test('should handle simple data types', () => {
      const data = {
        string: 'hello',
        number: 42,
        boolean: true,
        null: null
      }
      const result = serializePHPWithOptions(data)
      
      expect(result).toBeDefined()
      expect(result).toContain('s:5:"hello"')
      expect(result).toContain('i:42')
      expect(result).toContain('b:1')
      expect(result).toContain('N')
    })

    test('should handle arrays', () => {
      const data = [1, 2, 3, 'test']
      const result = serializePHPWithOptions(data)
      
      expect(result).toBeDefined()
      expect(result).toContain('a:4:')
      expect(result).toContain('i:1')
      expect(result).toContain('i:2')
      expect(result).toContain('i:3')
      expect(result).toContain('s:4:"test"')
    })
  })

  describe('Serialization levels', () => {
    test('should handle basic serialization', () => {
      const data = {
        name: 'test',
        value: 123,
        nested: { inner: 'value' }
      }
      const options: PHPOptions = { ...defaultPHPOptions, serializationLevel: 'basic' }
      const result = serializePHPWithOptions(data, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('s:4:"name"')
      expect(result).toContain('i:123')
      // Nested objects should be handled by basic level
    })

    test('should handle deep serialization', () => {
      const data = {
        level1: {
          level2: {
            level3: {
              value: 'deep'
            }
          }
        }
      }
      const options: PHPOptions = { ...defaultPHPOptions, serializationLevel: 'deep' }
      const result = serializePHPWithOptions(data, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('a:1:')
      expect(result).toContain('s:6:"level1"')
    })

    test('should handle custom serialization', () => {
      const data = { name: 'test', value: 123 }
      const options: PHPOptions = { ...defaultPHPOptions, serializationLevel: 'custom' }
      const result = serializePHPWithOptions(data, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('a:2:')
    })
  })

  describe('Type handling', () => {
    test('should preserve types when enabled', () => {
      const data = {
        string: 'hello',
        number: 42,
        float: 3.14,
        boolean: true
      }
      const options: PHPOptions = { ...defaultPHPOptions, preserveTypes: true }
      const result = serializePHPWithOptions(data, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('s:5:"hello"')
      expect(result).toContain('i:42')
      expect(result).toContain('d:3.14')
      expect(result).toContain('b:1')
    })

    test('should normalize types when enabled', () => {
      const data = {
        string: 'hello',
        number: 42,
        float: 3.14,
        boolean: true
      }
      const options: PHPOptions = { ...defaultPHPOptions, normalizeTypes: true }
      const result = serializePHPWithOptions(data, options)
      
      expect(result).toBeDefined()
      // All values should be converted to strings
      expect(result).toContain('s:5:"hello"')
      expect(result).toContain('s:2:"42"')
      expect(result).toContain('s:4:"3.14"')
      expect(result).toContain('s:4:"true"')
    })

    test('should optimize types when enabled', () => {
      const data = {
        int: 42,
        float: 3.14,
        string: '123'
      }
      const options: PHPOptions = { ...defaultPHPOptions, optimizeTypes: true }
      const result = serializePHPWithOptions(data, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('i:42')
      expect(result).toContain('d:3.14')
      expect(result).toContain('s:3:"123"')
    })
  })

  describe('Value filtering', () => {
    test('should include null values when enabled', () => {
      const data = {
        name: 'test',
        value: null,
        active: true
      }
      const options: PHPOptions = { ...defaultPHPOptions, includeNullValues: true }
      const result = serializePHPWithOptions(data, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('s:4:"name"')
      expect(result).toContain('N')
      expect(result).toContain('s:6:"active"')
    })

    test('should exclude null values when disabled', () => {
      const data = {
        name: 'test',
        value: null,
        active: true
      }
      const options: PHPOptions = { ...defaultPHPOptions, includeNullValues: false }
      const result = serializePHPWithOptions(data, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('s:4:"name"')
      expect(result).not.toContain('s:5:"value"')
      expect(result).toContain('s:6:"active"')
    })

    test('should include empty values when enabled', () => {
      const data = {
        name: 'test',
        empty: '',
        array: [],
        active: true
      }
      const options: PHPOptions = { ...defaultPHPOptions, includeEmptyValues: true }
      const result = serializePHPWithOptions(data, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('s:4:"name"')
      expect(result).toContain('s:0:""')
      expect(result).toContain('a:0:{}')
      expect(result).toContain('s:6:"active"')
    })

    test('should exclude empty values when disabled', () => {
      const data = {
        name: 'test',
        empty: '',
        array: [],
        active: true
      }
      const options: PHPOptions = { ...defaultPHPOptions, includeEmptyValues: false }
      const result = serializePHPWithOptions(data, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('s:4:"name"')
      expect(result).not.toContain('s:5:"empty"')
      expect(result).not.toContain('s:5:"array"')
      expect(result).toContain('s:6:"active"')
    })

    test('should convert undefined to null when enabled', () => {
      const data = {
        name: 'test',
        value: undefined,
        active: true
      }
      const options: PHPOptions = { ...defaultPHPOptions, convertUndefinedToNull: true }
      const result = serializePHPWithOptions(data, options)
      
      expect(result).toBeDefined()
      expect(result).toContain('s:4:"name"')
      expect(result).toContain('N')
      expect(result).toContain('s:6:"active"')
    })
  })

  describe('Compression levels', () => {
    test('should apply no compression', () => {
      const data = { name: 'test', value: 123 }
      const options: PHPOptions = { ...defaultPHPOptions, compression: 'none' }
      const result = serializePHPWithOptions(data, options)
      
      expect(result).toBeDefined()
      expect(typeof result).toBe('string')
    })

    test('should apply minimal compression', () => {
      const data = { name: 'test', value: 123 }
      const options: PHPOptions = { ...defaultPHPOptions, compression: 'minimal' }
      const result = serializePHPWithOptions(data, options)
      
      expect(result).toBeDefined()
      expect(result.length).toBeLessThanOrEqual(JSON.stringify(data).length * 2)
    })

    test('should apply aggressive compression', () => {
      const data = { name: 'test', value: 123 }
      const options: PHPOptions = { ...defaultPHPOptions, compression: 'aggressive' }
      const result = serializePHPWithOptions(data, options)
      
      expect(result).toBeDefined()
      expect(result).not.toContain(' ')
    })
  })

  describe('Readable formatting', () => {
    test('should format output when readable is enabled', () => {
      const data = { name: 'test', value: 123 }
      const options: PHPOptions = { ...defaultPHPOptions, readable: true }
      const result = serializePHPWithOptions(data, options)
      
      expect(result).toBeDefined()
      expect(result).toContain(': ')
      expect(result).toContain('; ')
    })

    test('should not format output when readable is disabled', () => {
      const data = { name: 'test', value: 123 }
      const options: PHPOptions = { ...defaultPHPOptions, readable: false }
      const result = serializePHPWithOptions(data, options)
      
      expect(result).toBeDefined()
      expect(result).not.toContain(': ')
    })
  })

  describe('Validation and error handling', () => {
    test('should validate data when enabled', () => {
      const data = { name: 'test', func: () => {} }
      const options: PHPOptions = { ...defaultPHPOptions, validateBeforeSerialize: true, strictMode: true }
      
      expect(() => serializePHPWithOptions(data, options))
        .toThrow('Functions cannot be serialized')
    })

    test('should fix common errors when enabled', () => {
      const data = { name: 'test', value: 123 }
      const options: PHPOptions = { ...defaultPHPOptions, fixCommonErrors: true }
      const result = serializePHPWithOptions(data, options)
      
      expect(result).toBeDefined()
      expect(typeof result).toBe('string')
    })

    test('should handle invalid input gracefully', () => {
      expect(() => serializePHPWithOptions(''))
        .toThrow('Invalid serialized data provided')
      
      expect(() => serializePHPWithOptions(null as any))
        .toThrow('Invalid serialized data provided')
    })
  })

  describe('Unserialization', () => {
    test('should unserialize with default options', () => {
      const data = { name: 'test', value: 123 }
      const serialized = serializePHPWithOptions(data)
      const result = unserializePHPWithOptions(serialized)
      
      expect(result).toBeDefined()
      expect(result).toEqual(data)
    })

    test('should handle type normalization during unserialization', () => {
      const data = { name: 'test', value: 123 }
      const serialized = serializePHPWithOptions(data, { ...defaultPHPOptions, normalizeTypes: true })
      const result = unserializePHPWithOptions(serialized, { ...defaultPHPOptions, normalizeTypes: true })
      
      expect(result).toBeDefined()
      expect(typeof result.name).toBe('string')
      expect(typeof result.value).toBe('string')
    })
  })

  describe('Edge cases', () => {
    test('should handle nested objects', () => {
      const data = {
        user: {
          profile: {
            name: 'John',
            age: 30
          },
          settings: {
            theme: 'dark',
            notifications: true
          }
        }
      }
      const result = serializePHPWithOptions(data)
      
      expect(result).toBeDefined()
      expect(result).toContain('a:1:')
      expect(result).toContain('s:4:"user"')
    })

    test('should handle arrays of objects', () => {
      const data = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' }
      ]
      const result = serializePHPWithOptions(data)
      
      expect(result).toBeDefined()
      expect(result).toContain('a:2:')
      expect(result).toContain('s:2:"id"')
      expect(result).toContain('s:4:"name"')
    })

    test('should handle mixed data types', () => {
      const data = {
        string: 'hello',
        number: 42,
        boolean: true,
        null: null,
        array: [1, 2, 3],
        object: { nested: 'value' }
      }
      const result = serializePHPWithOptions(data)
      
      expect(result).toBeDefined()
      expect(result).toContain('s:6:"string"')
      expect(result).toContain('s:6:"number"')
      expect(result).toContain('s:7:"boolean"')
      expect(result).toContain('s:4:"null"')
      expect(result).toContain('s:5:"array"')
      expect(result).toContain('s:6:"object"')
    })
  })

  describe('Performance tests', () => {
    test('should handle large data efficiently', () => {
      const largeData = Array(100).fill(0).map((_, i) => ({
        id: i,
        name: `Item ${i}`,
        value: Math.random() * 1000,
        active: i % 2 === 0
      }))
      
      const start = Date.now()
      const result = serializePHPWithOptions(largeData)
      const duration = Date.now() - start
      
      expect(result).toBeDefined()
      expect(duration).toBeLessThan(1000) // Should complete within 1 second
    })

    test('should reduce data size with compression', () => {
      const data = {
        name: 'test',
        description: 'This is a long description that should be compressed',
        value: 123,
        active: true,
        metadata: {
          created: '2024-01-15T10:30:00Z',
          updated: '2024-01-15T11:45:00Z'
        }
      }
      
      const uncompressed = serializePHPWithOptions(data, { ...defaultPHPOptions, compression: 'none' })
      const compressed = serializePHPWithOptions(data, { ...defaultPHPOptions, compression: 'aggressive' })
      
      expect(compressed.length).toBeLessThan(uncompressed.length)
    })
  })
})
