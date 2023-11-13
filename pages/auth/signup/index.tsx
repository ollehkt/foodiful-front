'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '../../../components/common/Input'
import { useInput } from '../../../components/common/hooks/useInput'
import { useValidate } from '../../../components/auth/hooks/useValidate'
import { useAuth } from '../../../components/auth/hooks/useAuth'
import usePhoneVerfiy from '../../../components/auth/hooks/usePhoneVerify'
import { Button } from '../../../components/common/Button'
import { SignUpType } from '../../../components/auth/types/user'

function SignUp() {
  const { signUp } = useAuth()

  const {
    state: signUpValue,
    onChangeInput,
    reset: resetSignUpValue,
  } = useInput({
    email: '',
    name: '',
    password: '',
    phone: '',
    verify: '',
  })

  const [isPhoneInputDisabled, setIsPhoneInputDisabled] = useState(false)
  const [isExistPhoneNumber, setIsExistPhoneNumber] = useState(false)
  const [phoneCheckErrorMsg, setPhoneCheckErrorMsg] = useState('')
  const [isClickedVerifyPhone, setIsClickedVerifyPhone] = useState(false)
  const [time, setTime] = useState(-1) // 남은 시간 (단위: 초)
  const [verifyExpiredTxt, setVerifyExpiredTxt] = useState('')
  // 핸드폰 인증 확인
  const [verifiedPhone, setVerifiedPhone] = useState(false)

  const { sendVerifySms, checkVerifySms, checkExistPhone } = usePhoneVerfiy()
  const { emailValidate, passwordValidate } = useValidate()

  const onClickSignUpBtn = async () => {
    await signUp(signUpValue)
  }

  // timer 로직
  const getSeconds = (time: number) => {
    const seconds = Number(time % 60)
    if (seconds < 10) {
      return '0' + String(seconds)
    } else {
      return String(seconds)
    }
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

  useEffect(() => {
    if (signUpValue.phone.length === 11) {
      checkExistPhone(signUpValue.phone, setIsExistPhoneNumber, setPhoneCheckErrorMsg)
    } else {
      setIsExistPhoneNumber(false)
    }
  }, [signUpValue.phone])

  return (
    <div className="w-[900px] mx-auto mt-[150px] py-[100px] flex flex-col items-center text-3xl  rounded-md">
      <span className="text-main text-4xl mb-[10px]">Foodiful</span>회원가입
      <Input
        style=" ml-[38px] w-[300px] outline-none py-[4px] pl-[8px] border-b-2"
        labelStyle="my-[30px] relative text-2xl"
        labelName="이메일"
        type="text"
        value={signUpValue.email}
        name="email"
        validate={emailValidate}
        onChangeInput={onChangeInput}
        placeholder="이메일을 입력해주세요"
        errorText="이메일 형식에 맞춰 작성해주세요"
      />
      <Input
        style="ml-[64px] w-[300px] outline-none py-[4px] pl-[8px] border-b-2"
        labelStyle="my-[30px] relative text-2xl"
        labelName="이름"
        type="text"
        minLength={3}
        maxLength={10}
        value={signUpValue.name}
        name="name"
        onChangeInput={onChangeInput}
        placeholder="이름을 입력해주세요"
        errorText="3자 이상 10자 이하로 입력해주세요"
      />
      <Input
        style="ml-[24px] w-[300px] outline-none py-[4px] pl-[8px] border-b-2"
        labelStyle="my-[30px] relative text-2xl"
        labelName="패스워드"
        type="password"
        minLength={6}
        maxLength={12}
        value={signUpValue.password}
        name="password"
        onChangeInput={onChangeInput}
        validate={passwordValidate}
        placeholder="패스워드를 입력해주세요"
        errorText="6~12자 영문, 숫자를 포함해 작성해주세요"
      />
      <div className="relative">
        <Input
          style="ml-[38px] w-[300px] mt-[30px] outline-none py-[4px] pl-[8px] border-b-2"
          labelStyle="my-[30px] relative text-2xl"
          isPhoneInputDisabled={isPhoneInputDisabled}
          labelName="휴대폰"
          type="tel"
          minLength={0}
          maxLength={11}
          value={signUpValue.phone}
          name="phone"
          onChangeInput={onChangeInput}
          placeholder="예시) 01012341234"
          errorText={phoneCheckErrorMsg}
        />

        {!isClickedVerifyPhone && !verifiedPhone && (
          <button
            disabled={!isExistPhoneNumber}
            className="absolute text-xl w-[80px] right-0 bottom-[8px] hover:text-main disabled:text-[#999] "
            onClick={() => {
              setIsClickedVerifyPhone(true)
              sendVerifySms(signUpValue.phone, setTime, setVerifyExpiredTxt)
              setIsPhoneInputDisabled(true)
            }}
          >
            인증
          </button>
        )}
      </div>
      <div className="flex items-center mt-[0px] ml-[0px]">
        {isClickedVerifyPhone && !verifyExpiredTxt ? (
          <>
            <Input
              style="mx-[30px] w-[160px] text-xl outline-none py-[4px] pl-[8px] border-b-2"
              labelStyle="my-[30px] relative text-2xl"
              type="tel"
              minLength={3}
              maxLength={10}
              value={signUpValue.verify}
              name="verify"
              onChangeInput={onChangeInput}
              placeholder="인증번호"
            />
            <span className="text-main text-2xl">
              {Math.floor(time / 60)} : {getSeconds(time)}
            </span>
            <button
              className="border-2 border-main w-[90px] h-[40px] ml-[20px] rounded-md text-2xl hover:border-[white] hover:text-[white] hover:bg-main"
              onClick={() =>
                checkVerifySms(
                  signUpValue.phone,
                  signUpValue.verify,
                  setVerifiedPhone,
                  setIsClickedVerifyPhone,
                  setIsPhoneInputDisabled,
                  resetSignUpValue,
                  setVerifyExpiredTxt
                )
              }
            >
              확인
            </button>
          </>
        ) : (
          <span className="text-main text-xl mt-[20px]">{verifyExpiredTxt}</span>
        )}
      </div>
      <Button
        disabled={!verifiedPhone}
        style="mt-[40px] bg-primary text-[#fff] "
        title="회원가입"
        size="md"
        onClick={onClickSignUpBtn}
      />
    </div>
  )
}

export default SignUp
