'use client'
import { useState } from 'react'

import styles from './CryptoAddress.module.css'

interface CryptoAddressProps {
  currencyName: string
  address: string
}

const CryptoAddress = ({ currencyName, address }: CryptoAddressProps) => {
  const [showFeedback, setShowFeedback] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(address)
    setShowFeedback(true)
    setTimeout(() => setShowFeedback(false), 2000) // Hide feedback after 2 seconds
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
      {showFeedback && <span className={styles.feedbackAnimation}>Copied!</span>}
    </li>
  )
}

export default CryptoAddress
