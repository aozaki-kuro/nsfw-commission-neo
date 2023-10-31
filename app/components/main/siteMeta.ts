import { Metadata } from 'next'

const Site = 'NSFW Commission'
const Description = 'The collection of commissioned NSFW illustrations / Do Not Repost'
const twitterCard = `https://img.crystallize.eu.org/nsfw-cover.jpg`
const CanonicalUrl = 'https://crystallize.eu.org'

export const SiteMeta: Metadata = {
  metadataBase: new URL(CanonicalUrl),

  /* No index */
  robots: 'noindex',

  /* Base */
  title: Site,
  description: Description,

  /* OpenGraph */
  openGraph: {
    title: Site,
    siteName: Site,
    description: Description,
    images: twitterCard,
    type: 'website',
    url: CanonicalUrl,
  },

  /* Twitter */
  twitter: {
    site: '@CrystallizeSub',
  },

  applicationName: Site,

  icons: {
    icon: [{ url: '/favicon20231031/icon.png' }, new URL('/icon.png?v=20231031', CanonicalUrl)],
    shortcut: ['/favicon20231031/android-chrome-192x192.png'],
    apple: [
      { url: '/favicon20231031/apple-touch-icon.png' },
      { url: '/favicon20231031/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/favicon20231031/apple-touch-icon.png',
      },
    ],
  },
}
