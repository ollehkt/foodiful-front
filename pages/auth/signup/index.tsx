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
    setIsExistPhoneNumber,
    setTime,
    setIsPhoneInputDisabled,
    checkExistPhone,
    setIsVerifiedPhone,
    setPhoneCheckErrorMsg,
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

  useEffect(() => {
    if (signUpValue.phone.length === 11) {
      checkExistPhone(signUpValue.phone)
    } else {
      setIsExistPhoneNumber(false)
    }
  }, [signUpValue.phone])

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
        <div className="relative mt-[30px]">
          {!isClickedVerifyPhone && !isVerifiedPhone && (
            <button
              disabled={signUpValue.phone.length !== 11}
              className="absolute text-xl w-[80px] right-0 bottom-[36px] hover:text-main disabled:text-[#999] "
              onClick={async () => {
                const isNotExist = await checkExistPhone(signUpValue.phone)

                if (isNotExist) {
                  setIsClickedVerifyPhone(true)
                  sendVerifySms(signUpValue.phone)
                  setIsPhoneInputDisabled(true)
                  setTime(180)
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
      </div>
      <div className="my-10 text-xl">
        <p className="text-left mb-3">개인정보 처리 방침</p>
        <div className="border-2 rounded-md w-[300px] md:w-[600px] h-32 scroll- overflow-y-scroll px-2">
          <p className="text-sm leading-6 break-keep">
            개인정보 처리방침 요약 푸디풀은 고객의 개인정보 보호를 매우 중요하게 여기며, 관련 법규를
            준수하고 있습니다. 개인정보 처리방침을 홈페이지에 공개하여 고객들이 언제든 확인할 수
            있도록 하고 있으며, 법률 및 내부 정책 변경에 따라 수시로 개정되므로 고객들은 수시로
            확인할 것을 권장합니다.
          </p>
          <h1 className="my-5 text-2xl">개인정보 수집 및 이용 목적</h1>
          <li className="text-base">회원 가입 및 관리</li>
          <li className="text-base">상품 및 서비스 제공</li>
          <li className="text-base">마케팅 및 광고에 활용</li>
          <h1 className="my-5 text-2xl">수집하는 개인정보 항목</h1>
          <li className="text-base">이름, 이메일 주소, 휴대폰 번호</li>
          <h1 className="my-5 text-2xl">개인정보 보유 및 이용 기간</h1>
          <li className="text-base">회원 탈퇴 시까지 또는 관련 법령에 따른 보존기간 동안 보관</li>
          <h1 className="my-5 text-2xl">개인정보 제3자 제공</h1>
          <li className="text-base">
            배송업체, 결제 대행사 등 서비스 제공을 위해 필요한 경우에 한해 제공
          </li>
          <h1 className="my-5 text-2xl">개인정보 처리 위탁</h1>
          <li className="text-base">
            전산 시스템 운영, 고객 상담 등의 업무를 외부 업체에 위탁하여 처리할 수 있음
          </li>
          <h1 className="my-5 text-2xl">개인정보 열람 및 정정</h1>
          <li className="text-base">회원 가입 시 등록한 정보는 언제든 열람 및 정정 가능</li>
          <h1 className="my-5 text-2xl">개인정보 파기 절차 및 방법</h1>
          <li className="text-base">보유 기간 경과 시 지체 없이 파기</li>
          <p className="my-5 text-base break-keep">
            푸디풀은 고객의 개인정보 보호를 위해 최선을 다하고 있습니다. 개인정보 처리방침은 관련
            법령 및 내부 정책 변경에 따라 수시로 업데이트되므로, 고객 여러분께서는 정기적으로 확인해
            주시기 바랍니다.
          </p>
        </div>
      </div>
      <Button
        disabled={
          !signUpValue.email || !signUpValue.name || !signUpValue.password || !isVerifiedPhone
        }
        style="bg-main text-white text-2xl hover:text-white hover:bg-hover"
        title="회원가입"
        size="md"
        onClick={onClickSignUpBtn}
      />
    </div>
  )
}

export default SignUp
