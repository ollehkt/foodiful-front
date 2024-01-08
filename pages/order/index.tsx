import { useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useGetPrice } from '../../components/cart/hooks/useGetPrice'
import Container from '../../components/common/Container'
import useToast from '../../components/common/hooks/useToast'
import StrongTitle from '../../components/common/StrongTitle'

import OrderConfirm from '../../components/order/orderInfo/OrderConfirm'
import OrdererInfo from '../../components/order/orderInfo/OrderInfo'

import OrderProduct from '../../components/order/orderProduct/OrderProduct'
import { OrderFormType } from '../../components/order/types/orderFormTypes'
import { OrderProductTypes } from '../../components/order/types/orderProductTypes'

import { cartProductState } from '../../store/cartProductState'

interface OrderProductType {
  [key: string]: any
}

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
  const [orderForm, setOrderForm] = useState<OrderFormType>({
    deliverName: '',
    postalCode: '',
    deliverAddress: '',
    deliverSpecificAddress: '',
    deliverPhone: '',
    requirement: '',
    totalPrice: 0,
  })

  const [orderProduct, setOrderProduct] = useState<OrderProductTypes[]>([])
  const { getTotalPrice } = useGetPrice()

  const selectedProduct = useAtomValue(cartProductState)

  const router = useRouter()
  const { fireToast } = useToast()

  useEffect(() => {
    setOrderForm({ ...orderForm, totalPrice: getTotalPrice(selectedProduct) + 3000 })
    setOrderProduct(
      selectedProduct.map((select) => ({
        product: select.product,
        quantity: select.quantity,
        additionalCount: select.additionalCount,
      }))
    )
  }, [selectedProduct])

  // useEffect(() => {
  //   if (selectedProduct.length === 0) {
  //     fireToast({
  //       id: '주문 상품 존재하지 않음',
  //       message: ' 주문하실 상품이 존재하지 않습니다.',
  //       type: 'warning',
  //       timer: 2000,
  //       position: 'bottom',
  //     })
  //     router.push('/cart')
  //   }
  // }, [])

  return (
    <Container style="mt-[40px]">
      <StrongTitle title="주문 / 결제" />
      {/* <button onClick={onClickPayment}>결재</button> */}
      <OrderProduct selectedProduct={selectedProduct} />
      <OrdererInfo orderForm={orderForm} setOrderForm={setOrderForm} />
      <OrderConfirm orderForm={orderForm} orderProduct={orderProduct} />
    </Container>
  )
}

export default OrderPage
