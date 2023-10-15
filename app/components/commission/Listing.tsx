'use client'

import { kebabCase } from '#components/utils'
import { commissionData } from '#data/commissionData'
import Image from 'next/image'
import CharacterTitle from './CharacterTitle'
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
      <CharacterTitle Name={Character} />

      <StaleLoader Name={Character} isStale={isStale}>
        {!characterData || characterData.Commissions.length === 0 ? (
          <p>To be announced...</p>
        ) : (
          // List out all commissions related to the character
          characterData.Commissions.map((commission, index) => (
            <div
              key={index}
              id={`${kebabCase(Character)}-${commission.fileName.slice(0, 8)}`}
              className="pt-4"
            >
              <Image
                src={require(`public/images/${commission.fileName}.jpg`)}
                alt={`${commission.fileName} ©️ ${commission.fileName.slice(0, 8)}`}
                quality={95}
                placeholder="blur"
                className="pointer-events-none select-none"
              />
              <IllustratorInfo commission={commission} characterDisplayName={Character} />
            </div>
          ))
        )}
      </StaleLoader>
    </div>
  )
}

export default Listing
