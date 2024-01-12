import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import OrderConfirm from '../order/orderInfo/OrderConfirm'
import { OrderProductType } from '../order/types/getOrderType'

interface PropsType {
  product: OrderProductType
}

function PurchasedProductItem({ product }: PropsType) {
  const router = useRouter()
  const onClickProduct = () => {
    router.push(`/product/${product.productId}`)
  }
  return (
    <>
      <div className="w-[90%] md:w-[60%] shadow-basic rounded-md p-2 my-1 mx-auto">
        <div className="flex items-center py-1 gap-2 text-main">
          <div
            className="md:flex md:items-center w-[35%] md:w-[50%] md:gap-4 cursor-pointer hover:text-hover"
            onClick={onClickProduct}
          >
            <Image
              src={product.product.descImg[0]}
              alt="상품 이미지"
              width={100}
              height={100}
              className=" w-[100px] h-[100px] rounded-md"
            />
            <div className="">{product.product.name}</div>
          </div>
          <div className="grow-[2] font-bold">{product.orderPrice.toLocaleString()}원</div>
          <div className="grow-[1] font-bold">
            {product.orderCount}
            <span className="text-black">({product.additionalCount})</span>
          </div>
          <div className="grow-[1]"></div>
        </div>
      </div>
    </>
  )
}

export default PurchasedProductItem
