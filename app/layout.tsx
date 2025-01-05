import Analytics from '#components/Analytics'
import { SiteMeta } from '#components/main/siteMeta'

import './globals.css'

/* Custom Font */
import { IBM_Plex_Sans } from 'next/font/google'
import localFont from 'next/font/local'

const menlo = localFont({
  variable: '--font-menlo',
  display: 'block',
  style: 'normal',
  src: [
    {
      path: './components/fonts/Menlo-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
})

const plexSans = IBM_Plex_Sans({
  variable: '--font-plex-sans',
  display: 'block',
  style: 'normal',
  weight: ['400', '600'],
  subsets: ['latin'],
})

export const metadata = SiteMeta

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plexSans.variable} ${menlo.variable} font-sans`}>
      <body className="ss:pb-16 ss:pt-7 ss:text-sm mx-auto min-h-screen max-w-[70rem] bg-back-light pb-32 pt-20 leading-[1.6] tracking-custom antialiased selection:bg-selected md:mx-4 md:min-h-dynamic dark:bg-back-dark">
        {children}
      </body>
      <Analytics />
    </html>
  )
}
