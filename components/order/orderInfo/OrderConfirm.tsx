import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React from 'react'
import { RequestPayParams, RequestPayResponse } from '../../../portone'
import { Button } from '../../common/Button'
import useToast from '../../common/hooks/useToast'
import { usePostOrder } from '../hooks/useOrder'
import { OrderFormType } from '../types/orderFormTypes'
import { PostOrderProductTypes } from '../types/postOrderProductTypes'

interface PropsType {
  orderForm: OrderFormType
  orderProduct: PostOrderProductTypes[]
}

function OrderConfirm({ orderForm, orderProduct }: PropsType) {
  const { mutate: postOrder } = usePostOrder()
  const { fireToast } = useToast()
  const router = useRouter()
  const onClickPayment = () => {
    if (!window.IMP) return
    const { deliverName, deliverAddress, deliverPhone } = orderForm
    if (!deliverName || !deliverAddress || !deliverPhone) {
      fireToast({
        id: '폼 미 입력',
        type: 'failed',
        position: 'bottom',
        timer: 2000,
        message: '주문/배송 필수 정보를 입력해주세요',
      })
      return
    }

    /* 1. 가맹점 식별하기 */
    const { IMP } = window
    IMP.init('imp11681327') // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    const data: RequestPayParams = {
      pg: 'html5_inicis.INIBillTst', // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
      pay_method: 'card', // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: 10, // 결제금액
      name:
        orderProduct.length > 1
          ? `${orderProduct[0].product.name} 외 ${orderProduct.length}`
          : orderProduct[0].product.name, // 주문명
      buyer_name: orderForm.deliverName, // 구매자 이름
      buyer_tel: orderForm.deliverPhone, // 구매자 전화번호
      buyer_email: '', // 구매자 이메일
      buyer_addr: `${orderForm.deliverAddress}${orderForm.deliverSpecificAddress}`, // 구매자 주소
      buyer_postcode: orderForm.postalCode, // 구매자 우편번호
    }
    postOrder({ orderForm: { ...orderForm, id: data.merchant_uid }, orderProduct })
    router.push(`/order/confirm?id=${data.merchant_uid}&date=${dayjs().format('YYYY-MM-DD HH:mm')}`)
    /* 4. 결제 창 호출하기 */
    // IMP.request_pay(data, callback)
  }

  /* 3. 콜백 함수 정의하기 */
  function callback(response: RequestPayResponse) {
    const { success, error_msg } = response

    if (success) {
      alert('결제 성공')
      postOrder({ orderForm: { ...orderForm, id: response.merchant_uid }, orderProduct })
      // 카트에서 주문한 상품과 id같으면 삭제
      router.push(`/order/confirm?id=${response.merchant_uid}`)
    } else {
      alert(`결제 실패: ${error_msg}`)
    }
  }

  return (
    <div className=" md:w-[40%] mt-[40px] mx-auto shadow-basic rounded-md flex flex-col items-center gap-4">
      <div className="font-bold text-lg text-main my-[20px]">총 주문금액</div>
      <div className="w-[60%] flex justify-between items-center">
        <div>총 상품금액</div>
        <div>
          <span className="text-main text-bold">{orderForm.totalPrice.toLocaleString()}</span>원
        </div>
      </div>
      <div className="w-[60%] flex justify-between items-center">
        <div>배송비</div>
        <div>
          <span className="text-main text-bold">3,000</span>원
        </div>
      </div>

      <Button
        title="결제하기"
        onClick={onClickPayment}
        style="my-4 bg-main text-[white]"
        size="lg"
      />
    </div>
  )
}

export default OrderConfirm
