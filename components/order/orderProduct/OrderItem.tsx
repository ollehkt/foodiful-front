import Image from 'next/image'
import React from 'react'
import { useGetPrice } from '../../cart/hooks/useGetPrice'
import { ProductReturnType } from '../../product/types/productTypes'

interface PropsType {
  product: ProductReturnType
  quantity: number
}

function OrderItem({ product, quantity }: PropsType) {
  const { getDiscountedPrice } = useGetPrice()
  return (
    <div className="flex py-4 border-t-[1px] border-disabled">
      <div className="flex gap-x-2 md:gap-x-8 w-[65%] md:w-[70%]">
        <Image
          src={product.descImg[0]}
          alt="상품 이미지"
          width={150}
          height={150}
          className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-md"
        />
        <div className="flex-col">
          <div className="text-lg">{product.name}</div>
          <div className="text-textDisabled hidden md:block">{product.subTitle}</div>
        </div>
      </div>
      <div className="grow">{quantity}개</div>
      <div className="md:flex gap-2">
        {!!product.discount && (
          <span className="line-through text-textDisabled">{product.price.toLocaleString()}원</span>
        )}
        <div className="text-main font-bold">
          {getDiscountedPrice(product.price, product.discount).toLocaleString()}원
        </div>
      </div>
    </div>
  )
}

export default OrderItem
