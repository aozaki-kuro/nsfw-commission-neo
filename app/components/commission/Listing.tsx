'use client'

import Title from '#components/Title'
import { kebabCase } from '#components/utils'
import { commissionData } from '#data/commissionData'
import Image from 'next/image'
import IllustratorInfo from './IllustratorInfo'
import StaleLoader from './StaleLoader'
import { useScrollHook } from './useScrollHook'

const Listing = ({ Character, isStale = false }: { Character: string; isStale?: boolean }) => {
  useScrollHook()

  // Find data related to the given character
  const characterData = commissionData.find(data => data.Character === Character)

  // Sort commissions in descending order, or default to an empty array if undefined
  const sortedCommissions = [...(characterData?.Commissions || [])].sort((a, b) => {
    return parseInt(b.fileName.slice(0, 8)) - parseInt(a.fileName.slice(0, 8))
  })

  return (
    <div className="pb-6">
      {/* Display character title */}
      <div className="pb-2">
        <Title Content={Character} />
      </div>

      <StaleLoader Name={Character} isStale={isStale}>
        {!characterData || sortedCommissions.length === 0 ? (
          <p className="py-4">To be announced ...</p>
        ) : (
          // List out all commissions related to the character
          sortedCommissions.map((commission, index) => {
            // Define the Alt text
            const illustYear = commission.fileName.slice(0, 4)
            const illustDate = commission.fileName.slice(0, 8)
            const Creator = commission.fileName.slice(9) || 'Anonymous'
            const altText = `Copyright ©️ ${illustYear} ${Creator} & Crystallize`

            return (
              <div key={index} id={`${kebabCase(Character)}-${illustDate}`} className="pt-4">
                <Image
                  src={require(`public/images/${commission.fileName}.jpg`)}
                  alt={altText}
                  quality={95}
                  placeholder="blur"
                  className="pointer-events-none select-none"
                />
                <div className="pb-4 pt-8 md:pb-2 md:pt-6">
                  <IllustratorInfo commission={commission} characterName={Character} />
                </div>
              </div>
            )
          })
        )}
      </StaleLoader>
    </div>
  )
}

export default Listing
