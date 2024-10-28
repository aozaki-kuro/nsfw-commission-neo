import { formatDate, kebabCase } from '#components/utils'
import { Commission } from '#data/types'
import Link from 'next/link'
import { createLinks } from './CreateLinks'

type IllustratorInfoProps = {
  commission: Commission
  characterName: string
}

const IllustratorInfo = ({ commission, characterName }: IllustratorInfoProps) => {
  // Convert to kebab case for the link
  const kebabCaseName = kebabCase(characterName)

  const commissionDate = commission.fileName.slice(0, 8)
  const commissionCreator = commission.fileName.split('_')[1]
  const Description = commission.Description

  return (
    <div className="font-mono text-sm text-p-light md:text-xs dark:text-gray-300">
      {/* Main row for Date, Creator/Description, and Links */}
      <div className="flex flex-wrap items-center space-x-2">
        <span className="select-none pr-14 md:pr-4">
          <Link
            href={`#${kebabCaseName}-${commissionDate}`}
            className="text-p-light no-underline dark:text-gray-300"
          >
            <time>{formatDate(commissionDate)}</time>
          </Link>
        </span>

        {/* Display Creator, Description, or '-' as placeholder */}
        {commissionCreator ? (
          <span>{commissionCreator}</span>
        ) : Description ? (
          <span>{Description}</span>
        ) : (
          <span>-</span>
        )}

        {/* Description for mobile view if both Creator and Description exist */}
        {commissionCreator && Description && (
          <span className="md:hidden">
            <span className="pl-2 pr-4">|</span>
            {Description}
          </span>
        )}

        {/* Links */}
        <span className="grow text-right">{createLinks(commission.Links)}</span>
      </div>

      {/* Description on a new line for md if both Creator and Description exist */}
      {commissionCreator && Description && (
        <div className="mt-1 hidden md:visible md:mt-2 md:inline-block">{Description}</div>
      )}
    </div>
  )
}

export default IllustratorInfo
