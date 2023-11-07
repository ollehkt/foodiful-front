import axios from 'axios'
import { api } from '../../axios/axiosInstance'
import useToast from './useToast'

export const useGetPresignedUrl = () => {
  const { fireToast } = useToast()
  const getPresignedUrlByFiles = async (
    files: File[] | Blob[],
    bucket: string
  ): Promise<string[] | undefined> => {
    try {
      const fileTypes = files.map((file) => {
        return file.type
      })
      const { data: presignedData } = await api.post('/aws/presignedurl', {
        types: fileTypes,
        bucket,
      })

      const urls: string[] = await Promise.all(
        files.map(async (file, idx) => {
          // url을 split을 통해 뽑아낸다
          const url = presignedData[idx].split('?')[0]
          await axios.put(url, file, {
            headers: { 'Content-Type': file.type },
          })
          return url
        })
      )
      return urls
    } catch (error) {
      fireToast({
        id: 'presign url',
        type: 'failed',
        position: 'bottom',
        message: '사진을 다시 업로드 해주세요.',
        timer: 2000,
      })
    }
  }

  return { getPresignedUrlByFiles }
}
