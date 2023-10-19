import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { useUser } from '../../auth/hooks/useUser'
import { LOCALSTORAGE_KEY } from '../../constants/localStorageKey'
import { getStoredUser } from '../../util/userStorage'
import HeaderNav from './HeaderNav'

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

  const handleRouteChange = useCallback(() => {
    const user = getStoredUser()
    if (user) setUserName(user.name)
    else setUserName('')
  }, [])

  useEffect(() => {
    // window undefined가 나오기 때문에 user useEffect문 내부에서 호출
    const user = getStoredUser()
    if (user) {
      setUserName(user.name)
    } else {
      setUserName('')
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [])

  useEffect(() => {}, [])
  return (
    <div className={`w-full sticky top-0 z-[99999] bg-[white] shadow-md`}>
      <div className={`w-[90%] h-[100px] mx-auto flex justify-between items-center  `}>
        <div className="cursor-pointer mx-[25px] rounded-md overflow-hidden" onClick={onClickLogo}>
          <Image src="/foodiful.jpeg" alt="logo" width={72} height={72} priority />
        </div>
        <HeaderNav isHeaderOpen={isHeaderOpen} />
        {userName ? (
          <>
            <Link className="text-xl" href="/mypage">
              <span className="text-main hover:text-hover font-extrabold">{userName}</span> 님
            </Link>
            <button
              onClick={signOut}
              className="text-xl no-underline text-[#666] hover:text-[#000]"
            >
              로그아웃
            </button>
          </>
        ) : (
          <Link
            className={` ${
              isHeaderOpen ? 'text-xl' : 'text-lg'
            } no-underline text-[#000] hover:text-[#E851EB]`}
            href="/auth"
          >
            로그인
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
