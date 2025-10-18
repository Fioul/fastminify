export interface PHPOptions {
  // Gestion des valeurs
  includeNullValues: boolean
  removeEmptyArrays: boolean
  removeEmptyObjects: boolean
  
  // Options de formatage
  sortKeys: boolean
}

export const defaultPHPOptions: PHPOptions = {
  includeNullValues: true,
  removeEmptyArrays: false,
  removeEmptyObjects: false,
  sortKeys: false
}

/**
 * Supprime les tableaux vides
 */
function removeEmptyArrays(obj: any, options: PHPOptions): any {
  if (obj === null || obj === undefined) return obj
  
  if (Array.isArray(obj)) {
    if (options.removeEmptyArrays && obj.length === 0) {
      return undefined // Marquer pour suppression
    }
    return obj.map(item => removeEmptyArrays(item, options)).filter(item => item !== undefined)
  }
  
  if (typeof obj === 'object') {
    const result: any = {}
    for (const [key, value] of Object.entries(obj)) {
      const processedValue = removeEmptyArrays(value, options)
      if (processedValue !== undefined) {
        result[key] = processedValue
      }
    }
    return result
  }
  
  return obj
}

/**
 * Supprime les objets vides
 */
function removeEmptyObjects(obj: any, options: PHPOptions): any {
  if (obj === null || obj === undefined) return obj
  
  if (Array.isArray(obj)) {
    return obj.map(item => removeEmptyObjects(item, options))
  }
  
  if (typeof obj === 'object') {
    const result: any = {}
    for (const [key, value] of Object.entries(obj)) {
      const processedValue = removeEmptyObjects(value, options)
      if (processedValue !== undefined) {
        // Vérifier si l'objet est vide après traitement
        if (typeof processedValue === 'object' && processedValue !== null && !Array.isArray(processedValue)) {
          if (options.removeEmptyObjects && Object.keys(processedValue).length === 0) {
            continue // Supprimer l'objet vide
          }
        }
        result[key] = processedValue
      }
    }
    return result
  }
  
  return obj
}

/**
 * Trie les clés d'objets
 */
function sortKeys(obj: any, options: PHPOptions): any {
  if (obj === null || obj === undefined) return obj
  
  if (Array.isArray(obj)) {
    return obj.map(item => sortKeys(item, options))
  }
  
  if (typeof obj === 'object') {
    const sortedKeys = Object.keys(obj).sort()
    const result: any = {}
    for (const key of sortedKeys) {
      result[key] = sortKeys(obj[key], options)
    }
    return result
  }
  
  return obj
}

/**
 * Filtre les valeurs nulles
 */
function filterNullValues(data: any, options: PHPOptions): any {
  if (data === null) {
    return options.includeNullValues ? data : undefined
  }
  
  if (Array.isArray(data)) {
    const filtered = data.map(item => filterNullValues(item, options)).filter(item => item !== undefined)
    return filtered.length > 0 ? filtered : undefined
  }
  
  if (typeof data === 'object') {
    const filtered: any = {}
    for (const [key, value] of Object.entries(data)) {
      const filteredValue = filterNullValues(value, options)
      if (filteredValue !== undefined) {
        filtered[key] = filteredValue
      }
    }
    return Object.keys(filtered).length > 0 ? filtered : undefined
  }
  
  return data
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
    
    // Appliquer les transformations
    let processedData = data
    
    // Supprimer les valeurs nulles si demandé
    if (!options.includeNullValues) {
      processedData = filterNullValues(processedData, options)
    }
    
    // Supprimer les tableaux vides si demandé
    if (options.removeEmptyArrays) {
      processedData = removeEmptyArrays(processedData, options)
    }
    
    // Supprimer les objets vides si demandé
    if (options.removeEmptyObjects) {
      processedData = removeEmptyObjects(processedData, options)
    }
    
    // Trier les clés si demandé
    if (options.sortKeys) {
      processedData = sortKeys(processedData, options)
    }
    
    // Sérialiser
    const serialized = serializePHP(processedData)
    
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
    
    // Désérialiser
    const data = unserializePHP(serialized)
    
    // Appliquer les transformations (même logique que pour la sérialisation)
    let processedData = data
    
    // Supprimer les valeurs nulles si demandé
    if (!options.includeNullValues) {
      processedData = filterNullValues(processedData, options)
    }
    
    // Supprimer les tableaux vides si demandé
    if (options.removeEmptyArrays) {
      processedData = removeEmptyArrays(processedData, options)
    }
    
    // Supprimer les objets vides si demandé
    if (options.removeEmptyObjects) {
      processedData = removeEmptyObjects(processedData, options)
    }
    
    // Trier les clés si demandé
    if (options.sortKeys) {
      processedData = sortKeys(processedData, options)
    }
    
    return processedData
    
  } catch (error) {
    console.error('PHP unserialization error:', error)
    throw new Error(`Failed to unserialize PHP data: ${error instanceof Error ? error.message : 'Invalid format'}`)
  }
}

// Import des fonctions de sérialisation de base
import { serializePHP, unserializePHP } from './php-serializer'