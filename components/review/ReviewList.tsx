import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ProductReviewTypes } from '../../types/productReviewTypes'
import { api } from '../axios/axiosInstance'
import ReviewItem from './ReviewItem'

interface PropsType {
  reviewList: ProductReviewTypes[]
}

const ReviewList = ({ reviewList }: PropsType) => {
  return (
    <>
      {reviewList.length > 0 ? (
        <div className="flex flex-col justify-center">
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
