import { charaDictionary } from '#data/CharaDictionary'
import { commissionData } from '#data/CommissionData'
import Link from 'next/link'
import kebabCase from '#components/lib/kebabCase'
import formatDate from '#components/lib/dateFormat'

type LatestEntry = {
  fileName: string
  Character: string
}

const latestEntry = Object.values(commissionData).reduce(
  (latest: LatestEntry | null, { fileName, Character }) => {
    const publishDateInt = parseInt(fileName.substring(0, 8))
    if (isNaN(publishDateInt)) return latest
    if (!latest || latest.fileName < fileName) {
      return { fileName, Character }
    }
    return latest
  },
  null,
)

const Update = () => {
  if (!latestEntry) {
    return <p className="font-mono text-sm">No updates found</p>
  }

  const dictionaryEntry = charaDictionary.find(chara => chara.Abbr === latestEntry.Character)
  const fullName = dictionaryEntry?.FullName || latestEntry.Character.toLowerCase()
  const formattedDate = `${formatDate(latestEntry.fileName)}`

  return (
    <div className="flex flex-auto py-8 font-mono text-sm ss:text-xs">
      <p className="pr-2">Last update:</p>
      <p className="pr-2" suppressHydrationWarning={true}>
        {formattedDate}
      </p>
      <p className="">
        {'[ '}
        <Link
          href={`#${kebabCase(fullName)}-${latestEntry.fileName.substring(0, 8)}`}
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
