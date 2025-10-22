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
                  <TabsTrigger key={lang.value} value={lang.value} className="flex items-center gap-2 cursor-pointer">
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
                                  <pre className="whitespace-pre-wrap break-all">{`function calculateTotal(t){let e=0;for(let o=0;o<t.length;o++)e+=t[o].price;return e}const products=[{name:"Laptop",price:999},{name:"Mouse",price:25}];console.log("Total:",calculateTotal(products));`}</pre>
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
                                  <div className="space-y-4">
                                    <h4 className="font-medium text-sm">{t('documentation.javascript.options.ecmaVersion.examples')}</h4>
                                    <div className="grid md:grid-cols-5 gap-4">
                                      <div className="md:col-span-2">
                                        <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.originalCode')} (ES2022)</h5>
                                        <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                          <pre className="whitespace-pre">{`const data = { name: 'test' };
const { name } = data;
console.log(name);`}</pre>
                                        </div>
                                      </div>
                                      <div className="md:col-span-3 space-y-3">
                                        <div>
                                          <h5 className="text-xs font-medium text-muted-foreground mb-2">ES2022</h5>
                                          <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                            <pre className="whitespace-pre-wrap break-all">{`const{name:data}=data;console.log(data)`}</pre>
                                          </div>
                                        </div>
                                        <div>
                                          <h5 className="text-xs font-medium text-muted-foreground mb-2">ES5</h5>
                                          <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                            <pre className="whitespace-pre-wrap break-all">{`var data={name:'test'};var name=data.name;console.log(name)`}</pre>
                                          </div>
                                        </div>
                                      </div>
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
                          <div className="grid gap-2 mb-6">
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
                          
                          {/* Code Examples */}
                          <div className="space-y-4">
                            <h4 className="font-medium text-sm">{t('documentation.javascript.options.compressionLevel.examples')}</h4>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-2">
                                <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.originalCode')}</h5>
                                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                  <pre className="whitespace-pre">{`function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price;
    }
    return total;
}`}</pre>
                                </div>
                              </div>
                              <div className="md:col-span-3 space-y-3">
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">Conservative</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`function calculateTotal(items){let total=0;for(let i=0;i<items.length;i++)total+=items[i].price;return total}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">Normal</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`function calculateTotal(t){let e=0;for(let l=0;l<t.length;l++)e+=t[l].price;return e}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">Aggressive</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`function e(e){let t=0;for(let n=0;n<e.length;n++)t+=e[n].price;return t}`}</pre>
                                  </div>
                                </div>
                              </div>
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
                          <div className="space-y-4">
                            <h4 className="font-medium text-sm">{t('documentation.javascript.options.preserveClassNames.comparison')}</h4>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-2">
                                <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.originalCode')}</h5>
                                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                  <pre className="whitespace-pre">{`element.className = 'my-class';
