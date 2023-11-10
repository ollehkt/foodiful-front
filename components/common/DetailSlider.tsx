import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs'

interface PropsType {
  items: string[]
  btn: boolean
  btnSize?: number
  slidePx: number
}

/**
 *
 * @Todo: 큰 사진 하나 보여주고 작은 사진들 버튼으로 이동 가능하게(이동 했을 때 현재 사진이라면 큰 사진으로 보이게), 터치 누르면 큰 사진으로 보이게,
 */

const DetailSlider = ({ items, btn, btnSize, slidePx }: PropsType) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const ulRef = useRef<HTMLUListElement | null>(null)

  const onClickRightBtn = () => {
    if (currentSlide === items.length - 1) return
    setCurrentSlide((currentSlide) => (currentSlide += 1))
  }
  const onClickLeftBtn = () => {
    if (currentSlide <= 0) return
    setCurrentSlide((currentSlide) => (currentSlide -= 1))
  }

  const onClickImage = (idx: number) => {
    setCurrentSlide((currentSlide) => (currentSlide = idx))
  }

  useEffect(() => {
    if (ulRef.current && currentSlide < items.length - 3)
      ulRef.current.style.marginLeft = `${-currentSlide * slidePx}px`
  }, [currentSlide, items.length, slidePx])

  return (
    <div className="flex relative ml-[30px] justify-between">
      <div className="my-[10px] mx-auto overflow-hidden relative">
        <Image
          src={items[currentSlide]}
          alt="메인 사진"
          width={450}
          height={400}
          className="w-[450px] h-[400px] rounded-md"
        />
        <div className="w-[450px] h-[120px] mt-2">
          <ul ref={ulRef} className="flex absolute overflow-hidden gap-[10px]">
            {items.length > 0 &&
              items.map((item, idx) => (
                <li
                  key={`${item}-${idx}`}
                  className={`w-[100px] cursor-pointer ${
                    currentSlide !== idx ? 'opacity-50' : 'opacity-100'
                  } rounded-md shadow-md`}
                  onClick={() => onClickImage(idx)}
                >
                  <Image
                    src={item}
                    alt="상품 미리보기"
                    width={100}
                    height={100}
                    className="w-[100px] h-[100px] rounded-md mr-[10px]"
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
      {btn && (
        <>
          <BsFillArrowLeftSquareFill
            size={btnSize}
            onClick={onClickLeftBtn}
            className="text-main absolute z-[99999] top-[460px] left-[-30px] cursor-pointer hover:text-active"
          />
          <BsFillArrowRightSquareFill
            size={btnSize}
            onClick={onClickRightBtn}
            className="text-main absolute z-[99999] top-[460px] right-[-30px] cursor-pointer hover:text-active"
          />
        </>
      )}
    </div>
  )
}

export default DetailSlider
