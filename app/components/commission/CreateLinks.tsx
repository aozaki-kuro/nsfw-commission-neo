import Link from 'next/link'

interface CreateLinksProps {
  links: string[]
  designLink?: string
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
 * 根据优先级选择主要链接。
 * @param links - 需要处理的链接数组。
 * @returns 选择后的主要链接对象数组。
 */
const selectMainLinks = (links: string[]): { type: string; url: string }[] => {
  // 定义主要链接的优先级顺序
  const mainLinkPriority = [
    { type: 'Fanbox', patterns: ['fanbox.cc'] },
    { type: 'Patreon', patterns: ['patreon.com'] },
    { type: 'Fantia', patterns: ['fantia.jp'] },
    { type: 'Twitter', patterns: ['twitter.com', 'x.com'] },
    { type: 'Pixiv', patterns: ['pixiv.net'] },
    { type: 'Nijie', patterns: ['nijie.info'] },
  ]

  const selectedLinks: { type: string; url: string }[] = []

  for (const priority of mainLinkPriority) {
    // 查找当前优先级对应的链接
    const foundLink = links.find(link => priority.patterns.some(pattern => link.includes(pattern)))

    if (foundLink) {
      // 避免重复选择同一类型的链接
      const alreadySelected = selectedLinks.some(selected => selected.type === priority.type)
      if (!alreadySelected) {
        selectedLinks.push({ type: priority.type, url: sanitizeUrl(foundLink) })
      }
    }
  }

  return selectedLinks
}

/**
 * 根据提供的链接数组生成包含链接的 React 元素数组。
 * @param props - 包含 Links 和可选的 DesignLink 的对象。
 * @returns 包含链接的 React 元素数组，如果没有匹配的链接，则返回包含 'N/A' 的数组。
 */
export const createLinks = ({ links, designLink }: CreateLinksProps) => {
  const hasDesign = Boolean(designLink)
  const mainLinks = selectMainLinks(links)

  // 总链接限制
  const maxLinks = 3

  // 计算主要链接的最大显示数量
  const maxMainLinks = hasDesign ? maxLinks - 1 : maxLinks

  // 选择主要链接，按优先级排序
  const limitedMainLinks = mainLinks.slice(0, maxMainLinks)

  // 生成主要链接的 React 元素
  const mainLinkElements = limitedMainLinks.map((link, index) => (
    <span key={`${link.type}-${index}`}>
      <span className="pr-3 md:pr-2" />
      <Link href={link.url} className="underline-offset-[0.1rem]" target="_blank">
        {link.type}
      </Link>
    </span>
  ))

  // 生成 Design 链接的 React 元素，确保其在最后
  const designLinkElement = hasDesign ? (
    <span key="Design">
      <span className="pr-3 md:pr-2" />
      <Link href={sanitizeUrl(designLink!)} className="underline-offset-[0.1rem]" target="_blank">
        Design
      </Link>
    </span>
  ) : null

  // 组合主要链接和 Design 链接
  const combinedLinks = designLinkElement
    ? [...mainLinkElements, designLinkElement]
    : mainLinkElements

  // 如果没有任何链接，返回 'N/A'
  if (combinedLinks.length === 0) {
    return [<span key="error">N/A</span>]
  }

  return combinedLinks
}
