import { useAtom } from 'jotai'
import React from 'react'
import { modalState } from '../../../store/modalState'
import { Button } from '../Button'
import { MdInfo } from 'react-icons/md'

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
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[99999]"></div>
          <div className="fixed top-1/3 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-[#fff] shadow-basic rounded-md z-[999999]">
            <div className="flex justify-center text-2xl text-red my-4">
              <MdInfo />
            </div>
            <div className="text-center text-main text-xl font-bold my-2">{modal.title}</div>
            <div className="text-center font-semibold my-4">{modal.content}</div>
            <div className="flex justify-center items-center gap-4 my-4">
              <Button title="확인" onClick={onClickConfirm} style="bg-main text-white" />
              <Button title="취소" onClick={onClickCancel} />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ModalContainer
