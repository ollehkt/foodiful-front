import { InferGetServerSidePropsType } from 'next'
import React, { useEffect, useState } from 'react'
import { User } from '../../components/auth/types/user'
import { api } from '../../components/axios/axiosInstance'
import { LectureType } from '../../components/class/types/lectureTypes'
import { useGetLectures } from '../../components/class/hooks/useLecture'
import LectureList from '../../components/class/LectureList'

export const getServerSideProps = async (): Promise<{ props: { lectures: LectureType[] } }> => {
  const { data: lectures = [] } = await api('/lecture/all')
  return { props: { lectures } }
}

const LecturePage = ({ lectures }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data } = useGetLectures()

  return <div>{<LectureList lectureList={lectures} />}</div>
}

export default LecturePage
