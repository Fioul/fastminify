'use client'

import { useEffect } from 'react'

export default function ClientScripts() {
  useEffect(() => {
    const loadGTM = () => {
      // éviter double insertion
      if (document.getElementById('gtm-loader-inline')) return
      const gtmScript = document.createElement('script')
      gtmScript.id = 'gtm-loader-inline'
      gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W7QNL7VB');`
      document.head.appendChild(gtmScript)
    }

    const consentStr = typeof window !== 'undefined' ? localStorage.getItem('cookie-consent') : null
    const consent = consentStr ? JSON.parse(consentStr) : null

    if (consent && consent.analytics) {
      // charge en idle pour ne pas perturber LCP
      const ric: any = (window as any).requestIdleCallback
      if (typeof ric === 'function') {
        ric(loadGTM, { timeout: 3000 })
      } else {
        setTimeout(loadGTM, 2000)
      }
    } else {
      // attend l'évènement de consentement
      const handler = (e: Event) => {
        const detail = (e as CustomEvent).detail as { analytics: boolean }
        if (detail?.analytics) {
          const ric: any = (window as any).requestIdleCallback
          if (typeof ric === 'function') {
            ric(loadGTM, { timeout: 3000 })
          } else {
            setTimeout(loadGTM, 1000)
          }
          window.removeEventListener('cookie-consent-update', handler as EventListener)
        }
      }
      window.addEventListener('cookie-consent-update', handler as EventListener)
      return () => window.removeEventListener('cookie-consent-update', handler as EventListener)
    }
  }, [])

  return null
}
