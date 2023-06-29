import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from './auth/hooks/useAuth'
import { useUser } from './auth/hooks/useUser'
import { LOCALSTORAGE_KEY } from './constants/localStorageKey'
import { httpRequest } from './lib/httpRequest'
import { getStoredUser } from './util/userStorage'

interface PropsType {
  isHeaderOpen: boolean
}

function Header({ isHeaderOpen }: PropsType) {
  const [userName, setUserName] = useState('')
  const { signOut } = useAuth()
  const router = useRouter()

  const onClickLogo = useCallback(() => {
    router.push('/')
  }, [router])

  useEffect(() => {
    const handleRouteChange = () => {
      const user = getStoredUser()
      if (user) setUserName(user.name)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [])

  useEffect(() => {
    const user = getStoredUser()
    if (user) setUserName(user.name)
    else setUserName('')
  }, [])
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
        {userName ? (
          <>
            <Link className="text-xl " href="/mypage">
              <span className="text-main hover:text-[#c81dd4] font-extrabold">{userName}</span> 님
            </Link>
            <button
              onClick={signOut}
              className="text-xl no-underline text-[#666] hover:text-[#000]"
            >
              로그아웃
            </button>
          </>
        ) : (
          <Link className="text-xl no-underline text-[#000] hover:text-[#E851EB]" href="/auth">
            로그인
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
