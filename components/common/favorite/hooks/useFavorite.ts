import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../../query-keys/queryKeys'
import { api } from '../../../axios/axiosInstance'
import { ProductReturnType } from '../../../product/types/productTypes'
import { getStoredUser } from '../../../util/userStorage'
import { LectureType } from '../../../lecture/types/lectureTypes'

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
      queryClient.invalidateQueries({ queryKey: [queryKeys.favorite, queryKeys.product] })
    },
    onError: () => {
      throw new Error('에러')
    },
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
      queryClient.invalidateQueries({ queryKey: [queryKeys.favorite, queryKeys.product] })
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
    queryKey: [queryKeys.favorite, queryKeys.product],
    queryFn: getFavoriteProducts,
    onError: () => {},
  })
  return { data }
}

const getFavoriteLectures = async () => {
  const user = getStoredUser()
  if (user) {
    const { data } = await api('/favorite-lecture', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    return data
  }
}

export const useGetFavoriteLectures = (): { data: LectureType[] } => {
  const { data = [] } = useQuery({
    queryKey: [queryKeys.favorite, queryKeys.lecture],
    queryFn: getFavoriteLectures,
  })
  return { data }
}

const addFavoriteLecture = async (lectureId: number) => {
  const user = getStoredUser()
  const { data } = await api.post(
    '/favorite-lecture',
    {
      lectureId,
    },
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  )
  return data
}

export const useAddFavoriteLecture = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (lectureId: number) => addFavoriteLecture(lectureId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.favorite, queryKeys.lecture],
      })
    },
    onError: () => {},
  })
  return { mutate }
}

const deleteFavoriteLecture = async (lectureId: number) => {
  const user = getStoredUser()
  const { data } = await api.delete(`/favorite-lecture/${lectureId}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })
  return data
}
export const useDeleteFavoriteLecture = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (lectureId: number) => deleteFavoriteLecture(lectureId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.favorite, queryKeys.lecture] })
    },
    onError: () => {},
  })
  return { mutate }
}
