import React, { useEffect, useState } from 'react'
import { ReviewTypes } from '../../types/reviewState'
import { useUser } from '../auth/hooks/useUser'
import { User } from '../auth/types/user'
import { api } from '../axios/axiosInstance'
import ReviewForm from '../review/PostReview'
import ReviewList from '../review/ReviewList'
import { getStoredUser } from '../util/userStorage'

const ProductDetailReview = ({
  productName,
  productId,
}: {
  productName: string
  productId: number
}) => {
  const { getUser } = useUser()
  const [user, setUser] = useState<User>()
  const [isReviewed, setIsReviewed] = useState(false)
  const [reviewList, setReviewList] = useState<ReviewTypes[]>()

  useEffect(() => {
    const storedUser = getStoredUser()
    ;(async () => {
      const fetchedUserData = await getUser(storedUser)
      if (fetchedUserData) {
        setUser(fetchedUserData)
      }
      const { data: reviewList } = await api(`/product-review/${productId}`)
      if (
        reviewList.length > 0 &&
        reviewList.filter((review: ReviewTypes) => review.userId === fetchedUserData.id).length > 0
      ) {
        setIsReviewed(true)
        setReviewList(reviewList)
      }
    })()
  }, [])

  return (
    <div className="w-full">
      <div className="my-[20px] text-3xl font-bold">후기 등록하기</div>
      {isReviewed && user ? (
        <ReviewForm productName={productName} productId={productId} userId={user.id} />
      ) : (
        /** 유저가 이미 쓴 리뷰가 있다면 post 안 뜨고 내가 쓴 리뷰가 위에 보이게 만들기 및 수정 가능하게끔 */
        user && <ReviewForm productName={productName} productId={productId} userId={user.id} />
      )}
      <div className="flex flex-col mt-[40px] border-main border-t-[1px]">
        <div className="mt-[10px]  text-3xl">후기 목록</div>
        {reviewList && <ReviewList reviewList={reviewList} />}
      </div>
    </div>
  )
}

export default ProductDetailReview
