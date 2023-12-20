import { useEffect } from 'react'

export default function KakaoLogin() {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code')
    // 받은 코드(토큰)를 api 요청하는 함수의 인수로 넣어주기
    // KakaoLogin(code)
  }, [])

  // 로딩 스피너
  return <>loading</>
}
