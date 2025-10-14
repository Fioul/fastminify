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
import { minifyJSON } from '@/lib/minify-json'
import { serializePHP, unserializePHP } from '@/lib/php-serializer'
import { beautifyJS, beautifyCSS, beautifyJSON, beautifyPHP } from '@/lib/beautify'
import { unminifyJS, unminifyCSS, unminifyJSON, unminifyPHP } from '@/lib/unminify'
import { detectCodeLanguage } from '@/lib/detect-language'

export default function Page() {
    // State for code input and result
    const [leftCode, setLeftCode] = useState('')
    const [rightCode, setRightCode] = useState('')
    const [stats, setStats] = useState<{ original: number; result: number } | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showFloatingAd, setShowFloatingAd] = useState(true)
    const [leftType, setLeftType] = useState<'js' | 'css' | 'json' | 'php'>('js')
    const [rightType, setRightType] = useState<'js' | 'css' | 'json' | 'php'>('js')
    const [autoDetectLeft, setAutoDetectLeft] = useState(true)
    const [autoDetectRight, setAutoDetectRight] = useState(true)

    // Options configuration
    const [options, setOptions] = useState({
        aggressive: false,
        compatibility: 'es6' as 'es5' | 'es6',
    })

    // Process code from left to right (minify)
    const processMinify = async () => {
        const sourceCode = leftCode.trim()
        if (!sourceCode) {
            toast.error('Please paste some code in the left editor first.')
            return
        }

        setIsLoading(true)

        try {
            let processed = ''
            const type = leftType

            if (type === 'js') {
                processed = await minifyJS(sourceCode, options.aggressive)
            } else if (type === 'css') {
                processed = await minifyCSS(sourceCode)
            } else if (type === 'json') {
                processed = minifyJSON(sourceCode)
            } else if (type === 'php') {
                // Pour sérialiser, on doit parser le JSON/JS d'abord
                try {
                    const parsed = JSON.parse(sourceCode)
                    processed = serializePHP(parsed)
                } catch {
                    throw new Error('Invalid JSON/JavaScript object for PHP serialization')
                }
            }

            setRightCode(processed)
            setRightType(type) // Même type que l'input
            setStats({
                original: sourceCode.length,
                result: processed.length,
            })

            toast.success('Code minified successfully!')
        } catch (err) {
            console.error(err)
            toast.error('An error occurred during minification.')
        } finally {
            setIsLoading(false)
        }
    }

    // Process code from right to left (unminify)
    const processUnminify = async () => {
        const sourceCode = rightCode.trim()
        if (!sourceCode) {
            toast.error('Please paste some code in the right editor first.')
            return
        }

        setIsLoading(true)

        try {
            let processed = ''
            const type = rightType

            if (type === 'js') {
                processed = unminifyJS(sourceCode)
            } else if (type === 'css') {
                processed = unminifyCSS(sourceCode)
            } else if (type === 'json') {
                processed = unminifyJSON(sourceCode)
            } else if (type === 'php') {
                const parsed = unserializePHP(sourceCode)
                processed = JSON.stringify(parsed, null, 2)
            }

            setLeftCode(processed)
            setLeftType(type) // Même type que l'input
            setStats({
                original: sourceCode.length,
                result: processed.length,
            })

            toast.success('Code unminified successfully!')
        } catch (err) {
            console.error(err)
            toast.error('An error occurred during unminification.')
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

    // Handle left code changes with optional auto-detection
    const handleLeftCodeChange = (value: string) => {
        setLeftCode(value)
        
        // Auto-detect language if enabled and code is not empty
        if (autoDetectLeft && value.trim()) {
            const detectedLanguage = detectCodeLanguage(value)
            if (detectedLanguage !== leftType) {
                setLeftType(detectedLanguage)
                const languageNames = {
                    'js': 'JavaScript',
                    'css': 'CSS',
                    'json': 'JSON',
                    'php': 'PHP Serialized'
                }
                toast.success(`Left language auto-detected: ${languageNames[detectedLanguage]}`)
            }
        }
    }

    // Handle right code changes with optional auto-detection
    const handleRightCodeChange = (value: string) => {
        setRightCode(value)
        
        // Auto-detect language if enabled and code is not empty
        if (autoDetectRight && value.trim()) {
            const detectedLanguage = detectCodeLanguage(value)
            if (detectedLanguage !== rightType) {
                setRightType(detectedLanguage)
                const languageNames = {
                    'js': 'JavaScript',
                    'css': 'CSS',
                    'json': 'JSON',
                    'php': 'PHP Serialized'
                }
                toast.success(`Right language auto-detected: ${languageNames[detectedLanguage]}`)
            }
        }
    }

    // Copy right code to clipboard with fallback
    const handleCopy = async () => {
        if (!rightCode) return
        if (navigator?.clipboard) {
            try {
                await navigator.clipboard.writeText(rightCode)
                toast.success('Copied to clipboard!')
            } catch {
                fallbackCopy(rightCode)
            }
        } else {
            fallbackCopy(rightCode)
        }
    }

    // Swap left and right code
    const handleSwap = () => {
        const temp = leftCode
        setLeftCode(rightCode)
        setRightCode(temp)
        toast.success('Code swapped!')
    }

    // Download right code as file
    const handleDownload = () => {
        if (!rightCode) return
        
        const extensions = {
            'js': 'js',
            'css': 'css', 
            'json': 'json',
            'php': 'php'
        }
        
        const blob = new Blob([rightCode], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `processed.${extensions[rightType]}`
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
                <h1 className="text-3xl font-bold">Code Minifier</h1>
                <p className="text-muted-foreground">
                    Minify your code from left to right, unminify from right to left — free, fast, and private.
                </p>
            </div>

            {/* TOOLBAR - Action buttons */}
            <div className="flex justify-center mb-6">
                <Card className="p-4 bg-muted/30 w-full max-w-4xl">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex items-end gap-2">
                                <div>
                                    <Label className="text-sm font-medium mb-2 block">Normal Code</Label>
                                    <Select
                                        value={leftType}
                                        onValueChange={(value: 'js' | 'css' | 'json' | 'php') => setLeftType(value)}
                                    >
                                        <SelectTrigger className="w-[140px] h-9">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="js">JavaScript</SelectItem>
                                            <SelectItem value="css">CSS</SelectItem>
                                            <SelectItem value="json">JSON</SelectItem>
                                            <SelectItem value="php">PHP Serialized</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Switch
                                        checked={autoDetectLeft}
                                        onCheckedChange={setAutoDetectLeft}
                                        size="sm"
                                    />
                                    <Label className="text-xs text-muted-foreground">Auto</Label>
                                </div>
                            </div>

                            <div className="flex items-end gap-2">
                                <div>
                                    <Label className="text-sm font-medium mb-2 block">Minified Code</Label>
                                    <Select
                                        value={rightType}
                                        onValueChange={(value: 'js' | 'css' | 'json' | 'php') => setRightType(value)}
                                    >
                                        <SelectTrigger className="w-[140px] h-9">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="js">JavaScript</SelectItem>
                                            <SelectItem value="css">CSS</SelectItem>
                                            <SelectItem value="json">JSON</SelectItem>
                                            <SelectItem value="php">PHP Serialized</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Switch
                                        checked={autoDetectRight}
                                        onCheckedChange={setAutoDetectRight}
                                        size="sm"
                                    />
                                    <Label className="text-xs text-muted-foreground">Auto</Label>
                                </div>
                            </div>

                            {leftType === 'js' && (
                                <>
                                    <div>
                                        <Label className="text-sm font-medium mb-2 block">Compatibility</Label>
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
                                </>
                            )}
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            <Button 
                                onClick={processMinify} 
                                disabled={isLoading || !leftCode.trim()} 
                                size="sm"
                                className="bg-primary text-primary-foreground"
                            >
                                {isLoading ? 'Processing…' : 'Process →'}
                            </Button>
                            <Button 
                                variant="outline" 
                                onClick={processUnminify} 
                                disabled={isLoading || !rightCode.trim()} 
                                size="sm"
                            >
                                ← Unminify
                            </Button>
                            <Button 
                                variant="secondary" 
                                onClick={handleSwap} 
                                disabled={!leftCode.trim() || !rightCode.trim()} 
                                size="sm"
                            >
                                Swap
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

                {/* LEFT EDITOR */}
                <div className="lg:col-span-5 xl:col-span-4">
                    <div className="h-[440px] flex flex-col">
                        <Label className="text-sm font-medium mb-2">Normal Code</Label>
                        <CodeEditor
                            value={leftCode}
                            onChange={handleLeftCodeChange}
                            language={leftType === 'js' ? 'javascript' : 
                                     leftType === 'css' ? 'css' : 
                                     leftType === 'json' ? 'json' : 'php'}
                            placeholder="Paste your normal code here..."
                            height="100%"
                        />
                    </div>
                </div>

                {/* RIGHT EDITOR */}
                <div className="lg:col-span-5 xl:col-span-4">
                    <div className="h-[440px] flex flex-col">
                        <Label className="text-sm font-medium mb-2">Minified Code</Label>
                        <CodeEditor
                            value={rightCode}
                            onChange={handleRightCodeChange}
                            language={rightType === 'js' ? 'javascript' : 
                                     rightType === 'css' ? 'css' : 
                                     rightType === 'json' ? 'json' : 'php'}
                            placeholder="Paste your minified code here..."
                            height="100%"
                        />
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
                                    <span className="text-muted-foreground">Input:</span>
                                    <span className="ml-2 font-medium">{stats.original} chars</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Output:</span>
                                    <span className="ml-2 font-medium">{stats.result} chars</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <span className={`font-semibold text-lg ${
                                    stats.result < stats.original ? 'text-green-600' : 
                                    stats.result > stats.original ? 'text-blue-600' : 
                                    'text-muted-foreground'
                                }`}>
                                    {stats.result < stats.original ? 
                                        `Saved: ${((1 - stats.result / stats.original) * 100).toFixed(1)}%` :
                                        stats.result > stats.original ?
                                        `Expanded: ${((stats.result / stats.original - 1) * 100).toFixed(1)}%` :
                                        'No change'
                                    }
                                </span>
                                <Progress
                                    value={stats.result < stats.original ? 
                                        Number(((1 - stats.result / stats.original) * 100).toFixed(1)) :
                                        stats.result > stats.original ?
                                        Number(((stats.result / stats.original - 1) * 100).toFixed(1)) :
                                        0
                                    }
                                    className="h-2 mt-2"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleCopy} className="flex-1" size="sm">
                                    Copy Output
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
