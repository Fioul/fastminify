'use client'

import { useCallback } from 'react'
import { toast } from 'sonner'
import { minifyJavaScript } from '@/lib/javascript-options'
import { minifyCSSWithOptions } from '@/lib/css-options'
import { minifyJSONWithOptions } from '@/lib/json-options'
import { serializePHPWithOptions, unserializePHPWithOptions } from '@/lib/php-options'
import { unminifyJS, unminifyCSS, unminifyJSON } from '@/lib/unminify'
import { detectCodeLanguage } from '@/lib/detect-language'
import { beautifyCode } from '@/lib/beautify'
import { LanguageType, OperationType, Stats, JavaScriptOptions, CSSOptions, JSONOptions, PHPOptions } from '@/lib/types'

interface UseMinificationActionsProps {
  leftCode: string
  rightCode: string
  leftType: LanguageType | null
  rightType: LanguageType | null
  autoDetectLeft: boolean
  autoDetectRight: boolean
  leftTypeManuallySet: boolean
  rightTypeManuallySet: boolean
  jsOptions: JavaScriptOptions
  cssOptions: CSSOptions
  jsonOptions: JSONOptions
  phpOptions: PHPOptions
  setLeftCode: (code: string) => void
  setRightCode: (code: string) => void
  setLeftType: (type: LanguageType | null) => void
  setRightType: (type: LanguageType | null) => void
  setLeftTypeManuallySet: (set: boolean) => void
  setRightTypeManuallySet: (set: boolean) => void
  setStats: (stats: Stats | null) => void
  setLastOperation: (operation: OperationType) => void
  setIsLoading: (loading: boolean) => void
}

