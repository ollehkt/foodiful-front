'use client'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Input } from '../../../components/common/Input'
import { useInput } from '../../../components/common/hooks/useInput'
import { useValidate } from '../../../components/auth/hooks/useValidate'
import { useAuth } from '../../../components/auth/hooks/useAuth'
import { Button } from '../../../components/common/Button'

function SignIn() {
  const { state: signInValue, onChangeInput } = useInput({
    email: '',
    password: '',
  })
  const router = useRouter()
  const { signIn } = useAuth()
  const { emailValidate, passwordValidate } = useValidate()

  return (
    <div className="w-full h-screen mx-auto mt-[150px] py-[100px] flex flex-col items-center text-3xl  rounded-md">
      <span className="text-main text-4xl mb-[10px]">Foodiful</span>로그인
      <Input
        style="ml-[38px] outline-none py-[4px] pl-[8px] border-b-2"
        labelStyle="my-[30px] relative text-2xl"
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
        style="ml-[12px] outline-none py-[4px] pl-[8px] border-b-2"
        labelStyle="my-[30px] relative text-2xl"
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
        style="mt-[40px] bg-primary text-[#fff] "
        title="로그인"
        size="md"
      />
      <div className="mt-[10px]">
        <Button
          onClick={() => signIn(signInValue)}
          style="mt-[20px] bg-[#fee501] text-[#000] text-xl mx-[10px] hover:bg-[#eed700]"
          title="카카오톡 로그인"
          size="lg"
        />
        <Button
          onClick={() => signIn(signInValue)}
          style="mt-[20px] bg-primary text-[#fff] text-xl mx-[10px]"
          title="구글 로그인"
          size="lg"
        />
      </div>
    </div>
  )
}

export default SignIn
