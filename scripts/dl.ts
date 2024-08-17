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

// 创建目录的函数，增加灵活性
async function ensureDirectory(dir: string): Promise<void> {
  try {
    await fsPromises.mkdir(dir, { recursive: true })
  } catch (error) {
    console.error(msgError, `Failed to create directory ${dir}: ${error.message}`)
    throw error
  }
}

// 封装下载资源的逻辑，适应多种类型的文件下载
async function downloadResource(url: string, filePath: string): Promise<void> {
  const response = await new Promise<IncomingMessage>((resolve, reject) => {
    https.get(url, resolve).on('error', reject)
  })

  if (response.statusCode !== 200) {
    throw new Error(`Failed to download '${url}' (Status: ${response.statusCode})`)
  }

  try {
    await streamPipeline(response, fs.createWriteStream(filePath))
  } catch (error) {
    if (error instanceof Error) {
      console.error(msgError, `Failed to write file ${filePath}: ${error.message}`)
    } else {
      console.error(msgError, `Unknown error occurred while writing file ${filePath}.`)
    }
    throw error // 继续抛出以便调用者可以捕获
  }
}

// 准备下载任务并执行
async function prepareDownloadTasks(): Promise<void> {
  try {
    await ensureDirectory(dlDestinationWebp)

    if (NODE_ENV === 'development') {
      await ensureDirectory(dlDestinationJpg)
    }

    const downloadPromises = commissionData.flatMap(characterData =>
      characterData.Commissions.flatMap(commission => createDownloadTasks(commission)),
    )

    await Promise.all(downloadPromises)
  } catch (error) {
    console.error(msgError, `Error during preparation or download: ${error.message}`)
    throw error
  }
}

// 创建下载任务的函数，减少重复代码
function createDownloadTasks(commission: { fileName: string }): Promise<void>[] {
  const { fileName } = commission
  const webpTask = downloadResource(
    `https://${HOSTING}/nsfw-commission/webp/${fileName}.webp`,
    path.join(dlDestinationWebp, `${fileName}.webp`),
  )

  const tasks = [webpTask]

  if (NODE_ENV === 'development') {
    const jpgTask = downloadResource(
      `https://${HOSTING}/nsfw-commission/${fileName}.jpg`,
      path.join(dlDestinationJpg, `${fileName}.jpg`),
    )
    tasks.push(jpgTask)
  }

  return tasks
}

// 主下载流程
async function downloadImages(): Promise<void> {
  const startTime = process.hrtime.bigint()

  try {
    await prepareDownloadTasks()

    const endTime = process.hrtime.bigint()
    const elapsedTime = (endTime - startTime) / BigInt(1000000) // 转换为毫秒
    console.log(msgDone, `All downloads completed in ${elapsedTime}ms.`)
    process.exit(0)
  } catch (error) {
    if (error instanceof Error) {
      console.error(msgError, `Download process failed: ${error.message}`)
    } else {
      console.error(msgError, `Unknown error occurred during download.`)
    }
    process.exit(1)
  }
}

downloadImages()
