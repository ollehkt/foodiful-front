import { useQuery } from '@tanstack/react-query'
import { api } from '../../../axios/axiosInstance'
import { getStoredUser } from '../../../util/userStorage'
import { RefundType } from '../refundTypes'

const getRefund = async (userId?: number): Promise<RefundType[]> => {
  const user = getStoredUser()
  const { data } = await api(`/user/refund/${userId}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })
  return data
}

export const useGetRefund = (userId?: number): { data: RefundType[] } => {
  const { data = [] } = useQuery({
    queryKey: ['refund', userId],
    queryFn: () => getRefund(userId),
    enabled: !!userId,
  })
  return { data }
}
