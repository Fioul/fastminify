import { useEffect, useRef } from 'react'

export function useHeaderScrollCSS() {
  const headerRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const isHidden = useRef(false)

  const initializeScrollHandler = (header: HTMLElement) => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up'
      
      // Only hide/show if scrolling significantly
      if (Math.abs(currentScrollY - lastScrollY.current) < 5) return
      
      if (scrollDirection === 'down' && currentScrollY > 100 && !isHidden.current) {
        // Slide up (disappear)
        header.style.transform = 'translateY(-100%)'
        header.style.opacity = '0'
        isHidden.current = true
      } else if (scrollDirection === 'up' && isHidden.current) {
        // Slide down (appear)
        header.style.transform = 'translateY(0)'
        header.style.opacity = '1'
        isHidden.current = false
      }
      
      lastScrollY.current = currentScrollY
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }

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

  return headerRef
}
