import { useAtom } from 'jotai'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { mobileNavState } from '../../../../store/mobileNavState'
import { headerTitle } from '../../../constants/headerTitle'
import { User } from '../../../auth/types/user'
import { getStoredUser } from '../../../util/userStorage'
import { AiOutlineClose } from 'react-icons/ai'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useRouter } from 'next/router'
import { useAuth } from '../../../auth/hooks/useAuth'

const HeaderNavMobile = () => {
  const [isMenuOpened, setIsMenuOpened] = useAtom(mobileNavState)
  const [subMenuIdx, setSubmenuIdx] = useState(-1)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const { signOut } = useAuth()
  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

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
    isMenuOpened && (
      <div className={`fixed top-0 right-0 z-[99999999] w-full h-screen bg-gray-100`}>
        <div className="h-[80px] border-b-2 border-b-gray-700 flex justify-between items-center px-4">
          {user ? (
            <div className="flex items-center grow gap-x-2 mr-6">
              <p className="text-2xl font-bold text-main">{user.name}</p>
              <p className="pt-1 text-lg font-bold">님</p>
              <Link
                href="/mypage"
                onClick={() => setIsMenuOpened(false)}
                className="text-lg text-gray-700 pt-1 ml-4"
              >
                마이페이지
              </Link>
              <div className="grow"></div>
              <button className="pt-1 text-gray-500" onClick={onClickSignOut}>
                로그아웃
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center text-lg font-semibold text-gray-500">
                <Link
                  href="/auth"
                  onClick={() => setIsMenuOpened(false)}
                  className="hover:text-gray-800 underline"
                >
                  로그인
                </Link>
                <p>이 필요합니다</p>
              </div>
            </>
          )}
          <span onClick={onClickClose} className="cursor-pointer hover:text-active ">
            <AiOutlineClose size={30} />
          </span>
        </div>
        <ul className="flex flex-col gap-y-6 px-10 mt-10">
          {headerTitle.map(({ title, url, subTitle }, idx) => (
            <>
              <div
                key={`${title}-${url}-${idx}`}
                className="flex justify-between items-center mt-4 border-b-[2px] border-main text-lg "
                onClick={() => {
                  onClickArrow(idx)
                  if (!subTitle) router.push(url)
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
                    subTitle.map(({ title, url }) => (
                      <Link
                        key={`${title}-${url}`}
                        className={`flex items-center  hover:text-active hover:bg-[#eee] text-left `}
                        href={url}
                        onClick={onClickSubTitle}
                      >
                        <span className="p-[6px] text-[16px] font-[500] leading-6">{title}</span>
                      </Link>
                    ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>
    )
  )
}

export default HeaderNavMobile
