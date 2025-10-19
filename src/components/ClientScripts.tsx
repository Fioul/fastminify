'use client'

import { useEffect } from 'react'

export default function ClientScripts() {
  useEffect(() => {
    // Google Tag Manager
    const gtmScript = document.createElement('script')
    gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W7QNL7VB');`
    document.head.appendChild(gtmScript)

    // Google AdSense
    const adsenseScript = document.createElement('script')
    adsenseScript.async = true
    adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5768156413311714'
    adsenseScript.crossOrigin = 'anonymous'
    document.head.appendChild(adsenseScript)

    // Cleanup function
    return () => {
      if (gtmScript.parentNode) {
        gtmScript.parentNode.removeChild(gtmScript)
      }
      if (adsenseScript.parentNode) {
        adsenseScript.parentNode.removeChild(adsenseScript)
      }
    }
  }, [])

  return null
}
