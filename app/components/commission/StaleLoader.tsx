'use client'

import { useEffect, useRef, useState } from 'react'

interface StaleLoaderProps {
  Name: string
  isStale?: boolean
  children?: React.ReactNode
}

const StaleLoader = ({ isStale = false, children }: StaleLoaderProps) => {
  const [isLoaded, setIsLoaded] = useState(!isStale)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let observer: IntersectionObserver | null = null

    if (isStale) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsLoaded(true)
            if (observer) {
              observer.disconnect()
            }
          }
        },
        {
          rootMargin: '0px',
          threshold: 0.1,
        },
      )

      if (ref.current) {
        observer.observe(ref.current)
      }
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [isStale])

  if (!isLoaded) {
    return (
      <div ref={ref}>
        <p>Loading...</p>
      </div>
    )
  }

  return <>{children}</>
}

export default StaleLoader
