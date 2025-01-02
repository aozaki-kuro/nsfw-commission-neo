'use client'
import { findActiveSection, getAllCharacters, getSections, kebabCase } from '#components/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const CharacterList = () => {
  const allCharacters = getAllCharacters()
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // 使用 requestAnimationFrame 优化滚动性能
    let rafId: number
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const sections = getSections(allCharacters)
        const newActiveId = findActiveSection(sections)
        setActiveId(newActiveId)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // 初始化
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
          {allCharacters.map(character => {
            const id = `title-${kebabCase(character.DisplayName)}`
            const isActive = activeId === id

            return (
              <li
                key={id}
                className={`relative pl-4 text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white ${
                  isActive
                    ? 'before:absolute before:left-0 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-gray-400'
                    : ''
                } `}
              >
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
