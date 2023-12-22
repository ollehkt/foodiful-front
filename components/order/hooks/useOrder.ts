import { useMutation } from '@tanstack/react-query'
import { api } from '../../axios/axiosInstance'
import useToast from '../../common/hooks/useToast'
import { getStoredUser } from '../../util/userStorage'

const postOrder = (orderData) => {
  const user = getStoredUser()
  return api.post(
    '/order',
    {
      ...orderData,
    },
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  )
}

const usePostorder = () => {
  const { fireToast } = useToast()
  const { mutate } = useMutation({
    mutationFn: (orderData) => postOrder(orderData),
  })
  return { mutate }
}
