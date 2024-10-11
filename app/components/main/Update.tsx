import { formatDate, isCharacterActive, kebabCase } from '#components/utils'
import { commissionData } from '#data/commissionData'
import Link from 'next/link'

interface CommissionEntry {
  fileName: string
  Character: string
}

// Calculate the total number of commissions (with unique baseFileName)
const totalCommissions = commissionData
  .flatMap(data =>
    data.Commissions.map(commission =>
      commission.fileName.replace(/ \(preview.*\)| \(part.*\)/, ''),
    ),
  )
  .filter((value, index, self) => self.indexOf(value) === index).length // Remove duplicates by baseFileName

const latestEntries = commissionData
  .filter(data => isCharacterActive(data.Character))
  .flatMap(data =>
    data.Commissions.map(commission => ({ ...commission, Character: data.Character })),
  )
  .reduce<Map<string, CommissionEntry>>((acc, commission) => {
    // Extract the base filename (without the preview/part information)
    const baseFileName = commission.fileName.replace(/ \(preview.*\)| \(part.*\)/, '')

    // Use Map to keep only the latest entry of each group
    if (!acc.has(baseFileName) || acc.get(baseFileName)!.fileName < commission.fileName) {
      acc.set(baseFileName, commission) // Update with the latest entry
    }

    return acc
  }, new Map()) // Use Map to store unique baseFileName entries
  .values() // Get the final list of latest entries

const sortedEntries = Array.from(latestEntries)
  .sort((a, b) => b.fileName.localeCompare(a.fileName))
  .slice(0, 3)

const Update = () =>
  sortedEntries.length === 0 ? (
    <p className="font-mono text-sm">No active updates found</p>
  ) : (
    <div className="flex flex-col pb-4 pt-8 font-mono text-sm ss:text-xs md:pt-6">
      <p className="pb-2">Currently {totalCommissions} commissions</p>

      <div className="flex items-start">
        <p className="pr-2">Last update:</p>
        <div className="flex flex-col space-y-2">
          {sortedEntries.map(({ fileName, Character }, index) => (
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
