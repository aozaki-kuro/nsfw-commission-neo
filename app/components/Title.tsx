import { kebabCase } from '#components/utils'
import Link from 'next/link'

type TitleProps = {
  Content: string
}

const Title = ({ Content }: TitleProps) => {
  return (
    <div id={kebabCase(Content)} className="pb-2">
      <h2 className="group relative">
        {Content}
        <Link
          href={`#${kebabCase(Content)}`}
          className="ml-2 text-dec-light no-underline opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:text-dec-dark"
        >
          #
        </Link>
      </h2>
    </div>
  )
}

export default Title
