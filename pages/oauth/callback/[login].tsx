import React, { useEffect } from 'react'

export default function Kakao() {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code')
    const fetchUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&code=${code}`
    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
  }, [])

  // 로딩 스피너
  return <>loading</>
}
