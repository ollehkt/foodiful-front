import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { queryKeys } from '../../../query-keys/queryKeys'
import { api } from '../../axios/axiosInstance'
import useToast from '../../common/hooks/useToast'
import { getStoredUser } from '../../util/userStorage'
import { CartReturnType, CartType } from '../cartTypes'

const getCartList = async () => {
  const user = getStoredUser()
  const { data }: AxiosResponse<CartReturnType[]> = await api('/cart', {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })
  return data
}

export const useGetCartList = () => {
  const { data = [], isFetching } = useQuery({ queryKey: [queryKeys.cart], queryFn: getCartList })
  return { data, isFetching }
}

const addCart = async (addCartData: CartType) => {
  const user = getStoredUser()
  const { data } = await api.post(
    '/cart',
    {
      ...addCartData,
    },
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  )
  return data
}

export const useAddCart = () => {
  const { fireToast } = useToast()
  const { mutate } = useMutation({
    mutationFn: (addCartData: CartType) => addCart(addCartData),
    onSuccess: () => {
      fireToast({
        id: '장바구니 추가',
        type: 'success',
        message: '장바구니 추가가 완료 되었습니다.',
        position: 'bottom',
        timer: 2000,
      })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        fireToast({
          id: '장바구니 추가 실패',
          type: 'failed',
          message: error.response?.data.message,
          position: 'bottom',
          timer: 2000,
        })
      }
    },
  })
  return { mutate }
}

const updateCart = async (updateCartData: Partial<CartReturnType>) => {
  const user = getStoredUser()
  const { data } = await api.patch(
    `/cart/${updateCartData.cartId}/${updateCartData.productId}`,
    { ...updateCartData },
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  )
  return data
}

export const useUpdateCart = () => {
  const queryClient = new QueryClient()
  const { mutate } = useMutation({
    mutationFn: (updateCartData: Partial<CartReturnType>) => updateCart(updateCartData),
    onSuccess: () => {},
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.cart] })
    },
  })
  return { mutate }
}

const deleteCart = async ({ cartId, productId }: { cartId: number; productId: number }) => {
  const { data } = await api.delete(`/cart/${cartId}/${productId}`)
  return data
}

export const useDeleteCart = () => {
  const { mutate } = useMutation({
    mutationFn: (deleteCartData: { cartId: number; productId: number }) =>
      deleteCart(deleteCartData),
  })
  return { mutate }
}

const deleteAllCart = async (cartId: number) => {
  const { data } = await api.delete(`cart/all/${cartId}`)
  return data
}

export const useDeleteAllCart = () => {
  const { mutate } = useMutation({ mutationFn: (cartId: number) => deleteAllCart(cartId) })
  return { mutate }
}
