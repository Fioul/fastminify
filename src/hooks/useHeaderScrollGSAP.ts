import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function useHeaderScrollGSAP() {
  const headerRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const isHidden = useRef(false)
  const animationRef = useRef<gsap.core.Timeline | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const header = headerRef.current
    
    if (!header) {
      // Retry after a short delay if element is not yet available
      const timeout = setTimeout(() => {
        const retryHeader = headerRef.current
        if (retryHeader) {
          initializeScrollHandler(retryHeader)
        }
      }, 100)
      return () => clearTimeout(timeout)
    }

    return initializeScrollHandler(header)
  }, [])

  const initializeScrollHandler = (header: HTMLElement) => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up'
      
      // Only hide/show if scrolling significantly
      if (Math.abs(currentScrollY - lastScrollY.current) < 10) return
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      
      // Kill any existing animation
      if (animationRef.current) {
        animationRef.current.kill()
        animationRef.current = null
      }
      
      // Add a small delay to prevent rapid direction changes from causing issues
      timeoutRef.current = setTimeout(() => {
        if (scrollDirection === 'down' && currentScrollY > 100 && !isHidden.current) {
          // Slide up animation (disappear)
          animationRef.current = gsap.timeline()
          animationRef.current
            .to(header, {
              y: '-100%',
              duration: 0.4,
              ease: "power2.inOut"
            })
            .to(header, {
              opacity: 0,
              duration: 0.2,
              ease: "power2.out"
            }, 0.2)
            .call(() => {
              isHidden.current = true
              animationRef.current = null
            })
        } else if (scrollDirection === 'up' && isHidden.current) {
          // Slide down animation (appear)
          animationRef.current = gsap.timeline()
          animationRef.current
            .to(header, {
              opacity: 1,
              duration: 0.2,
              ease: "power2.out"
            })
            .to(header, {
              y: 0,
              duration: 0.4,
              ease: "power2.out"
            }, 0.1)
            .call(() => {
              isHidden.current = false
              animationRef.current = null
            })
        }
      }, 50) // Small delay to prevent conflicts
      
      lastScrollY.current = currentScrollY
    }

    // Add scroll listener with throttling
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (animationRef.current) {
        animationRef.current.kill()
        animationRef.current = null
      }
    }
  }

  return headerRef
}
