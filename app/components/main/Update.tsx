import { formatDate, isCharacterActive, kebabCase } from '#components/utils'
import { commissionData } from '#data/commissionData'
import Link from 'next/link'

// Calculate the total number of commissions
const totalCommissions = commissionData.reduce((count, data) => count + data.Commissions.length, 0)

const latestEntries = commissionData
  .filter(data => isCharacterActive(data.Character))
  .flatMap(data =>
    data.Commissions.map(commission => ({ ...commission, Character: data.Character })),
  )
  .sort((a, b) => b.fileName.localeCompare(a.fileName)) // Sort by filename in descending order
  .slice(0, 3) // Get the latest 3 entries

const Update = () =>
  latestEntries.length === 0 ? (
    <p className="font-mono text-sm">No active updates found</p>
  ) : (
    <div className="flex flex-col pb-4 pt-8 font-mono text-sm ss:text-xs md:pt-6">
      <p className="pb-2">Currently {totalCommissions} commissions</p>

      <div className="flex items-start">
        <p className="pr-2">Last update:</p>
        <div className="flex flex-col space-y-2">
          {latestEntries.map(({ fileName, Character }, index) => (
            <p key={index} className="pr-2">
              {formatDate(fileName.substring(0, 8))} {'[ '}
              <Link
                href={`#${kebabCase(Character)}-${fileName.substring(0, 8)}`}
                className="underline-offset-[0.1rem]"
              >
                {Character}
              </Link>
              {' ]'}
            </p>
          ))}
        </div>
      </div>
    </div>
  )

export default Update
