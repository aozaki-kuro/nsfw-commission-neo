import { formatDate, kebabCase } from '#components/utils'
import { commissionData } from '#data/commissionData'
import RSS from 'rss'

// Constants
const SITE_TITLE = "Crystallize's NSFW Commissions"
const SITE_URL = 'https://crystallize.cc'
const FEED_URL = `${SITE_URL}/rss`

function extractDetailsFromFileName(fileName: string) {
  const [datePart, artistPart] = fileName.split('_')
  return {
    rawCommissionDate: datePart,
    commissionDate: formatDate(datePart),
    artistName: artistPart ? artistPart.split('.')[0] : null,
  }
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

  const allCommissions = commissionData.flatMap(characterData =>
    characterData.Commissions.map(commission => ({
      ...commission,
      characterFullName: characterData.Character,
    })),
  )

  const sortedCommissions = allCommissions.sort((a, b) => {
    const dateA = a.fileName.split('_')[0]
    const dateB = b.fileName.split('_')[0]
    return dateB.localeCompare(dateA)
  })

  sortedCommissions.forEach(commission => {
    const { commissionDate, artistName, rawCommissionDate } = extractDetailsFromFileName(
      commission.fileName,
    )
    const characterFullName = commission.characterFullName
    const imageUrl = `https://img.crystallize.cc/nsfw-commission/${commission.fileName}.jpg`
    feed.item({
      title: characterFullName,
      url: `${SITE_URL}#${encodeURIComponent(kebabCase(characterFullName))}-${rawCommissionDate}`,
      date: commissionDate,
      author: artistName || 'Anonymous',
      description: `Illustrator: ${artistName || 'Anonymous'}, published on ${commissionDate}`,
      enclosure: { url: imageUrl, type: 'image/jpeg' },
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
