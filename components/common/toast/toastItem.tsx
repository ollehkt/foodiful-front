import { useEffect, useState } from 'react'
import { Toast } from '../../../store/toastState'
import { IoWarningOutline, IoWarning } from 'react-icons/io5'
import { SlCheck } from 'react-icons/sl'

const ToastItem = ({ message, type, timer, position }: Toast) => {
  const [viewToast, setViewToast] = useState(true)

  useEffect(() => {
    const flag = setTimeout(() => {
      setViewToast(false)
    }, timer)
    return () => {
      clearTimeout(flag)
    }
  }, [])

  return (
    <div
      className={`overflow-hidden h-24 w-[600px] fixed bottom-0 left-1/2 -translate-x-1/2 z-[999999]
      ${position === 'bottom' && 'bottom-4'}
      ${position === 'top' && 'top-4'}`}
    >
      {viewToast && type == 'warning' && (
        <div
          className={`w-60 mx-auto text-sm bg-[#f1d732] rounded-md   
          ${position === 'bottom' && 'animate-toast'}
          ${position === 'top' && 'animate-drop'}`}
        >
          <div className=" flex justify-center items-cente">
            <IoWarningOutline size={25} color="white" />
            <p className="text-[white] opacity-90 text-lg mx-2">WARNING!</p>
          </div>

          <div className="p-3 break-words text-[white] text-center">{message}</div>
        </div>
      )}
      {viewToast && type == 'failed' && (
        <div
          className={`w-60 mx-auto text-sm bg-[#ee2222] rounded-md
          ${position === 'bottom' && 'animate-toast'}
          ${position === 'top' && 'animate-drop'}`}
        >
          <div className=" flex justify-center items-center rounded-t-lg">
            <IoWarning size={25} color="white" />
            <p className="text-[white] opacity-90 text-lg mx-2">FAILED!</p>
          </div>

          <div className="p-3 break-words text-[white] text-center">{message}</div>
        </div>
      )}
      {viewToast && type == 'success' && (
        <div
          className={`w-60 mx-auto text-sm bg-[#00a120] rounded-md
          ${position === 'bottom' && 'animate-toast'}
          ${position === 'top' && 'animate-drop'}`}
        >
          <div className=" flex justify-center items-center">
            <SlCheck size={24} color="white" />
            <p className="text-[white] opacity-90 text-lg mx-2">SUCCESS!</p>
          </div>

          <div className="p-3 break-words text-[white] text-center">{message}</div>
        </div>
      )}
      {viewToast && type == 'notice' && (
        <div
          className={`w-60 mx-auto text-sm bg-main rounded-md   
          ${position === 'bottom' && 'animate-toast'}
          ${position === 'top' && 'animate-drop'}`}
        >
          <div className=" flex justify-center items-cente">
            <IoWarningOutline size={25} color="white" />
            <p className="text-[white] opacity-90 text-lg mx-2">NOTICE!</p>
          </div>

          <div className="p-3 break-words text-[white] text-center">{message}</div>
        </div>
      )}
    </div>
  )
}

export default ToastItem
