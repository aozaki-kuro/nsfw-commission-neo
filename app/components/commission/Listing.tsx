'use client'

import Image from 'next/image'

import { characterDictionary } from '#data/commissionStatus'
import { commissionData } from '#data/commissionData' // Adjust the import to your new data file

import { kebabCase } from '#components/utils'
import { useScrollHook } from './useScrollHook'
import IllustratorInfo from './IllustratorInfo'
import CharacterTitle from './CharacterTitle'
import StaleLoader from './StaleLoader'

const Listing = ({ Character, isStale = false }: { Character: string; isStale?: boolean }) => {
  useScrollHook()

  // Find the character's commission data
  const characterData = commissionData.find(
    data => data.Character.toLowerCase() === Character.toLowerCase(),
  )
  const commissions = characterData ? characterData.Commissions : []

  // Look up the full character name from the dictionary
  const dictionaryEntry = characterDictionary.find(
    chara => chara.Abbr.toLowerCase() === Character.toLowerCase(),
  )
  const characterFullName = dictionaryEntry?.FullName || Character.toLowerCase()

  return (
    <div className="pb-4">
      <CharacterTitle Name={characterFullName} />

      <StaleLoader Name={characterFullName} isStale={isStale}>
        {commissions.length === 0 ? (
          <p>To be announced...</p>
        ) : (
          commissions.map((commission, index) => (
            <div
              key={index}
              id={`${kebabCase(characterFullName)}-${commission.fileName.slice(0, 8)}`}
              className="pt-4"
            >
              <Image
                src={require(`public/images/${commission.fileName}.jpg`)}
                alt={`${commission.fileName} ©️ ${commission.fileName.slice(0, 8)}`}
                quality={95}
                placeholder="blur"
              />
              <IllustratorInfo commission={commission} characterAbbr={Character} />
            </div>
          ))
        )}
      </StaleLoader>
    </div>
  )
}

export default Listing
