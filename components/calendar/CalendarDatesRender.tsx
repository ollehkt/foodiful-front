import dayjs from 'dayjs'
import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react'
import useToast from '../common/hooks/useToast'

interface Params {
  currentDate: string
  selectedDate: string
  onClickSelectDate: (date: string) => void
  isTimeTableModalOpen: boolean
  setIsTimeTableModalOpen: Dispatch<SetStateAction<boolean>>
}

const CalendarDatesRender = ({ currentDate, selectedDate, onClickSelectDate }: Params) => {
  const [rows, setRows] = useState<ReactElement[]>([])

  useEffect(() => {
    const monthStart = dayjs(currentDate).startOf('M').format()
    const monthEnd = dayjs(monthStart).endOf('M').format()
    const startDate = dayjs(monthStart).startOf('week').format()
    const endDate = dayjs(monthEnd).endOf('week').format()
    const rowsData = []

    let days = []
    let day = startDate
    let formattedDate = 0

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dayjs(day).date()
        const cloneDay = day
        days.push(
          <div
            key={day}
            className={`shadow-basic m-1 rounded-md  ${
              dayjs(day).day() === 0
                ? 'bg-[#ee2222] text-white'
                : dayjs(day).isBefore(dayjs(), 'D') // 현재 실제 날짜보다 현재 for문의 날짜가 뒤라면
                ? 'bg-disabled cursor-not-allowed'
                : !dayjs(day).isSame(dayjs(selectedDate), 'D') // for문의 날짜와 고른 날이 같지 않다면
                ? 'cursor-pointer'
                : dayjs(day).isSame(dayjs(selectedDate), 'D') // for문의 날짜와 고른 날이 같다면
                ? 'text-white font-bold bg-active cursor-pointer'
                : dayjs(currentDate).month() !== dayjs(day).month() // 현재 달과 for문 날짜의 달이 다르다면
                ? 'text-[#999]'
                : ''
            }`}
            onClick={() => {
              onClickSelectDate(dayjs(cloneDay).format())
            }}
          >
            <span
              className={`m-1 ${
                dayjs(currentDate).month() !== dayjs(day).month() && 'text-[#999]'
              }`}
            >
              {formattedDate}
            </span>
            {dayjs().isSame(day, 'day') && (
              <div className={`${!dayjs().isSame(selectedDate, 'D') && 'text-main font-bold'}`}>
                오늘
              </div>
            )}
          </div>
        )
        day = dayjs(day).add(1, 'day').format()
      }
      rowsData.push(
        <div className="grid grid-cols-7 h-[50px] md:h-[100px]" key={day}>
          {days}
        </div>
      )
      days = []
    }

    setRows(rowsData)
  }, [currentDate])
  /**
   * TODO: 시간 선택 시 클래스 duration 에 따라서 몇 개 선택될지 만들어야함.
   */

  return <div className="w-full px-4 my-4 justify-between items-center relative z-[99]">{rows}</div>
}
export default CalendarDatesRender
