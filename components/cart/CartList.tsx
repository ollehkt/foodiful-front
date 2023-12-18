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
    {
      productId: number
      cartId: number
      productQuantity: number
      additionalQuantity: number
      // product quantity, additional quantity 처음 추가 되어야 함
    }[]
  >([])
  const [isAllItemSelected, setIsAllItemSelected] = useState(true)
  const [totalPrice, setTotalPrice] = useState(0)

  const { mutate: deleteAllCartItems } = useDeleteAllCart()
  const setCartProduct = useSetAtom(cartProductState)

  const onClickPurchaseBtn = () => {
    setCartProduct(selectedProductId)
    router.push('/purchase')
  }

  useEffect(() => {
    // TODO: 선택 상품에 대해 가격 표시
    /**
     *
     */

    const cartItemPrices = cartLists.map((list) =>
      list.product.discount
        ? list.product.price - list.product.price * (list.product.discount / 100) * list.quantity
        : list.product.price * list.quantity
    )
    setTotalPrice(cartItemPrices.reduce((acc, cur) => acc + cur, 0))
  }, [])
  // console.log(cartLists)
  useEffect(() => {}, [])

  useEffect(() => {
    // selectedproductId가 바뀌고 각 상품의 수량이 바뀔때마다 전체 가격이 변경되어야 함.
    const list = selectedProductId.filter((selected) => {
      return cartLists.filter(({ productId }) => selected.productId === productId)
    })
    console.log('lsit', list)
    // console.log(selectedProductId)
  }, [selectedProductId, cartLists])

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
                cartLists.map((cart) => ({
                  cartId: cart.cartId,
                  productId: cart.productId,
                  productQuantity: cart.quantity,
                  additionalQuantity: cart.additionalCount,
                }))
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
        <div className="flex-col grow justify-center items-center my-4">
          {/**구매 금액 */}
          <div className="shadow-basic rounded-md p-4">
            <div className="text-main font-bold text-lg">지불 금액</div>
            <div className="flex items-center justify-between mt-[20px]">
              <div className=" font-bold">총 상품 금액</div>

              <div className="font-bold text-main">
                {totalPrice.toLocaleString()}
                <span className="text-[black] ml-2">원</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-[20px]">
              <div className="font-bold">배송비</div>
              <div className="font-bold text-main">
                3,000<span className="text-[black] ml-2">원</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-[20px]">
              <div className="font-bold">결제 예상 금액</div>
              <div className="font-bold text-main">
                {(totalPrice + 3000).toLocaleString()}
                <span className="text-[black] ml-2">원</span>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-4 mt-[40px]">
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
              style="bg-main border-[1px] border-main text-[white] hover:bg-active  hover:text-[white] hover:border-active"
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
