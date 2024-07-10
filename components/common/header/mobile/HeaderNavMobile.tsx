import { useAtom } from 'jotai'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { headerTitle } from '../../../constants/headerTitle'
import { User } from '../../../auth/types/user'
import { getStoredUser } from '../../../util/userStorage'
import { AiOutlineClose } from 'react-icons/ai'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useRouter } from 'next/router'
import { useAuth } from '../../../auth/hooks/useAuth'
import { FaShoppingCart } from 'react-icons/fa'
import { mobileNavState } from '../../../../store/mobileNavState'

const HeaderNavMobile = () => {
  const [isMenuOpened, setIsMenuOpened] = useAtom(mobileNavState)
  const [subMenuIdx, setSubmenuIdx] = useState(-1)
  const [user, setUser] = useState<User | null>(null)

  const router = useRouter()
  const { signOut } = useAuth()

  const onClickClose = () => {
    setIsMenuOpened(false)
  }

  const onClickArrow = (idx: number) => {
    if (subMenuIdx === idx) setSubmenuIdx(-1)
    else setSubmenuIdx(idx)
  }

  const onClickSubTitle = () => {
    setSubmenuIdx(-1)
    setIsMenuOpened(false)
  }

  const onClickSignOut = () => {
    signOut()
    setIsMenuOpened(false)
    router.push('/')
  }

  const mouseEventPrevent = (e: Event) => {
    e.preventDefault()
  }
  const keyBoardArrowPrevent = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') e.preventDefault()
  }

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) setUser(storedUser)
    else setUser(null)
  }, [router])

  useEffect(() => {
    if (isMenuOpened) {
      window.addEventListener('DOMMouseScroll', mouseEventPrevent, false) // older FF
      window.addEventListener('wheel', mouseEventPrevent, { passive: false }) // modern desktop
      window.addEventListener('touchmove', mouseEventPrevent, { passive: false }) // mobile
      window.addEventListener('keydown', keyBoardArrowPrevent)
    }

    return () => {
      window.removeEventListener('DOMMouseScroll', mouseEventPrevent, false)
      window.removeEventListener('wheel', mouseEventPrevent, false)
      window.removeEventListener('touchmove', mouseEventPrevent)
      window.removeEventListener('keydown', keyBoardArrowPrevent)
    }
  }, [isMenuOpened])

  return (
    <>
      {isMenuOpened && (
        <div className={`fixed top-0 right-0 z-[9999999] w-full h-screen bg-white`}>
          <div className="h-[100px] border-b-2 border-b-gray-700 flex justify-between items-center px-4">
            {user ? (
              <div className="flex items-center grow gap-x-2 mr-4">
                <p className="text-2xl font-bold text-main">{user.name}</p>
                <p className="pt-1 text-lg font-bold">님</p>
                <Link
                  href="/mypage"
                  onClick={() => setIsMenuOpened(false)}
                  className="text-lg text-gray-700 pt-1 ml-4"
                >
                  마이페이지
                </Link>

                <span
                  className="cursor-pointer mt-1 ml-2"
                  onClick={() => {
                    setIsMenuOpened(false)
                    router.push('/cart')
                  }}
                >
                  <FaShoppingCart size={22} />
                </span>
                <div className="grow"></div>
                <button className="pt-1 text-gray-500" onClick={onClickSignOut}>
                  로그아웃
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center text-lg font-semibold text-gray-500">
                  <Link href="/auth" onClick={() => setIsMenuOpened(false)} className="underline">
                    로그인
                  </Link>
                  <p>이 필요합니다</p>
                </div>
              </>
            )}
            <span onClick={onClickClose} className="cursor-pointer">
              <AiOutlineClose size={30} color="#711b98" />
            </span>
          </div>
          <ul className="flex flex-col gap-y-6 px-14 mt-10">
            {headerTitle.map(({ title, url, subTitle }, idx) => (
              <>
                <div
                  key={`${title}-${url}-${idx}`}
                  className="flex justify-between items-center mt-4 border-b-[2px] border-main text-lg "
                  onClick={() => {
                    onClickArrow(idx)
                    if (!subTitle) {
                      router.push(url)
                      setIsMenuOpened(false)
                    }
                  }}
                >
                  {title}
                  {subTitle ? (
                    subMenuIdx !== idx ? (
                      <IoIosArrowDown size={30} />
                    ) : (
                      <IoIosArrowUp size={30} />
                    )
                  ) : (
                    <></>
                  )}
                </div>
                {subTitle && subMenuIdx === idx && (
                  <ul className="flex flex-col gap-y-2">
                    {subTitle &&
                      subTitle.map(({ title, url }, idx) => (
                        <Link
                          key={`${title}-${url}`}
                          className={`flex items-center  hover:text-active hover:bg-[#eee] text-left pl-2`}
                          href={url}
                          onClick={onClickSubTitle}
                        >
                          <span className="w-1 h-1 rounded-full bg-main"></span>
                          <span className="p-[6px] text-base font-medium leading-6">{title}</span>
                        </Link>
                      ))}
                  </ul>
                )}
              </>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default HeaderNavMobile
