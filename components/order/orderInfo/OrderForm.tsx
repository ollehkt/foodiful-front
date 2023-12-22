import React, { Dispatch, SetStateAction } from 'react'
import { Input } from '../../common/Input'
import { OrderForm } from '../types/OrderForm'

interface PropsType {
  orderForm: OrderForm
  setOrderForm: Dispatch<SetStateAction<OrderForm>>
}
/**
 * 
 * @returns 
 * <Input
        style="ml-[70px] w-[300px] outline-none py-[4px] pl-[8px]"
        labelStyle="my-[30px] text-xl"
        labelName="이메일"
        type="text"
        minLength={3}
        maxLength={10}
        value={modifyUserState.email}
        name="email"
        isDisabled={true}
        onChangeInput={onChangeInput}
        placeholder="이름을 입력해주세요"
      />
 */
function OrdererForm({ orderForm, setOrderForm }: PropsType) {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <Input
          style="ml-[70px] w-[300px] outline-none py-[4px] pl-[8px]"
          labelStyle="my-[30px] text-xl"
          labelName="이름"
          type="text"
          minLength={3}
          maxLength={10}
          value={orderForm.deliverName}
          name="deliverName"
          isDisabled={true}
          onChangeInput={setOrderForm}
          placeholder="이름을 입력해주세요"
        />
      </div>
      <div className="flex"></div>
      <div className="flex"></div>
    </div>
  )
}

export default OrdererForm
