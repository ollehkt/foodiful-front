import { UseMutateFunction } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { VALID_IMAGE_FILE_TYPES } from '../common/types/fileTypes'

import { api } from '../axios/axiosInstance'
import { Button } from '../common/Button'
import { useGetPresignedUrl } from '../common/hooks/useGetPresignedUrl'
import { useInput } from '../common/hooks/useInput'
import { useRenderImages } from '../common/hooks/useRenderImages'
import { Input } from '../common/Input'
import { PRODUCT_CATEGORIES } from '../constants/product'
import { CategoryType, ProductReturnType, ProductType } from './types/productTypes'

const DynamicEditor = dynamic(() => import('../common/editor/ToastEditor'), {
  ssr: false,
})

interface PropsType {
  productForUpdate?: ProductReturnType
  onSubmitAdd?: UseMutateFunction<
    AxiosResponse<any, any> | undefined,
    unknown,
    {
      product: ProductType
    },
    unknown
  >
  onSubmitUpdate?: UseMutateFunction<
    any,
    unknown,
    {
      product: ProductType
      id: number
    },
    unknown
  >
}

const ProductForm = ({ productForUpdate, onSubmitAdd, onSubmitUpdate }: PropsType) => {
  const { onChangeRenderImgs } = useRenderImages()
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [category, setCategory] = useState<CategoryType[]>(PRODUCT_CATEGORIES)
  const [imagesSrc, setImagesSrc] = useState<string[]>(
    (productForUpdate && productForUpdate.descImg) || []
  )

  const [deliverState, setDeliverState] = useState(
    (productForUpdate && productForUpdate.deliver) || false
  )

  const {
    state: product,
    setState: setProduct,
    onChangeInput,
  } = useInput<ProductType, string | number | string[] | CategoryType[] | boolean>(
    (productForUpdate && { ...productForUpdate }) || {
      name: '',
      subTitle: '',
      description: '',
      price: 0,
      discount: 0,
      limitQuantity: 0,
      descImg: [],
      categories: [],
      deliver: deliverState,
    }
  )

  const { getPresignedUrlByFiles } = useGetPresignedUrl()

  const onSelectCategory = (clickedTitle: string) => {
    const updateOption = category.map((category) =>
      category.title === clickedTitle
        ? { ...category, isClicked: category.isClicked ? false : true }
        : category
    )
    setCategory(updateOption)
  }

  const onClickDeleteFile = async (img: string) => {
    if (img.includes('kt-first-bucket')) {
      await api.delete(`/product/image/${productForUpdate && productForUpdate.id}`, {
        data: {
          img,
        },
      })
    }
    setImagesSrc(imagesSrc.filter((image) => image !== img))
  }

  useEffect(() => {
    setProduct({
      ...product,
      categories: category
        .filter((category) => {
          return category.isClicked === true
        })
        .map((category) => category.title),
    })
  }, [category])

  return (
    <div className="mx-4">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <div className="mt-2">
                <Input
                  style="w-[60%] block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0  sm:leading-6 shadow-sm"
                  labelStyle="block  font-medium leading-6"
                  type="text"
                  labelName="상품 이름"
                  value={product.name}
                  name="name"
                  placeholder="상품 이름을 입력해주세요."
                  onChangeInput={onChangeInput}
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="mt-2">
                <Input
                  style="block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:leading-6 shadow-sm"
                  labelStyle="block font-medium leading-6 "
                  type="text"
                  labelName="상품 가격"
                  value={product.price}
                  name="price"
                  placeholder="상품 가격을 입력해주세요."
                  onChangeInput={onChangeInput}
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="mt-2">
                <Input
                  style="block flex-1 border-0 bg-transparent py-1.5 pl-1  focus:ring-0 sm:leading-6 shadow-sm"
                  labelStyle="block font-medium leading-6 "
                  type="text"
                  labelName="상품 할인"
                  value={product.discount}
                  name="discount"
                  placeholder="상품 할인율을 입력해주세요."
                  onChangeInput={onChangeInput}
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="mt-2">
                <Input
                  style="block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:leading-6 shadow-sm"
                  labelStyle="block font-medium leading-6"
                  type="text"
                  labelName="상품 수량"
                  value={product.limitQuantity}
                  name="limitQuantity"
                  placeholder="상품 수량을 입력해주세요."
                  onChangeInput={onChangeInput}
                />
              </div>
            </div>
            <div className="col-span-full">
              <Input
                style="w-full border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:leading-6 shadow-sm"
                labelStyle="block font-medium leading-6"
                type="text"
                labelName="상품 설명"
                value={product.subTitle}
                name="subTitle"
                placeholder="상품의 간단한 설명을 입력해주세요."
                onChangeInput={onChangeInput}
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="product-category" className="block  font-medium leading-6">
                상품 카테고리
              </label>
              <div className="mt-2">
                <div className="flex flex-wrap">
                  {category.map(({ title, isClicked }, index) => (
                    <span
                      key={`${title}-${index}`}
                      className={`mr-4 my-2 border-b-[1px] border-main border-[2px] rounded-md p-2 cursor-pointer ${
                        isClicked ? 'bg-main text-white' : ''
                      }`}
                      onClick={() => onSelectCategory(title)}
                    >
                      {title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="product-category" className="block font-medium leading-6">
                상품 배달 여부
              </label>
              <div className="mt-2">
                <div className="flex">
                  <span
                    onClick={() => setDeliverState(true)}
                    className={`mr-4 my-2 border-b-[1px] border-main border-[2px] rounded-md p-2 cursor-pointer
                         ${deliverState ? 'bg-main text-white' : ''}`}
                  >
                    배달 가능
                  </span>
                  <span
                    onClick={() => setDeliverState(false)}
                    className={`mx-2 my-2 border-b-[1px] border-main border-[2px] rounded-md p-2 cursor-pointer
                    ${!deliverState ? 'bg-main text-white' : ''}`}
                  >
                    배달 불가능
                  </span>
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block font-medium leading-6">
                상품 이미지
              </label>
              <div className="mt-2 flex justify-start">
                <label
                  className="p-12 rounded-md border-2 border-dashed border-gray-900/25 cursor-pointer"
                  htmlFor="file-upload"
                >
                  <AiOutlinePlusCircle size={30} />
                  <input
                    id="file-upload"
                    onChange={(e) => onChangeRenderImgs(e, setFiles, setImagesSrc)}
                    name="fileUpload"
                    type="file"
                    multiple
                    accept={VALID_IMAGE_FILE_TYPES}
                    className="hidden"
                  />
                </label>
              </div>

              {imagesSrc && imagesSrc.length > 0 && (
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-2">
                  <div className="p-2 flex justify-between overflow-x-scroll">
                    {imagesSrc.map((img, idx) => (
                      <>
                        <Image
                          key={`${img}-${idx}`}
                          src={img}
                          alt="사진 이미지"
                          width={400}
                          height={400}
                          className="mx-4 rounded-md"
                        />
                        <span
                          className="cursor-pointer text-main hover:text-white"
                          onClick={() => onClickDeleteFile(img)}
                        >
                          <AiFillCloseCircle />
                        </span>
                      </>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block font-medium leading-6 mb-4">
                상품 상세 설명
              </label>
              <DynamicEditor product={product} setProduct={setProduct} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button
          onClick={async () => {
            const urls = await getPresignedUrlByFiles(files, 'product')
            if (urls) {
              const updatedProduct = { ...product, descImg: [...product.descImg, ...urls] }
              setProduct({ ...product, descImg: [...product.descImg, ...urls] })
              if (productForUpdate?.id && onSubmitUpdate)
                onSubmitUpdate({ product: updatedProduct, id: productForUpdate.id })
              else {
                onSubmitAdd && onSubmitAdd({ product: updatedProduct })
              }
            }
          }}
          style="text-sm font-semibold leading-6 shadow-sm"
          title="올리기"
        />

        <Button
          onClick={() => router.push('/product')}
          title="취소"
          style="rounded-md bg-indigo-600 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        />
      </div>
    </div>
  )
}

export default ProductForm
