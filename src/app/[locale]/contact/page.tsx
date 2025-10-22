import type { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'
import StructuredData from '@/components/StructuredData'

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params
  
  if (locale === 'fr') {
    return {
      title: 'Contact — FastMinify Minificateur JavaScript, CSS & JSON',
      description: 'Contactez le développeur de FastMinify pour toute question, suggestion ou rapport de bug. Je suis là pour vous aider à optimiser votre code.',
      keywords: [
        'contact fastminify',
        'support minification',
        'aide minify',
        'rapport bug',
        'suggestion fonctionnalité',
        'support technique',
        'contact développeur',
        'aide outil minification'
      ]
    }
  }
  
  return {
    title: 'Contact — FastMinify JavaScript, CSS & JSON Minifier',
    description: 'Contact the FastMinify developer for any questions, suggestions or bug reports. I\'m here to help you optimize your code.',
    keywords: [
      'contact fastminify',
      'minification support',
      'minify help',
      'bug report',
      'feature suggestion',
      'technical support',
      'developer contact',
      'minification tool help'
    ]
  }
}

// Server component that renders the client component
export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params
  
  return (
    <>
      <StructuredData locale={locale} pageType="contact" />
      <ContactPageClient locale={locale} />
    </>
  )
}
