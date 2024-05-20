'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '../../../components/common/Input'
import { useInput } from '../../../components/common/hooks/useInput'
import { useValidate } from '../../../components/auth/hooks/useValidate'
import { useAuth } from '../../../components/auth/hooks/useAuth'
import usePhoneVerfiy from '../../../components/auth/hooks/usePhoneVerify'
import { Button } from '../../../components/common/Button'
import { SignUpType } from '../../../components/auth/types/user'
import { calPhoneVerifyTime } from '../../../components/util/timeUtil/getTimes'

function SignUp() {
  const { signUp } = useAuth()

  const {
    state: signUpValue,
    onChangeInput,
    reset: resetSignUpValue,
  } = useInput<SignUpType, string>({
    email: '',
    name: '',
    password: '',
    phone: '',
    verify: '',
  })

  const {
    sendVerifySms,
    checkVerifySms,
    setVerifyExpiredTxt,
    setIsClickedVerifyPhone,
    setTime,
    setIsPhoneInputDisabled,
    checkExistPhone,
    time,
    isVerifiedPhone,
    verifyExpiredTxt,
    isClickedVerifyPhone,
    phoneCheckErrorMsg,
    isPhoneInputDisabled,
    isExistPhoneNumber,
  } = usePhoneVerfiy()
  const { emailValidate, passwordValidate } = useValidate()

  const onClickSignUpBtn = () => {
    signUp(signUpValue)
  }

  useEffect(() => {
    const count = setInterval(() => {
      setTime((prev) => prev - 1)
    }, 1000)
    if (time === 1) {
      setVerifyExpiredTxt('인증번호를 다시 요청해주세요')
      setIsClickedVerifyPhone(false)
    }
    return () => clearInterval(count)
  }, [time])

  // useEffect(() => {
  //   if (signUpValue.phone.length === 11) {
  //     checkExistPhone(signUpValue.phone)
  //   } else {
  //     setIsExistPhoneNumber(false)
  //   }
  // }, [signUpValue.phone])

  return (
    <div className="w-min md:w-[900px] mx-auto mt-[40px] py-[60px] flex flex-col items-center text-3xl  rounded-md">
      <span className="text-main text-4xl mb-[10px]">Foodiful</span>회원가입
      <Input
        style="md:ml-[38px] w-[300px] outline-none py-[4px] pl-[8px] border-b-2"
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
        style="md:ml-[64px] w-[300px] outline-none py-[4px] pl-[8px] border-b-2"
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
        style="md:ml-[24px] w-[300px] outline-none py-[4px] pl-[8px] border-b-2"
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
      <div className="relative mt-[30px]">
        <Input
          style="md:ml-[38px] w-[300px] outline-none py-[4px] pl-[8px] border-b-2"
          labelStyle="my-[30px] relative text-2xl"
          isDisabled={isPhoneInputDisabled}
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

        {!isClickedVerifyPhone && !isVerifiedPhone && (
          <button
            disabled={signUpValue.phone.length !== 11}
            className="absolute text-xl w-[80px] right-0 bottom-[6px] hover:text-main disabled:text-[#999] "
            onClick={async () => {
              const isNotExist = await checkExistPhone(signUpValue.phone)

              if (isNotExist) {
                setIsClickedVerifyPhone(true)
                sendVerifySms(signUpValue.phone)
                setIsPhoneInputDisabled(true)
              }
            }}
          >
            인증
          </button>
        )}
      </div>
      <div className="flex flex-col md:flex-row items-center mt-[0px] ml-[0px]">
        {!isExistPhoneNumber && isClickedVerifyPhone && !verifyExpiredTxt ? (
          <>
            <Input
              style="md:mx-[30px] md:w-[160px] text-xl outline-none py-[4px] pl-[8px] border-b-2"
              labelStyle=" mt-[10px] md:my-[30px] relative text-2xl"
              type="tel"
              minLength={3}
              maxLength={10}
              value={signUpValue.verify}
              name="verify"
              onChangeInput={onChangeInput}
              placeholder="인증번호"
            />
            <div className="flex md:block mt-4 md:mt-0">
              <span className="text-main text-2xl">
                {Math.floor(time / 60)} : {calPhoneVerifyTime(time)}
              </span>
              <button
                className="border-2 border-main w-[90px] h-[40px] ml-[20px] rounded-md text-2xl hover:border-white hover:text-white hover:bg-main"
                onClick={() => {
                  checkVerifySms(signUpValue.phone, signUpValue.verify, resetSignUpValue)
                  setTime(-1)
                }}
              >
                확인
              </button>
            </div>
          </>
        ) : (
          <span className="text-main text-xl mt-[20px] break-keep">{verifyExpiredTxt}</span>
        )}
      </div>
      <Button
        disabled={!isVerifiedPhone}
        style="mt-[40px] bg-primary text-[#fff] text-2xl"
        title="회원가입"
        size="md"
        onClick={onClickSignUpBtn}
      />
    </div>
  )
}

export default SignUp
