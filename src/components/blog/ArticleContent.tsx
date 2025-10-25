'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, Info, Lightbulb, AlertTriangle, TrendingUp, Clock, Zap } from 'lucide-react'
import { BlogArticle, BlogContent } from '@/types/blog'
import Link from 'next/link'

interface ArticleContentProps {
  article: BlogArticle & { content: BlogContent }
}

export function ArticleContent({ article }: ArticleContentProps) {
  const { content } = article

  if (!content?.content) {
    return <div>Contenu non disponible</div>
  }

  const { introduction, realWorldImpact, terserSetup, uglifySetup, webpackIntegration, advancedTechniques, monitoring, conclusion } = content.content

  return (
    <div className="prose prose-lg max-w-none">
      {/* Introduction */}
      {introduction && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{introduction.title}</h2>
          <p className="text-lg text-muted-foreground mb-6">{introduction.text}</p>
          
          {introduction.benefits && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {introduction.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Real World Impact */}
      {realWorldImpact && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{realWorldImpact.title}</h2>
          <div className="space-y-8">
            {realWorldImpact.sections?.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                  <p className="text-muted-foreground">{section.description}</p>
                </CardHeader>
                <CardContent>
                  {section.image && (
                    <div className="mb-6">
                      <img 
                        src={section.image} 
                        alt={section.imageAlt || section.title || 'Article image'} 
                        className="w-full h-32 md:h-40 object-cover rounded-lg shadow-md"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  {section.metrics && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-red-600">Avant optimisation</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Taille des fichiers :</span>
                            <span className="font-mono">{section.metrics.before.fileSize}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Temps de chargement :</span>
                            <span className="font-mono">{section.metrics.before.loadTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Taux de rebond :</span>
                            <span className="font-mono">{section.metrics.before.bounceRate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Taux de conversion :</span>
                            <span className="font-mono">{section.metrics.before.conversionRate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-green-600">Après optimisation</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Taille des fichiers :</span>
                            <span className="font-mono">{section.metrics.after.fileSize}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Temps de chargement :</span>
                            <span className="font-mono">{section.metrics.after.loadTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Taux de rebond :</span>
                            <span className="font-mono">{section.metrics.after.bounceRate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Taux de conversion :</span>
                            <span className="font-mono">{section.metrics.after.conversionRate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {section.vitals && (
                    <div className="space-y-2">
                      {section.vitals.map((vital, vitalIndex) => (
                        <div key={vitalIndex} className="flex items-start gap-3">
                          <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{vital}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Terser Setup */}
      {terserSetup && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{terserSetup.title}</h2>
          <div className="space-y-8">
            {terserSetup.sections?.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                  <p className="text-muted-foreground">{section.description}</p>
                </CardHeader>
                <CardContent>
                  {section.image && (
                    <div className="mb-6">
                      <img 
                        src={section.image} 
                        alt={section.imageAlt || section.title || 'Article image'} 
                        className="w-full h-32 md:h-40 object-cover rounded-lg shadow-md"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  <div className="space-y-6">
                    {section.steps?.map((step, stepIndex) => (
                      <div key={stepIndex}>
                        <h4 className="font-semibold mb-2">{step.title}</h4>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    ))}
                    {section.code && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Configuration</h4>
                          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{section.code.config}</code>
                          </pre>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Utilisation</h4>
                          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{section.code.usage}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* UglifyJS Setup */}
      {uglifySetup && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{uglifySetup.title}</h2>
          <div className="space-y-8">
            {uglifySetup.sections?.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                  <p className="text-muted-foreground">{section.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {section.steps?.map((step, stepIndex) => (
                      <div key={stepIndex}>
                        <h4 className="font-semibold mb-2">{step.title}</h4>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Webpack Integration */}
      {webpackIntegration && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{webpackIntegration.title}</h2>
          <div className="space-y-8">
            {webpackIntegration.sections?.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                  <p className="text-muted-foreground">{section.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Configuration Webpack</h4>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{section.code?.webpackConfig}</code>
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">package.json</h4>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{section.code?.packageJson}</code>
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Advanced Techniques */}
      {advancedTechniques && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{advancedTechniques.title}</h2>
          <div className="space-y-8">
            {advancedTechniques.sections?.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                  <p className="text-muted-foreground">{section.description}</p>
                </CardHeader>
                <CardContent>
                  {section.techniques && (
                    <div className="space-y-2 mb-6">
                      {section.techniques.map((technique, techniqueIndex) => (
                        <div key={techniqueIndex} className="flex items-start gap-3">
                          <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span>{technique}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.code && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 text-red-600">❌ Avant</h4>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{section.code.before}</code>
                        </pre>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-green-600">✅ Après</h4>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{section.code.after}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Monitoring */}
      {monitoring && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{monitoring.title}</h2>
          <div className="space-y-8">
            {monitoring.sections?.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                  <p className="text-muted-foreground">{section.description}</p>
                </CardHeader>
                <CardContent>
                  {section.image && (
                    <div className="mb-6">
                      <img 
                        src={section.image} 
                        alt={section.imageAlt || section.title || 'Article image'} 
                        className="w-full h-32 md:h-40 object-cover rounded-lg shadow-md"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  {section.tools && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {section.tools.map((tool, toolIndex) => (
                        <div key={toolIndex} className="flex items-start gap-3">
                          <Zap className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{tool}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.code && (
                    <div>
                      <h4 className="font-semibold mb-2">Configuration GitHub Actions</h4>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{section.code}</code>
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Conclusion */}
      {conclusion && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{conclusion.title}</h2>
          <p className="text-lg text-muted-foreground mb-6">{conclusion.text}</p>
          
          <div className="space-y-4">
            {conclusion.recommendations?.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{recommendation}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}