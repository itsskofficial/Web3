import { Modal } from "@components/common";
import {
  CourseHero,
  Curriculum,
  Keypoints
} from "@components/course";
import BaseLayout from "@components/layout/base";

export default function Course() {

  return (
    <BaseLayout>
      <div className="py-4">
        <CourseHero/>
      </div>
      <Keypoints />
      <Curriculum />
      <Modal />
    </BaseLayout>  
  )
}

export function getStaticPaths() {
  const { data } = getAllCourses()

  return {
    paths: data.map(c => ({
      params: {
        slug: c.slug
      }
    })),
    fallback: false
  }
}


export function getStaticProps({params}) {
  const { data } = getAllCourses()
  const course = data.filter(c => c.slug === params.slug)[0]

  return {
    props: {
      course
    }
  }
}
