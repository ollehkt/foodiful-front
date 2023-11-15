import { useEffect, useState } from 'react'
import { useUser } from '../../../components/auth/hooks/useUser'
import { User } from '../../../components/auth/types/user'
import StrongTitle from '../../../components/common/StrongTitle'
import { getStoredUser } from '../../../components/util/userStorage'
import { getMyPageLayout } from '../getMyPageLayout'

const MyPageModify = () => {
  const [isModifyMode, setIsModifyMode] = useState(false)
  const [user, setUser] = useState<User>()
  const { getUser } = useUser()
  useEffect(() => {
    ;(async () => {
      const storedUser = getStoredUser()
      const res = await getUser(storedUser)
      if (res) setUser(res)
    })()
  }, [])
  return (
    <div className="w-full flex flex-col items-center rounded-md shadow-basic py-2">
      <StrongTitle title="내 정보 수정" />
      <div className="w-[80%] flex justify-end mt-[20px]">
        <div
          className="text-textDisabled font-bold cursor-pointer hover:text-disabled"
          onClick={() => setIsModifyMode(true)}
        >
          수정
        </div>
      </div>
      {user &&
        (isModifyMode ? (
          <>
            <div>
              이메일: <span>{user.email}</span>
            </div>
            <div>
              이름: <span>{user.name}</span>
            </div>
            <div>
              핸드폰 번호: <span>{user.phone}</span>
            </div>
            <div>
              패스워드: <span>{}</span>
            </div>
          </>
        ) : (
          <>
            <div>
              이메일: <span>{user.email}</span>
            </div>
            <div>
              이름: <span>{user.name}</span>
            </div>
            <div>
              핸드폰 번호: <span>{user.phone}</span>
            </div>
          </>
        ))}
    </div>
  )
}

MyPageModify.getLayout = getMyPageLayout
export default MyPageModify
