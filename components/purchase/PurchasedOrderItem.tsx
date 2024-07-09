import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Button } from '../common/Button'
import { GetOrderType } from '../order/types/getOrderType'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import PurchasedProductItem from './PurchasedProductItem'
import { useRouter } from 'next/router'
import { useAtomValue, useSetAtom } from 'jotai'
import { modalState } from '../../store/modalState'
import { isMobileDisplay } from '../../store/isMobileDisplay'

interface PropsType {
  order: GetOrderType
  viewArrow?: boolean
}
/**
 * TODO: 주문 취소 로직 작성
 */
function PurchasedOrderItem({ order, viewArrow }: PropsType) {
  const [orderStatus, setOrderStatus] = useState('')
  const [isDetailOpened, setIsDetailOpened] = useState(false)
  const router = useRouter()
  const setModal = useSetAtom(modalState)
  const isMobile = useAtomValue(isMobileDisplay)

  const onClickOrder = () => {
    if (!viewArrow) return
    setIsDetailOpened(!isDetailOpened)
  }

  const onClickCancelOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setModal({
      isOpen: true,
      title: '주문 취소',
      content: '주문을 취소하시겠습니까?',
      confirmFunc: () => {
        router.push(
          `/mypage/purchased/cancel?orderId=${order.id}&date=${dayjs().format('YYYY-MM-DD HH:mm')}`
        )
      },
    })
  }

  useEffect(() => {
    switch (order.orderStatus) {
      case 'SHIPPING':
        setOrderStatus('배송 중')
        break
      case 'COMPLETE':
        setOrderStatus('배송 완료')
        break
      case 'CANCEL':
        setOrderStatus('주문 취소')
        break
      default:
        setOrderStatus('배송 준비중')
        break
    }
  }, [order.orderStatus])

  return (
    <>
      <div
        className={`grid grid-cols-2 md:grid-cols-7 items-center  my-4 px-1 py-4 border-y-[#999] border-y-2 text-sm ${
          viewArrow && 'cursor-pointer'
        }`}
        onClick={onClickOrder}
      >
        <div className="hidden md:block">{dayjs(order.orderDate).format('YYYY-MM-DD HH:MM')}</div>
        <div className="">{order.id}</div>
        <div className="hidden md:block">{order.deliverName}</div>
        <div className="">{order.totalPrice.toLocaleString()}원</div>
        <div className="col-span-2 flex items-center gap-x-10 mt-5 md:mt-0 ">
          <div className="text-center break-keep ">{orderStatus}</div>
          {orderStatus !== '주문 취소' && (
            <Button
              title="주문 취소"
              size={`${isMobile && 'sm'}`}
              onClickWithEvent={onClickCancelOrder}
              style="bg-main w-20 text-white py-1"
            />
          )}
        </div>
        <span className="hidden md:block text-main text-xl font-extrabold mr-4 cursor-pointer hover:text-hover">
          {viewArrow && (isDetailOpened ? <IoIosArrowUp /> : <IoIosArrowDown />)}
        </span>
      </div>

      {isDetailOpened && (
        <div className="flex flex-col mx-auto animate-translateYDown">
          <div className="flex mx-auto w-[90%] md:w-[60%] text-[13px] md:text-sm p-2">
            <div className="grow-[5]">상품 정보</div>
            <div className="grow-[1]">상품 가격</div>
            <div className="grow-[0.5]">주문 수량(추가 상품 수량)</div>
          </div>
          {order.orderProduct.map((product) => (
            <PurchasedProductItem key={product.id} product={product} orderDate={order.orderDate} />
          ))}
        </div>
      )}
    </>
  )
}

export default PurchasedOrderItem
