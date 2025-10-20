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

    // charge uniquement après consentement ET première interaction utilisateur
    let interacted = false
    const markInteracted = () => { interacted = true }
    window.addEventListener('pointerdown', markInteracted, { once: true, passive: true })
    window.addEventListener('keydown', markInteracted, { once: true })

    let consent: any = null
    try {
      const consentStr = typeof window !== 'undefined' ? localStorage.getItem('cookie-consent') : null
      consent = consentStr ? JSON.parse(consentStr) : null
    } catch (e) {
      // JSON invalide, ignorer et attendre l'évènement
      consent = null
    }

    const scheduleLoad = () => {
      const run = () => interacted && loadGTM()
      const ric: any = (window as any).requestIdleCallback
      if (typeof ric === 'function') {
        ric(run, { timeout: 4000 })
      } else {
        setTimeout(run, 2500)
      }
    }

    if (consent && consent.analytics) {
      scheduleLoad()
    } else {
      // attend l'évènement de consentement
      const handler = (e: Event) => {
        const detail = (e as CustomEvent).detail as { analytics: boolean }
        if (detail?.analytics) {
          scheduleLoad()
          window.removeEventListener('cookie-consent-update', handler as EventListener)
        }
      }
      window.addEventListener('cookie-consent-update', handler as EventListener)
      return () => window.removeEventListener('cookie-consent-update', handler as EventListener)
    }
  }, [])

  return null
}