export function useMinificationActions({
  leftCode,
  rightCode,
  leftType,
  rightType,
  autoDetectLeft,
  autoDetectRight,
  leftTypeManuallySet,
  rightTypeManuallySet,
  jsOptions,
  cssOptions,
  jsonOptions,
  phpOptions,
  setLeftCode,
  setRightCode,
  setLeftType,
  setRightType,
  setLeftTypeManuallySet,
  setRightTypeManuallySet,
  setStats,
  setLastOperation,
  setIsLoading,
}: UseMinificationActionsProps) {

  const handleLeftCodeChange = useCallback((value: string | undefined) => {
    setLeftCode(value || '')
  }, [setLeftCode])

  const handleRightCodeChange = useCallback((value: string | undefined) => {
    setRightCode(value || '')
  }, [setRightCode])

  const handleLeftTypeChange = useCallback((type: LanguageType) => {
    setLeftType(type)
    setLeftTypeManuallySet(true)
  }, [setLeftType, setLeftTypeManuallySet])

  const handleRightTypeChange = useCallback((type: LanguageType) => {
    setRightType(type)
    setRightTypeManuallySet(true)
  }, [setRightType, setRightTypeManuallySet])

  const handleCopy = useCallback(() => {
    if (rightCode) {
      navigator.clipboard.writeText(rightCode)
      toast.success('Code copied to clipboard!')
    }
  }, [rightCode])

  const handleClear = useCallback(() => {
    setLeftCode('')
    setRightCode('')
    setStats(null)
    setLastOperation(null)
    toast.success('All code cleared!')
  }, [setLeftCode, setRightCode, setStats, setLastOperation])

  const handleClearLeft = useCallback(() => {
    setLeftCode('')
    toast.success('Left code cleared!')
  }, [setLeftCode])

  const handleClearRight = useCallback(() => {
    setRightCode('')
    setStats(null)
    setLastOperation(null)
    toast.success('Right code cleared!')
  }, [setRightCode, setStats, setLastOperation])

  const handleDownload = useCallback(() => {
    if (rightCode) {
      const blob = new Blob([rightCode], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `minified.${rightType || 'txt'}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success('Code downloaded!')
    }
  }, [rightCode, rightType])

  const handleLeftCopy = useCallback(() => {
    if (leftCode) {
      navigator.clipboard.writeText(leftCode)
      toast.success('Left code copied to clipboard!')
    }
  }, [leftCode])

  const handleLeftDownload = useCallback(() => {
    if (leftCode) {
      const blob = new Blob([leftCode], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `original.${leftType || 'txt'}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success('Left code downloaded!')
    }
  }, [leftCode, leftType])

  const handleRightCopy = useCallback(() => {
    if (rightCode) {
      navigator.clipboard.writeText(rightCode)
      toast.success('Right code copied to clipboard!')
    }
  }, [rightCode])

  const handleRightDownload = useCallback(() => {
    if (rightCode) {
      const blob = new Blob([rightCode], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `minified.${rightType || 'txt'}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success('Right code downloaded!')
    }
  }, [rightCode, rightType])

  const processMinify = useCallback(async () => {
    const sourceCode = leftCode.trim()
    if (!sourceCode) {
      toast.error('Please paste some code in the left editor first.')
      return
    }

    setIsLoading(true)

    try {
      let processed = ''
      let type = leftType
      
      // Auto-detect language if none selected
      if (!type) {
        type = detectCodeLanguage(sourceCode)
        setLeftType(type)
        setLeftTypeManuallySet(false)
        const languageNames = {
          'js': 'JavaScript',
          'css': 'CSS',
          'json': 'JSON',
          'php': 'PHP Serialize'
        }
        toast.success(`Language auto-detected: ${languageNames[type]}`)
      }
      
      if (!type) {
        throw new Error('Unable to determine language type')
      }

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
      // Set right type to match the detected/selected left type
      setRightType(type)
      setStats({
        original: sourceCode.length, // Input: left code
        result: processed.length,    // Output: right code (minified)
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
                errorMessage = `Invalid ${leftType?.toUpperCase() || 'unknown'} code. Please ensure the code matches the selected type.`
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
  }, [leftCode, leftType, jsOptions, cssOptions, jsonOptions, phpOptions, setLeftType, setRightType, setRightCode, setStats, setLastOperation, setIsLoading, setLeftTypeManuallySet])

  const processUnminify = useCallback(async () => {
    const sourceCode = rightCode.trim()
    if (!sourceCode) {
      toast.error('Please paste some code in the right editor first.')
      return
    }

    setIsLoading(true)

    try {
      let processed = ''
      let type = rightType
      
      // Auto-detect language if none selected
      if (!type) {
        type = detectCodeLanguage(sourceCode)
        setRightType(type)
        setRightTypeManuallySet(false)
        const languageNames = {
          'js': 'JavaScript',
          'css': 'CSS',
          'json': 'JSON',
          'php': 'PHP Serialize'
        }
        toast.success(`Language auto-detected: ${languageNames[type]}`)
      }
      
      if (!type) {
        throw new Error('Unable to determine language type')
      }

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
      // Set left type to match the detected/selected right type
      setLeftType(type)
      setStats({
        original: sourceCode.length, // Input: right code
        result: processed.length,    // Output: left code (unminified)
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
                errorMessage = `Invalid ${rightType?.toUpperCase() || 'unknown'} code. Please ensure the code matches the selected type.`
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
  }, [rightCode, rightType, phpOptions, setRightType, setLeftType, setLeftCode, setStats, setLastOperation, setIsLoading, setRightTypeManuallySet])

  const processBeautify = useCallback(async () => {
    if (!leftCode.trim()) {
      toast.error('Please enter some code to beautify.')
      return
    }

    setIsLoading(true)

    try {
      let processed = ''
      let type = leftType
      
      // Auto-detect language if none selected
      if (!type) {
        type = detectCodeLanguage(leftCode)
        setLeftType(type)
        setLeftTypeManuallySet(false)
        const languageNames = {
          'js': 'JavaScript',
          'css': 'CSS',
          'json': 'JSON',
          'php': 'PHP Serialize'
        }
        toast.success(`Language auto-detected: ${languageNames[type]}`)
      }
      
      if (!type) {
        throw new Error('Unable to determine language type')
      }

      processed = beautifyCode(leftCode, type)

      setRightCode(processed)
      // Set right type to match the detected/selected left type
      setRightType(type)
      setStats({
        original: leftCode.length, // Input: left code
        result: processed.length,  // Output: right code (beautified)
      })
      setLastOperation('unminify') // Use 'unminify' for beautify operation

      toast.success('Code beautified successfully!')
    } catch (error) {
      console.error(error)
      
      let errorMessage = 'An error occurred during beautification.'
      
      if (error instanceof Error) {
        if (error.message.includes('JSON')) {
          errorMessage = 'Invalid JSON syntax. Please check your JSON code.'
        } else if (error.message.includes('CSS')) {
          errorMessage = 'Invalid CSS syntax. Please check your CSS code.'
        } else if (error.message.includes('JavaScript') || error.message.includes('JS')) {
          errorMessage = 'Invalid JavaScript syntax. Please check your JavaScript code.'
        } else if (error.message.includes('PHP')) {
          errorMessage = 'Invalid data for PHP beautification. Please provide valid JSON data.'
        } else {
          errorMessage = `Beautification failed: ${error.message}`
        }
      }
      
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [leftCode, leftType, setLeftType, setRightType, setRightCode, setStats, setLastOperation, setIsLoading, setLeftTypeManuallySet])

  return {
    handleLeftCodeChange,
    handleRightCodeChange,
    handleLeftTypeChange,
    handleRightTypeChange,
    handleCopy,
    handleClear,
    handleClearLeft,
    handleClearRight,
    handleDownload,
    handleLeftCopy,
    handleLeftDownload,
    handleRightCopy,
    handleRightDownload,
    processMinify,
    processUnminify,
    processBeautify,
  }
}
