import { useAtom } from 'jotai'
import React from 'react'
import { modalState } from '../../../store/modalState'
import { Button } from '../Button'

function ModalContainer() {
  const [modal, setModal] = useAtom(modalState)

  const onClickConfirm = () => {
    modal.confirmFunc()
    setModal({ ...modal, isOpen: false })
  }
  const onClickCancel = () => {
    setModal({ ...modal, isOpen: false })
  }
  return (
    <>
      {modal.isOpen && (
        <div
          className={`absolute top-[20%] left-1/2 -translate-x-1/2 w-[250px] h-[150px] bg-[#eee] border-main border-2 rounded-md z-[999999]`}
        >
          <div className="text-main text-center text-xl font-bold my-2">{modal.title}</div>
          <div className="font-semibold my-4">{modal.content}</div>
          <div className="flex justify-center items-center my-4">
            <Button title="확인" onClick={onClickConfirm} style="" size="sm" />
            <Button title="취소" onClick={onClickCancel} style="" size="sm" />
          </div>
        </div>
      )}
    </>
  )
}

export default ModalContainer
