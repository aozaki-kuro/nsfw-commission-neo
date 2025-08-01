import Analytics from '#components/Analytics'
import { SiteMeta } from './siteMeta'

import './globals.css'

/* Custom Font */
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'

const customMono = IBM_Plex_Mono({
  variable: '--font-mono',
  display: 'block',
  style: 'normal',
  weight: ['400'],
  subsets: ['latin'],
})

const plexSans = IBM_Plex_Sans({
  variable: '--font-sans',
  display: 'block',
  style: 'normal',
  weight: ['400', '600'],
  subsets: ['latin'],
})

export const metadata = SiteMeta

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plexSans.variable} ${customMono.variable} font-sans`}>
      <body className="ss:pb-16 ss:pt-7 ss:text-sm mx-auto min-h-screen max-w-2xl pt-20 pb-32 leading-relaxed antialiased selection:bg-gray-400/25 md:mx-4 md:min-h-dvh dark:bg-neutral-900">
        {children}
      </body>
      <Analytics />
    </html>
  )
}
