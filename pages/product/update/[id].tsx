import { AxiosResponse } from 'axios'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { api } from '../../../components/axios/axiosInstance'
import useToast from '../../../components/common/hooks/useToast'
import ProductForm from '../../../components/product/ProductForm'
import { ProductReturnType, ProductType, PromiseProductType } from '../../../types/productTypes'

interface PropsType {
  product: ProductReturnType
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<{ props: { product: ProductReturnType } }> => {
  const {
    query: { id },
  } = context
  const {
    data: { data: product },
  } = await api(`/product/${id}`)

  return {
    props: { product },
  }
}

const UpdateProductPage = ({ product }: PropsType) => {
  const { fireToast } = useToast()
  const router = useRouter()
  const updateProduct = async (productForUpdate: ProductType, id?: number) => {
    try {
      const {
        data: { data, success },
      } = await api.patch<PromiseProductType>(`/product/${id}`, {
        ...productForUpdate,
      })
      if (success)
        fireToast({
          id: '상품 업데이트 성공',
          type: 'success',
          position: 'bottom',
          message: '상품 업데이트에 성공했습니다.',
          timer: 2000,
        })
      router.push(`/product/${id}`)
    } catch (error) {
      fireToast({
        id: '상품 추가 실패',
        type: 'failed',
        position: 'bottom',
        message: '상품 업데이트에 실패했습니다.',
        timer: 2000,
      })
    }
  }
  return (
    <>
      <ProductForm productForUpdate={product} onSubmit={updateProduct} />
    </>
  )
}

export default UpdateProductPage
