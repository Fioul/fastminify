'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { minifyJavaScript } from '@/lib/javascript-options'
import { minifyCSSWithOptions } from '@/lib/css-options'
import { minifyJSONWithOptions } from '@/lib/json-options'
import { serializePHPWithOptions, unserializePHPWithOptions } from '@/lib/php-options'
import { unminifyJS, unminifyCSS, unminifyJSON } from '@/lib/unminify'
import { detectCodeLanguage } from '@/lib/detect-language'
import { 
  LanguageType, 
  OperationType, 
  Stats, 
  JavaScriptOptions, 
  CSSOptions, 
  JSONOptions, 
  PHPOptions 
} from '@/lib/types'

export function useMinification() {
  const [leftCode, setLeftCode] = useState('')
  const [rightCode, setRightCode] = useState('')
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [leftType, setLeftType] = useState<LanguageType>('js')
  const [rightType, setRightType] = useState<LanguageType>('js')
  const [autoDetectLeft, setAutoDetectLeft] = useState(true)
  const [autoDetectRight, setAutoDetectRight] = useState(true)
  const [lastOperation, setLastOperation] = useState<OperationType>(null)
  const [leftModalOpen, setLeftModalOpen] = useState(false)
  const [rightModalOpen, setRightModalOpen] = useState(false)


  // Options configuration
  const [jsOptions, setJsOptions] = useState<JavaScriptOptions>({
    ecmaVersion: 'es2022',
    compressionLevel: 'normal',
    browserSupport: 'modern',
    preserveClassNames: false,
    preserveFunctionNames: false,
    removeConsole: false
  })
  
  const [cssOptions, setCssOptions] = useState<CSSOptions>({
    compressionLevel: 'normal',
    browserSupport: 'modern',
    removeComments: true,
    convertColors: true,
    mergeRules: true,
    minifySelectors: true
  })
  
  const [jsonOptions, setJsonOptions] = useState<JSONOptions>({
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
    validateBeforeMinify: true,
    fixCommonErrors: true
  })
  
  const [phpOptions, setPhpOptions] = useState<PHPOptions>({
    serializationLevel: 'deep',
    compression: 'minimal',
    preserveTypes: true,
    includeNullValues: true,
    readable: false,
    strictMode: false
  })

  // Process code from left to right (minify)
  const processMinify = async () => {
    const sourceCode = leftCode.trim()
    if (!sourceCode) {
      toast.error('Please paste some code in the left editor first.')
      return
    }

    setIsLoading(true)

    try {
      let processed = ''
      const type = leftType

      if (type === 'js') {
        processed = await minifyJavaScript(sourceCode, jsOptions)
      } else if (type === 'css') {
        processed = await minifyCSSWithOptions(sourceCode, cssOptions)
      } else if (type === 'json') {
        processed = minifyJSONWithOptions(sourceCode, jsonOptions)
      } else if (type === 'php') {
        // For serialization, we need to parse JSON/JS first
        try {
          const parsed = JSON.parse(sourceCode)
          processed = serializePHPWithOptions(parsed, phpOptions)
        } catch {
          throw new Error('Invalid JSON/JavaScript object for PHP serialization')
        }
      }

      setRightCode(processed)
      setRightType(type) // Same type as input
      setStats({
        original: sourceCode.length,
        result: processed.length,
      })
      setLastOperation('minify')

      toast.success('Code minified successfully!')
    } catch (error) {
      console.error(error)
      
      // Specific error messages based on type and error
      let errorMessage = 'An error occurred during minification.'
      
      if (error instanceof Error) {
        if (error.message.includes('JSON')) {
          if (leftType === 'json') {
            // Messages d'erreur plus spécifiques pour JSON
            if (error.message.includes('Expected property name')) {
              errorMessage = 'Invalid JSON: Property names must be quoted. Try using double quotes around property names.'
            } else if (error.message.includes('Unexpected token')) {
              errorMessage = 'Invalid JSON: Unexpected character found. Check for missing commas, quotes, or brackets.'
            } else if (error.message.includes('Expected double-quoted property name')) {
              errorMessage = 'Invalid JSON: Property names must use double quotes, not single quotes.'
            } else if (error.message.includes('Expected \',\' or \'}\'')) {
              errorMessage = 'Invalid JSON: Missing comma or closing brace. Check your object structure.'
            } else {
              errorMessage = 'Invalid JSON syntax. Please check your JSON code and ensure it\'s properly formatted.'
            }
          } else {
            if (leftType === 'php') {
              errorMessage = 'Invalid data format. Please provide valid JSON data for PHP serialization.'
            } else {
              errorMessage = `Invalid ${leftType.toUpperCase()} code. Please ensure the code matches the selected type.`
            }
          }
        } else if (error.message.includes('CSS')) {
          errorMessage = 'Invalid CSS syntax. Please check your CSS code.'
        } else if (error.message.includes('JavaScript') || error.message.includes('JS')) {
          errorMessage = 'Invalid JavaScript syntax. Please check your JavaScript code.'
        } else if (error.message.includes('PHP')) {
          errorMessage = 'Invalid data for PHP serialization. Please provide valid JSON data, not PHP code.'
        } else {
          errorMessage = `Minification failed: ${error.message}`
        }
      }
      
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Process code from right to left (unminify)
  const processUnminify = async () => {
    const sourceCode = rightCode.trim()
    if (!sourceCode) {
      toast.error('Please paste some code in the right editor first.')
      return
    }

    setIsLoading(true)

    try {
      let processed = ''
      const type = rightType

      if (type === 'js') {
        processed = unminifyJS(sourceCode)
      } else if (type === 'css') {
        processed = unminifyCSS(sourceCode)
      } else if (type === 'json') {
        processed = unminifyJSON(sourceCode)
      } else if (type === 'php') {
        const parsed = unserializePHPWithOptions(sourceCode, phpOptions)
        processed = JSON.stringify(parsed, null, 2)
      }

      setLeftCode(processed)
      setLeftType(type) // Same type as input
      setStats({
        original: sourceCode.length,
        result: processed.length,
      })
      setLastOperation('unminify')

      toast.success('Code unminified successfully!')
    } catch (error) {
      console.error(error)
      
      // Specific error messages based on type and error
      let errorMessage = 'An error occurred during unminification.'
      
      if (error instanceof Error) {
        if (error.message.includes('JSON')) {
          if (rightType === 'json') {
            errorMessage = 'Invalid JSON syntax. Please check your JSON code.'
          } else {
            if (rightType === 'php') {
              errorMessage = 'Invalid data format. Please provide valid JSON data for PHP serialization.'
            } else {
              errorMessage = `Invalid ${rightType.toUpperCase()} code. Please ensure the code matches the selected type.`
            }
          }
        } else if (error.message.includes('CSS')) {
          errorMessage = 'Invalid CSS syntax. Please check your CSS code.'
        } else if (error.message.includes('JavaScript') || error.message.includes('JS')) {
          errorMessage = 'Invalid JavaScript syntax. Please check your JavaScript code.'
        } else if (error.message.includes('PHP')) {
          errorMessage = 'Invalid PHP serialized data. Please provide valid PHP serialized string for unserialization.'
        } else {
          errorMessage = `Unminification failed: ${error.message}`
        }
      }
      
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle left code changes with optional auto-detection
  const handleLeftCodeChange = (value: string | undefined) => {
    const code = value || ''
    setLeftCode(code)
    
    // Auto-detect language if enabled and code is not empty
    // But don't override if user has manually selected PHP Serialize
    if (autoDetectLeft && code.trim() && leftType !== 'php') {
      const detectedLanguage = detectCodeLanguage(code)
      if (detectedLanguage !== leftType) {
        setLeftType(detectedLanguage)
        const languageNames = {
          'js': 'JavaScript',
          'css': 'CSS',
          'json': 'JSON',
          'php': 'PHP Serialize'
        }
        toast.success(`Left language auto-detected: ${languageNames[detectedLanguage]}`)
      }
    }
  }

  // Handle right code changes with optional auto-detection
  const handleRightCodeChange = (value: string | undefined) => {
    const code = value || ''
    setRightCode(code)
    
    // Auto-detect language if enabled and code is not empty
    // But don't override if user has manually selected PHP Serialize
    if (autoDetectRight && code.trim() && rightType !== 'php') {
      const detectedLanguage = detectCodeLanguage(code)
      if (detectedLanguage !== rightType) {
        setRightType(detectedLanguage)
        const languageNames = {
          'js': 'JavaScript',
          'css': 'CSS',
          'json': 'JSON',
          'php': 'PHP Serialize'
        }
        toast.success(`Right language auto-detected: ${languageNames[detectedLanguage]}`)
      }
    }
  }

  // Fallback copy method for older browsers
  const fallbackCopy = (text: string) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    try {
      document.execCommand('copy')
      toast.success('Copied to clipboard!')
    } catch {
      toast.error('Unable to copy.')
    }
    document.body.removeChild(textarea)
  }

  // Copy right code to clipboard with fallback
  const handleCopy = async () => {
    if (!rightCode) return
    if (navigator?.clipboard) {
      try {
        await navigator.clipboard.writeText(rightCode)
        toast.success('Copied to clipboard!')
      } catch {
        fallbackCopy(rightCode)
      }
    } else {
      fallbackCopy(rightCode)
    }
  }

  // Clear both editors
  const handleClear = () => {
    setLeftCode('')
    setRightCode('')
    setStats(null)
    setLastOperation(null)
    toast.success('Editors cleared!')
  }

  // Clear left editor only
  const handleClearLeft = () => {
    setLeftCode('')
    if (lastOperation === 'unminify') {
      setStats(null)
      setLastOperation(null)
    }
    toast.success('Left editor cleared!')
  }

  // Clear right editor only
  const handleClearRight = () => {
    setRightCode('')
    if (lastOperation === 'minify') {
      setStats(null)
      setLastOperation(null)
    }
    toast.success('Right editor cleared!')
  }

  // Download right code as file
  const handleDownload = () => {
    if (!rightCode) return
    
    const extensions = {
      'js': 'min.js',
      'css': 'min.css', 
      'json': 'json',
      'php': 'php'
    }
    
    const timestamp = Math.floor(Date.now() / 1000)
    const blob = new Blob([rightCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `fastminify-minified-${timestamp}.${extensions[rightType]}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('File downloaded!')
  }

  // Copy left code
  const handleLeftCopy = () => {
    if (!leftCode) return
    
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(leftCode).then(() => {
        toast.success('Left code copied!')
      }).catch(() => {
        fallbackCopy(leftCode)
      })
    } else {
      fallbackCopy(leftCode)
    }
  }

  // Download left code as file
  const handleLeftDownload = () => {
    if (!leftCode) return
    
    const extensions = {
      'js': 'js',
      'css': 'css', 
      'json': 'json',
      'php': 'php'
    }
    
    const timestamp = Math.floor(Date.now() / 1000)
    const blob = new Blob([leftCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `fastminify-normal-${timestamp}.${extensions[leftType]}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('File downloaded!')
  }

  // Copy right code
  const handleRightCopy = () => {
    if (!rightCode) return
    
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(rightCode).then(() => {
        toast.success('Right code copied!')
      }).catch(() => {
        fallbackCopy(rightCode)
      })
    } else {
      fallbackCopy(rightCode)
    }
  }

  // Download right code as file
  const handleRightDownload = () => {
    if (!rightCode) return
    
    const extensions = {
      'js': 'min.js',
      'css': 'min.css', 
      'json': 'json',
      'php': 'php'
    }
    
    const timestamp = Math.floor(Date.now() / 1000)
    const blob = new Blob([rightCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `fastminify-minified-${timestamp}.${extensions[rightType]}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('File downloaded!')
  }

  // Modal handlers
  const handleLeftModalOpen = () => {
    setLeftModalOpen(true)
  }

  const handleLeftModalClose = () => {
    setLeftModalOpen(false)
  }

  const handleRightModalOpen = () => {
    setRightModalOpen(true)
  }

  const handleRightModalClose = () => {
    setRightModalOpen(false)
  }

  return {
    // State
    leftCode,
    rightCode,
    stats,
    isLoading,
    leftType,
    rightType,
    autoDetectLeft,
    autoDetectRight,
    lastOperation,
    leftModalOpen,
    rightModalOpen,
    jsOptions,
    cssOptions,
    jsonOptions,
    phpOptions,
    
    // Setters
    setLeftType,
    setRightType,
    setAutoDetectLeft,
    setAutoDetectRight,
    setJsOptions,
    setCssOptions,
    setJsonOptions,
    setPhpOptions,
    
    // Actions
    processMinify,
    processUnminify,
    handleLeftCodeChange,
    handleRightCodeChange,
    handleCopy,
    handleClear,
    handleClearLeft,
    handleClearRight,
    handleDownload,
    handleLeftCopy,
    handleLeftDownload,
    handleRightCopy,
    handleRightDownload,
    handleLeftModalOpen,
    handleLeftModalClose,
    handleRightModalOpen,
    handleRightModalClose,
  }
}
