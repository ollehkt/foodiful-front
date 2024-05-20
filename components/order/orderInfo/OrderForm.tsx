import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { KakaoAddr } from '../../../daum'
import { Button } from '../../common/Button'
import { Input } from '../../common/Input'
import { OrderFormType } from '../types/orderFormTypes'

interface PropsType {
  orderForm: OrderFormType
  setOrderForm: Dispatch<SetStateAction<OrderFormType>>
}

function OrderForm({ orderForm, setOrderForm }: PropsType) {
  const [phoneNum, setPhoneNum] = useState({
    '1st': '',
    '2nd': '',
    '3rd': '',
  })
  const onChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget
    setOrderForm({ ...orderForm, [name]: value })
  }

  const onChangePhoneNum = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setPhoneNum({ ...phoneNum, [name]: value })
  }

  useEffect(() => {
    setOrderForm({ ...orderForm, deliverPhone: Object.values(phoneNum).join('') })
  }, [phoneNum])

  const onClickSearchAddress = () => {
    new window.daum.Postcode({
      onComplete: (data: KakaoAddr) => {
        setOrderForm({
          ...orderForm,
          deliverAddress: data.address,
          postalCode: data.zonecode,
        })
      },
    }).open()
  }

  /**
   * user 불러와서 이름, 전화번호 채워놓기
   */
  return (
    <div className="flex flex-col">
      <Input
        style="ml-[20px] lg:ml-[110px] py-[4px] pl-[8px] rounded-md border-disabled border-2 focus:outline-main"
        labelStyle="my-[30px] text-lg"
        labelName="이름*"
        type="text"
        minLength={3}
        maxLength={10}
        value={orderForm.deliverName}
        name="deliverName"
        onChangeInput={onChangeInput}
        placeholder="이름을 입력해주세요"
      />

      <div className="flex flex-col lg:flex-row justify-center lg:items-center lg:justify-start">
        <Input
          style="mt-[10px] lg:mt-0 ml-[12px] lg:ml-[110px] py-[4px] pl-[8px] rounded-md border-disabled border-2 focus:outline-main"
          labelStyle="my-[20px] text-lg"
          labelName="주소*"
          type="text"
          minLength={3}
          maxLength={10}
          value={orderForm.postalCode}
          name="postalCode"
          onChangeInput={onChangeInput}
          placeholder="우편번호를 입력해주세요"
        />
        <Button
          title="우편번호 검색"
          onClick={onClickSearchAddress}
          size="md"
          style="bg-main text-white ml-[54px] lg:ml-7"
        />
      </div>
      <div className="flex flex-col ml-[54px] mt-[20px] lg:mt-0 lg:ml-[152px]">
        <Input
          style="w-full py-[4px] pl-[8px] rounded-md border-disabled border-2 focus:outline-main "
          type="text"
          minLength={3}
          maxLength={10}
          value={orderForm.deliverAddress}
          name="deliverAddress"
          onChangeInput={onChangeInput}
          placeholder=""
        />

        <Input
          style="w-full py-[4px] pl-[8px] rounded-md border-disabled border-2 focus:outline-main"
          labelStyle="mt-[20px] mb-[30px]"
          type="text"
          minLength={3}
          maxLength={10}
          value={orderForm.deliverSpecificAddress}
          name="deliverSpecificAddress"
          onChangeInput={onChangeInput}
          placeholder="상세주소를 입력해주세요"
        />
      </div>
      <div className="flex items-center w-full mb-4">
        <span className="break-keep whitespace-nowrap text-lg">휴대폰*</span>
        <input
          className="w-[50px] h-10 ml-2 md:ml-[94px] rounded-md border-disabled border-2 focus:outline-main"
          type="text"
          name="1st"
          minLength={3}
          maxLength={10}
          value={phoneNum['1st']}
          onChange={onChangePhoneNum}
        />
        {/* <Input
          style="ml-2 lg:ml-[92px] lg:w-[15%] py-[4px] rounded-md border-disabled border-2 focus:outline-main"
          labelStyle="my-[30px] w-[120px] text-lg  lg:mr-[-150px]"
          labelName="휴대폰*"
          type="text"
          minLength={3}
          maxLength={10}
          value={phoneNum['1st']}
          name="1st"
          onChangeInput={onChangePhoneNum}
          placeholder=""
        /> */}
        <div className="mx-3 text-2xl font-bold pb-2">-</div>
        <Input
          style="w-[60px] md:w-[60px] py-1 rounded-md border-disabled border-2 focus:outline-main"
          labelStyle="w-min"
          type="text"
          minLength={3}
          maxLength={10}
          value={phoneNum['2nd']}
          name="2nd"
          onChangeInput={onChangePhoneNum}
          placeholder=""
        />
        <div className="mx-3 text-2xl font-bold pb-2">-</div>
        <Input
          style="w-[60px] py-[4px]  rounded-md border-disabled border-2 focus:outline-main"
          labelStyle="w-min"
          type="text"
          minLength={3}
          maxLength={10}
          value={phoneNum['3rd']}
          name="3rd"
          onChangeInput={onChangePhoneNum}
          placeholder=""
        />
      </div>
      <label className="flex ml-[-4px] lg:ml-0 break-keep text-lg">
        요구사항
        <textarea
          className="p-1 resize-none border-2 border-disabled rounded-md ml-2 md:ml-[86px] h-[100px]"
          name="requirement"
          cols={35}
          rows={10}
          value={orderForm.requirement}
          placeholder="택배사에 전달되는 요구사항입니다."
          onChange={onChangeInput}
        />
      </label>
    </div>
  )
}

export default OrderForm
