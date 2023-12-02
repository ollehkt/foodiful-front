import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { queryKeys } from '../../../query-keys/queryKeys'
import { api } from '../../axios/axiosInstance'
import useToast from '../../common/hooks/useToast'
import { getStoredUser } from '../../util/userStorage'
import { PostReviewTypes, ProductReviewTypes, UpdateReviewTypes } from '../types/productReviewTypes'

export const getReviews = async (id: string): Promise<ProductReviewTypes[]> => {
  const { data } = await api(`/product-review/${id}`)
  return data
}

export const useGetReviews = (
  productId: string
): { data: ProductReviewTypes[]; isFetching: boolean } => {
  const { fireToast } = useToast()
  const { data = [], isFetching } = useQuery({
    queryKey: [queryKeys.review, productId],
    queryFn: () => getReviews(productId),
    onSuccess: () => {},
    onError: () => {},
  })
  return { data, isFetching }
}

const postReview = async (
  postReviewData: PostReviewTypes & { productId: number; userId: number }
) => {
  const user = getStoredUser()
  const { data } = await api.post(
    `/product-review`,
    {
      ...postReviewData,
    },
    { headers: { Authorization: `Bearer ${user?.token}` } }
  )
  return data
}

/**
 * @TODO: productID 어떻게 넘겨 줄 것인지,
 */
export const usePostReview = (productId: number) => {
  const queryClient = new QueryClient()
  const { fireToast } = useToast()
  const router = useRouter()
  const { mutate } = useMutation({
    mutationFn: ({ ...postReviewData }: PostReviewTypes & { productId: number; userId: number }) =>
      postReview(postReviewData),
    onMutate: async (postReviewData: PostReviewTypes) => {
      await queryClient.cancelQueries([queryKeys.review, productId])

      const prevReviews = queryClient.getQueryData([queryKeys.review, productId])

      queryClient.setQueryData([queryKeys.review, productId], (old: any) => {
        if (!old) return [postReviewData]
        return [...old, postReviewData]
      })

      fireToast({
        id: '후기 등록 성공',
        type: 'success',
        message: '후기 등록이 완료됐습니다.',
        timer: 1500,
        position: 'bottom',
      })
      router.push(`/product/${productId}`)
      return { prevReviews }
    },
    onError: (err, prevData, context) => {
      queryClient.setQueryData([queryKeys.review, productId], context?.prevReviews)
      fireToast({
        id: '후기 등록 실패',
        type: 'failed',
        message: '후기 등록에 실패했습니다. 잠시 후 다시 시도해주세요.',
        timer: 1500,
        position: 'bottom',
      })
      router.push(`/product/${productId}`)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.review, productId] })
    },
  })
  return { mutate }
}

const updateReview = async (updateReviewData: UpdateReviewTypes) => {
  const user = getStoredUser()
  const { data } = await api.patch(
    `/product-review/${updateReviewData.reviewId}`,
    {
      ...updateReviewData,
    },
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  )
  return data
}

export const useUpdateReview = (productId: number) => {
  const queryClient = new QueryClient()
  const user = getStoredUser()
  const { mutate } = useMutation({
    mutationFn: (updateReviewData: UpdateReviewTypes) => updateReview(updateReviewData),
    onMutate: (updateReviewData) => {
      const prevReviews = queryClient.getQueryData([queryKeys.review, productId])
      queryClient.setQueryData([queryKeys.review, productId], (old: any) => {
        return {
          ...old,
        }
      })
      queryClient.invalidateQueries({ queryKey: [queryKeys.review, productId] })
      return {
        prevReviews,
      }
    },
    onError: () => {},
  })
  return { mutate }
}
