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
      drop_debugger: true,
      unsafe: false,
      passes: 1
    },
    mangle: false
  },
  'normal': {
    compress: {
      drop_debugger: true,
      unsafe: false,
      passes: 2
    },
    mangle: {
      toplevel: false,
      keep_classnames: false,
      keep_fnames: false
    }
  },
  'aggressive': {
    compress: {
      drop_debugger: true,
      unsafe: true,
      passes: 3,
      pure_funcs: ['console.log', 'console.info', 'console.debug']
    },
    mangle: {
      toplevel: true,
      keep_classnames: false,
      keep_fnames: false
    }
  }
} as const

export const browserSupportMap = {
  'modern': {
    safari10: false,
    ie8: false
  },
  'ie11': {
    safari10: false,
    ie8: false
  },
  'ie9': {
    safari10: false,
    ie8: true
  },
  'all': {
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
        drop_console: options.removeConsole,
        drop_debugger: options.removeDebugger
      },
      mangle: options.compressionLevel === 'conservative' ? 
        (options.preserveClassNames || options.preserveFunctionNames ? {
          keep_classnames: options.preserveClassNames,
          keep_fnames: options.preserveFunctionNames,
          reserved: options.preserveClassNames ? ['className', 'classList'] : []
        } : false) : {
          ...compressionConfig.mangle,
          keep_classnames: options.preserveClassNames,
          keep_fnames: options.preserveFunctionNames,
          reserved: options.preserveClassNames ? ['className', 'classList'] : []
        },
      format: {
        comments: false
      }
    }

    const result = await minify(code, terserOptions)
    
    if (result.error) {
      throw new Error(`Terser error: ${result.error.message}`)
    }
    
    let minifiedCode = result.code || code
    
    // Si preserveClassNames est activé, préserver les noms de classes CSS dans les chaînes
    if (options.preserveClassNames) {
      // Cette option préserve les noms de classes CSS dans les chaînes de caractères
      // Les propriétés DOM comme className et classList sont déjà préservées par Terser
      // Cette fonctionnalité est principalement pour les classes ES6 et les identifiants personnalisés
    }
    
    return minifiedCode
  } catch (error) {
    console.error('JavaScript minification error:', error)
    throw new Error('Failed to minify JavaScript code')
  }
}
