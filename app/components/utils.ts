import { characterStatus } from '#data/commissionStatus'
import { Commission, Props } from '#data/types'

// ======================== 角色相关工具函数 ========================

/**
 * 检查给定的角色是否处于活跃状态。
 */
export const isCharacterActive = (character: string): boolean =>
  characterStatus.active.some(char => char.DisplayName === character)

/**
 * 获取所有角色列表，包括活跃和非活跃角色。
 */
export const getAllCharacters = () => [...characterStatus.active, ...characterStatus.stale]

// ======================== 日期相关工具函数 ========================

/**
 * 解析 "yyyyMMdd" 格式的日期字符串，返回 Date 对象。
 */
export function parseDateString(dateStr: string): Date | null {
  if (!/^\d{8}$/.test(dateStr)) return null

  const year = parseInt(dateStr.slice(0, 4), 10)
  const month = parseInt(dateStr.slice(4, 6), 10) - 1 // 月份索引从 0 开始
  const day = parseInt(dateStr.slice(6, 8), 10)

  const date = new Date(year, month, day)

  // 检查日期是否有效
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day
    ? date
    : null
}

/**
 * 格式化 Date 对象为指定格式的日期字符串。
 */
export function formatDate(date: Date, format: 'yyyy/MM/dd' | 'readable'): string {
  if (format === 'yyyy/MM/dd') {
    return date.toISOString().slice(0, 10).replace(/-/g, '/')
  } else if (format === 'readable') {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }
  throw new Error(`Unsupported date format: ${format}`)
}

/**
 * 解析并格式化 "yyyyMMdd" 格式的日期字符串。
 */
export function parseAndFormatDate(dateStr: string, format: 'yyyy/MM/dd' | 'readable'): string {
  const date = parseDateString(dateStr)
  return date ? formatDate(date, format) : ''
}

// ======================== 字符串处理工具函数 ========================

/**
 * 将字符串转换为 kebab-case（小写，并以连字符分隔）。
 */
export const kebabCase = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // 替换非字母数字字符为连字符
    .replace(/^-|-$/g, '') // 去除开头和结尾的连字符

/**
 * 从文件名中去除预览（preview）和部分（part）信息，保留基础文件名。
 */
export function getBaseFileName(fileName: string): string {
  return fileName.replace(/\s*\((preview|part).*?\)$/i, '')
}

// ======================== 委托作品相关工具函数 ========================

/**
 * 过滤掉隐藏的委托作品，以提高整体构建速度。
 */
export const filterHiddenCommissions = (data: Props): Props =>
  data.map(characterData => ({
    ...characterData,
    Commissions: characterData.Commissions.filter(commission => !commission.Hidden),
  }))

/**
 * 去重并合并同一作品的不同部分（part）或预览（preview），保留最新的条目。
 */
export function mergePartsAndPreviews(commissions: Commission[]): Map<string, Commission> {
  const commissionMap = new Map<string, Commission>()

  commissions.forEach(commission => {
    const baseFileName = getBaseFileName(commission.fileName)
    const existingCommission = commissionMap.get(baseFileName)

    if (!existingCommission || commission.fileName > existingCommission.fileName) {
      commissionMap.set(baseFileName, commission)
    }
  })

  return commissionMap
}

/**
 * 根据文件名中的日期对委托作品进行排序（降序）。
 */
export function sortCommissionsByDate(commissionA: Commission, commissionB: Commission): number {
  return commissionB.fileName.localeCompare(commissionA.fileName)
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
 */
export const getSections = (characters: ReturnType<typeof getAllCharacters>): Section[] =>
  characters
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

/**
 * 找出最适合的活动区域。
 */
export const findActiveSection = (sections: Section[]): string => {
  const visibleSections = sections.filter(section => section.visibleHeight > 0)

  if (visibleSections.length > 0) {
    return visibleSections.reduce((closest, current) =>
      current.distanceToCenter < closest.distanceToCenter ? current : closest,
    ).id
  }

  return sections.reduce((closest, current) =>
    Math.abs(current.top) < Math.abs(closest.top) ? current : closest,
  ).id
}
