import { formatDate, isCharacterActive, kebabCase } from '#components/utils'
import { commissionData } from '#data/commissionData'
import Link from 'next/link'

const latestEntry = commissionData
  .filter(data => isCharacterActive(data.Character))
  .flatMap(data =>
    data.Commissions.map(commission => ({ ...commission, Character: data.Character })),
  )
  .sort((a, b) => b.fileName.localeCompare(a.fileName))[0]

const Update = () => {
  if (!latestEntry) return <p className="font-mono text-sm">No active updates found</p>

  const { fileName, Character } = latestEntry

  return (
    <div className="flex flex-auto pb-4 pt-8 font-mono text-sm ss:text-xs md:pt-6">
      <p className="pr-2">Last update:</p>
      <p className="pr-2">{formatDate(fileName.substring(0, 8))}</p>
      <p>
        {'[ '}
        <Link
          href={`#${kebabCase(Character)}-${fileName.substring(0, 8)}`}
          className="underline-offset-[0.1rem]"
        >
          {Character}
        </Link>
        {' ]'}
      </p>
    </div>
  )
}

export default Update
