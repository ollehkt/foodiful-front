import { useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { toast } from '../../store/toastState'
import ToastItem from '../common/toast/toastItem'

export interface ToastProps {
  timer: number
  content: string
  type: string
}

const useToast = ({ timer, content, type }: ToastProps) => {
  
  const setToastValue = useSetAtom(toast)
  setToastValue({ content, type, timer })

  const removeToast = () => {}
  const fireToast = (toast: ToastProps) => {

  }

  return {}
}

export default useToast
