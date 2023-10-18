import Link from 'next/link'

import Update from '#components/main/Update'
import Title from '#components/Title'

const CommissionDescription = () => {
  return (
    <div>
      <h1>NSFW Commissions</h1>
      <div className="py-6 md:py-4">
        <Title Content="Introduction" />
      </div>

      <p>
        Preview images are displayed alongside their corresponding links to platforms like Twitter,
        Pixiv, or Fantia when available. By clicking on these links, you can view the full image.
        You can also subscribe for updates through <Link href={`/feed.xml`}>RSS</Link>.
      </p>
      <p className="pt-6 md:pt-4">
        I am not an illustrator but someone who frequently commissions artworks. If you appreciate
        the illustrations, please consider following and supporting the illustrators.
      </p>
      <p className="pt-6 md:pt-4">
        If any illustrators or readers wish to get in touch, don&apos;t hesitate to reach out
        through <Link href="https://odaibako.net/u/CrystallizeSub">odaibako</Link> or by sending me
        an <Link href="mailto:skeb@crystallize.eu.org">email</Link>.
      </p>
      <Update />
    </div>
  )
}

export default CommissionDescription
