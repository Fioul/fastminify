'use client'

import React, { useState } from 'react'
import { useTranslations } from '@/hooks/useTranslations'
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
import { minifyJSONWithOptions, defaultJSONOptions, type JSONOptions } from '@/lib/json-options'
import { serializePHPWithOptions, unserializePHPWithOptions, defaultPHPOptions, type PHPOptions } from '@/lib/php-options'
import { beautifyJS, beautifyCSS, beautifyJSON, beautifyPHP } from '@/lib/beautify'
import { unminifyJS, unminifyCSS, unminifyJSON, unminifyPHP } from '@/lib/unminify'
import { detectCodeLanguage } from '@/lib/detect-language'
import { TooltipInfo } from '@/components/TooltipInfo'
// Traductions simples sans next-intl

interface PageProps {
    params: Promise<{ locale: string }>
}

export default function Page({ params }: PageProps) {
    // Utiliser React.use() pour unwrap la Promise
    const { locale } = React.use(params)
    const { t } = useTranslations(locale)
    
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
    
    // JSON options
    const [jsonOptions, setJsonOptions] = useState<JSONOptions>(defaultJSONOptions)
    
    // PHP options
    const [phpOptions, setPhpOptions] = useState<PHPOptions>(defaultPHPOptions)

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
                processed = minifyJSONWithOptions(sourceCode, jsonOptions)
            } else if (type === 'php') {
                // Pour sérialiser, on doit parser le JSON/JS d'abord
                try {
                    const parsed = JSON.parse(sourceCode)
                    processed = serializePHPWithOptions(parsed, phpOptions)
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
                const parsed = unserializePHPWithOptions(sourceCode, phpOptions)
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
        // But don't override if user has manually selected PHP Serialized
        if (autoDetectLeft && code.trim() && leftType !== 'php') {
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
        // But don't override if user has manually selected PHP Serialized
        if (autoDetectRight && code.trim() && rightType !== 'php') {
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

    // Clear both editors
    const handleClear = () => {
        setLeftCode('')
        setRightCode('')
        setStats(null)
        setLastOperation(null)
        toast.success('Editors cleared!')
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
        <div className="gradient-bg">
            <div className="container max-w-[1440px] mx-auto px-4 py-10">
            {/* HERO SECTION */}
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl md:text-5xl font-bold bounce-subtle bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {t('common.subtitle')}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {t('common.description')}
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium">{t('content.hero.badges.free')}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium">{t('content.hero.badges.private')}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium">{t('content.hero.badges.instant')}</span>
                    </div>
                </div>
            </div>

            {/* TOOLBAR - Action buttons */}
            <div className="flex justify-center mb-6">
                <Card className="p-4 card-warm w-full max-w-[960px]">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex items-end gap-2">
                                <div>
                                    <Label className="text-sm font-medium mb-2 block">{t('common.normalCode')}</Label>
                                    <Select
                                        value={leftType}
                                        onValueChange={(value: 'js' | 'css' | 'json' | 'php') => setLeftType(value)}
                                    >
                                        <SelectTrigger className="w-[140px] h-9">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="js">{t('languages.javascript')}</SelectItem>
                                            <SelectItem value="css">{t('languages.css')}</SelectItem>
                                            <SelectItem value="json">{t('languages.json')}</SelectItem>
                                            <SelectItem value="php">{t('languages.php')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Switch
                                        checked={autoDetectLeft}
                                        onCheckedChange={setAutoDetectLeft}
                                    />
                                    <Label className="text-xs text-muted-foreground">{t('common.auto')}</Label>
                                    <TooltipInfo content={t('tooltips.autoDetect')} />
                                </div>
                            </div>

                            <div className="flex items-end gap-2">
                                <div>
                                    <Label className="text-sm font-medium mb-2 block">{t('common.minifiedCode')}</Label>
                                    <Select
                                        value={rightType}
                                        onValueChange={(value: 'js' | 'css' | 'json' | 'php') => setRightType(value)}
                                    >
                                        <SelectTrigger className="w-[140px] h-9">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="js">{t('languages.javascript')}</SelectItem>
                                            <SelectItem value="css">{t('languages.css')}</SelectItem>
                                            <SelectItem value="json">{t('languages.json')}</SelectItem>
                                            <SelectItem value="php">{t('languages.php')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Switch
                                        checked={autoDetectRight}
                                        onCheckedChange={setAutoDetectRight}
                                    />
                                    <Label className="text-xs text-muted-foreground">{t('common.auto')}</Label>
                                    <TooltipInfo content={t('tooltips.autoDetect')} />
                                </div>
                            </div>

                            {leftType === 'js' && (
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Label className="text-sm font-medium">ECMAScript</Label>
                                        <TooltipInfo content="Target JavaScript version. ES5 = legacy compatibility (IE9+), ES2022 = modern (recent browsers)." />
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
                                        <TooltipInfo content="Optimization level. Conservative = safe and readable, Normal = balanced, Aggressive = maximum compression." />
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
                                        <TooltipInfo content="Browser compatibility. Modern = recent (Chrome, Firefox, Safari), IE11+ = Internet Explorer 11+, IE9+ = very old browsers." />
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
                                            <TooltipInfo content="Preserves CSS class names in JavaScript code (e.g., className='my-class')." />
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
                                            <TooltipInfo content="Preserves function names to facilitate debugging and stack traces." />
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
                                            <TooltipInfo content="Removes all console.log(), console.warn(), etc. calls from the final code." />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {leftType === 'css' && (
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Label className="text-sm font-medium">Compression</Label>
                                        <TooltipInfo content="CSS optimization level. Conservative = safe, Normal = balanced, Aggressive = maximum compression." />
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
                                        <TooltipInfo content="CSS browser compatibility. Modern = recent, IE11+ = Internet Explorer 11+, IE9+ = very old browsers." />
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
                                            <TooltipInfo content="Removes all CSS comments (/* comment */) from the final code." />
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
                                            <TooltipInfo content="Converts color names to hexadecimal codes (blue → #0000ff) to reduce size." />
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
                                            <TooltipInfo content="Merges identical CSS rules to reduce code duplication." />
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
                                            <TooltipInfo content="Optimizes CSS selectors by removing unnecessary spaces and shortening properties." />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {leftType === 'json' && (
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Label className="text-sm font-medium">Compression</Label>
                                        <TooltipInfo content="JSON optimization level. Conservative = safe, Normal = balanced, Aggressive = maximum compression." />
                                        <Select
                                            value={jsonOptions.compressionLevel}
                                            onValueChange={(value: 'conservative' | 'normal' | 'aggressive') => 
                                                setJsonOptions(prev => ({ ...prev, compressionLevel: value }))
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
                                        <Switch
                                            id="optimize-numbers"
                                            checked={jsonOptions.optimizeNumbers}
                                            onCheckedChange={(checked) => 
                                                setJsonOptions(prev => ({ ...prev, optimizeNumbers: checked }))
                                            }
                                        />
                                        <Label htmlFor="optimize-numbers" className="text-sm">Optimize numbers</Label>
                                        <TooltipInfo content="Removes unnecessary zeros from numbers (1.00 → 1, 0.50 → 0.5)." />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Switch
                                            id="scientific-notation"
                                            checked={jsonOptions.useScientificNotation}
                                            onCheckedChange={(checked) => 
                                                setJsonOptions(prev => ({ ...prev, useScientificNotation: checked }))
                                            }
                                        />
                                        <Label htmlFor="scientific-notation" className="text-sm">Scientific notation</Label>
                                        <TooltipInfo content="Uses scientific notation for very large numbers (1000000 → 1e6)." />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id="remove-empty-keys"
                                                checked={jsonOptions.removeEmptyKeys}
                                                onCheckedChange={(checked) => 
                                                    setJsonOptions(prev => ({ ...prev, removeEmptyKeys: checked }))
                                                }
                                            />
                                            <Label htmlFor="remove-empty-keys" className="text-sm">Remove empty keys</Label>
                                            <TooltipInfo content="Removes keys with empty values (key: '') from JSON." />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id="remove-null-values"
                                                checked={jsonOptions.removeNullValues}
                                                onCheckedChange={(checked) => 
                                                    setJsonOptions(prev => ({ ...prev, removeNullValues: checked }))
                                                }
                                            />
                                            <Label htmlFor="remove-null-values" className="text-sm">Remove null values</Label>
                                            <TooltipInfo content="Removes null values from JSON to reduce size." />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id="fix-errors"
                                                checked={jsonOptions.fixCommonErrors}
                                                onCheckedChange={(checked) => 
                                                    setJsonOptions(prev => ({ ...prev, fixCommonErrors: checked }))
                                                }
                                            />
                                            <Label htmlFor="fix-errors" className="text-sm">Fix common errors</Label>
                                            <TooltipInfo content="Automatically fixes common JSON errors (missing quotes, commas, etc.)." />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {leftType === 'php' && (
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Label className="text-sm font-medium">Level</Label>
                                        <TooltipInfo content="PHP serialization level. Basic = simple, Deep = complex structures, Custom = advanced." />
                                        <Select
                                            value={phpOptions.serializationLevel}
                                            onValueChange={(value: 'basic' | 'deep' | 'custom') => 
                                                setPhpOptions(prev => ({ ...prev, serializationLevel: value }))
                                            }
                                        >
                                            <SelectTrigger className="w-32 h-9">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="basic">Basic</SelectItem>
                                                <SelectItem value="deep">Deep</SelectItem>
                                                <SelectItem value="custom">Custom</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Label className="text-sm font-medium">Compression</Label>
                                        <TooltipInfo content="PHP compression level. None = readable, Minimal = optimized, Aggressive = maximum." />
                                        <Select
                                            value={phpOptions.compression}
                                            onValueChange={(value: 'none' | 'minimal' | 'aggressive') => 
                                                setPhpOptions(prev => ({ ...prev, compression: value }))
                                            }
                                        >
                                            <SelectTrigger className="w-32 h-9">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">None</SelectItem>
                                                <SelectItem value="minimal">Minimal</SelectItem>
                                                <SelectItem value="aggressive">Aggressive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id="preserve-types"
                                                checked={phpOptions.preserveTypes}
                                                onCheckedChange={(checked) => 
                                                    setPhpOptions(prev => ({ ...prev, preserveTypes: checked }))
                                                }
                                            />
                                            <Label htmlFor="preserve-types" className="text-sm">Preserve types</Label>
                                            <TooltipInfo content="Preserves PHP data types (string, int, array) during serialization." />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id="include-null"
                                                checked={phpOptions.includeNullValues}
                                                onCheckedChange={(checked) => 
                                                    setPhpOptions(prev => ({ ...prev, includeNullValues: checked }))
                                                }
                                            />
                                            <Label htmlFor="include-null" className="text-sm">Include null</Label>
                                            <TooltipInfo content="Includes null values in PHP serialization." />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id="readable"
                                                checked={phpOptions.readable}
                                                onCheckedChange={(checked) => 
                                                    setPhpOptions(prev => ({ ...prev, readable: checked }))
                                                }
                                            />
                                            <Label htmlFor="readable" className="text-sm">Readable</Label>
                                            <TooltipInfo content="Formats PHP serialization in a readable way with spaces and line breaks." />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id="strict-mode"
                                                checked={phpOptions.strictMode}
                                                onCheckedChange={(checked) => 
                                                    setPhpOptions(prev => ({ ...prev, strictMode: checked }))
                                                }
                                            />
                                            <Label htmlFor="strict-mode" className="text-sm">Strict mode</Label>
                                            <TooltipInfo content="Strict mode: validates data before serialization and rejects unsupported types." />
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
                                className="btn-warm text-primary-foreground relative overflow-hidden"
                            >
                                {isLoading ? 'Processing…' : `${t('common.minify')} →`}
                            </Button>
                            <Button 
                                variant="outline" 
                                onClick={processUnminify} 
                                disabled={isLoading || !rightCode.trim()} 
                                size="sm"
                            >
                                ← {t('common.unminify')}
                            </Button>
                            <Button 
                                variant="secondary" 
                                onClick={handleClear} 
                                disabled={!leftCode.trim() && !rightCode.trim()} 
                                size="sm"
                            >
                                {t('common.clear')}
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>

            {/* MAIN CONTENT - 2 COLUMNS LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* LEFT AD PLACEHOLDER */}
                <div className="hidden xl:block xl:col-span-2">
                    <div className="fixed top-28 left-12 z-30">
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
                    <div className="h-[270px] flex flex-col">
                        <Label className="text-sm font-medium mb-2">{t('common.normalCode')}</Label>
                        <CodeEditor
                            value={leftCode}
                            onChange={handleLeftCodeChange}
                            language={leftType === 'js' ? 'javascript' : 
                                     leftType === 'css' ? 'css' : 
                                     leftType === 'json' ? 'json' : 'javascript'}
                            placeholder={t('placeholders.normalCode')}
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
                    <div className="h-[270px] flex flex-col">
                        <Label className="text-sm font-medium mb-2">{t('common.minifiedCode')}</Label>
                        <CodeEditor
                            value={rightCode}
                            onChange={handleRightCodeChange}
                            language={rightType === 'js' ? 'javascript' : 
                                     rightType === 'css' ? 'css' : 
                                     rightType === 'json' ? 'json' : 'javascript'}
                            placeholder={t('placeholders.minifiedCode')}
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
                    <div className="fixed top-28 right-12 z-30">
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

            {/* CONTENT SECTIONS FOR SEO */}
            <div className="max-w-4xl mx-auto mt-24 space-y-16">
                {/* WHY MINIFY SECTION */}
                <section className="text-center space-y-6">
                    <h2 className="text-3xl font-bold text-foreground">
                        {t('content.whyMinify.title')}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        {t('content.whyMinify.subtitle')}
                    </p>
                </section>

                {/* CODE EXAMPLES SECTION */}
                <section className="space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-foreground">
                            {t('content.codeExamples.title')}
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {t('content.codeExamples.subtitle')}
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* JavaScript Example */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold border-l-4 border-primary pl-3">
                                {t('content.codeExamples.javascript')}
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-2">{t('content.codeExamples.originalCode')}</h4>
                                    <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-4 rounded-lg font-mono text-xs leading-relaxed">
                                        <pre className="whitespace-pre-wrap break-all">{`function calculateTotal(items) {
    let total = 0;
    
    for (let i = 0; i < items.length; i++) {
        total += items[i].price * items[i].quantity;
    }
    
    return total;
}

function init() {
    calculateTotal();
}`}</pre>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-2">{t('content.codeExamples.minifiedCode')}</h4>
                                    <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-4 rounded-lg font-mono text-xs leading-relaxed">
                                        <pre className="whitespace-pre-wrap break-all">{`function calculateTotal(t){let l=0;for(let n=0;n<t.length;n++)l+=t[n].price*t[n].quantity;return l}function init(){calculateTotal()}`}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* CSS Example */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold border-l-4 border-primary pl-3">
                                {t('content.codeExamples.css')}
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-2">{t('content.codeExamples.originalCode')}</h4>
                                    <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-4 rounded-lg font-mono text-xs leading-relaxed">
                                        <pre className="whitespace-pre-wrap break-all">{`.header {
    background-color: #ffffff;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    color: #333333;
}

.header .title {
    font-size: 24px;
    font-weight: bold;
    color: #333333;
}`}</pre>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-2">{t('content.codeExamples.minifiedCode')}</h4>
                                    <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-4 rounded-lg font-mono text-xs leading-relaxed">
                                        <pre className="whitespace-pre-wrap break-all">{`.header{background-color:#fff;padding:20px;margin-bottom:10px;border-radius:5px;color:#333}.header .title{font-size:24px;font-weight:700;color:#333}`}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* BENEFITS GRID */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="w-12 h-12 flex items-center justify-center mx-auto">
                            <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold">
                            {t('content.whyMinify.benefits.performance.title')}
                        </h3>
                        <p className="text-muted-foreground">
                            {t('content.whyMinify.benefits.performance.description')}
                        </p>
                    </div>
                    
                    <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="w-12 h-12 flex items-center justify-center mx-auto">
                            <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.686 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.686-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold">
                            {t('content.whyMinify.benefits.bandwidth.title')}
                        </h3>
                        <p className="text-muted-foreground">
                            {t('content.whyMinify.benefits.bandwidth.description')}
                        </p>
                    </div>
                    
                    <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="w-12 h-12 flex items-center justify-center mx-auto">
                            <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold">
                            {t('content.whyMinify.benefits.security.title')}
                        </h3>
                        <p className="text-muted-foreground">
                            {t('content.whyMinify.benefits.security.description')}
                        </p>
                    </div>
                </div>

                {/* SUPPORTED LANGUAGES */}
                <section className="text-center space-y-8 mt-24">
                    <h2 className="text-3xl font-bold text-foreground">
                        {t('content.languages.title')}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-sm font-bold text-yellow-600">JS</span>
                            </div>
                            <span className="text-sm font-medium text-center px-2">{t('content.languages.javascript')}</span>
                        </div>
                        <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-sm font-bold text-blue-600">CSS</span>
                            </div>
                            <span className="text-sm font-medium text-center px-2">{t('content.languages.css')}</span>
                        </div>
                        <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                            <div className="w-12 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-sm font-bold text-green-600">JSON</span>
                            </div>
                            <span className="text-sm font-medium text-center px-2">{t('content.languages.json')}</span>
                        </div>
                        <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-sm font-bold text-purple-600">PHP</span>
                            </div>
                            <span className="text-sm font-medium text-center px-2">{t('content.languages.php')}</span>
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section className="space-y-8 mt-24">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-foreground">
                            {t('content.howItWorks.title')}
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {t('content.howItWorks.subtitle')}
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                                <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">1</span>
                            </div>
                            <h3 className="text-xl font-semibold">{t('content.howItWorks.steps.paste.title')}</h3>
                            <p className="text-muted-foreground">
                                {t('content.howItWorks.steps.paste.description')}
                            </p>
                        </div>
                        
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                                <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">2</span>
                            </div>
                            <h3 className="text-xl font-semibold">{t('content.howItWorks.steps.configure.title')}</h3>
                            <p className="text-muted-foreground">
                                {t('content.howItWorks.steps.configure.description')}
                            </p>
                        </div>
                        
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                                <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">3</span>
                            </div>
                            <h3 className="text-xl font-semibold">{t('content.howItWorks.steps.getResult.title')}</h3>
                            <p className="text-muted-foreground">
                                {t('content.howItWorks.steps.getResult.description')}
                            </p>
                        </div>
                    </div>
                </section>

                {/* SEO OPTIMIZATION TIPS */}
                <section className="mt-24 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 space-y-6 border border-gray-200 dark:border-gray-700">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-foreground">
                            {t('content.seoOptimization.title')}
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            {t('content.seoOptimization.subtitle')}
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold border-l-4 border-primary pl-3">
                                {t('content.seoOptimization.seoImpact.title')}
                            </h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Improves Google's <strong>Core Web Vitals</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Reduces page <strong>loading times</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Increases <strong>conversion rates</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Improves <strong>mobile experience</strong></span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold border-l-4 border-primary pl-3">
                                {t('content.seoOptimization.technicalOptimizations.title')}
                            </h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Removes <strong>unnecessary spaces</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Shortens <strong>variable names</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Optimizes <strong>expressions</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    <span><strong>GZIP</strong> compression compatible</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

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
        </div>
    )
}
