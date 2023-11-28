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
  hideFavoriteIcon?: boolean
}

const ProductItem = ({ product, mini, hideFavoriteIcon }: PropsType) => {
  const { name, id, descImg, price, discount, quantity, description, subTitle, isLiked } = product

  const router = useRouter()
  const onClickItem = (id: number) => {
    router.push(`/product/${id}`)
  }

  return (
    <>
      <div key={`${name}-${id}`} className={`flex flex-col  ${mini ? 'w-[200px]' : 'w-[250px]'}`}>
        <Image
          key={descImg[0]}
          src={descImg.length > 0 ? descImg[0] : '/foodiful.jpeg'}
          alt="상품 설명 사진"
          width={200}
          height={200}
          className={`rounded-md  ${
            mini ? 'w-[200px] h-[200px]' : 'w-[250px] h-[250px]'
          } border-2 border-[gray] cursor-pointer`}
          onClick={() => onClickItem(id)}
        />
        <div className="flex items-center justify-between mt-4 relative">
          <h3 className=" text text-gray-700">
            {mini ? `${name.slice(0, 10)}...` : name.slice(0, 10).slice(0, 12)}
          </h3>
          {!hideFavoriteIcon && <FavoriteIcon productId={id} isLiked={isLiked} />}
        </div>
        <p className="mt-1 text-lg font-medium text-gray-900">{price.toLocaleString()}원</p>
      </div>
    </>
  )
}

export default ProductItem
