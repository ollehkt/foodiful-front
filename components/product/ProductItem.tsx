import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { ProductReturnType } from './types/productTypes'
import FavoriteIcon from '../common/favorite/FavoriteIcon'
import { useGetPrice } from '../cart/hooks/useGetPrice'

interface PropsType {
  product: ProductReturnType
  mini?: boolean
}

const ProductItem = ({ product, mini }: PropsType) => {
  const { name, id, descImg, price, isLiked, discount } = product
  const router = useRouter()
  const { getDiscountedPrice } = useGetPrice()
  return (
    <div key={`${name}-${id}`} className={`flex flex-col ${mini ? 'w-[200px]' : 'w-[250px]'}`}>
      <Image
        key={descImg[0]}
        src={descImg.length > 0 ? descImg[0] : '/foodiful.jpeg'}
        alt="상품 설명 사진"
        width={200}
        height={200}
        className={`rounded-md  ${
          mini ? 'w-[200px] h-[200px]' : 'w-[250px] h-[250px]'
        } border-2 border-[gray] cursor-pointer`}
        onClick={() => router.push(`/product/${id}`)}
      />
      <div className="flex items-center justify-between mt-4 relative">
        <h3 className="text text-gray-700">
          {mini ? `${name.slice(0, 10)}...` : name.slice(0, 10).slice(0, 12)}
        </h3>
        <FavoriteIcon id={id} isLiked={isLiked} product />
      </div>
      <div className="mt-1 text-lg font-medium text-gray-900">
        <div className="flex gap-x-2 items-center">
          {discount
            ? `${getDiscountedPrice(price, discount).toLocaleString()}원`
            : `${price.toLocaleString()}원`}

          {!!discount && (
            <div className="line-through text-gray-200">{`${price.toLocaleString()}원`}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductItem
