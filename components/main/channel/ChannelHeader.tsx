import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'

const ChannelHeader = () => {
  const [isOpenViewTime, setIsOpenViewTime] = useState(false)

  const onClickViewTime = () => {
    setIsOpenViewTime((prev) => !prev)
  }
  return (
    <>
      {isOpenViewTime && <div className="absolute w-full h-full bg-[rgba(0,0,0,0.05)]"></div>}
      <div className="my-[20px] w-[80%] flex mx-auto justify-stretch items-center">
        <div className="w-[60px] h-[60px] rounded-2xl overflow-hidden">
          <Image src="/foodiful.jpeg" alt="logo" width={60} height={60} />
        </div>
        <div className="flex flex-col mx-[20px]">
          <span className="font-bold text-xl text-main">푸디풀</span>
          <span
            className="text-sm text-[#666] cursor-pointer hover:text-[#333]"
            onClick={onClickViewTime}
          >
            운영시간 보기 &gt;
          </span>
        </div>
      </div>
      {isOpenViewTime && (
        <div className="absolute z-[9999] bottom-0 w-full h-[120px] rounded-t-3xl bg-[white]">
          <div className="flex justify-between mx-[20px] my-[20px] items-center">
            <span className="text-[#666]">운영시간</span>
            <span onClick={onClickViewTime} className="cursor-pointer text-main hover:text-active">
              <AiFillCloseCircle size={24} />
            </span>
          </div>
          <div className="flex justify-between mx-[20px] text-main text-lg font-bold">
            <span>월, 화, 수, 목, 금</span>
            <span>오전 09:00 ~ 오후 6:00</span>
          </div>
        </div>
      )}
    </>
  )
}

export default ChannelHeader
