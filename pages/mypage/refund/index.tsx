import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { User } from '../../../components/auth/types/user'
import useToast from '../../../components/common/hooks/useToast'
import StrongTitle from '../../../components/common/StrongTitle'
import { useGetRefund } from '../../../components/myPage/refund/hooks/useRefund'
import RefundList from '../../../components/myPage/refund/RefundList'
import { getStoredUser } from '../../../components/util/userStorage'
import getMyPageLayout from '../../../components/layout/getMyPageLayout'

function RefundPage() {
  const [user, setUser] = useState<User | null>(null)
  const { data: refundList } = useGetRefund(user?.id)
  const router = useRouter()
  const { fireToast } = useToast()

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    } else {
      fireToast({
        id: '재로그인',
        type: 'failed',
        message: '다시 로그인 해주세요.',
        position: 'bottom',
        timer: 1000,
      })
      router.push('/')
    }
  }, [])
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
