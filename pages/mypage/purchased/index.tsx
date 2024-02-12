import Link from 'next/link'
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
    <section className="grow flex-col items-center px-5">
      <StrongTitle title="상품 구매내역" style="border-b-2 border-main pb-2" />
      {!!orderList.length ? (
        <>
          <PurchasedTitle />
          {orderList.map((order) => (
            <PurchasedOrderItem key={order.id} order={order} viewArrow={true} />
          ))}
        </>
      ) : (
        <div className="w-full flex flex-col items-center text-2xl font-bold my-10">
          <div>주문 내역이 없습니다.</div>

          <Link className="text-main hover:text-hover mt-10" href="/product">
            상품 주문하러 가기
          </Link>
        </div>
      )}
    </section>
  )
}
MyPagePurchased.getLayout = getMyPageLayout

export default MyPagePurchased
