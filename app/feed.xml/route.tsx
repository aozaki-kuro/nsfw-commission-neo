import {
  formatDate,
  getBaseFileName,
  kebabCase,
  mergePartsAndPreviews,
  sortCommissionsByDate,
} from '#components/utils'
import { commissionData } from '#data/commissionData'

const SITE_TITLE = "Crystallize's NSFW Commissions"
const SITE_URL = 'https://crystallize.cc'

interface Commission {
  fileName: string
  characterFullName: string
  // 其他可能的属性
}

interface CommissionDetails {
  rawCommissionDate: string
  commissionDate: string
  artistName: string | null
}

/**
 * 从文件名中提取日期和艺术家信息
 */
function extractDetailsFromFileName(fileName: string): CommissionDetails {
  const cleanedFileName = getBaseFileName(fileName)
  const [datePart, artistPartWithExt] = cleanedFileName.split('_')
  const artistName = artistPartWithExt ? artistPartWithExt.split('.')[0] : null

  return {
    rawCommissionDate: datePart,
    commissionDate: formatDate(datePart),
    artistName,
  }
}

/**
 * 生成单个 RSS 项目的 XML 字符串
 */
function generateRssItem(commission: Commission): string {
  const { commissionDate, artistName, rawCommissionDate } = extractDetailsFromFileName(
    commission.fileName,
  )
  const { characterFullName } = commission
  const imageUrl = `https://img.crystallize.cc/nsfw-commission/webp/${commission.fileName}.webp`
  const link = `${SITE_URL}#${encodeURIComponent(kebabCase(characterFullName))}-${rawCommissionDate}`
  const description = `<![CDATA[Illustrator: ${artistName || 'Anonymous'}, published on ${commissionDate}]]>`

  return `
    <item>
      <title>${characterFullName}</title>
      <link>${link}</link>
      <pubDate>${commissionDate}</pubDate>
      <author>${artistName || 'Anonymous'}</author>
      <description>${description}</description>
      <enclosure url="${imageUrl}" type="image/jpeg" />
    </item>
  `
}

/**
 * 生成完整的 RSS Feed
 */
function generateRssFeed(items: string[]): string {
  return `
    <rss version="2.0">
      <channel>
        <title>${SITE_TITLE}</title>
        <link>${SITE_URL}</link>
        <description>NSFW commission feed from Crystallize</description>
        <language>en-US</language>
        <webMaster>Crystallize</webMaster>
        <ttl>60</ttl>
        ${items.join('')}
      </channel>
    </rss>
  `
}

// 用于生成静态参数，但这里不需要动态路径
export const generateStaticParams = async () => {
  return []
}

// HTTP GET 方法的命名导出，用于处理 /feed.xml 请求
export async function GET() {
  // 获取所有的 commission 数据并合并角色名称
  const allCommissions: Commission[] = commissionData.flatMap(characterData =>
    characterData.Commissions.map(commission => ({
      ...commission,
      characterFullName: characterData.Character,
    })),
  )

  // 去重并合并 part 和 preview
  const uniqueCommissions = mergePartsAndPreviews(allCommissions)

  // 按日期排序
  const sortedCommissions = Array.from(uniqueCommissions.values()).sort(sortCommissionsByDate)

  // 生成每一个 commission 的 `<item>`
  const rssItems = sortedCommissions.map(generateRssItem)

  // 构建完整的 RSS Feed
  const rssFeed = generateRssFeed(rssItems)

  // 返回 RSS feed 的响应
  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
