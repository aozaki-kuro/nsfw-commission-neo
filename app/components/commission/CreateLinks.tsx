import Link from 'next/link'

export const createLinks = (links: string[]) => {
  const order = ['Twitter', 'Pixiv', 'Fanbox', 'Fantia']

  return order.flatMap(type => {
    const url = links.find(link => {
      if (type === 'Twitter' && (link.includes('twitter.com') || link.includes('x.com'))) {
        return true
      }
      if (type === 'Pixiv' && link.includes('pixiv.net')) return true
      if (type === 'Fanbox' && link.includes('fanbox.cc')) return true
      if (type === 'Fantia' && link.includes('fantia.jp')) return true
      return false
    })

    if (!url) return null

    const sanitizedUrl = url.includes('x.com') ? url.replace('x.com', 'twitter.com') : url

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
