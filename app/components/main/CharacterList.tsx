'use client'
import { kebabCase } from '#components/utils'
import { characterStatus } from '#data/commissionStatus'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

interface Section {
  id: string
  visibleHeight: number
  distanceToCenter: number
  top: number
  bottom: number
}

const CharacterList = () => {
  const allCharacters = [...characterStatus.active, ...characterStatus.stale]
  const [activeId, setActiveId] = useState<string>('')

  // 计算区域可见性的辅助函数
  const calculateVisibility = useCallback((rect: DOMRect, contentHeight: number) => {
    const viewportHeight = window.innerHeight
    const bottom = rect.top + contentHeight

    // 计算可见部分
    const visibleTop = Math.max(rect.top, 0)
    const visibleBottom = Math.min(bottom, viewportHeight)
    const visibleHeight = Math.max(0, visibleBottom - visibleTop)

    // 计算到视口中心的距离
    const sectionVisibleCenter = visibleHeight > 0 ? (visibleTop + visibleBottom) * 0.5 : Infinity
    const distanceToCenter = Math.abs(sectionVisibleCenter - viewportHeight / 2)

    return {
      visibleHeight,
      distanceToCenter,
      top: rect.top,
      bottom,
    }
  }, [])

  // 获取所有区域信息
  const getSections = useCallback(
    (characters: typeof allCharacters): Section[] => {
      return characters
        .map(character => {
          const id = `title-${kebabCase(character.DisplayName)}`
          const element = document.getElementById(id)
          if (!element?.parentElement) return null

          const rect = element.getBoundingClientRect()
          const contentHeight = element.parentElement.offsetHeight

          return {
            id,
            ...calculateVisibility(rect, contentHeight),
          }
        })
        .filter((section): section is Section => section !== null)
    },
    [calculateVisibility],
  )

  // 找出最适合的活动区域
  const findActiveSection = useCallback((sections: Section[]): string => {
    // 获取可见的区域
    const visibleSections = sections.filter(section => section.visibleHeight > 0)

    if (visibleSections.length > 0) {
      // 返回距离中心最近的区域的 ID
      return visibleSections.reduce((closest, current) =>
        current.distanceToCenter < closest.distanceToCenter ? current : closest,
      ).id
    }

    // 如果没有可见区域，返回最接近顶部的区域的 ID
    return sections.reduce((closest, current) =>
      Math.abs(current.top) < Math.abs(closest.top) ? current : closest,
    ).id
  }, [])

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
  }, [allCharacters, getSections, findActiveSection])

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
