import React, { useState } from 'react'
import StrongTitle from '../../../components/common/StrongTitle'
import getMyPageLayout from '../../../components/layout/getMyPageLayout'
import { useGetReservationByUserId } from '../../../components/calendar/hooks/useReservation'
import { getStoredUser } from '../../../components/util/userStorage'
import Link from 'next/link'
import { User } from '../../../components/auth/types/user'
import ReservationList from '../../../components/reserve/ReservationList'

const MyPageReserved = () => {
  const [user, _] = useState<User | null>(typeof window !== 'undefined' ? getStoredUser() : null)

  const { data: myReservations } = useGetReservationByUserId(user?.id)

  return (
    <section className="grow flex-col items-center px-5 mt-10">
      <StrongTitle title="예약 내역" style="border-b-2 border-main pb-2" />

      {!!myReservations.length ? (
        <ReservationList reservations={myReservations} />
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
