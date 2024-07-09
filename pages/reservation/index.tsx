import React, { useEffect, useState } from 'react'
import Calendar from '../../components/calendar/Calendar'
import Container from '../../components/common/Container'
import Select from '../../components/common/Select'
import StrongTitle from '../../components/common/StrongTitle'
import { useGetLectures } from '../../components/lecture/hooks/useLecture'
import { useGetAllReservedTimes } from '../../components/reserve/hooks/useReserve'
import { getStoredUser } from '../../components/util/userStorage'
import { useUser } from '../../components/auth/hooks/useUser'
import { useRouter } from 'next/router'

const Reservation = () => {
  const [isLectureSelectModalOpen, setIsLectureSelectModalOpen] = useState(false)
  const [isTimeTableModalOpen, setIsTimeTableModalOpen] = useState(false)
  const [selectedLectureName, setSelectedLectureName] = useState('')
  const [selectedLecture, setSelectedLecture] = useState<{
    id: number
    name: string
    lectureDuration: number
  }>({
    id: 0,
    name: '',
    lectureDuration: 0,
  })
  const { getUser } = useUser()
  const router = useRouter()
  const { data: lectures } = useGetLectures()
  const { data: reservedTimes } = useGetAllReservedTimes()
  useEffect(() => {
    if (selectedLectureName) {
      const filteredLecture = lectures
        .filter((item) => item.name === selectedLectureName)
        .map((item) => {
          return { id: item.id, name: item.name, lectureDuration: item.lectureDuration }
        })
      setSelectedLecture(filteredLecture[0])
    }
  }, [selectedLectureName])

  useEffect(() => {
    ;(async () => {
      const storedUser = getStoredUser()
      if (storedUser) {
        const fetchedUser = await getUser(storedUser)
        if (!fetchedUser) {
          router.push('/auth')
        }
      } else {
        router.push('/auth')
      }
    })()
  }, [])
  return (
    <div
      className="w-full"
      onClick={() => {
        isLectureSelectModalOpen && setIsLectureSelectModalOpen(false)
      }}
    >
      <Container style="my-[40px]">
        <div className="w-full mx-auto flex justify-center items-center">
          <StrongTitle title="클래스 예약하기" style="border-b-2 border-main pb-2" />
        </div>
        <div
          className={`w-full ${
            selectedLecture ? 'mt-[40px] translate-y-0' : 'translate-y-[200px]'
          } mx-auto flex flex-col items-center transition-translate-y duration-1000 ease-in-out`}
        >
          <div className="text-2xl font-bold">클래스 선택하기</div>
          {!!lectures.length && (
            <Select<string>
              options={lectures.map((item) => item.name)}
              selected={selectedLectureName}
              setSelected={setSelectedLectureName}
              isSelectedModalOpen={isLectureSelectModalOpen}
              setIsSelectedModalOpen={setIsLectureSelectModalOpen}
              toastMsg="아래로 스크롤 해 모든 클래스를 보실 수 있습니다."
            />
          )}
        </div>

        <div
          className={`mt-[60px] flex-col items-center ${
            selectedLecture.name
              ? 'animate-translateUp100 opacity-1 md:w-[800px] md:h-[900px] '
              : 'hidden translate-y-[200px]'
          } mx-auto`}
        >
          <div className="text-2xl">
            <span className="text-main font-bold"> {selectedLecture.name}</span>
            {'('}
            {selectedLecture.lectureDuration / 60} 시간{')'} 예약
          </div>

          <Calendar
            isTimeTableModalOpen={isTimeTableModalOpen}
            setIsTimeTableModalOpen={setIsTimeTableModalOpen}
            reservedTimes={reservedTimes}
            selectedLecture={selectedLecture}
          />
        </div>
      </Container>
    </div>
  )
}

export default Reservation
