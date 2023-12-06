import React, { useEffect, useState } from 'react'
import { User } from '../auth/types/user'
import { useDeleteReview } from '../review/hooks/useReviews'
import ReviewForm from '../review/PostReview'
import ReviewItem from '../review/ReviewItem'
import ReviewList from '../review/ReviewList'
import { ProductReviewTypes } from '../review/types/productReviewTypes'
import { getStoredUser } from '../util/userStorage'

const ProductDetailReview = ({
  productName,
  productId,
  reviewList,
}: {
  productName: string
  productId: number
  reviewList: ProductReviewTypes[]
}) => {
  const [userReviewed, setUserReviewed] = useState<ProductReviewTypes>()
  const [userPurchased, setUserPurchased] = useState(false)
  const [isModifyMode, setIsModifyMode] = useState(false)
  const [user, setUser] = useState<User>()

  const { mutate: deleteReview } = useDeleteReview(productId)

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) setUser(storedUser)
    if (storedUser && reviewList.length > 0) {
      const userReview = reviewList.find((review: ProductReviewTypes) => {
        return review.userId === storedUser.id
      })
      setUserReviewed(userReview)
      setUserPurchased(true)
    }
  }, [])

  return (
    <div className="w-full">
      {user &&
        userReviewed &&
        (isModifyMode ? (
          <>
            <div className="my-[20px] text-3xl font-bold">후기 수정하기</div>
            <ReviewForm
              productName={productName}
              productId={productId}
              userId={user.id}
              userReviewed={userReviewed}
              setIsModifyMode={setIsModifyMode}
            />
          </>
        ) : (
          <>
            <div className="my-[20px] text-3xl font-bold">내 후기</div>
            <div className="flex w-full justify-end gap-2">
              <span
                className="text-textDisabled cursor-pointer hover:text-[#999]"
                onClick={() => setIsModifyMode(true)}
              >
                수정
              </span>
              <span
                className="text-textDisabled cursor-pointer hover:text-[#999]"
                onClick={() => deleteReview(userReviewed.id)}
              >
                삭제
              </span>
            </div>
            <ReviewItem review={userReviewed} />
          </>
        ))}
      {/** 유저가 이미 쓴 리뷰가 있다면 post 안 뜨고 내가 쓴 리뷰가 위에 보이게 만들기 및 수정 능하게끔 */}
      {user && userPurchased && !userReviewed && (
        <>
          <div className="my-[20px] text-3xl font-bold">후기 등록하기</div>
          <ReviewForm productName={productName} productId={productId} userId={user.id} />
        </>
      )}
      <div className="flex flex-col mt-[40px] border-main border-t-[1px]">
        <div className="mt-[10px]  text-3xl">후기 목록</div>
        {reviewList && <ReviewList reviewList={reviewList} />}
      </div>
    </div>
  )
}

export default ProductDetailReview
