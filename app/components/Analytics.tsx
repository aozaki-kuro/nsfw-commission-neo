import Script from 'next/script'

const Analytics = () => {
  // Check if process.env.CF_PAGES is 'true'
  return process.env.CF_PAGES === 'true' ? (
    <Script
      data-domain="crystallize.eu.org"
      src="https://sight.crystallize.eu.org/app-event.js"
      strategy="lazyOnload"
    />
  ) : (
    // Return the Script component if the condition is false
    <Script data-domain="crystallize.eu.org" src="/app.js" strategy="lazyOnload" />
  )
}

export default Analytics
