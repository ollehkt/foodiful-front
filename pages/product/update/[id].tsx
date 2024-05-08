import { GetServerSidePropsContext } from 'next'
import React from 'react'
import { api } from '../../../components/axios/axiosInstance'
import { useUpdateProductById } from '../../../components/product/hooks/useProduct'
import ProductForm from '../../../components/product/ProductForm'
import { ProductReturnType } from '../../../components/product/types/productTypes'

interface PropsType {
  product: ProductReturnType
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<{ props: { product: ProductReturnType } }> => {
  const {
    query: { id },
  } = context
  const { data: product } = await api(`/product/${id}`)

  return {
    props: { product },
  }
}

const UpdateProductPage = ({ product }: PropsType) => {
  const { updateProduct } = useUpdateProductById()

  return (
    <>
      <ProductForm productForUpdate={product} onSubmitUpdate={updateProduct} />
    </>
  )
}

export default UpdateProductPage
