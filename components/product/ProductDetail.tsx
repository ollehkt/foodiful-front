import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import AmountCounter from '../common/AmountCounter'
import Select from '../common/Select'
import SubSlider from '../common/DetailSlider'
import Image from 'next/image'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { isMobileDisplay } from '../../store/isMobileDisplay'
import { ProductReturnType } from './types/productTypes'
import { Button } from '../common/Button'
import { useAddCart } from '../cart/hooks/useCart'
import { cartProductState } from '../../store/cartProductState'
import useToast from '../common/hooks/useToast'
import { useGetPrice } from '../cart/hooks/useGetPrice'
import { postOrderProductState } from '../../store/postOrderProductState'
import Router, { useRouter } from 'next/router'
import { modalState } from '../../store/modalState'

interface PropsType {
  product: ProductReturnType
  isAdditionalSelectModalOpen: boolean
  setIsAdditionalSelectModalOpen: Dispatch<SetStateAction<boolean>>
}

const ProductDetail = ({
  product,
  isAdditionalSelectModalOpen,
  setIsAdditionalSelectModalOpen,
}: PropsType) => {
  const { name, id, descImg, price, discount, limitQuantity, description, subTitle, deliver } =
    product
  const [productQuantities, setProductQuantities] = useState<number>(1)
  const [additionalSelect, setadditionalSelect] = useState('')
  const [additionalQuantities, setAdditionalQuantities] = useState(0)
  const [displayPrice, setDisplayPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const isMobile = useAtomValue(isMobileDisplay)
  const [thumbnail, setThumbnail] = useState(descImg[0])
  const cartProductLists = useAtomValue(cartProductState)
  const setOrderProduct = useSetAtom(postOrderProductState)
  const { getDiscountedPrice } = useGetPrice()
  const setModal = useSetAtom(modalState)

  const { fireToast } = useToast()
  const router = useRouter()

  const { mutate: addCart } = useAddCart()

  const onClickAddCart = (productId: number, quantity: number, additionalCount: number) => {
    if (cartProductLists.find((product) => product.productId === productId)) {
      fireToast({
        id: 'cartItemConflict',
        message: '이미 카트에 존재하는 상품입니다.',
        position: 'bottom',
        timer: 2000,
        type: 'failed',
      })
      return
    }
    setModal({
      isOpen: true,
      title: '장바구니 추가',
      content: '장바구니에 추가하시겠습니까?',
      confirmFunc: () =>
        addCart({
          productId,
          quantity,
          additionalCount: additionalSelect !== '선택 안함' ? additionalCount : 0,
        }),
    })
  }

  const onClickPurchase = () => {
    setModal({
      isOpen: true,
      title: '장바구니 추가',
      content: '장바구니에 추가하시겠습니까?',
      confirmFunc: () => {
        setOrderProduct([
          { product: product, quantity: productQuantities, additionalCount: additionalQuantities },
        ])
        router.push('/order')
      },
    })
  }

  useEffect(() => {
    if (productQuantities > 0) setDisplayPrice(productQuantities * price)
  }, [additionalSelect, productQuantities, price])

  useEffect(() => {
    setTotalPrice(
      additionalSelect !== '선택 안함' ? additionalQuantities * 5000 + displayPrice : displayPrice
    )
    if (additionalSelect === '선택 안함') setAdditionalQuantities(0)
  }, [displayPrice, additionalQuantities, additionalSelect])

  useEffect(() => {
    setDisplayPrice(discount ? getDiscountedPrice(price, discount) : price)
  }, [])

  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1 justify-center items-center rounded-md lg:w-full">
        {isMobile ? (
          <>
            <div>
              <Image
                className="w-full h-[300px] object-contain mx-auto rounded-md my-4"
                src={thumbnail ? thumbnail : '/foodiful.jpeg'}
                alt="대표 이미지"
                width={300}
                height={300}
              />
              {descImg && (
                <div className="flex items-center gap-2 overflow-x-scroll rounded-md">
                  {descImg.map((img) => (
                    <Image
                      key={img}
                      src={img}
                      alt="슬라이더 이미지"
                      width={100}
                      height={100}
                      onClick={() => setThumbnail(img)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        ) : descImg.length > 0 ? (
          <SubSlider items={descImg} btn slidePx={110} btnSize={24} />
        ) : (
          <Image
            className="w-[450px] h-[400px] object-contain mx-auto rounded-md my-4"
            src={thumbnail ? thumbnail : '/foodiful.jpeg'}
            alt="대표 이미지"
            width={300}
            height={300}
          />
        )}

        <div className="lg:ml-[100px] my-[10px] w-full mx-auto">
          <div className="font-semibold text-3xl">{name}</div>
          <div className="text-textDisabled text-md pb-4 border-b-2 border-main">{subTitle}</div>
          <div className="mt-[10px] flex justify-end items-center gap-x-4">
            {discount ? (
              <>
                <div className="text-textDisabled line-through text-xl">
                  {price.toLocaleString()}원
                </div>
                <div className="text-2xl text-main font-bold">
                  {getDiscountedPrice(price, discount).toLocaleString()}원
                </div>
              </>
            ) : (
              <div className="text-2xl text-main font-bold">{price.toLocaleString()}원</div>
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
            <span className="text-lg font-bold">주문 가능 수량</span>
            <div className="text-main text-xl font-bold">{limitQuantity} 개</div>
          </div>

          <div className="relative border-t border-disabled mt-[20px] pt-[10px]">
            <span className="text-lg font-bold">추가 상품</span>
            <span className="text-textDisabled text-sm font-semibold ml-[20px]">
              상품 수량만큼만 주문하실 수 있습니다.
            </span>
            <Select<string>
              options={['선택 안함', '보자기 + 노리개']}
              selected={additionalSelect}
              setSelected={setadditionalSelect}
              isSelectedModalOpen={isAdditionalSelectModalOpen}
              setIsSelectedModalOpen={setIsAdditionalSelectModalOpen}
            />
          </div>

          <div className="mt-[40px] flex-col border border-disabled rounded-md">
            <div className="mt-[20px] pt-[10px] flex items-center justify-between mx-[30px]">
              <div className="flex-col justify-center flex-2">
                <span className="text-lg font-bold">수량 선택하기</span>
                <AmountCounter
                  amount={productQuantities}
                  minAmount={1}
                  setAmount={setProductQuantities}
                  limit={limitQuantity}
                />
              </div>
              <div className="text-xl text-main font-bold">{displayPrice.toLocaleString()}원</div>
            </div>
            {!additionalSelect ||
              (additionalSelect !== '선택 안함' && (
                <div className="my-[20px] pt-[10px] flex items-center justify-between mx-[30px]">
                  <div className="flex-col justify-center flex-2">
                    <span className="text-base font-bold">추가 상품</span>
                    <AmountCounter
                      amount={additionalQuantities}
                      minAmount={0}
                      setAmount={setAdditionalQuantities}
                      limit={productQuantities}
                    />
                  </div>
                  <div className="text-xl text-textDisabled font-bold">
                    {(additionalQuantities * 5000).toLocaleString()}원
                  </div>
                </div>
              ))}
            <div className="flex justify-between items-center mx-[20px] my-[40px]">
              <span className="text-xl font-bold">총 가격</span>
              <span className="text-2xl text-main font-bold">{totalPrice.toLocaleString()}원</span>
            </div>
          </div>
          <div className="flex items-center mt-[10px] gap-10">
            <Button
              title="장바구니 추가"
              onClick={() => onClickAddCart(id, productQuantities, additionalQuantities)}
              style="border-2 border-main hover:border-white w-full"
              size="lg"
            />
            <Button
              title="구매하기"
              onClick={onClickPurchase}
              style="border-2 border-main hover:border-white w-full"
              size="lg"
            />
          </div>
        </div>
      </div>
      {/** tab */}
    </>
  )
}

export default ProductDetail
