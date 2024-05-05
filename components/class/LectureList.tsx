import React from 'react'
import LectureItem from './LectureItem'
import { LectureType } from './types/lectureTypes'

interface PropsType {
  lectureList: LectureType[]
}

const LectureList = ({ lectureList }: PropsType) => {
  return (
    <div>
      {lectureList.map((lectureItem) => (
        <LectureItem key={lectureItem.id} lectureItem={lectureItem} />
      ))}
    </div>
  )
}

export default LectureList
