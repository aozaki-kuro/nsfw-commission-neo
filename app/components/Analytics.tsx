import Script from 'next/script'

const Analytics = () => {
  if (process.env.NODE_ENV === 'development') {
    return null
  }

  return (
    <Script
      data-domain="crystallize.cc"
      src="https://sight.crystallize.cc/js/script.tagged-events.outbound-links.js"
      strategy="lazyOnload"
    />
  )
}

export default Analytics
