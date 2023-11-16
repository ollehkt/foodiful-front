import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
import { api } from '../../axios/axiosInstance'
import useToast from '../../common/hooks/useToast'

const usePhoneVerfiy = () => {
  const { fireToast } = useToast()
  const [isPhoneInputDisabled, setIsPhoneInputDisabled] = useState(false)
  const [isExistPhoneNumber, setIsExistPhoneNumber] = useState(false)
  const [phoneCheckErrorMsg, setPhoneCheckErrorMsg] = useState('')
  const [isClickedVerifyPhone, setIsClickedVerifyPhone] = useState(false)
  const [time, setTime] = useState(-1) // 남은 시간 (단위: 초)
  const [verifyExpiredTxt, setVerifyExpiredTxt] = useState('')
  const [verifiedPhone, setVerifiedPhone] = useState(false)

  const checkExistPhone = async (phone: string) => {
    try {
      const res = await api.get(`/auth/checkphone/exists?phone=${phone}`)
      if (res) setIsExistPhoneNumber(true)
      setPhoneCheckErrorMsg('')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        fireToast({
          id: '존재하는 휴대폰 번호입니다',
          type: 'failed',
          message: error?.response?.data.message,
          position: 'bottom',
          timer: 1000,
        })
        if (error?.response?.status === 409) {
          setPhoneCheckErrorMsg(error.response.data.message)
        }
      }
    }
  }

  const sendVerifySms = async (phone: string | number) => {
    try {
      const res = await api.post('/auth/checkphone', {
        phoneNumber: phone,
      })
      setTime(180)
      setVerifyExpiredTxt('')
      console.log(res)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        fireToast({
          id: '문자 전송 오류',
          type: 'failed',
          message: '전송 오류입니다. 잠시 후 다시 시도해주세요.',
          position: 'bottom',
          timer: 2000,
        })
      }
    }
  }

  const checkVerifySms = async (phone: string, verify: string, resetSignUpValue: () => void) => {
    try {
      const res = await api.post('/auth/checkphone/verify', {
        data: {
          phoneNumber: phone,
          verifyCode: verify,
        },
      })
      if (res) {
        fireToast({
          id: '인증 완료',
          type: 'success',
          message: '인증이 완료되었습니다.',
          position: 'bottom',
          timer: 2000,
        })
      }
      setVerifiedPhone(true)
      setIsClickedVerifyPhone(false)
      setIsPhoneInputDisabled(true)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 401) {
          fireToast({
            id: '인증번호 오류',
            type: 'failed',
            message: '인증번호가 틀립니다.',
            position: 'bottom',
            timer: 2000,
          })
          setVerifiedPhone(false)
          setIsClickedVerifyPhone(false)
          resetSignUpValue()
          setIsPhoneInputDisabled(false)
          setVerifyExpiredTxt('인증번호 오류입니다. 다시 시도해주세요')
        } else if (error?.response?.status === 404) {
          fireToast({
            id: '인증번호 만료',
            type: 'failed',
            message: '인증번호가 만료되었습니다.',
            position: 'bottom',
            timer: 2000,
          })
          setVerifiedPhone(false)
          setIsClickedVerifyPhone(false)
          resetSignUpValue()
          setIsPhoneInputDisabled(false)
          setVerifyExpiredTxt('인증번호가 만료되었습니다.')
        }
      }
    }
  }

  return {
    sendVerifySms,
    checkExistPhone,
    checkVerifySms,
    setVerifyExpiredTxt,
    setIsClickedVerifyPhone,
    setIsExistPhoneNumber,
    setPhoneCheckErrorMsg,
    setTime,
    setIsPhoneInputDisabled,
    time,
    verifiedPhone,
    verifyExpiredTxt,
    isClickedVerifyPhone,
    isExistPhoneNumber,
    phoneCheckErrorMsg,
    isPhoneInputDisabled,
  }
}
export default usePhoneVerfiy
