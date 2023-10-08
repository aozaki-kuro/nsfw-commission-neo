'use client'

import Image from 'next/image'

import { characterDictionary } from '#data/commissionStatus'
import { commissionData } from '#data/commissionData'

import { kebabCase } from '#components/utils'
import { useScrollHook } from './useScrollHook'
import IllustratorInfo from './IllustratorInfo'
import CharacterTitle from './CharacterTitle'
import StaleLoader from './StaleLoader'

const Listing = ({ Character, isStale = false }: { Character: string; isStale?: boolean }) => {
  useScrollHook()

  /**
   * commissions - A derived list of commissions for the specific character.
   * Each commission includes its full name, publish date, creator's name, and other details.
   */
  const commissions = Object.values(commissionData)
    // Filter for commissions that match the given character
    .filter(commission => commission.Character.toLowerCase() === Character.toLowerCase())
    .map(commission => {
      // Look up the full character name from the dictionary
      const dictionaryEntry = characterDictionary.find(chara => chara.Abbr === commission.Character)
      const fullName = dictionaryEntry?.FullName || commission.Character.toLowerCase()

      return {
        ...commission,
        FullName: fullName,
        // Extract the publish date from the file name (expected format: YYYYMMDD)
        PublishDate: commission.fileName.slice(0, 8),
        // Extract the creator's name from the file name (expected after underscore)
        Creator: commission.fileName.split('_')[1],
      }
    })
    // Sort commissions by publish date in descending order
    .sort((a, b) => b.PublishDate.localeCompare(a.PublishDate))

  const characterFullName = commissions[0].FullName

  return (
    <div className="pb-4">
      <CharacterTitle Name={characterFullName} />

      <StaleLoader Name={characterFullName} isStale={isStale}>
        {commissions.length === 0 ? (
          <p>To be announced...</p>
        ) : (
          commissions.map(commission => (
            <div
              key={`${kebabCase(commission.FullName)}-${commission.PublishDate}`}
              id={`${kebabCase(commission.FullName)}-${commission.PublishDate}`}
              className="pt-4"
            >
              <Image
                src={require(`data/images/${commission.Character}/${commission.fileName}.jpg`)}
                alt={`${commission.Creator} ©️ ${commission.PublishDate}`}
                quality={95}
                placeholder="blur"
              />
              <IllustratorInfo commission={commission} />
            </div>
          ))
        )}
      </StaleLoader>
    </div>
  )
}

export default Listing
