import Analytics from '#components/Analytics'
import { SiteMeta } from './siteMeta'

import './globals.css'

/* Custom Font */
import { IBM_Plex_Mono, IBM_Plex_Sans, Roboto_Mono } from 'next/font/google'

// import localFont from 'next/font/local'

/**
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
**/

const customMono = Roboto_Mono({
  variable: '--font-custom-mono',
  display: 'block',
  style: 'normal',
  weight: ['400'],
  subsets: ['latin'],
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
    <html lang="en" className={`${plexSans.variable} ${customMono.variable} font-sans`}>
      <body className="bg-back-light tracking-custom selection:bg-selected ss:pb-16 ss:pt-7 ss:text-sm md:min-h-dynamic dark:bg-back-dark mx-auto min-h-screen max-w-[70rem] pt-20 pb-32 leading-[1.6] antialiased md:mx-4">
        {children}
      </body>
      <Analytics />
    </html>
  )
}
