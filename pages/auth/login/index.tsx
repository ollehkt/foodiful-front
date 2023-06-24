'use client'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Input } from '../../../components/common/Input'
import { useInput } from '../../../components/hooks/useInput'
import { httpRequest } from '../../../components/lib/httpRequest'

function SignIn() {
  const { value: userId, setValue: setUserId } = useInput('')
  const { value: password, setValue: setPassword } = useInput('')

  const router = useRouter()
  const onClickSignInBtn = async () => {
    try {
      const res = await httpRequest('/auth/login')('POST', {
        password,
        userId,
      })('로그인에 실패했습니다.')()
      console.log(res)
      await localStorage.setItem('jwt', res.data.token)
    } catch (error) {
      console.log(error)
    } finally {
      router.push('/')
    }
  }
  return (
    <div className="w-screen h-screen mx-auto mt-[200px] py-[100px] flex flex-col items-center text-3xl  rounded-md">
      <span className="text-main text-4xl mb-[10px]">Foodiful</span>로그인
      <Input
        style="ml-[38px]"
        name="아이디"
        type="text"
        minLength={3}
        maxLength={10}
        value={userId}
        setValue={setUserId}
        placeholder="아이디를 입력해주세요"
        errorText="아이디를 3자 이상 10자 이하로 입력해주세요"
      />
      <Input
        style="ml-[12px]"
        name="패스워드"
        type="password"
        minLength={3}
        maxLength={10}
        value={password}
        setValue={setPassword}
        placeholder="패스워드를 입력해주세요"
        errorText="패스워드를 3자 이상 10자 이하로 입력해주세요"
      />
      <button onClick={onClickSignInBtn} className="mt-[40px]">
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
