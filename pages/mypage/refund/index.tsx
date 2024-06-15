import React, { useState } from 'react'
import { User } from '../../../components/auth/types/user'
import StrongTitle from '../../../components/common/StrongTitle'
import { useGetRefund } from '../../../components/myPage/refund/hooks/useRefund'
import RefundList from '../../../components/myPage/refund/RefundList'
import getMyPageLayout from '../../../components/layout/getMyPageLayout'
import { getStoredUser } from '../../../components/util/userStorage'

function RefundPage() {
  const [user, _] = useState<User | null>(typeof window !== 'undefined' ? getStoredUser() : null)
  const { data: refundList } = useGetRefund(user?.id)

  return (
    <section className="grow flex-col items-center px-5 mt-10">
      <StrongTitle title="취소/교환/반품 내역" style="border-b-2 border-main pb-2" />
      {!refundList.length ? (
        <div className="w-full flex flex-col items-center text-2xl font-bold my-10">
          <div className="text-main">취소/교환/반품 내역이 없습니다.</div>
        </div>
      ) : (
        <RefundList refundList={refundList} />
      )}
    </section>
  )
}
RefundPage.getLayout = getMyPageLayout
export default RefundPage
