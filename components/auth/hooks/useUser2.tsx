import { QueryClient, useQuery } from '@tanstack/react-query'
import { api } from '../../axios/axiosInstance'
import { User } from '../types/user'
import { queryKeys } from '../../../query-keys/queryKeys'
import { getStoredUser, removeStoredUser, setStoreUser } from '../../util/userStorage'

const getUser = async (storedUser: null | User): Promise<User | null> => {
  if (!storedUser) return null
  const { data: user } = await api('/auth/authenticate', {
    headers: { Authorization: `Bearer ${storedUser.token}` },
  })
  return user
}

export const useUser2 = () => {
  const queryClient = new QueryClient()
  const { data: user }: any = useQuery({
    initialData: getStoredUser,
    queryKey: [queryKeys.user],
    queryFn: () => getUser(user),
    onSuccess: (received: User | null) => {
      if (received) setStoreUser(received)
      else removeStoredUser()
    },
  })

  const updateUser = (newUser: User) => {
    queryClient.setQueryData([queryKeys.user], { newUser })
  }

  const clearUser = () => {
    queryClient.setQueryData([queryKeys.user], null)
  }
  return { updateUser, clearUser }
}
