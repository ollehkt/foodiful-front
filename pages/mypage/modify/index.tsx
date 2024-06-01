import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useUser } from '../../../components/auth/hooks/useUser'
import { ModifyUserType, User } from '../../../components/auth/types/user'
import { useInput } from '../../../components/common/hooks/useInput'
import useToast from '../../../components/common/hooks/useToast'
import StrongTitle from '../../../components/common/StrongTitle'
import UserModifyForm from '../../../components/myPage/modify/UserModifyForm'
import { getStoredUser } from '../../../components/util/userStorage'
import getMyPageLayout from '../../../components/layout/getMyPageLayout'

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
        setModifyUserState({
          ...modifyUserState,
          name: res.name,
          email: res.email,
          phone: res.phone,
        })
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

  return (
    <div className="grow flex-col items-center px-5 mt-10">
      <StrongTitle title="내 정보 수정" style="border-b-2 border-main pb-2" />
      <div className="w-full mx-auto mt-[40px]">
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
