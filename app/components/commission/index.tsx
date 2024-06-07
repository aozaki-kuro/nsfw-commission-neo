import Listing from '#components/commission/Listing'
import { characterStatus } from '#data/commissionStatus'

const Commission = () => {
  const { active: activeChars, stale: staleChars } = characterStatus

  return (
    <>
      {/* Display Active Commissions */}
      {activeChars.map(chara => (
        <Listing Character={chara.DisplayName} key={chara.DisplayName} />
      ))}

      {/* Divider between Active and Stale Commissions */}
      <div className="pt-0" />
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
