import { formatDate, kebabCase } from '#components/utils'
import { commissionData } from '#data/commissionData'
import { characterStatus } from '#data/commissionStatus'
import { promises as fs } from 'fs'
import RSS from 'rss'

// Constants
const SITE_TITLE = "Crystallize's NSFW Commissions"
const SITE_URL = 'https://crystallize.cc'
const FEED_URL = `${SITE_URL}/feed.xml`

const MSG_ERROR = '\x1b[0m[\x1b[31m ERROR \x1b[0m]'
const MSG_DONE = '\x1b[0m[\x1b[32m DONE \x1b[0m]'

interface Commission {
  fileName: string
  [key: string]: any
  characterFullName: string
}

function extractDetailsFromFileName(fileName: string) {
  const [datePart, artistPart] = fileName.split('_')
  return {
    rawCommissionDate: datePart,
    commissionDate: formatDate(datePart),
    artistName: artistPart ? artistPart.split('.')[0] : 'Anonymous',
  }
}

async function generateRSSFeed() {
  try {
    const feed = new RSS({
      title: SITE_TITLE,
      site_url: SITE_URL,
      feed_url: FEED_URL,
    })

    // Get names of active characters
    const activeCharacterNames = new Set(characterStatus.active.map(char => char.DisplayName))

    // Prepare and filter commissions
    const allCommissions: Commission[] = []
    for (const characterData of commissionData) {
      if (activeCharacterNames.has(characterData.Character)) {
        allCommissions.push(
          ...characterData.Commissions.map(commission => ({
            ...commission,
            characterFullName: characterData.Character,
          })),
        )
      }
    }

    // Sort all commissions by date
    allCommissions.sort((a, b) => {
      const dateA = a.fileName.split('_')[0]
      const dateB = b.fileName.split('_')[0]
      return dateB.localeCompare(dateA)
    })

    // Add each commission as an item in the RSS feed
    for (const commission of allCommissions) {
      const { commissionDate, artistName, rawCommissionDate } = extractDetailsFromFileName(
        commission.fileName,
      )
      const characterFullName = commission.characterFullName
      const imageUrl = `https://img.${SITE_URL}/nsfw-commission/${commission.fileName}.jpg`

      feed.item({
        title: characterFullName,
        url: `${SITE_URL}#${encodeURIComponent(kebabCase(characterFullName))}-${rawCommissionDate}`,
        date: new Date(commissionDate),
        description: `Illustrator: ${artistName}, published on ${commissionDate}`,
        enclosure: { url: imageUrl, type: 'image/jpeg' },
      })
    }

    await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }))
    console.log(MSG_DONE, 'RSS feed generated successfully!')
  } catch (error) {
    console.error(MSG_ERROR, 'Failed to generate RSS feed:', error)
  }
}

generateRSSFeed()
