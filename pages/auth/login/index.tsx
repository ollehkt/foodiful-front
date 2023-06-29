'use client'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { api } from '../../../components/axios/axiosInstance'
import { Input } from '../../../components/common/Input'
import { useInput } from '../../../components/common/hooks/useInput'
import { emailValidate, passwordValidate } from '../../../components/auth/hooks/useValidate'
import { httpRequest } from '../../../components/lib/httpRequest'
import { setStoreUser } from '../../../components/util/userStorage'
import { useAuth } from '../../../components/auth/hooks/useAuth'

function SignIn() {
  const { value: email, setValue: setEmail } = useInput('')
  const { value: password, setValue: setPassword } = useInput('')
  const router = useRouter()
  const { signIn } = useAuth()

  return (
    <div className="w-screen h-screen mx-auto mt-[200px] py-[100px] flex flex-col items-center text-3xl  rounded-md">
      <span className="text-main text-4xl mb-[10px]">Foodiful</span>로그인
      <Input
        style="ml-[38px]"
        name="이메일"
        type="text"
        value={email}
        setValue={setEmail}
        validate={emailValidate}
        placeholder="이메일을 입력해주세요"
        errorText="이메일 형식에 맞춰 입력해주세요"
      />
      <Input
        style="ml-[12px]"
        name="패스워드"
        type="password"
        minLength={6}
        maxLength={12}
        value={password}
        setValue={setPassword}
        validate={passwordValidate}
        placeholder="패스워드를 입력해주세요"
        errorText="패스워드를 6자 이상 12자 이하로 입력해주세요"
      />
      <button onClick={() => signIn({ email, password })} className="mt-[40px]">
        로그인
      </button>
      <div className="mt-[40px]">
        <button>카카오톡 로그인</button>
        <button>구글 로그인</button>
      </div>
    </div>
  )
}

export default SignIn
