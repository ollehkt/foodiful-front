import { useQuery } from '@tanstack/react-query'
import { api } from '../../axios/axiosInstance'
import { queryKeys } from '../../../query-keys/queryKeys'
import { ReservationType } from '../../calendar/types/reservationType'

const getAllReservedTimes = async (): Promise<ReservationType[]> => {
  const { data: reservations } = await api('/reservation/all')
  return reservations
}

export const useGetAllReservedTimes = (): { data: string[] } => {
  const { data = [] } = useQuery({
    queryKey: [queryKeys.reservation],
    queryFn: getAllReservedTimes,
  })
  if (!!data.length)
    return { data: data.flatMap((reserve: ReservationType) => reserve.reserveDate) }
  else return { data: [] }
}
