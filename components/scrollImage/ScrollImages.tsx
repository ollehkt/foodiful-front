import Image from 'next/image'
import { useEffect, useState } from 'react'
import ScrollImageItem from './ScrollImageItem'

const arr = ['/photo0.jpeg', '/photo1.jpeg', '/photo2.jpeg', '/photo3.jpeg']

const ScrollImageLists = () => {
  return (
    <div>
      {arr.map((item, idx) => (
        <ScrollImageItem key={item} src={item} />
      ))}
    </div>
  )
}

export default ScrollImageLists
