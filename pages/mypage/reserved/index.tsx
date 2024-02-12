import React from 'react'
import StrongTitle from '../../../components/common/StrongTitle'
import { getMyPageLayout } from '../getMyPageLayout'

const MyPageReserved = () => {
  return (
    <section className="grow flex-col items-center px-5">
      <StrongTitle title="예약 내역" style="border-b-2 border-main pb-2" />
    </section>
  )
}

MyPageReserved.getLayout = getMyPageLayout
export default MyPageReserved
