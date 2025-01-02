import { characterStatus } from '#data/commissionStatus'
import { Commission, Props } from '#data/types'

// ======================== 角色相关工具函数 ========================

/**
 * 检查给定的角色是否处于活跃状态。
 * @param character - 要检查的角色名称。
 * @returns 如果角色是活跃的，则返回 true，否则返回 false。
 */
export const isCharacterActive = (character: string): boolean => {
  return characterStatus.active.some(char => char.DisplayName === character)
}

/**
 * 获取所有角色列表，包括活跃和非活跃角色。
 * @returns 包含所有角色的数组。
 */
export const getAllCharacters = () => [...characterStatus.active, ...characterStatus.stale]

// ======================== 日期相关工具函数 ========================

/**
 * 解析 "yyyyMMdd" 格式的日期字符串，返回 Date 对象。
 * @param dateStr - "yyyyMMdd" 格式的日期字符串。
 * @returns 解析后的 Date 对象，如果日期无效则返回 null。
 */
export function parseDateString(dateStr: string): Date | null {
  if (!/^\d{8}$/.test(dateStr)) {
    return null
  }

  const year = parseInt(dateStr.slice(0, 4), 10)
  const month = parseInt(dateStr.slice(4, 6), 10) - 1 // 月份索引从 0 开始
  const day = parseInt(dateStr.slice(6, 8), 10)

  const date = new Date(year, month, day)

  // 检查日期是否有效
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return null
  }

  return date
}

/**
 * 格式化 Date 对象为指定格式的日期字符串。
 * @param date - 要格式化的 Date 对象。
 * @param format - 日期格式，支持 'yyyy/MM/dd' 和 'readable'（例如 "January 1, 2020"）。
 * @returns 格式化后的日期字符串。
 */
export function formatDate(date: Date, format: 'yyyy/MM/dd' | 'readable'): string {
  if (format === 'yyyy/MM/dd') {
    const year = date.getFullYear()
    const month = `0${date.getMonth() + 1}`.slice(-2) // 补零
    const day = `0${date.getDate()}`.slice(-2) // 补零
    return `${year}/${month}/${day}`
  } else if (format === 'readable') {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } else {
    throw new Error(`Unsupported date format: ${format}`)
  }
}

/**
 * 解析并格式化 "yyyyMMdd" 格式的日期字符串。
 * @param dateStr - "yyyyMMdd" 格式的日期字符串。
 * @param format - 日期格式，支持 'yyyy/MM/dd' 和 'readable'。
 * @returns 格式化后的日期字符串，如果日期无效则返回空字符串。
 */
export function parseAndFormatDate(dateStr: string, format: 'yyyy/MM/dd' | 'readable'): string {
  const date = parseDateString(dateStr)
  if (!date) {
    return ''
  }
  return formatDate(date, format)
}

// ======================== 字符串处理工具函数 ========================

/**
 * 将字符串转换为 kebab-case（小写，并以连字符分隔）。
 * @param str - 要转换的字符串。
 * @returns 转换后的 kebab-case 字符串。
 */
export const kebabCase = (str: string): string =>
  str.toLowerCase().replace(/&|\s+|\*|[^a-z0-9-]+/g, (match: string) => {
    if (match === '&' || match === '*') return '-'
    if (/\s+/.test(match)) return '-'
    return ''
  })

/**
 * 从文件名中去除预览（preview）和部分（part）信息，保留基础文件名。
 * @param fileName - 原始文件名。
 * @returns 去除预览和部分信息后的基础文件名。
 */
export function getBaseFileName(fileName: string): string {
  return fileName.replace(/ \((preview|part).*?\)$/i, '')
}

// ======================== 委托作品相关工具函数 ========================

/**
 * 过滤掉隐藏的委托作品，以提高整体构建速度。
 * 注意：这样做可能会减少委托作品的总数量。
 * @param data - 包含角色和委托作品的数组。
 * @returns 过滤后的数据，只包含未隐藏的委托作品。
 */
export const filterHiddenCommissions = (data: Props): Props => {
  return data.map(characterData => ({
    ...characterData,
    Commissions: characterData.Commissions.filter(commission => !commission.Hidden),
  }))
}

/**
 * 去重并合并同一作品的不同部分（part）或预览（preview），保留最新的条目。
 * @param commissions - 全部的委托作品数据数组。
 * @returns 去重后的委托作品 Map，键为基础文件名，值为最新的委托作品对象。
 */
export function mergePartsAndPreviews(commissions: Commission[]): Map<string, Commission> {
  return commissions.reduce<Map<string, Commission>>((acc, commission) => {
    const baseFileName = getBaseFileName(commission.fileName)

    // 如果当前基础文件名不存在，或新的文件名更大（更新），则更新 Map
    if (!acc.has(baseFileName) || acc.get(baseFileName)!.fileName < commission.fileName) {
      acc.set(baseFileName, commission)
    }

    return acc
  }, new Map())
}

/**
 * 根据文件名中的日期对委托作品进行排序（降序）。
 * @param commissionA - 委托作品 A。
 * @param commissionB - 委托作品 B。
 * @returns 比较结果：负数表示 A 在 B 之后，正数表示 A 在 B 之前，0 表示相等。
 */
export function sortCommissionsByDate(commissionA: Commission, commissionB: Commission): number {
  const dateA = commissionA.fileName.slice(0, 8)
  const dateB = commissionB.fileName.slice(0, 8)
  return dateB.localeCompare(dateA)
}

// ======================== 区域可见性相关工具函数 ========================

export interface Section {
  id: string
  visibleHeight: number
  distanceToCenter: number
  top: number
  bottom: number
}

/**
 * 计算区域可见性的辅助函数。
 * @param rect - 区域的 DOMRect 对象。
 * @param contentHeight - 区域内容的高度。
 * @returns 包含可见高度、到视口中心的距离、顶部和底部位置的对象。
 */
export const calculateVisibility = (rect: DOMRect, contentHeight: number) => {
  const viewportHeight = window.innerHeight
  const bottom = rect.top + contentHeight

  // 计算可见部分
  const visibleTop = Math.max(rect.top, 0)
  const visibleBottom = Math.min(bottom, viewportHeight)
  const visibleHeight = Math.max(0, visibleBottom - visibleTop)

  // 计算到视口中心的距离
  const sectionVisibleCenter = visibleHeight > 0 ? (visibleTop + visibleBottom) * 0.6 : Infinity
  const distanceToCenter = Math.abs(sectionVisibleCenter - viewportHeight / 2)

  return {
    visibleHeight,
    distanceToCenter,
    top: rect.top,
    bottom,
  }
}

/**
 * 获取所有区域信息。
 * @param characters - 角色列表。
 * @returns 包含所有区域信息的数组。
 */
export const getSections = (characters: ReturnType<typeof getAllCharacters>): Section[] => {
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
}

/**
 * 找出最适合的活动区域。
 * @param sections - 区域信息数组。
 * @returns 最适合的活动区域的 ID。
 */
export const findActiveSection = (sections: Section[]): string => {
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
}
