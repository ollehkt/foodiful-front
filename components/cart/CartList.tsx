import { useSetAtom } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { cartProductState } from '../../store/cartProducState'
import { Button } from '../common/Button'
import CartItem from './CartItem'
import { CartReturnType } from './cartTypes'
import { useDeleteAllCart } from './hooks/useCart'

const CartList = ({ cartLists }: { cartLists: CartReturnType[] }) => {
  const router = useRouter()
  const [selectedProductId, setselectedProductId] = useState<
    { cartId: number; productId: number }[]
  >([])
  const [isAllItemSelected, setIsAllItemSelected] = useState(false)
  const { mutate: deleteAllCartItems } = useDeleteAllCart()
  const setCartProduct = useSetAtom(cartProductState)

  const onClickPurchaseBtn = () => {
    setCartProduct(selectedProductId)
    router.push('/purchase')
  }
  /**
   * 선택 구매 버튼 눌렀을 때 배열에 들어있는 productId로 구매 목록에 상품 추가
   */
  return (
    <>
      <div className="flex items-center mt-[20px] mb-[-10px] gap-2">
        {isAllItemSelected ? <div>전체 해제</div> : <div>전체 선택</div>}
        <input
          type="checkbox"
          className="w-[15px] h-[15px]"
          checked={isAllItemSelected}
          onChange={() => setIsAllItemSelected((prev) => !prev)}
          onClick={() => {
            if (isAllItemSelected) {
              setselectedProductId([])
            } else {
              setselectedProductId(
                cartLists.map((cart) => ({ cartId: cart.cartId, productId: cart.productId }))
              )
            }
          }}
        />
      </div>
      {cartLists &&
        cartLists.map((cartList) => (
          <CartItem
            cartList={cartList}
            key={cartList.productId}
            setselectedProductId={setselectedProductId}
            isSelectedItem={isAllItemSelected}
          />
        ))}
      <div className="w-full flex justify-center items-center gap-4 mt-[40px">
        <Button
          title={`(${selectedProductId.length})선택 구매`}
          onClick={onClickPurchaseBtn}
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
