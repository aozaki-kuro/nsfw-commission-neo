import * as fs from 'fs/promises'
import * as path from 'path'
import sharp from 'sharp'

// 设置输入和输出目录
const inputDir = path.join(process.cwd(), 'public/images')
const webpOutputDir = path.join(inputDir, 'webp')

// 日志控制
const failedFiles: string[] = []
let successCount = 0
let skippedCount = 0 // 新增跳过计数

// 彩色消息定义
const msgError = '\x1b[0m[\x1b[31m ERROR \x1b[0m]'
const msgDone = '\x1b[0m[\x1b[32m DONE \x1b[0m]'
const msgWarn = '\x1b[0m[\x1b[33m WARN \x1b[0m]'

// 确保输出目录存在
async function ensureOutputDirExists() {
  try {
    await fs.mkdir(webpOutputDir, { recursive: true })
  } catch {
    console.error(`${msgError} Unable to create output directory.`)
  }
}

// 处理图像文件
async function processImages() {
  const startTime = Date.now() // 开始计时
  try {
    const files = await fs.readdir(inputDir)

    // 并发处理所有文件
    await Promise.all(files.map(file => processFile(file)))
    const endTime = Date.now() // 结束计时
    reportResults(endTime - startTime) // 传递总处理时间
  } catch {
    console.error(`${msgError} Failed to read the image directory.`)
  }
}

// 处理单个文件
async function processFile(file: string) {
  const ext = path.extname(file).toLowerCase()
  const baseName = path.basename(file, ext)
  const pngFilePath = path.join(inputDir, `${baseName}.png`)
  const jpgFilePath = path.join(inputDir, `${baseName}.jpg`)
  const webpFilePath = path.join(webpOutputDir, `${baseName}.webp`)

  try {
    if (ext === '.jpg') {
      // 如果没有 PNG 文件，处理 JPG 转换为 WebP
      const pngExists = await fileExists(pngFilePath)
      if (!pngExists && !(await isUpToDate(jpgFilePath, webpFilePath))) {
        await convertImage(jpgFilePath, webpFilePath, 'webp', { quality: 80 })
      } else {
        skippedCount++
      }
    }

    if (ext === '.png') {
      // 转换 PNG 为 JPG
      const jpgOutputFilePath = path.join(inputDir, `${baseName}.jpg`)
      if (!(await isUpToDate(pngFilePath, jpgOutputFilePath))) {
        await convertImage(pngFilePath, jpgOutputFilePath, 'jpeg', {
          quality: 95,
          progressive: true,
          chromaSubsampling: '4:4:4',
          mozjpeg: true,
        })
        // 删除成功转换后的 PNG 文件
        await fs.unlink(pngFilePath)
      } else {
        skippedCount++
      }
    }
  } catch {
    failedFiles.push(file)
  }
}

// 检查目标文件是否需要更新
async function isUpToDate(sourceFile: string, targetFile: string): Promise<boolean> {
  try {
    const sourceStat = await fs.stat(sourceFile)
    const targetStat = await fs.stat(targetFile)

    // 如果目标文件存在且没有过期（即目标文件的修改时间比源文件新），跳过生成
    if (targetStat.mtime >= sourceStat.mtime) {
      return true
    }
  } catch {
    // 如果目标文件不存在，会抛出错误，因此需要生成
    return false
  }
  return false
}

// 通用的图像转换函数
async function convertImage(
  inputPath: string,
  outputPath: string,
  format: 'webp' | 'jpeg',
  options: sharp.WebpOptions | sharp.JpegOptions,
) {
  try {
    const image = sharp(inputPath)[format](options)
    if (format === 'jpeg') {
      image.withIccProfile('sRGB') // 仅为 JPEG 保留 ICC 配置文件
    }
    await image.toFile(outputPath)
    successCount++ // 成功计数
  } catch {
    throw new Error(`${msgError} Failed to convert ${path.basename(inputPath)}`)
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
function reportResults(duration: number) {
  const totalFiles = successCount + skippedCount
  if (failedFiles.length > 0) {
    console.warn(
      `${msgWarn} Convert ${totalFiles} files in ${duration} ms, but these files failed:`,
    )
    console.error(failedFiles.join(', '))
  } else {
    console.log(`${msgDone} Convert ${totalFiles} files in ${duration} ms`)
  }
}

// 主函数执行
async function main() {
  await ensureOutputDirExists()
  await processImages()
}

main().catch(() => {
  console.error(`${msgError} Script execution failed.`)
})
