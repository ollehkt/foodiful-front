import React, { useEffect, useState } from 'react'
import { User } from '../auth/types/user'
import { GetOrderType } from '../order/types/getOrderType'
import { useDeleteReview } from '../review/hooks/useReviews'
import ReviewForm from '../review/PostReview'
import ReviewItem from '../review/ReviewItem'
import ReviewList from '../review/ReviewList'
import { ProductReviewTypes } from '../review/types/productReviewTypes'
import { getStoredUser } from '../util/userStorage'
import Select from '../common/Select'
import { useSetAtom } from 'jotai'
import { modalState } from '../../store/modalState'

const ProductDetailReview = ({
  productName,
  productId,
  reviewList,
  orderLists,
}: {
  productName: string
  productId: number
  reviewList: ProductReviewTypes[]
  orderLists: GetOrderType[]
}) => {
  const [userReviewed, setUserReviewed] = useState<ProductReviewTypes>()
  const [userPurchased, setUserPurchased] = useState(false)
  const [isModifyMode, setIsModifyMode] = useState(false)
  const [user, setUser] = useState<User | null>(
    typeof window !== 'undefined' ? getStoredUser() : null
  )
  const setModal = useSetAtom(modalState)

  const [selectedOption, setSelectedOption] = useState('오래된순')
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false)

  const { mutate: deleteReview } = useDeleteReview(productId)

  const onClickDeleteReview = (id: number) => {
    setModal({
      isOpen: true,
      title: '후기 삭제',
      content: '후기를 삭제하시겠습니까?',
      confirmFunc: () => deleteReview(id),
    })
  }

  useEffect(() => {
    if (!!orderLists.length) {
      orderLists.forEach((orderList) => {
        orderList.orderProduct.forEach((product) => {
          if (orderList.orderStatus !== 'CANCEL' && product.productId === productId)
            setUserPurchased(true)
        })
      })
    }
  }, [orderLists])

  useEffect(() => {
    if (user && !!reviewList.length) {
      const userReview = reviewList.find((review: ProductReviewTypes) => {
        return review.userId === user.id
      })
      setUserReviewed(userReview)
    }
    if (!reviewList.length) setUserReviewed(undefined)
  }, [reviewList])

  return (
    <div className="w-full">
      {user && userReviewed && isModifyMode && (
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
      )}
      {user &&
        userPurchased &&
        (userReviewed ? (
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
                onClick={() => onClickDeleteReview(userReviewed.id)}
              >
                삭제
              </span>
            </div>
            <ReviewItem review={userReviewed} />
          </>
        ) : (
          <>
            <div className="my-[20px] text-3xl font-bold">후기 등록하기</div>
            <ReviewForm productName={productName} productId={productId} userId={user.id} />
          </>
        ))}

      <div className="flex-col mt-[40px] border-main border-t-[1px]">
        <div
          className="flex justify-between items-center relative"
          onClick={() => isSelectModalOpen && setIsSelectModalOpen(false)}
        >
          <div className="mt-[10px]  text-3xl">후기 목록</div>

          <Select<string>
            options={['오래된순', '최신순', '별점순']}
            selected={selectedOption}
            setSelected={setSelectedOption}
            isSelectedModalOpen={isSelectModalOpen}
            setIsSelectedModalOpen={setIsSelectModalOpen}
            position="top-12"
            size="w-[120px]"
          />
        </div>
        {!!reviewList.length ? (
          <ReviewList reviewList={reviewList} selectedOption={selectedOption} />
        ) : (
          <div className="flex justify-center text-center my-[50px] text-main text-xl font-bold">
            후기가 없습니다. <br />
            구매 후 후기를 등록해주세요.
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetailReview
