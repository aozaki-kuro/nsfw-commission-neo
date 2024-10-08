import { formatDate, kebabCase } from '#components/utils'
import { commissionData } from '#data/commissionData'
import RSS from 'rss'

// 常量与默认设置
const SITE_TITLE = "Crystallize's NSFW Commissions"
const SITE_URL = 'https://crystallize.cc'
const FEED_URL = `${SITE_URL}/rss`

// 提取文件名中的日期和艺术家信息
function extractDetailsFromFileName(fileName: string) {
  const [datePart, artistPart] = fileName.split('_')
  return {
    rawCommissionDate: datePart,
    commissionDate: formatDate(datePart),
    artistName: artistPart ? artistPart.split('.')[0] : null,
  }
}

// 根据 commission 数据生成 RSS 项目
function generateRssItem(commission: any, feed: RSS) {
  const { commissionDate, artistName, rawCommissionDate } = extractDetailsFromFileName(
    commission.fileName,
  )
  const characterFullName = commission.characterFullName
  const imageUrl = `https://img.crystallize.cc/nsfw-commission/webp/${commission.fileName}.webp`

  feed.item({
    title: characterFullName,
    url: `${SITE_URL}#${encodeURIComponent(kebabCase(characterFullName))}-${rawCommissionDate}`,
    date: commissionDate,
    author: artistName || 'Anonymous',
    description: `Illustrator: ${artistName || 'Anonymous'}, published on ${commissionDate}`,
    enclosure: { url: imageUrl, type: 'image/jpeg' },
  })
}

// 按日期排序
function sortCommissionsByDate(commissionA: any, commissionB: any) {
  const dateA = commissionA.fileName.split('_')[0]
  const dateB = commissionB.fileName.split('_')[0]
  return dateB.localeCompare(dateA)
}

export async function GET() {
  const feed = new RSS({
    title: SITE_TITLE,
    site_url: SITE_URL,
    feed_url: FEED_URL,
    language: 'en-US',
    webMaster: 'Crystallize',
    ttl: 60,
  })

  // 将所有 Commission 数据展开并与角色名称关联
  const allCommissions = commissionData.flatMap(characterData =>
    characterData.Commissions.map(commission => ({
      ...commission,
      characterFullName: characterData.Character,
    })),
  )

  // 按日期排序
  const sortedCommissions = allCommissions.sort(sortCommissionsByDate)

  // 为每个排序后的 commission 生成 RSS 项目
  sortedCommissions.forEach(commission => {
    generateRssItem(commission, feed)
  })

  // 返回生成的 RSS Feed
  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
