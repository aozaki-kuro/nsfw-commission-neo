import { formatDate, isCharacterActive, kebabCase } from '#components/utils'
import { commissionData } from '#data/commissionData'
import Link from 'next/link'

// Calculate the total number of commissions
const totalCommissions = commissionData.reduce((count, data) => {
  return count + data.Commissions.length
}, 0)

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
    <div className="flex flex-col pb-4 pt-8 font-mono text-sm ss:text-xs md:pt-6">
      {/* Total commissions on its own line */}
      <p className="pb-2">Currently {totalCommissions} commissions</p>

      {/* Last update info on a single line */}
      <p className="pr-2">
        Last update: {formatDate(fileName.substring(0, 8))} {'[ '}
        <Link
          href={`#${kebabCase(Character)}-${fileName.substring(0, 8)}`}
          className="plausible-event-name=Check+Latest underline-offset-[0.1rem]"
        >
          {Character}
        </Link>
        {' ]'}
      </p>
    </div>
  )
}

export default Update
