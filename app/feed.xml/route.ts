// app/feed.xml/router.ts
import { formatDate, kebabCase } from '#components/utils'
import { commissionData } from '#data/commissionData'
import { characterDictionary } from '#data/commissionStatus'
import RSS from 'rss'

// Constants
const SITE_TITLE = "Crystallize's NSFW Commissions"
const SITE_URL = 'https://crystallize.eu.org'
const FEED_URL = `${SITE_URL}/feed.xml`

const characterStatusDictionary = Object.fromEntries(
  characterDictionary.map(({ DisplayName, Active }) => [DisplayName, { Active }]),
)

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
  })

  const allCommissions = commissionData
    .filter(characterData => characterStatusDictionary[characterData.Character]?.Active)
    .flatMap(characterData =>
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
    feed.item({
      title: characterFullName,
      url: `${SITE_URL}#${encodeURIComponent(kebabCase(characterFullName))}-${rawCommissionDate}`,
      date: commissionDate,
      description: `Illustrator: ${artistName || 'Anonymous'}, published on ${commissionDate}`,
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
