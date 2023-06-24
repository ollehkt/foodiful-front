import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  withCredentials: true,
})

// api.interceptors.response.use(
//   (res) => {
//     return res
//   },
//   async (err) => {
//     const {
//       response: { status },
//       config,
//     } = err
//     // if (status === 401 || status === 500) {
//     //   try {
//     //     const res = refreshApi({})
//     //     return res
//     //   } catch (error) {
//     //     if (err.status === 401) {
//     //       await api.post('/auth/logout')
//     //     }
//     //   }
//     // }
//     throw new Error(err)
//   }
// )
// export default api
export const authenticateApi = axios.create({
  baseURL: `${BASE_URL}/auth/authenticate`,
  withCredentials: true,
})
authenticateApi.interceptors.response.use(
  (res) => res,
  (err) => {
    const {
      response: { status },
    } = err
    if (status === 401) {
      refreshApi({})
    }
  }
)

const refreshApi = axios.create({
  baseURL: `${BASE_URL}/auth/refresh`,
  withCredentials: true,
})
refreshApi.interceptors.response.use(
  (res) => res,
  async (err) => {
    const {
      response: { status },
    } = err
    if (status === 401 || status === 500) {
      try {
        await api({ url: 'auth/logout', method: 'POST' })
        return alert('로그아웃 되었습니다')
      } catch (error) {
        console.error(error)
      }
    }
  }
)
