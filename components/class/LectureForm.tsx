import { UseMutateFunction } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import React from 'react'

interface PropsType {
  // lectureForUpdate?: lReturnType
  onSubmitAdd?: UseMutateFunction<
    AxiosResponse<any, any> | undefined,
    unknown,
    {
      class: any
    },
    unknown
  >
  onSubmitUpdate?: UseMutateFunction<
    any,
    unknown,
    {
      class: any
      id: number
    },
    unknown
  >
}

function LectureForm({}: PropsType) {
  // function LectureForm({ lectureForUpdate }: PropsType) {
  return <div>LectureForm</div>
}

export default LectureForm
