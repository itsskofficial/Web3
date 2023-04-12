import { Modal } from "@components/common";
import {
  CourseHero,
  Curriculum,
  Keypoints
} from "@components/course";
import BaseLayout from "@components/layout/base";
import fetchCourseData from "@content/course/fetcher";

export default function Course() {

  return (
    <BaseLayout>
      <div className="py-4">
      <CourseHero
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
      </div>
      <Keypoints />
      <Curriculum />
      <Modal />
    </BaseLayout>  
  )
}

export function getStaticPaths() {
  const { data } = fetchCourseData()

  return {
    paths: data.map(c => ({
      params: {
        course: c.slug
      }
    })),
    fallback: false
  }
}


export function getStaticProps({params}) {
  const { data } = getAllCourses()
  const course = data.filter(c => c.slug === params.course)[0]

  return {
    props: {
      course
    }
  }
}
