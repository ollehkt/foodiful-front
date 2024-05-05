import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React from 'react'
import { api } from '../../components/axios/axiosInstance'
import { LectureType } from '../../components/class/types/lectureTypes'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<{ props: { lectureData: LectureType[] } }> => {
  const {
    query: { id },
  } = context

  const {
    data: { data: lectureData },
  } = await api(`/lecture/all/${id}`)
  return { props: { lectureData } }
}

const LectureDetailPage = ({
  lectureData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <div>LectureDetailPage</div>
}

export default LectureDetailPage
