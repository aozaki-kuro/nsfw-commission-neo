import Warning from '#components/warning'
import Update from '#components/commission/update'
import Commission from '#components/commission/listing'
import Stale from '#components/commission/stale'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="">
      <Warning />
      <div className="max-w-[40rem] pb-[128px] pt-20 ss:pt-7 ss:text-sm">
        {/* Introduction */}
        <div>
          <h1 className="">NSFW Commissions</h1>
          <h2 className="py-6 ss:py-4">Introduction</h2>
          <p>
            Preview images are displayed along with corresponding links to platforms like Twitter,
            Pixiv, and Skeb when available. By clicking these links, you can view the full image.
            You also have the option to subscribe for updates via{' '}
            <Link href={`/feed.xml`}>RSS</Link>
          </p>
          <p className="pt-6">
            If you enjoy the illustrations, please consider following and supporting the
            illustrators.
          </p>
          <p className="pt-6">
            For illustrators who are interested in reaching out, feel free to contact me through{' '}
            <Link href="https://skeb.jp/@Crystallize">skeb</Link>,{' '}
            <Link href="https://odaibako.net/u/CrystallizeSub">odaibako</Link>, or{' '}
            <Link href="mailto:skeb@crystallize.eu.org">email</Link>
          </p>
          <Update />
        </div>

        {/* Active Commissions */}
        <div>
          <Commission Character="azki" />
          <Commission Character="nayuta" />
          <Commission Character="kamitsubaki" />
          <Commission Character="lucia" />
          <Commission Character="misc" />
        </div>

        {/* Stale Commissions */}
        <div className="pt-4" />
        <hr />
        <div className="pb-8" />
        <div>
          <Stale Character="ina" />
          <Stale Character="nishe" />
          <Stale Character="tkmt" />
        </div>

        {/* End descriptions */}
        <div className="pt-4" />
        <hr />
        <div className="pb-8" />
        <div className="pb-10 text-center text-xs">
          <p className="pt-2">
            規約による、Skeb でやり取りされた作品のすべての権利はクリエイターと版権元に帰属する。
          </p>
          <p className="pt-2">
            The copyright of all art works commissioned on Skeb belongs to the artist and the proper
            copyright holders.
          </p>
          <p className="pt-2">Some character names are obscured due to rule requirements.</p>
          <p className="pt-2">This site has restricted search engines from indexing.</p>
        </div>

        {/* Footer */}
        <div className="">
          <small className="block pt-20 text-p-light dark:text-gray-300">
            <time>2020 - {new Date().getFullYear()}</time> ©{' '}
            <Link
              href="https://twitter.com/CrystallizeSub"
              className="decoration-inherit decoration-dotted dark:text-gray-300"
            >
              Crystallize
            </Link>
            <div className="float-right">
              <Link
                href="mailto:dmca@crystallize.eu.org"
                className="decoration-inherit decoration-dotted dark:text-gray-300"
              >
                DMCA
              </Link>
            </div>
          </small>
        </div>
      </div>
    </main>
  )
}
