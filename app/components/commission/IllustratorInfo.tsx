import { kebabCase, parseAndFormatDate } from '#components/utils'
import { Commission } from '#data/types'
import Link from 'next/link'
import { createLinks } from './CreateLinks'

type IllustratorInfoProps = {
  commission: Commission
  characterName: string
}

/**
 * IllustratorInfo 组件显示有关委托作品的信息，包括日期、创作者、描述和链接。
 * @param commission - 委托作品的数据对象。
 * @param characterName - 与委托作品相关的角色名称。
 */
const IllustratorInfo = ({ commission, characterName }: IllustratorInfoProps) => {
  // 将角色名称转换为 kebab-case，用于链接 ID
  const kebabCaseName = kebabCase(characterName)

  // 从 commission 对象中解构所需的属性
  const { fileName, Description: description, Links: links } = commission

  // 从 fileName 提取日期和创作者信息
  const commissionDate = fileName.slice(0, 8)
  const commissionCreator = fileName.split('_')[1] || ''

  // 生成链接的锚点 ID
  const linkId = `#${kebabCaseName}-${commissionDate}`

  // 格式化日期
  const formattedDate = parseAndFormatDate(commissionDate, 'yyyy/MM/dd')

  // 检查是否存在创作者和描述信息
  const hasCreator = Boolean(commissionCreator)
  const hasDescription = Boolean(description)

  return (
    <div className="font-mono text-sm text-p-light md:text-xs dark:text-gray-300">
      {/* 主行，包含日期、创作者/描述和链接 */}
      <div className="flex flex-wrap items-center space-x-2">
        {/* 日期及其链接 */}
        <span className="select-none pr-14 md:pr-4">
          <Link href={linkId} className="text-p-light no-underline dark:text-gray-300">
            <time>{formattedDate}</time>
          </Link>
        </span>

        {/* 显示创作者、描述或占位符 */}
        {hasCreator ? (
          <span>{commissionCreator}</span>
        ) : hasDescription ? (
          <span>{description}</span>
        ) : (
          <span>-</span>
        )}

        {/* 如果同时存在创作者和描述，在小屏幕下显示描述 */}
        {hasCreator && hasDescription && (
          <span className="md:hidden">
            <span className="pl-2 pr-4">|</span>
            {description}
          </span>
        )}

        {/* 链接部分 */}
        <span className="grow text-right">{createLinks(links)}</span>
      </div>

      {/* 如果同时存在创作者和描述，在中等及以上屏幕大小下显示描述 */}
      {hasCreator && hasDescription && (
        <div className="mt-1 hidden md:mt-2 md:inline-block">{description}</div>
      )}
    </div>
  )
}

export default IllustratorInfo
