import React, { useCallback, useRef } from 'react'
import useIntersectionObserver from '../common/hooks/useIntersectionObserver'
import StrongTitle from '../common/StrongTitle'

const IntroducePortfolio = () => {
  const ref = useRef<HTMLDivElement>(null)

  const addAnimation = useCallback(() => {
    if (ref.current) ref.current.classList.add('animate-translateUp')
  }, [])

  useIntersectionObserver(ref, addAnimation)

  return (
    <div>
      <StrongTitle title="푸디풀 이력" />
      <div></div>
    </div>
  )
}

export default IntroducePortfolio
