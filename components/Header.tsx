import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { httpRequest } from './lib/httpRequest'

interface PropsType {
  isHeaderOpen: boolean
}

function Header({ isHeaderOpen }: PropsType) {
  const clickLogout = useCallback(async () => {
    const res = await httpRequest('auth/logout')('POST')('로그아웃 실패')()
    console.log(res)
  }, [])
  const router = useRouter()

  const onClickLogo = useCallback(() => {
    router.push('/')
  }, [router])

  return (
    <div className={`w-full sticky top-0 z-[99999] bg-gradient-to-tl from-[#fbc0ff] to-[#fff]`}>
      <div
        className={`w-[1280px]  ${
          isHeaderOpen ? 'h-[100px]' : 'h-[60px]'
        } mx-auto flex justify-between items-center`}
      >
        <div className="font-bold text-3xl text-main cursor-pointer" onClick={onClickLogo}>
          Foodiful
        </div>
        <div className="w-[60px]">logo</div>
        <div className="w-[800px]">navigation</div>
        <Link className="text-xl no-underline text-[#666] hover:text-[#000]" href="/auth">
          로그인
        </Link>
        <button
          onClick={clickLogout}
          className="text-xl no-underline text-[#666] hover:text-[#000]"
        >
          로그아웃
        </button>
      </div>
    </div>
  )
}

export default Header
