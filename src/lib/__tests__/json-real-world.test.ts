import { minifyJSONWithOptions, defaultJSONOptions, type JSONOptions } from '../json-options'

describe('JSON Real-World Use Cases', () => {
  describe('API Response Minification', () => {
    test('should minify typical API response', () => {
      const apiResponse = {
        status: "success",
        data: {
          users: [
            { id: 1, name: "John Doe", email: "john@example.com", active: true },
            { id: 2, name: "Jane Smith", email: "jane@example.com", active: false }
          ],
          pagination: {
            page: 1,
            limit: 10,
            total: 2,
            hasNext: false
          }
        },
        timestamp: "2024-01-15T10:30:00Z"
      }
      
      const input = JSON.stringify(apiResponse, null, 2)
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result.length).toBeLessThan(input.length)
      expect(result).toContain('"status":"success"')
      expect(result).toContain('"users":[{"id":1,"name":"John Doe"')
    })

    test('should handle API error responses', () => {
      const errorResponse = {
        status: "error",
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid input data",
          details: {
            field: "email",
            reason: "Invalid email format"
          }
        },
        timestamp: "2024-01-15T10:30:00Z"
      }
      
      const input = JSON.stringify(errorResponse, null, 2)
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"status":"error"')
      expect(result).toContain('"code":"VALIDATION_ERROR"')
    })
  })

  describe('Configuration Files', () => {
    test('should minify app configuration', () => {
      const config = {
        app: {
          name: "FastMinify",
          version: "1.0.0",
          environment: "production"
        },
        database: {
          host: "localhost",
          port: 5432,
          name: "fastminify",
          ssl: true
        },
        features: {
          minification: true,
          beautification: true,
          validation: true
        }
      }
      
      const input = JSON.stringify(config, null, 2)
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"app":{"name":"FastMinify"')
      expect(result).toContain('"database":{"host":"localhost"')
    })

    test('should handle package.json style files', () => {
      const packageJson = {
        name: "fastminify",
        version: "1.0.0",
        description: "A fast code minifier",
        main: "index.js",
        scripts: {
          start: "node index.js",
          test: "jest",
          build: "webpack"
        },
        dependencies: {
          "express": "^4.18.0",
          "cors": "^2.8.5"
        },
        devDependencies: {
          "jest": "^29.0.0",
          "typescript": "^4.9.0"
        }
      }
      
      const input = JSON.stringify(packageJson, null, 2)
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"name":"fastminify"')
      expect(result).toContain('"scripts":{"start":"node index.js"')
    })
  })

  describe('Data Export/Import', () => {
    test('should minify user data export', () => {
      const userData = {
        profile: {
          id: 12345,
          username: "johndoe",
          email: "john@example.com",
          firstName: "John",
          lastName: "Doe",
          avatar: "https://example.com/avatar.jpg",
          preferences: {
            theme: "dark",
            language: "en",
            notifications: true
          }
        },
        posts: [
          {
            id: 1,
            title: "My First Post",
            content: "This is my first post...",
            publishedAt: "2024-01-15T10:30:00Z",
            tags: ["blog", "first"]
          }
        ],
        settings: {
          privacy: "public",
          emailNotifications: true,
          twoFactor: false
        }
      }
      
      const input = JSON.stringify(userData, null, 2)
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"profile":{"id":12345')
      expect(result).toContain('"posts":[{"id":1')
    })

    test('should handle analytics data', () => {
      const analyticsData = {
        date: "2024-01-15",
        metrics: {
          pageViews: 1250,
          uniqueVisitors: 890,
          bounceRate: 0.35,
          avgSessionDuration: 180.5
        },
        topPages: [
          { path: "/", views: 450 },
          { path: "/about", views: 320 },
          { path: "/contact", views: 280 }
        ],
        devices: {
          desktop: 0.65,
          mobile: 0.30,
          tablet: 0.05
        }
      }
      
      const input = JSON.stringify(analyticsData, null, 2)
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"metrics":{"pageViews":1250')
      expect(result).toContain('"topPages":[{"path":"/"')
    })
  })

  describe('E-commerce Data', () => {
    test('should minify product catalog', () => {
      const productCatalog = {
        products: [
          {
            id: "prod-001",
            name: "Wireless Headphones",
            price: 99.99,
            currency: "USD",
            inStock: true,
            categories: ["electronics", "audio"],
            specifications: {
              weight: "250g",
              battery: "20h",
              connectivity: "Bluetooth 5.0"
            },
            images: [
              "https://example.com/headphones-1.jpg",
              "https://example.com/headphones-2.jpg"
            ]
          }
        ],
        filters: {
          categories: ["electronics", "clothing", "books"],
          priceRange: { min: 0, max: 1000 },
          brands: ["Sony", "Apple", "Samsung"]
        }
      }
      
      const input = JSON.stringify(productCatalog, null, 2)
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"products":[{"id":"prod-001"')
      expect(result).toContain('"price":99.99')
    })

    test('should handle shopping cart data', () => {
      const cartData = {
        sessionId: "sess_123456789",
        items: [
          {
            productId: "prod-001",
            quantity: 2,
            unitPrice: 99.99,
            totalPrice: 199.98
          },
          {
            productId: "prod-002",
            quantity: 1,
            unitPrice: 49.99,
            totalPrice: 49.99
          }
        ],
        totals: {
          subtotal: 249.97,
          tax: 24.99,
          shipping: 9.99,
          total: 284.95
        },
        currency: "USD"
      }
      
      const input = JSON.stringify(cartData, null, 2)
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"sessionId":"sess_123456789"')
      expect(result).toContain('"items":[{"productId":"prod-001"')
    })
  })

  describe('Form Data and Validation', () => {
    test('should minify form submission data', () => {
      const formData = {
        personalInfo: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "+1-555-0123"
        },
        address: {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA"
        },
        preferences: {
          newsletter: true,
          smsUpdates: false,
          marketing: true
        }
      }
      
      const input = JSON.stringify(formData, null, 2)
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"personalInfo":{"firstName":"John"')
      expect(result).toContain('"address":{"street":"123 Main St"')
    })

    test('should handle validation errors', () => {
      const validationErrors = {
        valid: false,
        errors: [
          {
            field: "email",
            message: "Invalid email format",
            code: "INVALID_EMAIL"
          },
          {
            field: "password",
            message: "Password must be at least 8 characters",
            code: "PASSWORD_TOO_SHORT"
          }
        ],
        warnings: [
          {
            field: "phone",
            message: "Phone number format could be improved",
            code: "PHONE_FORMAT_WARNING"
          }
        ]
      }
      
      const input = JSON.stringify(validationErrors, null, 2)
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"valid":false')
      expect(result).toContain('"errors":[{"field":"email"')
    })
  })

  describe('Performance Scenarios', () => {
    test('should handle large nested structures efficiently', () => {
      const largeStructure = {
        metadata: {
          version: "1.0",
          timestamp: new Date().toISOString(),
          source: "api"
        },
        data: Array(100).fill(0).map((_, i) => ({
          id: i,
          name: `Item ${i}`,
          value: Math.random() * 1000,
          nested: {
            level1: {
              level2: {
                level3: {
                  value: `nested-${i}`,
                  count: i * 2
                }
              }
            }
          }
        }))
      }
      
      const input = JSON.stringify(largeStructure, null, 2)
      const start = Date.now()
      const result = minifyJSONWithOptions(input)
      const duration = Date.now() - start
      
      expect(result).toBeDefined()
      expect(duration).toBeLessThan(1000) // Should complete within 1 second
      expect(result.length).toBeLessThan(input.length)
    })

    test('should handle repeated data patterns', () => {
      const repeatedData = {
        template: {
          id: "template-001",
          name: "Standard Template",
          fields: ["title", "content", "author", "date"]
        },
        instances: Array(50).fill(0).map((_, i) => ({
          id: `instance-${i}`,
          templateId: "template-001",
          data: {
            title: `Post ${i}`,
            content: `This is the content for post ${i}`,
            author: `Author ${i}`,
            date: new Date().toISOString()
          }
        }))
      }
      
      const input = JSON.stringify(repeatedData, null, 2)
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"template":{"id":"template-001"')
      expect(result).toContain('"instances":[{"id":"instance-0"')
    })
  })

  describe('Edge Cases and Error Scenarios', () => {
    test('should handle malformed JSON gracefully', () => {
      const malformedJson = '{"name": "test", "value": }'
      
      expect(() => minifyJSONWithOptions(malformedJson))
        .toThrow()
    })

    test('should handle empty objects and arrays', () => {
      const emptyData = {
        emptyObject: {},
        emptyArray: [],
        nullValue: null,
        undefinedValue: undefined
      }
      
      const input = JSON.stringify(emptyData, null, 2)
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"emptyObject":{}')
      expect(result).toContain('"emptyArray":[]')
      expect(result).toContain('"nullValue":null')
    })

    test('should handle special characters in strings', () => {
      const specialChars = {
        unicode: "héllo wørld 🌍",
        quotes: 'He said "Hello" and \'Goodbye\'',
        backslashes: "C:\\Users\\Test\\File.txt",
        newlines: "Line 1\nLine 2\r\nLine 3",
        tabs: "Column1\tColumn2\tColumn3"
      }
      
      const input = JSON.stringify(specialChars, null, 2)
      const result = minifyJSONWithOptions(input)
      
      expect(result).toBeDefined()
      expect(result).toContain('"unicode":"héllo wørld 🌍"')
      expect(result).toContain('"quotes":"He said \\"Hello\\" and \'Goodbye\'"')
    })
  })
})
