import { useQuery } from '@tanstack/react-query'
import { api } from '../../../axios/axiosInstance'
import { getStoredUser } from '../../../util/userStorage'
import { RefundType } from '../refundTypes'

const getRefund = async (): Promise<RefundType[]> => {
  const user = getStoredUser()
  const { data } = await api(`/user/refund`, {
    headers: {
      Authorization: user ? `Bearer ${user.token}` : undefined,
    },
  })
  return data
}

export const useGetRefund = (userId?: number): { data: RefundType[] } => {
  const { data = [] } = useQuery({
    queryKey: ['refund', userId],
    queryFn: getRefund,
    enabled: !!userId,
  })
  return { data }
}
