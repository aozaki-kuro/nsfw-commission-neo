import { promises as fs } from 'fs'
import RSS from 'rss'

import { commissionData } from '#data/commissionData'
import { characterDictionary } from '#data/commissionStatus'
import { kebabCase, formatDate } from '#components/utils'

// Constants
const SITE_TITLE = "Crystallize's NSFW Commissions"
const SITE_URL = 'https://crystallize.eu.org'
const FEED_URL = `${SITE_URL}/feed.xml`

const MSG_ERROR = '\x1b[0m[\x1b[31m ERROR \x1b[0m]'
const MSG_DONE = '\x1b[0m[\x1b[32m DONE \x1b[0m]'

// Define the shape of the characterNameMapping
interface CharacterNameMapping {
  [key: string]: string
}

// Create the mapping with the defined shape
const characterNameMapping: CharacterNameMapping = characterDictionary.reduce<CharacterNameMapping>(
  (acc, { Abbr, FullName }) => {
    acc[Abbr] = FullName.replace('_', '○')
    return acc
  },
  {},
)

// Use Set for faster membership checking
const activeCharacters = new Set(
  characterDictionary.filter(char => char.Active).map(char => char.Abbr),
)

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

    const sortedCommissions = commissionData
      .filter(commission => activeCharacters.has(commission.Character))
      .map(commission => {
        const details = extractDetailsFromFileName(commission.fileName)
        const characterFullName = characterNameMapping[commission.Character] || commission.Character
        return {
          ...commission,
          ...details,
          characterFullName,
        }
      })
      .sort((a, b) => b.commissionDate.localeCompare(a.commissionDate))

    sortedCommissions.forEach(
      ({ commissionDate, artistName, characterFullName, rawCommissionDate }) => {
        feed.item({
          title: characterFullName,
          url: `${SITE_URL}#${kebabCase(characterFullName)}-${rawCommissionDate}`,
          date: new Date(commissionDate),
          description: `Illustrator: ${artistName || 'Anonymous'}, published on ${commissionDate}`,
        })
      },
    )

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
