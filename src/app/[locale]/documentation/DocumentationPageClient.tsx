'use client'

import { useTranslations } from '@/hooks/useTranslations'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CodeEditor from '@/components/CodeEditor'
import { Copy, ExternalLink } from 'lucide-react'
import { SiJavascript, SiCss3, SiJson, SiPhp } from 'react-icons/si'
import { Button } from '@/components/ui/button'

interface DocumentationPageClientProps {
  locale: string
}

export default function DocumentationPageClient({ locale }: DocumentationPageClientProps) {
  const { t } = useTranslations(locale)

  const languages = [
    { value: 'javascript', label: 'JavaScript', icon: SiJavascript },
    { value: 'css', label: 'CSS', icon: SiCss3 },
    { value: 'json', label: 'JSON', icon: SiJson },
    { value: 'php', label: 'PHP Serialize', icon: SiPhp }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {t('documentation.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('documentation.subtitle')}
            </p>
          </div>

          {/* Language Tabs */}
          <Tabs defaultValue="javascript" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              {languages.map((lang) => {
                const IconComponent = lang.icon
                return (
                  <TabsTrigger key={lang.value} value={lang.value} className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4" />
                    {lang.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {/* JavaScript Documentation */}
            <TabsContent value="javascript" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SiJavascript className="h-5 w-5 text-yellow-500" />
                    {t('documentation.javascript.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('documentation.javascript.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Package Information */}
                  <div>
                    <h3 className="text-lg font-semibold border-l-4 border-primary pl-3 mb-3">{t('documentation.javascript.package.title')}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-white font-medium">Terser</Badge>
                      <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-700">v5.24.0</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t('documentation.javascript.package.description')}
                    </p>
                  </div>

                  {/* Basic Example */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold border-l-4 border-primary pl-3 mb-3">{t('documentation.javascript.basicExample.title')}</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-16">
                      <div>
                        <h4 className="font-medium mb-2">{t('documentation.javascript.basicExample.input')}</h4>
                        <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-4 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                          <pre className="whitespace-pre">{t('documentation.javascript.basicExample.inputCode')}</pre>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">{t('documentation.javascript.basicExample.output')}</h4>
                        <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-4 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                          <pre className="whitespace-pre-wrap break-all">{t('documentation.javascript.basicExample.outputCode')}</pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold border-l-4 border-primary pl-3 mb-4">{t('documentation.javascript.options.title')}</h3>
                    <div className="grid gap-6">
                      {/* ECMAScript Version */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.javascript.options.ecmaVersion.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.javascript.options.ecmaVersion.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.javascript.options.ecmaVersion.example.title')}</h4>
                              <CodeEditor
                                value={t('documentation.javascript.options.ecmaVersion.example.code')}
                                language="javascript"
                                readOnly
                                height="120px"
                                className="mb-4"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.javascript.options.ecmaVersion.result.title')}</h4>
                              <CodeEditor
                                value={t('documentation.javascript.options.ecmaVersion.result.code')}
                                language="javascript"
                                readOnly
                                height="120px"
                                className="mb-4"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Compression Level */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.javascript.options.compressionLevel.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.javascript.options.compressionLevel.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <span className="font-medium">Conservative</span>
                              <span className="text-sm text-muted-foreground">{t('documentation.javascript.options.compressionLevel.levels.conservative')}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <span className="font-medium">Normal</span>
                              <span className="text-sm text-muted-foreground">{t('documentation.javascript.options.compressionLevel.levels.normal')}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <span className="font-medium">Aggressive</span>
                              <span className="text-sm text-muted-foreground">{t('documentation.javascript.options.compressionLevel.levels.aggressive')}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Browser Support */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.javascript.options.browserSupport.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.javascript.options.browserSupport.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <span className="font-medium">Modern</span>
                              <span className="text-sm text-muted-foreground">{t('documentation.javascript.options.browserSupport.levels.modern')}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <span className="font-medium">IE11</span>
                              <span className="text-sm text-muted-foreground">{t('documentation.javascript.options.browserSupport.levels.ie11')}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <span className="font-medium">IE9</span>
                              <span className="text-sm text-muted-foreground">{t('documentation.javascript.options.browserSupport.levels.ie9')}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <span className="font-medium">All</span>
                              <span className="text-sm text-muted-foreground">{t('documentation.javascript.options.browserSupport.levels.all')}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Preserve Class Names */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.javascript.options.preserveClassNames.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.javascript.options.preserveClassNames.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.javascript.options.preserveClassNames.example.title')}</h4>
                              <CodeEditor
                                value={t('documentation.javascript.options.preserveClassNames.example.code')}
                                language="javascript"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.javascript.options.preserveClassNames.result.title')}</h4>
                              <CodeEditor
                                value={t('documentation.javascript.options.preserveClassNames.result.code')}
                                language="javascript"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Preserve Function Names */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.javascript.options.preserveFunctionNames.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.javascript.options.preserveFunctionNames.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.javascript.options.preserveFunctionNames.example.title')}</h4>
                              <CodeEditor
                                value={t('documentation.javascript.options.preserveFunctionNames.example.code')}
                                language="javascript"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.javascript.options.preserveFunctionNames.result.title')}</h4>
                              <CodeEditor
                                value={t('documentation.javascript.options.preserveFunctionNames.result.code')}
                                language="javascript"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Remove Console */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.javascript.options.removeConsole.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.javascript.options.removeConsole.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.javascript.options.removeConsole.example.title')}</h4>
                              <CodeEditor
                                value={t('documentation.javascript.options.removeConsole.example.code')}
                                language="javascript"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.javascript.options.removeConsole.result.title')}</h4>
                              <CodeEditor
                                value={t('documentation.javascript.options.removeConsole.result.code')}
                                language="javascript"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Remove Debugger */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.javascript.options.removeDebugger.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.javascript.options.removeDebugger.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.javascript.options.removeDebugger.example.title')}</h4>
                              <CodeEditor
                                value={t('documentation.javascript.options.removeDebugger.example.code')}
                                language="javascript"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.javascript.options.removeDebugger.result.title')}</h4>
                              <CodeEditor
                                value={t('documentation.javascript.options.removeDebugger.result.code')}
                                language="javascript"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* CSS Documentation */}
            <TabsContent value="css" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SiCss3 className="h-5 w-5 text-blue-500" />
                    {t('documentation.css.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('documentation.css.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Package Information */}
                  <div>
                    <h3 className="text-lg font-semibold border-l-4 border-primary pl-3 mb-3">{t('documentation.css.package.title')}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-white font-medium">CSSO</Badge>
                      <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-700">v7.0.0</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t('documentation.css.package.description')}
                    </p>
                  </div>

                  {/* Basic Example */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold border-l-4 border-primary pl-3 mb-3">{t('documentation.css.basicExample.title')}</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-16">
                      <div>
                        <h4 className="font-medium mb-2">{t('documentation.css.basicExample.input')}</h4>
                        <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-4 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                          <pre className="whitespace-pre">{t('documentation.css.basicExample.inputCode')}</pre>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">{t('documentation.css.basicExample.output')}</h4>
                        <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-4 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                          <pre className="whitespace-pre-wrap break-all">{t('documentation.css.basicExample.outputCode')}</pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold border-l-4 border-primary pl-3 mb-4">{t('documentation.css.options.title')}</h3>
                    <div className="grid gap-6">
                      {/* Compression Level */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.css.options.compressionLevel.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.css.options.compressionLevel.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <span className="font-medium">Conservative</span>
                              <span className="text-sm text-muted-foreground">{t('documentation.css.options.compressionLevel.levels.conservative')}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <span className="font-medium">Normal</span>
                              <span className="text-sm text-muted-foreground">{t('documentation.css.options.compressionLevel.levels.normal')}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <span className="font-medium">Aggressive</span>
                              <span className="text-sm text-muted-foreground">{t('documentation.css.options.compressionLevel.levels.aggressive')}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Browser Support */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.css.options.browserSupport.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.css.options.browserSupport.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <span className="font-medium">Modern</span>
                              <span className="text-sm text-muted-foreground">{t('documentation.css.options.browserSupport.levels.modern')}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <span className="font-medium">IE11</span>
                              <span className="text-sm text-muted-foreground">{t('documentation.css.options.browserSupport.levels.ie11')}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <span className="font-medium">IE9</span>
                              <span className="text-sm text-muted-foreground">{t('documentation.css.options.browserSupport.levels.ie9')}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Remove Comments */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.css.options.removeComments.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.css.options.removeComments.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.css.options.removeComments.example.title')}</h4>
                              <CodeEditor
                                value={t('documentation.css.options.removeComments.example.code')}
                                language="css"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.css.options.removeComments.result.title')}</h4>
                              <CodeEditor
                                value={t('documentation.css.options.removeComments.result.code')}
                                language="css"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Convert Colors */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.css.options.convertColors.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.css.options.convertColors.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.css.options.convertColors.example.title')}</h4>
                              <CodeEditor
                                value={t('documentation.css.options.convertColors.example.code')}
                                language="css"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.css.options.convertColors.result.title')}</h4>
                              <CodeEditor
                                value={t('documentation.css.options.convertColors.result.code')}
                                language="css"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Merge Rules */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.css.options.mergeRules.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.css.options.mergeRules.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.css.options.mergeRules.example.title')}</h4>
                              <CodeEditor
                                value={t('documentation.css.options.mergeRules.example.code')}
                                language="css"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.css.options.mergeRules.result.title')}</h4>
                              <CodeEditor
                                value={t('documentation.css.options.mergeRules.result.code')}
                                language="css"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Minify Selectors */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.css.options.minifySelectors.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.css.options.minifySelectors.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.css.options.minifySelectors.example.title')}</h4>
                              <CodeEditor
                                value={t('documentation.css.options.minifySelectors.example.code')}
                                language="css"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.css.options.minifySelectors.result.title')}</h4>
                              <CodeEditor
                                value={t('documentation.css.options.minifySelectors.result.code')}
                                language="css"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* JSON Documentation */}
            <TabsContent value="json" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SiJson className="h-5 w-5 text-blue-600" />
                    {t('documentation.json.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('documentation.json.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold border-l-4 border-primary pl-3 mb-3">{t('documentation.json.basicExample.title')}</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-16">
                      <div>
                        <h4 className="font-medium mb-2">{t('documentation.json.basicExample.input')}</h4>
                        <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-4 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                          <pre className="whitespace-pre">{t('documentation.json.basicExample.inputCode')}</pre>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">{t('documentation.json.basicExample.output')}</h4>
                        <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-4 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                          <pre className="whitespace-pre-wrap break-all">{t('documentation.json.basicExample.outputCode')}</pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold border-l-4 border-primary pl-3 mb-4">{t('documentation.json.options.title')}</h3>
                    <div className="grid gap-6">
                      {/* Compression Level */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.json.options.compressionLevel.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.json.options.compressionLevel.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <span className="font-medium">Conservative</span>
                              <span className="text-sm text-muted-foreground">{t('documentation.json.options.compressionLevel.levels.conservative')}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <span className="font-medium">Normal</span>
                              <span className="text-sm text-muted-foreground">{t('documentation.json.options.compressionLevel.levels.normal')}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <span className="font-medium">Aggressive</span>
                              <span className="text-sm text-muted-foreground">{t('documentation.json.options.compressionLevel.levels.aggressive')}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Optimize Numbers */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.json.options.optimizeNumbers.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.json.options.optimizeNumbers.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.json.options.optimizeNumbers.example.title')}</h4>
                              <CodeEditor
                                value={t('documentation.json.options.optimizeNumbers.example.code')}
                                language="json"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.json.options.optimizeNumbers.result.title')}</h4>
                              <CodeEditor
                                value={t('documentation.json.options.optimizeNumbers.result.code')}
                                language="json"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Remove Null Values */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.json.options.removeNullValues.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.json.options.removeNullValues.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.json.options.removeNullValues.example.title')}</h4>
                              <CodeEditor
                                value={t('documentation.json.options.removeNullValues.example.code')}
                                language="json"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.json.options.removeNullValues.result.title')}</h4>
                              <CodeEditor
                                value={t('documentation.json.options.removeNullValues.result.code')}
                                language="json"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Remove Empty Arrays */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.json.options.removeEmptyArrays.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.json.options.removeEmptyArrays.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.json.options.removeEmptyArrays.example.title')}</h4>
                              <CodeEditor
                                value={t('documentation.json.options.removeEmptyArrays.example.code')}
                                language="json"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.json.options.removeEmptyArrays.result.title')}</h4>
                              <CodeEditor
                                value={t('documentation.json.options.removeEmptyArrays.result.code')}
                                language="json"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Sort Object Keys */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.json.options.sortObjectKeys.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.json.options.sortObjectKeys.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.json.options.sortObjectKeys.example.title')}</h4>
                              <CodeEditor
                                value={t('documentation.json.options.sortObjectKeys.example.code')}
                                language="json"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.json.options.sortObjectKeys.result.title')}</h4>
                              <CodeEditor
                                value={t('documentation.json.options.sortObjectKeys.result.code')}
                                language="json"
                                readOnly
                                height="80px"
                                className="mb-4"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* PHP Documentation */}
            <TabsContent value="php" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SiPhp className="h-5 w-5 text-purple-500" />
                    {t('documentation.php.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('documentation.php.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold border-l-4 border-primary pl-3 mb-3">{t('documentation.php.basicExample.title')}</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-16">
                      <div>
                        <h4 className="font-medium mb-2">{t('documentation.php.basicExample.input')}</h4>
                        <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-4 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                          <pre className="whitespace-pre">{t('documentation.php.basicExample.inputCode')}</pre>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">{t('documentation.php.basicExample.output')}</h4>
                        <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-4 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                          <pre className="whitespace-pre-wrap break-all">{t('documentation.php.basicExample.outputCode')}</pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold border-l-4 border-primary pl-3 mb-4">{t('documentation.php.options.title')}</h3>
                    <div className="grid gap-6">
                      {/* Include Null Values */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.php.options.includeNullValues.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.php.options.includeNullValues.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.php.options.includeNullValues.example.title')}</h4>
                              <CodeEditor
                                value={t('documentation.php.options.includeNullValues.example.code')}
                                language="php"
                                readOnly
                                height="120px"
                                className="mb-4"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.php.options.includeNullValues.result.title')}</h4>
                              <CodeEditor
                                value={t('documentation.php.options.includeNullValues.result.code')}
                                language="php"
                                readOnly
                                height="120px"
                                className="mb-4"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Remove Empty Arrays */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.php.options.removeEmptyArrays.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.php.options.removeEmptyArrays.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.php.options.removeEmptyArrays.example.title')}</h4>
                              <CodeEditor
                                value={t('documentation.php.options.removeEmptyArrays.example.code')}
                                language="php"
                                readOnly
                                height="120px"
                                className="mb-4"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.php.options.removeEmptyArrays.result.title')}</h4>
                              <CodeEditor
                                value={t('documentation.php.options.removeEmptyArrays.result.code')}
                                language="php"
                                readOnly
                                height="120px"
                                className="mb-4"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Remove Empty Objects */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.php.options.removeEmptyObjects.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.php.options.removeEmptyObjects.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.php.options.removeEmptyObjects.example.title')}</h4>
                              <CodeEditor
                                value={t('documentation.php.options.removeEmptyObjects.example.code')}
                                language="php"
                                readOnly
                                height="120px"
                                className="mb-4"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.php.options.removeEmptyObjects.result.title')}</h4>
                              <CodeEditor
                                value={t('documentation.php.options.removeEmptyObjects.result.code')}
                                language="php"
                                readOnly
                                height="120px"
                                className="mb-4"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Sort Keys */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.php.options.sortKeys.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.php.options.sortKeys.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.php.options.sortKeys.example.title')}</h4>
                              <CodeEditor
                                value={t('documentation.php.options.sortKeys.example.code')}
                                language="php"
                                readOnly
                                height="120px"
                                className="mb-4"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.php.options.sortKeys.result.title')}</h4>
                              <CodeEditor
                                value={t('documentation.php.options.sortKeys.result.code')}
                                language="php"
                                readOnly
                                height="120px"
                                className="mb-4"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
