import React from 'react'
import { CartReturnType } from '../../cart/cartTypes'
import TitleAndLine from '../../common/TitleAndLine'
import OrderItem from './OrderItem'

function OrderProduct({ selectedProduct }: { selectedProduct: CartReturnType[] }) {
  return (
    <div className="shadow-basic rounded-md p-4 mt-[40px]">
      <TitleAndLine title="주문 상품" />
      <div className="">
        <div className="flex justify-between items-center my-[20px] px-2">
          <div className="grow-[5] text-textDisabled">상품명</div>
          <div className="grow-[2] text-textDisabled">수량</div>
          <div className="text-textDisabled">판매가</div>
        </div>
        {selectedProduct.length > 0 &&
          selectedProduct.map((product) => <OrderItem key={product.productId} product={product} />)}
      </div>
    </div>
  )
}

export default OrderProduct
