import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {Toaster} from '@/components/ui/sonner'
import {ThemeProvider} from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {cn} from '@/lib/utils'

// (Optionnel) Si tu veux utiliser la police Inter
const inter = Inter({subsets: ['latin']})

// 🧠 SEO / META DE BASE
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
        icon: '/favicon.ico',
    },
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={cn(
                'min-h-screen bg-background text-foreground antialiased',
                inter.className
            )}
        >
        <ThemeProvider>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        </ThemeProvider>

        {/* ✅ Composant Sonner pour les notifications */}
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
