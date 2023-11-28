import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../../query-keys/queryKeys'
import { ProductReviewTypes } from '../../../types/productReviewTypes'
import { api } from '../../axios/axiosInstance'
import useToast from '../../common/hooks/useToast'

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
