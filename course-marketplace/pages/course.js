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
      <div className="">
        <CourseHero/>
      </div>
      <CourseHero />
      <Keypoints />
      <Curriculum />
      <Modal />
    </BaseLayout>  
  )
}