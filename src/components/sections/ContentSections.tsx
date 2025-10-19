'use client'

import { useTranslations } from '@/hooks/useTranslations'

interface ContentSectionsProps {
  locale: string
}

export default function ContentSections({ locale }: ContentSectionsProps) {
  const { t, tArray } = useTranslations(locale)

  return (
    <div className="max-w-5xl mx-auto mt-24 space-y-16">
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
                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-4 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                  <pre className="whitespace-pre">{`function calculateTotal(items) {
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
                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-4 rounded-lg font-mono text-xs leading-relaxed">
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
                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-4 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
                  <pre className="whitespace-pre">{`.header {
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
                <div className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-4 rounded-lg font-mono text-xs leading-relaxed">
                  <pre className="whitespace-pre-wrap break-all">{`.header{background-color:#fff;padding:20px;margin-bottom:10px;border-radius:5px;color:#333}.header .title{font-size:24px;font-weight:700;color:#333}`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS GRID */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
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
        
        <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
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
        
        <div className="text-center space-y-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
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
          <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-yellow-600">JS</span>
            </div>
            <span className="text-sm font-medium text-center px-2">{t('content.languages.javascript')}</span>
          </div>
          <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-blue-600">CSS</span>
            </div>
            <span className="text-sm font-medium text-center px-2">{t('content.languages.css')}</span>
          </div>
          <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-green-600">JSON</span>
            </div>
            <span className="text-sm font-medium text-center px-2">{t('content.languages.json')}</span>
          </div>
          <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
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
      <section className="mt-24 bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 space-y-6 border border-gray-200 dark:border-gray-700">
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
              {tArray('content.seoOptimization.seoImpact.items').map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-l-4 border-primary pl-3">
              {t('content.seoOptimization.technicalOptimizations.title')}
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              {tArray('content.seoOptimization.technicalOptimizations.items').map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
