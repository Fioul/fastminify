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
  t: (key: string) => string
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
  t
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
      toast.success(t('common.toast.codeCopied'))
    }
  }, [rightCode])

  const handleClear = useCallback(() => {
    setLeftCode('')
    setRightCode('')
    setStats(null)
    setLastOperation(null)
    toast.success(t('common.toast.allCleared'))
  }, [setLeftCode, setRightCode, setStats, setLastOperation])

  const handleClearLeft = useCallback(() => {
    setLeftCode('')
    toast.success(t('common.toast.leftCleared'))
  }, [setLeftCode])

  const handleClearRight = useCallback(() => {
    setRightCode('')
    setStats(null)
    setLastOperation(null)
    toast.success(t('common.toast.rightCleared'))
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
      toast.success(t('common.toast.codeDownloaded'))
    }
  }, [rightCode, rightType])

  const handleLeftCopy = useCallback(() => {
    if (leftCode) {
      navigator.clipboard.writeText(leftCode)
      toast.success(t('common.toast.leftCodeCopied'))
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
      toast.success(t('common.toast.leftCodeDownloaded'))
    }
  }, [leftCode, leftType])

  const handleRightCopy = useCallback(() => {
    if (rightCode) {
      navigator.clipboard.writeText(rightCode)
      toast.success(t('common.toast.rightCodeCopied'))
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
      toast.success(t('common.toast.rightCodeDownloaded'))
    }
  }, [rightCode, rightType])

  const processMinify = useCallback(async () => {
    const sourceCode = leftCode.trim()
    if (!sourceCode) {
      toast.error(t('common.toast.pasteCodeFirst'))
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
        toast.success(t('common.toast.languageAutoDetected').replace('{language}', languageNames[type]))
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

      toast.success(t('common.toast.minifiedSuccessfully'))
    } catch (error) {
      console.error(error)
      
      // Specific error messages based on type and error
      let errorMessage = t('common.toast.minificationError')
      
      if (error instanceof Error) {
        if (error.message.includes('JSON')) {
          if (leftType === 'json') {
            // Messages d'erreur plus spécifiques pour JSON
            if (error.message.includes('Expected property name')) {
              errorMessage = t('common.toast.invalidJsonProperty')
            } else if (error.message.includes('Unexpected token')) {
              errorMessage = t('common.toast.invalidJsonToken')
            } else if (error.message.includes('Expected double-quoted property name')) {
              errorMessage = t('common.toast.invalidJsonQuotes')
            } else if (error.message.includes('Expected \',\' or \'}\'')) {
              errorMessage = t('common.toast.invalidJsonComma')
            } else {
              errorMessage = t('common.toast.invalidJsonSyntax')
            }
            } else {
              if (leftType === 'php') {
                errorMessage = t('common.toast.invalidDataFormat')
              } else {
                errorMessage = t('common.toast.invalidCodeType').replace('{type}', leftType?.toUpperCase() || 'unknown')
              }
            }
        } else if (error.message.includes('CSS')) {
          errorMessage = t('common.toast.invalidCssSyntax')
        } else if (error.message.includes('JavaScript') || error.message.includes('JS')) {
          errorMessage = t('common.toast.invalidJsSyntax')
        } else if (error.message.includes('PHP')) {
          errorMessage = t('common.toast.invalidPhpData')
        } else {
          errorMessage = t('common.toast.minificationFailed').replace('{error}', error.message)
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
      toast.error(t('common.toast.pasteRightCodeFirst'))
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
        toast.success(t('common.toast.languageAutoDetected').replace('{language}', languageNames[type]))
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

      toast.success(t('common.toast.unminifiedSuccessfully'))
    } catch (error) {
      console.error(error)
      
      // Specific error messages based on type and error
      let errorMessage = t('common.toast.unminificationError')
      
      if (error instanceof Error) {
        if (error.message.includes('JSON')) {
          if (rightType === 'json') {
            errorMessage = t('common.toast.invalidJsonSyntax')
            } else {
              if (rightType === 'php') {
                errorMessage = t('common.toast.invalidDataFormat')
              } else {
                errorMessage = t('common.toast.invalidCodeType').replace('{type}', rightType?.toUpperCase() || 'unknown')
              }
            }
        } else if (error.message.includes('CSS')) {
          errorMessage = t('common.toast.invalidCssSyntax')
        } else if (error.message.includes('JavaScript') || error.message.includes('JS')) {
          errorMessage = t('common.toast.invalidJsSyntax')
        } else if (error.message.includes('PHP')) {
          errorMessage = t('common.toast.invalidPhpSerialized')
        } else {
          errorMessage = t('common.toast.unminificationFailed').replace('{error}', error.message)
        }
      }
      
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [rightCode, rightType, phpOptions, setRightType, setLeftType, setLeftCode, setStats, setLastOperation, setIsLoading, setRightTypeManuallySet])

  const processBeautify = useCallback(async () => {
    if (!leftCode.trim()) {
      toast.error(t('common.toast.enterCodeToBeautify'))
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
        toast.success(t('common.toast.languageAutoDetected').replace('{language}', languageNames[type]))
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

      toast.success(t('common.toast.beautifiedSuccessfully'))
    } catch (error) {
      console.error(error)
      
      let errorMessage = t('common.toast.beautificationError')
      
      if (error instanceof Error) {
        if (error.message.includes('JSON')) {
          errorMessage = t('common.toast.invalidJsonSyntax')
        } else if (error.message.includes('CSS')) {
          errorMessage = t('common.toast.invalidCssSyntax')
        } else if (error.message.includes('JavaScript') || error.message.includes('JS')) {
          errorMessage = t('common.toast.invalidJsSyntax')
        } else if (error.message.includes('PHP')) {
          errorMessage = t('common.toast.invalidDataFormat')
        } else {
          errorMessage = t('common.toast.beautificationFailed').replace('{error}', error.message)
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
