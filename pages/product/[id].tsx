import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React, { useState } from 'react'
import { api } from '../../components/axios/axiosInstance'
import ProductDetail from '../../components/product/ProductDetail'
import { ProductReturnType } from '../../types/productTypes'
import { Button } from '../../components/common/Button'
import { useRouter } from 'next/router'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<{ props: { product: ProductReturnType } }> => {
  const {
    query: { id },
  } = context
  const { data: product } = await api(`/product/${id}`)
  console.log(product)

  return {
    props: { product },
  }
}

const ProductDetailPage = ({ product }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isAdditionalSelectModalOpen, setIsAdditionalSelectModalOpen] = useState(false)
  const router = useRouter()
  return (
    <div
      className="mt-8 flex flex-col items-center xl:w-[1080px] w-[80%] mx-auto"
      onClick={() => {
        isAdditionalSelectModalOpen && setIsAdditionalSelectModalOpen(false)
      }}
    >
      <Button
        style=""
        title="update"
        onClick={() => router.push(`/product/update/${product.id}`)}
      />
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
