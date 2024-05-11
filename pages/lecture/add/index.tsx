import React from 'react'
import LectureForm from '../../../components/lecture/LectureForm'
import { useAddLecture } from '../../../components/lecture/hooks/useLecture'

function LectureAddPage() {
  const { addLectureMutate } = useAddLecture()
  return <LectureForm onSubmitAdd={addLectureMutate} />
}

export default LectureAddPage
