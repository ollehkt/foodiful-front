import { useAtom } from 'jotai'
import { Toast, toast } from '../../../store/toastState'
import { getRandomId } from '../../util/getRandomId'

const useToast = () => {
  const [toastValue, setToastValue] = useAtom(toast)

  const removeToast = (toastId: Toast['id']) => {
    setToastValue((prev) => prev.filter((toast) => toast.id === toastId))
  }

  const fireToast = (toast: Toast) => {
    setToastValue((prev) => [...prev, { ...toast, id: getRandomId() }])
    setTimeout(() => removeToast(toast.id), 600 + (toast.timer ?? 1000))
  }

  return { toastValue, fireToast }
}

export default useToast
