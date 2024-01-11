import axios from 'axios'

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_URL
    : process.env.NEXT_PUBLIC_PROD_URL

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  withCredentials: true,
})

api.interceptors.response.use((response) => {
  // 401일때 유저 로그인 검증하는 로직 작성해야함.
  // if (response.status === 401)
  return response.data
})
