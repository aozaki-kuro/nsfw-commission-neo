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

  return (
    <div className="flex flex-auto font-mono text-sm text-p-light md:text-xs dark:text-gray-300">
      <span className="select-none pr-16 md:pr-6">
        {
          <Link
            href={`#${kebabCaseName}-${commissionDate}`}
            className="text-p-light no-underline dark:text-gray-300"
          >
            <time>{formatDate(commissionDate)}</time>
          </Link>
        }
      </span>
      {commissionCreator || `-`}
      <span className="grow text-right">{createLinks(commission.Links)}</span>
    </div>
  )
}

export default IllustratorInfo
