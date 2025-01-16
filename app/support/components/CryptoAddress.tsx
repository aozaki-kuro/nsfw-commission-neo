'use client'
import { useState } from 'react'

interface CryptoAddressProps {
  currencyName: string
  address: string
}

const CryptoAddress = ({ currencyName, address }: CryptoAddressProps) => {
  const [showFeedback, setShowFeedback] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(address)
    setShowFeedback(true)
    setTimeout(() => setShowFeedback(false), 2000)
  }

  return (
    <li>
      <b>{currencyName}</b> {' - '}
      <span className="cursor-pointer font-mono md:hidden" onClick={copyToClipboard}>
        {address}
      </span>
      <p
        className="hidden cursor-pointer text-gray-600 md:inline dark:text-gray-200"
        onClick={copyToClipboard}
      >
        Click to copy
      </p>
      {showFeedback && (
        <span className="ml-2.5 animate-fadeInOut font-mono text-sm font-bold text-green-600 md:text-xs">
          Copied!
        </span>
      )}
    </li>
  )
}

export default CryptoAddress
