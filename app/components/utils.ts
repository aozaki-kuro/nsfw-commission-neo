import { characterStatus } from '#data/commissionStatus'

import { Props } from '#data/types'

export const isCharacterActive = (character: string): boolean => {
  return characterStatus.active.some(char => char.DisplayName === character)
}

/**
 * Transforms a date string from the "yyyyMMdd" format to the "yyyy/MM/dd" format.
 *
 * @param dateStr - The date string in the "yyyyMMdd" format.
 * @returns The date string in the "yyyy/MM/dd" format.
 */

export const formatDate = (dateStr: string): string => {
  // Input validation
  if (!/^\d{8}$/.test(dateStr)) {
    throw new Error('The provided date string does not match the "yyyyMMdd" format.')
  }

  // Formatting logic
  const year = dateStr.slice(0, 4)
  const month = dateStr.slice(4, 6)
  const day = dateStr.slice(6, 8)

  return `${year}/${month}/${day}`
}

export const kebabCase = (str: string) =>
  str.toLowerCase().replace(/&|\s+|[^a-z0-9-]+/g, (match: string) => {
    if (match === '&') return ''
    if (match === ' ') return '-'
    if (match === '*') return '-'
    return ''
  })

/*
 * Finish filtering in the database to increase the speed of the overall build.
 * Downside is, the total amount of the commissions will decrease.
 */
export const filterHiddenCommissions = (data: Props): Props => {
  return data.map(characterData => ({
    ...characterData,
    Commissions: characterData.Commissions.filter(commission => !commission.Hidden),
  }))
}

/**
 * 根据文件名去除 preview 和 part 信息，保留基础文件名
 * @param {string} fileName - 原始文件名
 * @returns {string} - 去除 preview 和 part 后的基础文件名
 */
export function getBaseFileName(fileName: string): string {
  return fileName.replace(/ \(preview.*\)| \(part.*\)$/, '')
}

/**
 * 去重并合并同一作品的不同 part 或 preview，保留最新的条目
 * @param {Array} commissions - 全部的 commission 数据
 * @returns {Map} - 去重后的 commissions 映射表
 */
export function mergePartsAndPreviews(commissions: any[]): Map<string, any> {
  return commissions.reduce<Map<string, any>>((acc, commission) => {
    const baseFileName = getBaseFileName(commission.fileName)

    if (!acc.has(baseFileName) || acc.get(baseFileName)!.fileName < commission.fileName) {
      acc.set(baseFileName, commission)
    }

    return acc
  }, new Map())
}

/**
 * 根据文件名中的日期对 Commissions 进行排序
 * @param {any} commissionA - Commission A
 * @param {any} commissionB - Commission B
 * @returns {number} - 比较结果
 */
export function sortCommissionsByDate(commissionA: any, commissionB: any): number {
  return commissionB.fileName.localeCompare(commissionA.fileName)
}
