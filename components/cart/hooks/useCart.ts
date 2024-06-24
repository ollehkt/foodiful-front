import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
  const { data = [], isFetching } = useQuery({
    queryKey: [queryKeys.cart],
    queryFn: getCartList,
    onSuccess(data) {},
    onError: (error) => {
      console.log(error)
    },
  })
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
    `/cart/${updateCartData.id}`,
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
  const queryClient = useQueryClient()
  const { fireToast } = useToast()
  const { mutate } = useMutation({
    mutationFn: (updateCartData: Partial<CartReturnType>) => updateCart(updateCartData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.cart] })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        fireToast({
          id: '장바구니 업데이트 실패',
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

const deleteCartItem = async (cartId: number) => {
  const user = getStoredUser()
  const { data } = await api.delete(`/cart/${cartId}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })
  return data
}

/**
 * @TODO: delete cart productId만 전달로 변경.
 */
export const useDeleteCart = () => {
  const { mutate } = useMutation({
    mutationFn: (cartId: number) => deleteCartItem(cartId),
  })
  return { mutate }
}

const deleteAllCart = async () => {
  const user = getStoredUser()
  const { data } = await api.delete('cart/all', {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })
  return data
}

export const useDeleteAllCart = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => deleteAllCart(),
    onSuccess: () => {},
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.cart] })
    },
  })
  return { mutate }
}
