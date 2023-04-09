import { Navbar, Footer, Hero, Breadcrumbs } from "@components/common"
import { CourseList } from "@components/course"
import BaseLayout from "@components/layout/base"
import { OrderCard } from "@components/order"
import { EthRates, WalletBar } from "@components/web3"

export default function Home() {
  return (
      <BaseLayout>
        <Hero />
           Q
      </BaseLayout>
        <div className="relative max-w-7xl mx-auto px-4">
          <Navbar />
          <div className="fit">
            
          </div>
        </div>
        <Footer />
  )
}