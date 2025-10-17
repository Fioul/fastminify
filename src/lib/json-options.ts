export interface JSONOptions {
  // Niveau de compression
  compressionLevel: 'conservative' | 'normal' | 'aggressive'
  
  // Gestion des nombres
  optimizeNumbers: boolean
  useScientificNotation: boolean
  
  // Gestion des clés et valeurs
  removeEmptyKeys: boolean
  removeNullValues: boolean
  removeUndefinedValues: boolean
  
  // Gestion des tableaux
  removeEmptyArrayElements: boolean
  removeDuplicateArrayElements: boolean
  sortArrayElements: boolean
  
  // Validation
  validateBeforeMinify: boolean
  fixCommonErrors: boolean
}

export const defaultJSONOptions: JSONOptions = {
  compressionLevel: 'normal',
  optimizeNumbers: true,
  useScientificNotation: false,
  removeEmptyKeys: false,
  removeNullValues: false,
  removeUndefinedValues: true,
  removeEmptyArrayElements: false,
  removeDuplicateArrayElements: false,
  sortArrayElements: false,
  validateBeforeMinify: true,
  fixCommonErrors: true // Enable by default to help users
}

/**
 * Préserve les décimales originales dans le JSON
 */
function preserveDecimals(code: string): string {
  // Remplacer les nombres décimaux par des chaînes pour éviter la conversion automatique
  // Pattern: "key": 1.00 -> "key": "1.00"
  let preserved = code.replace(/"([^"]+)"\s*:\s*(\d+\.\d+)/g, (match, key, decimal) => {
    // Préserver tous les nombres avec des décimales, même 1.00
    return `"${key}":"${decimal}"`;
  });
  
  return preserved;
}

/**
 * Restaure les nombres décimaux après le parsing
 */
function restoreDecimals(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  
  if (typeof obj === 'string') {
    // Vérifier si c'est un nombre décimal sous forme de chaîne
    const num = parseFloat(obj);
    if (!isNaN(num) && obj.includes('.')) {
      return num;
    }
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => restoreDecimals(item));
  }
  
  if (typeof obj === 'object') {
    const restored: any = {};
    for (const [key, value] of Object.entries(obj)) {
      restored[key] = restoreDecimals(value);
    }
    return restored;
  }
  
  return obj;
}

/**
 * Corrige les erreurs JSON communes
 */
function fixCommonJSONErrors(code: string): string {
  let fixed = code.trim()
  
  // Supprimer le BOM (Byte Order Mark) si présent
  if (fixed.charCodeAt(0) === 0xFEFF) {
    fixed = fixed.slice(1)
  }
  
  // Supprimer les caractères invisibles (zero-width characters)
  fixed = fixed.replace(/[\u200B-\u200D\uFEFF]/g, '')
  
  // Corriger les guillemets simples en guillemets doubles
  // On remplace tous les guillemets simples par des guillemets doubles
  // car JSON ne supporte que les guillemets doubles
  fixed = fixed.replace(/'/g, '"')
  
  // Corriger les clés sans guillemets (simple regex, pas parfait)
  fixed = fixed.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":')
  
  // Corriger les virgules manquantes après des valeurs non-quotées (null, true, false, nombres)
  // Pattern: "key": value\n"key2": value2
  fixed = fixed.replace(/"([^"]+)"\s*:\s*(null|true|false|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*\n\s*"([^"]+)"\s*:/g, '"$1":$2,\n"$3":')
  
  // Corriger les virgules manquantes après des valeurs non-quotées (même ligne)
  fixed = fixed.replace(/"([^"]+)"\s*:\s*(null|true|false|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s+"([^"]+)"\s*:/g, '"$1":$2, "$3":')
  
  // Corriger les virgules manquantes après des objets ou tableaux
  // Pattern: }\n"key": value ou ]\n"key": value
  fixed = fixed.replace(/}\s*\n\s*"([^"]+)"\s*:/g, '},\n"$1":')
  fixed = fixed.replace(/\]\s*\n\s*"([^"]+)"\s*:/g, '],\n"$1":')
  
  // Corriger les valeurs undefined qui ne sont pas des valeurs JSON valides
  fixed = fixed.replace(/"([^"]+)"\s*:\s*undefined/g, '"$1":"undefined"')
  
  // Corriger les autres valeurs sans guillemets (identifiants non-quotés)
  // On évite de convertir true, false, null qui sont des valeurs JSON valides
  // On utilise une approche plus simple : on remplace tout sauf les valeurs JSON valides
  fixed = fixed.replace(/"([^"]+)"\s*:\s*([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*[,}])/g, (match, key, value) => {
    // Si la valeur est true, false, ou null, on la laisse telle quelle
    if (value === 'true' || value === 'false' || value === 'null') {
      return match;
    }
    // Sinon, on l'entoure de guillemets
    return `"${key}":"${value}"`;
  })
  
  // Corriger les virgules en trop
  fixed = fixed.replace(/,(\s*[}\]])/g, '$1')
  
  // Corriger les virgules manquantes entre les propriétés
  fixed = fixed.replace(/"\s*}\s*"/g, '","')
  fixed = fixed.replace(/"\s*]\s*"/g, '","')
  fixed = fixed.replace(/}\s*"/g, '},"')
  fixed = fixed.replace(/]\s*"/g, '],"')
  
  // Corriger les virgules manquantes entre propriétés (nouvelle ligne)
  fixed = fixed.replace(/"([^"]*)"\s*\n\s*"([^"]*)"\s*:/g, '"$1",\n"$2":')
  
  // Corriger les virgules manquantes entre propriétés (même ligne)
  fixed = fixed.replace(/"([^"]*)"\s+"([^"]*)"\s*:/g, '"$1", "$2":')
  
  return fixed
}

