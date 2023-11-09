import { User } from '../components/auth/types/user'
import { ProductReturnType } from './productTypes'

export interface ProductReviewTypes {
  createdAt: string
  updatedAt: string
  comment: string
  userId: number
  productId: number
  id: number
  deleted: boolean
  isSecret: boolean
  rating: number
  reviewImg?: string
  product: ProductReturnType
  user: User
}
export interface PostReviewTypes {
  comment: string
  rating: number
  isSecret: boolean
  reviewImg?: string
}
