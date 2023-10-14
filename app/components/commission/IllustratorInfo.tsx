import Link from 'next/link'
import { Commission } from '#data/types'
import { getCharacterFullName, kebabCase, formatDate, isCharacterActive } from '#components/utils'

type IllustratorInfoProps = {
  commission: Commission
  characterAbbr: string
}

const IllustratorInfo = ({ commission, characterAbbr }: IllustratorInfoProps) => {
  // Function to determine link type and generate JSX
  const createLinks = (links: string[]) => {
    return links.map((url, index) => {
      let type
      if (url.includes('twitter.com') || url.includes('x.com')) type = 'Twitter'
      else if (url.includes('pixiv.net')) type = 'Pixiv'
      else if (url.includes('fanbox.cc')) type = 'Fanbox'
      else if (url.includes('fantia.jp')) type = 'Fantia'
      else return null

      return (
        <span key={index} className="select-none">
          <span className="pr-3 md:pr-2" />
          <Link href={url} className="underline-offset-[0.1rem]" target="_blank">
            {type}
          </Link>
        </span>
      )
    })
  }

  const isActive = isCharacterActive(characterAbbr)

  // Get the full character name from the abbreviation
  const characterFullName = getCharacterFullName(characterAbbr)
  // Convert to kebab case for the link
  const kebabCaseName = kebabCase(characterFullName)

  const commissionDate = commission.fileName.slice(0, 8)

  const commissionCreator = commission.fileName.split('_')[1]

  return (
    <div className="flex flex-auto pb-4 pt-8 font-mono text-sm md:pb-1 md:pt-5 md:text-xs">
      {
        /*
         * This disables the linking functions for the stale commissions
         */
        isActive ? (
          <Link
            href={`#${kebabCaseName}-${commissionDate}`}
            className="select-none text-p-light no-underline dark:text-gray-300"
          >
            {formatDate(commissionDate)}
          </Link>
        ) : (
          <span className="select-none text-p-light no-underline dark:text-gray-300">
            {formatDate(commissionDate)}
          </span>
        )
      }
      <span className="select-none pr-16 md:pr-6" />
      {commissionCreator != null ? (
        <span>{commissionCreator}</span>
      ) : (
        <span className="select-none">-</span>
      )}
      <span className="grow text-right">
        {commission.Links.length === 0 ? (
          <span className="cursor-not-allowed select-none">N/A</span>
        ) : (
          createLinks(commission.Links)
        )}
      </span>
    </div>
  )
}

export default IllustratorInfo
