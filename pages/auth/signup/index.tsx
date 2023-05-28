import React, { FormEvent } from 'react'
import { Input } from '../../../components/common/Input'
import { useInput } from '../../../components/hooks/useInput'
import { useUser } from '../../../components/hooks/useUser'
import { httpRequest } from '../../../components/lib/httpRequest'

function SignUp() {
  const { value: name, setValue: setName } = useInput('')
  const { value: password, setValue: setPassword } = useInput('')
  const { value: userId, setValue: setUserId } = useInput('')
  const { value: phone, setValue: setPhone } = useInput('')
  const onClickSignUpBtn = () => {
    const res = httpRequest('/auth/signup')('POST', {
      name,
      password,
      userId,
      phone,
    })('회원가입에 실패했습니다.')()
    console.log(res)
  }

  return (
    <div className="w-[600px] mx-auto mt-[200px] py-[100px] flex flex-col items-center text-3xl border-2 border-main rounded-md">
      <span className="text-main text-4xl mb-[10px]">Foodiful</span>회원가입
      <form className="flex flex-col">
        <Input
          style=" ml-[38px]"
          name="아이디"
          type="text"
          minLength={3}
          maxLength={10}
          value={userId}
          setValue={setUserId}
          placeholder="아이디를 입력해주세요"
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
          style="ml-[12px]"
          name="패스워드"
          type="password"
          minLength={6}
          maxLength={12}
          value={password}
          setValue={setPassword}
          placeholder="패스워드를 입력해주세요"
        />

        <Input
          style=" ml-[38px]"
          name="휴대폰"
          type="number"
          minLength={3}
          maxLength={10}
          value={phone}
          setValue={setPhone}
          placeholder="번호만 입력해주세요"
        />
        <button className="mt-[40px]" onClick={onClickSignUpBtn}>
          회원가입
        </button>
      </form>
     
    </div>
  )
}

export default SignUp
