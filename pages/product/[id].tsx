import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React, { useState } from 'react'
import { api } from '../../components/axios/axiosInstance'
import ProductDetail from '../../components/product/ProductDetail'
import { AxiosResponse } from 'axios'
import { ProductReturnType } from '../../types/productTypes'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const {
    query: { id },
  } = context
  const {
    data: { data: product },
  } = await api<AxiosResponse<ProductReturnType>>(`/product/${id}`)

  return {
    props: { product },
  }
}

const ProductDetailPage = ({ product }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isAdditionalSelectModalOpen, setIsAdditionalSelectModalOpen] = useState(false)

  return (
    <div
      className="mt-8 flex flex-col items-center xl:w-[1080px] mx-auto"
      onClick={() => {
        isAdditionalSelectModalOpen && setIsAdditionalSelectModalOpen(false)
      }}
    >
      <ProductDetail
        product={product}
        isAdditionalSelectModalOpen={isAdditionalSelectModalOpen}
        setIsAdditionalSelectModalOpen={setIsAdditionalSelectModalOpen}
      />
      {/* <div className="font-bold text-2xl">상품 상세</div> */}
    </div>
  )
}

export default ProductDetailPage
