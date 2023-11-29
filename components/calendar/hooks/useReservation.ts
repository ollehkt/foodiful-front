import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { queryKeys } from '../../../query-keys/queryKeys'
import { api } from '../../axios/axiosInstance'
import useToast from '../../common/hooks/useToast'
import { getStoredUser } from '../../util/userStorage'
import {
  PostReservationType,
  ReservationTypes,
  updateReservartionType,
} from '../types/reservationTypes'

const postReservation = async (reservationData: PostReservationType) => {
  const user = getStoredUser()

  const { data } = await api.post(
    '/reservation',
    {
      classId: reservationData.classId,
      reserveDate: reservationData.reserveDate,
    },
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  )
  return data
}

export const useMutateReservation = () => {
  const { fireToast } = useToast()
  const router = useRouter()
  const { mutate } = useMutation({
    mutationFn: (reservationData: PostReservationType) => postReservation(reservationData),
    onSuccess: () => {
      fireToast({
        id: '예약 등록',
        type: 'success',
        message: '예약이 완료 되었습니다.',
        position: 'bottom',
        timer: 2000,
      })
      router.push('/')
    },
    onError: () => {
      fireToast({
        id: '예약 실패',
        type: 'failed',
        message: '예약을 다시 시도해주세요.',
        position: 'bottom',
        timer: 2000,
      })
    },
  })
  return { mutate }
}

const getReservations = async () => {
  const { data } = await api('/reservation')
  return data
}

export const useGetReservations = () => {
  const { fireToast } = useToast()
  const router = useRouter()
  const { data, isFetching } = useQuery({
    queryKey: [queryKeys.reservation],
    queryFn: getReservations,

    onError: () => {
      fireToast({
        id: '예약 조회 실패',
        type: 'failed',
        message: '예약 조회에 실패했습니다. 다시 시도해주세요.',
        position: 'bottom',
        timer: 2000,
      })
      router.push('/')
    },
  })
}

const getReservationsByUserId = async (userId: number): Promise<ReservationTypes[]> => {
  const { data } = await api(`/user/reservation/${userId}`)
  return data
}

export const useGetReservationByUserId = (
  userId: number
): { data: ReservationTypes[]; isFetching: boolean } => {
  const { data = [], isFetching } = useQuery({
    queryKey: [queryKeys.reservation, userId],
    queryFn: () => getReservationsByUserId(userId),
  })
  return { data, isFetching }
}

const updateReservartion = async ({
  reservationId,
  ...updateReservationData
}: updateReservartionType) => {
  const user = getStoredUser()
  const { data } = await api.patch(
    `/reservation/${reservationId}`,
    {
      ...updateReservationData,
    },
    {
      headers: { Authorization: `Bearer ${user?.id}` },
    }
  )
  return data
}

export const useUpdateReservation = () => {
  const { mutate } = useMutation({
    mutationFn: (updateReservationData: updateReservartionType) =>
      updateReservartion(updateReservationData),
  })
  return { mutate }
}
