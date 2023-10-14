import Link from 'next/link'
import { CommissionInfoProps } from './types'
import { kebabCase, formatDate } from '#components/utils'

type IllustratorInfoProps = {
  commission: CommissionInfoProps
}

const IllustratorInfo = ({ commission }: IllustratorInfoProps) => {
  // Function to determine link type and generate JSX
  const createLinks = (links: string[]) => {
    return links.map((url, index) => {
      let type
      if (url.includes('twitter.com') || url.includes('x.com')) type = 'Twitter'
      else if (url.includes('pixiv.net')) type = 'Pixiv'
      else if (url.includes('fanbox.cc')) type = 'Fanbox'
      else if (url.includes('fantia.jp')) type = 'Fantia'
      else return null

      return (
        <span key={index}>
          <span className="pr-3 md:pr-2" />
          <Link href={url} className="underline-offset-[0.1rem]" target="_blank">
            {type}
          </Link>
        </span>
      )
    })
  }

  return (
    <div className="flex flex-auto pb-4 pt-8 font-mono text-sm md:pb-1 md:pt-5 md:text-xs">
      <Link
        href={`#${kebabCase(commission.FullName)}-${commission.PublishDate}`}
        className="text-p-light no-underline dark:text-gray-300"
      >
        {formatDate(commission.PublishDate)}
      </Link>
      <span className="pr-16 md:pr-6" />
      <span>{commission.Creator || '-'}</span>
      <span className="grow text-right">
        {commission.Links.length === 0 ? <span>N/A</span> : createLinks(commission.Links)}
      </span>
    </div>
  )
}

export default IllustratorInfo
