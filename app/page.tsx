import type { NextPage } from 'next'
import RootLayout from './layout'

import Commission from '#components/commission'
import CommissionDescription from '#components/main/Description'
import Footer from '#components/main/Footer'
import ScrollToTop from '#components/main/ScrollToTop'
import Warning from '#components/main/Warning'

const Home: NextPage = () => {
  return (
    <RootLayout>
      <Warning />
      <div className="mx-auto">
        <div className="relative flex justify-center">
          <div id="Main Contents" className="w-full max-w-[40rem]">
            <CommissionDescription />
            <Commission />
            <Footer />
          </div>
        </div>
      </div>
      <ScrollToTop />
    </RootLayout>
  )
}

export default Home
