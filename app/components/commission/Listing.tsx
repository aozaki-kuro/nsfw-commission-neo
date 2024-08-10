'use client'

import Title from '#components/Title'
import { kebabCase } from '#components/utils'
import { commissionData } from '#data/commissionData'
import Image from 'next/image'
import { useEffect } from 'react'
import IllustratorInfo from './IllustratorInfo'

export const useScrollHook = () => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.location.hash) {
        const element = document.querySelector(window.location.hash)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.bottom < 0 || rect.top > window.innerHeight) {
            history.replaceState(null, '', ' ')
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
}

const Listing = ({ Character }: { Character: string }) => {
  useScrollHook()

  // Find data related to the given character
  const characterData = commissionData.find(data => data.Character === Character)

  // Sort commissions in descending order, or default to an empty array if undefined
  const sortedCommissions = [...(characterData?.Commissions || [])].sort((a, b) => {
    return Number(b.fileName.slice(0, 8)) - Number(a.fileName.slice(0, 8))
  })

  return (
    <div className="pb-6">
      {/* Display character title */}
      <Title Content={Character} />

      <>
        {!characterData || sortedCommissions.length === 0 ? (
          <p className="py-4">To be announced ...</p>
        ) : (
          // List out all commissions related to the character
          sortedCommissions.map((commission, index) => {
            // Define the Alt text
            const illustYear = commission.fileName.slice(0, 4)
            const illustDate = commission.fileName.slice(0, 8)
            const Creator = commission.fileName.slice(9)
              ? commission.fileName.slice(9)
              : 'Anonymous'
            const altText = `Copyright ©️ ${illustYear} ${Creator} & Crystallize`

            return (
              <div key={index} id={`${kebabCase(Character)}-${illustDate}`} className="pt-4">
                <Image
                  src={require(`public/images/${commission.fileName}.jpg`)}
                  alt={altText}
                  width={1280}
                  height={525}
                  quality={90}
                  placeholder="blur"
                  className="pointer-events-none select-none"
                  loading="lazy"
                />
                <div className="pb-4 pt-8 md:pb-2 md:pt-6">
                  <IllustratorInfo commission={commission} characterName={Character} />
                </div>
              </div>
            )
          })
        )}
      </>
    </div>
  )
}

export default Listing
