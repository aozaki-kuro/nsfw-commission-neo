/*
 * Notice: TypeScript version did this in a different approach:
 *
 * The array was written in TypeScript and imported here to be processed.
 * The script cannot be compiled into CommonJS because of this.
 * I don't know which is more sensible after all so I kept both versions.
 */

/*
 * Update:
 * After optimization the performance impact is minor now.
 * So the script was switched to TypeScript version.
 *
 */

import { commissionData } from '#data/commissionData'
import dotenv from 'dotenv'
import fs, { promises as fsPromises } from 'fs'
import https from 'https'
import path from 'path'

// Message definitions
const msgError = '\x1b[0m[\x1b[31m ERROR \x1b[0m]'
const msgDone = '\x1b[0m[\x1b[32m DONE \x1b[0m]'

const dlDestination = 'public/images'

dotenv.config()

const HOSTING = process.env.HOSTING
if (!HOSTING) {
  console.error(msgError, 'DL links not set correctly in the environment or .env')
  process.exit(1)
}

async function downloadResource(url: string, filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(filePath)
    https
      .get(url, response => {
        response.pipe(fileStream)
        fileStream.on('finish', () => {
          fileStream.close()
          resolve()
        })
      })
      .on('error', err => {
        fileStream.close()
        fsPromises.unlink(filePath).finally(() => {
          reject(err)
        })
      })
  })
}

async function downloadImages() {
  const startTime = process.hrtime.bigint()
  try {
    await fsPromises.mkdir(dlDestination, { recursive: true })

    const smallCoverUrl = `https://${HOSTING}/nsfw-commission/nsfw-cover-s.jpg`
    const smallCoverPath = path.join(dlDestination, 'nsfw-cover-s.jpg')
    const initialDownloads = [downloadResource(smallCoverUrl, smallCoverPath)]

    const downloadPromises = commissionData.flatMap(characterData =>
      characterData.Commissions.map(commission => {
        const { fileName } = commission
        const filePath = path.join(dlDestination, `${fileName}.jpg`)
        const imageUrl = `https://${HOSTING}/nsfw-commission/${fileName}.jpg`
        return downloadResource(imageUrl, filePath)
      }),
    )

    await Promise.all([...initialDownloads, ...downloadPromises])

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
