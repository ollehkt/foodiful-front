import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React from 'react'
import { api } from '../../components/axios/axiosInstance'
import { LectureType } from '../../components/lecture/types/lectureTypes'
import { DehydratedState, Hydrate, QueryClient, dehydrate } from '@tanstack/react-query'
import { queryKeys } from '../../query-keys/queryKeys'
import { getLectureByLectureId } from '../../components/lecture/hooks/useLecture'
import LectureDetail from '../../components/lecture/LectureDetail'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<{ props: { lectureId: string; dehydratedState: DehydratedState } }> => {
  const {
    query: { id },
  } = context

  const lectureId = String(id)
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.lecture, lectureId],
    queryFn: () => getLectureByLectureId(lectureId),
  })

  return { props: { lectureId, dehydratedState: dehydrate(queryClient) } }
}

const LectureDetailPage = ({
  lectureId,
  dehydratedState,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const lecture = dehydratedState.queries[0].state.data as LectureType
  console.log(lecture)
  return (
    <Hydrate state={dehydratedState}>{!!lecture && <LectureDetail lecture={lecture} />}</Hydrate>
  )
}

export default LectureDetailPage
