import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React, { useState } from 'react'
import { DehydratedState, Hydrate, QueryClient, dehydrate } from '@tanstack/react-query'
import { queryKeys } from '../../query-keys/queryKeys'
import {
  getLectureByLectureId,
  getLectureInquiryByLectureId,
  useGetLectureByLectureId,
  useGetLectureInquiry,
} from '../../components/lecture/hooks/useLecture'
import LectureDetail from '../../components/lecture/LectureDetail'
import { useRouter } from 'next/router'
import { Button } from '../../components/common/Button'
import DetailDesc from '../../components/common/DetailDescription'
import LectureInquiry from '../../components/lecture/LectureInquiry'
import Custom404 from '../404'

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

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.inquiry, lectureId],
    queryFn: () => getLectureInquiryByLectureId(lectureId),
  })

  return { props: { lectureId, dehydratedState: dehydrate(queryClient) } }
}

const LectureDetailPage = ({
  lectureId,
  dehydratedState,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const [viewDescTab, setViewDescTab] = useState(0)
  const { data: lecture } = useGetLectureByLectureId(lectureId)
  const { data: inquiry } = useGetLectureInquiry(lectureId)
  return (
    <Hydrate state={dehydratedState}>
      {!!lecture ? (
        <div className="mt-8 flex-col items-center xl:w-[1080px] w-[80%] mx-auto">
          <Button title="업데이트" onClick={() => router.push(`/lecture/update/${lectureId}`)} />
          <LectureDetail lecture={lecture} />

          <div className="w-full h-[80px] flex justify-center items-center my-[40px]">
            <div
              className={`w-[50%] flex justify-center cursor-pointer ${
                viewDescTab === 0
                  ? 'border-b-main border-b-2 text-main font-bold'
                  : 'border-b-disabled border-b-[1px] text-textDisabled'
              }`}
              onClick={() => setViewDescTab(0)}
            >
              <span className="text-xl py-2">클래스 상세 설명</span>
            </div>
            <div
              className={`w-[50%] flex justify-center cursor-pointer ${
                viewDescTab === 1
                  ? 'border-b-main border-b-2 text-main font-bold'
                  : 'border-b-disabled border-b-[1px] text-textDisabled'
              }`}
              onClick={() => setViewDescTab(1)}
            >
              <span className="text-xl py-2">클래스 문의</span>
            </div>
          </div>
          {!!viewDescTab ? (
            <LectureInquiry
              lectureName={lecture.name}
              lectureId={lectureId}
              inquiryList={inquiry}
            />
          ) : (
            <div className="flex justify-center">
              <DetailDesc description={lecture.description} />
            </div>
          )}
        </div>
      ) : (
        <Custom404 />
      )}
    </Hydrate>
  )
}

export default LectureDetailPage
