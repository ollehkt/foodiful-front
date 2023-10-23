import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { PRODUCT_CATEGORIES } from '../../../components/constants/product'
import { CategoryType, ProductType } from '../../../types/productTypes'

import { useAddProduct } from '../../../components/product/hooks/useProduct'
import dynamic from 'next/dynamic'
import { useGetPresignedUrl } from '../../../components/common/hooks/useGetPresignedUrl'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { VALID_IMAGE_FILE_TYPES } from '../../../types/fileTypes'
import Image from 'next/image'
import { Button } from '../../../components/common/Button'
const DynamicEditor = dynamic(() => import('../../../components/common/editor/ToastEditor'), {
  ssr: false,
})

function ProductAddPage() {
  const [files, setFiles] = useState<File[]>([])
  const [category, setCategory] = useState<CategoryType[]>(PRODUCT_CATEGORIES)
  const [deliverState, setDeliverState] = useState(false)

  const [imagesSrc, setImagesSrc] = useState<ArrayBuffer[]>([])

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesArr = event.target.files
    if (filesArr) setFiles([...files, ...Array.from(filesArr)])

    if (filesArr) {
      let fileReaderPromises = []
      let newSelectedFiles = []
      for (let i = 0; i < filesArr.length; i++) {
        newSelectedFiles.push(filesArr[i])
        fileReaderPromises.push(readAsDataURL(filesArr[i]))
      }

      Promise.all(fileReaderPromises).then((newImagesSrc: any) => {
        setImagesSrc([...imagesSrc, ...newImagesSrc])
      })
    } else {
      setImagesSrc([])
    }
  }

  function readAsDataURL(file: Blob) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader()
      reader.onload = function (event) {
        resolve(event?.target?.result)
      }
      reader.readAsDataURL(file)
    })
  }

  const { getPresignedUrlByFiles } = useGetPresignedUrl()
  const setPresignedUrl = async () => {
    if (files) {
      const urls = await getPresignedUrlByFiles(files, 'product')
      if (urls) setProduct({ ...product, descImg: [...product.descImg, ...urls] })
    }
  }

  const { addProductMutate, isLoading: isAddProductLoading } = useAddProduct()

  const [product, setProduct] = useState<ProductType>({
    name: '',
    subTitle: '',
    description: '',
    price: 0,
    discount: 0,
    quantity: 0,
    descImg: [],
    categories: [],
    deliver: deliverState,
  })

  const onSelectCategory = (clickedTitle: string) => {
    const updateOption = category.map((category) =>
      category.title === clickedTitle
        ? { ...category, isClicked: category.isClicked ? false : true }
        : category
    )
    setCategory(updateOption)
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

  const onChangeProductOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setProduct({ ...product, [name]: value })
  }

  console.log(imagesSrc)
  // useEffect(() => {
  //   const getPresignedUrls = async () => {
  //     if (files) {
  //       const urls = await getPresignedUrlByFiles(files, 'product')
  //       if (urls) setProduct({ ...product, descImg: [...product.descImg, ...urls] })
  //     }
  //   }
  //   getPresignedUrls()
  // }, [files])

  return (
    <div className="mx-4">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="product-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                상품 이름
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    onChange={(e) => onChangeProductOption(e)}
                    name="name"
                    id="product-name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="상품 이름을 입력해주세요."
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="product-price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                상품 가격
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    onChange={(e) => onChangeProductOption(e)}
                    name="price"
                    id="product-price"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="상품 가격을 숫자로 입력해주세요."
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="product-discount"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                할인율
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    onChange={(e) => onChangeProductOption(e)}
                    name="discount"
                    id="product-discount"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="상품 할인율을 숫자로 입력해주세요."
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="product-quantity"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                상품 수량
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    onChange={(e) => onChangeProductOption(e)}
                    name="quantity"
                    id="product-quantity"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="상품 수량을 숫자로 입력해주세요."
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="product-sub-title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                상품 간단 설명
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) => onChangeProductOption(e)}
                  name="subTitle"
                  id="product-sub-title"
                  placeholder="상품의 간단한 설명을 입력해주세요."
                  className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="product-category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                상품 카테고리
              </label>
              <div className="mt-2">
                <div className="flex flex-wrap">
                  {category.map(({ title, isClicked }, index) => (
                    <span
                      key={`${title}-${index}`}
                      className={`mr-4 my-2 border-b-[1px] border-main border-[2px] rounded-md p-2 cursor-pointer ${
                        isClicked ? 'bg-main text-[white]' : ''
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
              <label
                htmlFor="product-category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                상품 배달 여부
              </label>
              <div className="mt-2">
                <div className="flex">
                  <span
                    onClick={() => setDeliverState(true)}
                    className={`mr-4 my-2 border-b-[1px] border-main border-[2px] rounded-md p-2 cursor-pointer
                         ${deliverState ? 'bg-main text-[white]' : ''}`}
                  >
                    배달 가능
                  </span>
                  <span
                    onClick={() => setDeliverState(false)}
                    className={`mx-2 my-2 border-b-[1px] border-main border-[2px] rounded-md p-2 cursor-pointer
                    ${!deliverState ? 'bg-main text-[white]' : ''}`}
                  >
                    배달 불가능
                  </span>
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
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
                    onChange={(e) => onChangeFile(e)}
                    name="fileUpload"
                    type="file"
                    multiple
                    accept={VALID_IMAGE_FILE_TYPES}
                    className="hidden"
                  />
                </label>
              </div>
              {/* {product.descImg.length > 0 && (
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-2">
                  <div className="p-2 flex justify-between overflow-x-scroll">
                    {product.descImg.length > 0 &&
                      product.descImg.map((img) => (
                        <Image
                          key={img}
                          src={img}
                          alt="사진 이미지"
                          width={400}
                          height={400}
                          className="mx-4 rounded-md"
                        />
                      ))}
                  </div>
                </div>
              )} */}
              {imagesSrc.length > 0 && (
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-2">
                  <div className="p-2 flex justify-between overflow-x-scroll">
                    {imagesSrc.map((img, idx) => (
                      <img
                        key={`${img}-${idx}`}
                        src={img.toString()}
                        alt="사진 이미지"
                        width={400}
                        height={400}
                        className="mx-4 rounded-md"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900 mb-4"
              >
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
            await setPresignedUrl()
            addProductMutate(product)
          }}
          style="text-sm font-semibold leading-6 text-gray-900"
          title="올리기"
        />

        <Button
          onClick={() => {}}
          title="취소"
          style="rounded-md bg-indigo-600 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        />
      </div>
    </div>
  )
}

export default ProductAddPage
