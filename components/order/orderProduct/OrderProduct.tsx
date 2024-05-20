import React from 'react'
import TitleAndLine from '../../common/TitleAndLine'
import { PostOrderProductTypes } from '../types/postOrderProductTypes'
import OrderItem from './OrderItem'

function OrderProduct({ orderProduct }: { orderProduct: PostOrderProductTypes[] }) {
  return (
    <div className="shadow-basic rounded-md p-4 mt-[40px]">
      <TitleAndLine title="주문 상품" />
      <div className="">
        <div className="flex justify-between items-center my-[20px] px-2">
          <div className="grow-[5] text-textDisabled">상품명</div>
          <div className="grow-[1.8] text-textDisabled">수량</div>
          <div className="text-textDisabled">판매가</div>
        </div>
        {!!orderProduct.length &&
          orderProduct.map((product) => (
            <OrderItem
              key={product.product.id}
              product={product.product}
              quantity={product.quantity}
            />
          ))}
      </div>
    </div>
  )
}

export default OrderProduct
