import React, { useState } from 'react'
import StrongTitle from '../../../components/common/StrongTitle'
import getMyPageLayout from '../../../components/layout/getMyPageLayout'
import { useGetReviewByUserId } from '../../../components/review/hooks/useReviews'
import { User } from '../../../components/auth/types/user'
import { getStoredUser } from '../../../components/util/userStorage'
import ReviewList from '../../../components/review/ReviewList'
import Link from 'next/link'

const MyPageMyComments = () => {
  const [user, _] = useState<User | null>(typeof window !== 'undefined' ? getStoredUser() : null)
  const { data: myReviews } = useGetReviewByUserId(user?.id)

  return (
    <section className="grow flex-col items-center px-5 mt-10">
      <StrongTitle title="내 후기 보기" style="border-b-2 border-main pb-2" />
      {!myReviews.length ? (
        <div className="w-full flex flex-col items-center text-2xl font-bold my-10">
          <div>작성한 후기가 없습니다.</div>
          <Link className="text-main hover:text-hover mt-10" href="/product">
            상품 주문하러 가기
          </Link>
        </div>
      ) : (
        <ReviewList reviewList={myReviews} />
      )}
    </section>
  )
}

MyPageMyComments.getLayout = getMyPageLayout
export default MyPageMyComments
