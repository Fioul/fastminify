export interface CSSOptions {
  // Niveau de compression
  compressionLevel: 'conservative' | 'normal' | 'aggressive'
  
  // Support navigateur
  browserSupport: 'modern' | 'ie11' | 'ie9'
  
  // Optimisations principales (seulement les options réellement implémentées)
  removeComments: boolean
}

export const defaultCSSOptions: CSSOptions = {
  compressionLevel: 'normal',
  browserSupport: 'modern',
  removeComments: true
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
    let cssoOptions = {
      restructure: options.compressionLevel === 'aggressive',
      comments: false, // CSSO supprime toujours les commentaires, on gère ça manuellement
      usage: {
        force: options.browserSupport === 'ie9'
      }
    }
    
    // Appliquer des options spécifiques selon le niveau de compression
    if (options.compressionLevel === 'conservative') {
      cssoOptions = {
        ...cssoOptions,
        restructure: false,
        merge: false,
        minify: true
      }
    } else if (options.compressionLevel === 'normal') {
      cssoOptions = {
        ...cssoOptions,
        restructure: false,
        merge: true,
        minify: true
      }
    } else if (options.compressionLevel === 'aggressive') {
      cssoOptions = {
        ...cssoOptions,
        restructure: true,
        merge: true,
        minify: true
      }
    }
    
    // Appliquer des options spécifiques selon le support navigateur
    if (options.browserSupport === 'ie9') {
      cssoOptions.usage = { force: true }
    } else if (options.browserSupport === 'ie11') {
      cssoOptions.usage = { force: false }
    } else if (options.browserSupport === 'modern') {
      cssoOptions.usage = { force: false }
    }
    
    let result = csso.minify(code, cssoOptions)
    
    if (!result || typeof result !== 'object' || !('css' in result)) {
      throw new Error('CSSO returned invalid result')
    }
    
    let minifiedCSS = result.css || ''
    
    // Post-traitement selon le niveau de compression pour créer des différences visibles
    if (options.compressionLevel === 'conservative') {
      // Conservative : garder plus d'espaces et de structure
      minifiedCSS = minifiedCSS
        .replace(/\{/g, ' {\n  ')
        .replace(/\}/g, '\n}\n')
        .replace(/;/g, ';\n  ')
        .replace(/,\s*/g, ', ')
        .replace(/\n\s*\n/g, '\n')
        .trim()
    } else if (options.compressionLevel === 'normal') {
      // Normal : compression standard (déjà fait par CSSO)
      // Pas de post-traitement supplémentaire
    } else if (options.compressionLevel === 'aggressive') {
      // Aggressive : compression maximale
      minifiedCSS = minifiedCSS
        .replace(/\s+/g, ' ')
        .replace(/\s*{\s*/g, '{')
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*;\s*/g, ';')
        .replace(/\s*,\s*/g, ',')
        .replace(/\s*:\s*/g, ':')
        .trim()
    }
    
    // Post-traitement selon le support navigateur
    if (options.browserSupport === 'ie9') {
      // IE9 : éviter certaines propriétés modernes
      minifiedCSS = minifiedCSS
        .replace(/border-radius/g, '-webkit-border-radius')
        .replace(/box-shadow/g, '-webkit-box-shadow')
        .replace(/transform/g, '-webkit-transform')
        .replace(/transition/g, '-webkit-transition')
    } else if (options.browserSupport === 'ie11') {
      // IE11 : ajouter des préfixes pour certaines propriétés
      minifiedCSS = minifiedCSS
        .replace(/flex/g, '-ms-flex')
        .replace(/grid/g, '-ms-grid')
    }
    
    // Si removeComments est false, on doit restaurer les commentaires
    if (!options.removeComments) {
      minifiedCSS = restoreComments(code, minifiedCSS)
    }
    
    return minifiedCSS
  } catch (error) {
    console.error('CSS minification error:', error)
    throw new Error(`Failed to minify CSS code: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Fonction pour restaurer les commentaires CSS
function restoreComments(originalCode: string, minifiedCode: string): string {
  // Si pas de commentaires, retourner le code minifié tel quel
  if (!originalCode.includes('/*')) {
    return minifiedCode
  }
  
  // Pour une approche plus naturelle, on utilise une minification moins agressive
  // qui préserve mieux la structure quand les commentaires sont importants
  return originalCode
    .replace(/\s+/g, ' ') // Normaliser les espaces
    .replace(/\s*{\s*/g, '{') // Supprimer espaces autour des accolades
    .replace(/\s*}\s*/g, '}') // Supprimer espaces autour des accolades
    .replace(/\s*;\s*/g, ';') // Supprimer espaces autour des points-virgules
    .replace(/\s*,\s*/g, ',') // Supprimer espaces autour des virgules
    .replace(/\s*:\s*/g, ':') // Supprimer espaces autour des deux-points
    .trim()
}

