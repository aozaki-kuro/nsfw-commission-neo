import { kebabCase } from '#components/utils'
import Link from 'next/link'

type TitleProps = {
  Content: string
}

const Title = ({ Content }: TitleProps) => {
  return (
    <div id={`title-` + kebabCase(Content)} className="mb-2 pt-4">
      <h2 className="group relative">
        {Content}
        <Link
          href={`#${kebabCase(Content)}`}
          className="text-dec-light dark:text-dec-dark ml-2 font-bold no-underline opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        >
          #
        </Link>
      </h2>
    </div>
  )
}

export default Title
