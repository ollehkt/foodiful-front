import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useUser } from '../../../components/auth/hooks/useUser'
import { ModifyUserType, User } from '../../../components/auth/types/user'
import { useInput } from '../../../components/common/hooks/useInput'
import useToast from '../../../components/common/hooks/useToast'
import StrongTitle from '../../../components/common/StrongTitle'
import UserModifyForm from '../../../components/myPage/UserModifyForm'

import { getStoredUser } from '../../../components/util/userStorage'
import { getMyPageLayout } from '../getMyPageLayout'

const MyPageModify = () => {
  const { fireToast } = useToast()

  const [user, setUser] = useState<Omit<User, 'role'>>({
    name: '',
    email: '',
    phone: '',
    token: '',
    id: -1,
  })
  const { getUser } = useUser()
  const router = useRouter()

  const {
    state: modifyUserState,
    setState: setModifyUserState,
    onChangeInput,
  } = useInput<ModifyUserType, string>({
    name: '',
    email: '',
    phone: '',
    password: '',
    verify: '',
    changePassword: '',
    confirmChangePassword: '',
  })

  useEffect(() => {
    ;(async () => {
      const storedUser = getStoredUser()
      const res = await getUser(storedUser)
      if (res) {
        setUser(res)
        setModifyUserState(res)
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
    })()
  }, [])

  // useEffect(() => {}, [isPhoneModifyMode, modifyUserState.phone])

  return (
    <div className="w-full flex flex-col items-center rounded-md shadow-basic py-2">
      <StrongTitle title="내 정보 수정" />
      <div className="w-[90%] mx-auto mt-[20px]">
        <UserModifyForm
          user={user}
          modifyUserState={modifyUserState}
          setModifyUserState={setModifyUserState}
          onChangeInput={onChangeInput}
        />
      </div>
    </div>
  )
}

MyPageModify.getLayout = getMyPageLayout
export default MyPageModify
