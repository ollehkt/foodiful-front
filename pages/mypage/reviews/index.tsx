import React, { useEffect, useState } from 'react'
import StrongTitle from '../../../components/common/StrongTitle'
import getMyPageLayout from '../../../components/layout/getMyPageLayout'
import { useGetReviewByUserId } from '../../../components/review/hooks/useReviews'
import { User } from '../../../components/auth/types/user'
import { getStoredUser } from '../../../components/util/userStorage'
import useToast from '../../../components/common/hooks/useToast'
import { useRouter } from 'next/router'
import ReviewList from '../../../components/review/ReviewList'

const MyPageMyComments = () => {
  const [user, setUser] = useState<User | null>(null)
  const { data: myReviews } = useGetReviewByUserId(user?.id)
  const { fireToast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const storedUser = getStoredUser()

    if (!storedUser) {
      fireToast({
        id: '장바구니 접속 실패',
        type: 'failed',
        message: '로그인 후에 이용해주세요.',
        timer: 1500,
        position: 'bottom',
      })
      router.push('/auth')
    } else setUser(storedUser)
  }, [router])
  // 후기 불러오기
  return (
    <section className="grow flex-col items-center px-5 mt-10">
      <StrongTitle title="내 후기 보기" style="border-b-2 border-main pb-2" />
      <ReviewList reviewList={myReviews} />
    </section>
  )
}

MyPageMyComments.getLayout = getMyPageLayout
export default MyPageMyComments
