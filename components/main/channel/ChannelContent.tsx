import React, { useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'

const ChannelContent = () => {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState('')

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }
  const onClickSendBtn = () => {
    setMessages([...messages, input])
  }
  return (
    <div className="w-[90%] h-[300px] mx-auto flex flex-col items-center rounded-2xl shadow-lg bg-white">
      <div className="mt-[10px] h-[240px]">
        <div className="text-sm text-[#666]">운영시간에만 채팅이 가능합니다</div>
        {!!messages.length && (
          <div className="w-full">
            {messages.map((message, idx) => (
              <div key={`${message}-${idx}`}>{message}</div>
            ))}
          </div>
        )}
      </div>

      <div className="w-[90%] relative  flex justify-center items-center">
        <input
          className="w-full h-[40px] px-[10px] bg-[#eee] rounded-lg"
          type="text"
          value={input}
          onChange={(e) => onChangeInput(e)}
          placeholder="채팅을 입력해주세요!"
        />
        <span className="absolute right-4 cursor-pointer hover:text-main" onClick={onClickSendBtn}>
          <AiOutlineSend size={20} />
        </span>
      </div>
    </div>
  )
}

export default ChannelContent
