import Link from 'next/link'

import Update from '#components/main/Update'

const CommissionDescription = () => {
  return (
    <div>
      <h1 className="">NSFW Commissions</h1>
      <h2 className="py-6 md:py-4">Introduction</h2>
      <p>
        Preview images are showcased together with their respective links to platforms such as
        Twitter, Pixiv, or Fantia when they are available. By selecting these links, you will be
        able to view the complete image. You can also subscribe for updates through{' '}
        <Link href={`/feed.xml`}>RSS</Link>.
      </p>
      <p className="pt-6 md:pt-4">
        If you enjoy the illustrations, please consider following and supporting the illustrators.
      </p>
      <p className="pt-6 md:pt-4">
        For illustrators or readers who are interested in reaching out, feel free to contact me
        through <Link href="https://odaibako.net/u/CrystallizeSub">odaibako</Link> or send me an{' '}
        <Link href="mailto:skeb@crystallize.eu.org">email</Link>.
      </p>
      <Update />
    </div>
  )
}

export default CommissionDescription
