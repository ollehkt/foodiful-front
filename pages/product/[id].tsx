import { InferGetServerSidePropsType, NextPageContext } from 'next'
import React, { useState } from 'react'
import ProductDetail from '../../components/product/ProductDetail'
import { Button } from '../../components/common/Button'
import { useRouter } from 'next/router'
import ProductDetailReview from '../../components/product/ProductDetailReview'
import { dehydrate, Hydrate, QueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../query-keys/queryKeys'
import { getReviews, useGetReviews } from '../../components/review/hooks/useReviews'
import { getProductById, useGetProductById } from '../../components/product/hooks/useProduct'
import { useGetOrder } from '../../components/order/hooks/useOrder'
import DetailDesc from '../../components/common/DetailDescription'

export const getServerSideProps = async (context: NextPageContext) => {
  const {
    query: { id },
  } = context
  const productId = String(id)
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.review, productId],
    queryFn: () => getReviews(productId),
  })

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.product, productId],
    queryFn: () => getProductById(productId),
  })

  return {
    props: {
      productId,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const ProductDetailPage = ({
  productId,
  dehydratedState,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isAdditionalSelectModalOpen, setIsAdditionalSelectModalOpen] = useState(false)
  const router = useRouter()
  const [viewDescTab, setViewDescTab] = useState(0)

  /**isFetching 사용 */
  const { data: reviewList, isFetching } = useGetReviews(productId)
  const { data: product } = useGetProductById(productId)
  const { data: orderLists } = useGetOrder()
  return (
    <Hydrate state={dehydratedState}>
      {!!product && (
        <div
          className="mt-8 flex-col items-center xl:w-[1080px] w-[80%] mx-auto"
          onClick={() => {
            isAdditionalSelectModalOpen && setIsAdditionalSelectModalOpen(false)
          }}
        >
          <div className="flex justify-center">
            <Button
              title="update"
              size="md"
              onClick={() => router.push(`/product/update/${product.id}`)}
            />
          </div>
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
              orderLists={orderLists}
            />
          ) : (
            <div className="flex justify-center">
              <DetailDesc description={product.description} />
            </div>
          )}
        </div>
      )}
    </Hydrate>
  )
}

export default ProductDetailPage
