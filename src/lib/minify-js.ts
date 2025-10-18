import * as Terser from 'terser'

export async function minifyJS(code: string, aggressive = false) {
    try {
        const result = await Terser.minify(code, {
            compress: aggressive,
            mangle: aggressive,
            ecma: 2020,
        })
        
        if (result.error) {
            throw new Error(result.error.message)
        }
        
        return result.code || ''
    } catch (error) {
        console.error('JS minification error:', error)
        throw new Error('Failed to minify JavaScript code')
    }
}
