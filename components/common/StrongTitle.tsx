import React, { RefObject, useCallback, useRef } from 'react'
import useIntersectionObserver from './hooks/useIntersectionObserver'

interface PropsType {
  refProp?: RefObject<HTMLDivElement>
  title: string
  style?: string
}

const StrongTitle = ({ title, style }: PropsType) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const addAnimate = useCallback(() => {
    if (ref.current) ref.current.classList.add('animate-translateUp')
  }, [])

  useIntersectionObserver(ref, addAnimate)
  return (
    <div ref={ref} className={`text-4xl font-extrabold ${style}`}>
      {title}
    </div>
  )
}

export default StrongTitle
