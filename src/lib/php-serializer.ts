/**
 * Fonctions de sérialisation PHP (serialize/unserialize)
 * Implémentation basique des formats de sérialisation PHP
 */

export function serializePHP(data: any): string {
    try {
        if (data === null) return 'N;'
        if (data === undefined) return 'N;'
        
        if (typeof data === 'boolean') {
            return data ? 'b:1;' : 'b:0;'
        }
        
        if (typeof data === 'number') {
            if (Number.isInteger(data)) {
                return `i:${data};`
            } else {
                return `d:${data};`
            }
        }
        
        if (typeof data === 'string') {
            return `s:${data.length}:"${data}";`
        }
        
        if (Array.isArray(data)) {
            let result = `a:${data.length}:{`
            data.forEach((value, index) => {
                result += `i:${index};`
                result += serializePHP(value)
            })
            result += '}'
            return result
        }
        
        if (typeof data === 'object') {
            const keys = Object.keys(data)
            let result = `a:${keys.length}:{`
            keys.forEach(key => {
                result += serializePHP(key)
                result += serializePHP(data[key])
            })
            result += '}'
            return result
        }
        
        throw new Error('Unsupported data type for PHP serialization')
    } catch (error) {
        console.error('PHP serialization error:', error)
        throw new Error(`Failed to serialize PHP data: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}

export function unserializePHP(serialized: string): any {
    try {
        if (!serialized || typeof serialized !== 'string') {
            throw new Error('Invalid serialized data provided')
        }
        
        const trimmed = serialized.trim()
        if (trimmed === 'N;') return null
        
        // Parser simple pour les types de base
        if (trimmed.startsWith('b:')) {
            const match = trimmed.match(/^b:([01]);$/)
            if (match) return match[1] === '1'
            throw new Error('Invalid boolean format')
        }
        
        if (trimmed.startsWith('i:')) {
            const match = trimmed.match(/^i:(-?\d+);$/)
            if (match) return parseInt(match[1], 10)
            throw new Error('Invalid integer format')
        }
        
        if (trimmed.startsWith('d:')) {
            const match = trimmed.match(/^d:(-?\d+\.?\d*);$/)
            if (match) return parseFloat(match[1])
            throw new Error('Invalid double format')
        }
        
        if (trimmed.startsWith('s:')) {
            const match = trimmed.match(/^s:(\d+):"([^"]*)";$/)
            if (match) return match[2]
            throw new Error('Invalid string format')
        }
        
        if (trimmed.startsWith('a:')) {
            // Parser simplifié pour les arrays/objets
            // Dans une implémentation complète, il faudrait un parser plus robuste
            throw new Error('Complex PHP serialized data requires a more advanced parser')
        }
        
        throw new Error('Unsupported PHP serialized format')
    } catch (error) {
        console.error('PHP unserialization error:', error)
        throw new Error(`Failed to unserialize PHP data: ${error instanceof Error ? error.message : 'Invalid format'}`)
    }
}

/**
 * Détecte si une chaîne ressemble à du PHP sérialisé
 */
export function isPHPSerialized(data: string): boolean {
    if (!data || typeof data !== 'string') return false
    
    const trimmed = data.trim()
    
    // Patterns de base pour la détection
    const patterns = [
        /^[bids]:[^;]+;$/,
        /^a:\d+:\{.*\}$/,
        /^O:\d+:"[^"]+":\d+:\{.*\}$/,
        /^N;$/
    ]
    
    return patterns.some(pattern => pattern.test(trimmed))
}

