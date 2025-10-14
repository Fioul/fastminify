export interface CSSOptions {
  // Niveau de compression
  compressionLevel: 'conservative' | 'normal' | 'aggressive'
  
  // Support navigateur
  browserSupport: 'modern' | 'ie11' | 'ie9'
  
  // Optimisations principales
  removeComments: boolean
  removeEmptyRules: boolean
  convertColors: boolean
  convertValues: boolean
  mergeLonghand: boolean
  mergeRules: boolean
  minifySelectors: boolean
  normalizeWhitespace: boolean
  discardDuplicates: boolean
  reduceIdents: boolean
}

export const defaultCSSOptions: CSSOptions = {
  compressionLevel: 'normal',
  browserSupport: 'modern',
  removeComments: true,
  removeEmptyRules: true,
  convertColors: true,
  convertValues: true,
  mergeLonghand: true,
  mergeRules: true,
  minifySelectors: true,
  normalizeWhitespace: true,
  discardDuplicates: true,
  reduceIdents: true
}

export async function minifyCSSWithOptions(code: string, options: CSSOptions = defaultCSSOptions) {
  try {
    if (typeof code !== 'string') {
      throw new Error('Invalid CSS code provided')
    }
    
    // Si le code est vide ou ne contient que des espaces, retourner une chaîne vide
    if (!code.trim()) {
      return ''
    }
    
    const csso = await import('csso')
    
    // Configuration CSSO basée sur les options
    const cssoOptions = {
      restructure: options.compressionLevel === 'aggressive',
      comments: !options.removeComments,
      usage: {
        force: options.browserSupport === 'ie9'
      }
    }
    
    let result = csso.minify(code, cssoOptions)
    
    if (!result || typeof result !== 'object' || !('css' in result)) {
      throw new Error('CSSO returned invalid result')
    }
    
    let minifiedCSS = result.css || ''
    
    // Si convertColors est désactivé, on doit restaurer les couleurs originales
    if (!options.convertColors) {
      minifiedCSS = restoreOriginalColors(code, minifiedCSS)
    }
    
    return minifiedCSS
  } catch (error) {
    console.error('CSS minification error:', error)
    throw new Error(`Failed to minify CSS code: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Fonction pour restaurer les couleurs originales
function restoreOriginalColors(originalCode: string, minifiedCode: string): string {
  // Mapping des conversions de couleurs communes
  const colorMappings = [
    { from: '#f00', to: 'red' },
    { from: '#0f0', to: 'green' },
    { from: '#00f', to: 'blue' },
    { from: '#fff', to: 'white' },
    { from: '#000', to: 'black' },
    { from: '#ff0', to: 'yellow' },
    { from: '#f0f', to: 'magenta' },
    { from: '#0ff', to: 'cyan' },
    { from: '#800', to: 'maroon' },
    { from: '#080', to: 'green' },
    { from: '#008', to: 'navy' },
    { from: '#808', to: 'purple' },
    { from: '#880', to: 'olive' },
    { from: '#088', to: 'teal' },
    { from: '#888', to: 'gray' },
    { from: '#c00', to: 'red' },
    { from: '#0c0', to: 'lime' },
    { from: '#00c', to: 'blue' },
    { from: '#cc0', to: 'yellow' },
    { from: '#c0c', to: 'magenta' },
    { from: '#0cc', to: 'cyan' }
  ]
  
  let restoredCode = minifiedCode
  
  // Vérifier si la couleur originale était un nom de couleur
  const originalColors = originalCode.match(/\b(red|green|blue|white|black|yellow|magenta|cyan|maroon|navy|purple|olive|teal|gray|lime)\b/g)
  
  if (originalColors) {
    // Remplacer les hex par les noms de couleurs originaux
    originalColors.forEach(originalColor => {
      const mapping = colorMappings.find(m => m.to === originalColor)
      if (mapping) {
        // Remplacer toutes les occurrences de la couleur hex par le nom original
        const regex = new RegExp(mapping.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
        restoredCode = restoredCode.replace(regex, originalColor)
      }
    })
  }
  
  return restoredCode
}
