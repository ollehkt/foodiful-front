import { useQuery } from '@tanstack/react-query'
import { api } from '../../axios/axiosInstance'
import { queryKeys } from '../../../query-keys/queryKeys'

const getAllReservedTimes = async (): Promise<string[]> => {
  const { data: reservations } = await api('/reservation/all')
  return reservations
}

export const useGetAllReservedTimes = (): { data: string[] } => {
  const { data = [] } = useQuery({
    queryKey: [queryKeys.reservation],
    queryFn: getAllReservedTimes,
  })
  return { data }
}
