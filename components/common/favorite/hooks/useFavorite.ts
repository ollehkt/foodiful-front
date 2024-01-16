import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../../query-keys/queryKeys'
import { api } from '../../../axios/axiosInstance'
import { ProductReturnType } from '../../../product/types/productTypes'
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
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (productId: number) => addFavoriteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.favorite] })
    },
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
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (productId: number) => deleteFavoriteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.favorite] })
    },
    onError: () => {},
  })
  return { mutate }
}

const getFavoriteProducts = async () => {
  const user = getStoredUser()
  const { data } = await api.get('/favorite-product', {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })
  return data
}

export const useGetFavoriteProducts = (): { data: ProductReturnType[] } => {
  const { data = [] } = useQuery({
    queryKey: [queryKeys.favorite],
    queryFn: getFavoriteProducts,
    onError: () => {},
  })
  return { data }
}
