import { minify } from 'terser'

export interface JavaScriptOptions {
  ecmaVersion: 'es5' | 'es2015' | 'es2017' | 'es2020' | 'es2022'
  compressionLevel: 'conservative' | 'normal' | 'aggressive'
  browserSupport: 'modern' | 'ie11' | 'ie9' | 'all'
  preserveClassNames: boolean
  preserveFunctionNames: boolean
  removeConsole: boolean
  removeDebugger: boolean
}

export const defaultJavaScriptOptions: JavaScriptOptions = {
  ecmaVersion: 'es2020',
  compressionLevel: 'normal',
  browserSupport: 'modern',
  preserveClassNames: false,
  preserveFunctionNames: false,
  removeConsole: true,
  removeDebugger: true
}

export const ecmaVersionMap = {
  'es5': 5,
  'es2015': 2015,
  'es2017': 2017,
  'es2020': 2020,
  'es2022': 2022
} as const

export const compressionLevelMap = {
  'conservative': {
    compress: {
      drop_console: false,
      drop_debugger: true,
      unsafe: false,
      passes: 1
    },
    mangle: false
  },
  'normal': {
    compress: {
      drop_console: false,
      drop_debugger: true,
      unsafe: false,
      passes: 2
    },
    mangle: true
  },
  'aggressive': {
    compress: {
      drop_console: true,
      drop_debugger: true,
      unsafe: true,
      passes: 3,
      pure_funcs: ['console.log', 'console.info', 'console.debug']
    },
    mangle: {
      toplevel: true
    }
  }
} as const

export const browserSupportMap = {
  'modern': {
    ecma: 2020,
    safari10: false,
    ie8: false
  },
  'ie11': {
    ecma: 2015,
    safari10: false,
    ie8: false
  },
  'ie9': {
    ecma: 5,
    safari10: false,
    ie8: true
  },
  'all': {
    ecma: 5,
    safari10: true,
    ie8: true
  }
} as const

export async function minifyJavaScript(
  code: string, 
  options: JavaScriptOptions
): Promise<string> {
  try {
    const ecmaVersion = ecmaVersionMap[options.ecmaVersion]
    const compressionConfig = compressionLevelMap[options.compressionLevel]
    const browserConfig = browserSupportMap[options.browserSupport]
    
    const terserOptions = {
      ecma: ecmaVersion,
      ...browserConfig,
      compress: {
        ...compressionConfig.compress,
        drop_console: options.removeConsole || compressionConfig.compress.drop_console,
        drop_debugger: options.removeDebugger || compressionConfig.compress.drop_debugger
      },
      mangle: options.compressionLevel === 'conservative' ? false : {
        ...compressionConfig.mangle,
        keep_classnames: options.preserveClassNames,
        keep_fnames: options.preserveFunctionNames
      },
      format: {
        comments: false
      }
    }

    const result = await minify(code, terserOptions)
    
    if (result.error) {
      throw new Error(`Terser error: ${result.error.message}`)
    }
    
    return result.code || code
  } catch (error) {
    console.error('JavaScript minification error:', error)
    throw new Error('Failed to minify JavaScript code')
  }
}
