import { kebabCase } from '#components/utils'
import Link from 'next/link'

type CharacterTitleProps = {
  Name: string
}

const CharacterTitle = ({ Name }: CharacterTitleProps) => {
  return (
    <div id={kebabCase(Name)}>
      <h2 className="group relative pb-2 pt-4">
        {Name}
        <Link
          href={`#${kebabCase(Name)}`}
          className="ml-2 text-dec-light no-underline opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:text-dec-dark"
        >
          #
        </Link>
      </h2>
    </div>
  )
}

export default CharacterTitle
