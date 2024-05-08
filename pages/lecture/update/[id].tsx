import React from 'react'
import { LectureType } from '../../../components/lecture/types/lectureTypes'
import { GetServerSidePropsContext } from 'next'
import { api } from '../../../components/axios/axiosInstance'
import useToast from '../../../components/common/hooks/useToast'
import { useRouter } from 'next/router'
import { useUpdateLecture } from '../../../components/lecture/hooks/useLecture'
import LectureForm from '../../../components/lecture/LectureForm'

interface PropsType {
  lecture: LectureType
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<{ props: { lecture: LectureType } }> => {
  const {
    query: { id },
  } = context
  const { data: lecture } = await api(`/lecture/${id}`)

  return {
    props: { lecture },
  }
}
function UpdateLecturePage({ lecture }: PropsType) {
  const { updateLectureMutation } = useUpdateLecture()

  return (
    <>
      <LectureForm lectureForUpdate={lecture} onSubmitUpdate={updateLectureMutation} />
    </>
  )
}

export default UpdateLecturePage
