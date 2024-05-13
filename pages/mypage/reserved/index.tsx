import React, { useEffect, useState } from 'react'
import StrongTitle from '../../../components/common/StrongTitle'
import getMyPageLayout from '../../../components/layout/getMyPageLayout'
import { useGetReservationByUserId } from '../../../components/calendar/hooks/useReservation'
import { getStoredUser } from '../../../components/util/userStorage'
import useToast from '../../../components/common/hooks/useToast'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { User } from '../../../components/auth/types/user'

const MyPageReserved = () => {
  const router = useRouter()
  const { fireToast } = useToast()
  const [user, setUser] = useState<User | null>(null)

  const { data: myReservations } = useGetReservationByUserId(user?.id)

  useEffect(() => {
    const storedUser = getStoredUser()
    if (!storedUser) {
      fireToast({
        id: '예약 페이지 접속 실패',
        type: 'failed',
        message: '로그인 후에 이용해주세요.',
        timer: 1500,
        position: 'bottom',
      })
      router.push('/auth')
    }
    setUser(storedUser)
  }, [])
  return (
    <section className="grow flex-col items-center px-5">
      <StrongTitle title="예약 내역" style="border-b-2 border-main pb-2" />

      {!!myReservations.length ? (
        /** 예약 내역 바탕으로 예약 보여주기 */
        <></>
      ) : (
        <div className="w-full flex flex-col items-center text-2xl font-bold my-10">
          <div>클래스 예약 내역이 없습니다.</div>

          <Link className="text-main hover:text-hover mt-10" href="/product">
            클래스 예약하러 가기
          </Link>
        </div>
      )}
    </section>
  )
}

MyPageReserved.getLayout = getMyPageLayout
export default MyPageReserved
