import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { queryKeys } from '../../../query-keys/queryKeys'
import { api, getJWTToken } from '../../axios/axiosInstance'
import useToast from '../../common/hooks/useToast'
import { ProductReturnType, ProductType } from '../../../types/productTypes'
import { getStoredUser } from '../../util/userStorage'

const addProduct = async (product: ProductType) => {
  const user = getStoredUser()
  if (user) {
    const res = await api.post(
      '/product',
      {
        ...product,
      },
      {
        headers: getJWTToken(user?.token),
      }
    )

    return res
  }
}

export const useAddProduct = () => {
  const router = useRouter()
  const { fireToast } = useToast()
  const { mutate: addProductMutate } = useMutation({
    mutationFn: (product: ProductType) => addProduct(product),
    onSuccess: () => {
      fireToast({
        id: '상품 등록',
        type: 'success',
        message: '상품 등록이 완료 되었습니다.',
        position: 'bottom',
        timer: 2000,
      })
      router.push('/product')
    },
    onError: () => {
      fireToast({
        id: '상품 등록 실패',
        type: 'failed',
        message: '상품 등록 실패',
        position: 'bottom',
        timer: 2000,
      })
    },
  })

  return { addProductMutate }
}

export const getProducts = async () => {
  const storedUser = getStoredUser()
  if (storedUser) {
    const res = await api.get(`product/all`, {
      headers: getJWTToken(storedUser?.token) ? getJWTToken(storedUser?.token) : undefined,
    })
    return res.data
  }
}

export const useGetProducts = () => {
  const { fireToast } = useToast()
  const { data, isFetching } = useQuery({
    queryKey: [queryKeys.product],
    queryFn: () => getProducts(),

    onSuccess: () => {
      fireToast({
        id: '상품 조회',
        message: '상품 조회가 완료되었습니다.',
        type: 'success',
        position: 'bottom',
        timer: 2000,
      })
    },
    onError: () => {
      fireToast({
        id: '상품 조회',
        message: '상품 조회에 실패했습니다.',
        type: 'failed',
        position: 'bottom',
        timer: 2000,
      })
    },
  })

  return { data, isFetching }
}

export const getProductById = async (id: string) => {
  const res = await api.get(`/product/${id}`)
  return res.data
}

export const useGetProductById = (id: string) => {
  const { data, isFetching } = useQuery({
    queryKey: [queryKeys.product, id],
    queryFn: () => getProductById(id),
  })
  return { data, isFetching }
}

export const getProductsUserLiked = async () => {}
