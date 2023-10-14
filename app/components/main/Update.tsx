import { characterDictionary } from '#data/commissionStatus'
import { commissionData } from '#data/commissionData' // Adjust the import to your new data file
import Link from 'next/link'
import { kebabCase } from '#components/utils'
import { formatDate } from '#components/utils'

type LatestEntry = {
  fileName: string
  Character: string
}

// Utility function to check if a character is active
const isActiveCharacter = (characterAbbr: string): boolean => {
  const characterStatus = characterDictionary.find(chara => chara.Abbr === characterAbbr)
  return !!characterStatus?.Active
}

// Determine the latest entry considering only active characters
const latestEntry = commissionData.reduce((latest: LatestEntry | null, characterData) => {
  const activeCommissions = characterData.Commissions.filter(() =>
    isActiveCharacter(characterData.Character),
  )
  if (activeCommissions.length === 0) return latest

  const latestCommission = activeCommissions.reduce(
    (latestCommission, commission) =>
      latestCommission.fileName > commission.fileName ? latestCommission : commission,
    activeCommissions[0],
  )

  if (!latest || latestCommission.fileName > latest.fileName) {
    return { fileName: latestCommission.fileName, Character: characterData.Character }
  }

  return latest
}, null)

const Update = () => {
  if (!latestEntry) {
    return <p className="font-mono text-sm">No active updates found</p>
  }

  const { fileName, Character } = latestEntry
  const { FullName: fullName = Character.toLowerCase() } =
    characterDictionary.find(chara => chara.Abbr === Character) || {}
  const formattedDate = formatDate(fileName.substring(0, 8))

  return (
    <div className="flex flex-auto py-8 font-mono text-sm ss:text-xs md:py-6">
      <p className="pr-2">Last update:</p>
      <p className="pr-2" suppressHydrationWarning={true}>
        {formattedDate}
      </p>
      <p className="">
        {'[ '}
        <Link
          href={`#${kebabCase(fullName)}-${fileName.substring(0, 8)}`}
          className="underline-offset-[0.1rem]"
        >
          {fullName}
        </Link>
        {' ]'}
      </p>
    </div>
  )
}

export default Update
