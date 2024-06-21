import React, { useEffect, useRef, useState } from 'react'
import useIntersectionObserver from '../common/hooks/useIntersectionObserver'
import ReviewItem from './ReviewItem'
import { ProductReviewTypes } from './types/productReviewTypes'

interface PropsType {
  reviewList: ProductReviewTypes[]
}

const ReviewList = ({ reviewList }: PropsType) => {
  const [renderReviewStartCount, setRenderReviewStartCount] = useState(0)
  const [renderReviewEndCount, setRenderReviewEndCount] = useState(5)
  const [renderReviewList, setRenderReviewList] = useState<ProductReviewTypes[]>([])

  const ref = useRef<HTMLDivElement>(null)

  const addRenderReviewCount = () => {
    setRenderReviewStartCount((prev) => prev + 5)
    setRenderReviewEndCount((prev) => prev + 5)
    const updatedList = reviewList.slice(renderReviewStartCount + 5, renderReviewEndCount + 5)
    setRenderReviewList([...renderReviewList, ...updatedList])
  }
  useIntersectionObserver(ref, addRenderReviewCount)

  useEffect(() => {
    setRenderReviewStartCount(0)
    setRenderReviewEndCount(5)
    setRenderReviewList(reviewList.slice(0, 5))
  }, [reviewList])
  return (
    <>
      <div className="flex-col justify-center">
        {renderReviewList.map((review) => (
          <ReviewItem key={`${review.id}`} review={review} />
        ))}
      </div>
      {reviewList.length > renderReviewEndCount && <div ref={ref}>ref임</div>}
    </>
  )
}

export default ReviewList
