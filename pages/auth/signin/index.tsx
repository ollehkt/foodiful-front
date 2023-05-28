import React from 'react'
import { Input } from '../../../components/common/Input'
import { useInput } from '../../../components/hooks/useInput'
import { httpRequest } from '../../../components/lib/httpRequest'

function SignIn() {
  const { value: password, setValue: setPassword } = useInput('')
  const { value: userId, setValue: setUserId } = useInput('')
  const onClickSignInBtn = () => {
    const res = httpRequest('/auth/signin')('POST', {
      password,
      userId,
    })('로그인에 실패했습니다.')()
    console.log(res)
  }
  return (
    <div className="w-[600px] mx-auto mt-[200px] py-[100px] flex flex-col items-center text-3xl border-2 border-main rounded-md">
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
