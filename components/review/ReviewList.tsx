import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ProductReviewTypes } from '../../types/productReviewTypes'
import { api } from '../axios/axiosInstance'
import ReviewItem from './ReviewItem'

const ReviewList = () => {
  const router = useRouter()
  const [productReviews, setProductReviews] = useState<ProductReviewTypes[]>([])
  useEffect(() => {
    ;(async () => {
      const { data } = await api<ProductReviewTypes[]>(`/product-review/${router.query.id}`)
      setProductReviews(data)
    })()
  }, [])

  return (
    <>
      {productReviews.length > 0 ? (
        <ReviewItem />
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
