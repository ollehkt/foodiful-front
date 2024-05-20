import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { cartProductState } from '../../store/cartProductState'
import AmountCounter from '../common/AmountCounter'
import { CartReturnType } from './cartTypes'
import { useDeleteCart, useUpdateCart } from './hooks/useCart'
import { useGetPrice } from './hooks/useGetPrice'
import { isMobileDisplay } from '../../store/isMobileDisplay'
import { modalState } from '../../store/modalState'
import { useRouter } from 'next/router'

interface PropsType {
  cartList: CartReturnType
  isAllItemSelected: boolean
}

const CartItem = ({ cartList, isAllItemSelected }: PropsType) => {
  const { id, productId, additionalCount, quantity, product } = cartList
  const [productQuantity, setProductQuantity] = useState(quantity)
  const [additionalQuantity, setAdditionalQuantity] = useState(additionalCount)
  const [isSelected, setIsSelected] = useState(false)
  const [selectedProduct, setSelectedProduct] = useAtom(cartProductState)
  const isMobile = useAtomValue(isMobileDisplay)
  const { mutate: updateCartMutate } = useUpdateCart()
  const { mutate: deleteCartItem } = useDeleteCart()
  const { getDiscountedPrice } = useGetPrice()
  const setModal = useSetAtom(modalState)
  const router = useRouter()

  const onClickDeleteCartItem = () => {
    setModal({
      isOpen: true,
      title: '주문 취소',
      content: '주문을 취소하시겠습니까?',
      confirmFunc: () => {
        setSelectedProduct((prev) => prev.filter((selected) => selected.productId !== productId))
        deleteCartItem(id)
        router.reload()
      },
    })
  }

  const onClickCheckBox = (clickedCartItem: CartReturnType) => {
    if (!isSelected) setSelectedProduct((prev) => [...prev, clickedCartItem])
    else
      setSelectedProduct((prev) =>
        prev.filter((prevItem) => prevItem.productId !== clickedCartItem.productId)
      )
  }

  useEffect(() => {
    setIsSelected(isAllItemSelected)
  }, [isAllItemSelected])

  useEffect(() => {
    const newQuantityProduct = selectedProduct.map((selected) => {
      if (
        selected.quantity !== productQuantity ||
        selected.additionalCount !== additionalQuantity
      ) {
        return { ...selected, quantity: productQuantity, additionalCount: additionalCount }
      } else {
        return selected
      }
    })
    setSelectedProduct(newQuantityProduct)
  }, [productQuantity, additionalQuantity])

  useEffect(() => {
    if (additionalQuantity > productQuantity) setAdditionalQuantity(productQuantity)
    const newSelectedProduct = selectedProduct.map((selected) => {
      if (selected.productId === productId) {
        return { ...selected, quantity: productQuantity, additionalCount: additionalQuantity }
      } else {
        return selected
      }
    })
    setSelectedProduct(newSelectedProduct)
  }, [productQuantity, additionalQuantity, productId])
  useEffect(() => {
    if (productQuantity === quantity && additionalQuantity === additionalCount) return
    const timer = setTimeout(() => {
      updateCartMutate({
        id,
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
    id,
    productId,
    quantity,
    updateCartMutate,
  ])

  return (
    <div className="w-full shadow-basic rounded-md my-4 p-2 md:p-4">
      <div className="flex items-center gap-x-2 md:gap-x-4">
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
        <Image
          src={product.descImg[0] ? product.descImg[0] : '/foodiful.jpeg'}
          alt="상품 사진"
          width={60}
          height={60}
          className="w-[120px] h-[120px] rounded-sm"
        />

        <div className="flex flex-col w-[18%] grow break-keep">
          <span className="font-bold">{product.name}</span>
          <span className="text-textDisabled">
            {isMobile && product.subTitle.length > 15
              ? `${product.subTitle.slice(0, 15)}..`
              : product.subTitle}
          </span>
          {product.discount ? (
            <>
              <span className="text-textDisabled line-through">
                {product.price.toLocaleString()}원
              </span>
              <span>{getDiscountedPrice(product.price, product.discount).toLocaleString()}원</span>
            </>
          ) : (
            <span> {product.price.toLocaleString()}원</span>
          )}

          {!isMobile && (
            <div className="flex items-center gap-x-4 grow mt-[10px]">
              <div className="flex flex-col justify-center items-center ">
                <span className="text-sm font-semibold text-main">상품 수량</span>
                <AmountCounter
                  minAmount={1}
                  amount={productQuantity}
                  setAmount={setProductQuantity}
                  limit={product.limitQuantity}
                  size="md"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="text-sm font-semibold text-main">추가 상품 수량</span>
                <AmountCounter
                  minAmount={0}
                  amount={additionalQuantity}
                  setAmount={setAdditionalQuantity}
                  limit={productQuantity}
                  size="md"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-start gap-2 mr-2">
          <button
            className="bg-white text-textDisabled hover:text-disabled break-keep"
            onClick={onClickDeleteCartItem}
          >
            삭제
          </button>
        </div>
      </div>
      {isMobile && (
        <div className="flex justify-center items-center gap-x-4 grow mt-[10px]">
          <div className="flex flex-col justify-center items-center ">
            <span className="text-sm font-semibold text-main">상품 수량</span>
            <AmountCounter
              minAmount={1}
              amount={productQuantity}
              setAmount={setProductQuantity}
              limit={product.limitQuantity}
              size="md"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-sm font-semibold text-main">추가 상품 수량</span>
            <AmountCounter
              minAmount={0}
              amount={additionalQuantity}
              setAmount={setAdditionalQuantity}
              limit={productQuantity}
              size="md"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default CartItem
