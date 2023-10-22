import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import useToast from './hooks/useToast'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
interface PropsType {
  amount: number
  setAmount: Dispatch<SetStateAction<number>>
  limit: number
}

const AmountCounter = ({ amount, setAmount, limit }: PropsType) => {
  const { fireToast } = useToast()
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget

    if (Number(value) <= 1) {
      fireToast({
        id: '최소 수량 미만',
        position: 'bottom',
        timer: 1000,
        message: '최소 주문 수량은 1개입니다.',
        type: 'failed',
      })
    }
    if (Number(value) >= limit) {
      fireToast({
        id: '제한 수량 초과',
        position: 'bottom',
        timer: 1000,
        message: '제한 수량이 초과되었습니다.',
        type: 'failed',
      })
      return
    }
    setAmount(parseInt(value))
  }

  const onClickPlus = () => {
    if (amount >= limit) {
      fireToast({
        id: '제한 수량 초과',
        position: 'bottom',
        timer: 1000,
        message: '제한 수량이 초과되었습니다.',
        type: 'failed',
      })
      return
    }
    setAmount((amount) => amount + 1)
  }

  const onClickMinus = () => {
    if (amount <= 1) return
    setAmount((amount) => amount - 1)
  }

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    if (Number(value) === 0) {
      fireToast({
        id: '최소 수량 미만',
        position: 'bottom',
        timer: 1000,
        message: '최소 주문 수량은 1개입니다.',
        type: 'failed',
      })
      setAmount(1)
    }
  }
  return (
    <div className="flex items-center mt-[10px]">
      <div
        className={`w-[34px] h-[34px]  border rounded-md flex justify-center items-center  ${
          amount === 1 ? 'cursor-not-allowed' : 'cursor-pointer hover:text-[white] hover:bg-main'
        }`}
        onClick={onClickMinus}
      >
        <span className={`text-lg`}>
          <AiOutlineMinus size={18} />
        </span>
      </div>
      <div className="flex justify-center items-center text-center">
        <input
          className="w-[40px] h-[34px] mx-[4px] text-center"
          type="number"
          min={1}
          value={amount}
          onChange={onChangeInput}
          onBlur={onBlur}
        />
      </div>
      <div
        className={`w-[34px] h-[34px] border rounded-md flex justify-center items-center ${
          amount === limit
            ? 'cursor-not-allowed'
            : 'cursor-pointer hover:text-[white] hover:bg-main'
        }`}
        onClick={onClickPlus}
      >
        <span className={`text-lg`}>
          <AiOutlinePlus size={18} />
        </span>
      </div>
    </div>
  )
}

export default AmountCounter
