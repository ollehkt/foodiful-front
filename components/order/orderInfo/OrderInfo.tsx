import React, { Dispatch, SetStateAction, useState } from 'react'
import TitleAndLine from '../../common/TitleAndLine'
import { OrderForm } from '../types/OrderForm'
interface PropsType {
  orderForm: OrderForm
  setOrderForm: Dispatch<SetStateAction<OrderForm>>
}

function OrdererInfo({ orderForm, setOrderForm }: PropsType) {
  return (
    <div className="shadow-basic rounded-md p-4 mt-[40px]">
      <TitleAndLine title="주문/배송 정보" />
    </div>
  )
}

export default OrdererInfo
