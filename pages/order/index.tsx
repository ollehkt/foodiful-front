import { useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useGetPrice } from '../../components/cart/hooks/useGetPrice'
import Container from '../../components/common/Container'
import useToast from '../../components/common/hooks/useToast'
import StrongTitle from '../../components/common/StrongTitle'
import OrderConfirm from '../../components/order/orderInfo/OrderConfirm'
import OrdererInfo from '../../components/order/orderInfo/OrderInfo'
import OrderProduct from '../../components/order/orderProduct/OrderProduct'
import { OrderFormType } from '../../components/order/types/orderFormTypes'
import { postOrderProductState } from '../../store/postOrderProductState'
import { getStoredUser } from '../../components/util/userStorage'
import { useUser } from '../../components/auth/hooks/useUser'

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
  const { getUser } = useUser()
  const router = useRouter()
  const { fireToast } = useToast()

  useEffect(() => {
    ;(async () => {
      const storedUser = getStoredUser()
      if (storedUser) {
        const fetchedUser = await getUser(storedUser)
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
        setOrderForm({ ...orderForm, totalPrice: getTotalPrice(orderProduct) + 3000 })

        if (!fetchedUser) {
          router.push('/auth')
        }
      } else {
        router.push('/auth')
      }
    })()
  }, [])

  return (
    <Container style="mt-[40px]">
      <p className="text-3xl text-center mt-4">현재 개발중인 웹 사이트 입니다.</p>
      <StrongTitle title="주문 / 결제" style="border-b-2 border-main pb-2" />
      <OrderProduct orderProduct={orderProduct} />
      <OrdererInfo orderForm={orderForm} setOrderForm={setOrderForm} />
      <OrderConfirm orderForm={orderForm} orderProduct={orderProduct} />
    </Container>
  )
}

export default OrderPage
