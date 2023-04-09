import { Modal } from "@components/common";
import {
  CourseHero,
  Curriculum,
  Keypoints
} from "@components/course";

export default function Course() {

  return (
    
      <CourseHero />
      <Keypoints />
      <Curriculum />
      <Modal />
  )
}