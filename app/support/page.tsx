import type { NextPage } from 'next'
import Link from 'next/link'
import RootLayout from '../layout'

import CryptoAddress from './components/CryptoAddress'

const Support: NextPage = () => {
  return (
    <RootLayout>
      <h1 className="pb-6 md:pb-4">Support me!</h1>

      {/* ======= Text ======= */}

      <div>
        <p className="pb-6 md:pb-4">
          Please consider support me if you appreciated the works I commissioned!
        </p>
        <p className="pb-6 md:pb-4">
          Commissioning such high-quality artworks at this pace made the entire project quite
          time-consuming and extremely expensive. Currently I found myself spending around 20k - 40k
          JPY on these each month. Therefore, any financial assistance you can provide, even a few
          dollards, would be greatly appreciated.
        </p>
      </div>

      {/* ======= Crypto ======= */}
      <h2 className="pb-6 text-xl md:pb-4">Crypto Currencies</h2>

      <div className="">
        <CryptoAddress currencyName="USDT (TRC20)" address="TEHCVekfCn5FxLFayUHAVj6qGpQyRW6Usa" />
        <CryptoAddress
          currencyName="USDT (ERC20)"
          address="0xcca71d75cfc76d4b792666e600591577ebb71922"
        />
        <CryptoAddress currencyName="BTC" address="33PopHvEh47jkokX1EXv75TkUDjVFGmbWs" />

        <CryptoAddress currencyName="ETH" address="0xcca71d75cfc76d4b792666e600591577ebb71922" />

        <br />

        <CryptoAddress
          currencyName="Metamask"
          address="0x128e6E0BC4ad6d4979A6C94B860Bef4a851eF01e"
        />
      </div>

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

export default Support
