import dayjs from 'dayjs'

export const getTimes = (selectedDate: string) => {
  const timeArr = []
  for (let hour = 9; hour < 18; hour++) {
    for (let min = 0; min <= 30; min += 30) {
      const time = dayjs(selectedDate).hour(hour).minute(min).format('YYYY-MM-DD HH:mm')
      timeArr.push(time)
    }
  }
  return timeArr
}

export const calPhoneVerifyTime = (time: number) => {
  const seconds = Number(time % 60)
  if (seconds < 10) {
    return '0' + String(seconds)
  } else {
    return String(seconds)
  }
}
