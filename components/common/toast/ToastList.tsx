import { useAtomValue } from 'jotai'
import { toast } from '../../../store/toastState'
import ToastItem from './ToastItem'

const ToastList = () => {
  const toasts = useAtomValue(toast)

  return (
    <div className="bottom-0 left-0 fixed z-[999999]">
      {!!toasts.length && toasts.map((toast) => <ToastItem key={toast.id} {...toast} />)}
    </div>
  )
}

export default ToastList