element.setAttribute('class', 'another-class');`}</pre>
                                </div>
                              </div>
                              <div className="md:col-span-3 space-y-3">
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.withTrue')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`element.className='my-class';element.setAttribute('class','another-class')`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.withFalse')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`element.className='a';element.setAttribute('class','b')`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.difference')}</h5>
                                  <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700 p-3 rounded-lg font-mono text-xs leading-relaxed">
                                    <pre className="whitespace-pre-wrap break-all">{t('documentation.javascript.options.preserveClassNames.differenceText')}</pre>
                                  </div>
                                </div>
                              </div>
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
                          <div className="space-y-4">
                            <h4 className="font-medium text-sm">{t('documentation.javascript.options.preserveClassNames.comparison')}</h4>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-2">
                                <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.originalCode')}</h5>
                                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                  <pre className="whitespace-pre">{`function myFunction() { 
    return true; 
}
const obj = { myMethod() { return false; } };`}</pre>
                                </div>
                              </div>
                              <div className="md:col-span-3 space-y-3">
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveFunctionNames.withTrue')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`function myFunction(){return!0}const obj={myMethod(){return!1}}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveFunctionNames.withFalse')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`function a(){return!0}const obj={b(){return!1}}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.difference')}</h5>
                                  <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700 p-3 rounded-lg font-mono text-xs leading-relaxed">
                                    <pre className="whitespace-pre-wrap break-all">{t('documentation.javascript.options.preserveFunctionNames.differenceText')}</pre>
                                  </div>
                                </div>
                              </div>
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
                          <div className="space-y-4">
                            <h4 className="font-medium text-sm">{t('documentation.javascript.options.preserveClassNames.comparison')}</h4>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-2">
                                <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.originalCode')}</h5>
                                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                  <pre className="whitespace-pre">{`console.log('Debug info');
console.warn('Warning message');
const result = calculateTotal(items);
console.log('Result:', result);
return result;`}</pre>
                                </div>
                              </div>
                              <div className="md:col-span-3 space-y-3">
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.removeConsole.withTrue')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`const result=calculateTotal(items);return result`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.removeConsole.withFalse')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`console.log('Debug info');console.warn('Warning message');const result=calculateTotal(items);console.log('Result:',result);return result`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.difference')}</h5>
                                  <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700 p-3 rounded-lg font-mono text-xs leading-relaxed">
                                    <pre className="whitespace-pre-wrap break-all">{t('documentation.javascript.options.removeConsole.differenceText')}</pre>
                                  </div>
                                </div>
                              </div>
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
                          <div className="space-y-4">
                            <h4 className="font-medium text-sm">{t('documentation.javascript.options.preserveClassNames.comparison')}</h4>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-2">
                                <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.originalCode')}</h5>
                                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                  <pre className="whitespace-pre">{`if (condition) {
    debugger;
    return true;
}
function test() {
    debugger;
    return false;
}`}</pre>
                                </div>
                              </div>
                              <div className="md:col-span-3 space-y-3">
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.removeDebugger.withTrue')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`if(condition)return!0;function test(){return!1}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.removeDebugger.withFalse')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`if(condition){debugger;return!0}function test(){debugger;return!1}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.difference')}</h5>
                                  <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700 p-3 rounded-lg font-mono text-xs leading-relaxed">
                                    <pre className="whitespace-pre-wrap break-all">{t('documentation.javascript.options.removeDebugger.differenceText')}</pre>
                                  </div>
                                </div>
                              </div>
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


                      {/* Remove Comments */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{t('documentation.css.options.removeComments.title')}</CardTitle>
                          <CardDescription>
                            {t('documentation.css.options.removeComments.description')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-4">
                            <h4 className="font-medium text-sm">{t('documentation.javascript.options.preserveClassNames.comparison')}</h4>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-2">
                                <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.originalCode')}</h5>
                                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                  <pre className="whitespace-pre">{`/* Header styles */
.header {
    background: #fff;
    padding: 20px;
}

