'use client'
import { findActiveSection, getAllCharacters, getSections, kebabCase } from '#components/utils'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const CharacterList = () => {
  const allCharacters = getAllCharacters()
  const [activeId, setActiveId] = useState<string>('')
  const listRefs = useRef<(HTMLLIElement | null)[]>([])

  // 创建一个类型安全的 ref 回调函数
  const setListRef = (index: number) => (el: HTMLLIElement | null) => {
    listRefs.current[index] = el
  }

  useEffect(() => {
    let rafId: number
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const sections = getSections(allCharacters)
        const newActiveId = findActiveSection(sections)

        const introductionElement = document.getElementById('introduction')
        const isAtTop = window.scrollY === 0
        const isAtIntroduction =
          introductionElement &&
          introductionElement.getBoundingClientRect().top <= window.innerHeight / 2 &&
          introductionElement.getBoundingClientRect().bottom >= window.innerHeight / 2

        if (isAtTop || isAtIntroduction) {
          setActiveId('')
        } else {
          setActiveId(newActiveId)
        }

        if (window.location.hash) {
          const element = document.querySelector(window.location.hash)
          if (element) {
            const rect = element.getBoundingClientRect()
            // 如果元素不在当前视口内，则清空哈希
            if (rect.bottom < 0 || rect.top > window.innerHeight) {
              history.replaceState(null, '', ' ')
            }
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [allCharacters])

  return (
    <aside
      id="Character List"
      className="fixed left-[calc(50%+20rem)] top-52 ml-8 h-screen max-w-[20rem] md:hidden"
    >
      <nav className="sticky top-4">
        <ul className="space-y-2">
          {allCharacters.map((character, index) => {
            const id = kebabCase(character.DisplayName)
            const isActive = activeId === `title-${id}`

            return (
              <li
                key={id}
                ref={setListRef(index)}
                className="relative pl-4 text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
              >
                <div
                  className={`absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-gray-400 transition-all duration-300 ${
                    isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`}
                />
                <Link
                  href={`#${id}`}
                  className="font-mono text-sm no-underline transition-colors duration-200"
                >
                  {character.DisplayName}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default CharacterList
