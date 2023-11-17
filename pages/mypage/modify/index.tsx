import { useEffect, useState } from 'react'
import usePhoneVerfiy from '../../../components/auth/hooks/usePhoneVerify'
import { useUser } from '../../../components/auth/hooks/useUser'
import { useValidate } from '../../../components/auth/hooks/useValidate'
import { SignUpType, User } from '../../../components/auth/types/user'
import { Button } from '../../../components/common/Button'
import { useInput } from '../../../components/common/hooks/useInput'
import useToast from '../../../components/common/hooks/useToast'
import { Input } from '../../../components/common/Input'
import StrongTitle from '../../../components/common/StrongTitle'
import { calPhoneVerifyTime } from '../../../components/util/timeUtil/getTimes'
import { getStoredUser } from '../../../components/util/userStorage'
import { getMyPageLayout } from '../getMyPageLayout'

const MyPageModify = () => {
  const { fireToast } = useToast()
  const [isModifyMode, setIsModifyMode] = useState(false)
  const [isPhoneModifyMode, setIsPhoneModifyMode] = useState(false)
  const [isPasswordModifyMode, setIsPasswordModifyMode] = useState(false)
  const [user, setUser] = useState<Omit<User, 'token' | 'id' | 'role'>>({
    name: '',
    email: '',
    phone: '',
  })
  const {
    state: modifyUserState,
    setState: setModifyUserState,
    onChangeInput,
    reset: resetModifyUserState,
  } = useInput<SignUpType, string>({
    name: '',
    email: '',
    phone: '',
    password: '',
    verify: '',
  })

  const {
    sendVerifySms,
    checkExistPhone,
    checkVerifySms,
    setVerifyExpiredTxt,
    setIsClickedVerifyPhone,
    setIsExistPhoneNumber,
    setPhoneCheckErrorMsg,
    setTime,
    setIsPhoneInputDisabled,
    setIsVerifiedPhone,
    time,
    isVerifiedPhone,
    verifyExpiredTxt,
    isClickedVerifyPhone,
    isExistPhoneNumber,
    phoneCheckErrorMsg,
    isPhoneInputDisabled,
  } = usePhoneVerfiy()

  const resetPhone = () => {
    setModifyUserState({ ...modifyUserState, phone: user.phone })
  }

  useEffect(() => {
    const count = setInterval(() => {
      setTime((prev) => prev - 1)
    }, 1000)
    if (time == 0) {
      setVerifyExpiredTxt('인증번호를 다시 요청해주세요')
      setIsClickedVerifyPhone(false)
    }
    return () => clearInterval(count)
  }, [time])

  const { passwordValidate } = useValidate()

  const { getUser } = useUser()

  useEffect(() => {
    ;(async () => {
      const storedUser = getStoredUser()
      const res = await getUser(storedUser)
      if (res) {
        setUser(res)
        setModifyUserState(res)
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
      {user &&
        (isModifyMode ? (
          <div className="flex flex-col items-start">
            <Input
              style="ml-[40px] w-[300px] outline-none py-[4px] pl-[8px]"
              labelStyle="my-[30px] text-xl"
              labelName="이메일"
              type="text"
              minLength={3}
              maxLength={10}
              value={modifyUserState.email}
              name="email"
              isDisabled={true}
              onChangeInput={onChangeInput}
              placeholder="이름을 입력해주세요"
            />
            <Input
              style="ml-[66px] w-[300px] outline-none py-[4px] pl-[8px] border-b-2"
              labelStyle="my-[30px] relative text-xl"
              labelName="이름"
              type="text"
              minLength={3}
              maxLength={10}
              value={modifyUserState.name}
              name="name"
              onChangeInput={onChangeInput}
              placeholder="이름을 입력해주세요"
              errorText="3자 이상 10자 이하로 입력해주세요"
            />
            <>
              <div className="relative">
                <Input
                  style="ml-[46px] w-[300px] mt-[30px] outline-none py-[4px] pl-[8px] border-b-2"
                  labelStyle="my-[30px] relative text-xl"
                  labelName="휴대폰"
                  type="tel"
                  isDisabled={isPhoneInputDisabled || !isPhoneModifyMode}
                  minLength={0}
                  maxLength={11}
                  value={modifyUserState.phone}
                  name="phone"
                  onChangeInput={onChangeInput}
                  placeholder="예시) 01012341234"
                  errorText={phoneCheckErrorMsg}
                />

                {isPhoneModifyMode ? (
                  <>
                    <button
                      className="absolute text-xl w-[50px] right-[20px] bottom-[8px] hover:text-main disabled:text-[#999] "
                      onClick={async () => {
                        const isNotExist = await checkExistPhone(modifyUserState.phone)
                        if (isNotExist) {
                          setIsClickedVerifyPhone(true)
                          sendVerifySms(modifyUserState.phone)
                          setIsPhoneInputDisabled(true)
                        }
                      }}
                      /** 인증 버튼 눌렀을 때 번호 체크 후 문자 보내기 */
                    >
                      인증
                    </button>
                    <button
                      className="absolute text-xl w-[50px] right-[-30px] bottom-[8px] hover:text-main"
                      onClick={() => {
                        setIsClickedVerifyPhone(false)
                        setIsPhoneInputDisabled(false)
                        setIsPhoneModifyMode(false)
                        setTime(-1)
                      }}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <button
                    className="absolute text-xl w-[80px] right-0 bottom-[8px] hover:text-main"
                    onClick={() => setIsPhoneModifyMode(true)}
                  >
                    수정
                  </button>
                )}
              </div>
              {isClickedVerifyPhone && !isExistPhoneNumber ? (
                <>
                  <div className="flex items-center mt-[20px] ml-[0px]">
                    <Input
                      style="mx-[38px] w-[160px] text-xl outline-none py-[4px] pl-[8px] border-b-2"
                      labelStyle=" mb-[10px] relative text-xl"
                      type="tel"
                      minLength={3}
                      maxLength={10}
                      value={modifyUserState.verify}
                      name="verify"
                      onChangeInput={onChangeInput}
                      placeholder="인증번호"
                    />
                    <span className="text-main text-xl w-[60px]">
                      {Math.floor(time / 60)} : {calPhoneVerifyTime(time)}
                    </span>
                    <button
                      className="border-2 border-main w-[90px] h-[40px] ml-[20px] rounded-md text-2xl hover:border-[white] hover:text-[white] hover:bg-main"
                      onClick={() => {
                        checkVerifySms(modifyUserState.phone, modifyUserState.verify, resetPhone)
                        setIsPhoneModifyMode(false)
                        setTime(-1)
                      }}
                    >
                      확인
                    </button>
                  </div>
                  <div className="flex gap-x-3 justify-center">
                    <div>인증번호가 오지 않는다면?</div>
                    <div
                      className="text-main cursor-pointer hover:text-active"
                      onClick={() => {
                        fireToast({
                          id: '메시지 재 발송',
                          type: 'success',
                          message: '메시지가 재발송 되었습니다.',
                          position: 'top',
                          timer: 2000,
                        })
                        sendVerifySms(modifyUserState.phone)
                        setTime(180)
                      }}
                    >
                      재시도
                    </div>
                  </div>
                </>
              ) : (
                <span className="text-main text-xl mt-[20px]">{verifyExpiredTxt}</span>
              )}
            </>

            <Input
              style="ml-[24px] w-[300px] outline-none py-[4px] pl-[4px] border-b-2"
              labelStyle="mt-[30px] text-xl"
              labelName="패스워드"
              type="password"
              minLength={3}
              maxLength={10}
              value={modifyUserState.password}
              name="password"
              onChangeInput={onChangeInput}
              placeholder="변경하려면 새로운 패스워드를 입력하세요"
              errorText="6~12자 영문, 숫자를 포함해 작성해주세요"
              validate={passwordValidate}
            />
            <div className="w-full flex justify-center mt-[40px]">
              <Button title="수정하기" style="" size="md" onClick={() => {}} />
              <Button title="취소하기" style="" size="md" onClick={() => setIsModifyMode(false)} />
            </div>
          </div>
        ) : (
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
        ))}
    </div>
  )
}

MyPageModify.getLayout = getMyPageLayout
export default MyPageModify
