import { AxiosResponse } from 'axios'
import { InferGetServerSidePropsType } from 'next'
import React, { useEffect, useState } from 'react'
import { api } from '../../components/axios/axiosInstance'
import Calendar from '../../components/calendar/Calendar'
import Container from '../../components/common/Container'
import Select from '../../components/common/Select'
import StrongTitle from '../../components/common/StrongTitle'
import { ClassType } from '../../types/classTypes'
import { ReservationTypes } from '../../types/reservationTypes'

// class 및 예약 내역 서버사이드 프롭으로 받아오기

export const getServerSideProps = async (): Promise<{
  props: { classes: ClassType[]; reservedTimes: string[] }
}> => {
  const { data: classes } = await api('/class/all')
  const { data: reservations } = await api('/reservation/all')

  const reservedTimes: string[] = reservations.flatMap(
    (reserve: ReservationTypes) => reserve.reserveDate
  )
  return {
    props: { classes, reservedTimes },
  }
}

const Reservation = ({
  classes,
  reservedTimes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isClassSelectModalOpen, setIsClassSelectModalOpen] = useState(false)
  const [isTimeTableModalOpen, setIsTimeTableModalOpen] = useState(false)
  const [selectedClassName, setSelectedClassName] = useState('')
  const [selectedClass, setSelectedClass] = useState<{
    id: number
    name: string
    classDuration: number
  }>({
    id: 0,
    name: '',
    classDuration: 0,
  })

  useEffect(() => {
    if (selectedClassName) {
      const filteredClass = classes
        .filter((item) => item.name === selectedClassName)
        .map((item) => {
          return { id: item.id, name: item.name, classDuration: item.classDuration }
        })
      setSelectedClass(filteredClass[0])
    }
  }, [selectedClassName])

  return (
    <div
      className="w-full h-screen"
      onClick={() => {
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
            <Select<string>
              options={classes.map((item) => item.name)}
              selected={selectedClassName}
              setSelected={setSelectedClassName}
              isSelectedModalOpen={isClassSelectModalOpen}
              setIsSelectedModalOpen={setIsClassSelectModalOpen}
              toastMsg="아래로 스크롤 해 모든 클래스를 보실 수 있습니다."
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
