import Analytics from '#components/Analytics'
import { SiteMeta } from '#components/main/siteMeta'

import './globals.css'

/* Custom Font */
import localFont from 'next/font/local'

const inter = localFont({
  variable: '--font-inter',
  display: 'block',
  style: 'normal',
  src: [
    {
      path: './components/fonts/InterDisplay-roman.var.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './components/fonts/InterDisplay-roman.var.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
})

export const metadata = SiteMeta

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="mx-auto min-h-screen max-w-[40rem] bg-back-light pb-32 pt-20 leading-[1.6] tracking-custom antialiased selection:bg-selected dark:bg-back-dark ss:pb-16 ss:pt-7 ss:text-sm md:mx-4 md:min-h-dynamic">
        {children}
      </body>
      <Analytics />
    </html>
  )
}
