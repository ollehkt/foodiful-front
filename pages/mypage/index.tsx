import { ReactElement, useEffect, useState } from 'react'
import { User } from '../../components/auth/types/user'
import { getStoredUser } from '../../components/util/userStorage'
import Layout from '../../components/layout/Layout'
import MyPageLayout from '../../components/layout/\bMyPageLayout'
import { getMyPageLayout } from './getMyPageLayout'
import { useUser } from '../../components/auth/hooks/useUser'

function MyPage() {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) setUser(storedUser)
  }, [])

  return (
    <div className="grow h-[1000px] shadow-basic rounded-md">왼 편의 카테고리를 클릭 해주세요.</div>
  )
}

MyPage.getLayout = getMyPageLayout

export default MyPage
