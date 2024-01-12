import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React from 'react'
import { api } from '../../components/axios/axiosInstance'
import { ClassType } from '../../components/class/types/classTypes'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<{ props: { classData: ClassType[] } }> => {
  const {
    query: { id },
  } = context

  const {
    data: { data: classData },
  } = await api(`/class/${id}`)
  return { props: { classData } }
}

const ClassDetailPage = ({ classData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <div>ClassDetailPage</div>
}

export default ClassDetailPage
