import React from 'react'
import { ProductReturnType } from './types/productTypes'
import StrongTitle from '../common/StrongTitle'
import ProductItem from './ProductItem'

const ProductList = ({ products }: { products: ProductReturnType[] }) => {
  return (
    <div>
      <StrongTitle title="상품" style="border-b-2 border-main pb-2" />
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 xl:gap-x-8 my-[40px]">
        {products &&
          products.map((product: ProductReturnType) => (
            <ProductItem key={`${product.id}-${product.name}`} product={product} />
          ))}
      </div>
    </div>
  )
}

export default ProductList
