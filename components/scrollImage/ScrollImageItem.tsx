import Image from 'next/image'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Fade } from 'react-awesome-reveal'
interface PropsType {
  src: string
}

const ScrollImageItem = ({ src }: PropsType) => {
  return (
    <Fade>
      <div className={`relative h-screen z-[99]`}>
        <button className="absolute z-[99]">구매하기</button>

        <Image src={src} alt="image" layout="fill" />
      </div>
    </Fade>
  )
}

export default ScrollImageItem
