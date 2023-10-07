import { promises as fs } from 'fs'
import { commissionData } from '#data/commissionData'
import { characterDictionary } from '#data/commissionStatus'
import RSS from 'rss'

import { kebabCase } from '#components/utils'
import { formatDate } from '#components/utils'

// Constants
const SITE_TITLE = "Crystallize's NSFW Commissions"
const SITE_URL = 'https://crystallize.eu.org'
const FEED_URL = `${SITE_URL}/feed.xml`

const MSG_ERROR = '\x1b[0m[\x1b[31m ERROR \x1b[0m]'
const MSG_DONE = '\x1b[0m[\x1b[32m DONE \x1b[0m]'

// Mapping from abbreviation to full character name
const characterNameMapping = Object.fromEntries(
  characterDictionary.map(({ Abbr, FullName }) => [Abbr, FullName.replace('_', '○')]),
)

// Filter for active characters
const activeCharacters = characterDictionary
  .filter(char => char.Active === true)
  .map(char => char.Abbr)

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

    // Enhanced sorting and reduced redundant computation
    const sortedCommissions = commissionData
      // Only include commissions of active characters
      .filter(commission => activeCharacters.includes(commission.Character))
      .map(commission => {
        const details = extractDetailsFromFileName(commission.fileName)
        return {
          ...commission,
          ...details,
          characterFullName: characterNameMapping[commission.Character] || commission.Character,
        }
      })
      .sort((a, b) => b.commissionDate.localeCompare(a.commissionDate))

    for (const {
      commissionDate,
      artistName,
      characterFullName,
      rawCommissionDate,
    } of sortedCommissions) {
      const title = `${characterFullName}`
      const description = `Illustrator: ${
        artistName || 'Anonymous'
      }, published on ${commissionDate}`
      const link = `${SITE_URL}#${kebabCase(characterFullName)}-${rawCommissionDate}`

      feed.item({
        title,
        url: link,
        date: new Date(commissionDate),
        description,
      })
    }

    await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }))

    console.log(MSG_DONE, 'RSS feed generated successfully!')
  } catch (error) {
    console.error(MSG_ERROR, 'Failed to generate RSS feed:', error)
  }
}

generateRSSFeed()
