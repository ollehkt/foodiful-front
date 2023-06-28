import axios from 'axios'
import { api } from '../../../axios/axiosInstance'
import useToast from '../../../common/hooks/useToast'
import { removeStoredUser } from '../../../util/userStorage'
import { SignInType, SignUpType } from '../../types/user'
import { useUser } from '../useUser'

interface UseAuth {
  signIn: (param: SignInType) => void
  signUp: (param: SignUpType) => void
  signOut: () => void
}

export const useAuth = (): UseAuth => {
  const { fireToast } = useToast()

  const signIn = async ({ email, password }: SignInType) => {
    try {
      const res = await api.post('/auth/signin', {
        email,
        password,
      })
      if (res) {
        fireToast({
          id: '로그인',
          type: 'success',
          position: 'bottom',
          message: '로그인이 완료되었습니다.',
          timer: 1000,
        })
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          fireToast({
            id: '로그인',
            type: 'failed',
            position: 'bottom',
            message: '패스워드를 확인해주세요.',
            timer: 2000,
          })
        } else {
          fireToast({
            id: '서버 에러',
            type: 'failed',
            position: 'bottom',
            message: '서버에러 입니다. 다시 시도해주세요.',
            timer: 2000,
          })
        }
      }
    }
  }
  const signUp = async ({ email, password, phone, name }: SignUpType) => {
    try {
      const res = await api.post('/auth/signup', { email: email, password: password, phone })
      if (res)
        fireToast({
          id: '회원가입 완료',
          type: 'success',
          position: 'bottom',
          message: '회원가입이 완료되었습니다. 로그인 해주세요.',
          timer: 2000,
        })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          fireToast({
            id: '회원가입 이메일 충돌 에러',
            type: 'failed',
            position: 'bottom',
            message: '이미 존재하는 이메일입니다.',
            timer: 2000,
          })
        } else {
          fireToast({
            id: '서버 에러',
            type: 'failed',
            position: 'bottom',
            message: '서버에러 입니다. 다시 시도해주세요.',
            timer: 2000,
          })
        }
      }
    }
  }
  const signOut = async () => {
    removeStoredUser()
    fireToast({
      id: '로그아웃',
      type: 'success',
      position: 'bottom',
      message: '로그아웃이 완료되었습니다.',
      timer: 2000,
    })
  }

  return { signIn, signUp, signOut }
}
