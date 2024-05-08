import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '../../axios/axiosInstance'
import { queryKeys } from '../../../query-keys/queryKeys'
import useToast from '../../common/hooks/useToast'
import { getStoredUser } from '../../util/userStorage'
import { LectureType } from '../types/lectureTypes'
import { useRouter } from 'next/router'
import { isAxiosError } from 'axios'

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

export const getLectureByLectureId = async (id: string) => {
  const { data } = await api(`/lecture/${id}`)
  return data
}

export const useGetLectureByLectureId = (id: string) => {
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

const addLecture = async (lecture: Omit<LectureType, 'id'>) => {
  const user = getStoredUser()
  if (user) {
    return api.post(
      '/lecture',
      {
        ...lecture,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
  }
}

export const useAddLecture = () => {
  const router = useRouter()
  const { fireToast } = useToast()
  const { mutate: addLectureMutate } = useMutation({
    mutationFn: ({ lecture }: { lecture: Omit<LectureType, 'id'> }) => addLecture(lecture),
    onSuccess: () => {
      fireToast({
        id: '상품 등록',
        type: 'success',
        message: '상품 등록이 완료 되었습니다.',
        position: 'bottom',
        timer: 2000,
      })
      router.push('/product')
    },
    onError: () => {
      fireToast({
        id: '상품 등록 실패',
        type: 'failed',
        message: '상품 등록 실패',
        position: 'bottom',
        timer: 2000,
      })
    },
  })

  return { addLectureMutate }
}

const updateLecture = async (lectureId: number, lecture: Omit<LectureType, 'id'>) => {
  const user = getStoredUser()
  if (user) {
    const { data } = await api.patch(
      `/lecture/${lectureId}`,
      {
        ...lecture,
      },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    )
    return data
  }
}

export const useUpdateLecture = () => {
  const { fireToast } = useToast()
  const router = useRouter()
  const { mutate: updateLectureMutation } = useMutation({
    mutationFn: ({ lectureId, lecture }: { lectureId: number; lecture: Omit<LectureType, 'id'> }) =>
      updateLecture(lectureId, lecture),
    onSuccess: () => {
      fireToast({
        id: '상품 업데이트',
        type: 'success',
        message: '상품 업데이트가 완료 되었습니다.',
        position: 'bottom',
        timer: 2000,
      })
      router.push('/lecture')
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        fireToast({
          id: '상품 업데이트 실패',
          type: 'failed',
          message: error.response?.data.message,
          position: 'bottom',
          timer: 2000,
        })
      }
      fireToast({
        id: '상품 업데이트 실패',
        type: 'failed',
        message: '상품 업데이트에 실패했습니다.',
        position: 'bottom',
        timer: 2000,
      })
    },
  })
  return { updateLectureMutation }
}
