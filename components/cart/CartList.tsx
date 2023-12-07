import React, { useState } from 'react'
import { Button } from '../common/Button'
import CartItem from './CartItem'
import { CartReturnType } from './cartTypes'
import { useDeleteAllCart } from './hooks/useCart'

const CartList = ({ cartLists }: { cartLists: CartReturnType[] }) => {
  const [selectedProductId, setselectedProductId] = useState<
    { cartId: number; productId: number }[]
  >([])
  const { mutate: deleteAllCartItems } = useDeleteAllCart()
  /**
   * 선택 구매 버튼 눌렀을 때 배열에 들어있는 productId로 구매 목록에 상품 추가
   */
  return (
    <>
      {cartLists &&
        cartLists.map((cartList) => (
          <CartItem
            cartList={cartList}
            key={cartList.productId}
            setselectedProductId={setselectedProductId}
          />
        ))}
      <div className="w-full flex justify-center items-center gap-4 mt-[40px">
        <Button
          title={`(${selectedProductId.length})선택 구매`}
          onClick={() => {}}
          style="disabled:border-none border-2 border-active"
          size="lg"
          disabled={selectedProductId.length < 1}
        />
        <Button
          title="전체 삭제"
          onClick={() => deleteAllCartItems(cartLists[0].cartId)}
          style="border-2 border-[red] hover:bg-[red]"
          size="lg"
          disabled={cartLists.length < 1}
        />
      </div>
    </>
  )
}

export default CartList
