import * as csso from 'csso'

export async function minifyCSS(code: string) {
    const result = csso.minify(code)
    return result.css
}
