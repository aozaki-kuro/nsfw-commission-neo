import { useEffect, useState } from 'react'

export function useMenuState() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - html.clientWidth
      html.style.paddingRight = `${scrollbarWidth}px`
      html.classList.add('overflow-hidden', 'touch-none')
    } else {
      html.style.paddingRight = ''
      html.classList.remove('overflow-hidden', 'touch-none')
    }
    return () => {
      html.style.paddingRight = ''
      html.classList.remove('overflow-hidden', 'touch-none')
    }
  }, [isOpen])

  return { isOpen, setIsOpen }
}
