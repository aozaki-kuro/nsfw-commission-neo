import Analytics from '#components/Analytics'
import './globals.css'

import type { Metadata } from 'next'

/* Custom Font */
import localFont from 'next/font/local'

const inter = localFont({
  variable: '--font-inter',
  display: 'block',
  style: 'normal',
  src: [
    {
      path: '../public/fonts/InterDisplay-roman.var.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/InterDisplay-roman.var.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
})

const Site = 'NSFW Commission'
const Description = 'The collection of commissioned NSFW illustrations / Do Not Repost'
const twitterCard = `https://img.crystallize.eu.org/nsfw-cover.jpg`
const CanonicalUrl = 'https://crystallize.eu.org'

export const metadata: Metadata = {
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
    icon: [{ url: '/logo.png' }, new URL('/logo.png', CanonicalUrl)],
    shortcut: ['/icons/android-chrome-192x192.png'],
    apple: [
      { url: '/icons/apple-touch-icon.png' },
      { url: '/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/icons/apple-touch-icon.png',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="container mx-auto min-h-screen max-w-[40rem] bg-back-light pb-32 pt-20 tracking-[0.005em] antialiased selection:bg-selected dark:bg-back-dark ss:min-h-dynamic ss:pb-16 ss:pt-7 ss:text-sm">
        {children}
      </body>
      <Analytics />
    </html>
  )
}