/**
 * Optimise les nombres dans un objet JSON
 */
function optimizeNumbers(obj: any, options: JSONOptions): any {
  if (obj === null || obj === undefined) return obj
  
  if (typeof obj === 'number') {
    if (options.optimizeNumbers) {
      // Supprimer les zéros inutiles pour les entiers
      if (Number.isInteger(obj) && obj.toString().includes('.')) {
        return Math.round(obj)
      }
      
      // Notation scientifique pour les grands nombres
      if (options.useScientificNotation && Math.abs(obj) >= 1000000) {
        return obj.toExponential()
      }
    }
    return obj
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => optimizeNumbers(item, options))
  }
  
  if (typeof obj === 'object') {
    const optimized: any = {}
    for (const [key, value] of Object.entries(obj)) {
      optimized[key] = optimizeNumbers(value, options)
    }
    return optimized
  }
  
  return obj
}

/**
 * Supprime les clés vides, null, undefined selon les options
 */
function cleanObject(obj: any, options: JSONOptions): any {
  if (obj === null || obj === undefined) return obj
  
  if (Array.isArray(obj)) {
    let cleaned = obj.map(item => cleanObject(item, options))
    
    // Supprimer les éléments vides
    if (options.removeEmptyArrayElements) {
      cleaned = cleaned.filter(item => 
        item !== null && 
        item !== undefined && 
        item !== '' &&
        !(typeof item === 'object' && Object.keys(item).length === 0)
      )
    }
    
    // Supprimer les doublons
    if (options.removeDuplicateArrayElements) {
      cleaned = [...new Set(cleaned.map(item => JSON.stringify(item)))].map(item => JSON.parse(item))
    }
    
    // Trier les éléments
    if (options.sortArrayElements) {
      cleaned.sort((a, b) => {
        if (typeof a === 'string' && typeof b === 'string') {
          return a.localeCompare(b)
        }
        if (typeof a === 'number' && typeof b === 'number') {
          return a - b
        }
        return 0
      })
    }
    
    return cleaned
  }
  
  if (typeof obj === 'object') {
    const cleaned: any = {}
    
    for (const [key, value] of Object.entries(obj)) {
      // Vérifier si on doit supprimer cette clé/valeur
      let shouldRemove = false
      
      if (options.removeEmptyKeys && (key === '' || key === null || key === undefined)) {
        shouldRemove = true
      }
      
      if (options.removeNullValues && value === null) {
        shouldRemove = true
      }
      
      if (options.removeUndefinedValues && value === undefined) {
        shouldRemove = true
      }
      
      if (options.removeEmptyKeys && (value === '' || (typeof value === 'object' && value !== null && Object.keys(value).length === 0))) {
        shouldRemove = true
      }
      
      if (!shouldRemove) {
        cleaned[key] = cleanObject(value, options)
      }
    }
    
    return cleaned
  }
  
  return obj
}

