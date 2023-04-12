import { Navbar, Footer, Hero, Breadcrumbs } from "@components/common"
import { CourseList } from "@components/course"
import BaseLayout from "@components/layout/base"
import { OrderCard } from "@components/order"
import { EthRates, WalletBar } from "@components/web3"

export default function Home() {
  return (
      <BaseLayout>
        <Hero />
        <CourseList />
      </BaseLayout>
  )
}

export function getStaticProps() {
  const {data} = 
}