import { kebabCase, parseAndFormatDate } from '#components/utils'
import { Commission } from '#data/types'
import Link from 'next/link'
import { createLinks } from './CreateLinks'

type IllustratorInfoProps = {
  commission: Commission
  characterName: string
}

/**
 * IllustratorInfo 组件负责展示委托作品的相关信息（日期、创作者、描述、链接），并在不同屏幕尺寸下呈现不同布局。
 *
 * 假设你的 Tailwind 配置中，`md:` 表示小屏（max-width）状态，无前缀表示大屏状态。
 * 因此：
 * - 无 `md:` 前缀类名：适用于大屏（较宽屏幕）。
 * - 带 `md:` 前缀类名：适用于小屏（较窄屏幕）。
 *
 * 布局与逻辑说明：
 * - 当同时存在创作者 (illustrator) 和描述 (description) 时 (hasBoth = true)：
 *   - 大屏（无 md:）：仍然一行显示所有信息（日期、创作者、描述、链接）。
 *   - 小屏（md:）：分为上下两行显示。第一行显示日期、创作者、描述，第二行显示链接，并为链接添加 `mt-2` 提供额外的垂直间距。
 *
 * - 当不存在同时有创作者和描述的情况 (hasBoth = false)：
 *   - 无论大屏小屏，都始终在同一行显示所有信息和链接，不会添加额外的上间距。
 *
 * 通过给父容器添加 `flex-row md:flex-col` 来在小屏下实现换行，而仅在需要（hasBoth=true）时添加此类。当 hasBoth=false 时则保持 `flex-row`，从而无论小屏大屏，都不发生换行和额外间距。
 *
 * 此外，通过 `md:mt-2` 在小屏分行时给链接增加额外的上间距，而大屏或无分行时则不添加间距。
 */

const IllustratorInfo = ({ commission, characterName }: IllustratorInfoProps) => {
  // 将角色名称转为 kebab-case，用于生成链接锚点 ID
  const kebabCaseName = kebabCase(characterName)

  // 从 commission 对象中提取所需信息
  const { fileName, Description: description, Links: links, Design: designLink } = commission

  // 从 fileName 中提取日期和创作者信息
  const commissionDate = fileName.slice(0, 8) // 前8位为日期(yyyyMMdd)
  const commissionCreator = fileName.split('_')[1] || ''

  // 基于角色名和日期生成锚点链接
  const linkId = `#${kebabCaseName}-${commissionDate}`

  // 格式化日期为 yyyy/MM/dd
  const formattedDate = parseAndFormatDate(commissionDate, 'yyyy/MM/dd')

  // 判断信息是否完整
  const hasCreator = Boolean(commissionCreator)
  const hasDescription = Boolean(description)
  const hasBoth = hasCreator && hasDescription

  // 根据是否有both决定小屏下是否分行：有both则小屏变为flex-col分行，无both则保持flex-row不分行
  const containerClasses = hasBoth ? 'flex-row sd:flex-col' : 'flex-row'

  // 当 hasBoth 为 true 时，小屏下添加上间距 md:mt-2；无both时不添加
  const linkContainerMarginTop = hasBoth ? 'sd:mt-2' : ''

  return (
    <div
      className={`flex ${containerClasses} font-mono text-sm text-p-light md:text-xs dark:text-gray-300`}
    >
      {/* 左侧信息：日期、创作者/描述。
         当 hasBoth=true 并切换到小屏(sd:)时，这部分会成为第一行。大屏下仍为一行中的左侧部分。 */}
      <div className="flex items-center space-x-2">
        {/* 日期及其链接锚点 */}
        <span className="select-none pr-14 md:pr-4">
          <Link href={linkId} className="text-p-light no-underline dark:text-gray-300">
            <time>{formattedDate}</time>
          </Link>
        </span>

        {/* 根据情况显示创作者、描述或占位符 */}
        {hasCreator ? (
          <span>{commissionCreator}</span>
        ) : hasDescription ? (
          <span>{description}</span>
        ) : (
          <span>-</span>
        )}

        {/* 如果创作者和描述同时存在，显示分隔符和描述 */}
        {hasBoth && (
          <>
            <span className="px-2 md:px-0">|</span>
            <span>{description}</span>
          </>
        )}
      </div>

      {/* 右侧链接部分。
         大屏：与上述信息同一行末尾（由于flex-row和ml-auto推到右侧）。
         小屏（当hasBoth=true）时，会因为md:flex-col导致链接自动换行到第二行，并通过linkContainerMarginTop增加间隔。
         当hasBoth=false时，小屏下仍为一行，无额外间距。
      */}
      <div className={`ml-auto ${linkContainerMarginTop}`}>
        {createLinks({ links, designLink })}
      </div>
    </div>
  )
}

export default IllustratorInfo
