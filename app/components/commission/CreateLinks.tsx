import Link from 'next/link'

// 1. Add a helper function to validate the input links.
const validateLinks = (links: string[]): boolean => {
  const patterns = ['twitter.com', 'x.com', 'pixiv.net', 'fanbox.cc', 'fantia.jp']

  for (const link of links) {
    if (patterns.some(pattern => link.includes(pattern))) {
      return true
    }
  }
  return false
}

export const createLinks = (links: string[]) => {
  // 2. Use the helper function inside the createLinks function.
  if (!validateLinks(links)) {
    // 3. Return an error or 'N/A' when none of the patterns match.
    return [<span key="error">N/A</span>]
  }

  const order = ['Twitter', 'Pixiv', 'Nijie', 'Fanbox', 'Fantia']

  return order.flatMap(type => {
    const url = links.find(link => {
      if (type === 'Twitter' && (link.includes('twitter.com') || link.includes('x.com'))) {
        return true
      }
      if (type === 'Pixiv' && link.includes('pixiv.net')) return true
      if (type === 'Nijie' && link.includes('nijie.info')) return true
      if (type === 'Fanbox' && link.includes('fanbox.cc')) return true
      if (type === 'Fantia' && link.includes('fantia.jp')) return true
      return false
    })

    if (!url) return null

    // const sanitizedUrl = url.includes('x.com') ? url.replace('x.com', 'twitter.com') : url

    return (
      <span key={type}>
        <span className="pr-3 md:pr-2" />
        <Link href={url} className="underline-offset-[0.1rem]" target="_blank">
          {type}
        </Link>
      </span>
    )
  })
}
