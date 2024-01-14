import { atom } from 'jotai'
import React from 'react'

interface ModalType {
  isOpen: boolean
  title: string
  content: JSX.Element | string
  confirmFunc: () => void
}

export const modalState = atom<ModalType>({
  isOpen: false,
  title: '',
  content: '',
  confirmFunc: () => {},
})
