// JavaScript options interface
export interface JavaScriptOptions {
  ecmaVersion: 'es5' | 'es2015' | 'es2017' | 'es2020' | 'es2022'
  compressionLevel: 'conservative' | 'normal' | 'aggressive'
  preserveClassNames: boolean
  preserveFunctionNames: boolean
  removeConsole: boolean
  removeDebugger: boolean
}

// CSS options interface
export interface CSSOptions {
  compressionLevel: 'conservative' | 'normal' | 'aggressive'
  removeComments: boolean
  convertColors: boolean
  mergeRules: boolean
  minifySelectors: boolean
}

// JSON options interface
export interface JSONOptions {
  compressionLevel: 'conservative' | 'normal' | 'aggressive'
  optimizeNumbers: boolean
  useScientificNotation: boolean
  removeEmptyKeys: boolean
  removeNullValues: boolean
  removeUndefinedValues: boolean
  removeEmptyArrayElements: boolean
  removeDuplicateArrayElements: boolean
  sortArrayElements: boolean
  removeEmptyObjects: boolean
  removeEmptyArrays: boolean
  sortObjectKeys: boolean
  removeDuplicateKeys: boolean
  validateBeforeMinify: boolean
  fixCommonErrors: boolean
}

// PHP options interface
export interface PHPOptions {
  includeNullValues: boolean
  removeEmptyArrays: boolean
  removeEmptyObjects: boolean
  sortKeys: boolean
}

// Language type
export type LanguageType = 'js' | 'css' | 'json' | 'php'

// Operation type
export type OperationType = 'minify' | 'unminify' | null

// Stats interface
export interface Stats {
  original: number
  result: number
}
