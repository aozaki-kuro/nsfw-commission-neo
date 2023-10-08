'use client'

import { useEffect } from 'react'

export const useScrollHook = () => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.location.hash) {
        const element = document.querySelector(window.location.hash)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.bottom < 0 || rect.top > window.innerHeight) {
            history.replaceState(null, '', ' ')
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
}
