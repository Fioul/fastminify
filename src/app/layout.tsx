import type {Metadata} from 'next'
import {Inter, Nunito_Sans} from 'next/font/google'
import './globals.css'
import '../styles/fonts.css'
import {Toaster} from '@/components/ui/sonner'
import {ThemeProvider} from '@/components/ThemeProvider'
import ClientFooter from '@/components/ClientFooter'
import ClientScripts from '@/components/ClientScripts'
import StructuredData from '@/components/StructuredData'
import FaviconHead from '@/components/FaviconHead'
import CookieConsent from '@/components/CookieConsent'
import {cn} from '@/lib/utils'
import { headers } from 'next/headers'

// Inter font configuration
const inter = Inter({subsets: ['latin']})

// Nunito Sans font configuration (similar to Gordita)
const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nunito-sans',
})

// SEO / Meta configuration
export const metadata: Metadata = {
    title: 'FastMinify — Free Online JavaScript, CSS & JSON Minifier Tool',
    description:
        'Minify JavaScript, CSS and JSON code online instantly with our free tool. Reduce file size, improve loading times, and optimize web performance. No registration required.',
    keywords: [
        'minify javascript',
        'minify css',
        'minify json',
        'javascript minifier',
        'css minifier',
        'json minifier',
        'online minifier',
        'minify js online',
        'minify css online',
        'minify json online',
        'free javascript minifier',
        'free css minifier',
        'free json minifier',
        'online tool',
        'web performance',
        'code optimization',
        'minification tool',
        'compress javascript',
        'compress css',
        'compress json',
    ],
    authors: [{name: 'FastMinify'}],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    openGraph: {
        title: 'FastMinify — Free Online JavaScript, CSS & JSON Minifier Tool',
        description:
            'Minify JavaScript, CSS and JSON code online instantly. Free tool to reduce file size and improve web performance. No registration required.',
        url: 'https://fastminify.com',
        siteName: 'FastMinify',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'FastMinify — Free Online JavaScript, CSS & JSON Minifier',
        description: 'Minify JavaScript, CSS and JSON code online instantly. Free, fast, and private!',
    },
}

export default async function RootLayout({
                                           children,
                                       }: {
        children: React.ReactNode
    }) {

    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <FaviconHead />
            <meta name="google-adsense-account" content="ca-pub-5768156413311714" />
            <meta name="apple-mobile-web-app-title" content="Fast Minify" />
            <StructuredData locale="en" pageType="home" />
            {/* Preload critical resources - only if used immediately */}
            {/* Logos are loaded dynamically by Logo component, no preload needed */}
            {/* Preload critical fonts */}
            {/* Performance hints */}
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        </head>
        <body
            className={cn(
                'min-h-screen bg-background text-foreground antialiased',
                inter.className,
                nunitoSans.variable
            )}
        >
        {/* Google Tag Manager (noscript) */}
        <noscript>
            <iframe 
                src="https://www.googletagmanager.com/ns.html?id=GTM-W7QNL7VB"
                height="0" 
                width="0" 
                style={{display:'none',visibility:'hidden'}}
            />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
            <ThemeProvider>
                <ClientScripts />
                <div className="min-h-screen flex flex-col">
                    <main className="flex-1">
                        {children}
                    </main>
                    <ClientFooter />
                </div>
                {/* CookieConsent moved to [locale]/layout.tsx */}
            </ThemeProvider>

        {/* Sonner toast notifications */}
        <Toaster
            position="top-right"
            richColors
            toastOptions={{
                classNames: {
                    toast: 'border border-border shadow-md',
                    title: 'font-semibold',
                },
            }}
        />
        </body>
        </html>
    )
}