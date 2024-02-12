import React from 'react'
import StrongTitle from '../../../components/common/StrongTitle'
import { getMyPageLayout } from '../getMyPageLayout'

const MyPageMyComments = () => {
  // 후기 불러오기
  return (
    <section className="grow flex-col items-center px-5">
      <StrongTitle title="내 후기 보기" style="border-b-2 border-main pb-2" />
    </section>
  )
}

MyPageMyComments.getLayout = getMyPageLayout
export default MyPageMyComments
