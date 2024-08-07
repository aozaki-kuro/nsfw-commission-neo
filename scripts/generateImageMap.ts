import { commissionData } from '#data/commissionData' // 根据实际路径调整
import * as fs from 'fs'
import * as path from 'path'
import sharp from 'sharp'

// 生成 blurDataURL
const generateBlurDataURL = async (filePath: string) => {
  const image = await sharp(filePath)
    .resize(10) // 将图像缩小到 10px
    .toBuffer()
  return `data:image/jpeg;base64,${image.toString('base64')}`
}

// 生成映射表内容
const generateImageMap = async (data: any) => {
  const imageMap: { [key: string]: { src: string; blurDataURL: string } } = {}

  for (const characterData of data) {
    for (const commission of characterData.Commissions) {
      const key = commission.fileName
      const filePath = path.resolve(__dirname, `../public/images/${key}.jpg`)

      if (fs.existsSync(filePath)) {
        const blurDataURL = await generateBlurDataURL(filePath)
        imageMap[key] = {
          src: `/images/${key}.jpg`,
          blurDataURL,
        }
      } else {
        console.warn(`文件 ${filePath} 不存在`)
      }
    }
  }

  return imageMap
}

// 主函数
const main = async () => {
  const imageMap = await generateImageMap(commissionData)

  // 生成 TypeScript 文件内容
  const imageMapContent = `
const imageMap: { [key: string]: { src: string, blurDataURL: string } } = ${JSON.stringify(imageMap, null, 2)};

export default imageMap;
`

  // 写入 imageMap.ts 文件
  const outputPath = path.resolve(__dirname, '../data/imageMap.ts')
  fs.writeFileSync(outputPath, imageMapContent)

  console.log('imageMap.ts 文件已生成')
}

main().catch(console.error)
