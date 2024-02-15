import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { RefundType } from './refundTypes'

export default function RefundItem({ refundItem }: { refundItem: RefundType }) {
  const { orderId, refundAt, refundReason, products, status } = refundItem
  const [refundStatus, setRefundStatus] = useState('환불 중')
  useEffect(() => {
    if (status === 'COMPLETE') setRefundStatus('환불 완료')
    else setRefundStatus('환불중')
  }, [status])
  return (
    <>
      <div className="flex border-t-2 py-2 gap-x-2 md:gap-x-4 text-sm">
        <div>주문 ID</div> <div className="text-textDisabled">{orderId}</div>
        <div>주문 일자</div>
        <div className="text-textDisabled">{new Date(refundAt).toLocaleDateString()}</div>
      </div>
      <div className="flex items-center gap-x-2 border-t-2 py-3 ">
        <div className="flex flex-col">
          <div>상품 정보</div>
          <div>구매 수량</div>
          <div className="text-sm">(추가 상품)</div>
        </div>
        <div className="flex flex-col">
          {products.map((product) => (
            <div key={product.productId} className="flex items-center gap-x-3 m-1">
              <Image
                src={product.descImg}
                alt="product-image"
                width={80}
                height={80}
                className="w-[80px] h-[80px] rounded-md"
              />
              <div className="flex flex-col">
                <div>{product.name}</div>
                <div>{product.count}개</div>
                <div className="text-sm">({product.additionalCount})개</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <div>환불 사유</div>
        <div className="text-textDisabled">{refundReason}</div>
      </div>
      <div className="flex items-center gap-x-2 mt-3 mb-4">
        <div className="">환불 현황</div>
        <div className="text-main font-semibold">{refundStatus}</div>
      </div>
    </>
  )
}
