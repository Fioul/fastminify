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
            return parseArray(trimmed)
        }
        
        throw new Error('Unsupported PHP serialized format')
    } catch (error) {
        console.error('PHP unserialization error:', error)
        throw new Error(`Failed to unserialize PHP data: ${error instanceof Error ? error.message : 'Invalid format'}`)
    }
}

/**
 * Parse un array PHP sérialisé
 */
function parseArray(serialized: string): any {
    const arrayMatch = serialized.match(/^a:(\d+):\{/)
    if (!arrayMatch) {
        throw new Error('Invalid array format')
    }
    
    const length = parseInt(arrayMatch[1], 10)
    const content = serialized.slice(arrayMatch[0].length, -1) // Enlever 'a:X:{' et '}'
    
    const result: any = {}
    let pos = 0
    let keyCount = 0
    
    while (pos < content.length && keyCount < length) {
        // Parser la clé
        const key = parseValue(content, pos)
        pos = key.endPos
        
        // Parser la valeur
        const value = parseValue(content, pos)
        pos = value.endPos
        
        result[key.value] = value.value
        keyCount++
    }
    
    // Si toutes les clés sont numériques et séquentielles, retourner un array
    const keys = Object.keys(result)
    const numericKeys = keys.map(k => parseInt(k, 10)).filter(k => !isNaN(k))
    const isSequential = numericKeys.length === keys.length && 
                        numericKeys.every((k, i) => k === i)
    
    if (isSequential) {
        return numericKeys.map(k => result[k])
    }
    
    return result
}

/**
 * Parse une valeur PHP sérialisée à partir d'une position donnée
 */
function parseValue(content: string, startPos: number): { value: any, endPos: number } {
    let pos = startPos
    
    // Skip whitespace
    while (pos < content.length && /\s/.test(content[pos])) {
        pos++
    }
    
    if (pos >= content.length) {
        throw new Error('Unexpected end of content')
    }
    
    // Boolean
    if (content.slice(pos).startsWith('b:')) {
        const match = content.slice(pos).match(/^b:([01]);/)
        if (match) {
            return {
                value: match[1] === '1',
                endPos: pos + match[0].length
            }
        }
        throw new Error('Invalid boolean format')
    }
    
    // Integer
    if (content.slice(pos).startsWith('i:')) {
        const match = content.slice(pos).match(/^i:(-?\d+);/)
        if (match) {
            return {
                value: parseInt(match[1], 10),
                endPos: pos + match[0].length
            }
        }
        throw new Error('Invalid integer format')
    }
    
    // Double
    if (content.slice(pos).startsWith('d:')) {
        const match = content.slice(pos).match(/^d:(-?\d+\.?\d*);/)
        if (match) {
            return {
                value: parseFloat(match[1]),
                endPos: pos + match[0].length
            }
        }
        throw new Error('Invalid double format')
    }
    
    // String
    if (content.slice(pos).startsWith('s:')) {
        const match = content.slice(pos).match(/^s:(\d+):"([^"]*)";/)
        if (match) {
            return {
                value: match[2],
                endPos: pos + match[0].length
            }
        }
        throw new Error('Invalid string format')
    }
    
    // Array
    if (content.slice(pos).startsWith('a:')) {
        const arrayMatch = content.slice(pos).match(/^a:(\d+):\{/)
        if (!arrayMatch) {
            throw new Error('Invalid array format')
        }
        
        const arrayLength = parseInt(arrayMatch[1], 10)
        const arrayStart = pos + arrayMatch[0].length
        let arrayPos = arrayStart
        let braceCount = 1
        let arrayEnd = arrayStart
        
        // Trouver la fin de l'array en comptant les accolades
        while (arrayPos < content.length && braceCount > 0) {
            if (content[arrayPos] === '{') braceCount++
            else if (content[arrayPos] === '}') braceCount--
            arrayPos++
        }
        
        if (braceCount !== 0) {
            throw new Error('Unclosed array')
        }
        
        arrayEnd = arrayPos - 1
        const arrayContent = content.slice(arrayStart, arrayEnd)
        
        const result: any = {}
        let parsePos = 0
        let keyCount = 0
        
        while (parsePos < arrayContent.length && keyCount < arrayLength) {
            const key = parseValue(arrayContent, parsePos)
            parsePos = key.endPos
            
            const value = parseValue(arrayContent, parsePos)
            parsePos = value.endPos
            
            result[key.value] = value.value
            keyCount++
        }
        
        // Si toutes les clés sont numériques et séquentielles, retourner un array
        const keys = Object.keys(result)
        const numericKeys = keys.map(k => parseInt(k, 10)).filter(k => !isNaN(k))
        const isSequential = numericKeys.length === keys.length && 
                            numericKeys.every((k, i) => k === i)
        
        const arrayValue = isSequential ? numericKeys.map(k => result[k]) : result
        
        return {
            value: arrayValue,
            endPos: arrayPos
        }
    }
    
    // Null
    if (content.slice(pos).startsWith('N;')) {
        return {
            value: null,
            endPos: pos + 2
        }
    }
    
    throw new Error(`Unknown format at position ${pos}: ${content.slice(pos, pos + 10)}`)
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

