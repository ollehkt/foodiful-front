import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { isMobileDisplay } from '../../../store/isMobileDisplay'
import { useAuth } from '../../auth/hooks/useAuth'
import { getStoredUser } from '../../util/userStorage'
import HeaderNav from './HeaderNav'
import { AiOutlineMenu } from 'react-icons/ai'
import { mobileNavState } from '../../../store/mobileNavState'
import { User } from '../../auth/types/user'
import { FaShoppingCart } from 'react-icons/fa'
import { modalState } from '../../../store/modalState'

const Header = () => {
  const { signOut } = useAuth()
  const router = useRouter()
  const isMobile = useAtomValue(isMobileDisplay)
  const setIsMenuOpened = useSetAtom(mobileNavState)
  const [user, setUser] = useState<User | null>(null)
  const setModal = useSetAtom(modalState)

  const onClickSignOut = () => {
    setModal({
      isOpen: true,
      title: '로그아웃',
      content: '로그아웃 하시겠습니까?',
      confirmFunc: () => {
        signOut()
        setUser(null)
      },
    })
  }

  const onClickLogo = () => {
    router.push('/')
  }

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) setUser(storedUser)
    else setUser(null)
  }, [router])

  return (
    <div className={`w-full sticky top-0 z-[999999] bg-white shadow-md`}>
      <div className={`w-[90%] h-[100px] mx-auto flex justify-between items-center  `}>
        <div className="cursor-pointer rounded-md overflow-hidden" onClick={onClickLogo}>
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
                <div className="text-xl mr-2 flex items-center gap-2">
                  <span
                    className="hover:text-textDisabled cursor-pointer"
                    onClick={() => router.push('/cart')}
                  >
                    <FaShoppingCart />
                  </span>
                  <span
                    className="text-main cursor-pointer hover:text-hover font-extrabold"
                    onClick={() => router.push('/mypage')}
                  >
                    {user.name}
                  </span>
                  님
                </div>
                <button
                  onClick={onClickSignOut}
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
