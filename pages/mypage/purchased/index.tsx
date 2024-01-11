import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Container from '../../../components/common/Container'
import useToast from '../../../components/common/hooks/useToast'
import StrongTitle from '../../../components/common/StrongTitle'
import { useGetOrderByUserId } from '../../../components/order/hooks/useOrder'
import { GetOrderType } from '../../../components/order/types/getOrderType'

import PurchasedOrderItem from '../../../components/purchase/PurchasedOrderItem'
import { getStoredUser } from '../../../components/util/userStorage'
import { getMyPageLayout } from '../getMyPageLayout'

/**
 * orderDate: '2024-01-10T06:18:40.676Z'
  quantity: 1
  userId: 1
  id: 'mid_1704867520649'
  deliverAddress: '경기 남양주시 평내로 136'
  deliverName: '이경택'
  requirement: ''
  totalPrice: 283000
  deliverPhone: '01076704421'
  orderStatus: 'PROCEEDING'
  deliverSpecificAddress: '1111'
  postalCode: '12221'
  orderProduct: [{
      id: 6
      orderCount: 5
      orderPrice: 55000
      productId: 1
      orderId: 'mid_1704867520649'
      additionalCount: 1
      product: {
        name: '수제양갱'
        price: 55000
        discount: 0
        description: '<h2><img src="https://kt-first-bucket.s3.ap-northeast-2.amazonaws.com/product/d7f5272d-8730-4aa8-8645-7eb482a675eb.jpeg" alt="업로드 된 이미지" contenteditable="false"><img src="https://kt-first-bucket.s3.ap-northeast-2.amazonaws.com/product/c309761c-fe77-41a8-a4ad-42b450732211.jpeg" alt="업로드 된 이미지" contenteditable="false"><img src="https://kt-first-bucket.s3.ap-northeast-2.amazonaws.com/product/6c46a6ce-ac98-4395-8d36-d06235e95f24.jpeg" alt="업로드 된 이미지" contenteditable="false"><img src="https://kt-first-bucket.s3.ap-northeast-2.amazonaws.com/product/7d2f97cd-f807-495f-a8f3-83e9bccbb5db.jpeg" alt="업로드 된 이미지" contenteditable="false"><strong>* 모든 제품은 주문 후 제작 됩니다.</strong></h2><h3><strong><span style="color: #dc9656">* 제품은 주문 하신 후 7일 이내에 발송됩니다.</span></strong></h3><h3><strong><span style="color: #f7ca88">원하시는 수령 날짜가 따로 있으실 경우, 톡톡 또는 카카오채널 "푸디풀"로</span></strong></h3><h3><strong><span style="color: #f7ca88">주문하신 성함, 상품, 원하시는 수령날짜를 말씀해주세요.</span> <span style="color: #ff0000">(날짜 최소 3~7일 전 주문 주세요)</span></strong></h3><h3><strong><span style="color: #ae258e">* 보자기 포장은 수국매듭으로, 색상과 노리개는 랜덤입니다!<img src="https://kt-first-bucket.s3.ap-northeast-2.amazonaws.com/product/7b64747f-ff94-4729-ba51-a363b486baef.jpeg" alt="업로드 된 이미지" contenteditable="false"><img src="https://kt-first-bucket.s3.ap-northeast-2.amazonaws.com/product/90ec0461-5a1e-42ad-9c45-e34cb55258e2.jpeg" alt="업로드 된 이미지" contenteditable="false"><img src="https://kt-first-bucket.s3.ap-northeast-2.amazonaws.com/product/474f81a2-f073-4ddb-94bc-1cde6bc615f1.jpeg" alt="업로드 된 이미지" contenteditable="false"><img src="https://kt-first-bucket.s3.ap-northeast-2.amazonaws.com/product/a8e8d8ff-439d-4a3b-9c99-f417d563adf9.jpeg" alt="업로드 된 이미지" contenteditable="false"></span></strong><br></h3>'
        descImg: [
          'https://kt-first-bucket.s3.ap-northeast-2.amazonaws.com/product/41344e77-86d8-4af8-890c-c3de4aedaafe.jpeg',
          'https://kt-first-bucket.s3.ap-northeast-2.amazonaws.com/product/2ca7d112-6393-419e-8d05-0121489e5e3f.jpeg',
          'https://kt-first-bucket.s3.ap-northeast-2.amazonaws.com/product/b14e8ae0-4263-4a2f-9362-435293bde868.jpeg',
          'https://kt-first-bucket.s3.ap-northeast-2.amazonaws.com/product/856c0016-3225-45ef-b62a-77587855f302.jpeg',
          'https://kt-first-bucket.s3.ap-northeast-2.amazonaws.com/product/02a0e864-12ec-43bd-8657-44024679c23a.jpeg',
          'https://kt-first-bucket.s3.ap-northeast-2.amazonaws.com/product/3d0324cd-e018-4cf7-b818-c4bfda594c84.jpeg',
          'https://kt-first-bucket.s3.ap-northeast-2.amazonaws.com/product/29410819-5d5f-492e-ad32-323cd9014da9.jpeg'
        ]
        deliver: false
        categories: ['한식 디저트']
        id: 1
        subTitle: '명절선물 집들이선물 상견례선물로 좋은 양갱 양갱 양갱세트 양갱선물세트 수제양갱선물 '
        limitQuantity: 10
      }}]
 */
const MyPagePurchased = () => {
  const router = useRouter()
  const { fireToast } = useToast()

  const { data: orderList } = useGetOrderByUserId()

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
      <div className="flex items-center justify-between px-1 mt-3 text-sm text-textDisabled">
        <div className="hidden md:block md:grow-[1.5]">주문 일자</div>
        <div className="md:grow-[1.6]">주문 번호</div>
        <div className="hidden md:block md:grow-[0.7]">주문자 성함</div>
        <div className="md:grow-[1]">주문 가격</div>
        <div className="mr-8 md:mr-0 md:grow-[0.9]">주문 현황</div>
        <div className="hidden md:block md:grow-[1.5]"></div>
      </div>
      {!!orderList.length &&
        orderList.map((order) => <PurchasedOrderItem key={order.id} order={order} />)}
    </Container>
  )
}
MyPagePurchased.getLayout = getMyPageLayout

export default MyPagePurchased
