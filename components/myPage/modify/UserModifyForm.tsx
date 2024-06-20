import { useRouter } from 'next/router'
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import usePhoneVerfiy from '../../auth/hooks/usePhoneVerify'
import { useValidate } from '../../auth/hooks/useValidate'
import { ModifyUserType, User } from '../../auth/types/user'
import { api } from '../../axios/axiosInstance'
import { Button } from '../../common/Button'
import useToast from '../../common/hooks/useToast'
import { Input } from '../../common/Input'
import { calPhoneVerifyTime } from '../../util/timeUtil/getTimes'
import { setStoreUser } from '../../util/userStorage'

interface PropsType {
  user: Omit<User, 'role'>
  modifyUserState: ModifyUserType
  setModifyUserState: Dispatch<SetStateAction<ModifyUserType>>
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void
}

const UserModifyForm = ({
  user,
  modifyUserState,
  setModifyUserState,
  onChangeInput,
}: PropsType) => {
  const { fireToast } = useToast()
  const router = useRouter()

  const [isPhoneModifyMode, setIsPhoneModifyMode] = useState(false)
  const [isNameModifyMode, setIsNameModifyMode] = useState(false)
  const [isPasswordModifyMode, setIsPasswordModifyMode] = useState(false)
  const [isModified, setIsModified] = useState(false)
  const { passwordValidate } = useValidate()

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

  const onClickRetryBtn = () => {
    fireToast({
      id: '메시지 재 발송',
      type: 'success',
      message: '메시지가 재발송 되었습니다.',
      position: 'top',
      timer: 2000,
    })
    sendVerifySms(modifyUserState.phone)
    setTime(180)
  }

  const updateUser = async (modifyUserState: ModifyUserType) => {
    try {
      if (modifyUserState.changePassword !== modifyUserState.confirmChangePassword) {
        fireToast({
          id: '패스워드 확인 오류',
          type: 'failed',
          message: '새 패스워드와 패스워드 확인이 다릅니다.',
          position: 'bottom',
          timer: 2000,
        })
        return
      }

      const patchData: { [key: string]: {} } = {}
      for (const key in modifyUserState) {
        if (key === 'confirmChangePassword') break
        if (modifyUserState[key]) patchData[key] = modifyUserState[key]
      }

      const { data } = await api.patch(
        `/auth/update`,
        { ...patchData },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )

      if (data) {
        setStoreUser(data.user)
        fireToast({
          id: '유저 업데이트 성공',
          type: 'success',
          message: '유저 업데이트에 성공했습니다.',
          position: 'bottom',
          timer: 1000,
        })
        router.push('/mypage')
      }
    } catch (error) {
      fireToast({
        id: '유저 업데이트 실패',
        type: 'failed',
        message: '유저 업데이트에 실패했습니다.',
        position: 'bottom',
        timer: 1000,
      })
    }
  }

  useEffect(() => {
    if (user.name !== modifyUserState.name) {
      setIsModified(true)
    } else if (user.phone !== modifyUserState.phone && isVerifiedPhone) setIsModified(true)
    else if (
      passwordValidate(modifyUserState.password) &&
      passwordValidate(modifyUserState.changePassword) &&
      modifyUserState.changePassword &&
      modifyUserState.changePassword === modifyUserState.confirmChangePassword
    )
      setIsModified(true)
    else setIsModified(false)
  }, [
    modifyUserState.name,
    modifyUserState.phone,
    modifyUserState.password,
    modifyUserState.changePassword,
  ])

  useEffect(() => {
    let count: NodeJS.Timeout
    if (time > 0) {
      count = setInterval(() => {
        setTime((prev) => prev - 1)
      }, 1000)
    }
    if (time === 1) {
      setVerifyExpiredTxt('인증번호를 다시 요청해주세요')
      setIsClickedVerifyPhone(false)
      setTime(0)
    }
    return () => clearInterval(count)
  }, [time, setTime, setVerifyExpiredTxt, setIsClickedVerifyPhone])

  return (
    <div className="flex flex-col items-start">
      <Input
        style="ml-[40px] md:ml-[70px] md:w-[300px] outline-none py-[4px] pl-[8px]"
        labelStyle="my-5 md:my-[30px] text-xl"
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
      <div className="flex items-center">
        <Input
          style={`ml-[30px] md:ml-[90px] md:w-[300px] outline-none py-[4px] pl-[8px] border-2 rounded-md ${
            isNameModifyMode ? 'border-main ' : 'border-gray-300 '
          }`}
          labelStyle="my-[30px] relative text-lg"
          labelName="이름"
          type="text"
          minLength={3}
          maxLength={10}
          value={modifyUserState.name}
          isDisabled={!isNameModifyMode}
          name="name"
          onChangeInput={onChangeInput}
          placeholder="이름을 입력해주세요"
          errorText="3자 이상 10자 이하로 입력해주세요"
        />
        {isNameModifyMode ? (
          <>
            <Button
              title="취소"
              onClick={() => {
                setIsNameModifyMode(false)
                setModifyUserState({ ...modifyUserState, name: user.name })
              }}
              style="w-[50px] hover:bg-disabled ml-3 text-xl"
              size="md"
            />
            <Button
              title="확인"
              onClick={() => {
                setIsNameModifyMode(false)
              }}
              style="w-[50px] ml-3 text-xl hover:bg-main hover:text-white"
              size="md"
            />
          </>
        ) : (
          <Button
            title="변경"
            onClick={() => setIsNameModifyMode(true)}
            style="w-[50px] hover:bg-main hover:text-white ml-3 text-xl"
            size="md"
          />
        )}
      </div>
      <>
        <div className="relative">
          <Input
            style={`ml-[10px] md:ml-[74px] md:w-[300px] mt-[30px] outline-none py-[4px] pl-[8px] border-2 rounded-md ${
              isPhoneModifyMode ? 'border-main' : 'border-gray-300'
            }`}
            labelStyle="my-[30px] relative text-lg"
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
              <Button
                title="인증"
                style="w-[50px] mt-2 md:mt-0 hover:bg-main hover:text-white disabled:text-textDisabled ml-14 md:ml-3 text-xl"
                size="md"
                onClick={async () => {
                  const isNotExist = await checkExistPhone(modifyUserState.phone)
                  if (isNotExist) {
                    setIsClickedVerifyPhone(true)
                    sendVerifySms(modifyUserState.phone)
                    setIsPhoneInputDisabled(true)
                  }
                }}
                /** 인증 버튼 눌렀을 때 번호 체크 후 문자 보내기 */
              />
              <Button
                title="취소"
                style="w-[50px] hover:bg-disabled disabled:text-textDisabled ml-3 text-xl"
                size="md"
                onClick={() => {
                  setIsClickedVerifyPhone(false)
                  setIsPhoneInputDisabled(false)
                  setIsPhoneModifyMode(false)
                  setModifyUserState({ ...modifyUserState, phone: user.phone })
                  setTime(0)
                  setPhoneCheckErrorMsg('')
                }}
              />
            </>
          ) : (
            <Button
              style="w-[50px] hover:bg-main hover:text-white ml-3 text-xl"
              onClick={() => setIsPhoneModifyMode(true)}
              size="md"
              title="변경"
            />
          )}
        </div>
        {isClickedVerifyPhone && !isExistPhoneNumber ? (
          <>
            <div className="flex items-center mt-[20px] ml-[0px]">
              <Input
                style={`mr-4 md:mx-[34px] w-[160px] text-xl outline-none py-[4px] pl-[8px] border-2 rounded-md ${
                  isClickedVerifyPhone ? 'border-main' : 'border-gray-300'
                }`}
                labelStyle="mb-[10px] relative text-lg"
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
                className="border-2 border-main w-[90px] h-[40px] ml-[10px] rounded-md text-2xl hover:border-white hover:text-white hover:bg-main"
                onClick={() => {
                  if (!modifyUserState.verify) {
                    fireToast({
                      id: '인증번호 미입력',
                      type: 'failed',
                      message: '인증번호 6자리를 입력해주세요.',
                      position: 'bottom',
                      timer: 2000,
                    })
                    return
                  }
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
              <div className="text-main cursor-pointer hover:text-active" onClick={onClickRetryBtn}>
                재시도
              </div>
            </div>
          </>
        ) : (
          <span className="text-main text-xl mt-[20px]">{verifyExpiredTxt}</span>
        )}
      </>

      {isPasswordModifyMode ? (
        <div className="relative flex flex-col">
          <Input
            style={`ml-10 md:ml-[64px] w-[240px] md:w-[300px] outline-none py-[4px] pl-[4px] border-b-2`}
            labelStyle="my-[20px] relative text-lg"
            labelName="패스워드"
            type="password"
            minLength={3}
            maxLength={10}
            value={modifyUserState.password}
            name="password"
            onChangeInput={onChangeInput}
            placeholder="현재 패스워드를 입력하세요"
            errorText="6~12자 영문, 숫자를 포함해 작성해주세요"
            validate={passwordValidate}
          />
          <Input
            style={`ml-10 md:ml-[42px] w-[240px] md:w-[300px] outline-none py-[4px] pl-[4px] border-b-2`}
            labelStyle="my-[10px] relative text-lg"
            labelName="새 패스워드"
            type="password"
            minLength={3}
            maxLength={10}
            value={modifyUserState.changePassword || ''}
            name="changePassword"
            onChangeInput={onChangeInput}
            placeholder="새로운 패스워드를 입력하세요"
            errorText="6~12자 영문, 숫자를 포함해 작성해주세요"
            validate={passwordValidate}
          />
          <Input
            style={`ml-4 md:ml-[24px] w-[300px] md:w-[300px] outline-none py-[4px] pl-[4px] border-b-2`}
            labelStyle="my-[20px] relative text-lg"
            labelName="패스워드 확인"
            type="password"
            minLength={3}
            maxLength={10}
            value={modifyUserState.confirmChangePassword || ''}
            name="confirmChangePassword"
            onChangeInput={onChangeInput}
            placeholder="새로운 패스워드를 한번 더 입력하세요"
            errorText="6~12자 영문, 숫자를 포함해 작성해주세요"
            validate={passwordValidate}
          />
          <div className="md:absolute bottom-4 right-[-60px] flex justify-end mr-4 md:mr-0">
            <Button
              title="취소"
              onClick={() => {
                setIsPasswordModifyMode(false)
                setModifyUserState({
                  ...modifyUserState,
                  password: '',
                  changePassword: '',
                  confirmChangePassword: '',
                })
              }}
              style="w-[50px] hover:bg-disabled ml-[30px] text-xl"
              size="md"
            />
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center mt-[20px]">
          <div className="text-lg">패스워드</div>
          <div className="ml-[60px] text-lg flex gap-2">
            {new Array(7).fill(0).map((_, idx) => (
              <div key={idx} className="bg-black w-[6px] h-[6px] rounded-full"></div>
            ))}
          </div>
          <Button
            title="변경"
            onClick={() => setIsPasswordModifyMode(true)}
            style="w-[50px] ml-[30px] text-xl hover:bg-main hover:text-white"
            size="md"
          />
        </div>
      )}

      <div className="w-full flex justify-center mt-[40px]">
        <Button
          title="수정하기"
          size="md"
          style="bg-main text-white hover:bg-hover"
          disabled={!isModified}
          onClick={() => {
            updateUser(modifyUserState)
          }}
        />
      </div>
    </div>
  )
}

export default UserModifyForm
