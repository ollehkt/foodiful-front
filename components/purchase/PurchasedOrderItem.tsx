import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Button } from '../common/Button'
import { GetOrderType } from '../order/types/getOrderType'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import PurchasedProductItem from './PurchasedProductItem'

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

  const onClickOrder = () => {
    if (!viewArrow) return
    setIsDetailOpened(!isDetailOpened)
  }

  const onClickCancelOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
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
        className={`flex items-center justify-between my-4 px-1 py-4 border-y-[#999] border-y-2 text-sm ${
          viewArrow && 'cursor-pointer'
        }`}
        onClick={onClickOrder}
      >
        <div className="hidden md:block md:grow-[0.7]">
          {dayjs(order.orderDate).format('YYYY-MM-DD HH:MM')}
        </div>
        <div className="md:grow-[0.8]">{order.id}</div>
        <div className="hidden md:block md:grow-[0.8]">{order.deliverName}</div>
        <div className="md:grow-[0.8]">{order.totalPrice.toLocaleString()}원</div>
        <div className="md:flex md:items-center md:grow-[0.4] md:gap-8">
          <div className="text-center">{orderStatus}</div>
          <div className="mt-2 md:mt-0">
            <Button
              title="주문 취소"
              onClickWithEvent={onClickCancelOrder}
              style="bg-main text-white"
              size="sm"
            />
          </div>
        </div>
        <span className="text-main text-xl font-extrabold mr-4 cursor-pointer hover:text-hover">
          {viewArrow && (isDetailOpened ? <IoIosArrowUp /> : <IoIosArrowDown />)}
        </span>
      </div>
      {isDetailOpened && (
        <div className="flex flex-col mx-auto">
          <div className="flex mx-auto w-[90%] md:w-[60%] text-[13px] md:text-sm p-2">
            <div className="grow-[5]">상품 정보</div>
            <div className="grow-[1]">상품 가격</div>
            <div className="grow-[0.5]">주문 수량(추가 상품 수량)</div>
          </div>
          {order.orderProduct.map((product) => (
            <PurchasedProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  )
}

export default PurchasedOrderItem
