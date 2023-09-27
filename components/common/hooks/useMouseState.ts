import { useRef, useState } from 'react'

const useMouseState = () => {
  const mouseRef = useRef(null)

  const [isMouseOver, setIsMouseOver] = useState<boolean>(false)

  const handleMouseOver = () => {
    setIsMouseOver(true)
  }
  const handleMouseLeave = () => {
    setIsMouseOver(false)
  }
  return [mouseRef, isMouseOver, handleMouseOver, handleMouseLeave] as const
}
export default useMouseState
