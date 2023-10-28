import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { queryKeys } from '../../../query-keys/queryKeys'
import { api } from '../../axios/axiosInstance'
import useToast from '../../common/hooks/useToast'
import { ProductType } from '../../../types/productTypes'
import { getStoredUser } from '../../util/userStorage'

const addProduct = async (product: ProductType) => {
  const user = getStoredUser()
  const res = await api.post(
    '/product',
    {
      ...product,
    },
    {
      headers: { Authorization: `Bearer ${user?.token}` },
    }
  )
  return res
}

export const useAddProduct = () => {
  const router = useRouter()
  const { fireToast } = useToast()
  const { mutate: addProductMutate, isLoading } = useMutation(
    (product: ProductType) => addProduct(product),
    {
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
    }
  )
  return { addProductMutate, isLoading }
}

export const getProducts = async () => {
  const res = await api.get('/product/all')
  return res.data
}

export const useGetProducts = () => {
  const { fireToast } = useToast()
  const fallback: [] = []
  const { data = fallback, isFetching } = useQuery([queryKeys.product], () => getProducts(), {
    onSuccess: () => {
      fireToast({
        id: '상품 조회',
        message: '상품 조회가 완료되었습니다.',
        type: 'success',
        position: 'bottom',
        timer: 3000,
      })
    },
    onError: () => {
      fireToast({
        id: '상품 조회',
        message: '상품 조회에 실패했습니다..',
        type: 'failed',
        position: 'bottom',
        timer: 3000,
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
  const { fireToast } = useToast()
  const { data, isFetching } = useQuery([queryKeys.product, id], () => getProductById(id), {
    onSuccess: () => {
      fireToast({
        id: '상품 상세 조회',
        message: '상품 상세 조회가 완료되었습니다.',
        type: 'success',
        position: 'bottom',
        timer: 3000,
      })
    },
    onError: () => {
      fireToast({
        id: '상품 상세 조회',
        message: '상품 상세 조회에 실패했습니다..',
        type: 'failed',
        position: 'bottom',
        timer: 3000,
      })
    },
  })
  return { data, isFetching }
}
