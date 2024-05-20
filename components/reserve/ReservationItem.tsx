import React from 'react'
import { FetchReservationType } from '../calendar/types/reservationType'
import Link from 'next/link'
import { Button } from '../common/Button'
import { useAtomValue } from 'jotai'
import { isMobileDisplay } from '../../store/isMobileDisplay'
interface PropsType {
  id: number
  reservation: Omit<FetchReservationType, 'id' | 'deleted'>
}
function ReservationItem({ id, reservation }: PropsType) {
  const { regular, reserveDate, lectureDuration, lectureId, lecturePrice, lectureName } =
    reservation
  const isMobile = useAtomValue(isMobileDisplay)
  return (
    <div className="flex justify-between items-center border border-main rounded-lg py-4 px-2">
      <span>{reserveDate}</span>
      <Link href={`/lecture/${lectureId}`} className="underline text-gray-700 hover:text-gray-900">
        {lectureName}
      </Link>
      <span className="hidden md:block">{lecturePrice.toLocaleString()}원</span>
      <span className="whitespace-nowrap">{lectureDuration / 60} 시간</span>
      <span className="hidden md:block">{regular ? '정규' : '비정규'}</span>
      <Button
        title="예약 취소"
        size={`${isMobile && 'sm'}`}
        style={`bg-main text-white ${isMobile && 'px-1 mx-1'}`}
      />
    </div>
  )
}

export default ReservationItem
