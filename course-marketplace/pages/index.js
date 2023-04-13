import { CourseList } from "@components/course"
import BaseLayout from "@components/layout/base"
import { Web3Provider } from "@components/providers"
import fetchCourseData from "@content/course/fetcher"
import { useContext } from "react"

export default function Home(props) {
  const web3API = useContext(Web3Provider)
  
  return (
      <BaseLayout>
        <Hero />
        <CourseList courses={props.courses} />
      </BaseLayout>
  )
}

export function getStaticProps() {
  const { data } = fetchCourseData()
  return {
    props: {
      courses:data
    }
  }
}