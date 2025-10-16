import type {Metadata} from 'next'
import {Inter, Nunito_Sans} from 'next/font/google'
import './globals.css'
import '../styles/fonts.css'
import {Toaster} from '@/components/ui/sonner'
import {ThemeProvider} from '@/components/ThemeProvider'
import Footer from '@/components/Footer'
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
    title: 'FastMinify — Online JS & CSS Minifier',
    description:
        'FastMinify is a free online tool to minify JavaScript and CSS instantly. Optimize your code, reduce file size and improve loading times.',
    keywords: [
        'minify',
        'javascript',
        'css',
        'online tool',
        'fast',
        'minifier',
        'web performance',
    ],
    authors: [{name: 'FastMinify'}],
    openGraph: {
        title: 'FastMinify — Free Online JS & CSS Minifier',
        description:
            'Minify JavaScript and CSS code instantly. Optimize file size for faster web performance.',
        url: 'https://fastminify.com',
        siteName: 'FastMinify',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'FastMinify — Online JS & CSS Minifier',
        description: 'Minify JavaScript and CSS online in one click!',
    },
    icons: {
        icon: '/favicon.png?v=2',
        shortcut: '/favicon.png?v=2',
        apple: '/favicon.png?v=2',
    },
}

export default async function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    // Detect locale from URL
    const headersList = await headers()
    const pathname = headersList.get('x-pathname') || ''
    
    // Extract locale from pathname
    let locale = 'en' // default
    if (pathname.startsWith('/fr')) {
        locale = 'fr'
    } else if (pathname.startsWith('/en')) {
        locale = 'en'
    }

    return (
        <html lang={locale} suppressHydrationWarning>
        <head>
            <link rel="icon" type="image/png" href="/favicon.png?v=2" />
            <link rel="shortcut icon" type="image/png" href="/favicon.png?v=2" />
        </head>
        <body
            className={cn(
                'min-h-screen bg-background text-foreground antialiased',
                inter.className,
                nunitoSans.variable
            )}
        >
        <ThemeProvider>
            <div className="min-h-screen flex flex-col">
                <main className="flex-1">
                    {children}
                </main>
                <Footer locale={locale} />
            </div>
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
