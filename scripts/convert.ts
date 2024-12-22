import * as fs from 'fs/promises'
import * as path from 'path'
import sharp from 'sharp'

// 图片格式配置接口定义
interface JpegConfig {
  readonly quality: number
  readonly progressive: boolean
  readonly chromaSubsampling: string
  readonly mozjpeg: boolean
}

interface WebpConfig {
  readonly quality: number
}

// 核心配置
const CONFIG = {
  // 目录配置
  dirs: {
    input: path.join(process.cwd(), 'public/images'),
    webp: path.join(process.cwd(), 'public/images/webp'),
  },
  // 图片格式配置
  formats: {
    jpeg: {
      quality: 95,
      progressive: true,
      chromaSubsampling: '4:4:4',
      mozjpeg: true,
    } as JpegConfig,
    webp: {
      quality: 80,
    } as WebpConfig,
  },
  // 支持的文件扩展名
  supportedExtensions: new Set(['.jpg', '.png']),
} as const

// 日志样式定义
enum LogLevel {
  ERROR = '\x1b[0m[\x1b[31m ERROR \x1b[0m]',
  SUCCESS = '\x1b[0m[\x1b[32m DONE \x1b[0m]',
  WARN = '\x1b[0m[\x1b[33m WARN \x1b[0m]',
}

// 日志工具类
class Logger {
  static error(msg: string): void {
    console.error(`${LogLevel.ERROR} ${msg}`)
  }

  static success(msg: string): void {
    console.log(`${LogLevel.SUCCESS} ${msg}`)
  }

  static warn(msg: string): void {
    console.warn(`${LogLevel.WARN} ${msg}`)
  }
}

// 处理状态跟踪类
class ProcessingStats {
  private successCount = 0
  private skippedCount = 0
  private failedFiles: string[] = []
  private readonly startTime: number

  constructor() {
    this.startTime = Date.now()
  }

  // 记录处理成功
  addSuccess = (): void => {
    this.successCount++
  }
  // 记录跳过处理
  addSkipped = (): void => {
    this.skippedCount++
  }
  // 记录处理失败
  addFailed = (file: string): void => {
    this.failedFiles.push(file)
  }

  // 生成处理报告
  generateReport(): void {
    const duration = Date.now() - this.startTime
    const total = this.successCount + this.skippedCount + this.failedFiles.length

    if (this.failedFiles.length > 0) {
      Logger.warn(`Processed ${total} files (${duration}ms), but these files failed:`)
      Logger.error(this.failedFiles.join(', '))
    } else {
      Logger.success(`Successfully processed ${total} files (${duration}ms)`)
    }
  }
}

// 图像处理器类
class ImageProcessor {
  private readonly stats = new ProcessingStats()

  // 初始化处理环境
  async initialize(): Promise<void> {
    try {
      await fs.mkdir(CONFIG.dirs.webp, { recursive: true })
    } catch (error) {
      throw new Error(`Failed to create output directory: ${error}`)
    }
  }

  // 处理单个图像
  private async processImage(filename: string): Promise<void> {
    const { name: baseName, ext } = path.parse(filename)

    try {
      switch (ext.toLowerCase()) {
        case '.jpg':
          await this.handleJpg(baseName)
          break
        case '.png':
          await this.handlePng(baseName)
          break
      }
    } catch (error) {
      this.stats.addFailed(filename)
      Logger.error(`Failed to process file: ${filename} - ${error}`)
    }
  }

  // 处理 JPG 文件
  private async handleJpg(baseName: string): Promise<void> {
    const paths = this.getFilePaths(baseName)

    if (await this.fileExists(paths.png)) {
      this.stats.addSkipped()
      return
    }

    if (!(await this.needsUpdate(paths.jpg, paths.webp))) {
      this.stats.addSkipped()
      return
    }

    await this.convert(paths.jpg, paths.webp, 'webp')
    this.stats.addSuccess()
  }

  // 处理 PNG 文件
  private async handlePng(baseName: string): Promise<void> {
    const paths = this.getFilePaths(baseName)

    if (await this.needsUpdate(paths.png, paths.jpg)) {
      await this.convert(paths.png, paths.jpg, 'jpeg')
      await fs.unlink(paths.png)
      this.stats.addSuccess()
    } else {
      this.stats.addSkipped()
    }
  }

  // 获取文件路径
  private getFilePaths(baseName: string) {
    return {
      jpg: path.join(CONFIG.dirs.input, `${baseName}.jpg`),
      png: path.join(CONFIG.dirs.input, `${baseName}.png`),
      webp: path.join(CONFIG.dirs.webp, `${baseName}.webp`),
    }
  }

  // 检查文件是否需要更新
  private async needsUpdate(source: string, target: string): Promise<boolean> {
    try {
      const [sourceStat, targetStat] = await Promise.all([fs.stat(source), fs.stat(target)])
      return targetStat.mtime < sourceStat.mtime
    } catch {
      return true
    }
  }

  // 转换图像格式
  private async convert(input: string, output: string, format: 'jpeg' | 'webp'): Promise<void> {
    try {
      const image = sharp(input)
      if (format === 'jpeg') {
        await image[format](CONFIG.formats[format]).withMetadata().toFile(output)
      } else {
        await image[format](CONFIG.formats[format]).toFile(output)
      }
    } catch (error) {
      throw new Error(`Conversion failed ${path.basename(input)}: ${error}`)
    }
  }

  // 检查文件是否存在
  private async fileExists(path: string): Promise<boolean> {
    try {
      await fs.access(path)
      return true
    } catch {
      return false
    }
  }

  // 处理所有图像
  async processAll(): Promise<void> {
    try {
      const files = await fs.readdir(CONFIG.dirs.input)
      const imageFiles = files.filter(file =>
        CONFIG.supportedExtensions.has(path.extname(file).toLowerCase()),
      )

      await Promise.all(imageFiles.map(file => this.processImage(file)))
      this.stats.generateReport()
    } catch (error) {
      Logger.error(`Failed to read image directory: ${error}`)
    }
  }
}

// 主函数
async function main(): Promise<void> {
  try {
    const processor = new ImageProcessor()
    await processor.initialize()
    await processor.processAll()
  } catch (error) {
    Logger.error(`Script execution failed: ${error}`)
  }
}

main()
