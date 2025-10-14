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
import { minifyJavaScript, defaultJavaScriptOptions, type JavaScriptOptions } from '@/lib/javascript-options'
import { minifyCSSWithOptions, defaultCSSOptions, type CSSOptions } from '@/lib/css-options'
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
    const [lastOperation, setLastOperation] = useState<'minify' | 'unminify' | null>(null)

    // Options configuration
    const [options, setOptions] = useState({
        aggressive: false,
        compatibility: 'es6' as 'es5' | 'es6',
    })
    
    // JavaScript options
    const [jsOptions, setJsOptions] = useState<JavaScriptOptions>(defaultJavaScriptOptions)
    
    // CSS options
    const [cssOptions, setCssOptions] = useState<CSSOptions>(defaultCSSOptions)

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
                processed = await minifyJavaScript(sourceCode, jsOptions)
            } else if (type === 'css') {
                processed = await minifyCSSWithOptions(sourceCode, cssOptions)
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
            setLastOperation('minify')

            toast.success('Code minified successfully!')
        } catch (err) {
            console.error(err)
            
            // Messages d'erreur spécifiques selon le type et l'erreur
            let errorMessage = 'An error occurred during minification.'
            
            if (err instanceof Error) {
                if (err.message.includes('JSON')) {
                    if (leftType === 'json') {
                        errorMessage = 'Invalid JSON syntax. Please check your JSON code.'
                    } else {
                        errorMessage = `Invalid ${leftType.toUpperCase()} code. Please ensure the code matches the selected type.`
                    }
                } else if (err.message.includes('CSS')) {
                    errorMessage = 'Invalid CSS syntax. Please check your CSS code.'
                } else if (err.message.includes('JavaScript') || err.message.includes('JS')) {
                    errorMessage = 'Invalid JavaScript syntax. Please check your JavaScript code.'
                } else if (err.message.includes('PHP')) {
                    errorMessage = 'Invalid data for PHP serialization. Please provide valid JSON/JavaScript object.'
                } else {
                    errorMessage = `Minification failed: ${err.message}`
                }
            }
            
            toast.error(errorMessage)
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
            setLastOperation('unminify')

            toast.success('Code unminified successfully!')
        } catch (err) {
            console.error(err)
            
            // Messages d'erreur spécifiques selon le type et l'erreur
            let errorMessage = 'An error occurred during unminification.'
            
            if (err instanceof Error) {
                if (err.message.includes('JSON')) {
                    if (rightType === 'json') {
                        errorMessage = 'Invalid JSON syntax. Please check your JSON code.'
                    } else {
                        errorMessage = `Invalid ${rightType.toUpperCase()} code. Please ensure the code matches the selected type.`
                    }
                } else if (err.message.includes('CSS')) {
                    errorMessage = 'Invalid CSS syntax. Please check your CSS code.'
                } else if (err.message.includes('JavaScript') || err.message.includes('JS')) {
                    errorMessage = 'Invalid JavaScript syntax. Please check your JavaScript code.'
                } else if (err.message.includes('PHP')) {
                    errorMessage = 'Invalid PHP serialized data. Please provide valid PHP serialized string.'
                } else {
                    errorMessage = `Unminification failed: ${err.message}`
                }
            }
            
            toast.error(errorMessage)
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
    const handleLeftCodeChange = (value: string | undefined) => {
        const code = value || ''
        setLeftCode(code)
        
        // Auto-detect language if enabled and code is not empty
        if (autoDetectLeft && code.trim()) {
            const detectedLanguage = detectCodeLanguage(code)
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
    const handleRightCodeChange = (value: string | undefined) => {
        const code = value || ''
        setRightCode(code)
        
        // Auto-detect language if enabled and code is not empty
        if (autoDetectRight && code.trim()) {
            const detectedLanguage = detectCodeLanguage(code)
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
                                    />
                                    <Label className="text-xs text-muted-foreground">Auto</Label>
                                </div>
                            </div>

                            {leftType === 'js' && (
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Label className="text-sm font-medium">ECMAScript</Label>
                                        <Select
                                            value={jsOptions.ecmaVersion}
                                            onValueChange={(value: 'es5' | 'es2015' | 'es2017' | 'es2020' | 'es2022') => 
                                                setJsOptions(prev => ({ ...prev, ecmaVersion: value }))
                                            }
                                        >
                                            <SelectTrigger className="w-36 h-9">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="es5">ES5</SelectItem>
                                                <SelectItem value="es2015">ES2015</SelectItem>
                                                <SelectItem value="es2017">ES2017</SelectItem>
                                                <SelectItem value="es2020">ES2020</SelectItem>
                                                <SelectItem value="es2022">ES2022</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <Label className="text-sm font-medium">Compression</Label>
                                        <Select
                                            value={jsOptions.compressionLevel}
                                            onValueChange={(value: 'conservative' | 'normal' | 'aggressive') => 
                                                setJsOptions(prev => ({ ...prev, compressionLevel: value }))
                                            }
                                        >
                                            <SelectTrigger className="w-36 h-9">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="conservative">Conservative</SelectItem>
                                                <SelectItem value="normal">Normal</SelectItem>
                                                <SelectItem value="aggressive">Aggressive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <Label className="text-sm font-medium">Browser</Label>
                                        <Select
                                            value={jsOptions.browserSupport}
                                            onValueChange={(value: 'modern' | 'ie11' | 'ie9' | 'all') => 
                                                setJsOptions(prev => ({ ...prev, browserSupport: value }))
                                            }
                                        >
                                            <SelectTrigger className="w-32 h-9">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="modern">Modern</SelectItem>
                                                <SelectItem value="ie11">IE11+</SelectItem>
                                                <SelectItem value="ie9">IE9+</SelectItem>
                                                <SelectItem value="all">All</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id="preserve-classnames"
                                                checked={jsOptions.preserveClassNames}
                                                onCheckedChange={(checked) => 
                                                    setJsOptions(prev => ({ ...prev, preserveClassNames: checked }))
                                                }
                                            />
                                            <Label htmlFor="preserve-classnames" className="text-xs">Keep class names</Label>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id="preserve-functions"
                                                checked={jsOptions.preserveFunctionNames}
                                                onCheckedChange={(checked) => 
                                                    setJsOptions(prev => ({ ...prev, preserveFunctionNames: checked }))
                                                }
                                            />
                                            <Label htmlFor="preserve-functions" className="text-xs">Keep function names</Label>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id="remove-console"
                                                checked={jsOptions.removeConsole}
                                                onCheckedChange={(checked) => 
                                                    setJsOptions(prev => ({ ...prev, removeConsole: checked }))
                                                }
                                            />
                                            <Label htmlFor="remove-console" className="text-xs">Remove console</Label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {leftType === 'css' && (
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Label className="text-sm font-medium">Compression</Label>
                                        <Select
                                            value={cssOptions.compressionLevel}
                                            onValueChange={(value: 'conservative' | 'normal' | 'aggressive') => 
                                                setCssOptions(prev => ({ ...prev, compressionLevel: value }))
                                            }
                                        >
                                            <SelectTrigger className="w-36 h-9">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="conservative">Conservative</SelectItem>
                                                <SelectItem value="normal">Normal</SelectItem>
                                                <SelectItem value="aggressive">Aggressive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <Label className="text-sm font-medium">Browser</Label>
                                        <Select
                                            value={cssOptions.browserSupport}
                                            onValueChange={(value: 'modern' | 'ie11' | 'ie9') => 
                                                setCssOptions(prev => ({ ...prev, browserSupport: value }))
                                            }
                                        >
                                            <SelectTrigger className="w-32 h-9">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="modern">Modern</SelectItem>
                                                <SelectItem value="ie11">IE11+</SelectItem>
                                                <SelectItem value="ie9">IE9+</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id="remove-comments"
                                                checked={cssOptions.removeComments}
                                                onCheckedChange={(checked) => 
                                                    setCssOptions(prev => ({ ...prev, removeComments: checked }))
                                                }
                                            />
                                            <Label htmlFor="remove-comments" className="text-xs">Remove comments</Label>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id="convert-colors"
                                                checked={cssOptions.convertColors}
                                                onCheckedChange={(checked) => 
                                                    setCssOptions(prev => ({ ...prev, convertColors: checked }))
                                                }
                                            />
                                            <Label htmlFor="convert-colors" className="text-xs">Convert colors</Label>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id="merge-rules"
                                                checked={cssOptions.mergeRules}
                                                onCheckedChange={(checked) => 
                                                    setCssOptions(prev => ({ ...prev, mergeRules: checked }))
                                                }
                                            />
                                            <Label htmlFor="merge-rules" className="text-xs">Merge rules</Label>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id="minify-selectors"
                                                checked={cssOptions.minifySelectors}
                                                onCheckedChange={(checked) => 
                                                    setCssOptions(prev => ({ ...prev, minifySelectors: checked }))
                                                }
                                            />
                                            <Label htmlFor="minify-selectors" className="text-xs">Minify selectors</Label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            <Button 
                                onClick={processMinify} 
                                disabled={isLoading || !leftCode.trim()} 
                                size="sm"
                                className="bg-primary text-primary-foreground"
                            >
                                {isLoading ? 'Processing…' : 'Minify →'}
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
                    <div className="h-[374px] flex flex-col">
                        <Label className="text-sm font-medium mb-2">Normal Code</Label>
                        <CodeEditor
                            value={leftCode}
                            onChange={handleLeftCodeChange}
                            language={leftType === 'js' ? 'javascript' : 
                                     leftType === 'css' ? 'css' : 
                                     leftType === 'json' ? 'json' : 'javascript'}
                            placeholder="Paste your normal code here..."
                            height="100%"
                        />
                    </div>
                    
                    {/* RESULT BOX FOR UNMINIFY */}
                    {stats && lastOperation === 'unminify' && (
                        <Card className="border mt-4">
                            <CardContent className="p-4">
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <h3 className="font-semibold text-sm mb-2">Unminification Result</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-muted-foreground">Input:</span>
                                            <span className="ml-1 font-medium">{stats.original} chars</span>
                                            <div className="text-muted-foreground/80 text-xs">
                                                {stats.original < 1024 ? `${stats.original} B` :
                                                 stats.original < 1024 * 1024 ? `${(stats.original / 1024).toFixed(1)} kB` :
                                                 `${(stats.original / (1024 * 1024)).toFixed(2)} MB`}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Output:</span>
                                            <span className="ml-1 font-medium">{stats.result} chars</span>
                                            <div className="text-muted-foreground/80 text-xs">
                                                {stats.result < 1024 ? `${stats.result} B` :
                                                 stats.result < 1024 * 1024 ? `${(stats.result / 1024).toFixed(1)} kB` :
                                                 `${(stats.result / (1024 * 1024)).toFixed(2)} MB`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className={`font-bold text-base ${
                                            stats.result < stats.original ? 'text-green-600' : 
                                            stats.result > stats.original ? 'text-blue-600' : 
                                            'text-muted-foreground'
                                        }`}>
                                            {stats.result < stats.original ? 
                                                `Compressed: ${((1 - stats.result / stats.original) * 100).toFixed(1)}%` :
                                                stats.result > stats.original ?
                                                `Expanded: ${((stats.result / stats.original - 1) * 100).toFixed(1)}%` :
                                                'No change'
                                            }
                                        </div>
                                        <div className="text-muted-foreground text-sm mt-1">
                                            {stats.result < stats.original ? 
                                                `Saved: ${(stats.original - stats.result) < 1024 ? 
                                                    `${stats.original - stats.result} B` :
                                                    (stats.original - stats.result) < 1024 * 1024 ?
                                                    `${((stats.original - stats.result) / 1024).toFixed(1)} kB` :
                                                    `${((stats.original - stats.result) / (1024 * 1024)).toFixed(2)} MB`}` :
                                                stats.result > stats.original ?
                                                `Added: ${(stats.result - stats.original) < 1024 ? 
                                                    `${stats.result - stats.original} B` :
                                                    (stats.result - stats.original) < 1024 * 1024 ?
                                                    `${((stats.result - stats.original) / 1024).toFixed(1)} kB` :
                                                    `${((stats.result - stats.original) / (1024 * 1024)).toFixed(2)} MB`}` :
                                                ''
                                            }
                                        </div>
                                        <Progress
                                            value={stats.result < stats.original ? 
                                                Number(((1 - stats.result / stats.original) * 100).toFixed(1)) :
                                                stats.result > stats.original ?
                                                Number(((stats.result / stats.original - 1) * 100).toFixed(1)) :
                                                0
                                            }
                                            className="h-2 mt-3"
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
                </div>

                {/* RIGHT EDITOR */}
                <div className="lg:col-span-5 xl:col-span-4">
                    <div className="h-[374px] flex flex-col">
                        <Label className="text-sm font-medium mb-2">Minified Code</Label>
                        <CodeEditor
                            value={rightCode}
                            onChange={handleRightCodeChange}
                            language={rightType === 'js' ? 'javascript' : 
                                     rightType === 'css' ? 'css' : 
                                     rightType === 'json' ? 'json' : 'javascript'}
                            placeholder="Paste your minified code here..."
                            height="100%"
                        />
                    </div>
                    
                    {/* RESULT BOX FOR MINIFY */}
                    {stats && lastOperation === 'minify' && (
                        <Card className="border mt-4">
                            <CardContent className="p-4">
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <h3 className="font-semibold text-sm mb-2">Minification Result</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-muted-foreground">Input:</span>
                                            <span className="ml-1 font-medium">{stats.original} chars</span>
                                            <div className="text-muted-foreground/80 text-xs">
                                                {stats.original < 1024 ? `${stats.original} B` :
                                                 stats.original < 1024 * 1024 ? `${(stats.original / 1024).toFixed(1)} kB` :
                                                 `${(stats.original / (1024 * 1024)).toFixed(2)} MB`}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Output:</span>
                                            <span className="ml-1 font-medium">{stats.result} chars</span>
                                            <div className="text-muted-foreground/80 text-xs">
                                                {stats.result < 1024 ? `${stats.result} B` :
                                                 stats.result < 1024 * 1024 ? `${(stats.result / 1024).toFixed(1)} kB` :
                                                 `${(stats.result / (1024 * 1024)).toFixed(2)} MB`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className={`font-bold text-base ${
                                            stats.result < stats.original ? 'text-green-600' : 
                                            stats.result > stats.original ? 'text-blue-600' : 
                                            'text-muted-foreground'
                                        }`}>
                                            {stats.result < stats.original ? 
                                                `Compressed: ${((1 - stats.result / stats.original) * 100).toFixed(1)}%` :
                                                stats.result > stats.original ?
                                                `Expanded: ${((stats.result / stats.original - 1) * 100).toFixed(1)}%` :
                                                'No change'
                                            }
                                        </div>
                                        <div className="text-muted-foreground text-sm mt-1">
                                            {stats.result < stats.original ? 
                                                `Saved: ${(stats.original - stats.result) < 1024 ? 
                                                    `${stats.original - stats.result} B` :
                                                    (stats.original - stats.result) < 1024 * 1024 ?
                                                    `${((stats.original - stats.result) / 1024).toFixed(1)} kB` :
                                                    `${((stats.original - stats.result) / (1024 * 1024)).toFixed(2)} MB`}` :
                                                stats.result > stats.original ?
                                                `Added: ${(stats.result - stats.original) < 1024 ? 
                                                    `${stats.result - stats.original} B` :
                                                    (stats.result - stats.original) < 1024 * 1024 ?
                                                    `${((stats.result - stats.original) / 1024).toFixed(1)} kB` :
                                                    `${((stats.result - stats.original) / (1024 * 1024)).toFixed(2)} MB`}` :
                                                ''
                                            }
                                        </div>
                                        <Progress
                                            value={stats.result < stats.original ? 
                                                Number(((1 - stats.result / stats.original) * 100).toFixed(1)) :
                                                stats.result > stats.original ?
                                                Number(((stats.result / stats.original - 1) * 100).toFixed(1)) :
                                                0
                                            }
                                            className="h-2 mt-3"
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
