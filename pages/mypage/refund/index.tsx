import React from 'react'
import StrongTitle from '../../../components/common/StrongTitle'

import { getMyPageLayout } from '../getMyPageLayout'

function RefundPage() {
  return (
    <section className="grow flex-col items-center px-5">
      <StrongTitle title="취소/교환/반품 내역" style="border-b-2 border-main pb-2" />
    </section>
  )
}
RefundPage.getLayout = getMyPageLayout
export default RefundPage
