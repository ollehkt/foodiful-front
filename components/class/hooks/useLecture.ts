import { useQuery } from '@tanstack/react-query'
import { api } from '../../axios/axiosInstance'
import { queryKeys } from '../../../query-keys/queryKeys'
import useToast from '../../common/hooks/useToast'
import { getStoredUser } from '../../util/userStorage'

const getLectures = async () => {
  const user = getStoredUser()
  const { data } = await api('/lecture/all', {
    headers: {
      Authorization: user ? `Bearer ${user.token}` : undefined,
    },
  })
  return data
}

export const useGetLectures = () => {
  const { fireToast } = useToast()
  const { data, isFetching } = useQuery({
    queryKey: [queryKeys.lecture],
    queryFn: getLectures,
    onSuccess: () => {},
    onError: () => {
      fireToast({
        id: '전체 클래스 호출',
        message: '클래스를 불러오는데 실패했습니다. 다시 시도해주세요.',
        position: 'bottom',
        timer: 1000,
        type: 'failed',
      })
    },
  })
  return { data, isFetching }
}

const getLectureByLectureId = async (id: number) => {
  const { data } = await api(`/lecture/${id}`)
  return data
}

export const useGetLectureByLectureId = (id: number) => {
  const { fireToast } = useToast()
  const { data, isFetching } = useQuery({
    queryKey: [queryKeys.lecture, id],
    queryFn: () => getLectureByLectureId(id),
    onSuccess: () => {},
    onError: () => {
      fireToast({
        id: '상세 클래스 호출',
        message: '클래스 상세 페이지를 불러오는데 실패했습니다. 다시 시도해주세요.',
        position: 'bottom',
        timer: 1000,
        type: 'failed',
      })
    },
  })
  return { data, isFetching }
}
