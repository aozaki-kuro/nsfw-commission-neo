import Script from 'next/script'

const Analytics = () => {
  // Check if process.env.CF_PAGES is 'true'
  return (
    <Script
      data-domain="crystallize.eu.org"
      src="https://sight.crystallize.eu.org/app-event.js"
      strategy="lazyOnload"
    />
  )
}

export default Analytics
