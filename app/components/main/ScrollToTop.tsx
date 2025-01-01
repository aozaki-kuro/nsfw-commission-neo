'use client'

import { useEffect, useState } from 'react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 h-12 w-12 transform rounded-full border border-white/20 bg-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-110 hover:bg-white/20 active:scale-95 dark:bg-gray-800/30 dark:hover:bg-gray-800/40"
          style={{
            WebkitBackdropFilter: 'blur(8px)',
          }}
          aria-label="Scroll to top"
        >
          <div className="flex items-center justify-center">
            <svg
              className="h-6 w-6 text-gray-800 transition-transform duration-300 group-hover:translate-y-1 dark:text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 15l7-7 7 7" />
            </svg>
          </div>
        </button>
      )}
    </>
  )
}

export default ScrollToTop
