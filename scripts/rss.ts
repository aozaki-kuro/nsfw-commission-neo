import { promises as fs } from 'fs'
import RSS from 'rss'

import { formatDate, kebabCase } from '#components/utils'
import { commissionData } from '#data/commissionData'
import { characterStatus } from '#data/commissionStatus'

// Constants
const SITE_TITLE = "Crystallize's NSFW Commissions"
const SITE_URL = 'https://crystallize.eu.org'
const FEED_URL = `${SITE_URL}/feed.xml`

const MSG_ERROR = '\x1b[0m[\x1b[31m ERROR \x1b[0m]'
const MSG_DONE = '\x1b[0m[\x1b[32m DONE \x1b[0m]'

function extractDetailsFromFileName(fileName: string) {
  const [datePart, artistPart] = fileName.split('_')
  return {
    rawCommissionDate: datePart,
    commissionDate: formatDate(datePart),
    artistName: artistPart ? artistPart.split('.')[0] : null,
  }
}

async function generateRSSFeed() {
  try {
    const feed = new RSS({
      title: SITE_TITLE,
      site_url: SITE_URL,
      feed_url: FEED_URL,
    })

    // Get only the names of active characters for filtering
    const activeCharacterNames = characterStatus.active.map(char => char.DisplayName)

    // Filter out commissions that don't belong to active characters
    const allCommissions = commissionData
      .filter(characterData => activeCharacterNames.includes(characterData.Character))
      .flatMap(characterData =>
        characterData.Commissions.map(commission => ({
          ...commission,
          characterFullName: characterData.Character,
        })),
      )

    // Sort all commissions by date
    const sortedCommissions = allCommissions.sort((a, b) => {
      const dateA = a.fileName.split('_')[0]
      const dateB = b.fileName.split('_')[0]
      return dateB.localeCompare(dateA)
    })

    // Add each commission as an item in the RSS feed
    sortedCommissions.forEach(commission => {
      const { commissionDate, artistName, rawCommissionDate } = extractDetailsFromFileName(
        commission.fileName,
      )
      const characterFullName = commission.characterFullName
      const imageUrl = `https://img.${SITE_URL}/nsfw-commission/${commission.fileName}.jpg`
      feed.item({
        title: characterFullName,
        url: `${SITE_URL}#${encodeURIComponent(kebabCase(characterFullName))}-${rawCommissionDate}`,
        date: new Date(commissionDate),
        description: `Illustrator: ${artistName || 'Anonymous'}, published on ${commissionDate}`,
        enclosure: { url: imageUrl, type: 'image/jpeg' },
      })
    })

    try {
      await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }))
      console.log(MSG_DONE, 'RSS feed generated successfully!')
    } catch (writeError) {
      console.error(MSG_ERROR, 'Error writing RSS feed:', writeError)
    }
  } catch (error) {
    console.error(MSG_ERROR, 'Failed to generate RSS feed:', error)
  }
}

generateRSSFeed()
