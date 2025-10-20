'use client'

import { useState } from 'react'
import { JavaScriptOptions, CSSOptions, JSONOptions, PHPOptions } from '@/lib/types'

export function useOptions() {
  const [jsOptions, setJsOptions] = useState<JavaScriptOptions>({
    ecmaVersion: 'es2022',
    compressionLevel: 'normal',
    browserSupport: 'modern',
    preserveClassNames: false,
    preserveFunctionNames: false,
    removeConsole: false,
    removeDebugger: false
  })
  
  const [cssOptions, setCssOptions] = useState<CSSOptions>({
    compressionLevel: 'normal',
    removeUnused: false,
    mergeRules: true,
    mergeMediaQueries: true,
    removeEmpty: true,
    removeComments: true,
    removeWhitespace: true
  })
  
  const [jsonOptions, setJsonOptions] = useState<JSONOptions>({
    compressionLevel: 'normal',
    removeWhitespace: true,
    removeComments: false,
    sortKeys: false
  })
  
  const [phpOptions, setPhpOptions] = useState<PHPOptions>({
    compressionLevel: 'normal',
    removeWhitespace: true,
    removeComments: false,
    sortKeys: false
  })

  return {
    jsOptions,
    cssOptions,
    jsonOptions,
    phpOptions,
    setJsOptions,
    setCssOptions,
    setJsonOptions,
    setPhpOptions,
  }
}
