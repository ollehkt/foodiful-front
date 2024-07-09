import React from 'react'
import LectureForm from '../../../components/lecture/LectureForm'
import { useAddLecture } from '../../../components/lecture/hooks/useLecture'
import StrongTitle from '../../../components/common/StrongTitle'

function LectureAddPage() {
  const { addLectureMutate } = useAddLecture()
  return (
    <>
      <StrongTitle title="클래스 추가" style="border-b-2 border-main pb-2 my-16 mx-4" />
      <LectureForm onSubmitAdd={addLectureMutate} />
    </>
  )
}

export default LectureAddPage
