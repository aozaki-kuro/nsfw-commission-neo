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

  return (
    <div className="pb-4">
      {/* Display character title */}
      <Title Content={Character} />

      <StaleLoader Name={Character} isStale={isStale}>
        {!characterData || characterData.Commissions.length === 0 ? (
          <p>To be announced...</p>
        ) : (
          // List out all commissions related to the character
          characterData.Commissions.map((commission, index) => {
            // Define the Alt text
            const illustYear = commission.fileName.slice(0, 4)
            const illustDate = commission.fileName.slice(0, 8)
            const Creator = commission.fileName.slice(9) || 'Anonymous'
            const altText = `${illustYear} ©️ ${Creator}`

            return (
              <div key={index} id={`${kebabCase(Character)}-${illustDate}`} className="pt-4">
                <Image
                  src={require(`public/images/${commission.fileName}.jpg`)}
                  alt={altText}
                  quality={95}
                  placeholder="blur"
                  className="pointer-events-none select-none"
                />
                <IllustratorInfo commission={commission} characterName={Character} />
              </div>
            )
          })
        )}
      </StaleLoader>
    </div>
  )
}

export default Listing
