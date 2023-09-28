import type { NextPage } from 'next'

import Warning from '#components/warning'

import CustomHead from '#components/main/head'

import CommissionDescription from '#components/main/description'

import Commission from '#components/commission/listing'
import Stale from '#components/commission/stale'

import Footer from '#components/main/footer'

const Home: NextPage = () => {
  return (
    <>
      <CustomHead />

      <Warning />

      <div className="max-w-[40rem] pb-[128px] pt-20 ss:pt-7 ss:text-sm">
        <CommissionDescription />

        {/* Active Commissions */}
        <div>
          <Commission Character="azki" />
          <Commission Character="nayuta" />
          <Commission Character="kamitsubaki" />
          <Commission Character="lucia" />
          <Commission Character="misc" />
        </div>

        <div className="pt-4" />
        <hr />
        <div className="pb-8" />

        {/* Stale Commissions */}
        <div>
          <Stale Character="ina" />
          <Stale Character="nishe" />
          <Stale Character="tkmt" />
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Home
