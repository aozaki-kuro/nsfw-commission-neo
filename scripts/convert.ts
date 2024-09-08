import * as fs from 'fs/promises'
import * as path from 'path'
import sharp from 'sharp'

// 设置输入和输出目录
const inputDir = path.join(process.cwd(), 'public/images')
const webpOutputDir = path.join(inputDir, 'webp')

// 日志控制
const failedFiles: string[] = []
let successCount = 0

// 确保输出目录存在
async function ensureOutputDirExists() {
  try {
    await fs.mkdir(webpOutputDir, { recursive: true })
  } catch {
    console.error('无法创建输出目录')
  }
}

// 处理图像文件
async function processImages() {
  try {
    const files = await fs.readdir(inputDir)

    // 并发处理所有文件
    await Promise.all(files.map(file => processFile(file)))
    reportResults()
  } catch {
    console.error('读取图像目录时出错')
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
      // 如果没有 PNG 文件，转换 JPG 为 WebP
      const pngExists = await fileExists(pngFilePath)
      if (!pngExists) {
        await convertImage(jpgFilePath, webpFilePath, 'webp', { quality: 80 })
      }
    }

    if (ext === '.png') {
      // 转换 PNG 为 JPG
      const jpgOutputFilePath = path.join(inputDir, `${baseName}.jpg`)
      await convertImage(pngFilePath, jpgOutputFilePath, 'jpeg', {
        quality: 95,
        progressive: true,
        chromaSubsampling: '4:4:4',
        mozjpeg: true,
      })
    }
  } catch {
    failedFiles.push(file)
  }
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
    throw new Error(`${path.basename(inputPath)} 转换失败`)
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
function reportResults() {
  console.log(`处理成功的文件数量: ${successCount}`)
  if (failedFiles.length > 0) {
    console.error(`处理失败的文件: ${failedFiles.join(', ')}`)
  } else {
    console.log('所有文件都成功处理')
  }
}

// 主函数执行
async function main() {
  await ensureOutputDirExists()
  await processImages()
}

main().catch(() => {
  console.error('脚本执行过程中出现错误')
})
