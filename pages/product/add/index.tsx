import React from 'react'
import { useAddProduct } from '../../../components/product/hooks/useProduct'
import ProductForm from '../../../components/product/ProductForm'

function ProductAddPage() {
  const { addProductMutate } = useAddProduct()

  return (
    <>
      <ProductForm onSubmitAdd={addProductMutate} />
    </>
  )
}

export default ProductAddPage
