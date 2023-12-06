import { User } from '../../auth/types/user'
import { ProductReturnType } from '../../product/types/productTypes'

export interface ProductReviewTypes {
  createdAt: string
  updatedAt: string
  comment: string
  userId: number
  productId: number
  id: number
  deleted: boolean
  rating: number
  reviewImg?: string
  product: ProductReturnType
  user: User
}
export interface PostReviewTypes {
  comment: string
  rating: number
  reviewImg?: string
}

export interface UpdateReviewTypes extends PostReviewTypes {
  reviewId: number
}
