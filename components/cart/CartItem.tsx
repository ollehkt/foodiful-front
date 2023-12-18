import Image from 'next/image'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import AmountCounter from '../common/AmountCounter'
import { Button } from '../common/Button'
import { CartReturnType } from './cartTypes'
import { useUpdateCart } from './hooks/useCart'

interface PropsType {
  cartList: CartReturnType
  setselectedProductId: Dispatch<
    SetStateAction<
      {
        productId: number
        cartId: number
        productQuantity: number
        additionalQuantity: number
      }[]
    >
  >
  isSelectedItem: boolean
}

const CartItem = ({ cartList, setselectedProductId, isSelectedItem }: PropsType) => {
  const { cartId, productId, additionalCount, quantity, product } = cartList
  const [productQuantity, setProductQuantity] = useState(quantity)
  const [additionalQuantity, setAdditionalQuantity] = useState(additionalCount)
  const [isSelected, setIsSelected] = useState(false)

  const onClickCheckBox = (ids: {
    productId: number
    cartId: number
    productQuantity: number
    additionalQuantity: number
  }) => {
    if (!isSelected) setselectedProductId((prev) => [...prev, ids])
    else
      setselectedProductId((prev) =>
        prev.filter((prevItem) => prevItem.productId !== ids.productId)
      )
  }

  useEffect(() => {
    setIsSelected(isSelectedItem)
  }, [isSelectedItem])

  const { mutate: updateCartMutate } = useUpdateCart()

  useEffect(() => {
    if (additionalQuantity > productQuantity) setAdditionalQuantity(productQuantity)
  }, [productQuantity, additionalQuantity])

  useEffect(() => {
    if (productQuantity === quantity && additionalQuantity === additionalCount) return
    const timer = setTimeout(() => {
      updateCartMutate({
        cartId,
        quantity: productQuantity,
        additionalCount: additionalQuantity,
        productId,
      })
    }, 2000)
    return () => clearTimeout(timer)
  }, [
    productQuantity,
    additionalQuantity,
    additionalCount,
    cartId,
    productId,
    quantity,
    updateCartMutate,
  ])

  return (
    <div className="w-full xs:w-[300px] md:h-[140px] flex gap-4 my-4 p-4">
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
            onClickCheckBox({ productId, cartId, productQuantity, additionalQuantity })
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
        <span className="text-textDisabled">{product.subTitle.slice(0, 10)}..</span>

        <div className="flex items-center grow">
          <div className="flex flex-col justify-center items-center ">
            <span className="text-sm font-semibold text-main">상품 수량</span>
            <AmountCounter
              amount={productQuantity}
              setAmount={setProductQuantity}
              limit={product.limitQuantity}
              size="md"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
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
        <button className="bg-[white] text-textDisabled hover:text-disabled">삭제</button>
      </div>
    </div>
  )
}

export default CartItem
