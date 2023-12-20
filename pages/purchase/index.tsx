import { useAtomValue } from 'jotai'
import React from 'react'
import Container from '../../components/common/Container'
import StrongTitle from '../../components/common/StrongTitle'
import TitleAndLine from '../../components/common/TitleAndLine'
import PurchaseItem from '../../components/purchase/hooks/PurchaseItem'
import { cartProductState } from '../../store/cartProductState'

const PurchasePage = () => {
  const cartProduct = useAtomValue(cartProductState)
  console.log(cartProduct)
  return (
    <Container style="mt-[40px]">
      <StrongTitle title="주문 / 결제" />
      <div className="shadow-basic rounded-md p-2 mt-[40px]">
        <TitleAndLine title="주문 상품" />
        <div className="">
          <div className="flex justify-between items-center my-[20px] px-2">
            <div className="grow-[5] text-textDisabled">상품명</div>
            <div className="grow-[2] text-textDisabled">수량</div>
            <div className="text-textDisabled">판매가</div>
          </div>
          {cartProduct.length > 0 &&
            cartProduct.map((product) => (
              <PurchaseItem key={product.productId} product={product} />
            ))}
        </div>
      </div>
    </Container>
  )
}

export default PurchasePage
