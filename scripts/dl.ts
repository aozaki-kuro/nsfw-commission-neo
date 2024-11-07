import { commissionData } from '#data/commissionData'
import dotenv from 'dotenv'
import fs, { promises as fsPromises } from 'fs'
import { IncomingMessage } from 'http'
import https from 'https'
import path from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'

// 日志消息定义
const MSG_ERROR = '\x1b[0m[\x1b[31m ERROR \x1b[0m]'
const MSG_DONE = '\x1b[0m[\x1b[32m DONE \x1b[0m]'

dotenv.config()

const HOSTING = process.env.HOSTING || 'aozaki:Z1hvfxhF96wGUeZkeDh@file1.aozaki.cc'
const NODE_ENV = process.env.NODE_ENV || 'production'

if (!HOSTING) {
  console.error(`${MSG_ERROR} DL links not set correctly in the environment or .env`)
  process.exit(1)
}

const DL_DESTINATION_WEBP = path.join('public', 'images', 'webp')
const DL_DESTINATION_JPG = path.join('public', 'images')
const streamPipeline = promisify(pipeline)

// 封装错误日志打印
function logError(message: string, error?: Error) {
  console.error(`${MSG_ERROR} ${message}${error ? `: ${error.message}` : ''}`)
}

// 创建目录
async function ensureDirectory(dir: string): Promise<void> {
  try {
    await fsPromises.mkdir(dir, { recursive: true })
  } catch (error) {
    logError(`Failed to create directory ${dir}`, error as Error)
    throw error
  }
}

// 下载资源
async function downloadResource(url: string, filePath: string): Promise<void> {
  try {
    const response = await new Promise<IncomingMessage>((resolve, reject) => {
      https.get(url, resolve).on('error', reject)
    })

    if (response.statusCode !== 200) {
      throw new Error(`Failed to download '${url}' (Status: ${response.statusCode})`)
    }

    await streamPipeline(response, fs.createWriteStream(filePath))
  } catch (error) {
    logError(`Failed to download or write file ${filePath}`, error as Error)
    throw error
  }
}

// 创建下载任务
function createDownloadTasks(commission: { fileName: string }): Promise<void>[] {
  const { fileName } = commission
  const tasks: Promise<void>[] = []

  const webpUrl = `https://${HOSTING}/nsfw-commission/webp/${fileName}.webp`
  const webpPath = path.join(DL_DESTINATION_WEBP, `${fileName}.webp`)
  tasks.push(downloadResource(webpUrl, webpPath))

  if (NODE_ENV === 'development') {
    const jpgUrl = `https://${HOSTING}/nsfw-commission/${fileName}.jpg`
    const jpgPath = path.join(DL_DESTINATION_JPG, `${fileName}.jpg`)
    tasks.push(downloadResource(jpgUrl, jpgPath))
  }

  return tasks
}

// 准备并执行下载任务
async function prepareAndExecuteDownloads(): Promise<void> {
  try {
    await ensureDirectory(DL_DESTINATION_WEBP)
    if (NODE_ENV === 'development') {
      await ensureDirectory(DL_DESTINATION_JPG)
    }

    const downloadPromises = commissionData.flatMap(characterData =>
      characterData.Commissions.flatMap(commission => createDownloadTasks(commission)),
    )

    await Promise.all(downloadPromises)
  } catch (error) {
    logError('Error during preparation or download', error as Error)
    throw error
  }
}

// 主下载流程
async function downloadImages(): Promise<void> {
  const startTime = Date.now()

  try {
    await prepareAndExecuteDownloads()

    const elapsedTime = Date.now() - startTime
    console.log(`${MSG_DONE} All downloads completed in ${elapsedTime}ms.`)
    process.exit(0)
  } catch (error) {
    logError('Download process failed', error as Error)
    process.exit(1)
  }
}

downloadImages()
