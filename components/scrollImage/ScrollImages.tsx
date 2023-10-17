import { InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { api } from '../axios/axiosInstance'
import { useGetProducts } from '../product/hooks/useProduct'
import { ProductReturnType, ProductType } from '../../types/productTypes'

import ScrollImageItem from './ScrollImageItem'

const arr = ['/photo0.jpeg']

const ScrollImageLists = ({ products }: { products: ProductReturnType[] }) => {
  console.log(products)

  return (
    <div className="my-[80px] grid xl:grid-cols-3 sm:grid-cols-2 gap-8">
      {products &&
        products.map(({ categories, name, descImg, price, discount, id }: ProductReturnType) => (
          <ScrollImageItem
            key={`${id}-${descImg}`}
            id={id}
            name={name}
            src={descImg[0]}
            price={price}
            discount={discount}
            categories={categories as string[]}
          />
        ))}
    </div>
  )
}

export default ScrollImageLists
