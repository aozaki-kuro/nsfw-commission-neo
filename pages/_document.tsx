import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="flex min-h-screen items-center justify-center bg-back-light tracking-[0.005em] antialiased selection:bg-selected dark:bg-back-dark ss:mx-4 ss:min-h-dynamic">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
