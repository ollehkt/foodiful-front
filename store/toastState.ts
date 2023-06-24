import { atom } from 'jotai'
import { ToastProps } from '../components/hooks/useToast'

export const toast = atom<{ content: string; type: string; timer: number }>({
  type: '',
  content: '',
  timer: 0,
})
