import Link from 'next/link'

interface CreateLinksProps {
  links: string[]
  designLink?: string
}

/**
 * 验证输入的链接数组中是否包含指定的模式。
 * @param links - 需要验证的链接字符串数组。
 * @returns 如果任何链接包含指定的模式，则返回 true，否则返回 false。
 */
const validateLinks = (links: string[]): boolean => {
  const patterns = [
    'twitter.com',
    'x.com',
    'pixiv.net',
    'fanbox.cc',
    'fantia.jp',
    'patreon.com',
    'nijie.info',
  ]
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

export const createLinks = ({ links, designLink }: CreateLinksProps) => {
  const design = designLink ? [designLink] : []

  // If no links and no design links, return 'N/A'
  if (!validateLinks(links) && design.length === 0) {
    return [<span key="error">N/A</span>]
  }

  // Priority order for main links
  const mainLinkPriority = [
    { type: 'Fanbox', patterns: ['fanbox.cc'] },
    { type: 'Patreon', patterns: ['patreon.com'] },
    { type: 'Twitter', patterns: ['twitter.com', 'x.com'] },
    { type: 'Pixiv', patterns: ['pixiv.net'] },
    { type: 'Fantia', patterns: ['fantia.jp'] },
    { type: 'Nijie', patterns: ['nijie.info'] },
  ]

  const selectedLinks: { type: string; url: string }[] = []

  // Helper to check and add links based on patterns
  const addLinksByPattern = (type: string, patterns: string[]) => {
    const foundLinks = links.filter(link => patterns.some(pattern => link.includes(pattern)))
    if (foundLinks.length > 0) {
      if (type === 'Twitter') {
        const twitterLink = links.find(link =>
          ['twitter.com', 'x.com'].some(pattern => link.includes(pattern)),
        )
        if (twitterLink) {
          selectedLinks.push({ type: 'Twitter', url: sanitizeUrl(twitterLink) })
        }
      } else if (type === 'Fanbox' || type === 'Patreon') {
        const primaryLink = foundLinks[0]
        selectedLinks.push({ type, url: sanitizeUrl(primaryLink) })
      } else {
        const primaryLink = foundLinks[0]
        selectedLinks.push({ type, url: sanitizeUrl(primaryLink) })
      }
    }
  }

  // Apply priority selection
  for (const priority of mainLinkPriority) {
    if (selectedLinks.length >= 3 - design.length) break
    addLinksByPattern(priority.type, priority.patterns)
  }

  // Limit to (3 - design.length) links
  const limitedLinks = selectedLinks.slice(0, 3 - design.length)

  // Prepare main link elements
  const mainLinkElements = limitedLinks.map((link, index) => (
    <span key={`${link.type}-${index}`}>
      <span className="pr-3 md:pr-2" />
      <Link href={link.url} className="underline-offset-[0.1rem]" target="_blank">
        {link.type}
      </Link>
    </span>
  ))

  // Prepare Design link to be last
  const designLinkElements = design.map((designUrl, index) => (
    <span key={`Design-${index}`}>
      <span className="pr-3 md:pr-2" />
      <Link href={sanitizeUrl(designUrl)} className="underline-offset-[0.1rem]" target="_blank">
        Design
      </Link>
    </span>
  ))

  // Combine main links and design links
  const combinedLinks = [...mainLinkElements, ...designLinkElements]

  // If no main links but have design links
  if (combinedLinks.length === 0 && design.length > 0) {
    return designLinkElements
  }

  return combinedLinks.length > 0 ? combinedLinks : [<span key="error">N/A</span>]
}
