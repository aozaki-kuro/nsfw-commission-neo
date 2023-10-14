// ./scripts/rss.ts

import { promises as fs } from 'fs'
import RSS from 'rss'

import { commissionData } from '#data/commissionData' // Assuming this is the correct path to your data
import { characterDictionary } from '#data/commissionStatus'
import { kebabCase, formatDate } from '#components/utils'

// Constants
const SITE_TITLE = "Crystallize's NSFW Commissions"
const SITE_URL = 'https://crystallize.eu.org'
const FEED_URL = `${SITE_URL}/feed.xml`

const MSG_ERROR = '\x1b[0m[\x1b[31m ERROR \x1b[0m]'
const MSG_DONE = '\x1b[0m[\x1b[32m DONE \x1b[0m]'

// Create a dictionary for faster lookups
const characterStatusDictionary = Object.fromEntries(
  characterDictionary.map(({ Abbr, FullName, Active }) => [Abbr, { FullName, Active }]),
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

    // Filter out stale characters and get all commissions in a flat array
    const allCommissions = commissionData
      .filter(characterData => characterStatusDictionary[characterData.Character]?.Active)
      .flatMap(characterData =>
        characterData.Commissions.map(commission => ({
          ...commission,
          characterFullName: characterStatusDictionary[characterData.Character].FullName,
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
      const characterFullName = commission.characterFullName // Corrected line
      feed.item({
        title: characterFullName,
        url: `${SITE_URL}#${kebabCase(characterFullName)}-${rawCommissionDate}`,
        date: new Date(commissionDate),
        description: `Illustrator: ${artistName || 'Anonymous'}, published on ${commissionDate}`,
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
