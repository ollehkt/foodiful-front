import { useAtomValue } from 'jotai'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { isMobileDisplay } from '../../store/isMobileDisplay'
import { ProductReturnType } from '../../types/productTypes'
import FavoriteIcon from '../common/FavoriteIcon'

interface PropsType {
  product: ProductReturnType
  mini?: boolean
}

const ProductItem = ({ product, mini }: PropsType) => {
  const { name, id, descImg, price, discount, quantity, description, subTitle, isLiked } = product

  const router = useRouter()
  const onClickItem = (id: number) => {
    router.push(`/product/${id}`)
  }

  return (
    <>
      <div key={`${name}-${id}`} className={`flex flex-col  ${mini ? 'w-[150px]' : 'w-[300px]'}`}>
        <Image
          key={descImg[0]}
          src={descImg[0]}
          alt="상품 설명 사진"
          width={300}
          height={300}
          className={`rounded-md  ${
            mini ? 'w-[150px] h-[150px]' : 'w-[300px] h-[300px]'
          } border-2 border-[gray] cursor-pointer`}
          onClick={() => onClickItem(id)}
        />
        <div className="flex items-center justify-between mt-4">
          <h3 className=" text text-gray-700">
            {mini ? `${name.slice(0, 12)}...` : name.slice(0, 10).slice(0, 12)}
          </h3>
          <FavoriteIcon productId={id} isLiked={isLiked} />
        </div>
        <p className="mt-1 text-lg font-medium text-gray-900">{price.toLocaleString()}원</p>
      </div>
    </>
  )
}

export default ProductItem
