import React from 'react'
import LectureItem from './LectureItem'
import { LectureType } from './types/lectureTypes'
import StrongTitle from '../common/StrongTitle'

interface PropsType {
  lectureList: LectureType[]
}

const LectureList = ({ lectureList }: PropsType) => {
  return (
    <>
      <StrongTitle title="클래스" style="border-b-2 border-main pb-2" />
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 xl:gap-x-8 my-[40px]">
        {lectureList &&
          lectureList.map((lectureItem) => (
            <LectureItem key={lectureItem.id} lecture={lectureItem} />
          ))}
      </div>
    </>
  )
}

export default LectureList
