/**
 * Fonctions d'unminify (déminification) pour différents langages
 */

export function unminifyJS(code: string): string {
    try {
        if (!code || typeof code !== 'string') {
            throw new Error('Invalid JavaScript code provided')
        }
        
        // Unminify simple pour JavaScript
        let unminified = code
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
        const lines = unminified.split('\n')
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
        console.error('JS unminify error:', error)
        throw new Error(`Failed to unminify JavaScript: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}

export function unminifyCSS(code: string): string {
    try {
        if (!code || typeof code !== 'string') {
            throw new Error('Invalid CSS code provided')
        }
        
        // Approche plus robuste pour unminify CSS
        let result = code.trim()
        
        // Étape 1: Séparer les règles CSS principales
        result = result
            // Ajouter des retours à la ligne avant les accolades fermantes
            .replace(/\}/g, '\n}')
            // Ajouter des retours à la ligne après les accolades ouvrantes
            .replace(/\{/g, '{\n')
            // Ajouter des retours à la ligne après les points-virgules
            .replace(/;/g, ';\n')
            // Nettoyer les espaces multiples
            .replace(/\s+/g, ' ')
            .trim()
        
        // Étape 2: Traiter ligne par ligne
        const lines = result.split('\n')
        const processedLines: string[] = []
        let indentLevel = 0
        
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim()
            if (!line) continue
            
            // Gérer les accolades fermantes
            if (line === '}') {
                indentLevel = Math.max(0, indentLevel - 1)
                processedLines.push('  '.repeat(indentLevel) + line)
                continue
            }
            
            // Gérer les accolades ouvrantes
            if (line.endsWith('{')) {
                processedLines.push('  '.repeat(indentLevel) + line)
                indentLevel++
                continue
            }
            
            // Gérer les propriétés CSS (lignes avec :)
            if (line.includes(':')) {
                processedLines.push('  '.repeat(indentLevel) + line)
                continue
            }
            
            // Gérer les sélecteurs (lignes sans : et sans {)
            if (!line.includes(':') && !line.includes('{')) {
                // Si c'est un sélecteur, vérifier s'il y a une virgule
                if (line.includes(',')) {
                    // Séparer les sélecteurs multiples
                    const selectors = line.split(',').map(s => s.trim())
                    selectors.forEach((selector, index) => {
                        if (index > 0) {
                            processedLines.push('')
                        }
                        processedLines.push('  '.repeat(indentLevel) + selector)
                    })
                } else {
                    processedLines.push('  '.repeat(indentLevel) + line)
                }
                continue
            }
            
            // Ligne par défaut
            processedLines.push('  '.repeat(indentLevel) + line)
        }
        
        // Nettoyer les lignes vides multiples
        const finalResult = processedLines
            .join('\n')
            .replace(/\n\s*\n\s*\n/g, '\n\n')
            .trim()
        
        return finalResult
    } catch (error) {
        console.error('CSS unminify error:', error)
        throw new Error(`Failed to unminify CSS: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}

export function unminifyJSON(code: string): string {
    try {
        if (!code || typeof code !== 'string') {
            throw new Error('Invalid JSON code provided')
        }
        
        // Parser et reformater le JSON
        const parsed = JSON.parse(code)
        return JSON.stringify(parsed, null, 2)
    } catch (error) {
        console.error('JSON unminify error:', error)
        throw new Error(`Failed to unminify JSON: ${error instanceof Error ? error.message : 'Invalid JSON syntax'}`)
    }
}

export function unminifyPHP(code: string): string {
    try {
        if (!code || typeof code !== 'string') {
            throw new Error('Invalid PHP code provided')
        }
        
        // Unminify simple pour PHP sérialisé
        let unminified = code
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
        const lines = unminified.split('\n')
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
        console.error('PHP unminify error:', error)
        throw new Error(`Failed to unminify PHP: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}
