declare module 'csso' {
    export function minify(
        source: string,
        options?: {
            restructure?: boolean
            comments?: boolean | 'exclamation' | 'first-exclamation'
            sourceMap?: boolean
        }
    ): { css: string }
}
