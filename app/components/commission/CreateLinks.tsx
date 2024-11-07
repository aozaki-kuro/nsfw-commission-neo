import Link from 'next/link'

/**
 * 验证输入的链接数组中是否包含指定的模式。
 * @param links - 需要验证的链接字符串数组。
 * @returns 如果任何链接包含指定的模式，则返回 true，否则返回 false。
 */
const validateLinks = (links: string[]): boolean => {
  const patterns = ['twitter.com', 'x.com', 'pixiv.net', 'fanbox.cc', 'fantia.jp', 'nijie.info']
  // 检查是否有任何链接包含指定的模式
  return links.some(link => patterns.some(pattern => link.includes(pattern)))
}

/**
 * 对特定的链接进行必要的清理和替换。
 * @param url - 需要清理的链接字符串。
 * @returns 清理后的链接字符串。
 */
const sanitizeUrl = (url: string): string => {
  // 将 'x.com' 替换为 'twitter.com'，以统一链接格式
  if (url.includes('x.com')) {
    return url.replace('x.com', 'twitter.com')
  }
  return url
}

/**
 * 根据提供的链接数组生成包含链接的 React 元素数组。
 * @param links - 需要处理的链接字符串数组。
 * @returns 包含链接的 React 元素数组，如果没有匹配的链接，则返回包含 'N/A' 的数组。
 */
export const createLinks = (links: string[]) => {
  // 如果没有任何链接匹配指定的模式，则返回 'N/A'
  if (!validateLinks(links)) {
    return [<span key="error">N/A</span>]
  }

  // 定义链接类型及其关联的匹配模式
  const linkPatterns = [
    { type: 'Twitter', patterns: ['twitter.com', 'x.com'] },
    { type: 'Pixiv', patterns: ['pixiv.net'] },
    { type: 'Nijie', patterns: ['nijie.info'] },
    { type: 'Fanbox', patterns: ['fanbox.cc'] },
    { type: 'Fantia', patterns: ['fantia.jp'] },
  ]

  // 遍历每种链接类型，生成对应的链接元素
  return linkPatterns.flatMap(({ type, patterns }) => {
    // 查找第一个匹配当前类型模式的链接
    const url = links.find(link => patterns.some(pattern => link.includes(pattern)))

    // 如果没有找到匹配的链接，则跳过当前类型
    if (!url) return null

    // 对链接进行必要的清理
    const sanitizedUrl = sanitizeUrl(url)

    // 返回包含链接的 React 元素
    return (
      <span key={type}>
        <span className="pr-3 md:pr-2" />
        <Link href={sanitizedUrl} className="underline-offset-[0.1rem]" target="_blank">
          {type}
        </Link>
      </span>
    )
  })
}
