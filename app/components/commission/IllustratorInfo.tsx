import Link from 'next/link'
import { formatDate, kebabCase } from '#components/utils'

type CommissionType = {
  FullName: string
  PublishDate: string
  Creator: string
  Twitter?: string
  Pixiv?: string
  Fantia?: string
  Skeb?: string
}

type IllustratorInfoProps = {
  commission: CommissionType
}

const IllustratorInfo: React.FC<IllustratorInfoProps> = ({ commission }) => {
  const createLink = (url: string, text: string) => {
    return url ? (
      <>
        <span className="pr-3 md:pr-2" />
        <Link href={url} className="underline-offset-[0.1rem]" target="_blank">
          {text}
        </Link>
      </>
    ) : null
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
        <span className="pr-3 md:pr-2" />
        {!(commission.Twitter || commission.Pixiv || commission.Fantia || commission.Skeb) ? (
          <span>N/A</span>
        ) : (
          <>
            {createLink(commission.Twitter || '', 'Twitter')}
            {createLink(commission.Pixiv || '', 'Pixiv')}
            {createLink(commission.Fantia || '', 'Fantia')}
            {createLink(commission.Skeb || '', 'Skeb')}
          </>
        )}
      </span>
    </div>
  )
}

export default IllustratorInfo
