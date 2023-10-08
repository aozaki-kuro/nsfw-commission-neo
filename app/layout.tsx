import Analytics from '#components/Analytics'
import { SiteMeta } from '#components/main/SiteMeta'

import './globals.css'

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

export const metadata = SiteMeta

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="min-h-screen bg-back-light antialiased selection:bg-selected dark:bg-back-dark ss:mx-4">
        <div className="container mx-auto max-w-[40rem] pb-32 pt-20 tracking-[0.005em] ss:min-h-dynamic ss:pb-16 ss:pt-7 ss:text-sm">
          {children}
        </div>
      </body>
      <Analytics />
    </html>
  )
}
