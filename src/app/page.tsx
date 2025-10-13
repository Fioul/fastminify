'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import CodeEditor from '@/components/CodeEditor'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { minifyJS } from '@/lib/minify-js'
import { minifyCSS } from '@/lib/minify-css'
import { detectCodeLanguage } from '@/lib/detect-language'

export default function Page() {
    // State for code input and minified result
    const [code, setCode] = useState('')
    const [result, setResult] = useState('')
    const [stats, setStats] = useState<{ original: number; minified: number } | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showFloatingAd, setShowFloatingAd] = useState(true)

    // Minification options configuration
    const [options, setOptions] = useState({
        type: 'js' as 'js' | 'css',
        aggressive: false,
        compatibility: 'es6' as 'es5' | 'es6',
    })

    // Main minification handler
    const handleMinify = async () => {
        if (!code.trim()) {
            toast.error('Please paste some code first.')
            return
        }

        setIsLoading(true)

        try {
            let minified = ''
            // Choose minifier based on selected type
            if (options.type === 'js') {
                minified = await minifyJS(code, options.aggressive)
            } else {
                minified = await minifyCSS(code)
            }

            setResult(minified)
            setStats({
                original: code.length,
                minified: minified.length,
            })

            toast.success('Code minified successfully!')
        } catch (err) {
            console.error(err)
            toast.error('An error occurred during minification.')
        } finally {
            setIsLoading(false)
        }
    }

    // Fallback copy method for older browsers
    const fallbackCopy = (text: string) => {
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        try {
            document.execCommand('copy')
            toast.success('Copied to clipboard!')
        } catch (err) {
            toast.error('Unable to copy.')
        }
        document.body.removeChild(textarea)
    }

    // Auto-detect language when code changes
    const handleCodeChange = (value: string) => {
        setCode(value)
        
        // Auto-detect language if code is not empty
        if (value.trim()) {
            const detectedLanguage = detectCodeLanguage(value)
            if (detectedLanguage !== options.type) {
                setOptions(prev => ({ ...prev, type: detectedLanguage }))
                toast.success(`Language auto-detected: ${detectedLanguage === 'js' ? 'JavaScript' : 'CSS'}`)
            }
        }
    }

    // Copy result to clipboard with fallback
    const handleCopy = async () => {
        if (!result) return
        if (navigator?.clipboard) {
            try {
                await navigator.clipboard.writeText(result)
                toast.success('Copied to clipboard!')
            } catch {
                fallbackCopy(result)
            }
        } else {
            fallbackCopy(result)
        }
    }

    // Beautify minified code
    const handleBeautify = () => {
        if (!result) return
        
        try {
            // Simple beautify for demonstration (in real app, use a proper beautifier)
            const beautified = result
                .replace(/;/g, ';\n')
                .replace(/\{/g, '{\n  ')
                .replace(/\}/g, '\n}')
                .replace(/,\s*/g, ',\n  ')
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0)
                .join('\n')
            
            setResult(beautified)
            toast.success('Code beautified!')
        } catch (err) {
            toast.error('Failed to beautify code')
        }
    }

    // Download result as file
    const handleDownload = () => {
        if (!result) return
        
        const blob = new Blob([result], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `minified.${options.type}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        toast.success('File downloaded!')
    }

    return (
        <div className="container max-w-[1440px] mx-auto px-4 py-10">
            {/* HERO SECTION */}
            <div className="text-center space-y-2 mb-8">
                <h1 className="text-3xl font-bold">Minify Your Code</h1>
                <p className="text-muted-foreground">
                    Minify your JavaScript or CSS instantly — free, fast, and private.
                </p>
            </div>

            {/* TOOLBAR - Centered with max width */}
            <div className="flex justify-center mb-6">
                <Card className="p-4 bg-muted/30 w-full max-w-4xl">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex flex-wrap gap-4 items-center">
                        <div>
                            <Label className="text-sm font-medium">Code</Label>
                            <Select
                                value={options.type}
                                onValueChange={(v) => setOptions({ ...options, type: v as 'js' | 'css' })}
                            >
                                <SelectTrigger className="w-[120px] h-9">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="js">JavaScript</SelectItem>
                                    <SelectItem value="css">CSS</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                            <div>
                                <Label className="text-sm font-medium">Compatibility</Label>
                                <Select
                                    value={options.compatibility}
                                    onValueChange={(v) => setOptions({ ...options, compatibility: v })}
                                >
                                    <SelectTrigger className="w-[120px] h-9">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="es5">ES5</SelectItem>
                                        <SelectItem value="es6">ES6+</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-2">
                                <Switch
                                    checked={options.aggressive}
                                    onCheckedChange={(v) => setOptions({ ...options, aggressive: v })}
                                />
                                <Label className="text-sm font-medium">Aggressive</Label>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button onClick={handleMinify} disabled={isLoading} size="sm">
                                {isLoading ? 'Minifying…' : 'Minify'}
                            </Button>
                            <Button variant="outline" onClick={handleBeautify} disabled={!result} size="sm">
                                Beautify
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>

            {/* MAIN CONTENT - 2 COLUMNS LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* LEFT AD PLACEHOLDER */}
                <div className="hidden xl:block xl:col-span-2">
                    <div className="sticky top-24">
                        <div className="bg-muted/50 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                            <div className="text-muted-foreground text-sm">
                                <div className="w-[160px] h-[600px] mx-auto bg-muted/30 rounded flex items-center justify-center">
                                    <span className="text-xs">Ad Space<br/>160x600</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* INPUT AREA */}
                <div className="lg:col-span-5 xl:col-span-4">
                    <div className="h-[600px] flex flex-col">
                        <Label className="text-sm font-medium mb-2">Your code</Label>
                        <CodeEditor
                            value={code}
                            onChange={handleCodeChange}
                            language={options.type === 'js' ? 'javascript' : 'css'}
                            placeholder="Paste or drop your JS / CSS code here..."
                            height="100%"
                        />
                    </div>
                </div>

                {/* RESULT AREA */}
                <div className="lg:col-span-5 xl:col-span-4">
                    <div className="h-[600px] flex flex-col">
                        <Label className="text-sm font-medium mb-2">Result</Label>
                        <div className="flex-1">
                            {result ? (
                                <CodeEditor
                                    value={result}
                                    onChange={() => {}} // Read-only
                                    language={options.type === 'js' ? 'javascript' : 'css'}
                                    placeholder="Minified result will appear here"
                                    height="100%"
                                    readOnly={true}
                                />
                            ) : (
                                <div className="h-full flex items-center justify-center text-muted-foreground border rounded-md bg-muted/30">
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">⚡</div>
                                        <p>Minified result will appear here</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT AD PLACEHOLDER */}
                <div className="hidden xl:block xl:col-span-2">
                    <div className="sticky top-24">
                        <div className="bg-muted/50 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                            <div className="text-muted-foreground text-sm">
                                <div className="w-[160px] h-[600px] mx-auto bg-muted/30 rounded flex items-center justify-center">
                                    <span className="text-xs">Ad Space<br/>160x600</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* STATS AND ACTIONS - Below the main content */}
            {stats && (
                <Card className="border mt-8">
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-muted-foreground">Original:</span>
                                    <span className="ml-2 font-medium">{stats.original} chars</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Minified:</span>
                                    <span className="ml-2 font-medium">{stats.minified} chars</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <span className="text-green-600 font-semibold text-lg">
                                    Saved: {((1 - stats.minified / stats.original) * 100).toFixed(1)}%
                                </span>
                                <Progress
                                    value={Number(((1 - stats.minified / stats.original) * 100).toFixed(1))}
                                    className="h-2 mt-2"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleCopy} className="flex-1" size="sm">
                                    Copy Result
                                </Button>
                                <Button variant="outline" onClick={handleDownload} className="flex-1" size="sm">
                                    Download
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* BOTTOM BANNER AD - Static version for mobile */}
            <div className="mt-8 flex justify-center xl:hidden">
                <div className="bg-muted/50 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <div className="text-muted-foreground text-sm">
                        <div className="w-[320px] h-[50px] mx-auto bg-muted/30 rounded flex items-center justify-center">
                            <span className="text-xs">Ad Space<br/>320x50</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* FLOATING BANNER AD - Desktop only */}
            {showFloatingAd && (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t shadow-lg hidden xl:block">
                    <div className="container max-w-[1440px] mx-auto px-4 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex-1 flex justify-center">
                                <div className="bg-muted/50 border-2 border-dashed border-muted-foreground/25 rounded-lg p-3 text-center">
                                    <div className="text-muted-foreground text-sm">
                                        <div className="w-[728px] h-[90px] mx-auto bg-muted/30 rounded flex items-center justify-center">
                                            <span className="text-xs">Floating Ad Space<br/>728x90</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowFloatingAd(false)}
                                className="ml-4 text-muted-foreground hover:text-foreground"
                                aria-label="Close floating ad"
                            >
                                ✕
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add bottom padding to prevent content from being hidden behind floating ad */}
            <div className="h-24 xl:block hidden"></div>
        </div>
    )
}
