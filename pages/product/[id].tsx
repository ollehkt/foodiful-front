import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React, { useState } from 'react'
import { api } from '../../components/axios/axiosInstance'
import ProductDetail from '../../components/product/ProductDetail'
import { ProductReturnType } from '../../types/productTypes'
import { Button } from '../../components/common/Button'
import { useRouter } from 'next/router'
import { ProductReviewTypes } from '../../types/productReviewTypes'
import ProductDetailReview from '../../components/product/ProductDetailReview'
import ProductDetailDesc from '../../components/product/ProductDetailDesc'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<{ props: { product: ProductReturnType; reviewList: ProductReviewTypes[] } }> => {
  const {
    query: { id },
  } = context
  const { data: product } = await api(`/product/${id}`)
  const { data: reviewList } = await api(`/product-review/${id}`)

  return {
    props: { product, reviewList },
  }
}

const ProductDetailPage = ({
  product,
  reviewList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isAdditionalSelectModalOpen, setIsAdditionalSelectModalOpen] = useState(false)
  const router = useRouter()
  const [viewDescTab, setViewDescTab] = useState(1)
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

      <div className="w-full h-[80px] flex justify-center items-center my-[40px]">
        <div
          className={`w-[50%] flex justify-center cursor-pointer ${
            viewDescTab === 0
              ? 'border-b-main border-b-2 text-main font-bold'
              : 'border-b-disabled border-b-[1px] text-textDisabled'
          }`}
          onClick={() => setViewDescTab(0)}
        >
          <span className="text-xl py-2">상품 상세 설명</span>
        </div>
        <div
          className={`w-[50%] flex justify-center cursor-pointer ${
            viewDescTab === 1
              ? 'border-b-main border-b-2 text-main font-bold'
              : 'border-b-disabled border-b-[1px] text-textDisabled'
          }`}
          onClick={() => setViewDescTab(1)}
        >
          <span className="text-xl py-2"> 상품 후기</span>
        </div>
      </div>
      {!!viewDescTab ? (
        <ProductDetailReview
          reviewList={reviewList}
          productName={product.name}
          productId={product.id}
        />
      ) : (
        <ProductDetailDesc description={product.description} />
      )}

    </div>
  )
}

export default ProductDetailPage
