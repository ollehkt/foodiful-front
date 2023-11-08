import dayjs from 'dayjs'
import Image from 'next/image'
import React from 'react'
import { ReviewTypes } from '../../types/reviewState'

interface PropsType {
  review: ReviewTypes
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
  } = review
  return (
    <div className="w-full border-2">
      <div className="">
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
        <div className="flex items-center gap-x-2 text-[#999] ">
          <div className="font-semibold">{user.email.split('@')[0]}</div>
          <div>{dayjs(createdAt).format('YY.MM.DD')}</div>
        </div>
      </div>
    </div>
  )
}

export default ReviewItem
