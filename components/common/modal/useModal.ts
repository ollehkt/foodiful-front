import { useAtom } from 'jotai'
import { modalState } from '../../../store/modalState'

export const useModal = () => {
  const [modal, setModal] = useAtom(modalState)

  const openModal = () => {
    setModal({ ...modal, isOpen: true })
  }
  const closeModal = () => {
    setModal({ ...modal, isOpen: false })
  }

  const setTitle = (newTitle: string) => {
    setModal({ ...modal, title: newTitle })
  }
  const setContent = (newContent: JSX.Element | string) => {
    setModal({ ...modal, content: newContent })
  }

  return { openModal, closeModal, setTitle, setContent }
}
