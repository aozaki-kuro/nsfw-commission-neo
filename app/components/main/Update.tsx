import {
  formatDate,
  getBaseFileName,
  isCharacterActive,
  kebabCase,
  mergePartsAndPreviews,
  sortCommissionsByFileName,
} from '#components/utils'
import { commissionData } from '#data/commissionData'
import Link from 'next/link'

// Calculate the total number of commissions (with unique baseFileName)
const totalCommissions = commissionData
  .flatMap(data => data.Commissions.map(commission => getBaseFileName(commission.fileName)))
  .filter((value, index, self) => self.indexOf(value) === index).length // Remove duplicates by baseFileName

const latestEntries = commissionData
  .filter(data => isCharacterActive(data.Character))
  .flatMap(data =>
    data.Commissions.map(commission => ({ ...commission, Character: data.Character })),
  )

// 使用 utils 中的 mergePartsAndPreviews 函数来去重
const uniqueEntries = mergePartsAndPreviews(latestEntries)

// 按日期排序
const sortedEntries = Array.from(uniqueEntries.values()).sort(sortCommissionsByFileName).slice(0, 3)

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
