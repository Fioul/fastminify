import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function useHeaderScroll() {
  const headerRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const isHidden = useRef(false)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    console.log('Header scroll hook initialized')

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up'
      
      console.log('Scroll detected:', {
        currentScrollY,
        lastScrollY: lastScrollY.current,
        scrollDirection,
        isHidden: isHidden.current
      })
      
      // Only hide/show if scrolling significantly
      if (Math.abs(currentScrollY - lastScrollY.current) < 5) return
      
      if (scrollDirection === 'down' && currentScrollY > 100 && !isHidden.current) {
        console.log('Hiding header')
        gsap.to(header, {
          y: -header.offsetHeight,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            isHidden.current = true
            console.log('Header hidden')
          }
        })
      } else if (scrollDirection === 'up' && isHidden.current) {
        console.log('Showing header')
        gsap.to(header, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            isHidden.current = false
            console.log('Header shown')
          }
        })
      }
      
      lastScrollY.current = currentScrollY
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return headerRef
}
