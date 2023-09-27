export const useValidate = () => {
  const emailValidate = (email: string) => {
    const regExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/
    return regExp.test(email)
  }
  const passwordValidate = (password: string) => {
    const regExp = /^[A-Za-z0-9]{6,12}$/
    return regExp.test(password)
  }
  return { emailValidate, passwordValidate }
}

// 이메일
// 이름 및 패스워드 길이
// 패스워드 문자 숫자 포함
// 핸드폰
