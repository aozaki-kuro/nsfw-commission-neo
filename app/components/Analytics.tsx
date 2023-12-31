import Script from 'next/script'

const Analytics = () => {
  if (process.env.NODE_ENV === 'development') {
    return null
  }

  return (
    <Script
      data-domain="crystallize.eu.org"
      src="https://sight.crystallize.eu.org/app-event.js"
      strategy="lazyOnload"
    />
  )
}

export default Analytics
