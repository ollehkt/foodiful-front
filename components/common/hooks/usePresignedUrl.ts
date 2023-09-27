import { api } from '../../axios/axiosInstance'

const getPresignedUrl = async (types: string[], bucket: string) => {
  const res = await api.post('/aws/presignedurl', {
    types,
    bucket,
  })
  return res.data
}

export default getPresignedUrl
