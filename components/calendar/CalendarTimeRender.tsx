import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import dayjs from 'dayjs'
import { Button } from '../common/Button'
import { api } from '../axios/axiosInstance'
import { useTimeCheck } from './hooks/useTimeCheck'

interface PropsType {
  isTimeTableModalOpen: boolean
  setIsTimeTableModalOpen: Dispatch<SetStateAction<boolean>>
  times: string[]
  selectedDate: string
  reservedTimes: string[]
  selectedClass: { id: number; name: string; classDuration: number }
  setIsReserveTimeSelected: Dispatch<SetStateAction<boolean>>
}

const CalendarTimeRender = ({
  isTimeTableModalOpen,
  setIsTimeTableModalOpen,
  times,
  selectedDate,
  reservedTimes,
  selectedClass,
  setIsReserveTimeSelected,
}: PropsType) => {
  const [selectedTimes, setSelectedTimes] = useState('')
  const [confirmSelectedTime, setConfirmSelectedTime] = useState('')
  const { reserveTimeCheck } = useTimeCheck()

  const onClickPostReservation = async () => {
    if (selectedTimes.length > 0) {
      return
    }
    const {
      data: { success },
    } = await api.post('/reservation', { data: {} })
  }

  // 시간 클릭 시 클래스 duration 더해서 시작시간 ~ 끝 시간 체크 되게 만들기
  const onClickTime = (time: string) => {
    const filteredSameDates = reservedTimes.filter((date) => dayjs(date).isSame(time, 'D'))
    const addedTime = reserveTimeCheck(time, filteredSameDates[0], selectedClass.classDuration)
    if (addedTime) {
      setSelectedTimes(time)
      setConfirmSelectedTime(`${time} ~ ${addedTime}`)
    }
  }

  return (
    <>
      {isTimeTableModalOpen && times.length > 0 && (
        <div className="absolute bottom-0 px-4 flex flex-col items-center w-[800px] rounded-lg shadow-basic bg-[white] z-[999]">
          <div className="text-lg font-bold my-4">
            <span className="text-main">{dayjs(selectedDate).month() + 1}</span>월
            <span className="text-main"> {dayjs(selectedDate).date()}</span>일 시간 선택
          </div>
          <div className="grid grid-cols-4 gap-8 w-full">
            {times.map((time) => {
              return (
                <span
                  key={time}
                  className={`${
                    reservedTimes.includes(time)
                      ? 'bg-disabled cursor-not-allowed'
                      : selectedTimes === time
                      ? 'bg-main text-[white]'
                      : 'hover:bg-active hover:text-[white] cursor-pointer'
                  } shadow-basic h-[50px] flex justify-center items-center text-lg rounded-lg`}
                  onClick={() => onClickTime(time)}
                >
                  {dayjs(time).format('HH:mm')}
                </span>
              )
            })}
          </div>
          {confirmSelectedTime && (
            <div>{confirmSelectedTime} 의 예약이 맞으시다면 선택을 눌러주세요</div>
          )}
          <div className="py-4">
            <Button
              title="선택"
              style="w-[120px] h-[40px] bg-main text-[white] font-bold mx-[10px]"
              onClick={() => {
                setIsReserveTimeSelected(true)
                setIsTimeTableModalOpen(false)
              }}
            />
            <Button
              title="닫기"
              style="w-[120px] h-[40px] bg-disabled"
              onClick={() => {
                setIsTimeTableModalOpen(false)
                setSelectedTimes('')
                setConfirmSelectedTime('')
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default CalendarTimeRender
