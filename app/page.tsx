import type { NextPage } from 'next'
import RootLayout from './layout'

// Main content
import Commission from '#components/commission'
import CommissionDescription from '#components/main/Description'
import Footer from '#components/main/Footer'

// Sidebar
import CharacterList from '#components/main/CharacterList'

// Other components
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
          <CharacterList />
        </div>
      </div>
      <ScrollToTop />
    </RootLayout>
  )
}

export default Home
