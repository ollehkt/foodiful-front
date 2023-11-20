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
  const [isModifyMode, setIsModifyMode] = useState(false)

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
      <div className="w-[80%] flex justify-end mt-[20px]">
        <div
          className="text-textDisabled font-bold cursor-pointer hover:text-disabled"
          onClick={() => setIsModifyMode((prev) => !prev)}
        >
          {!isModifyMode && '수정'}
        </div>
      </div>
      {user && !isModifyMode ? (
        <>
          <div className="flex">
            <span>이메일: </span>
            <span>{user.email}</span>
          </div>
          <div>
            <span>이름: </span>
            <span>{user.name}</span>
          </div>
          <div>
            <span>핸드폰 번호: </span>
            <span>{user.phone}</span>
          </div>
          <div></div>
        </>
      ) : (
        <UserModifyForm
          user={user}
          modifyUserState={modifyUserState}
          setModifyUserState={setModifyUserState}
          onChangeInput={onChangeInput}
          setIsModifyMode={setIsModifyMode}
        />
      )}
    </div>
  )
}

MyPageModify.getLayout = getMyPageLayout
export default MyPageModify
