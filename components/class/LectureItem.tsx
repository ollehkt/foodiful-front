import React from 'react'
import { LectureType } from './types/lectureTypes'

interface PropsType {
  lectureItem: LectureType
}

const LectureItem = ({ lectureItem }: PropsType) => {
  return <div>LectureItem</div>
}

export default LectureItem
