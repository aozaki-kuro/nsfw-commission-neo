import type { NextPage } from 'next'
import Link from 'next/link'
import RootLayout from '../layout'

const Home: NextPage = () => {
  return (
    <RootLayout>
      <h1 className="pb-6 md:pb-4">Support me!</h1>

      {/* ======= Text ======= */}
      <p className="pb-6 md:pb-4">
        Please consider support me if you appreciated the works I commissioned!
      </p>
      <p className="pb-6 md:pb-4">
        Commissioning such high-quality artworks at this pace made the entire project quite
        time-consuming and extremely expensive. Currently I found myself spending around 20k - 40k
        JPY on these each month. Therefore, any financial assistance you can provide, even a few
        dollards, would be greatly appreciated.
      </p>

      {/* ======= Link ======= */}
      <li className="pb-6 md:pb-4">
        USDT-TRC20:{' '}
        <span className="font-mono">TEHCVekfCn5FxLFayUHAVj6qGpQyRW6Usa</span>
      </li>

      {/*
       * Disabled due to Ko-Fi not being able to donate anonymously
       */}

      <li className="pb-6 md:pb-4">Ko-Fi (WIP)</li>

      <li className="pb-6 md:pb-4">Patreon (WIP)</li>

      <p className="pb-6 md:pb-4">Thank you!</p>

      <p className="pb-6 md:pb-4">Please remember to follow and support the illustrators!</p>

      <Link href="/" className="pb-6 md:pb-4">
        Back to Home
      </Link>
    </RootLayout>
  )
}

export default Home
