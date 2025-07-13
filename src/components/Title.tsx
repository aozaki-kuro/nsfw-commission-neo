import { kebabCase } from '#components/utils'

type TitleProps = {
  Content: string
}

const Title = ({ Content }: TitleProps) => {
  return (
    <div id={`title-` + kebabCase(Content)} className="mb-2 pt-4">
      <h2 className="group relative">
        {Content}
        <a
          href={`#${kebabCase(Content)}`}
          className="text-dec-light dark:text-dec-dark ml-2 font-bold no-underline opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        >
          #
        </a>
      </h2>
    </div>
  )
}

export default Title
