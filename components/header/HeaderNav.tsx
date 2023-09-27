import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useGetUrlParams } from '../common/hooks/useGetUrlParams'
import useMouseState from '../common/hooks/useMouseState'
import { headerTitle } from '../constants/headerTitle'
import HeaderSubTitle from './HeaderSubTitle'

const HeaderNav = ({ isHeaderOpen }: { isHeaderOpen: boolean }) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const pathName = useGetUrlParams()

  const [_, isMouseOver, handleMouseOver, handleMouseLeave] = useMouseState()

  const handleActiveIdxOnMouseOver = (idx: number) => {
    handleMouseOver()
    setActiveIdx(idx)
  }
  const handleActiveIdxOnMouseLeave = () => {
    handleMouseLeave()
  }

  useEffect(() => {
    if (!isMouseOver) {
      const timer = setTimeout(() => {
        setActiveIdx(null)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isMouseOver])

  return (
    <ul className="mx-auto flex justify-between">
      {headerTitle.map(({ title, url, subTitle }, idx) => (
        <div
          className={`relative h-full px-[30px] flex justify-center items-center ${
            isHeaderOpen ? 'text-[18px]' : 'text-[15px]'
          } font-[400]  cursor-pointer`}
          key={`${title}-${url}`}
          onMouseEnter={() => handleActiveIdxOnMouseOver(idx)}
          onMouseLeave={() => handleActiveIdxOnMouseLeave()}
        >
          <div
            className={`${activeIdx === idx && 'text-main'} ${
              pathName?.startsWith(url) ? 'text-main' : 'text-[black]'
            }`}
          >
            <Link href={url}>{title}</Link>
          </div>
          {activeIdx === idx && subTitle && (
            <HeaderSubTitle
              subTitle={subTitle}
              activeIdx={activeIdx}
              setActiveIdx={setActiveIdx}
              pathName={pathName}
            />
          )}
        </div>
      ))}
    </ul>
  )
}
export default HeaderNav
