import Script from 'next/script'

const Analytics = () => {
  if (process.env.NODE_ENV === 'development') {
    return null
  }

  /** Plausible Analytics
  return (
    <Script
      data-domain="crystallize.eu.org"
      src="https://sight.crystallize.eu.org/app-event.js"
      strategy="lazyOnload"
    />
  ) **/

  return (
    <Script
      src="https://sight.aozaki.cc/script.js"
      data-website-id="ae1cfdcf-975a-444b-9f6f-2701b269e54c"
      strategy="lazyOnload"
    />
  )
}

export default Analytics