/**
 * Minifie le JSON avec les options spécifiées
 */
export function minifyJSONWithOptions(code: string, options: JSONOptions = defaultJSONOptions): string {
  try {
    if (!code || typeof code !== 'string') {
      throw new Error('Invalid JSON code provided')
    }
    
    let processedCode = code.trim()
    
    // Vérifier si le code est vide après trim
    if (!processedCode) {
      throw new Error('Invalid JSON code provided')
    }
    
    // Préserver les décimales si optimizeNumbers est désactivé
    let shouldPreserveDecimals = !options.optimizeNumbers;
    let originalDecimals: { [key: string]: string } = {};
    
    if (shouldPreserveDecimals) {
      // Extraire les décimales originales
      const decimalMatches = code.matchAll(/"([^"]+)"\s*:\s*(\d+\.\d+)/g);
      for (const match of decimalMatches) {
        const key = match[1];
        const decimal = match[2];
        originalDecimals[key] = decimal;
      }
    }
    
    // Valider la syntaxe d'abord
    let isValidJSON = false
    if (options.validateBeforeMinify) {
      try {
        JSON.parse(processedCode)
        isValidJSON = true
      } catch (error) {
        // JSON invalide, on essaie de le corriger si demandé
        if (options.fixCommonErrors) {
          processedCode = fixCommonJSONErrors(processedCode)
          // Re-valider après correction
          try {
            JSON.parse(processedCode)
            isValidJSON = true
          } catch (correctedError) {
            throw new Error(`Invalid JSON syntax: ${correctedError instanceof Error ? correctedError.message : 'Unknown error'}`)
          }
        } else {
          throw new Error(`Invalid JSON syntax: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
      }
    }
    
    // Parser le JSON
    let parsed = JSON.parse(processedCode)
    
    // Appliquer les optimisations selon le niveau de compression
    let optimized = parsed
    
    if (options.compressionLevel === 'normal' || options.compressionLevel === 'aggressive') {
      // Optimiser les nombres
      optimized = optimizeNumbers(optimized, options)
    }
    
    // Appliquer la notation scientifique même si optimizeNumbers est désactivé
    if (options.useScientificNotation && !options.optimizeNumbers) {
      optimized = optimizeNumbers(optimized, options)
    }
    
    // Nettoyer l'objet (supprimer clés vides, null, etc.) si demandé
    if (options.removeEmptyKeys || options.removeNullValues || options.removeUndefinedValues || 
        options.removeEmptyArrayElements || options.removeDuplicateArrayElements || options.sortArrayElements) {
      optimized = cleanObject(optimized, options)
    }
    
    // Stringify avec minification
    let result = JSON.stringify(optimized)
    
    // Post-traitement pour restaurer les décimales originales si optimizeNumbers est désactivé
    if (shouldPreserveDecimals && Object.keys(originalDecimals).length > 0) {
      // Restaurer les décimales originales dans le résultat final
      for (const [key, decimal] of Object.entries(originalDecimals)) {
        const regex = new RegExp(`"${key}"\\s*:\\s*\\d+(?:\\.\\d+)?`, 'g');
        result = result.replace(regex, `"${key}":${decimal}`);
      }
    }
    
    // Post-traitement pour la notation scientifique si nécessaire
    if (options.useScientificNotation) {
      // Convertir les grands nombres en notation scientifique
      result = result.replace(/:(\d{7,})/g, (match, number) => {
        const num = parseInt(number)
        if (Math.abs(num) >= 1000000) {
          return `:"${num.toExponential()}"`
        }
        return match
      })
    }
    
    return result
    
  } catch (error) {
    console.error('JSON minification error:', error)
    throw new Error(`Failed to minify JSON code: ${error instanceof Error ? error.message : 'Invalid JSON syntax'}`)
  }
}
