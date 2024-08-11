import { commissionData } from '#data/commissionData'
import dotenv from 'dotenv'
import fs, { promises as fsPromises } from 'fs'
import { IncomingMessage } from 'http'
import https from 'https'
import path from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'

// Message definitions
const msgError = '\x1b[0m[\x1b[31m ERROR \x1b[0m]'
const msgDone = '\x1b[0m[\x1b[32m DONE \x1b[0m]'

const dlDestinationWebp = 'public/images/webp'
const dlDestinationJpg = 'public/images'

dotenv.config()

const HOSTING = process.env.HOSTING
const NODE_ENV = process.env.NODE_ENV

if (!HOSTING) {
  console.error(msgError, 'DL links not set correctly in the environment or .env')
  process.exit(1)
}

const streamPipeline = promisify(pipeline)

async function downloadResource(url: string, filePath: string): Promise<void> {
  const response = await new Promise<IncomingMessage>((resolve, reject) => {
    https.get(url, resolve).on('error', reject)
  })

  if (response.statusCode !== 200) {
    throw new Error(`Failed to get '${url}' (${response.statusCode})`)
  }

  await streamPipeline(response, fs.createWriteStream(filePath))
}

async function ensureDirectories() {
  await Promise.all([
    fsPromises.mkdir(dlDestinationWebp, { recursive: true }),
    NODE_ENV === 'development'
      ? fsPromises.mkdir(dlDestinationJpg, { recursive: true })
      : Promise.resolve(),
  ])
}

async function downloadImages() {
  const startTime = process.hrtime.bigint()

  try {
    await ensureDirectories()

    const downloadPromises = commissionData.flatMap(characterData =>
      characterData.Commissions.flatMap(commission => {
        const { fileName } = commission

        const imageUrlWebp = `https://${HOSTING}/nsfw-commission/webp/${fileName}.webp`
        const filePathWebp = path.join(dlDestinationWebp, `${fileName}.webp`)

        const promises = [downloadResource(imageUrlWebp, filePathWebp)]

        if (NODE_ENV === 'development') {
          const imageUrlJpg = `https://${HOSTING}/nsfw-commission/${fileName}.jpg`
          const filePathJpg = path.join(dlDestinationJpg, `${fileName}.jpg`)
          promises.push(downloadResource(imageUrlJpg, filePathJpg))
        }

        return promises
      }),
    )

    await Promise.all(downloadPromises)

    const endTime = process.hrtime.bigint()
    const elapsedTime = (endTime - startTime) / BigInt(1000000)
    console.log(msgDone, `All downloads completed in ${elapsedTime}ms.`)
    process.exit(0)
  } catch (error: any) {
    console.error(msgError, `Error downloading images: ${error.message}`)
    process.exit(1)
  }
}

downloadImages()
