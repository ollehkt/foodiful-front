import { useRef } from 'react'

export const useAddAnimation = () => {
  const ref = useRef<HTMLElement>(null)
  const addAnimation = (animation: string): void => {
    if (ref.current) ref.current.classList.add(`animate-${animation}`)
  }
  return { ref, addAnimation }
}
/**
 * ref와 addAnimation 함수가 반복 되어서 훅으로 분리하려 했지만 ref에 대한 타입 에러
 */
