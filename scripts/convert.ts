import * as fs from 'fs/promises'
import * as path from 'path'
import sharp from 'sharp'

// 设置输入和输出目录
const INPUT_DIR = path.join(process.cwd(), 'public/images')
const WEBP_OUTPUT_DIR = path.join(INPUT_DIR, 'webp')

// 日志控制
interface ProcessingStats {
  successCount: number
  skippedCount: number
  failedFiles: string[]
}

const stats: ProcessingStats = {
  successCount: 0,
  skippedCount: 0,
  failedFiles: [],
}

// 彩色消息定义
const MSG_ERROR = '\x1b[0m[\x1b[31m ERROR \x1b[0m]'
const MSG_DONE = '\x1b[0m[\x1b[32m DONE \x1b[0m]'
const MSG_WARN = '\x1b[0m[\x1b[33m WARN \x1b[0m]'

// 确保目录存在
async function ensureDirectoryExists(dirPath: string): Promise<void> {
  try {
    await fs.mkdir(dirPath, { recursive: true })
  } catch (error) {
    console.error(`${MSG_ERROR} Unable to create directory: ${dirPath}`)
    throw error
  }
}

// 处理图像文件
async function processImages(): Promise<void> {
  const startTime = Date.now()
  try {
    const files = await fs.readdir(INPUT_DIR)
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ext === '.jpg' || ext === '.png'
    })

    await Promise.all(imageFiles.map(file => processFile(file)))
    const endTime = Date.now()
    reportResults(endTime - startTime)
  } catch (error) {
    console.error(`${MSG_ERROR} Failed to read the image directory.`)
    console.error(error)
  }
}

// 处理单个文件
async function processFile(file: string): Promise<void> {
  const { name: baseName, ext } = path.parse(file)
  const extension = ext.toLowerCase()

  try {
    switch (extension) {
      case '.jpg':
        await handleJpgFile(baseName)
        break
      case '.png':
        await handlePngFile(baseName)
        break
      default:
        // 跳过非 JPG 和 PNG 文件
        break
    }
  } catch (error) {
    stats.failedFiles.push(file)
    console.error(`${MSG_ERROR} Failed to process file: ${file}`)
    console.error(error)
  }
}

// 处理 JPG 文件
async function handleJpgFile(baseName: string): Promise<void> {
  const jpgFilePath = path.join(INPUT_DIR, `${baseName}.jpg`)
  const pngFilePath = path.join(INPUT_DIR, `${baseName}.png`)
  const webpFilePath = path.join(WEBP_OUTPUT_DIR, `${baseName}.webp`)

  const pngExists = await fileExists(pngFilePath)

  if (!pngExists) {
    const upToDate = await isUpToDate(jpgFilePath, webpFilePath)
    if (!upToDate) {
      await convertImage(jpgFilePath, webpFilePath, 'webp', { quality: 80 })
      stats.successCount++
    } else {
      stats.skippedCount++
    }
  } else {
    stats.skippedCount++
  }
}

// 处理 PNG 文件
async function handlePngFile(baseName: string): Promise<void> {
  const pngFilePath = path.join(INPUT_DIR, `${baseName}.png`)
  const jpgFilePath = path.join(INPUT_DIR, `${baseName}.jpg`)

  const upToDate = await isUpToDate(pngFilePath, jpgFilePath)
  if (!upToDate) {
    await convertImage(pngFilePath, jpgFilePath, 'jpeg', {
      quality: 95,
      progressive: true,
      chromaSubsampling: '4:4:4',
      mozjpeg: true,
    })
    await fs.unlink(pngFilePath)
    stats.successCount++
  } else {
    stats.skippedCount++
  }
}

// 检查目标文件是否需要更新
async function isUpToDate(sourceFile: string, targetFile: string): Promise<boolean> {
  try {
    const [sourceStat, targetStat] = await Promise.all([fs.stat(sourceFile), fs.stat(targetFile)])
    return targetStat.mtime >= sourceStat.mtime
  } catch {
    // 如果目标文件不存在，需要生成
    return false
  }
}

// 通用的图像转换函数
async function convertImage(
  inputPath: string,
  outputPath: string,
  format: 'webp' | 'jpeg',
  options: sharp.WebpOptions | sharp.JpegOptions,
): Promise<void> {
  try {
    let image = sharp(inputPath)

    if (format === 'jpeg') {
      image = image[format](options).withMetadata()
    } else {
      image = image[format](options)
    }

    await image.toFile(outputPath)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `${MSG_ERROR} Failed to convert ${path.basename(inputPath)}: ${error.message}`,
      )
    } else {
      throw new Error(
        `${MSG_ERROR} Failed to convert ${path.basename(inputPath)}: ${String(error)}`,
      )
    }
  }
}

// 检查文件是否存在
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

// 输出处理结果
function reportResults(duration: number): void {
  const totalFiles = stats.successCount + stats.skippedCount + stats.failedFiles.length
  if (stats.failedFiles.length > 0) {
    console.warn(
      `${MSG_WARN} Processed ${totalFiles} files in ${duration} ms, but these files failed:`,
    )
    console.error(stats.failedFiles.join(', '))
  } else {
    console.log(`${MSG_DONE} Processed ${totalFiles} files in ${duration} ms`)
  }
}

// 主函数执行
async function main(): Promise<void> {
  try {
    await ensureDirectoryExists(WEBP_OUTPUT_DIR)
    await processImages()
  } catch (error) {
    console.error(`${MSG_ERROR} Script execution failed.`)
    console.error(error)
  }
}

main()
