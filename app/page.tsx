import type { NextPage } from 'next'

import Warning from '#components/main/Warning'
import CommissionDescription from '#components/main/Description'
import Listing from '#components/commission/Listing'
import Footer from '#components/main/Footer'

import { characterDictionary } from '#data/commissionStatus'

const Home: NextPage = () => {
  // Segregate characters into active and stale
  const activeChars = characterDictionary.filter(chara => chara.Active)
  const staleChars = characterDictionary.filter(chara => !chara.Active)

  return (
    <main>
      <Warning />

      <CommissionDescription />

      {/* Display Active Commissions */}
      {activeChars.map(chara => (
        <Listing Character={chara.Abbr} key={chara.Abbr} />
      ))}

      {/* Divider between Active and Stale Commissions */}
      <div className="pt-4" />
      <hr />
      <div className="pb-8" />

      {/* Display Stale Commissions */}
      {staleChars.map(chara => (
        <Listing Character={chara.Abbr} isStale={true} key={chara.Abbr} />
      ))}

      <Footer />
    </main>
  )
}

export default Home
