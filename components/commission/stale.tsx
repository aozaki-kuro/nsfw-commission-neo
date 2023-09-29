import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import Commission from './listing'
import kebabCase from '#components/lib/kebabCase'
import { charaDictionary } from '#data/CharaDictionary'

const Stale = ({ Character }: { Character: string }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true)
          observer.disconnect()
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

    return () => {
      observer.disconnect()
    }
  }, [])

  const dictionaryEntry = charaDictionary.find(chara => chara.Abbr === Character)
  const characterFullName = dictionaryEntry?.FullName || Character.toLowerCase()

  return (
    <div ref={ref}>
      {isLoaded ? (
        <Commission Character={Character} />
      ) : (
        <>
          <div id={kebabCase(characterFullName)}>
            <h2 className="group relative pb-2 pt-4">
              {characterFullName}
              <Link
                href={`#${kebabCase(characterFullName)}`}
                className="ml-2 text-dec-light no-underline opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:text-dec-dark"
              >
                #
              </Link>
            </h2>
          </div>
          <p>Loading...</p>
        </>
      )}
    </div>
  )
}

export default Stale
