import axios from 'axios'
import api from '../axios/axiosInstance'
export const httpRequest =
  (url: string) =>
  (method: string = 'GET', data: any = {}) =>
  (errorMsg: string = '요청이 실패하였습니다') =>
  async (contentType: string = 'application/json') => {
    try {
      const res = api({
        url,
        method,
        data,
        headers: {
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*',
        },
      })
      return res
    } catch (error) {
      throw Error(errorMsg)
    }
  }

// export const userRequest = httpRequest('/auth')
