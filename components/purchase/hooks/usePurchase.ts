import { useMutation } from '@tanstack/react-query'
import { api } from '../../axios/axiosInstance'
import useToast from '../../common/hooks/useToast'
import { getStoredUser } from '../../util/userStorage'

const postPurchase = (purchaseData) => {
  const user = getStoredUser()
  return api.post(
    '/purchase',
    {
      ...purchaseData,
    },
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  )
}

const usePostPurchase = () => {
  const { fireToast } = useToast()
  const { mutate } = useMutation({
    mutationFn: (purchaseData) => postPurchase(purchaseData),
  })
  return { mutate }
}
