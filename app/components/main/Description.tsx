import Link from 'next/link'

import Update from '#components/main/Update'

const CommissionDescription = () => {
  return (
    <div>
      <h1 className="">NSFW Commissions</h1>
      <h2 className="py-6 md:py-4">Introduction</h2>
      <p>
        Preview images are displayed along with corresponding links to platforms like Twitter,
        Pixiv, and Skeb when available. By clicking these links, you can view the full image. You
        also have the option to subscribe for updates via <Link href={`/feed.xml`}>RSS</Link>.
      </p>
      <p className="pt-6 md:pt-4">
        If you enjoy the illustrations, please consider following and supporting the illustrators.
      </p>
      <p className="pt-6 md:pt-4">
        For illustrators who are interested in reaching out, feel free to contact me through{' '}
        <Link href="https://odaibako.net/u/CrystallizeSub">odaibako</Link> or{' '}
        <Link href="mailto:skeb@crystallize.eu.org">email</Link>.
      </p>
      <Update />
    </div>
  )
}

export default CommissionDescription
