import { formatDate, isCharacterActive, kebabCase } from '#components/utils'
import { Commission } from '#data/types'
import Link from 'next/link'
import { createLinks } from './CreateLinks'

type IllustratorInfoProps = {
  commission: Commission
  characterDisplayName: string
}

const IllustratorInfo = ({ commission, characterDisplayName }: IllustratorInfoProps) => {
  const isActive = isCharacterActive(characterDisplayName)

  // Convert to kebab case for the link
  const kebabCaseName = kebabCase(characterDisplayName)

  const commissionDate = commission.fileName.slice(0, 8)

  const commissionCreator = commission.fileName.split('_')[1]

  return (
    <div className="flex flex-auto pb-4 pt-8 font-mono text-sm md:pb-1 md:pt-5 md:text-xs">
      <span className="select-none pr-16 text-p-light dark:text-gray-300 md:pr-6">
        {
          /*
           * This disables the linking functions for the stale commissions
           */
          isActive ? (
            <Link href={`#${kebabCaseName}-${commissionDate}`} className="no-underline ">
              <time>{formatDate(commissionDate)}</time>
            </Link>
          ) : (
            <time>{formatDate(commissionDate)}</time>
          )
        }
      </span>
      {commissionCreator || `-`}
      <span className="grow select-none text-right">
        {commission.Links.length === 0 ? `N/A` : createLinks(commission.Links)}
      </span>
    </div>
  )
}

export default IllustratorInfo
