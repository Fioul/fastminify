/**
 * Détecte le type de code (JavaScript, CSS, JSON ou PHP) basé sur le contenu
 */
export function detectCodeLanguage(code: string): 'js' | 'css' | 'json' | 'php' {
    if (!code || typeof code !== 'string') {
        return 'js' // Par défaut
    }

    const trimmedCode = code.trim()

    // Détection CSS
    const cssPatterns = [
        // Sélecteurs CSS
        /^[.#]?[a-zA-Z][\w-]*\s*\{/,
        // Propriétés CSS
        /:\s*[^;]+;/,
        // @media, @import, @keyframes
        /@(media|import|keyframes|font-face|page|charset)/,
        // Pseudo-classes
        /:hover|:focus|:active|:visited|:link|:before|:after/,
        // Unités CSS
        /(px|em|rem|%|vh|vw|pt|pc|in|cm|mm)\b/,
        // Couleurs CSS
        /#[0-9a-fA-F]{3,6}\b|rgb\(|rgba\(|hsl\(|hsla\(/,
        // Propriétés CSS communes
        /\b(margin|padding|border|width|height|color|background|font|display|position|float|clear|overflow|z-index|opacity|transform|transition|animation)\s*:/,
    ]

    // Détection PHP sérialisé
    const phpPatterns = [
        // Types de base PHP
        /^[bids]:[^;]+;$/,
        // Arrays PHP
        /^a:\d+:\{.*\}$/,
        // Objets PHP
        /^O:\d+:"[^"]+":\d+:\{.*\}$/,
        // Null PHP
        /^N;$/
    ]

    // Détection JSON
    const jsonPatterns = [
        // Début et fin avec accolades ou crochets
        /^[\{\[]/,
        // Propriétés JSON avec guillemets doubles
        /"[^"]*"\s*:/,
        // Valeurs JSON (string, number, boolean, null)
        /:\s*("(?:[^"\\]|\\.)*"|-?\d+\.?\d*|true|false|null)/,
        // Virgules entre éléments
        /,\s*["\{\[]/,
        // Fin avec accolades ou crochets
        /[\}\]]$/,
    ]

    // Détection JavaScript
    const jsPatterns = [
        // Mots-clés JS
        /\b(function|const|let|var|if|else|for|while|return|class|import|export|async|await|try|catch|finally)\b/,
        // Fonctions
        /function\s+\w+\s*\(/,
        // Arrow functions
        /=>/,
        // Objets JS
        /\{[^}]*\}/,
        // Arrays JS
        /\[[^\]]*\]/,
        // Console.log, alert, etc.
        /\b(console|alert|prompt|confirm|setTimeout|setInterval|addEventListener)\b/,
        // Opérateurs JS
        /(===|!==|&&|\|\||!|typeof|instanceof)/,
        // Template literals
        /`[^`]*`/,
        // Semicolons (plus commun en JS)
        /;$/,
    ]

    let cssScore = 0
    let jsScore = 0
    let jsonScore = 0
    let phpScore = 0

    // Compter les patterns CSS
    cssPatterns.forEach(pattern => {
        if (pattern.test(trimmedCode)) {
            cssScore++
        }
    })

    // Compter les patterns PHP
    phpPatterns.forEach(pattern => {
        if (pattern.test(trimmedCode)) {
            phpScore++
        }
    })

    // Compter les patterns JSON
    jsonPatterns.forEach(pattern => {
        if (pattern.test(trimmedCode)) {
            jsonScore++
        }
    })

    // Compter les patterns JS
    jsPatterns.forEach(pattern => {
        if (pattern.test(trimmedCode)) {
            jsScore++
        }
    })

    // Retourner le langage avec le score le plus élevé
    const scores = [
        { lang: 'php', score: phpScore },
        { lang: 'json', score: jsonScore },
        { lang: 'css', score: cssScore },
        { lang: 'js', score: jsScore }
    ]
    
    const maxScore = Math.max(...scores.map(s => s.score))
    const winner = scores.find(s => s.score === maxScore)
    
    return winner?.lang as 'js' | 'css' | 'json' | 'php' || 'js'
}
