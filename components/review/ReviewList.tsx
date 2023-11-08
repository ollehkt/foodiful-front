import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ProductReviewTypes } from '../../types/productReviewTypes'
import { ReviewTypes } from '../../types/reviewState'
import { api } from '../axios/axiosInstance'
import ReviewItem from './ReviewItem'

interface PropsType {
  reviewList: ReviewTypes[]
}

const ReviewList = ({ reviewList }: PropsType) => {
  const router = useRouter()
  const [productReviews, setProductReviews] = useState<ProductReviewTypes[]>([])

  return (
    <>
      {reviewList.length > 0 ? (
        <div className="flex flex-col items-center">
          {reviewList.map((review) => (
            <ReviewItem key={`${review.id}`} review={review} />
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center mt-[40px]">
          <span className="text-textDisabled text-2xl font-bold">
            리뷰가 없습니다. 상품을 구매하시고 리뷰를 등록 해주세요!
          </span>
        </div>
      )}
    </>
  )
}

export default ReviewList
