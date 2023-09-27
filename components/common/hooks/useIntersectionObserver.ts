'use client'

import { MutableRefObject, useEffect } from 'react'

function useIntersectionObserver(
  ref: MutableRefObject<Element | null>,
  callback: (animation?: string) => void,
  threshold: number = 0.5
) {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) callback()
    }, {})

    if (ref.current) observer.observe(ref.current)

    return () => observer && observer.disconnect()
  }, [callback, ref])
}

export default useIntersectionObserver
