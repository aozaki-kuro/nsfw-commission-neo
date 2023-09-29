import Link from 'next/link'
import { CommissionInfoProps } from './types'
import formatDate from '#components/lib/dateFormat'
import kebabCase from '#components/lib/kebabCase'

const IllustratorInfo = ({
  PublishDate,
  Creator,
  Twitter,
  Skeb,
  Pixiv,
  Fantia,
  FullName,
}: CommissionInfoProps) => {
  // Create a reusable function to generate links with proper styling
  const createLink = (url: string, text: string) => {
    return url ? (
      <>
        <span className="pr-3 ss:pr-2" />
        <Link href={url} className="underline-offset-[0.1rem]" target="_blank">
          {text}
        </Link>
      </>
    ) : null
  }

  // Check if the input is null or empty
  const isAllLinksEmpty = !Twitter && !Skeb && !Pixiv && !Fantia

  // Render illustrator information
  return (
    <div className="flex flex-auto pb-4 pt-8 font-mono text-sm ss:pb-1 ss:pt-5 ss:text-xs">
      <Link
        href={`#${kebabCase(FullName)}-${PublishDate}`}
        className="text-p-light no-underline dark:text-gray-300"
      >
        {formatDate(PublishDate)}
      </Link>
      <span className="pr-16 ss:pr-6" />
      <span className="">{Creator || '-'}</span>
      <span className="grow text-right">
        <span className="pr-3 ss:pr-2" />
        {isAllLinksEmpty ? (
          <span className="">N/A</span>
        ) : (
          <>
            {createLink(Twitter ? Twitter : '', 'Twitter')}
            {createLink(Pixiv ? Pixiv : '', 'Pixiv')}
            {createLink(Fantia ? Fantia : '', 'Fantia')}
            {createLink(Skeb ? Skeb : '', 'Skeb')}
          </>
        )}
      </span>
    </div>
  )
}

export default IllustratorInfo
