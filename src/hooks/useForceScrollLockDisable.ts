import { useEffect } from 'react'

/**
 * Hook pour forcer la désactivation du scroll lock de Radix UI
 * et empêcher le décalage du contenu lors de l'ouverture des dropdowns
 */
export function useForceScrollLockDisable() {
  useEffect(() => {
    // Fonction pour forcer la désactivation du scroll lock
    const forceDisableScrollLock = () => {
      const body = document.body
      
      // Supprimer l'attribut data-scroll-locked s'il existe
      if (body.hasAttribute('data-scroll-locked')) {
        body.removeAttribute('data-scroll-locked')
      }
      
      // Forcer les styles à être normaux
      body.style.paddingRight = '0px'
      body.style.pointerEvents = 'auto'
      body.style.overflow = 'auto'
      
      // Supprimer la variable CSS problématique
      body.style.setProperty('--removed-body-scroll-bar-size', '0px')
      
      // Supprimer les éléments data-radix-focus-guard
      const focusGuards = document.querySelectorAll('[data-radix-focus-guard]')
      focusGuards.forEach(guard => guard.remove())
    }

    // Observer les changements sur le body
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          // Délai pour laisser Radix UI appliquer ses styles d'abord
          setTimeout(forceDisableScrollLock, 10)
        }
      })
    })

    // Observer le body pour tous les changements d'attributs
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-scroll-locked', 'style']
    })

    // Observer l'ajout d'éléments (comme data-radix-focus-guard)
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Forcer la désactivation immédiatement
    forceDisableScrollLock()

    // Nettoyer l'observer au démontage
    return () => {
      observer.disconnect()
      // Remettre les styles normaux
      document.body.style.paddingRight = '0px'
      document.body.style.pointerEvents = 'auto'
      document.body.style.overflow = 'auto'
      document.body.removeAttribute('data-scroll-locked')
    }
  }, [])
}
