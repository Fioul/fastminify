'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
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

export default function Page() {
    const [code, setCode] = useState('')
    const [result, setResult] = useState('')
    const [stats, setStats] = useState<{ original: number; minified: number } | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const [options, setOptions] = useState({
        type: 'js',
        aggressive: false,
        compatibility: 'es6',
    })

    const handleMinify = async () => {
        if (!code.trim()) {
            toast.error('Please paste some code first.')
            return
        }

        setIsLoading(true)

        try {
            let minified = ''
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

    return (
        <div className="container max-w-3xl mx-auto px-4 py-10 space-y-8">
            {/* HERO SECTION */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Minify Your Code</h1>
                <p className="text-muted-foreground">
                    Minify your JavaScript or CSS instantly — free, fast, and private.
                </p>
            </div>

            {/* CODE INPUT */}
            <div className="space-y-2">
                <Label htmlFor="code">Your code</Label>
                <Textarea
                    id="code"
                    placeholder="Paste or drop your JS / CSS code here..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="min-h-[200px] font-mono text-sm"
                />
            </div>

            {/* OPTIONS */}
            <Card className="p-4 bg-muted/30">
                <div className="flex flex-wrap gap-6 items-center">
                    <div>
                        <Label>Type</Label>
                        <Select
                            value={options.type}
                            onValueChange={(v) => setOptions({ ...options, type: v })}
                        >
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="js">JavaScript</SelectItem>
                                <SelectItem value="css">CSS</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Compatibility</Label>
                        <Select
                            value={options.compatibility}
                            onValueChange={(v) => setOptions({ ...options, compatibility: v })}
                        >
                            <SelectTrigger className="w-[120px]">
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
                        <Label>Aggressive mode</Label>
                    </div>
                </div>
            </Card>

            {/* ACTIONS */}
            <div className="flex gap-3">
                <Button onClick={handleMinify} disabled={isLoading}>
                    {isLoading ? 'Minifying…' : 'Minify'}
                </Button>
                <Button variant="outline" onClick={handleCopy} disabled={!result}>
                    Copy result
                </Button>
            </div>

            {/* RESULT */}
            {result && (
                <Card className="border mt-4">
                    <CardHeader>
                        <h2 className="font-semibold text-lg">Result</h2>
                    </CardHeader>
                    <CardContent>
            <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm font-mono">
              {result}
            </pre>

                        {stats && (
                            <div className="mt-3 space-y-1">
                                <p>
                                    <span className="text-muted-foreground">Original:</span>{' '}
                                    {stats.original} chars
                                </p>
                                <p>
                                    <span className="text-muted-foreground">Minified:</span>{' '}
                                    {stats.minified} chars
                                </p>
                                <p className="text-green-600 font-medium">
                                    Saved:{' '}
                                    {((1 - stats.minified / stats.original) * 100).toFixed(1)}%
                                </p>
                                <Progress
                                    value={Number(((1 - stats.minified / stats.original) * 100).toFixed(1))}
                                    className="h-2"
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
