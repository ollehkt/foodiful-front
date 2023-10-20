import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { api } from '../../components/axios/axiosInstance'
import SubSlider from '../../components/common/SubSlider'
import dynamic from 'next/dynamic'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
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

const DynamicViewer = dynamic(() => import('../../components/common/editor/ToastViewer'), {
  ssr: false,
})
/**
    name: '떡 케이크',
    subTitle: '떡 케이크 맛있어요.',
    price: 100000,
    discount: 10,
    quantity: '10',
    descImg: [Array],
    deliver: false,
    categories: [Array],
    id: 3
 */

const ProductDetailPage = ({ product }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { name, id, descImg, price, discount, quantity, description, subTitle } = product
  const router = useRouter()
  return (
    <div className="mt-8 flex flex-col items-center xl:w-[1080px] mx-auto">
      {/* <div className="font-bold text-2xl">상품 상세</div> */}
      <div className="flex  rounded-md w-full">
        <SubSlider items={product.descImg} btn slidePx={100} btnSize={20} />

        <div className="ml-[100px] my-[10px] w-full ">
          <div className="font-semibold text-3xl">{product.name}</div>
          <div className="text-textDisabled text-md pb-4 border-b-2 border-main">
            {product.subTitle}
          </div>
          {/**
           * 할인 가격 ----
           * 가격
           * 배달 여부
           * 수량 select *quantity 개수 넘길 수 없음
           * 수량 카운터
           * 총 가격
           */}
        </div>
      </div>
      <div onClick={() => router.back()}>뒤로</div>
      {/* <div>{product.name}</div> */}
      <DynamicViewer content={description} />
    </div>
  )
}

export default ProductDetailPage
