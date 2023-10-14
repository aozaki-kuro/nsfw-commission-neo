import type { NextPage } from 'next'

import Warning from '#components/main/Warning'

import CommissionDescription from '#components/main/Description'
import Footer from '#components/main/Footer'

import Listing from '#components/commission/Listing'

import { characterDictionary } from '#data/commissionStatus'
import RootLayout from './layout'

const Home: NextPage = () => {
  // Segregate characters into active and stale
  const activeChars = characterDictionary.filter(chara => chara.Active)
  const staleChars = characterDictionary.filter(chara => !chara.Active)

  return (
    <RootLayout>
      <Warning />

      <CommissionDescription />

      {/* Display Active Commissions */}
      {activeChars.map(chara => (
        <Listing Character={chara.DisplayName} key={chara.DisplayName} />
      ))}

      {/* Divider between Active and Stale Commissions */}
      <div className="pt-4" />
      <hr />
      <div className="pb-8" />

      {/* Display Stale Commissions */}
      {staleChars.map(chara => (
        <Listing Character={chara.DisplayName} isStale={true} key={chara.DisplayName} />
      ))}

      <Footer />
    </RootLayout>
  )
}

export default Home
