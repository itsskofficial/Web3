import { CourseList } from "@components/course"
import BaseLayout from "@components/layout/base"
import fetchCourseData from "@content/course/fetcher"

export default function Home(props) {
  return (
      <BaseLayout>
        <Hero />
        
        <CourseList courses=/>
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