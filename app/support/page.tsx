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

      {/* ======= Crypto ======= */}
      <h2 className="pb-6 text-xl md:pb-4">Crypto Currencies</h2>

      <li className="">
        <b>USDT (TRC20)</b>
        {' - '}
        <span className="font-mono">TEHCVekfCn5FxLFayUHAVj6qGpQyRW6Usa</span>
      </li>

      <li className="">
        <b>USDT (ERC20)</b>
        {' - '}
        <span className="font-mono">0xcca71d75cfc76d4b792666e600591577ebb71922</span>
      </li>

      <li className="">
        <b>BTC</b>
        {' - '}
        <span className="font-mono">33PopHvEh47jkokX1EXv75TkUDjVFGmbWs</span>
      </li>

      <li className="">
        <b>ETH</b>
        {' - '}
        <span className="font-mono">0xcca71d75cfc76d4b792666e600591577ebb71922</span>
      </li>

      <br />

      <li className="pb-6 md:pb-4">
        <b>Metamask</b>
        {' - '}
        <span className="font-mono">0x128e6E0BC4ad6d4979A6C94B860Bef4a851eF01e</span>
      </li>

      {/* ======= Patreon Sites ======= 

      <h2 className="pb-6 text-xl md:pb-4">Other sites</h2>

      <li className="pb-6 md:pb-4">Ko-Fi (WIP)</li>

      <li className="pb-6 md:pb-4">Patreon (WIP)</li>
      
      */}

      {/* ======= Footer ======= */}

      <div className="pt-4" />
      <hr />
      <div className="pb-6" />

      <p className="pb-6 pt-4 md:pb-4">Thank you!</p>

      <p className="pb-6 md:pb-4">Please remember to follow and support the illustrators!</p>

      <div className="pb-6" />

      <Link href="/" className="pb-6 md:pb-4">
        Back to Home
      </Link>
    </RootLayout>
  )
}

export default Home
