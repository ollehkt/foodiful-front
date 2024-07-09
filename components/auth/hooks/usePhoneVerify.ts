import axios from 'axios'
import { useState } from 'react'
import { api } from '../../axios/axiosInstance'
import useToast from '../../common/hooks/useToast'

/**
 * 핸드폰 번호 수정 눌렀을 때 번호 input able
 * 취소 했을 때 input disable 및 초기 상태로 돌아감
 * 인증 눌렀을 때 번호 존재한다면, 에러 텍스트만 띄우고 변경 없음
 * 인증 눌렀을 때 번호 존재x, 인증번호 창과 확인 버튼 등 띄우기
 * 취소 눌렀을 때는 다시 초기 상태로
 * 재시도 눌렀을 떄는 시간만 초기화
 */

const usePhoneVerfiy = () => {
  const { fireToast } = useToast()
  // input disable 여부
  const [isPhoneInputDisabled, setIsPhoneInputDisabled] = useState(false)
  // 존재하는 번호인지 여부
  const [isExistPhoneNumber, setIsExistPhoneNumber] = useState(false)
  // 번호 체크 후 에러 메시지
  const [phoneCheckErrorMsg, setPhoneCheckErrorMsg] = useState('')
  // 인증 버튼 눌렀는지 여부
  const [isClickedVerifyPhone, setIsClickedVerifyPhone] = useState(false)
  // 검증 시간
  const [time, setTime] = useState(180) // 남은 시간 (단위: 초)
  // 만료 시 텍스트
  const [verifyExpiredTxt, setVerifyExpiredTxt] = useState('')
  // 핸드폰 인증 여부
  const [isVerifiedPhone, setIsVerifiedPhone] = useState(false)

  const checkExistPhone = async (phone: string) => {
    try {
      const res = await api.get(`/auth/checkphone/exists?phone=${phone}`)

      if (res) setIsExistPhoneNumber(false)
      setPhoneCheckErrorMsg('')
      return true
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
          setIsExistPhoneNumber(true)
          setPhoneCheckErrorMsg(error.response.data.message)
        }
      }
    }
  }

  const sendVerifySms = async (phone: string) => {
    try {
      if (!isExistPhoneNumber) {
        await api.post('/auth/checkphone', {
          phoneNumber: phone,
        })

        setVerifyExpiredTxt('')
      }
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
      setTime(0)
      setIsPhoneInputDisabled(false)
      setIsClickedVerifyPhone(false)
    }
  }

  const checkVerifySms = async (phone: string, verify: string, resetPhone: () => void) => {
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
      setIsVerifiedPhone(true)
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
          setIsVerifiedPhone(false)
          setIsClickedVerifyPhone(false)
          resetPhone()
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
          setIsVerifiedPhone(false)
          setIsClickedVerifyPhone(false)
          resetPhone()
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
    setIsVerifiedPhone,
    time,
    isVerifiedPhone,
    verifyExpiredTxt,
    isClickedVerifyPhone,
    isExistPhoneNumber,
    phoneCheckErrorMsg,
    isPhoneInputDisabled,
  }
}
export default usePhoneVerfiy
