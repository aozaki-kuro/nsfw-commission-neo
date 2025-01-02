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

        // 检测是否滚动到 #introduction 区域或页面顶端
        const introductionElement = document.getElementById('introduction')
        const isAtTop = window.scrollY === 0
        const isAtIntroduction =
          introductionElement &&
          introductionElement.getBoundingClientRect().top <= window.innerHeight / 2 &&
          introductionElement.getBoundingClientRect().bottom >= window.innerHeight / 2

        // 如果滚动到 #introduction 区域或页面顶端，清除哈希值
        if (isAtTop || isAtIntroduction) {
          if (window.location.hash) {
            history.replaceState(null, '', ' ')
          }
          setActiveId('')
          return
        }

        // 否则，更新活动区域和哈希值
        setActiveId(newActiveId)
        const hash = newActiveId.replace(/^title-/, '')
        if (hash && window.location.hash !== `#${hash}`) {
          history.replaceState(null, '', `#${hash}`)
        }
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
            const id = kebabCase(character.DisplayName) // 移除 title- 前缀
            const isActive = activeId === `title-${id}` // 保持与 getSections 一致

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
