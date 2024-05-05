import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { Button } from '../common/Button'
import { useTimeCheck } from './hooks/useTimeCheck'

interface PropsType {
  isTimeTableModalOpen: boolean
  setIsTimeTableModalOpen: Dispatch<SetStateAction<boolean>>
  times: string[]
  selectedDate: string
  reservedTimes: string[]
  selectedLecture: { id: number; name: string; lectureDuration: number }
  setIsReserveTimeSelected: Dispatch<SetStateAction<boolean>>
  selectedTimes: string
  setSelectedTimes: Dispatch<SetStateAction<string>>
}

const CalendarTimeRender = ({
  isTimeTableModalOpen,
  setIsTimeTableModalOpen,
  times,
  selectedDate,
  reservedTimes,
  selectedLecture,
  setIsReserveTimeSelected,
  selectedTimes,
  setSelectedTimes,
}: PropsType) => {
  const [confirmSelectedTime, setConfirmSelectedTime] = useState('')
  const { reserveTimeCheck } = useTimeCheck()

  // 시간 클릭 시 클래스 duration 더해서 시작시간 ~ 끝 시간 체크 되게 만들기
  const onClickTime = (time: string) => {
    if (time === selectedTimes || reservedTimes.includes(time)) {
      setSelectedTimes('')
      setConfirmSelectedTime('')
      return
    }

    const filteredSameDates = reservedTimes.filter((date) => dayjs(date).isSame(time, 'D'))
    const addedTime = reserveTimeCheck(time, filteredSameDates[0], selectedLecture.lectureDuration)
    if (addedTime) {
      setSelectedTimes(time)
      setConfirmSelectedTime(`${time} ~ ${addedTime}`)
    }
  }

  return (
    <>
      {isTimeTableModalOpen && times.length > 0 && (
        <div className="absolute bottom-[-40px]  px-4 flex flex-col items-center md:w-[800px] mx-2 rounded-lg shadow-basic bg-white z-[999]">
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
                      ? 'bg-main text-white cursor-pointer'
                      : 'hover:bg-active hover:text-white cursor-pointer'
                  } shadow-basic h-[50px] flex justify-center items-center text-lg rounded-lg`}
                  onClick={() => onClickTime(time)}
                >
                  {dayjs(time).format('HH:mm')}
                </span>
              )
            })}
          </div>
          {confirmSelectedTime && (
            <div className="mt-8 md:mt-0 h-[40px] flex justify-center items-center text-lg font-semibold">
              <span>
                <span className="text-main font-bold">{confirmSelectedTime}</span> 의 예약이
                맞으시다면 <span className="p-1 bg-main text-white rounded-md">선택</span> 을
                눌러주세요.
              </span>
            </div>
          )}

          <div className="py-4  md:py-1 my-[20px]">
            <Button
              title="선택"
              style="w-[120px] h-[40px] bg-main text-white font-bold mx-[10px]"
              onClick={() => {
                setIsReserveTimeSelected(true)
                setIsTimeTableModalOpen(false)
                scrollTo(0, 500)
              }}
              disabled={!selectedTimes}
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
