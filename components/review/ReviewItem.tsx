import dayjs from 'dayjs'
import Image from 'next/image'
import React, { useState } from 'react'
import { ProductReviewTypes } from '../../types/productReviewTypes'

interface PropsType {
  review: ProductReviewTypes
}

/**
 * 
  "createdAt": "2023-11-07T04:49:07.365Z",
  "updatedAt": "2023-11-07T04:49:07.365Z",
  "comment": "진짜 맛있어요",
  "userId": 1,
  "productId": 1,
  "id": 5,
  "deleted": false,
  "isSecret": false,
  "rating": 4,
  "reviewImg": [
      "https://kt-first-bucket.s3.ap-northeast-2.amazonaws.com/product-review/49ed84a5-6200-4e70-a4c2-3830b22995ec.jpeg"
  ],
  "user": User
 */

const ReviewItem = ({ review }: PropsType) => {
  const {
    createdAt,
    updatedAt,
    comment,
    userId,
    productId,
    id,
    isSecret,
    rating,
    reviewImg,
    user,
    product,
  } = review
  const [isImageClicked, setIsImageClicked] = useState(false)
  return (
    <>
      <div
        className={`w-[90%] cursor-pointer my-[20px] bg-main bg-opacity-10  rounded-md ${
          isImageClicked ? '' : 'h-[200px] relative flex '
        }  `}
        onClick={() => setIsImageClicked((prev) => !prev)}
      >
        <div className="p-[4px_0px_4px_4px]">
          <div
            style={{
              backgroundImage:
                'url(https://static-resource-smartstore.pstatic.net/brandstore/p/static/20231106154503/img/sprite/svg/spIcon_svg.svg)',
              backgroundSize: '824px 788px',
              backgroundPosition: '-661px -79px',
              width: '74px',
              height: '14px',
              display: 'inline-block',
              position: 'relative',
              verticalAlign: 'top',
            }}
          >
            <div
              style={{
                backgroundImage:
                  'url(https://static-resource-smartstore.pstatic.net/brandstore/p/static/20231106154503/img/sprite/svg/spIcon_svg.svg)',
                backgroundSize: '824px 788px',
                backgroundPosition: '-661px -101px',
                width: `${20 * rating}%`,
                height: '14px',
                display: 'block',
              }}
            ></div>
          </div>
          <div className="flex items-center gap-x-2 text-[#999]">
            <div className="font-semibold">{user.email.split('@')[0]}</div>
            <div>
              {updatedAt
                ? dayjs(updatedAt).format('YY.MM.DD')
                : dayjs(createdAt).format('YY.MM.DD')}
            </div>
          </div>
          <div className="h-[30px] flex items-center">
            <span className="text-[#666] text-[15px] text-center">구매 상품: {product.name}</span>
          </div>
          <div className="w-[60%] mt-[20px] text-[#333] font-semibold break-keep ">{comment}</div>
        </div>
        {reviewImg && (
          <Image
            className={`${
              isImageClicked ? 'p-1 my-2 rounded-lg' : 'absolute right-0 top-0 w-[200px] h-[200px]'
            }`}
            src={reviewImg}
            alt="리뷰 이미지"
            width={240}
            height={200}
          />
        )}
      </div>
    </>
  )
}

export default ReviewItem
