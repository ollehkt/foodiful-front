import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

const MainSlider = ({ imgs }: { imgs: string[] }) => {
  const total = imgs.length - 1
  const [hoverState, setHoverState] = useState({ left: false, right: false })

  const onMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const { name } = e.currentTarget
      setHoverState({ ...hoverState, [name]: true })
    },
    [hoverState]
  )

  const onMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const { name } = e.currentTarget
      setHoverState({ ...hoverState, [name]: false })
    },
    [hoverState]
  )

  const scrollPrev = () => {
    if (index <= 0) setIndex(total)
    else setIndex((currentIdx) => (currentIdx -= 1))
  }
  const scrollNext = () => {
    if (index === total) setIndex((currentIdx) => (currentIdx = 0))
    else setIndex((currentIdx) => (currentIdx += 1))
  }

  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<any>(null) // 타입 찾기

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIdx) => (prevIdx === total ? 0 : prevIdx + 1))
    }, 2500)

    return () => resetTimeout()
  }, [index, total])

  return (
    <div className={`flex w-[90%] mb-[100px] mx-auto border-white rounded-md h-[600px] relative`}>
      <Image src={imgs[index]} alt="slider-image" fill />

      <button
        name="left"
        className={`flex justify-center items-center absolute top-[45%] left-10 ${
          hoverState.left
            ? 'bg-main scale-125 ease-in duration-120 transition-all'
            : 'bg-white scale-100 ease-in duration-120 transition-all'
        } w-[40px] h-[40px] border-[1px] border-transparent rounded-3xl`}
        onClick={scrollPrev}
        onMouseEnter={(e) => onMouseEnter(e)}
        onMouseLeave={(e) => onMouseLeave(e)}
      >
        <AiOutlineArrowLeft color={hoverState.left ? 'white' : 'black'} />
      </button>
      <button
        name="right"
        className={`flex justify-center items-center absolute top-[45%] right-10 ${
          hoverState.right
            ? 'bg-main scale-125 ease-in duration-120 transition-all'
            : 'bg-white scale-100 ease-in duration-120 transition-all border-white'
        } w-[40px] h-[40px] border-[1px] border-transparent rounded-3xl`}
        onClick={scrollNext}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <AiOutlineArrowRight color={hoverState.right ? 'white' : 'black'} />
      </button>
      <div className="absolute left-[50%]  bottom-1 flex gap-[5px]">
        {imgs.map((_, idx) => (
          <button
            key={`${_}-${idx}`}
            className={`p-0 w-[14px] h-[14px] rounded-full border ${
              index === idx && 'bg-[rgba(255,255,255,0.9)] w-[24px]'
            }`}
            onClick={() => setIndex(idx)}
          />
        ))}
      </div>
    </div>
  )
}

export default MainSlider
