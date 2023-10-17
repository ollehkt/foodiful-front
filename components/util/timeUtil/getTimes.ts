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
