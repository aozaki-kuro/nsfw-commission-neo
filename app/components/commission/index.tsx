// CharacterListings.tsx
import Listing from '#components/commission/Listing'
import { characterDictionary } from '#data/commissionStatus'

const Commission = () => {
  const activeChars = characterDictionary.filter(chara => chara.Active)
  const staleChars = characterDictionary.filter(chara => !chara.Active)

  return (
    <>
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
    </>
  )
}

export default Commission
