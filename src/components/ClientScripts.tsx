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

    // Google AdSense - Now handled by meta tag in layout.tsx

    // Cleanup function
    return () => {
      if (gtmScript.parentNode) {
        gtmScript.parentNode.removeChild(gtmScript)
      }
    }
  }, [])

  return null
}
