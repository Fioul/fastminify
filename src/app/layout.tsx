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
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
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
            
            {/* Google Tag Manager */}
            <script
                dangerouslySetInnerHTML={{
                  __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W7QNL7VB');`
                }}
            />
            {/* End Google Tag Manager */}
            
            {/* Google AdSense */}
            <script 
                async 
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5768156413311714"
                crossOrigin="anonymous"
            />
            {/* End Google AdSense */}
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
