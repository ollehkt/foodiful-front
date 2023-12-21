import { useAtom } from 'jotai'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { cartProductState } from '../../store/cartProductState'
import AmountCounter from '../common/AmountCounter'
import { Button } from '../common/Button'
import { calculatePrice } from '../lib/calculatePrice'
import { CartReturnType } from './cartTypes'
import { useDeleteCart, useUpdateCart } from './hooks/useCart'

interface PropsType {
  cartList: CartReturnType
  isSelectedItem: boolean
}

const CartItem = ({
  cartList,

  isSelectedItem,
}: PropsType) => {
  const { cartId, productId, additionalCount, quantity, product } = cartList
  const [productQuantity, setProductQuantity] = useState(quantity)
  const [additionalQuantity, setAdditionalQuantity] = useState(additionalCount)
  const [isSelected, setIsSelected] = useState(false)
  const [selectedProductId, setSelectedProductId] = useAtom(cartProductState)
  const { mutate: updateCartMutate } = useUpdateCart()
  const { mutate: deleteCartItem } = useDeleteCart()

  const onClickDeleteCartItem = () => {
    setSelectedProductId((prev) => prev.filter((selected) => selected.productId !== productId))
    deleteCartItem({ cartId, productId })
  }

  const onClickCheckBox = (clickedCartItem: CartReturnType) => {
    if (!isSelected) setSelectedProductId((prev) => [...prev, clickedCartItem])
    else
      setSelectedProductId((prev) =>
        prev.filter((prevItem) => prevItem.productId !== clickedCartItem.productId)
      )
  }

  useEffect(() => {
    setIsSelected(isSelectedItem)
  }, [isSelectedItem])

  useEffect(() => {
    if (additionalQuantity > productQuantity) setAdditionalQuantity(productQuantity)
  }, [productQuantity, additionalQuantity])

  useEffect(() => {
    const newSelectedProduct = selectedProductId.map((selected) => {
      if (selected.productId === productId) {
        return { ...selected, quantity: productQuantity, additionalCount: additionalQuantity }
      } else {
        return selected
      }
    })
    setSelectedProductId(newSelectedProduct)
  }, [productQuantity, additionalQuantity, productId])
  // useEffect(() => {
  //   if (productQuantity === quantity && additionalQuantity === additionalCount) return
  //   const timer = setTimeout(() => {
  //     updateCartMutate({
  //       cartId,
  //       quantity: productQuantity,
  //       additionalCount: additionalQuantity,
  //       productId,
  //     })
  //   }, 2000)
  //   return () => clearTimeout(timer)
  // }, [
  //   productQuantity,
  //   additionalQuantity,
  //   additionalCount,
  //   cartId,
  //   productId,
  //   quantity,
  //   updateCartMutate,
  // ])

  return (
    <div className="w-full xs:w-[300px] shadow-basic rounded-md flex gap-4 my-4 p-4">
      {/**
       * 체크 버튼 / 상품 사진 / 상품 이름 및 서브타이틀 / 상품 수량 / 추가 상품 수량 / 구매 하기 / 삭제하기
       * 전체 구매, 전체 삭제
       */}

      <div className="flex items-center ml-2">
        <input
          type="checkbox"
          className="w-[16px] h-[16px]"
          checked={isSelected}
          onChange={() => setIsSelected((prev) => !prev)}
          onClick={() =>
            onClickCheckBox({
              ...cartList,
              quantity: productQuantity,
              additionalCount: additionalQuantity,
            })
          }
        />
      </div>
      <div className="flex items-center">
        <Image
          src={product.descImg[0] ? product.descImg[0] : '/foodiful.jpeg'}
          alt="상품 사진"
          width={60}
          height={60}
          className="w-[120px] h-[120px] rounded-sm"
        />
      </div>
      <div className="flex flex-col w-[18%] grow">
        <span className="font-bold">{product.name}</span>
        <span className="text-textDisabled">
          {product.subTitle.length > 15 ? `${product.subTitle.slice(0, 15)}..` : product.subTitle}
        </span>
        {product.discount ? (
          <>
            <span className="text-textDisabled line-through">
              {product.price.toLocaleString()}원
            </span>
            <span>{calculatePrice(product.price, product.discount).toLocaleString()}원</span>
          </>
        ) : (
          <span> {product.price.toLocaleString()}원</span>
        )}

        <div className="flex items-center gap-x-4 grow mt-[10px]">
          <div className="flex-col justify-center items-center ">
            <span className="text-sm font-semibold text-main">상품 수량</span>
            <AmountCounter
              amount={productQuantity}
              setAmount={setProductQuantity}
              limit={product.limitQuantity}
              size="md"
            />
          </div>
          <div className="flex-col justify-center items-center">
            <span className="text-sm font-semibold text-main">추가 상품 수량</span>
            <AmountCounter
              amount={additionalQuantity}
              setAmount={setAdditionalQuantity}
              limit={productQuantity}
              size="md"
            />
          </div>
        </div>
      </div>
      <div className="flex items-start gap-2 mr-2">
        <button
          className="bg-[white] text-textDisabled hover:text-disabled"
          onClick={onClickDeleteCartItem}
        >
          삭제
        </button>
      </div>
    </div>
  )
}

export default CartItem
