import { formatDate, isCharacterActive, kebabCase } from '#components/utils'
import { Commission } from '#data/types'
import Link from 'next/link'
import { createLinks } from './CreateLinks'

type IllustratorInfoProps = {
  commission: Commission
  characterName: string
}

const IllustratorInfo = ({ commission, characterName }: IllustratorInfoProps) => {
  const isActive = isCharacterActive(characterName)

  // Convert to kebab case for the link
  const kebabCaseName = kebabCase(characterName)

  const commissionDate = commission.fileName.slice(0, 8)

  const commissionCreator = commission.fileName.split('_')[1]

  return (
    <div className="flex flex-auto pb-4 pt-8 font-mono text-sm text-p-light dark:text-gray-300 md:pb-1 md:pt-5 md:text-xs">
      <span className="select-none pr-16 md:pr-6">
        {
          /*
           * This disables the linking functions for the stale commissions
           */
          isActive ? (
            <Link
              href={`#${kebabCaseName}-${commissionDate}`}
              className="text-p-light no-underline dark:text-gray-300 "
            >
              <time>{formatDate(commissionDate)}</time>
            </Link>
          ) : (
            <time>{formatDate(commissionDate)}</time>
          )
        }
      </span>
      {commissionCreator || `-`}
      <span className="grow text-right">{createLinks(commission.Links)}</span>
    </div>
  )
}

export default IllustratorInfo
