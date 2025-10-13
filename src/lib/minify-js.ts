import * as Terser from 'terser'

export async function minifyJS(code: string, aggressive = false) {
    const result = await Terser.minify(code, {
        compress: aggressive,
        mangle: aggressive,
        ecma: 2020,
    })
    return result.code || ''
}
