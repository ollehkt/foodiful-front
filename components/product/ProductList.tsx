import React from 'react'
import { ProductReturnType } from '../../types/productTypes'
import StrongTitle from '../common/StrongTitle'
import ProductItem from './ProductItem'

const ProductList = ({ products }: { products: ProductReturnType[] }) => {
  return (
    <div>
      <StrongTitle title="Product" />
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 my-[40px]">
        {products &&
          products.map((product: ProductReturnType, idx: number) => (
            <ProductItem key={`${product.id}-${idx}`} product={product} idx={idx} />
          ))}
      </div>
    </div>
  )
}

export default ProductList
