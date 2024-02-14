import Image from 'next/image'
import React from 'react'
import { RefundType } from './refundTypes'

interface PropsType {
  refundList: RefundType[]
}

const RefundList = ({ refundList }: PropsType) => {
  return (
    <div className="grid grid-cols-4">
      <div className="w-full col-span-4 grid grid-cols-4 border-b-2 ">
        <div>주문 ID</div>
        <div>주문 일자</div>
        <div>주문 상품</div>
        <div>환불 사유</div>
      </div>
      {refundList.map(({ orderId, refundAt, refundReason, products }) => (
        <ul
          key={orderId}
          className="col-span-4 grid grid-cols-4 shadow-basic my-2 p-1 items-center"
        >
          <div>{orderId}</div>
          <div>{new Date(refundAt).toLocaleString()}</div>
          <div className="flex flex-col">
            {products.map((product) => (
              <div key={product.productId} className="flex items-center gap-x-1 m-1">
                <Image
                  src={product.descImg}
                  alt="product-image"
                  width={80}
                  height={80}
                  className="w-[80px] h-[80px] rounded-md"
                />
                <div className="flex flex-col">
                  <div>{product.name}</div>
                  <div className="flex items-center gap-x-1">
                    <div>{product.count}</div>
                    <div>({product.additionalCount})</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>{refundReason}</div>
        </ul>
      ))}
    </div>
  )
}

export default RefundList