/* Navigation */
.nav { display: flex; }`}</pre>
                                </div>
                              </div>
                              <div className="md:col-span-3 space-y-3">
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.css.options.removeComments.withTrue')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`.header{background:#fff;padding:20px}.nav{display:flex}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.css.options.removeComments.withFalse')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`/* Header styles */.header{background:#fff;padding:20px}/* Navigation */.nav{display:flex}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.difference')}</h5>
                                  <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700 p-3 rounded-lg font-mono text-xs leading-relaxed">
                                    <pre className="whitespace-pre-wrap break-all">{t('documentation.css.options.removeComments.differenceText')}</pre>
                                  </div>
                                </div>
                              </div>
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
                          <div className="space-y-4">
                            <h4 className="font-medium text-sm">{t('documentation.javascript.options.preserveClassNames.comparison')}</h4>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-2">
                                <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.originalCode')}</h5>
                                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                  <pre className="whitespace-pre">{`.button {
    background: #ff0000;
    color: rgb(255, 255, 255);
    border: 1px solid hsl(0, 100%, 50%);
}`}</pre>
                                </div>
                              </div>
                              <div className="md:col-span-3 space-y-3">
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.css.options.convertColors.withTrue')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`.button{background:red;color:#fff;border:1px solid red}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.css.options.convertColors.withFalse')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`.button{background:#ff0000;color:rgb(255,255,255);border:1px solid hsl(0,100%,50%)}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.difference')}</h5>
                                  <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700 p-3 rounded-lg font-mono text-xs leading-relaxed">
                                    <pre className="whitespace-pre-wrap break-all">{t('documentation.css.options.convertColors.differenceText')}</pre>
                                  </div>
                                </div>
                              </div>
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
                          <div className="space-y-4">
                            <h4 className="font-medium text-sm">{t('documentation.javascript.options.preserveClassNames.comparison')}</h4>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-2">
                                <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.originalCode')}</h5>
                                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                  <pre className="whitespace-pre">{`.header {
    background: #fff;
    padding: 20px;
}
.header {
    margin: 10px;
}`}</pre>
                                </div>
                              </div>
                              <div className="md:col-span-3 space-y-3">
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.css.options.mergeRules.withTrue')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`.header{background:#fff;padding:20px;margin:10px}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.css.options.mergeRules.withFalse')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`.header{background:#fff;padding:20px}.header{margin:10px}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.difference')}</h5>
                                  <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700 p-3 rounded-lg font-mono text-xs leading-relaxed">
                                    <pre className="whitespace-pre-wrap break-all">{t('documentation.css.options.mergeRules.differenceText')}</pre>
                                  </div>
                                </div>
                              </div>
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
                          <div className="space-y-4">
                            <h4 className="font-medium text-sm">{t('documentation.javascript.options.preserveClassNames.comparison')}</h4>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-2">
                                <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.originalCode')}</h5>
                                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                  <pre className="whitespace-pre">{`div.container > ul li:first-child {
    color: red;
}

div.container > ul li:last-child {
    color: blue;
}`}</pre>
                                </div>
                              </div>
                              <div className="md:col-span-3 space-y-3">
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.css.options.minifySelectors.withTrue')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`div.container>ul li:first-child{color:red}div.container>ul li:last-child{color:blue}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.css.options.minifySelectors.withFalse')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`div.container > ul li:first-child{color:red}div.container > ul li:last-child{color:blue}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.difference')}</h5>
                                  <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700 p-3 rounded-lg font-mono text-xs leading-relaxed">
                                    <pre className="whitespace-pre-wrap break-all">{t('documentation.css.options.minifySelectors.differenceText')}</pre>
                                  </div>
                                </div>
                              </div>
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
                          <div className="grid gap-2 mb-6">
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
                          
                          {/* Code Examples */}
                          <div className="space-y-4">
                            <h4 className="font-medium text-sm">{t('documentation.javascript.options.compressionLevel.examples')}</h4>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-2">
                                <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.originalCode')}</h5>
                                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                  <pre className="whitespace-pre">{`{
  "name": "test",
  "value": 42,
  "active": true,
  "items": [1, 2, 3]
}`}</pre>
                                </div>
                              </div>
                              <div className="md:col-span-3 space-y-3">
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">Conservative</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`{"name":"test","value":42,"active":true,"items":[1,2,3]}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">Normal</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`{"name":"test","value":42,"active":true,"items":[1,2,3]}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">Aggressive</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`{"name":"test","value":42,"active":!0,"items":[1,2,3]}`}</pre>
                                  </div>
                                </div>
                              </div>
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
                          <div className="space-y-4">
                            <h4 className="font-medium text-sm">{t('documentation.javascript.options.preserveClassNames.comparison')}</h4>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-2">
                                <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.originalCode')}</h5>
                                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                  <pre className="whitespace-pre">{`{
  "price": 10.00,
  "count": 0,
  "rate": 1.0
}`}</pre>
                                </div>
                              </div>
                              <div className="md:col-span-3 space-y-3">
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.json.options.optimizeNumbers.withTrue')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`{"price":10,"count":0,"rate":1}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.json.options.optimizeNumbers.withFalse')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`{"price":10.00,"count":0,"rate":1.0}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.difference')}</h5>
                                  <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700 p-3 rounded-lg font-mono text-xs leading-relaxed">
                                    <pre className="whitespace-pre-wrap break-all">{t('documentation.json.options.optimizeNumbers.differenceText')}</pre>
                                  </div>
                                </div>
                              </div>
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
                          <div className="space-y-4">
                            <h4 className="font-medium text-sm">{t('documentation.javascript.options.preserveClassNames.comparison')}</h4>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-2">
                                <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.originalCode')}</h5>
                                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                  <pre className="whitespace-pre">{`{
  "name": "test",
  "value": null,
  "active": true,
  "count": null
}`}</pre>
                                </div>
                              </div>
                              <div className="md:col-span-3 space-y-3">
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.json.options.removeNullValues.withTrue')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`{"name":"test","active":true}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.json.options.removeNullValues.withFalse')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`{"name":"test","value":null,"active":true,"count":null}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.difference')}</h5>
                                  <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700 p-3 rounded-lg font-mono text-xs leading-relaxed">
                                    <pre className="whitespace-pre-wrap break-all">Toutes les valeurs null sont supprimées</pre>
                                  </div>
                                </div>
                              </div>
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
                          <div className="space-y-4">
                            <h4 className="font-medium text-sm">{t('documentation.javascript.options.preserveClassNames.comparison')}</h4>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-2">
                                <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.originalCode')}</h5>
                                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                  <pre className="whitespace-pre">{`{
  "name": "test",
  "items": [],
  "active": true,
  "tags": []
}`}</pre>
                                </div>
                              </div>
                              <div className="md:col-span-3 space-y-3">
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.json.options.removeEmptyArrays.withTrue')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`{"name":"test","active":true}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.json.options.removeEmptyArrays.withFalse')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`{"name":"test","items":[],"active":true,"tags":[]}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.difference')}</h5>
                                  <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700 p-3 rounded-lg font-mono text-xs leading-relaxed">
                                    <pre className="whitespace-pre-wrap break-all">{t('documentation.json.options.removeEmptyArrays.differenceText')}</pre>
                                  </div>
                                </div>
                              </div>
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
                          <div className="space-y-4">
                            <h4 className="font-medium text-sm">{t('documentation.javascript.options.preserveClassNames.comparison')}</h4>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-2">
                                <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.originalCode')}</h5>
                                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                  <pre className="whitespace-pre">{`{
  "zebra": "striped",
  "apple": "red",
  "banana": "yellow"
}`}</pre>
                                </div>
                              </div>
                              <div className="md:col-span-3 space-y-3">
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.json.options.sortObjectKeys.withTrue')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`{"apple":"red","banana":"yellow","zebra":"striped"}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.json.options.sortObjectKeys.withFalse')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`{"zebra":"striped","apple":"red","banana":"yellow"}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.difference')}</h5>
                                  <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700 p-3 rounded-lg font-mono text-xs leading-relaxed">
                                    <pre className="whitespace-pre-wrap break-all">{t('documentation.json.options.sortObjectKeys.differenceText')}</pre>
                                  </div>
                                </div>
                              </div>
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
                          <div className="space-y-4">
                            <h4 className="font-medium text-sm">{t('documentation.javascript.options.preserveClassNames.comparison')}</h4>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-2">
                                <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.originalCode')}</h5>
                                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                  <pre className="whitespace-pre">{`$data = [
    'name' => 'test',
    'value' => null,
    'active' => true,
    'count' => null
];`}</pre>
                                </div>
                              </div>
                              <div className="md:col-span-3 space-y-3">
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.php.options.includeNullValues.withTrue')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`a:4:{s:4:"name";s:4:"test";s:5:"value";N;s:6:"active";b:1;s:5:"count";N;}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.php.options.includeNullValues.withFalse')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`a:2:{s:4:"name";s:4:"test";s:6:"active";b:1;}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.difference')}</h5>
                                  <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700 p-3 rounded-lg font-mono text-xs leading-relaxed">
                                    <pre className="whitespace-pre-wrap break-all">{t('documentation.php.options.includeNullValues.differenceText')}</pre>
                                  </div>
                                </div>
                              </div>
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
                          <div className="space-y-4">
                            <h4 className="font-medium text-sm">{t('documentation.javascript.options.preserveClassNames.comparison')}</h4>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-2">
                                <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.originalCode')}</h5>
                                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                  <pre className="whitespace-pre">{`$data = [
    'name' => 'test',
    'items' => [],
    'active' => true,
    'tags' => []
];`}</pre>
                                </div>
                              </div>
                              <div className="md:col-span-3 space-y-3">
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.json.options.removeEmptyArrays.withTrue')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`a:2:{s:4:"name";s:4:"test";s:6:"active";b:1;}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.json.options.removeEmptyArrays.withFalse')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`a:4:{s:4:"name";s:4:"test";s:5:"items";a:0:{};s:6:"active";b:1;s:4:"tags";a:0:{}}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.difference')}</h5>
                                  <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700 p-3 rounded-lg font-mono text-xs leading-relaxed">
                                    <pre className="whitespace-pre-wrap break-all">{t('documentation.json.options.removeEmptyArrays.differenceText')} de la sérialisation</pre>
                                  </div>
                                </div>
                              </div>
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
                          <div className="space-y-4">
                            <h4 className="font-medium text-sm">{t('documentation.javascript.options.preserveClassNames.comparison')}</h4>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-2">
                                <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.originalCode')}</h5>
                                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                  <pre className="whitespace-pre">{`$data = [
    'name' => 'test',
    'config' => (object)[],
    'active' => true,
    'settings' => (object)[]
];`}</pre>
                                </div>
                              </div>
                              <div className="md:col-span-3 space-y-3">
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.php.options.removeEmptyObjects.withTrue')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`a:2:{s:4:"name";s:4:"test";s:6:"active";b:1;}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.php.options.removeEmptyObjects.withFalse')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`a:4:{s:4:"name";s:4:"test";s:6:"config";O:8:"stdClass":0:{};s:6:"active";b:1;s:8:"settings";O:8:"stdClass":0:{}}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.difference')}</h5>
                                  <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700 p-3 rounded-lg font-mono text-xs leading-relaxed">
                                    <pre className="whitespace-pre-wrap break-all">{t('documentation.php.options.removeEmptyObjects.differenceText')}</pre>
                                  </div>
                                </div>
                              </div>
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
                          <div className="space-y-4">
                            <h4 className="font-medium text-sm">{t('documentation.javascript.options.preserveClassNames.comparison')}</h4>
                            <div className="grid md:grid-cols-5 gap-4">
                              <div className="md:col-span-2">
                                <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.originalCode')}</h5>
                                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                  <pre className="whitespace-pre">{`$data = [
    'zebra' => 'striped',
    'apple' => 'red',
    'banana' => 'yellow'
];`}</pre>
                                </div>
                              </div>
                              <div className="md:col-span-3 space-y-3">
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.php.options.sortKeys.withTrue')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`a:3:{s:5:"apple";s:3:"red";s:6:"banana";s:6:"yellow";s:5:"zebra";s:7:"striped";}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.php.options.sortKeys.withFalse')}</h5>
                                  <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-3 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                                    <pre className="whitespace-pre-wrap break-all">{`a:3:{s:5:"zebra";s:7:"striped";s:5:"apple";s:3:"red";s:6:"banana";s:6:"yellow";}`}</pre>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-muted-foreground mb-2">{t('documentation.javascript.options.preserveClassNames.difference')}</h5>
                                  <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700 p-3 rounded-lg font-mono text-xs leading-relaxed">
                                    <pre className="whitespace-pre-wrap break-all">{t('documentation.php.options.sortKeys.differenceText')}</pre>
                                  </div>
                                </div>
                              </div>
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
