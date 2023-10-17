import dayjs from 'dayjs'
import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react'
import { ReservationTypes } from '../../types/reservationTypes'
import { api } from '../axios/axiosInstance'
import { Button } from '../common/Button'
import useToast from '../common/hooks/useToast'
import { date } from '../constants/date'
import CalendarDatesRender from './CalendarDatesRender'
import CalendarTimeRender from './CalendarTimeRender'

interface PropsType {
  currentDate: string
  selectedDate: string
  onClickSelectDate: (p: string) => void
  isTimeTableModalOpen: boolean
  setIsTimeTableModalOpen: Dispatch<SetStateAction<boolean>>
  reservedTimes: string[]
  selectedClass: { id: number; name: string; classDuration: number }
}

const CalendarContent = ({
  currentDate,
  selectedDate,
  onClickSelectDate,
  isTimeTableModalOpen,
  setIsTimeTableModalOpen,
  reservedTimes,
  selectedClass,
}: PropsType) => {
  // 날짜 선택하면 예약 되지 않은 시간들 불러와서 DatesRender 컴포넌트로 전달

  const [times, setTimes] = useState<string[]>([])
  

  const [isReserveTimeSelected, setIsReserveTimeSelected] = useState(false)

  useEffect(() => {
    const timeArr = []
    for (let hour = 9; hour < 18; hour++) {
      for (let min = 0; min <= 30; min += 30) {
        const time = dayjs(selectedDate).hour(hour).minute(min).format('YYYY-MM-DD HH:mm')
        timeArr.push(time)
      }
    }
    setTimes(timeArr)
  }, [selectedDate])

  // 선택된 시간을 바탕으로 예약하기 버튼 눌렀을 때 예약

  return (
    <div className="w-full">
      <div className="w-full px-4 grid grid-cols-7">
        {date.map((headerDay) => (
          <div key={headerDay} className="text-main mx-1 bg-[#eee] rounded-sm">
            <span className="mx-2 font-semibold">{headerDay}</span>
          </div>
        ))}
      </div>
      <CalendarDatesRender
        currentDate={currentDate}
        selectedDate={selectedDate}
        onClickSelectDate={onClickSelectDate}
        isTimeTableModalOpen={isTimeTableModalOpen}
        setIsTimeTableModalOpen={setIsTimeTableModalOpen}
      />

      {/* 선택 눌렀을 때 예약하기 버튼 나오게 만들기 */}
      {isReserveTimeSelected && <div>선택하기</div> }
      <CalendarTimeRender
        isTimeTableModalOpen={isTimeTableModalOpen}
        setIsTimeTableModalOpen={setIsTimeTableModalOpen}
        times={times}
        selectedDate={selectedDate}
        reservedTimes={reservedTimes}
        selectedClass={selectedClass}
        setIsReserveTimeSelected={setIsReserveTimeSelected}
      />
    </div>
  )
}

export default CalendarContent
