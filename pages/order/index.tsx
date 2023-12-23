import { useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Container from '../../components/common/Container'
import useToast from '../../components/common/hooks/useToast'
import StrongTitle from '../../components/common/StrongTitle'
import TitleAndLine from '../../components/common/TitleAndLine'
import OrdererInfo from '../../components/order/orderInfo/OrderInfo'
import OrderItem from '../../components/order/orderProduct/OrderItem'
import OrderProduct from '../../components/order/orderProduct/OrderProduct'
import { OrderForm } from '../../components/order/types/OrderForm'
import { RequestPayParams, RequestPayResponse } from '../../portone'

import { cartProductState } from '../../store/cartProductState'

/**
 * OrderProduct 테이블에는 각 상품에 대한 정보
 *  orderCount      Int
    orderPrice      Int
    productId       Int
    orderId         Int
    additionalCount Int
 * Order에는 각 OrderProduct와 주문자 및 배송지에 대한 정보
  orderDate              DateTime // 자동   
  quantity               Int // 상품 총 개수
  userId                 Int // token
  deliverAddress         String
  deliverName            String
  requirement            String
  totalPrice             Int
  deliverPhone           String
  orderStatus            Boolean // 백에서 처리
  deliverSpecificAddress String
 */

const OrderPage = () => {
  const [orderForm, setOrderForm] = useState<OrderForm>({
    deliverName: '',
    deliverPostalCode: '',
    deliverAddress: '',
    deliverSpecificAddress: '',
    deliverPhone: '',
    requirement: '',
    totalPrice: 0,
  })
  const [orderShipForm, setOrderShipForm] = useState({})
  const selectedProduct = useAtomValue(cartProductState)
  const router = useRouter()
  const { fireToast } = useToast()
  useEffect(() => {
    if (selectedProduct.length === 0) {
      fireToast({
        id: '주문 상품 존재하지 않음',
        message: ' 주문하실 상품이 존재하지 않습니다.',
        type: 'warning',
        timer: 2000,
        position: 'bottom',
      })
      router.push('/cart')
    }
  }, [])

  const onClickPayment = () => {
    if (!window.IMP) return
    /* 1. 가맹점 식별하기 */
    const { IMP } = window
    IMP.init('imp11681327') // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    const data: RequestPayParams = {
      pg: 'html5_inicis.INIBillTst', // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
      pay_method: 'card', // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: 1000, // 결제금액
      name: '아임포트 결제 데이터 분석', // 주문명
      buyer_name: orderForm.deliverName, // 구매자 이름
      buyer_tel: orderForm.deliverPhone, // 구매자 전화번호
      buyer_email: '', // 구매자 이메일
      buyer_addr: `${orderForm.deliverAddress}${orderForm.deliverSpecificAddress}`, // 구매자 주소
      buyer_postcode: '06018', // 구매자 우편번호
    }

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback)
  }

  /* 3. 콜백 함수 정의하기 */
  function callback(response: RequestPayResponse) {
    const { success, error_msg } = response
    console.log(response)

    if (success) {
      alert('결제 성공')
    } else {
      alert(`결제 실패: ${error_msg}`)
    }
  }

  return (
    <Container style="mt-[40px]">
      <StrongTitle title="주문 / 결제" />
      <button onClick={onClickPayment}>결재</button>
      <OrderProduct selectedProduct={selectedProduct} />
      <OrdererInfo orderForm={orderForm} setOrderForm={setOrderForm} />
    </Container>
  )
}

export default OrderPage
