import Image from 'next/image'
import React from 'react'
import RefundItem from './RefundItem'
import { RefundType } from './refundTypes'

interface PropsType {
  refundList: RefundType[]
}

const RefundList = ({ refundList }: PropsType) => {
  return (
    <div className="border-b-2 my-4">
      {refundList.map(({ orderId, ...data }) => (
        <RefundItem key={orderId} refundItem={{ ...data, orderId }} />
      ))}
    </div>
  )
}

export default RefundList
