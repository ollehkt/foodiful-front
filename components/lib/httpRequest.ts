import axios from 'axios'
import { api } from '../axios/axiosInstance'
import { tryCatch } from '../auth/hooks/tryCatch'
export const httpRequest =
  (url: string) =>
  (method: string = 'GET', data: any = {}) =>
  (errorMsg: string = '요청이 실패하였습니다') =>
  async (token: any = '') => {
    const res = await tryCatch(
      api({
        url,
        method,
        data,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',

          Authorization: token ? `Bearer ${token}` : null,
        },
      }),
      console.error()
    )
    return res
  }

// export const userRequest = httpRequest('/auth')
