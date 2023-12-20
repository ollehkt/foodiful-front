import { useAtom } from 'jotai'
import Link from 'next/link'
import React, { useState } from 'react'
import { mobileNavState } from '../../../../store/mobileNavState'
import { headerTitle } from '../../../constants/headerTitle'

const HeaderNavMobile = () => {
  const [isMenuOpened, setIsMenuOpened] = useAtom(mobileNavState)

  return (
    <>
      {isMenuOpened && (
        <div
          onClick={() => setIsMenuOpened((prev) => !prev)}
          className={`absolute top-0 right-0 z-[99999999] w-full h-full shadow-basic bg-[#999] bg-opacity-90`}
        >
          <div className="absolute right-0 w-[70%] h-[40%] bg-[#666]  rounded-md flex justify-end">
            <ul className="w-[40%] flex-col items-center gap-y-10 mx-10 my-10">
              {headerTitle.map(({ title, url }) => (
                <Link
                  href={url}
                  key={title}
                  className="w-full border-b-[1px] border-[#eee] text-lg text-center"
                >
                  {title}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default HeaderNavMobile
