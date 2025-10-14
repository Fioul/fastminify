/**
 * Détecte le type de code (JavaScript, CSS ou JSON) basé sur le contenu
 */
export function detectCodeLanguage(code: string): 'js' | 'css' | 'json' {
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

    // Compter les patterns CSS
    cssPatterns.forEach(pattern => {
        if (pattern.test(trimmedCode)) {
            cssScore++
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
    if (jsonScore > cssScore && jsonScore > jsScore) {
        return 'json'
    }
    return cssScore > jsScore ? 'css' : 'js'
}
