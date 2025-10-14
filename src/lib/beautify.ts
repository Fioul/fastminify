/**
 * Fonctions de beautify/formatage pour différents langages
 */

export function beautifyJS(code: string): string {
    try {
        if (!code || typeof code !== 'string') {
            throw new Error('Invalid JavaScript code provided')
        }
        
        // Beautify simple pour JavaScript
        let beautified = code
            // Ajouter des retours à la ligne après les points-virgules
            .replace(/;(\s*)/g, ';\n$1')
            // Ajouter des retours à la ligne après les accolades ouvrantes
            .replace(/\{\s*/g, '{\n  ')
            // Ajouter des retours à la ligne avant les accolades fermantes
            .replace(/\s*\}/g, '\n}')
            // Ajouter des retours à la ligne après les virgules dans les objets/arrays
            .replace(/,(\s*)(?=[^}])/g, ',\n$1')
            // Ajouter des retours à la ligne après les mots-clés
            .replace(/\b(function|if|else|for|while|switch|case|try|catch|finally|class|const|let|var)\b/g, '\n$1')
            // Nettoyer les lignes vides multiples
            .replace(/\n\s*\n\s*\n/g, '\n\n')
            .trim()
        
        // Indenter proprement
        const lines = beautified.split('\n')
        let indentLevel = 0
        const indentedLines = lines.map(line => {
            const trimmed = line.trim()
            if (!trimmed) return ''
            
            // Réduire l'indentation avant les accolades fermantes
            if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
                indentLevel = Math.max(0, indentLevel - 1)
            }
            
            const indented = '  '.repeat(indentLevel) + trimmed
            
            // Augmenter l'indentation après les accolades ouvrantes
            if (trimmed.endsWith('{') || trimmed.endsWith('[') || trimmed.endsWith('(')) {
                indentLevel++
            }
            
            return indented
        })
        
        return indentedLines.join('\n')
    } catch (error) {
        console.error('JS beautify error:', error)
        throw new Error(`Failed to beautify JavaScript: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}

export function beautifyCSS(code: string): string {
    try {
        if (!code || typeof code !== 'string') {
            throw new Error('Invalid CSS code provided')
        }
        
        // Beautify simple pour CSS
        let beautified = code
            // Ajouter des retours à la ligne après les accolades ouvrantes
            .replace(/\{\s*/g, '{\n  ')
            // Ajouter des retours à la ligne avant les accolades fermantes
            .replace(/\s*\}/g, '\n}')
            // Ajouter des retours à la ligne après les points-virgules
            .replace(/;(\s*)(?=[^}])/g, ';\n  ')
            // Ajouter des retours à la ligne après les virgules dans les sélecteurs
            .replace(/,(\s*)(?=[^{])/g, ',\n$1')
            // Nettoyer les espaces multiples
            .replace(/\s+/g, ' ')
            // Nettoyer les lignes vides multiples
            .replace(/\n\s*\n\s*\n/g, '\n\n')
            .trim()
        
        // Indenter proprement
        const lines = beautified.split('\n')
        let indentLevel = 0
        const indentedLines = lines.map(line => {
            const trimmed = line.trim()
            if (!trimmed) return ''
            
            // Réduire l'indentation avant les accolades fermantes
            if (trimmed.startsWith('}')) {
                indentLevel = Math.max(0, indentLevel - 1)
            }
            
            const indented = '  '.repeat(indentLevel) + trimmed
            
            // Augmenter l'indentation après les accolades ouvrantes
            if (trimmed.endsWith('{')) {
                indentLevel++
            }
            
            return indented
        })
        
        return indentedLines.join('\n')
    } catch (error) {
        console.error('CSS beautify error:', error)
        throw new Error(`Failed to beautify CSS: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}

export function beautifyJSON(code: string): string {
    try {
        if (!code || typeof code !== 'string') {
            throw new Error('Invalid JSON code provided')
        }
        
        // Parser et reformater le JSON
        const parsed = JSON.parse(code)
        return JSON.stringify(parsed, null, 2)
    } catch (error) {
        console.error('JSON beautify error:', error)
        throw new Error(`Failed to beautify JSON: ${error instanceof Error ? error.message : 'Invalid JSON syntax'}`)
    }
}

export function beautifyPHP(code: string): string {
    try {
        if (!code || typeof code !== 'string') {
            throw new Error('Invalid PHP code provided')
        }
        
        // Beautify simple pour PHP sérialisé
        let beautified = code
            // Ajouter des retours à la ligne après les points-virgules
            .replace(/;(\s*)/g, ';\n$1')
            // Ajouter des retours à la ligne après les accolades ouvrantes
            .replace(/\{\s*/g, '{\n  ')
            // Ajouter des retours à la ligne avant les accolades fermantes
            .replace(/\s*\}/g, '\n}')
            // Nettoyer les lignes vides multiples
            .replace(/\n\s*\n\s*\n/g, '\n\n')
            .trim()
        
        // Indenter proprement
        const lines = beautified.split('\n')
        let indentLevel = 0
        const indentedLines = lines.map(line => {
            const trimmed = line.trim()
            if (!trimmed) return ''
            
            // Réduire l'indentation avant les accolades fermantes
            if (trimmed.startsWith('}')) {
                indentLevel = Math.max(0, indentLevel - 1)
            }
            
            const indented = '  '.repeat(indentLevel) + trimmed
            
            // Augmenter l'indentation après les accolades ouvrantes
            if (trimmed.endsWith('{')) {
                indentLevel++
            }
            
            return indented
        })
        
        return indentedLines.join('\n')
    } catch (error) {
        console.error('PHP beautify error:', error)
        throw new Error(`Failed to beautify PHP: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}

