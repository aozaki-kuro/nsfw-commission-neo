import {
  formatDate,
  getBaseFileName,
  kebabCase,
  mergePartsAndPreviews,
  sortCommissionsByDate,
} from '#components/utils'
import { commissionData } from '#data/commissionData'

// 常量与默认设置
const SITE_TITLE = "Crystallize's NSFW Commissions"
const SITE_URL = 'https://crystallize.cc'
// const FEED_URL = `${SITE_URL}/rss`

// 提取文件名中的日期和艺术家信息
function extractDetailsFromFileName(fileName: string) {
  // 调用 utils 中的 getBaseFileName 来清理文件名
  const cleanedFileName = getBaseFileName(fileName)
  const [datePart, artistPart] = cleanedFileName.split('_')
  return {
    rawCommissionDate: datePart,
    commissionDate: formatDate(datePart),
    artistName: artistPart ? artistPart.split('.')[0] : null,
  }
}

// 根据 commission 数据生成 RSS 项目的 XML
function generateRssItem(commission: any) {
  const { commissionDate, artistName, rawCommissionDate } = extractDetailsFromFileName(
    commission.fileName,
  )
  const characterFullName = commission.characterFullName
  const imageUrl = `https://img.crystallize.cc/nsfw-commission/webp/${commission.fileName}.webp`

  return `
    <item>
      <title>${characterFullName}</title>
      <link>${SITE_URL}#${encodeURIComponent(kebabCase(characterFullName))}-${rawCommissionDate}</link>
      <pubDate>${commissionDate}</pubDate>
      <author>${artistName || 'Anonymous'}</author>
      <description><![CDATA[Illustrator: ${artistName || 'Anonymous'}, published on ${commissionDate}]]></description>
      <enclosure url="${imageUrl}" type="image/jpeg" />
    </item>
  `
}

export async function GET() {
  // 将所有 Commission 数据展开并与角色名称关联
  const allCommissions = commissionData.flatMap(characterData =>
    characterData.Commissions.map(commission => ({
      ...commission,
      characterFullName: characterData.Character,
    })),
  )

  // 使用 utils 中的函数去重并合并同一作品的不同 part 或 preview
  const uniqueCommissions = mergePartsAndPreviews(allCommissions)

  // 按日期排序
  const sortedCommissions = Array.from(uniqueCommissions.values()).sort(sortCommissionsByDate)

  // 生成 RSS feed 的头部信息
  let rssFeed = `
    <rss version="2.0">
      <channel>
        <title>${SITE_TITLE}</title>
        <link>${SITE_URL}</link>
        <description>NSFW commission feed from Crystallize</description>
        <language>en-US</language>
        <webMaster>Crystallize</webMaster>
        <ttl>60</ttl>
  `

  // 为每个排序后的 commission 生成 RSS 项目
  sortedCommissions.forEach(commission => {
    rssFeed += generateRssItem(commission)
  })

  // 关闭 RSS feed 的标签
  rssFeed += `
      </channel>
    </rss>
  `

  // 返回生成的 RSS Feed
  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}

export const runtime = 'edge'
