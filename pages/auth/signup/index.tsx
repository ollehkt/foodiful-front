'use client'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Input } from '../../../components/common/Input'
import { useInput } from '../../../components/hooks/useInput'
import { useUser } from '../../../components/hooks/useUser'
import { httpRequest } from '../../../components/lib/httpRequest'
import { api } from '../../../components/axios/axiosInstance'
import axios, { AxiosError } from 'axios'
import { emailValidate, passwordValidate } from '../../../components/hooks/useValidate'
function SignUp() {
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

  const onClickReqVerifyNum = async (phone: any, verify: any) => {
    // 검증 됐을 때 로직
    try {
      const res = await api.post('/auth/checkphone/verify', {
        data: {
          phoneNumber: phone,
          verifyCode: verify,
        },
      })
      console.log(res)
      setVerifiedPhone(true)
      setIsClickedVerifyPhone(false)
      setIsPhoneInputDisabled(true)
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeverifyPhone = async (phone: string) => {
    try {
      if (phone.length === 11) {
        const res = await api.get(`/auth/checkphone/exists?phone=${phone}`, {})
        if (res) setIsExistPhoneNumber(true)
        setPhoneCheckErrorMsg('')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 409) {
          setPhoneCheckErrorMsg(error.response.data.message)
        }
      }
    }
  }

  const onClickVerifyphone = async (phone: string | number) => {
    try {
      const res = await api.post('/auth/checkphone', {
        phoneNumber: phone,
      })
      setTime(180)
      setVerifyExpiredTxt('')
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  const onClickSignUpBtn = async () => {
    const res = await httpRequest('/auth/signup')('POST', {
      email,
      name,
      password,
      phone,
    })('회원가입에 실패했습니다.')()
    console.log(res)
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
    onChangeverifyPhone(phone)
    if (phone.length <= 11) {
      setIsExistPhoneNumber(false)
    }
  }, [phone])

  // 0초가 됐을 때 알림

  return (
    <div className="w-[900px] mx-auto mt-[200px] py-[100px] flex flex-col items-center text-3xl border-2 border-main rounded-md">
      <span className="text-main text-4xl mb-[10px]">Foodiful</span>회원가입
      <Input
        style=" ml-[38px]"
        name="이메일"
        type="email"
        value={email}
        setValue={setEmail}
        validate={emailValidate}
        placeholder="이메일을 입력해주세요"
        errorText="이메일 형식에 맞춰 작성해주세요"
      />
      <Input
        style="ml-[64px]"
        name="이름"
        type="text"
        minLength={3}
        maxLength={10}
        value={name}
        setValue={setName}
        placeholder="이름을 입력해주세요"
      />
      <Input
        style="ml-[24px]"
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
          style="ml-[38px] mt-[30px]"
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
              onClickVerifyphone(phone)
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
              style="mx-[30px] w-[120px] text-xl"
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
              onClick={() => onClickReqVerifyNum(phone, verify)}
            >
              확인
            </button>
          </>
        ) : (
          <span className="text-main text-2xl mt-[20px]">{verifyExpiredTxt}</span>
        )}
      </div>
      <button
        disabled={!verifiedPhone}
        className="mt-[40px] border-2 border-main rounded-md text-3xl p-2 disabled:bg-[#999] disabled:text-[#666] disabled:border-0"
        onClick={onClickSignUpBtn}
      >
        회원가입
      </button>
    </div>
  )
}

export default SignUp
