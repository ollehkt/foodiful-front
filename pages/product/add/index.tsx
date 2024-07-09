import React from 'react'
import { useAddProduct } from '../../../components/product/hooks/useProduct'
import ProductForm from '../../../components/product/ProductForm'
import StrongTitle from '../../../components/common/StrongTitle'

function ProductAddPage() {
  const { addProductMutate } = useAddProduct()

  return (
    <>
      <StrongTitle title="제품 추가" style="border-b-2 border-main pb-2 my-16 mx-4" />
      <ProductForm onSubmitAdd={addProductMutate} />
    </>
  )
}

export default ProductAddPage
