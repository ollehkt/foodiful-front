import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { queryKeys } from '../../../query-keys/queryKeys'
import { api, getJWTToken } from '../../axios/axiosInstance'
import useToast from '../../common/hooks/useToast'
import { ProductReturnType, ProductType } from '../../../types/productTypes'
import { getStoredUser } from '../../util/userStorage'
import { PostReviewTypes } from '../../../types/productReviewTypes'

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
    mutationFn: ({ product }: { product: ProductType }) => addProduct(product),
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
export const updateProductById = async (productId: number, product: ProductType) => {
  const user = getStoredUser()
  if (user) {
    const { data } = await api.patch(
      `/product/${productId}`,
      { ...product },
      { headers: getJWTToken(user?.token) }
    )
    return data
  }
}

export const useUpdateProductById = () => {
  const { fireToast } = useToast()
  const { mutate: updateProduct } = useMutation({
    mutationFn: ({ product, id }: { product: ProductType; id: number }) =>
      updateProductById(id, product),
    onSuccess: () => {
      fireToast({
        id: '상품 업데이트',
        type: 'success',
        message: '상품 업데이트가 완료 되었습니다.',
        position: 'bottom',
        timer: 2000,
      })
    },
    onError: () => {
      fireToast({
        id: '상품 업데이트 실패',
        type: 'failed',
        message: '상품 업데이트에 실패했습니다.',
        position: 'bottom',
        timer: 2000,
      })
    },
  })
  return { updateProduct }
}

export const getProducts = async (): Promise<ProductReturnType[]> => {
  const storedUser = getStoredUser()

  const res = await api.get(`product/all`, {
    headers:
      storedUser && getJWTToken(storedUser?.token) ? getJWTToken(storedUser?.token) : undefined,
  })

  return res.data
}

export const useGetProducts = (): {
  data: ProductReturnType[] | undefined
  isFetching: boolean
} => {
  const { fireToast } = useToast()
  const { data, isFetching } = useQuery({
    queryKey: [queryKeys.product],
    queryFn: getProducts,

    onSuccess: () => {
      fireToast({
        id: '상품 조회',
        message: '상품 조회가 완료되었습니다.',
        type: 'success',
        position: 'bottom',
        timer: 2000,
      })
    },
    onError: (error) => {
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
