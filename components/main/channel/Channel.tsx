import React, { useState } from 'react'
import ChannelContainer from './ChannelContainer'
import { SiTheconversation } from 'react-icons/si'
import { AiOutlineClose } from 'react-icons/ai'

const Channel = () => {
  const [isChannelOpen, setIsChannelOpen] = useState(false)

  const onClickChannel = () => {
    setIsChannelOpen((prev) => !prev)
  }
  return (
    <div className="sticky w-full bottom-10 pr-[2%] z-[99999] flex justify-end ">
      {isChannelOpen ? (
        <>
          <ChannelContainer />
          <span onClick={onClickChannel} className="cursor-pointer hover:text-active">
            <AiOutlineClose size={50} />
          </span>
        </>
      ) : (
        <span className="cursor-pointer hover:text-active">
          <SiTheconversation size={50} onClick={onClickChannel} />
        </span>
      )}
    </div>
  )
}

export default Channel
