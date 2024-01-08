import Image from 'next/image'
import React from 'react'
import { CartReturnType } from '../../cart/cartTypes'
import { useGetPrice } from '../../cart/hooks/useGetPrice'

function OrderItem({ product }: { product: CartReturnType }) {
  const { getDiscountedPrice } = useGetPrice()
  return (
    <div className="flex py-4 border-t-[1px] border-disabled">
      <div className="flex gap-x-8 w-[65%] md:w-[68%]">
        <Image
          src={product.product.descImg[0]}
          alt="상품 이미지"
          width={150}
          height={150}
          className="h-[150px] rounded-md"
        />
        <div className="flex-col">
          <div className="text-lg">{product.product.name}</div>
          <div className="text-textDisabled">{product.product.subTitle}</div>
        </div>
      </div>
      <div className="grow-[2]">{product.quantity}</div>
      <div className="md:flex gap-2">
        {!!product.product.discount && (
          <span className="line-through text-textDisabled">
            {product.product.price.toLocaleString()}원
          </span>
        )}
        <div className="text-main font-bold">
          {getDiscountedPrice(product.product.price, product.product.discount).toLocaleString()}원
        </div>
      </div>
    </div>
  )
}

export default OrderItem
