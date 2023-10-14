import Link from 'next/link'
import { Commission } from '#data/types'
import { getCharacterFullName, kebabCase, formatDate } from '#components/utils'

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
        <span key={index}>
          <span className="pr-3 md:pr-2" />
          <Link href={url} className="underline-offset-[0.1rem]" target="_blank">
            {type}
          </Link>
        </span>
      )
    })
  }

  // Get the full character name from the abbreviation
  const characterFullName = getCharacterFullName(characterAbbr)
  // Convert to kebab case for the link
  const kebabCaseName = kebabCase(characterFullName)

  return (
    <div className="flex flex-auto pb-4 pt-8 font-mono text-sm md:pb-1 md:pt-5 md:text-xs">
      <Link
        href={`#${kebabCaseName}-${commission.fileName.slice(0, 8)}`} // Adjusted href
        className="text-p-light no-underline dark:text-gray-300"
      >
        {formatDate(commission.fileName.slice(0, 8))}
      </Link>
      <span className="pr-16 md:pr-6" />
      <span>{commission.fileName.split('_')[1] || '-'}</span>
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
