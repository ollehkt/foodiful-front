import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import useToast from '../../common/hooks/useToast'

dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)

export const useTimeCheck = () => {
  const { fireToast } = useToast()
  const reserveTimeCheck = (time: string, reservedTime: string, classDuration: number) => {
    const addedTime = dayjs(time).add(classDuration, 'minutes').format('YYYY-MM-DD HH:mm')
    const endTime = dayjs(time).hour(18).minute(0).second(0).format('YYYY-MM-DD HH:mm')

    if (dayjs(addedTime).isAfter(endTime)) {
      fireToast({
        id: '선택 시간 영업 시간 초과',
        position: 'bottom',
        timer: 2000,
        type: 'failed',
        message: `${dayjs(endTime)
          .subtract(classDuration, 'minutes')
          .format('HH:mm')} 이전 시간으로 예약 해주세요.`,
      })
      return null
    }

    if (dayjs(reservedTime).isBetween(dayjs(time), dayjs(addedTime))) {
      fireToast({
        id: '선택 시간 영업 시간 초과',
        position: 'bottom',
        timer: 2000,
        type: 'failed',
        message: '이미 예약 된 시간과 겹칩니다.',
      })
      return null
    } else return addedTime
  }
  return { reserveTimeCheck }
}
