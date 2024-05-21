import React, { useRef, useState } from 'react'
import useIntersectionObserver from '../common/hooks/useIntersectionObserver'
import ReviewItem from './ReviewItem'
import { ProductReviewTypes } from './types/productReviewTypes'

interface PropsType {
  reviewList: ProductReviewTypes[]
}

const ReviewList = ({ reviewList }: PropsType) => {
  const [renderReviewStartCount, setRenderReviewStartCount] = useState(0)
  const [renderReviewEndCount, setRenderReviewEndCount] = useState(10)

  const ref = useRef<HTMLDivElement>(null)

  const addRenderReviewCount = () => {
    if (reviewList.length <= renderReviewStartCount) {
      return
    }
    setRenderReviewStartCount((prev) => prev + 10)
    setRenderReviewEndCount((prev) => prev + 10)
    const updatedList = reviewList.slice(renderReviewStartCount, renderReviewEndCount)
    setRenderReviewList([...renderReviewList, ...updatedList])
  }
  useIntersectionObserver(ref, addRenderReviewCount)

  const [renderReviewList, setRenderReviewList] = useState<ProductReviewTypes[]>([])

  return (
    <>
      {!!reviewList.length ? (
        <>
          <div className="flex-col justify-center">
            {renderReviewList.map((review) => (
              <ReviewItem key={`${review.id}`} review={review} />
            ))}
          </div>
          <div ref={ref}></div>
        </>
      ) : (
        <div className="w-full flex justify-center items-center mt-[40px]">
          <span className="text-textDisabled text-2xl font-bold">
            리뷰가 존재하지 않습니다. <br /> 상품을 구매하시고 리뷰를 등록 해주세요!
          </span>
        </div>
      )}
    </>
  )
}

export default ReviewList
