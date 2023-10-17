import { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { api } from '../../components/axios/axiosInstance'
import Calendar from '../../components/calendar/Calendar'
import Container from '../../components/common/Container'
import useToast from '../../components/common/hooks/useToast'
import Select from '../../components/common/Select'
import StrongTitle from '../../components/common/StrongTitle'
import { ClassType } from '../../types/classTypes'

const Reservation = () => {
  const [isClassSelectModalOpen, setIsClassSelectModalOpen] = useState(false)
  const [isTimeTableModalOpen, setIsTimeTableModalOpen] = useState(false)
  const { fireToast } = useToast()
  const [classes, setClasses] = useState<{ id: number; name: string; classDuration: number }[]>([])
  const [selectedClass, setSelectedClass] = useState<{
    id: number
    name: string
    classDuration: number
  }>({
    id: 0,
    name: '',
    classDuration: 0,
  })

  const [reservedTimes, setReservedTimes] = useState<string[]>([])

  const getReservationByClassId = async (classId: number) => {
    try {
      const {
        data: { data },
      } = await api<AxiosResponse<ClassType & { reservedData: string[] }>>(
        `/reservation?class_id=${classId}`
      )
      setReservedTimes(data.reservedData)
    } catch (error) {}
  }

  const getClasses = async () => {
    try {
      const {
        data: { data },
      } = await api<AxiosResponse<ClassType[]>>('/class')
      setClasses(
        data.map((item: ClassType) => ({
          id: item.id,
          name: item.name,
          classDuration: item.classDuration,
        }))
      )
    } catch (error) {
      fireToast({
        id: '클래스 불러오기 실패',
        position: 'bottom',
        timer: 1000,
        type: 'failed',
        message: '클래스들을 불러오는데 실패했습니다.',
      })
    }
  }

  useEffect(() => {
    if (selectedClass.id > 0) getReservationByClassId(selectedClass.id)

    // 선택된 클래스로 클래스 예약 정보 호출
  }, [selectedClass])

  useEffect(() => {
    getClasses()
  }, [])

  return (
    <div
      className="w-full h-screen"
      onClick={(e) => {
        isClassSelectModalOpen && setIsClassSelectModalOpen(false)
      }}
    >
      <Container style="my-[40px] h-full">
        <div className="w-full mx-auto flex justify-center items-center">
          <StrongTitle title="클래스 예약하기" />
        </div>
        <div
          className={`w-full ${
            selectedClass ? 'mt-[40px] translate-y-0' : 'translate-y-[200px]'
          } mx-auto flex flex-col items-center transition-translate-y duration-1000 ease-in-out`}
        >
          <div className="text-2xl font-bold">클래스 선택하기</div>
          {classes.length > 0 && (
            <Select
              options={classes}
              selected={selectedClass}
              setSelected={setSelectedClass}
              isSelectedModalOpen={isClassSelectModalOpen}
              setIsSelectedModalOpen={setIsClassSelectModalOpen}
            />
          )}
        </div>

        <div
          className={`mt-[60px] flex flex-col items-center ${
            selectedClass.name
              ? 'animate-translateUp100 opacity-1 w-[800px] h-[600px] '
              : 'hidden translate-y-[200px]'
          } mx-auto`}
        >
          <div className="text-2xl">
            <span className="text-main font-bold"> {selectedClass.name}</span>
            {'('}
            {selectedClass.classDuration / 60} 시간{')'} 예약
          </div>

          <Calendar
            isTimeTableModalOpen={isTimeTableModalOpen}
            setIsTimeTableModalOpen={setIsTimeTableModalOpen}
            reservedTimes={reservedTimes}
            selectedClass={selectedClass}
          />
        </div>
      </Container>
    </div>
  )
}

export default Reservation
