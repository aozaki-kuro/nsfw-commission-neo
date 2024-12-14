import type { NextPage } from 'next'
import RootLayout from './layout'

import Warning from '#components/main/Warning'

import CommissionDescription from '#components/main/Description'

import Commission from '#components/commission'

import Footer from '#components/main/Footer'

const Home: NextPage = () => {
  return (
    <RootLayout>
      <Warning />

      <CommissionDescription />

      <Commission />

      <Footer />
    </RootLayout>
  )
}

export default Home
