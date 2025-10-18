/**
 * Minifie le code JSON en supprimant les espaces inutiles
 */
export function minifyJSON(code: string): string {
    try {
        if (!code || typeof code !== 'string') {
            throw new Error('Invalid JSON code provided')
        }
        
        // Parse le JSON pour valider la syntaxe
        const parsed = JSON.parse(code)
        
        // Stringify avec minification (pas d'espaces)
        return JSON.stringify(parsed)
    } catch (error) {
        console.error('JSON minification error:', error)
        throw new Error(`Failed to minify JSON code: ${error instanceof Error ? error.message : 'Invalid JSON syntax'}`)
    }
}
