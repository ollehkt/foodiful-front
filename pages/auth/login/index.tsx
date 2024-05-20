'use client'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Input } from '../../../components/common/Input'
import { useInput } from '../../../components/common/hooks/useInput'
import { useValidate } from '../../../components/auth/hooks/useValidate'
import { useAuth } from '../../../components/auth/hooks/useAuth'
import { Button } from '../../../components/common/Button'
import { SignInType } from '../../../components/auth/types/user'
import Link from 'next/link'

function SignIn() {
  const { state: signInValue, onChangeInput } = useInput<SignInType, string>({
    email: '',
    password: '',
  })
  const router = useRouter()
  const { signIn } = useAuth()
  const { emailValidate, passwordValidate } = useValidate()
  const [isValidated, setIsValidated] = useState(false)

  useEffect(() => {
    if (emailValidate(signInValue.email) && passwordValidate(signInValue.password)) {
      setIsValidated(true)
    } else setIsValidated(false)
  }, [signInValue, emailValidate, passwordValidate])

  return (
    <div className="w-min md:w-[900px] mx-auto mt-[40px] py-[60px] flex flex-col items-center text-3xl  rounded-md">
      <span className="text-main text-4xl mb-[10px]">Foodiful</span>로그인
      <Input
        style="md:ml-[38px] w-[300px] outline-none py-[4px] pl-[8px] border-b-2"
        labelStyle="my-[30px] relative text-xl"
        labelName="이메일"
        type="text"
        value={signInValue.email}
        name="email"
        onChangeInput={onChangeInput}
        validate={emailValidate}
        placeholder="이메일을 입력해주세요"
        errorText="이메일 형식에 맞춰 입력해주세요"
      />
      <Input
        style="md:ml-[24px] w-[300px] outline-none py-[4px] pl-[8px] border-b-2"
        labelStyle="my-[30px] relative text-xl"
        labelName="패스워드"
        type="password"
        minLength={6}
        maxLength={12}
        value={signInValue.password}
        name="password"
        onChangeInput={onChangeInput}
        validate={passwordValidate}
        placeholder="패스워드를 입력해주세요"
        errorText="패스워드를 6자 이상 12자 이하로 입력해주세요"
      />
      <Button
        onClick={() => signIn(signInValue)}
        style="mt-[40px] bg-main text-[#fff] "
        title="로그인"
        size="md"
        disabled={!isValidated}
      />
      <Button
        onClick={() => router.push('/auth/signup')}
        style="mt-[40px] bg-white text-main hover:bg-main"
        title="회원가입"
        size="md"
      />
    </div>
  )
}

export default SignIn
