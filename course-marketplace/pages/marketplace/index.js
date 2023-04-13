import { CourseList } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import { WalletBar } from "@components/ui/web3"
import { useAccount } from "@components/hooks/web3/useAccount"
import fetchCourseData from "@content/course/fetcher"

export default function Marketplace({courses}) {
  const { account } = useAccount()

  return (
    <BaseLayout>
      <div className="py-4">
        <WalletBar
          address={account.data}
        />
      </div>
      <CourseList
        courses={courses}
      />
    </BaseLayout>
  )
}

export function getStaticProps() {
  const { data } = fetchCourseData()
  return {
    props: {
      courses: data
    }
  }
}
