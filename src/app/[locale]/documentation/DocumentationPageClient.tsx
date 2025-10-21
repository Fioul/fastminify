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
                    <h3 className="text-lg font-semibold mb-3">{t('documentation.javascript.package.title')}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">Terser</Badge>
                      <Badge variant="outline">v5.24.0</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t('documentation.javascript.package.description')}
                    </p>
                  </div>

                  {/* Basic Example */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-3">{t('documentation.javascript.basicExample.title')}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">{t('documentation.javascript.basicExample.input')}</h4>
                        <CodeEditor
                          value={t('documentation.javascript.basicExample.inputCode')}
                          language="javascript"
                          readOnly
                          height="200px"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">{t('documentation.javascript.basicExample.output')}</h4>
                        <CodeEditor
                          value={t('documentation.javascript.basicExample.outputCode')}
                          language="javascript"
                          readOnly
                          height="200px"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Options */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">{t('documentation.javascript.options.title')}</h3>
                    <div className="grid gap-6">
                      {/* Compress Options */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">compress</CardTitle>
                          <CardDescription>
                            {t('documentation.javascript.options.compress.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.javascript.options.compress.example.title')}</h4>
                              <CodeEditor
                                value={t('documentation.javascript.options.compress.example.code')}
                                language="javascript"
                                readOnly
                                height="120px"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.javascript.options.compress.result.title')}</h4>
                              <CodeEditor
                                value={t('documentation.javascript.options.compress.result.code')}
                                language="javascript"
                                readOnly
                                height="120px"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Mangle Options */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">mangle</CardTitle>
                          <CardDescription>
                            {t('documentation.javascript.options.mangle.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.javascript.options.mangle.example.title')}</h4>
                              <CodeEditor
                                value={t('documentation.javascript.options.mangle.example.code')}
                                language="javascript"
                                readOnly
                                height="120px"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">{t('documentation.javascript.options.mangle.result.title')}</h4>
                              <CodeEditor
                                value={t('documentation.javascript.options.mangle.result.code')}
                                language="javascript"
                                readOnly
                                height="120px"
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
                    <h3 className="text-lg font-semibold mb-3">{t('documentation.css.package.title')}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">CSSO</Badge>
                      <Badge variant="outline">v7.0.0</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t('documentation.css.package.description')}
                    </p>
                  </div>

                  {/* Basic Example */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-3">{t('documentation.css.basicExample.title')}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">{t('documentation.css.basicExample.input')}</h4>
                        <CodeEditor
                          value={t('documentation.css.basicExample.inputCode')}
                          language="css"
                          readOnly
                          height="200px"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">{t('documentation.css.basicExample.output')}</h4>
                        <CodeEditor
                          value={t('documentation.css.basicExample.outputCode')}
                          language="css"
                          readOnly
                          height="200px"
                        />
                      </div>
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
                    <h3 className="text-lg font-semibold mb-3">{t('documentation.json.basicExample.title')}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">{t('documentation.json.basicExample.input')}</h4>
                        <CodeEditor
                          value={t('documentation.json.basicExample.inputCode')}
                          language="json"
                          readOnly
                          height="200px"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">{t('documentation.json.basicExample.output')}</h4>
                        <CodeEditor
                          value={t('documentation.json.basicExample.outputCode')}
                          language="json"
                          readOnly
                          height="200px"
                        />
                      </div>
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
                    <h3 className="text-lg font-semibold mb-3">{t('documentation.php.basicExample.title')}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">{t('documentation.php.basicExample.input')}</h4>
                        <CodeEditor
                          value={t('documentation.php.basicExample.inputCode')}
                          language="php"
                          readOnly
                          height="200px"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">{t('documentation.php.basicExample.output')}</h4>
                        <CodeEditor
                          value={t('documentation.php.basicExample.outputCode')}
                          language="php"
                          readOnly
                          height="200px"
                        />
                      </div>
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
