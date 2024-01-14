import { useMutation } from '@tanstack/react-query'
import { api } from '../../../axios/axiosInstance'
import { getStoredUser } from '../../../util/userStorage'

const addFavoriteProduct = async (productId: number) => {
  const user = getStoredUser()
  const { data } = await api.post(
    '/favorite-product',
    {
      productId,
    },
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  )
  return data
}

export const useAddFavoriteProduct = () => {
  const { mutate } = useMutation({
    mutationFn: (productId: number) => addFavoriteProduct(productId),
    onSuccess: () => {},
    onError: () => {},
  })
  return { mutate }
}

const deleteFavoriteProduct = async (productId: number) => {
  const user = getStoredUser()
  const { data } = await api.delete(`/favorite-product/${productId}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })
  return data
}
export const useDeleteFavoriteProduct = () => {
  const { mutate } = useMutation({
    mutationFn: (productId: number) => deleteFavoriteProduct(productId),
    onSuccess: () => {},
    onError: () => {},
  })
  return { mutate }
}
