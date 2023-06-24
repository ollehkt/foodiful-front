import { useEffect, useState } from 'react'
import { ToastProps } from '../../hooks/useToast'

const ToastItem = ({ content, type, timer }: { content: string; type: string; timer: number }) => {
  const [viewToast, setViewToast] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setViewToast(false)
    }, timer)
  }, [])
  return (
    <>
      {viewToast && (
        <>
          {type === 'warning' && (
            <span className="bg-[#d4b91e] bg-opacity-5">
              <span>{content}</span>
            </span>
          )}
        </>
      )}
    </>
  )
}

export default ToastItem
