// #components/commission/IllustratorInfo.tsx
import { kebabCase, parseAndFormatDate } from '#components/utils'
import { Commission } from '#data/types'
import { createLinks } from './CreateLinks'

type IllustratorInfoProps = {
  commission: Commission
  characterName: string
}

/**
 * 在足够宽的屏幕上，日期/创作者/描述在左，链接在右，一行显示。
 * 当屏幕变窄或内容过长，超出一行时，链接会自动换行到下一行。
 * 使用 flex-wrap + gap-y-2 来在多行内容间增加垂直间距。
 * 无实际空格字符直接置于JSX中，减少选择文本时选中无意义空格的情况。
 */

const IllustratorInfo = ({ commission, characterName }: IllustratorInfoProps) => {
  const kebabCaseName = kebabCase(characterName)
  const { fileName, Description: description, Links: links, Design: designLink } = commission

  const commissionDate = fileName.slice(0, 8)
  const commissionCreator = fileName.split('_')[1] || ''
  const linkId = `#${kebabCaseName}-${commissionDate}`
  const formattedDate = parseAndFormatDate(commissionDate, 'yyyy/MM/dd')

  const hasCreator = Boolean(commissionCreator)
  const hasDescription = Boolean(description)
  const hasBoth = hasCreator && hasDescription

  return (
    <div className="text-p-light flex w-full flex-wrap items-center gap-y-2 font-mono text-sm md:text-xs dark:text-gray-300">
      {/* 左侧信息块：包含日期、创作者、描述 */}
      <div className="flex items-center">
        <span className="mr-16 select-none md:mr-6">
          <a href={linkId} className="text-p-light no-underline dark:text-gray-300!">
            <time>{formattedDate}</time>
          </a>
        </span>

        <div className="flex items-center">
          {hasCreator ? (
            <span>{commissionCreator}</span>
          ) : hasDescription ? (
            <span>{description}</span>
          ) : (
            <span>-</span>
          )}

          {hasBoth && (
            <>
              {/* 使用分隔符，并通过 mx 来控制间距，不使用空格字符 */}
              <span className="mx-4 select-none md:mx-2">|</span>
              <span>{description}</span>
            </>
          )}
        </div>
      </div>

      {/* 右侧链接块：
         使用 ml-auto 将其推到右侧，如果在同一行时可与左侧分开对齐。
         当内容不足放一行时自动换行，flex-grow确保新行独占宽度，justify-end保证右对齐。
      */}
      <div className="ml-auto flex grow justify-end">{createLinks({ links, designLink })}</div>
    </div>
  )
}

export default IllustratorInfo
