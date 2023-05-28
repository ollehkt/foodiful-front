import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import Link from 'next/link'
import React, { useState } from 'react'

function AuthPage() {
  const [viewLoginMoveText, setViewLoginMoveText] = useState(false)
  const [viewSignupMoveText, setViewSignupMoveText] = useState(false)
  return (
    <div className="w-[600px] h-[400px] mx-auto mt-[300px] flex flex-col justify-center items-center">
      <div className="text-3xl flex flex-col items-center">
        한식 디저트의 모든 것<span className="text-main mt-[10px]"> Foodiful</span>
      </div>

      <Link
        className={`w-[300px] h-[80px] mt-[40px] rounded-md bg-[#b363ec] hover:bg-[#fff] hover:text-[#b363ec] text-[#fff] flex  items-center text-2xl cursor-pointer ${
          viewLoginMoveText ? 'justify-between font-bold' : 'justify-center'
        } `}
        onMouseEnter={() => setViewLoginMoveText(true)}
        onMouseLeave={() => setViewLoginMoveText(false)}
        href="/auth/signin"
      >
        로그인
        {viewLoginMoveText && (
          <span className="text-3xl">
            <BsFillArrowRightCircleFill />
          </span>
        )}
      </Link>

      <Link
        className={`w-[300px] h-[80px] mt-[40px] rounded-md bg-[#b363ec] hover:bg-[#fff] hover:text-[#b363ec] text-[#fff] flex  items-center text-2xl cursor-pointer ${
          viewSignupMoveText ? 'justify-between font-bold' : 'justify-center'
        } `}
        onMouseEnter={() => setViewSignupMoveText(true)}
        onMouseLeave={() => setViewSignupMoveText(false)}
        href="/auth/signup"
      >
        회원가입
        {viewSignupMoveText && (
          <span className="text-3xl">
            <BsFillArrowRightCircleFill />
          </span>
        )}
      </Link>
    </div>
  )
}

export default AuthPage
