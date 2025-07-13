import React from 'react'

const Analytics = () => {
  if (process.env.NODE_ENV === 'development') {
    return null
  }

  return (
    <script
      data-domain="crystallize.cc"
      src="https://sight.crystallize.cc/app-links.js"
      defer
    />
  )
}

export default Analytics
