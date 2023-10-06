import Head from 'next/head'
import { useRouter } from 'next/router'

const CustomHead = () => {
  // Site info
  const Site = `NSFW Commissions`
  const twitterCard = `https://img.crystallize.eu.org/nsfw-cover.jpg`

  // Get router
  const router = useRouter()
  const canonicalUrl = (
    `https://crystallize.eu.org` + (router.asPath === '/' ? '' : router.asPath)
  ).split('?')[0]

  const currentTitle = `NSFW Commissions`
  const description = `The collection of commissioned NSFW illustrations / Do Not Repost`
  return (
    <Head>
      {/* SEO : Traditional */}
      <meta name="robots" content="noindex" />
      <title>{currentTitle}</title>
      <meta name="title" content={currentTitle} />
      <meta name="author" content="Crystallize" />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* SEO : Opengraph */}
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={twitterCard} />
      <meta name="og:site_name" content={Site} />

      {/* SEO : Twitter Card */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content={twitterCard} />
      <meta property="twitter:title" content={currentTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:site" content="@CrystallizeSub" />

      {/* SEO : PWA realted */}
      <meta name="application-name" content={Site} />
      <meta name="apple-mobile-web-app-title" content={Site} />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#6fa8dc" />
    </Head>
  )
}

export default CustomHead
