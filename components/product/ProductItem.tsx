import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ProductReturnType } from '../../types/productTypes'

interface PropsType {
  product: ProductReturnType
  idx: number
}

const ProductItem = ({ product, idx }: PropsType) => {
  const { name, id, descImg, price, discount, quantity, description, subTitle } = product
  return (
    <>
      <Link
        key={`${name}-${idx}`}
        className="flex flex-col cursor-pointer w-[300px]"
        href={`/product/${id}`}
      >
        <Image
          key={descImg[0]}
          src={descImg[0]}
          alt="상품 설명 사진"
          width={300}
          height={300}
          className="rounded-md w-[300px] h-[300px] border-2 border-[gray]"
        />
        <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{price.toLocaleString()}원</p>
      </Link>
    </>
  )
}

export default ProductItem
