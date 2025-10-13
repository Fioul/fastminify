import * as csso from 'csso'

export async function minifyCSS(code: string) {
    try {
        if (!code || typeof code !== 'string') {
            throw new Error('Invalid CSS code provided')
        }
        
        const result = csso.minify(code)
        
        // CSSO retourne un objet avec une propriété 'css'
        if (!result || typeof result !== 'object' || !('css' in result)) {
            throw new Error('CSSO returned invalid result')
        }
        
        // Retourner le CSS même s'il est vide (cas valide)
        return result.css || ''
    } catch (error) {
        console.error('CSS minification error:', error)
        throw new Error(`Failed to minify CSS code: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}
