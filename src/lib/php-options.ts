export interface PHPOptions {
  // Niveau de sérialisation
  serializationLevel: 'basic' | 'deep' | 'custom'
  
  // Gestion des types de données
  preserveTypes: boolean
  normalizeTypes: boolean
  optimizeTypes: boolean
  
  // Gestion des valeurs spéciales
  includeNullValues: boolean
  includeEmptyValues: boolean
  convertUndefinedToNull: boolean
  
  // Options de formatage
  compression: 'none' | 'minimal' | 'aggressive'
  readable: boolean
  
  // Validation et correction
  validateBeforeSerialize: boolean
  fixCommonErrors: boolean
  strictMode: boolean
}

export const defaultPHPOptions: PHPOptions = {
  serializationLevel: 'deep',
  preserveTypes: true,
  normalizeTypes: false,
  optimizeTypes: false,
  includeNullValues: true,
  includeEmptyValues: true,
  convertUndefinedToNull: true,
  compression: 'minimal',
  readable: false,
  validateBeforeSerialize: true,
  fixCommonErrors: false,
  strictMode: false
}

/**
 * Valide les données avant sérialisation
 */
function validateData(data: any, options: PHPOptions): void {
  if (options.strictMode) {
    if (data === undefined) {
      throw new Error('Undefined values are not allowed in strict mode')
    }
    if (typeof data === 'function') {
      throw new Error('Functions cannot be serialized')
    }
    if (data instanceof Error) {
      throw new Error('Error objects cannot be serialized')
    }
  }
  
  // Validation récursive pour les objets et tableaux
  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) {
      data.forEach(item => validateData(item, options))
    } else {
      Object.values(data).forEach(value => validateData(value, options))
    }
  }
}

/**
 * Normalise les types de données
 */
function normalizeData(data: any, options: PHPOptions): any {
  if (data === null || data === undefined) {
    if (options.convertUndefinedToNull && data === undefined) {
      return null
    }
    return data
  }
  
  if (Array.isArray(data)) {
    return data.map(item => normalizeData(item, options))
  }
  
  if (typeof data === 'object') {
    const normalized: any = {}
    for (const [key, value] of Object.entries(data)) {
      normalized[key] = normalizeData(value, options)
    }
    return normalized
  }
  
  if (options.normalizeTypes) {
    // Convertir tout en strings
    return String(data)
  }
  
  if (options.optimizeTypes) {
    // Optimiser les types pour la sérialisation
    if (typeof data === 'number') {
      if (Number.isInteger(data)) {
        return parseInt(data.toString())
      }
      return parseFloat(data.toString())
    }
  }
  
  return data
}

/**
 * Filtre les valeurs selon les options
 */
function filterData(data: any, options: PHPOptions): any {
  if (data === null) {
    return options.includeNullValues ? data : undefined
  }
  
  if (data === '') {
    return options.includeEmptyValues ? data : undefined
  }
  
  if (Array.isArray(data)) {
    const filtered = data
      .map(item => filterData(item, options))
      .filter(item => item !== undefined)
    return options.includeEmptyValues || filtered.length > 0 ? filtered : undefined
  }
  
  if (typeof data === 'object' && data !== null) {
    const filtered: any = {}
    let hasValues = false
    
    for (const [key, value] of Object.entries(data)) {
      const filteredValue = filterData(value, options)
      if (filteredValue !== undefined) {
        filtered[key] = filteredValue
        hasValues = true
      }
    }
    
    return options.includeEmptyValues || hasValues ? filtered : undefined
  }
  
  return data
}

/**
 * Applique la compression selon le niveau
 */
function applyCompression(serialized: string, options: PHPOptions): string {
  if (options.compression === 'none') {
    return serialized
  }
  
  if (options.compression === 'minimal') {
    // Supprimer les espaces inutiles
    return serialized.replace(/\s+/g, ' ').trim()
  }
  
  if (options.compression === 'aggressive') {
    // Supprimer tous les espaces
    return serialized.replace(/\s+/g, '')
  }
  
  return serialized
}

