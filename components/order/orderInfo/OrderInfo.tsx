import React, { Dispatch, SetStateAction, useState } from 'react'
import TitleAndLine from '../../common/TitleAndLine'
import { OrderFormType } from '../types/orderFormTypes'

import OrderForm from './OrderForm'
interface PropsType {
  orderForm: OrderFormType
  setOrderForm: Dispatch<SetStateAction<OrderFormType>>
}

function OrdererInfo({ orderForm, setOrderForm }: PropsType) {
  return (
    <div className="shadow-basic rounded-md p-4 mt-[40px]">
      <TitleAndLine title="주문/배송 정보" />
      <div className="xs:w-[30%] md:w-[60%]">
        <OrderForm orderForm={orderForm} setOrderForm={setOrderForm} />
      </div>
    </div>
  )
}

export default OrdererInfo
