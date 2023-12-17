import { useSetAtom } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
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
  const [totalPrice, setTotalPrice] = useState(0)

  const { mutate: deleteAllCartItems } = useDeleteAllCart()
  const setCartProduct = useSetAtom(cartProductState)

  const onClickPurchaseBtn = () => {
    setCartProduct(selectedProductId)
    router.push('/purchase')
  }

  useEffect(() => {
    const cartItemPrices = cartLists.map(({ product }) =>
      product.discount > 0
        ? Number((product.price - product.price * (product.discount / 100)).toLocaleString())
        : product.price
    )
    console.log(cartItemPrices)
    console.log(cartLists)
    setTotalPrice(cartItemPrices.reduce((acc, cur) => acc + cur, 0))
  }, [])
  /**
   * 선택 구매 버튼 눌렀을 때 배열에 들어있는 productId로 구매 목록에 상품 추가
   */
  return (
    <div className="shadow-basic rounded-md p-4 mt-[40px]">
      <div className="border-b-[1px] border-main ">상품</div>
      <div className="flex items-center my-[20px] pb-[20px] gap-2 border-b-[1px] border-disabled">
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
        {isAllItemSelected ? (
          <div>
            전체 해제 ({selectedProductId.length} / {cartLists.length})
          </div>
        ) : (
          <div>
            전체 선택 ({selectedProductId.length} / {cartLists.length})
          </div>
        )}
      </div>
      <div className="flex">
        <div className="flex-col grow-[4]">
          {cartLists &&
            cartLists.map((cartList) => (
              <CartItem
                cartList={cartList}
                key={cartList.productId}
                setselectedProductId={setselectedProductId}
                isSelectedItem={isAllItemSelected}
              />
            ))}
        </div>
        <div className="flex-col grow justify-center items-center">
          {/**구매 금액 */}
          <div className="shadow-basic rounded-md p-4">
            <div className="text-main font-bold text-lg">지불 금액</div>
            <div className="flex items-center">
              <div className="mt-[20px] font-bold">총 상품 금액</div>
              <div>{totalPrice}</div>
            </div>
            <div className="flex items-center">
              <div className="font-bold">배송비</div>
            </div>
            <div className="flex items-center">
              <div className="font-bold">결제 예상 금액</div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-4 mt-[40px">
            <Button
              title={`선택 상품 구매`}
              onClick={onClickPurchaseBtn}
              style="disabled:border-none border-[1px] border-main hover:bg-main hover:text-[white]"
              size="md"
              disabled={selectedProductId.length < 1}
            />

            <Button
              title="전체 상품 구매"
              onClick={() => deleteAllCartItems(cartLists[0].cartId)}
              style="bg-main border-[1px] border-main text-[white] hover:bg-active  hover:text-[white]"
              size="md"
              disabled={cartLists.length < 1}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartList
