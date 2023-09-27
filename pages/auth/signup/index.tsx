'use client'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Input } from '../../../components/common/Input'
import { useInput } from '../../../components/common/hooks/useInput'
import { useUser } from '../../../components/auth/hooks/useUser'
import { httpRequest } from '../../../components/lib/httpRequest'
import { api } from '../../../components/axios/axiosInstance'
import axios, { AxiosError } from 'axios'
import { useValidate } from '../../../components/auth/hooks/useValidate'
import useToast from '../../../components/common/hooks/useToast'
import { useAuth } from '../../../components/auth/hooks/useAuth'
import usePhoneVerfiy from '../../../components/auth/hooks/usePhoneVerify'
import { Button } from '../../../components/common/Button'

function SignUp() {
  const { signUp } = useAuth()
  const { value: email, setValue: setEmail } = useInput('')
  const { value: name, setValue: setName } = useInput('')
  const { value: password, setValue: setPassword } = useInput('')
  const { value: phone, setValue: setPhone } = useInput('')
  const { value: verify, setValue: setVerify } = useInput('')
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
    await signUp({ email, name, password, phone })
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
    if (phone.length === 11) {
      checkExistPhone(phone, setIsExistPhoneNumber, setPhoneCheckErrorMsg)
    } else {
      setIsExistPhoneNumber(false)
    }
  }, [phone])

  return (
    <div className="w-[900px] mx-auto mt-[150px] py-[100px] flex flex-col items-center text-3xl  rounded-md">
      <span className="text-main text-4xl mb-[10px]">Foodiful</span>회원가입
      <Input
        style=" ml-[38px] w-[300px]"
        name="이메일"
        type="text"
        value={email}
        setValue={setEmail}
        validate={emailValidate}
        placeholder="이메일을 입력해주세요"
        errorText="이메일 형식에 맞춰 작성해주세요"
      />
      <Input
        style="ml-[64px] w-[300px]"
        name="이름"
        type="text"
        minLength={2}
        maxLength={10}
        value={name}
        setValue={setName}
        placeholder="이름을 입력해주세요"
        errorText="2자 이상 10자 이하로 입력해주세요"
      />
      <Input
        style="ml-[24px] w-[300px]"
        name="패스워드"
        type="password"
        minLength={6}
        maxLength={12}
        value={password}
        setValue={setPassword}
        validate={passwordValidate}
        placeholder="패스워드를 입력해주세요"
        errorText="6~12자 영문, 숫자를 포함해 작성해주세요"
      />
      <div className="relative">
        <Input
          style="ml-[38px] w-[300px] mt-[30px]"
          isPhoneInputDisabled={isPhoneInputDisabled}
          name="휴대폰"
          type="tel"
          minLength={0}
          maxLength={11}
          value={phone}
          setValue={setPhone}
          placeholder="예시) 01012341234"
          errorText={phoneCheckErrorMsg}
        />

        {!isClickedVerifyPhone && !verifiedPhone && (
          <button
            disabled={!isExistPhoneNumber}
            className="absolute text-xl w-[80px] right-0 bottom-[8px] hover:text-main disabled:text-[#999] "
            onClick={() => {
              setIsClickedVerifyPhone(true)
              sendVerifySms(phone, setTime, setVerifyExpiredTxt)
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
              style="mx-[30px] w-[160px] text-xl"
              type="tel"
              minLength={3}
              maxLength={10}
              value={verify}
              setValue={setVerify}
              placeholder="인증번호"
            />
            <span className="text-main text-2xl">
              {Math.floor(time / 60)} : {getSeconds(time)}
            </span>
            <button
              className="border-2 border-main w-[90px] h-[40px] ml-[20px] rounded-md text-2xl hover:border-[white] hover:text-[white] hover:bg-main"
              onClick={() =>
                checkVerifySms(
                  phone,
                  verify,
                  setVerifiedPhone,
                  setIsClickedVerifyPhone,
                  setIsPhoneInputDisabled,
                  setVerify,
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
