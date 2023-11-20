import { ReactElement, useEffect, useState } from 'react'
import { User } from '../../components/auth/types/user'
import { getStoredUser } from '../../components/util/userStorage'
import Layout from '../../components/layout/Layout'
import MyPageLayout from '../../components/layout/MyPageLayout'
import { getMyPageLayout } from './getMyPageLayout'
import { useUser } from '../../components/auth/hooks/useUser'
import StrongTitle from '../../components/common/StrongTitle'
import { useRouter } from 'next/router'
import useToast from '../../components/common/hooks/useToast'

function MyPage() {
  const [user, setUser] = useState<User | null>()
  const [myFavoriteProducts, setMyFavoriteProducts] = useState([])
  const [myComments, setMyComments] = useState([])
  const [myPurchasedProducts, setMyPurchasedProducts] = useState([])
  const [myReservations, setMyReservations] = useState([])

  const router = useRouter()
  const { fireToast } = useToast()
  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    } else {
      fireToast({
        id: '재로그인',
        type: 'failed',
        message: '다시 로그인 해주세요.',
        position: 'bottom',
        timer: 1000,
      })
      router.push('/')
    }
  }, [])

  return (
    <div className="grow h-[1000px] shadow-basic rounded-md">
      <div>
        <StrongTitle title="로그인 정보" />
        <div>
          <div>이메일</div>
          <div>{user?.email}</div>
        </div>
      </div>
      <div>
        <StrongTitle title="좋아요 누른 상품" />
        <div></div>
      </div>
      <div>
        <StrongTitle title="내 댓글 보기" />
      </div>
      <div>
        <StrongTitle title="상품 구매내역" />
      </div>
      <div>
        <StrongTitle title="예약 내역" />
      </div>
    </div>
  )
}

MyPage.getLayout = getMyPageLayout

export default MyPage
