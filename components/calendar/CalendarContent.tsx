import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useUser } from '../auth/hooks/useUser'
import { User } from '../auth/types/user'
import { api } from '../axios/axiosInstance'
import { Button } from '../common/Button'
import useToast from '../common/hooks/useToast'
import { date } from '../constants/date'
import { LOCALSTORAGE_KEY } from '../constants/localStorageKey'
import { getStoredUser } from '../util/userStorage'
import CalendarDatesRender from './CalendarDatesRender'
import CalendarTimeRender from './CalendarTimeRender'

interface PropsType {
  currentDate: string
  selectedDate: string
  onClickSelectDate: (p: string) => void
  isTimeTableModalOpen: boolean
  setIsTimeTableModalOpen: Dispatch<SetStateAction<boolean>>
  reservedTimes: string[] | []
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

  const { getUser } = useUser()
  const { fireToast } = useToast()
  const router = useRouter()
  const [times, setTimes] = useState<string[]>([])
  const [isReserveTimeSelected, setIsReserveTimeSelected] = useState(false)
  const [selectedTimes, setSelectedTimes] = useState('')

  const [userData, setUserData] = useState<Partial<User>>({
    name: '',
    phone: '',
    email: '',
  })

  const onClickPostReservation = async () => {
    if (!selectedTimes) {
      fireToast({
        id: '시간 선택 필수',
        position: 'bottom',
        timer: 1000,
        message: '예약 시간을 선택 해주세요.',
        type: 'failed',
      })
      return
    }
    try {
      const { data } = await api.post('/reservation', {
        classId: selectedClass.id,
        reserveDate: selectedTimes,
        userEmail: userData.email,
      })

    } catch (error) {
      fireToast({
        id: '예약 실패',
        position: 'bottom',
        timer: 1000,
        message: '예약을 다시 시도해주세요.',
        type: 'failed',
      })
    }
  }

  useEffect(() => {
    const storedUser = getStoredUser()
    const user = async () => {
      const res = await getUser(storedUser)
      if (!res) {
        router.push('/auth')
        fireToast({
          id: '로그인 필요',
          position: 'bottom',
          timer: 1500,
          message: '예약을 위해 로그인이 필요합니다',
          type: 'warning',
        })
        return
      }
      if (storedUser) setUserData(storedUser)
    }
    user()
  }, [])

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
      {isReserveTimeSelected && userData && (
        <div className="w-full mx-auto flex justify-center">
          <div className="w-[300px] shadow-basic p-2 rounded-md flex flex-col gap-1">
            <div>
              예약자 성함: <span className="text-lg text-main font-bold">{userData.name}</span>
            </div>
            <div>
              연락처: <span className="text-lg text-main font-bold">{userData.phone}</span>
            </div>
            <div>
              예약 시간: <span className="text-lg text-main font-bold">{selectedTimes}</span>
            </div>
            <div className="flex justify-center my-2">
              <Button
                title="예약하기"
                onClick={onClickPostReservation}
                style="bg-main text-[white]"
              />
            </div>
          </div>
        </div>
      )}
      <CalendarTimeRender
        isTimeTableModalOpen={isTimeTableModalOpen}
        setIsTimeTableModalOpen={setIsTimeTableModalOpen}
        times={times}
        selectedDate={selectedDate}
        reservedTimes={reservedTimes}
        selectedClass={selectedClass}
        setIsReserveTimeSelected={setIsReserveTimeSelected}
        selectedTimes={selectedTimes}
        setSelectedTimes={setSelectedTimes}
      />
    </div>
  )
}

export default CalendarContent