/**
 * Formate la sortie pour la lisibilité
 */
function formatOutput(serialized: string, options: PHPOptions): string {
  if (!options.readable) {
    return serialized
  }
  
  // Ajouter des espaces pour la lisibilité
  let formatted = serialized
  
  // Espaces autour des deux-points
  formatted = formatted.replace(/:/g, ': ')
  
  // Espaces autour des points-virgules
  formatted = formatted.replace(/;/g, '; ')
  
  // Espaces autour des accolades
  formatted = formatted.replace(/\{/g, '{ ')
  formatted = formatted.replace(/\}/g, ' }')
  
  // Espaces autour des crochets
  formatted = formatted.replace(/\[/g, '[ ')
  formatted = formatted.replace(/\]/g, ' ]')
  
  return formatted
}

/**
 * Sérialise les données PHP avec les options spécifiées
 */
export function serializePHPWithOptions(data: any, options: PHPOptions = defaultPHPOptions): string {
  try {
    // Validation des entrées vides
    if (data === '' || data === null || data === undefined) {
      throw new Error('Invalid serialized data provided')
    }
    
    if (options.validateBeforeSerialize) {
      validateData(data, options)
    }
    
    // Normaliser les données
    let processedData = data
    if (options.normalizeTypes || options.optimizeTypes || options.convertUndefinedToNull) {
      processedData = normalizeData(data, options)
    }
    
    // Filtrer les données
    if (!options.includeNullValues || !options.includeEmptyValues) {
      processedData = filterData(processedData, options)
    }
    
    // Sérialiser selon le niveau
    let serialized: string
    
    if (options.serializationLevel === 'basic') {
      // Sérialisation basique (objets plats seulement)
      if (typeof processedData === 'object' && processedData !== null && !Array.isArray(processedData)) {
        const flatObject: any = {}
        for (const [key, value] of Object.entries(processedData)) {
          if (typeof value !== 'object' || value === null) {
            flatObject[key] = value
          }
        }
        serialized = serializePHP(flatObject)
      } else {
        serialized = serializePHP(processedData)
      }
    } else if (options.serializationLevel === 'deep') {
      // Sérialisation récursive (objets imbriqués)
      serialized = serializePHP(processedData)
    } else {
      // Sérialisation personnalisée
      serialized = serializePHP(processedData)
    }
    
    // Appliquer la compression
    serialized = applyCompression(serialized, options)
    
    // Formater pour la lisibilité
    serialized = formatOutput(serialized, options)
    
    return serialized
    
  } catch (error) {
    console.error('PHP serialization error:', error)
    throw new Error(`Failed to serialize PHP data: ${error instanceof Error ? error.message : 'Invalid data'}`)
  }
}

/**
 * Désérialise les données PHP avec les options spécifiées
 */
export function unserializePHPWithOptions(serialized: string, options: PHPOptions = defaultPHPOptions): any {
  try {
    if (!serialized || typeof serialized !== 'string') {
      throw new Error('Invalid serialized data provided')
    }
    
    const trimmed = serialized.trim()
    if (!trimmed) {
      throw new Error('Empty serialized data provided')
    }
    
    // Désérialiser
    const data = unserializePHP(trimmed)
    
    // Appliquer les options de post-traitement
    let processedData = data
    
    if (options.normalizeTypes) {
      // Dénormaliser les types si nécessaire
      processedData = normalizeData(data, { ...options, normalizeTypes: false })
    }
    
    return processedData
    
  } catch (error) {
    console.error('PHP unserialization error:', error)
    throw new Error(`Failed to unserialize PHP data: ${error instanceof Error ? error.message : 'Invalid serialized data'}`)
  }
}

// Import des fonctions existantes
import { serializePHP, unserializePHP } from './php-serializer'
