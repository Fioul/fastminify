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
        
        let result = code.trim()
        
        // Étape 1: Séparer les règles CSS en utilisant les accolades comme délimiteurs
        // D'abord, on sépare les règles CSS principales
        const rules: string[] = []
        let currentRule = ''
        let braceCount = 0
        let inComment = false
        
        for (let i = 0; i < result.length; i++) {
            const char = result[i]
            const nextChar = result[i + 1]
            
            // Gérer les commentaires
            if (char === '/' && nextChar === '*') {
                inComment = true
                currentRule += char
                continue
            }
            if (inComment && char === '*' && nextChar === '/') {
                inComment = false
                currentRule += char + nextChar
                i++ // Skip next char
                continue
            }
            
            if (inComment) {
                currentRule += char
                continue
            }
            
            currentRule += char
            
            if (char === '{') {
                braceCount++
            } else if (char === '}') {
                braceCount--
                if (braceCount === 0) {
                    rules.push(currentRule.trim())
                    currentRule = ''
                }
            }
        }
        
        // Étape 2: Traiter chaque règle
        const processedRules: string[] = []
        
        for (const rule of rules) {
            if (!rule) continue
            
            // Séparer le sélecteur du contenu
            const braceIndex = rule.indexOf('{')
            if (braceIndex === -1) continue
            
            const selector = rule.substring(0, braceIndex).trim()
            const content = rule.substring(braceIndex + 1, rule.lastIndexOf('}')).trim()
            
            // Traiter le sélecteur - séparer les sélecteurs multiples
            const selectors = selector.split(',').map(s => s.trim())
            
            // Traiter le contenu - séparer les propriétés
            const properties = content.split(';').map(p => p.trim()).filter(p => p)
            
            // Construire la règle formatée
            let formattedRule = ''
            
            // Ajouter les sélecteurs
            selectors.forEach((sel, index) => {
                if (index > 0) {
                    formattedRule += ',\n'
                }
                formattedRule += sel
            })
            
            formattedRule += ' {\n'
            
            // Ajouter les propriétés
            properties.forEach(prop => {
                formattedRule += '  ' + prop + ';\n'
            })
            
            formattedRule += '}'
            
            processedRules.push(formattedRule)
        }
        
        return processedRules.join('\n\n')
        
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
