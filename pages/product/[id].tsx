import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { api } from '../../components/axios/axiosInstance'
import SubSlider from '../../components/common/SubSlider'
import dynamic from 'next/dynamic'
import Select from '../../components/common/Select'
import AmountCounter from '../../components/common/AmountCounter'

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
  const { name, id, descImg, price, discount, quantity, description, subTitle, deliver } = product
  const router = useRouter()
  const [isQuantitySelectModalOpen, setIsQuantitySelectModalOpen] = useState(false)
  const [isAdditionalSelectModalOpen, setIsAdditionalSelectModalOpen] = useState(false)

  const [productQuantities, setProductQuantities] = useState<number>(1)
  const [isAdditionalSelected, setIsAdditionalSelected] = useState('')
  const [additionalQuantities, setAdditionalQuantities] = useState(1)

  const [displayPrice, setDisplayPrice] = useState(discount ? price - price / discount : price)

  useEffect(() => {
    if (productQuantities > 0) setDisplayPrice(productQuantities * price)
  }, [isAdditionalSelected, productQuantities])

  return (
    <div
      className="mt-8 flex flex-col items-center xl:w-[1080px] mx-auto"
      onClick={() => {
        isQuantitySelectModalOpen && setIsQuantitySelectModalOpen(false)
        isAdditionalSelectModalOpen && setIsAdditionalSelectModalOpen(false)
      }}
    >
      {/* <div className="font-bold text-2xl">상품 상세</div> */}
      <div className="flex  rounded-md w-full">
        <SubSlider items={descImg} btn slidePx={100} btnSize={20} />

        <div className="ml-[100px] my-[10px] w-full ">
          <div className="font-semibold text-3xl">{name}</div>
          <div className="text-textDisabled text-md pb-4 border-b-2 border-main">{subTitle}</div>
          <div className="mt-[10px] flex justify-end items-center gap-x-4">
            {!discount ? (
              <>
                <div className="text-textDisabled line-through text-xl">
                  {price.toLocaleString()}원
                </div>
                <div className="text-2xl text-main font-bold">
                  {(price - price / 10).toLocaleString()}원
                </div>
              </>
            ) : (
              <div className="text-2xl">{price.toLocaleString()}원</div>
            )}
          </div>

          <div className="text-lg border-t border-disabled mt-[20px] pt-[10px] font-bold">
            배송 여부
          </div>
          {!deliver ? (
            <div className="text-base text-textDisabled">
              택배 배송 | <span className="font-semibold">3,500원 </span>- 우체국 택배
            </div>
          ) : (
            <div>배송 불가능</div>
          )}

          <div className="relative border-t border-disabled mt-[20px] pt-[10px]">
            <span className="text-lg font-bold">추가 상품</span>
            <Select<string>
              options={['보자기 + 노리개']}
              selected={isAdditionalSelected}
              setSelected={setIsAdditionalSelected}
              isSelectedModalOpen={isAdditionalSelectModalOpen}
              setIsSelectedModalOpen={setIsAdditionalSelectModalOpen}
            />
          </div>

          <div className="my-[40px] flex flex-col border border-disabled rounded-md">
            <div className="mt-[20px] pt-[10px] flex items-center justify-between mx-[30px]">
              <div className="flex flex-col justify-center flex-2">
                <span className="text-lg font-bold">수량 선택하기</span>
                <AmountCounter
                  amount={productQuantities}
                  setAmount={setProductQuantities}
                  limit={quantity}
                />
              </div>
              <div className="text-xl text-main font-bold">{displayPrice.toLocaleString()}원</div>
            </div>
            <div className="my-[20px] pt-[10px] flex items-center justify-between mx-[30px]">
              <div className="flex flex-col justify-center flex-2">
                <span className="text-base font-bold">추가 상품</span>
                <AmountCounter
                  amount={additionalQuantities}
                  setAmount={setAdditionalQuantities}
                  limit={productQuantities}
                />
              </div>
              <div className="text-xl text-textDisabled font-bold">
                {(additionalQuantities * 5000).toLocaleString()}원
              </div>
            </div>
          </div>

          {/**
       
           * 수량 select *quantity 개수 넘길 수 없음
       * 배달 여부
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
