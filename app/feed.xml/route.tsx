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

// 提取文件名中的日期和艺术家信息
function extractDetailsFromFileName(fileName: string) {
  const cleanedFileName = getBaseFileName(fileName)
  const [datePart, artistPart] = cleanedFileName.split('_')
  return {
    rawCommissionDate: datePart,
    commissionDate: formatDate(datePart),
    artistName: artistPart ? artistPart.split('.')[0] : null,
  }
}

// 生成单个 RSS 项目的 XML
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

// 用于生成静态参数，但这里不需要动态路径
export const generateStaticParams = async () => {
  return []
}

// HTTP GET 方法的命名导出，用于处理 /feed.xml 请求
export async function GET() {
  // 获取所有的 commission 数据并合并角色名称
  const allCommissions = commissionData.flatMap(characterData =>
    characterData.Commissions.map(commission => ({
      ...commission,
      characterFullName: characterData.Character,
    })),
  )

  // 去重并合并 part 和 preview
  const uniqueCommissions = mergePartsAndPreviews(allCommissions)

  // 按日期排序
  const sortedCommissions = Array.from(uniqueCommissions.values()).sort(sortCommissionsByDate)

  // 构建 RSS 头部
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

  // 生成每一个 commission 的 `<item>`
  sortedCommissions.forEach(commission => {
    rssFeed += generateRssItem(commission)
  })

  // 关闭 RSS feed 的标签
  rssFeed += `
      </channel>
    </rss>
  `

  // 返回 RSS feed 的响应
  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
