import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { checkDisplayState } from '../../../store/checkDisplayState'
import { useAuth } from '../../auth/hooks/useAuth'
import { useUser } from '../../auth/hooks/useUser'
import { getStoredUser } from '../../util/userStorage'
import HeaderNav from './HeaderNav'
import { AiOutlineMenu } from 'react-icons/ai'
import { mobileNavState } from '../../../store/mobileNavState'

import { User } from '../../auth/types/user'

const Header = () => {
  const { signOut } = useAuth()
  const router = useRouter()
  const isMobile = useAtomValue(checkDisplayState)
  const [isMenuOpened, setIsMenuOpened] = useAtom(mobileNavState)
  const [user, setUser] = useState<User>()

  const onClickLogo = useCallback(() => {
    router.push('/')
  }, [router])

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) setUser(storedUser)
  }, [])

  return (
    <div className={`w-full sticky top-0 z-[999999] bg-[white] shadow-md`}>
      <div className={`w-[90%] h-[100px] mx-auto flex justify-between items-center  `}>
        <div className="cursor-pointer mx-[25px] rounded-md overflow-hidden" onClick={onClickLogo}>
          <Image src="/foodiful.jpeg" alt="logo" width={72} height={72} priority />
        </div>
        {isMobile ? (
          <span onClick={() => setIsMenuOpened((prev) => !prev)}>
            <AiOutlineMenu size={30} color="#711b98" />
          </span>
        ) : (
          <>
            <HeaderNav />
            {user ? (
              <>
                <Link className="text-xl" href="/mypage">
                  <span className="text-main hover:text-hover font-extrabold">{user.name}</span> 님
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
                className={` text-xl no-underline text-[#000] hover:text-[#E851EB]`}
                href="/auth"
              >
                로그인
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Header
