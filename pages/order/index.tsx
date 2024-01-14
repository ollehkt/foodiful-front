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
import { postOrderProductState } from '../../store/postOrderProductState'

const OrderPage = () => {
  const [orderForm, setOrderForm] = useState<OrderFormType>({
    deliverName: '',
    postalCode: '',
    deliverAddress: '',
    deliverSpecificAddress: '',
    deliverPhone: '',
    requirement: '',
    totalPrice: 0,
    quantity: 0,
  })

  const orderProduct = useAtomValue(postOrderProductState)
  const { getTotalPrice } = useGetPrice()

  const router = useRouter()
  const { fireToast } = useToast()

  useEffect(() => {
    setOrderForm({ ...orderForm, totalPrice: getTotalPrice(orderProduct) + 3000 })
  }, [])

  useEffect(() => {
    if (orderProduct.length === 0) {
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

  return (
    <Container style="mt-[40px]">
      <StrongTitle title="주문 / 결제" style="border-b-2 border-main pb-2" />
      {/* <button onClick={onClickPayment}>결재</button> */}
      <OrderProduct orderProduct={orderProduct} />
      <OrdererInfo orderForm={orderForm} setOrderForm={setOrderForm} />
      <OrderConfirm orderForm={orderForm} orderProduct={orderProduct} />
    </Container>
  )
}

export default OrderPage
