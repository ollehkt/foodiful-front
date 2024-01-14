import dayjs from 'dayjs'

import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { MdAdsClick } from 'react-icons/md'
interface PropsType {
  currentDate: string
  onClickToToday: () => void
  onClickPrevMonth: () => void
  onClickNextMonth: () => void
}

const CalendarHeader = ({
  currentDate,
  onClickToToday,
  onClickPrevMonth,
  onClickNextMonth,
}: PropsType) => {
  const now = dayjs().format()

  return (
    <div className="w-full">
      <div className="w-full h-[30px] my-2 px-4 flex justify-center items-center py-4">
        <div className="text-lg flex-1">
          <span className="font-extrabold text-main ">{dayjs(currentDate).month() + 1}</span>월
          <span className="font-bold"> {dayjs(currentDate).year()}</span>
        </div>
        <div className="flex flex-0 gap-2">
          <span
            className="text-md font-bold cursor-pointer flex justify-center items-center hover:text-main"
            onClick={onClickToToday}
          >
            <MdAdsClick size={20} /> TODAY
          </span>
          <span className="cursor-pointer text-main hover:text-active" onClick={onClickPrevMonth}>
            <BsFillArrowLeftSquareFill size={24} />
          </span>
          <span className="cursor-pointer text-main hover:text-active" onClick={onClickNextMonth}>
            <BsFillArrowRightSquareFill size={24} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default CalendarHeader
