'use client'

import React from 'react'

interface StructuredDataProps {
  locale: string
  pageType?: 'home' | 'about' | 'privacy' | 'legal'
}

export default function StructuredData({ locale, pageType = 'home' }: StructuredDataProps) {
  const isFrench = locale === 'fr'
  
  // Base URL
  const baseUrl = 'https://fastminify.com'
  const currentUrl = `${baseUrl}/${locale === 'fr' ? 'fr' : 'en'}${pageType !== 'home' ? `/${pageType}` : ''}`
  
  // Translations
  const translations = {
    fr: {
      siteName: 'FastMinify',
      siteDescription: 'Minificateur JavaScript, CSS et JSON en ligne gratuit, rapide et privé',
      appName: 'FastMinify - Minificateur de Code',
      appDescription: 'Minifiez votre code JavaScript, CSS et JSON instantanément. Outil en ligne gratuit, rapide et privé. Aucune inscription requise.',
      features: [
        'Minification JavaScript',
        'Minification CSS', 
        'Minification JSON',
        'Déminification de code',
        'Beautification de code',
        'Concaténation de fichiers',
        'Traitement côté client',
        'Aucune donnée envoyée'
      ],
      howToTitle: 'Comment minifier du code JavaScript et CSS ?',
      howToSteps: [
        'Collez votre code dans l\'éditeur de gauche',
        'Sélectionnez le type de code (JavaScript, CSS, JSON)',
        'Cliquez sur le bouton "Minifier"',
        'Copiez ou téléchargez le code minifié'
      ],
      faq: [
        {
          question: 'FastMinify est-il vraiment gratuit ?',
          answer: 'Oui, FastMinify est 100% gratuit et le restera toujours. Aucune inscription, aucun paiement requis.'
        },
        {
          question: 'Mes données sont-elles sécurisées ?',
          answer: 'Absolument. Tout le traitement se fait dans votre navigateur. Aucune donnée n\'est envoyée vers nos serveurs.'
        },
        {
          question: 'Quels types de fichiers puis-je minifier ?',
          answer: 'FastMinify supporte JavaScript, CSS et JSON. Vous pouvez aussi déminifier et beautifier du code.'
        }
      ]
    },
    en: {
      siteName: 'FastMinify',
      siteDescription: 'Free, fast and private online JavaScript, CSS and JSON minifier',
      appName: 'FastMinify - Code Minifier',
      appDescription: 'Minify your JavaScript, CSS and JSON code instantly. Free, fast and private online tool. No registration required.',
      features: [
        'JavaScript minification',
        'CSS minification',
        'JSON minification', 
        'Code unminification',
        'Code beautification',
        'File concatenation',
        'Client-side processing',
        'No data sent'
      ],
      howToTitle: 'How to minify JavaScript and CSS code?',
      howToSteps: [
        'Paste your code in the left editor',
        'Select the code type (JavaScript, CSS, JSON)',
        'Click the "Minify" button',
        'Copy or download the minified code'
      ],
      faq: [
        {
          question: 'Is FastMinify really free?',
          answer: 'Yes, FastMinify is 100% free and will always remain so. No registration, no payment required.'
        },
        {
          question: 'Is my data secure?',
          answer: 'Absolutely. All processing happens in your browser. No data is sent to our servers.'
        },
        {
          question: 'What file types can I minify?',
          answer: 'FastMinify supports JavaScript, CSS and JSON. You can also unminify and beautify code.'
        }
      ]
    }
  }
  
  const t = translations[isFrench ? 'fr' : 'en']
  
  // WebApplication Schema
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t.appName,
    "description": t.appDescription,
    "url": baseUrl,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0",
    "datePublished": "2025-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "author": {
      "@type": "Organization",
      "name": "FastMinify",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization", 
      "name": "FastMinify",
      "url": baseUrl
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": t.features,
    "softwareHelp": {
      "@type": "CreativeWork",
      "name": t.howToTitle,
      "description": t.howToSteps.join(' ')
    },
    "inLanguage": isFrench ? "fr" : "en",
    "isAccessibleForFree": true,
    "license": "https://opensource.org/licenses/MIT"
  }
  
  // WebSite Schema
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": t.siteName,
    "description": t.siteDescription,
    "url": baseUrl,
    "inLanguage": [isFrench ? "fr" : "en"],
    "publisher": {
      "@type": "Organization",
      "name": "FastMinify",
      "url": baseUrl
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }
  
  // Site Navigation Schema
  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": isFrench ? "Navigation principale" : "Main navigation",
    "url": baseUrl,
    "hasPart": [
      {
        "@type": "SiteNavigationElement",
        "name": isFrench ? "Accueil" : "Home",
        "url": baseUrl
      },
      {
        "@type": "SiteNavigationElement", 
        "name": isFrench ? "À propos" : "About",
        "url": `${baseUrl}/${isFrench ? 'fr' : 'en'}/about`
      },
      {
        "@type": "SiteNavigationElement",
        "name": isFrench ? "Confidentialité" : "Privacy", 
        "url": `${baseUrl}/${isFrench ? 'fr' : 'en'}/privacy`
      },
      {
        "@type": "SiteNavigationElement",
        "name": isFrench ? "Mentions légales" : "Legal",
        "url": `${baseUrl}/${isFrench ? 'fr' : 'en'}/legal`
      }
    ]
  }
  
  // HowTo Schema (for home page)
  const howToSchema = pageType === 'home' ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": t.howToTitle,
    "description": t.appDescription,
    "totalTime": "PT1M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": isFrench ? "Code à minifier" : "Code to minify"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "FastMinify",
        "url": baseUrl
      }
    ],
    "step": t.howToSteps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": isFrench ? `Étape ${index + 1}` : `Step ${index + 1}`,
      "text": step,
      "url": `${baseUrl}#step-${index + 1}`
    }))
  } : null
  
  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": t.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }
  
  // Combine all schemas
  const schemas = [
    webApplicationSchema,
    webSiteSchema,
    siteNavigationSchema,
    ...(howToSchema ? [howToSchema] : []),
    faqSchema
  ]
  
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
        />
      ))}
    </>
  )
}
