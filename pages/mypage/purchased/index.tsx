import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Container from '../../../components/common/Container'
import useToast from '../../../components/common/hooks/useToast'
import StrongTitle from '../../../components/common/StrongTitle'
import { useGetOrder } from '../../../components/order/hooks/useOrder'
import PurchasedOrderItem from '../../../components/purchase/PurchasedOrderItem'
import PurchasedTitle from '../../../components/purchase/PurchasedTitle'
import { getStoredUser } from '../../../components/util/userStorage'
import { getMyPageLayout } from '../getMyPageLayout'

const MyPagePurchased = () => {
  const router = useRouter()
  const { fireToast } = useToast()

  const { data: orderList } = useGetOrder()

  useEffect(() => {
    const user = getStoredUser()
    if (!user) {
      fireToast({
        id: '장바구니 접속 실패',
        type: 'failed',
        message: '로그인 후에 이용해주세요.',
        timer: 1500,
        position: 'bottom',
      })
      router.push('/auth')
    }
  }, [])

  return (
    <Container style="">
      <StrongTitle title="상품 구매내역" style="pb-4 border-b-2 border-main" />
      <PurchasedTitle />
      {!!orderList.length &&
        orderList.map((order) => (
          <PurchasedOrderItem key={order.id} order={order} viewArrow={true} />
        ))}
    </Container>
  )
}
MyPagePurchased.getLayout = getMyPageLayout

export default MyPagePurchased
