import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { queryKeys } from '../../../query-keys/queryKeys'
import { api } from '../../axios/axiosInstance'
import useToast from '../../common/hooks/useToast'
import { getStoredUser } from '../../util/userStorage'
import { PostReviewTypes, ProductReviewTypes, UpdateReviewTypes } from '../types/productReviewTypes'
import { isAxiosError } from 'axios'

const getReviewByUserId = async (): Promise<ProductReviewTypes[]> => {
  const user = getStoredUser()
  const { data } = await api(`/user/product-review`, {
    headers: {
      Authorization: user ? `Bearer ${user.token}` : undefined,
    },
  })
  return data
}

export const useGetReviewByUserId = (userId?: number): { data: ProductReviewTypes[] } => {
  const { data = [] } = useQuery({
    queryKey: [queryKeys.review, userId],
    queryFn: getReviewByUserId,
    enabled: !!userId,
  })
  return { data }
}

export const getReviews = async (id: number): Promise<ProductReviewTypes[]> => {
  const { data } = await api(`/product-review/${id}`)
  return data
}

export const useGetReviews = (
  productId: number
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
  const queryClient = useQueryClient()
  const { fireToast } = useToast()
  const { mutate } = useMutation({
    mutationFn: ({ ...postReviewData }: PostReviewTypes & { productId: number; userId: number }) =>
      postReview(postReviewData),
    onSuccess: async () => {
      fireToast({
        id: '후기 등록 성공',
        type: 'success',
        message: '후기 등록이 완료됐습니다.',
        timer: 1500,
        position: 'bottom',
      })
      queryClient.invalidateQueries({ queryKey: [queryKeys.review, productId] })
    },
    onError: () => {
      fireToast({
        id: '후기 등록 실패',
        type: 'failed',
        message: '후기 등록에 실패했습니다. 잠시 후 다시 시도해주세요.',
        timer: 1500,
        position: 'bottom',
      })
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
  const queryClient = useQueryClient()
  const router = useRouter()
  const { fireToast } = useToast()
  const { mutate } = useMutation({
    mutationFn: ({
      ...updateReviewData
    }: UpdateReviewTypes & { productId: number; userId: number }) => updateReview(updateReviewData),

    onSuccess: (updateReviewData) => {
      // queryClient.setQueryData(
      //   [queryKeys.review, productId],
      //   (old: ProductReviewTypes[] | undefined) => {
      //     if (!old?.length) return
      //     return [...old, updateReviewData]
      //   }
      // )
      fireToast({
        id: '후기 수정 성공',
        type: 'success',
        message: '후기 수정이 완료됐습니다.',
        timer: 1500,
        position: 'bottom',
      })
      queryClient.invalidateQueries({ queryKey: [queryKeys.review, productId] })
    },
    onError: (error) => {
      if (isAxiosError(error))
        fireToast({
          id: '수정 실패',
          type: 'failed',
          message: error.response?.data.message,
          position: 'bottom',
          timer: 2000,
        })
      fireToast({
        id: '예약 실패',
        type: 'failed',
        message: '수정을 다시 시도해주세요.',
        position: 'bottom',
        timer: 2000,
      })
    },
  })
  return { mutate }
}

const deleteReview = async (reviewId: number) => {
  const user = getStoredUser()
  const { data } = await api.delete(`/product-review/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })
  return data
}

export const useDeleteReview = (productId: number) => {
  const { fireToast } = useToast()
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    onSuccess: () => {
      fireToast({
        id: '후기 삭제 성공',
        type: 'success',
        message: '후기 삭제가 완료됐습니다.',
        timer: 1500,
        position: 'bottom',
      })
      queryClient.invalidateQueries({ queryKey: [queryKeys.review, productId] })
    },
    onError: (err, context) => {
      fireToast({
        id: '후기 삭제 실패',
        type: 'failed',
        message: '후기 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.',
        timer: 1500,
        position: 'bottom',
      })
    },
    // onMutate: async (reviewId) => {
    //   await queryClient.cancelQueries([queryKeys.review, productId])

    //   const prevReviews = queryClient.getQueryData([queryKeys.review, productId])

    //   // const filteredReviews =
    //   //   prevReviews?.length && prevReviews.filter((review) => review.id !== reviewId)

    //   queryClient.setQueryData([queryKeys.review, productId], (old: any) => {
    //     if (!old) return
    //     return old.filter((review: ProductReviewTypes) => review.id !== reviewId)
    //   })

    //   return {
    //     prevReviews,
    //   }
    // },
    // onError: (err, prevData, context) => {
    //   queryClient.setQueryData([queryKeys.review, productId], context?.prevReviews)
    //   fireToast({
    //     id: '후기 삭제 실패',
    //     type: 'failed',
    //     message: '후기 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.',
    //     timer: 1500,
    //     position: 'bottom',
    //   })
    // },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: [queryKeys.review] })
    // },
  })
  return { mutate }
}
