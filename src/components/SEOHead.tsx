import { generateHreflangTags, generateCanonicalTag } from '@/lib/seo'

interface SEOHeadProps {
  locale: string
  pageType?: 'home' | 'about' | 'legal' | 'privacy' | 'contact' | 'documentation'
}

/**
 * Composant pour gérer les balises SEO (canonical et hreflang)
 */
export default function SEOHead({ locale, pageType }: SEOHeadProps) {
  const canonicalTag = generateCanonicalTag(locale, pageType)
  const hreflangTags = generateHreflangTags(locale, pageType)
  
  return (
    <>
      {/* Balise canonical */}
      <link {...canonicalTag} />
      
      {/* Balises hreflang */}
      {hreflangTags.map(tag => {
        const { key, ...linkProps } = tag;
        return <link key={key} {...linkProps} />;
      })}
    </>
  )
}
